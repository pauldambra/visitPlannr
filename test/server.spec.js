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

  it('should allow setting a visit as visited', done => {
    const index = 2;

    const checkThatChangeWasPersisted = () => {
      request(app)
        .get('/visits')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const result = res.body;
          var visit = result[index];
          expect(visit.visited).toBe(true);
          done();
        });
    };

    request(app)
      .put(`/visits/${index}/visited`)
      .expect(200, checkThatChangeWasPersisted);
  });

  it('should allow setting a visit as not visited', done => {
    var index = 3;

    const checkThatVisitIsNotVisited = () => {
      request(app)
        .get('/visits')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const result = res.body;
          var visit = result[index];
          expect(visit.visited).toBe(false);
          done();
        });
    };

    const deleteVisitedState = () => {
      request(app)
        .delete(`/visits/${index}/visited`)
        .expect('Content-Type', /json/)
        .expect(200, checkThatVisitIsNotVisited);
    };

    request(app)
      .put(`/visits/${index}/visited`)
      .expect(200, deleteVisitedState);
  });
});
