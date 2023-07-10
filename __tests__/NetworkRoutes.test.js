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

describe('/command/networkContainers', () => {
  test('Get networkContainers', async () => {
    const res = await request(app)
      .get('/command/networkContainers');
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    res.body.forEach(network => {
      expect(network.Name).toBeDefined()
    })
  });
})

describe('/command/networkListContainers', () => {
  test('Get networkListContainers', async () => {
    const res = await request(app).get('/command/networkListContainers');
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    res.body.forEach(network => {
      expect(network.networkName).toBeDefined()
      expect(network.containers).toBeDefined()
    })
  })
})

describe('/command/networkCreate', () => {

  beforeAll(async () => {
    await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test2",
      })
  })

  afterAll(async () => {
  await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test1",
      })
  await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test2",
      })
});

  test('networkCreate with a valid name', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test1",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
  });

  test('networkCreate duplicate', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test2",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).not.toBeDefined()
    expect(res.body.error).toBeDefined()
  });
  
  test('networkCreate with an invalid name', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "#test",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).not.toBeDefined()
    expect(res.body.error).toBeDefined()
  });
})

describe('/command/networkRemove', () => {

  beforeAll(async () => {
    await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test3",
      })
  });

  test('networkRemove', async () => {
    const res = await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test3",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
  });

  test('networkRemove duplicate', async () => {
    const res = await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test3",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).not.toBeDefined()
    expect(res.body.error).toBeDefined()
  });
})

describe('/command/networkConnect', () => {

  beforeAll(async () => {
    await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test4",
      })
    
    // await request(app)
    //   .post('/command/runImage')
    //   .send({
    //     reps: "nginx",
    //     tag: "latest"
    //   })
  });

  afterAll(async () => {
    await request(app)
      .post('/command/networkDisconnect')
      .send({
        networkName: "test4",
        containerName: "docketeerdb"
      })
    
    await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test4",
      })
    
  });

  test('networkConnect', async () => {
    const res = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "test4",
        containerName: "docketeerdb"
        
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
    expect(res.body.error).not.toBeDefined()
  });

  test('networkConnect duplicate', async () => {
    const res = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "test4",
        containerName: "docketeerdb"

      })
    expect(res.status).toBe(200)
    expect(res.body.hash).not.toBeDefined()
    expect(res.body.error).toBeDefined()
  });
})

describe('/command/networkDisconnect', () => {

  beforeAll(async () => {
    await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test5",
      })

    await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "test5",
        containerName: "docketeerdb"
      })
  });

  afterAll(async () => {
    await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test5",
      })
  });

  test('networkDisconnect', async () => {

    const res = await request(app)
      .post('/command/networkDisconnect')
      .send({
        networkName: "test5",
        containerName: "docketeerdb"

      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
    expect(res.body.error).not.toBeDefined()
  });

  test('networkDisconnect duplicate', async () => {
    const res = await request(app)
      .post('/command/networkDisconnect')
      .send({
        networkName: "test5",
        containerName: "docketeerdb"

      })
    expect(res.status).toBe(200)
    expect(res.body.hash).not.toBeDefined()
    expect(res.body.error).toBeDefined()
  });
})


