const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('Listing visits', function() {
    var scope, visitListController;
    var cities = [{}, {}, {}];
    var visitedIndex;
    var notVisitedIndex;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        scope = $rootScope.$new();

        visitListController = $controller('VisitListController',
            {
                '$scope': scope,
                'visitApi': {
                  getAll: function() {
                    return {
                      then: function(cb) {
                        cb({data: cities});
                      }
                    };
                  },
                  hasVisited: function(index) {
                    visitedIndex = index;
                  },
                  hasNotVisited: function(index) {
                    notVisitedIndex = index;
                  }
                }
            });
    }));

    it('should have a list of visits', function() {
        expect(scope.visits.length).toBe(3);
    });

    it('should be able to toggle a city to visited state', function() {
      expect(cities[1].visited).toBeFalsy();
      scope.toggleVisited(cities[1]);
      expect(cities[1].visited).toBe(true);
    });

    it('should be able to toggle a city to unvisited state', function() {
      cities[0].visited = true;
      expect(cities[0].visited).toBe(true);
      scope.toggleVisited(cities[0]);
      expect(cities[0].visited).toBe(false);
    });

    it('should call the visit api when setting visited', function() {
        scope.toggleVisited(cities[2]);
        expect(visitedIndex).toBe(2);
    });

    it('should call the visit api when setting not visited', function() {
      scope.toggleVisited(cities[1]);
      scope.toggleVisited(cities[1]);
      expect(notVisitedIndex).toBe(1);
    });
});
