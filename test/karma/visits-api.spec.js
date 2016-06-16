const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('The visits api', function() {
    var visitApi, $httpBackend, requestHandler;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function (_visitApi_, _$httpBackend_) {
        visitApi = _visitApi_;
        $httpBackend = _$httpBackend_;

        requestHandler = $httpBackend.when('GET', '/visits')
                            .respond(200, [{}, {}, {}]);
    }));

    it('should get the list of visits when called', function(done) {
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
});
