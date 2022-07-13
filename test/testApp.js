const request = require('supertest');
const { app } = require('../src/app.js');

describe('test App', () => {
  it('Should redirect to homepage when path is /', (done) => {
    request(app())
      .get('/')
      .expect(302, done);
  });

  it('Should serve home page when path is /homepage.html', (done) => {
    request(app())
      .get('/homepage.html')
      .expect('content-type', 'text/html')
      .expect(200, done);
  });
});
