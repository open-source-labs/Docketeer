import { Request, Response, NextFunction } from 'express';
import { exec, execSync, spawn, spawnSync } from 'child_process';
import { SetupController } from '../../types';


const setupController: SetupController = {
  promInstall: (req: Request, res: Response, next: NextFunction): void => {
    // exec('curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash && helm repo add prometheus-community https://prometheus-community.github.io/helm-charts && helm install prometheus-operator prometheus-community/kube-prometheus-stack', (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error: ${error.message}`);
    //     res.send(`Error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.error(`Stderr: ${stderr}`);
    //     res.send(`Stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    //   res.send(`stdout: ${stdout}`);
    // });

    // synchronous functions need to be used in order to make sure these commands execute successively
    // spawnSync(
    //   'docker exec -it docketeer bash',
    //   {
    //     stdio: 'inherit',
    //     shell: true,
    //   }
    // );

    spawnSync(
      'docker exec -t docketeer helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
      {
        stdio: 'inherit',
        shell: true,
      }
    );
    spawnSync('docker exec -t docketeer helm repo update', {
      stdio: 'inherit',
      shell: true,
    });
    spawnSync(
      'docker exec -t docketeer helm install prometheus prometheus-community/kube-prometheus-stack',
      {
        stdio: 'inherit',
        shell: true,
      }
    );
    return next();
  },
  

  applyGraf: (req: Request, res: Response, next: NextFunction): void => {
    let pod: string;
    const getPods = exec('docker exec -t docketeer kubectl get pods', (err, stdout, stderr) => {
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
      spawnSync('docker exec -t docketeer kubectl apply -f prometheus-grafana.yml', {
        stdio: 'inherit',
        shell: true,
      });
      spawnSync(`docker exec -t docketeer kubectl delete pod ${pod}`, {
        stdio: 'inherit',
        shell: true,
      });
      return next();
    });
  },
	

  portForward: (req: Request, res: Response, next: NextFunction): void => { 
    let pod: string;
    let podStatus: string;
    while (podStatus !== 'Running') {
      const abc = execSync('kubectl get pods');
      abc
        .toString()
        .split('\n')
        .forEach((line) => {
          if (line.includes('prometheus-grafana')) {
            if (line.includes('Running')) podStatus = 'Running';
            [pod] = line.split(' ');
          }
        });
    }

    const ports = spawn(
      `kubectl port-forward deployment/${pod} 3000`,
      { shell: true }
    );
    ports.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    ports.stderr.on('data', (data) => {
      console.error(`prometheus-grafana port forwarding error: ${data}`);
    });
    return next();
  }
};

export default setupController;