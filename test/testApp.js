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
      .expect(200, done);
  });

  it('Should serve homepage when path is GET /index.html', (done) => {
    request(createApp(config))
      .get('/index.html')
      .expect(200, done);
  });

  it('Should redirect to login when path is GET /guestBook', (done) => {
    request(createApp(config))
      .get('/guestBook')
      .expect('location', '/login.html')
      .expect(302, done);
  });

  config.sessions = {
    1: {
      id: 1,
      name: 'abcd'
    }
  };
  it('Should serve guestBook when user is loggedIn GET /guestBook', (done) => {
    request(createApp(config))
      .get('/guestBook')
      .set('Cookie', 'id=1')
      .expect(200, done);
  });

  it('Should post comment when path is POST /comment', (done) => {
    request(createApp(config))
      .post('/comment')
      .send('name=abcd&comment=hello')
      .expect('')
      .expect(201, done);
  });

  it('Should give status 404 when path not found', (done) => {
    request(createApp(config))
      .get('/getnothing')
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(404, done);
  });
});

describe('signup requests', () => {
  const config = {
    users: [],
    sessions: {},
    path: './public',
    guestBookFile: 'test/data/guestBook.json'
  };
  it('Should redirect to login after signingup', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=abcd')
      .expect('location', '/login.html')
      .expect(302, done);
  });

  it('Should redirect to signup when username is not given', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=')
      .expect('location', '/signup.html')
      .expect(401, done);
  });
});

describe('login requests', () => {
  let config = {
    users: [],
    sessions: {},
    path: './public',
    guestBookFile: 'test/data/guestBook.json'
  };
  it('Should redirect to signup if not signedup', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=abcd')
      .expect('location', '/signup.html')
      .expect(302, done);
  });

  config = {
    users: ['king'],
    sessions: {},
    path: './public',
    guestBookFile: 'test/data/guestBook.json'
  };
  it('Should redirect to guestBook when user is already signedup', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=king')
      .expect('location', '/guestBook')
      .expect(302, done);
  });
});