const supertest = require('supertest');
const request = require('supertest');
const assert = require('assert');
const express = require('express');
import {describe, beforeEach, expect, test, jest} from '@jest/globals';

const app = express();

app.use('/test', (req, res) => {
  res.status(200).json({
    success: true,
  });
});

describe('/test route', () => {
  test('get request to test route', (done) => {
    request(app).get('/test').expect('Content-Type', /json/).expect(200, done);
  });
  test('post requeust to test route', (done) => {
    request(app)
      .post('/test')
      .send({ random: 'info' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('put request to test route', (done) => {
    request(app)
      .put('/test')
      .send({ random: 'info' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('delete request to test route', (done) => {
    request(app)
      .delete('/test')
      .send({ random: 'info' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/* all route testing needed */

// signup route

describe('/signup route', () => {
  test('get request', async () => {
    await request(app)
      .get('/signup')
      .send({ username: 'test', email: 'test@test.com', password: 'password' })
      .expect('Content-Type', 'text/html; charset=utf-8'); 
  });
  test('post request', async () => {
    await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        phone: '+1555555555',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8');
  });
});

// setting route
describe('Settings route', (done) =>{
  test('GET', async () => {
   await request(app)
    .get('/settings')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200,done)
  })
})
// logout route

// login route

// init route

// db route

// api route

// admin route

// account route

// const server = require('../server/app');

// const request = supertest(server);

// describe('Test Route /test', () => {
//   describe('GET request on the test route', () => {
//     // Test route to receive a status of 200 and a json object of success:true
//     test('Should respond with a 200 status code', async () => {
//       const response = await request.get('/test');
//       expect(response.status).toBe(200);
//       expect(response.body.success).toBe(true);
//     });
//   });

//   describe('POST request on the test route', () => {
//     // Test route to receive a status of 200 and a json object of success:true
//     test('Should respond with a 200 status code', async () => {
//       const response = await request.get('/test');
//       expect(response.status).toBe(200);
//       expect(response.body.success).toBe(true);
//     });
//   });
// });

/**   Docketeer 7.0
 *  We could not figure out how to authenticate to postgres with Super Test so we were unable to confirm if these tests work.
 */

// describe('Settings Route /settings', () => {
// GET request for default route
// describe('GET request /settings/', () => {
//   test('Expect status code 200 and JSON object', async (done) => {
//     // return request.get('/settings/').then((response) => {
//     //   expect(response.statusCode).toBe(200);
//     //   done();
//     // });
//     const response = await request.get('/settings');
//     expect(response.status).toBe(200);
//     done();
//   });
// });
// describe('POST request /settings/insert', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/insert')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// describe('POST request /settings/delete', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/delete')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// describe('POST request /settings/phone', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/phone')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// describe('POST request /settings/notification', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/notification')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// describe('POST request /settings/monitoring', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/monitoring')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// describe('POST request /settings/gitLinks', () => {
//   test('Expect status code 200 and JSON object', () => {
//     request(server)
//       .post('/settings/gitLinks')
//       .expect(200)
//       .expect('Content/Type', /json/);
//   });
// });
// });

// describe('Initiate Metric Database Route /init', () => {
//   GET request for default route
//   describe('GET request /init/', () => {
//     test('Expect status code 200 and JSON object', () => {
//       request(server).post('/init/').expect(200).expect('Content/Type', /json/);
//     });
//   });

//   // ! Expect this to fail bc of no json return
//   describe('POST request /init/timezone', () => {
//     test('Expect status code 200 and JSON object', () => {
//       request(server)
//         .post('/init/timezone')
//         .expect(200)
//         .expect('Content/Type', /json/);
//     });
//   });

//   describe('POST request /init/github', () => {
//     test('Expect status code 200 and JSON object', () => {
//       request(server)
//         .post('/init/github')
//         .expect(200)
//         .expect('Content/Type', /json/);
//     });
//   });

//   describe('POST request /init/addMetrics', () => {
//     test('Expect status code 200 and JSON object', () => {
//       request(server)
//         .post('/init/addMetrics')
//         .expect(200)
//         .expect('Content/Type', /json/);
//     });
//   });

//   describe('POST request /init/getMetrics', () => {
//     test('Expect status code 200 and JSON object', () => {
//       request(server)
//         .post('/init/getMetrics')
//         .expect(200)
//         .expect('Content/Type', /json/);
//     });
//   });
// });


