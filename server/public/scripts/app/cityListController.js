'use strict';
var angular = require('angular');

module.exports = function($scope, cityApi) {
  cityApi.getAll().then(function(res) {
    $scope.cities = (res.data || []).map(function(el, i) {
      el.id = i;
      return el;
    });
  });

  $scope.toggleVisited = function(city) {
    var currentState = city.visited || false;
    city.visited = !city.visited;

    var apiMethod = city.visited ? cityApi.hasVisited : cityApi.hasNotVisited;
    apiMethod(city.id);
  };

  $scope.filterCities = function(city) {
    if (!$scope.search) return true;

    var haystack = city.Attractions ? angular.copy(city.Attractions) : [];
    haystack.unshift(city.Country ? city.Country : '');

    for (var i = 0; i < haystack.length; i++) {
      if (haystack[i].toLowerCase().indexOf($scope.search.toLowerCase()) != -1) {
        return true;
      }
    }

    return false;
  };
};
