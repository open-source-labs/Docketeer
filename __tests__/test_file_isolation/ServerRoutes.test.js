// Need to fill in tests for Routes

const request = require('supertest');
import server from '../../server/server.js';

// describe('Test Route /test', () => {
//   describe('GET request on the test route', () => {
//     // Test route to receive a status of 200 and a json object of success:true
//     test('Should respond with a 200 status code', () => {
//       // request method from supertest
//       request(server)
//         .get('/test')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end((err, res) => {
//           if (err) throw err;
//         });
//     });
//   });

//   describe('POST request on the test route', () => {
//     // Test route to receive a status of 200 and a json object of success:true
//     test('Should respond with a 200 status code', () => {
//       // request method from supertest
//       request(server)
//         .post('/test')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end((err, res) => {
//           if (err) throw err;
//         });
//     });
//   });
// });

describe('Settings Route /settings', () => {
  // GET request for default route
  describe('GET request /settings/', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/insert', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/insert')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/delete', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/delete')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/phone', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/phone')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/notification', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/notification')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/monitoring', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/monitoring')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /settings/gitLinks', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/settings/gitLinks')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });
});

describe('Initiate Metric Database Route /init', () => {
  // GET request for default route
  describe('GET request /init/', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server).post('/init/').expect(200).expect('Content/Type', /json/);
    });
  });

  // ! Expect this to fail bc of no json return
  describe('POST request /init/timezone', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/init/timezone')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /init/github', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/init/github')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /init/addMetrics', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/init/addMetrics')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });

  describe('POST request /init/getMetrics', () => {
    test('Expect status code 200 and JSON object', () => {
      request(server)
        .post('/init/getMetrics')
        .expect(200)
        .expect('Content/Type', /json/);
    });
  });
});
