import { Request, Response, NextFunction } from 'express';
import { exec, execSync, spawn, spawnSync } from 'child_process';
import { SetupController } from '../../types';

/**
 * @description v12.0 implemented k8 cluster metrics! In order to set this up, run npm run dev, go to 
 * http://localhost:4001/api/k8 click the three buttons in sequence, this will run the necessary shell lines on your host terminal.
 *  Open up a new terminal, compose up and see your k8 metrics!
 */

const setupController: SetupController = {
  /**
   * @description Middleware function that runs 3 commands to set up Prometheus
   * 1. Installs prometheus using helm
   * 2. Updates the helm version
   * 3. Installs prometheus into your k8 cluster
   * @params {req, response, next}
   * @returns {void} just runs the 3 commands to install prometheus, doesn't return anything
   */
  promInstall: (req: Request, res: Response, next: NextFunction): void => {
    spawnSync(
      'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
      {
        stdio: 'inherit',
        shell: true,
      }
    );
    spawnSync('helm repo update', {
      stdio: 'inherit',
      shell: true,
    });
    spawnSync(
      'helm install prometheus prometheus-community/kube-prometheus-stack',
      {
        stdio: 'inherit',
        shell: true,
      }
    );
    return next();
  },
  /**
   *@description Applies grafana to the k8 cluster
   */
  applyGraf: (req: Request, res: Response, next: NextFunction): void => {
    let pod: string;
    const getPods = exec('kubectl get pods', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      const output = stdout.split('\n');
      output.forEach((line) => {
        if (line.includes('prometheus-grafana')) {
          [pod] = line.split(' ');
        }
      });
    });

    getPods.once('close', () => {
      spawnSync('kubectl apply -f prometheus-grafana.yml', {
        stdio: 'inherit',
        shell: true,
      });
      spawnSync(`kubectl delete pod ${pod}`, {
        stdio: 'inherit',
        shell: true,
      });
      return next();
    });
  },

  /**
   * @description Forwards port to 3000 so that metrics can be accessed and viewed in the web browser
   */
  portForward: (req: Request, res: Response, next: NextFunction): void => {
    let podStatus: string;
    while (podStatus !== 'Running') {
      const abc = execSync('kubectl get pods');
      abc
        .toString()
        .split('\n')
        .forEach((line) => {
          if (line.includes('prometheus-grafana')) {
            if (line.includes('Running')) podStatus = 'Running';
          }
        });
    }

    const ports = spawn(
      'kubectl port-forward deployment/prometheus-grafana 3000',
      { shell: true }
    );
    ports.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    ports.stderr.on('data', (data) => {
      console.error(`port forwarding error: ${data}`);
    });
    return next();
  }
};

export default setupController;