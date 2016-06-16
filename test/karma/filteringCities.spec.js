const angular = require('angular');
require('angular-mocks');
require('../../server/public/scripts/app/main');

describe('Filtering the cities list', function() {
    var scope, cityListController;

    beforeEach(angular.mock.module('visitPlannr'));

    beforeEach(inject(function ($rootScope, $controller, _$location_) {
        scope = $rootScope.$new();
        scope.search = 'ari';

        cityListController = $controller('CityListController',
            {
                '$scope': scope,
                'cityApi': {getAll: function() {
                  return {
                    then: function(cb) {
                      cb({data: []});
                    }
                  };
                }}
            });
    }));

    it('should not filter when search has not been set', function() {
      scope.search = undefined;
      var result = scope.filterCities({City: 'paris'});
      expect(result).toBe(true);
    });

    it('should not filter when search is blank', function() {
      scope.search = '';
      var result = scope.filterCities({City: 'paris'});
      expect(result).toBe(true);
    });

    it('should not match in the city name', function() {
      var result = scope.filterCities({City: 'paris'});
      expect(result).toBe(false);
    });

    it('should match when present in the country name', function() {
      var result = scope.filterCities({Country: 'paris'});
      expect(result).toBe(true);
    });

    it('should match when present in the country name and differently cased', function() {
      var result = scope.filterCities({Country: 'paRIs'});
      expect(result).toBe(true);
    });

    it('should not match when not present in the country name', function() {
      var result = scope.filterCities({Country: 'Iraq'});
      expect(result).toBe(false);
    });

    it('should match when an attraction matches', function() {
      var result = scope.filterCities({Attractions: ['paris']});
      expect(result).toBe(true);
    });

    it('should match when an attraction matches and differently cased', function() {
      scope.search = 'ARi';
      var result = scope.filterCities({Attractions: ['paris']});
      expect(result).toBe(true);
    });

    it('should not match when an attraction does not matches', function() {
      var result = scope.filterCities({Attractions: ['monkey butlers']});
      expect(result).toBe(false);
    });
});
