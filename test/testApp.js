const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('test App', () => {
  const config = {
    path: './public',
    guestBookFile: 'test/data/guestBook.json'
  };
  it('Should redirect to homepage when path is GET /', (done) => {
    request(createApp(config))
      .get('/')
      .expect('location', '/homepage.html')
      .expect(302, done);
  });

  it('Should serve guest book when path is GET /guestBook', (done) => {
    request(createApp(config))
      .get('/guestBook')
      .expect(/comment/)
      .expect(200, done);
  });

  it('Should post comment when path is POST /comment', (done) => {
    request(createApp(config))
      .post('/comment')
      .send('name=abcd,comment=hello')
      .expect('')
      .expect(201, done);
  });

  it('Should give status 404 when path not found', (done) => {
    request(createApp(config))
      .get('/getnothing')
      .expect('content-type', 'text/plain')
      .expect('/getnothing not found')
      .expect(404, done);
  });
});
