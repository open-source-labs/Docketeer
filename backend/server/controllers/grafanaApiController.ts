import { GrafanaApiController } from '../../backend-types';

interface GrafanaResponse {
  key: string;
}

// use http://localhost:3000/api/auth/keys when testing, npm run dev
// use 'http://host.docker.internal:3000/api/auth/keys' when docker composing up, docker compose up
const grafanaApiController: GrafanaApiController = {
  getApi: async (req: any, res: any, next: any): Promise<void> => {
    console.log('entered')
    try {
      const response = await fetch(
        'http://host.docker.internal:2999/api/auth/keys',
        {
          method: 'POST',
          // mode: 'no-cors',
          headers: {
            Authorization:
              'Basic ' + Buffer.from('admin:admin').toString('base64'),
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: Math.random().toString(36).substring(7),
            role: 'Admin',
            secondsToLive: 86400,
          }),
        }
      );
      const data = (await response.json()) as GrafanaResponse;
      res.locals.key = data.key;
      return next();
    } catch (error) {
      console.log('Error:', error);
      return next({
        log: 'failed',
        status: 500,
        message: {
          err: '',
        },
      });
    }
  },

  // use localhost version for npm run dev or testing, but host.docker.internal when running compose up
  // `http://localhost:3000/api/search?query=${encodeURIComponent(dashboard)}` use when testing, npm run dev
  // `http://host.docker.internal:3000/api/search?query=${encodeURIComponent(dashboard)}` use when docker compose up
  getUid: async (req: any, res: any, next: any): Promise<void> => {
    const { key, dashboard }: { key: string; dashboard: string } = req.body;
    console.log('entered')
    console.log(123234, key, dashboard)
    try {
      const response = await fetch(
        `http://host.docker.internal:2999/api/search?query=${encodeURIComponent(
          dashboard
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data: any = await response.json();
      const uidKey: any = data[0].uid;
      console.log(uidKey)
      res.locals.uid = uidKey;
      return next();
    } catch (err) {
      return next({
        log: 'getUid failed',
        status: 200,
        message: { err: 'Cannot get uid' },
      });
    }
  },
};

export default grafanaApiController;