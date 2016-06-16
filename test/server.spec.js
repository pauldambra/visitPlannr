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

  it('should return expected cities', done => {
    const expectedCities = ['Manchester', 'Liverpool', 'York', 'Las Vegas', 'Beijing'];

    request(app)
      .get('/cities')
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

  it('should allow setting a city as visited', done => {
    const index = 2;

    const checkThatChangeWasPersisted = () => {
      request(app)
        .get('/cities')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const result = res.body;
          var city = result[index];
          expect(city.visited).toBe(true);
          done();
        });
    };

    request(app)
      .put(`/cities/${index}/visited`)
      .expect(200, checkThatChangeWasPersisted);
  });

  it('should allow setting a city as not visited', done => {
    var index = 3;

    const checkThatVisitIsNotVisited = () => {
      request(app)
        .get('/cities')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const result = res.body;
          var city = result[index];
          expect(city.visited).toBe(false);
          done();
        });
    };

    const deleteVisitedState = () => {
      request(app)
        .delete(`/cities/${index}/visited`)
        .expect('Content-Type', /json/)
        .expect(200, checkThatVisitIsNotVisited);
    };

    request(app)
      .put(`/cities/${index}/visited`)
      .expect(200, deleteVisitedState);
  });
});
