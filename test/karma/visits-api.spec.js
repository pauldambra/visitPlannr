const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('The visits api', function() {
    var visitApi, $httpBackend;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function (_visitApi_, _$httpBackend_) {
        visitApi = _visitApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should get the list of visits when called', function(done) {
      $httpBackend.when('GET', '/visits')
                          .respond(200, [{}, {}, {}]);

      visitApi.getAll()
        .then(
          function(visits) {
            expect(visits.data.length).toBe(3);
            done();
          },
          function(err) {console.error(err); done();}
        );

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call over http when setting visited state', function() {
      $httpBackend.expect('PUT', '/visits/3/visited')
                          .respond(200, [{}, {}, {}]);

      visitApi.hasVisited(3);

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call over http when setting not visited state', function() {
      $httpBackend.expect('DELETE', '/visits/0/visited')
                          .respond(200, [{}, {}, {}]);

      visitApi.hasNotVisited(0);

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
});
