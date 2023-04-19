// import { Request, Response, NextFunction } from 'express';
import { GrafanaApiController } from '../../types';
import fetch from 'node-fetch';

interface GrafanaResponse {
  key: string;
}
// http://localhost:3000/api/auth/keys
// 'http://host.docker.internal:3000/api/auth/keys'
// http://host.docker.internal:3000/api/search?query=${encodeURIComponent(dashboard)}`
const grafanaApiController: GrafanaApiController = {
  getApi: async (req, res, next): Promise<void> => {
    console.log('HEYYYYYYYY');
    try {
      const response = await fetch('http://localhost:3000/api/auth/keys', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          Authorization:
            'Basic ' + Buffer.from('admin:prom-operator').toString('base64'),
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Math.random().toString(36).substring(7),
          role: 'Admin',
          secondsToLive: 86400,
        }),
      });
      console.log('YO BOI');
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

  getUid: async (req, res, next): Promise<void> => {
    console.log(req.body);
    const { key, dashboard }: { key: string; dashboard: string } = req.body;
    try {
      const response = await fetch(
        `http://localhost:3000/api/search?query=${encodeURIComponent(
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
      console.log('THIS IS DATA', data);
      const uidKey: any = data[0].uid;
      res.locals.uid = uidKey;
      console.log('UID KEY HERE!!', uidKey);
      return next();
    } catch (err) {
      return next({
        log: 'getUid failed',
        status: 200,
        message: { err: 'Cant get uid' },
      });
    }
  }
};

export default grafanaApiController;
