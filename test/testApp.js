const request = require('supertest');
const { app } = require('../src/app.js');

describe('test App', () => {
  it('Should redirect to homepage when path is GET /', (done) => {
    request(app())
      .get('/')
      .expect('location', '/homepage.html')
      .expect(302, done);
  });

  it('Should serve guest book when path is GET /guestBook', (done) => {
    request(app())
      .get('/guestBook')
      .expect(/comment/)
      .expect(200, done);
  });

  it('Should post comment when path is POST /comment', (done) => {
    request(app())
      .post('/comment')
      .send('')
      .expect(200, done);
  });

  it('Should give status 404 when path not found', (done) => {
    request(app())
      .get('/getnothing')
      .expect('content-type', 'text/plain')
      .expect(404, done);
  });
});
