const supertest = require('supertest');
const request = require('supertest');
const response = require('supertest');
const express = require('express');
import {describe, beforeEach, expect, test, jest} from '@jest/globals';
const app = express();

const signupRouter = require('../server/routes/signupRouter');
const loginRouter = require('../server/routes/loginRouter');
const adminRouter = require('../server/routes/adminRouter');
const accountRouter = require('../server/routes/accountRouter');
const apiRouter = require('../server/routes/apiRouter');
const dbRouter = require('../server/routes/dbRouter');
const initRouter = require('../server/routes/initRouter');
const logoutRouter = require('../server/routes/logoutRouter');
const settingsRouter = require('../server/routes/settingsRouter');



app.use('/test', (req, res) => {
  res.status(200).json({
    success: true,
  });
});
app.use('/signup', signupRouter);
app.use('/settings', settingsRouter);
app.use('/init', initRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/logout', logoutRouter);

xdescribe('/test route', () => {
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
      .expect(200, done)
      .expect(response.locals.users).toEqual(1);
  });
});

/* all route testing needed */

// signup route

describe('/signup route', () => {
  test('get request', async () => {
    await request(app)
      .get('/signup')
      // .send({ username: 'test', email: 'test@test.com', password: 'password' })
      .expect('Content-Type', 'application/json; charset=utf-8') 
      .expect(200)
      .expect(response);
  });
  test('post request', async () => {
    await request(app)
      .post('/signup')
      .send({
        username: 'testwer',
        email: 'test@test.com',
        password: 'passwqw',
        phone: '+1555555555',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
});

// setting route
describe('Settings route', () =>{
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


