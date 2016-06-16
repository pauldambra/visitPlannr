const angular = require('angular');
require('angular-mocks');

describe('Listing visits', function() {
    var scope, visitListController;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        scope = $rootScope.$new();

        visitListController = $controller('VisitListController', {
                '$scope': scope
            });
    }));

    it('should have a list of visits', function() {
        expect(scope.visits.length).not.toBe(0);
    });
});
