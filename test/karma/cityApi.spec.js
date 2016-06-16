const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('The cities api', function() {
    var cityApi, $httpBackend;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function (_cityApi_, _$httpBackend_) {
        cityApi = _cityApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should get the list of cities when called', function(done) {
      $httpBackend.when('GET', '/cities')
                          .respond(200, [{}, {}, {}]);

      cityApi.getAll()
        .then(
          function(cities) {
            expect(cities.data.length).toBe(3);
            done();
          },
          function(err) {console.error(err); done();}
        );

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call over http when setting visited state', function() {
      $httpBackend.expect('PUT', '/cities/3/visited')
                          .respond(200, [{}, {}, {}]);

      cityApi.hasVisited(3);

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call over http when setting not visited state', function() {
      $httpBackend.expect('DELETE', '/cities/0/visited')
                          .respond(200, [{}, {}, {}]);

      cityApi.hasNotVisited(0);

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
});
