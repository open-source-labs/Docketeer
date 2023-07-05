import request from 'supertest';
import response from 'supertest';
import express from 'express';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

import apiRouter from '../server/routes/apiRouter';
import commandRouter from '../server/routes/commandRouter';

app.use('/gapi', apiRouter);
app.use('/api', apiRouter);
app.use('/command', commandRouter);

describe('Command Route', () => {
  test('Get refreshRunning', async () => {
    const res = await request(app)
      .get('/command/refreshRunning');
    expect(res.status).toBe(200)
    expect(res.body[0].Networks).toBeDefined()
  });
})

describe('Command Route', () => {
  test('networkCreate', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test11",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
  });
})

describe('Command Route', () => {
  test('networkRemove', async () => {
    const res = await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test11",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
  });
})

describe('Command Route', () => {
  test('networkRemove', async () => {
    const res = await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "kiwi",
      })
    expect(res.status).toBe(200)
    expect(res.body.error).toBeDefined()
  });
})