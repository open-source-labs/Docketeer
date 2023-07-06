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

// tests networkContainers route

// test that it is responding with a list of network objects with a Name property

describe('Command Route', () => {
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

// tests networkListContainers route
describe('Command Route', () => {
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

// tests networkCreate route

// tests that route creates a network when given a valid name

describe('Command Route', () => {
  test('networkCreate', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test1",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
  });
})

// tests that route responds with error when given an invalid name, i.e. one that already exists as a network or an invalid network name

describe('Command Route', () => {
  test('networkCreate', async () => {
    const res = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test2",
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
    expect(res.body.error).not.toBeDefined()
    
    const duplicate = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test2",
      })
    expect(duplicate.status).toBe(200)
    expect(duplicate.body.hash).not.toBeDefined()
    expect(duplicate.body.error).toBeDefined()
  });
})

describe('Command Route', () => {
  test('networkCreate', async () => {
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

// tests networkRemove route

// tests that route removes a network when given a valid name

describe('Command Route', () => {
  test('networkRemove', async () => {
    const resCreate = await request(app)
      .post('/command/networkCreate')
      .send({
        networkName: "test3",
      })
    expect(resCreate.status).toBe(200)
    expect(resCreate.body.hash).toBeDefined()

    const resRemove = await request(app)
      .post('/command/networkRemove')
      .send({
        networkName: "test3",
      })
    expect(resRemove.status).toBe(200)
    expect(resRemove.body.hash).toBeDefined()
  });
})

// tests that route responds with error when given an invalid name, i.e. one that don't exist as a network. This is not possible on our frontend, since users can only make a remove request on networks that exist 

// xdescribe('Command Route', () => {
//   test('networkRemove', async () => {
//     const res = await request(app)
//       .post('/command/networkRemove')
//       .send({
//         networkName: "kiwi",
//       })
//     expect(res.status).toBe(200)
//     expect(res.body.error).toBeDefined()
//   });
// })


// tests networkConnect route 

// tests that route attaches a container to a network when given valid container name and network name

describe('Command Route', () => {
  test('networkConnect', async () => {
    const res = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "miles",
        containerName: "nginx-latest_81"
        
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
    expect(res.body.error).not.toBeDefined()

  });
})

// tests that route when a container is attached to a network and try to connect the container to the same network
describe('Command Route', () => {
  test('networkConnect', async () => {
    const res = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "lim",
        containerName: "nginx-latest_81"
        
      })
    expect(res.status).toBe(200)
    expect(res.body.hash).toBeDefined()
    expect(res.body.error).not.toBeDefined()

    const duplicate = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "lim",
        containerName: "nginx-latest_81"
        
      })
    expect(duplicate.status).toBe(200)
    expect(duplicate.body.hash).not.toBeDefined()
    expect(duplicate.body.error).toBeDefined()

  });
})

// tests networkDisconnect route

// tests that route disconnects a container from a network when given valid container name and network name

describe('Command Route', () => {
  test('networkDisconnect', async () => {
    const resConnect = await request(app)
      .post('/command/networkConnect')
      .send({
        networkName: "lemon",
        containerName: "nginx-latest_81"

      })
    expect(resConnect.status).toBe(200)
    expect(resConnect.body.hash).toBeDefined()
    expect(resConnect.body.error).not.toBeDefined()

    const resDisconnect = await request(app)
      .post('/command/networkDisconnect')
      .send({
        networkName: "lemon",
        containerName: "nginx-latest_81"

      })
    expect(resDisconnect.status).toBe(200)
    expect(resDisconnect.body.hash).toBeDefined()
    expect(resDisconnect.body.error).not.toBeDefined()

  });
})


