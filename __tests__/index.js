const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const assert = require('assert');
const supertest = require('supertest');
const tempWrite = require('temp-write');
const mkdirp = require('mkdirp');
const serverReady = require('server-ready');

let PORT = 3033;

const bin = path.join(__dirname, '../bin/index');

function cli(args) {
  return cp.spawn('node', ['--', bin, '-p', PORT].concat(args), {
    cwd: __dirname,
    stdio: ['pipe', process.stdout, process.stderr]
  });
}

describe('cli', () => {
  let child;
  let request;
  let dbFile;
  let routesFile;

  beforeEach(() => {
    // dbFile = tempWrite.sync(
    //   JSON.stringify({
    //     posts: [{ id: 1 }, { _id: 2 }],
    //     comments: [{ id: 1, post_id: 1 }]
    //   }),
    //   'db.json'
    // );

    // routesFile = tempWrite.sync(JSON.stringify({ '/blog/*': '/$1' }), 'routes.json');

    ++PORT;
    request = supertest(`http://localhost:${PORT}`);
  });

  afterEach(() => {
    child.kill('SIGKILL');
  });

  describe('db.json', () => {
    beforeEach(done => {
      child = cli(['../tests/db.json']);
      serverReady(PORT, done);
    });

    test('should support JSON file', done => {
      request.get('/posts').expect(200, done);
    });

    test('should send CORS headers', done => {
      const origin = 'http://example.com';
      request
        .get('/posts')
        .set('Origin', origin)
        .expect('access-control-allow-origin', origin)
        .expect(200, done);
    });
  });

  describe('generateData.js', () => {
    beforeEach(done => {
      child = cli(['../tests/generateData.js']);
      serverReady(PORT, done);
    });

    test('should support JS file', done => {
      request.get('/posts').expect(200, done);
    });

    test('should send CORS headers', done => {
      const origin = 'http://example.com';
      request
        .get('/posts')
        .set('Origin', origin)
        .expect('access-control-allow-origin', origin)
        .expect(200, done);
    });
  });

  describe('with empty CLI arguments', () => {
    beforeEach(done => {
      child = cli([]);
      serverReady(PORT, done);
    });

    test('should work', done => {
      request.get('/posts').expect(200, done);
    });
  });

  describe('should authenticate user', () => {
    beforeEach(done => {
      child = cli([]);
      serverReady(PORT, done);
    });

    test('authenticate with success', done => {
      request
        .post('/login')
        .send({ username: 'test' })
        .expect(200, done);
    });

    test('authenticate with failure', done => {
      request.post('/login', { username: 'randomUser' }).expect(401, done);
    });
  });
});
