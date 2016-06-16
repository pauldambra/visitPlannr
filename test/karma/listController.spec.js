const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('Listing Cities', function() {
    var scope, cityListController;
    var cities = [{}, {}, {}];
    var visitedIndex;
    var notVisitedIndex;

    afterEach(function() {
      cities = [{}, {}, {}];
    });

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        scope = $rootScope.$new();

        cityListController = $controller('CityListController',
            {
                '$scope': scope,
                'cityApi': {
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

    it('should have a list of Cities', function() {
        expect(scope.cities.length).toBe(3);
    });

    it('should count visited cities', function() {
      expect(scope.visitedCitiesCount()).toBe(0);
      cities[1].visited = true;
      expect(scope.visitedCitiesCount()).toBe(1);
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
