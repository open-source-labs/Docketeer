import { Router } from 'express';
const router = Router();
import fetch from 'node-fetch';

// This route is only for testing purposes
router.get('/api-key', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/keys', {
      method: 'POST',
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
    let data = await response.json();
    res.json({ key: data.key });
  } catch (error) {
    next(error);
  }
});

export default router;