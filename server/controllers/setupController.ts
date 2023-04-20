import { Request, Response, NextFunction } from 'express';
import { exec, execSync, spawn, spawnSync } from 'child_process';
import { SetupController } from '../../types';


const setupController: SetupController = {
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