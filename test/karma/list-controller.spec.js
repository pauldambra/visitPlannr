const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('Listing visits', function() {
    var scope, visitListController;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        scope = $rootScope.$new();

        visitListController = $controller('VisitListController',
            {
                '$scope': scope,
                'visitApi': {
                  getAll: function() {
                    return [{}, {}, {}, {}];
                  }
                }
            });
    }));

    it('should have a list of visits', function() {
        expect(scope.visits.length).toBe(4);
    });
});
