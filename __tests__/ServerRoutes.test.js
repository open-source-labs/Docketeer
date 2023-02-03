import request from 'supertest';
import response from 'supertest';
import express from 'express';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
const app = express();

import accountRouter from '../server/routes/accountRouter';
import adminRouter from '../server/routes/adminRouter';
import apiRouter from '../server/routes/apiRouter';
import commandRouter from '../server/routes/commandRouter';
import signupRouter from '../server/routes/signupRouter';
import loginRouter from '../server/routes/loginRouter';
import dbRouter from '../server/routes/dbRouter';
import initRouter from '../server/routes/initRouter';
import logoutRouter from '../server/routes/logoutRouter';
import settingsRouter from '../server/routes/settingsRouter';

app.use('/test', (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.use('/account', accountRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('command', commandRouter);
app.use('/db', dbRouter);
app.use('/init', initRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/settings', settingsRouter);
app.use('/signup', signupRouter);

/* all route testing needed */

// Notes from 9.0: There is no testing database / server set up, so post request testing will not work right now.

// account route
describe('Account Route', () => {
  test('Get request', () => {
    request(app)
      .get('/account')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// admin route
describe('Admin Route', () => {
  test('Get request', () => {
    request(app)
      .get('/admin')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// api route
describe('Api Route', () => {
  test('Get request', () => {
    request(app)
      .get('/api')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// command route
describe('Command Route', () => {
  test('Get refreshRunning', () => {
    request(app)
      .get('/command/refreshRunning')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// db route
describe('Db Route', () => {
  test('Get request', () => {
    request(app)
      .get('/db')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// init route
describe('Init Route', () => {
  test('Get request', () => {
    request(app)
      .get('/init')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// login route
describe('Login Route', () => {
  test('Get request', () => {
    request(app)
      .get('/login')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// logout route
describe('Logout Route', () => {
  test('Get request', () => {
    request(app)
      .get('/logout')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// setting route
describe('Settings Route', () => {
  test('Get request should return empty mem, cpu, stopped', async () => {
    await request(app)
      .get('/settings')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
  xtest('Post request', async () => {
    await request(app)
      .post('/settings/insert')
      .send({
        container: ['test', 'value'],
        name: 'testname',
        metric: 'hello'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
});

// signup route
describe('Signup Route', () => {
  test('get request', async () => {
    await request(app)
      .get('/signup')
      // .send({ username: 'test', email: 'test@test.com', password: 'password' })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect(response);
  });
  xtest('post request', async () => {
    await request(app)
      .post('/signup')
      .send({
        username: 'tester',
        email: 'test@test.com',
        password: 'passwqw',
        phone: '+1555555555',
        role_id: '1',
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
});
