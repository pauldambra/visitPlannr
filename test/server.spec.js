'use strict';

const expect = require('expect');
const request = require('supertest');
const app = require('../server');

describe('the server', () => {
  it('should return 404 on unknown url', done => {
    request(app)
      .get('/nowhere')
      .expect(404, done);
  });

  it('should return expected JSON on start', done => {
    const expectedCities = ['Manchester', 'Liverpool', 'York', 'Las Vegas', 'Beijing'];

    request(app)
      .get('/visits')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        const result = res.body;
        expect(result.length).toBe(5);
        expect(result.map(r => r.City)).toEqual(expectedCities);
        done();
      });
  });

  it('should return html at the root url', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
