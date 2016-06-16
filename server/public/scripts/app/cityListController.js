'use strict';
var angular = require('angular');

module.exports = function($scope, cityApi) {
  cityApi.getAll().then(function(res) {
    $scope.cities = (res.data || []).map(function(el, i) {
      el.id = i;
      return el;
    });
  });

  $scope.visitedCitiesCount = function() {
    return ($scope.cities || []).reduce(function(acc, c) {
      return acc + (c.visited ? 1 :0);
    }, 0);
  };

  $scope.toggleVisited = function(city) {
    var currentState = city.visited || false;
    city.visited = !city.visited;

    var apiMethod = city.visited ? cityApi.hasVisited : cityApi.hasNotVisited;
    apiMethod(city.id);
  };

  $scope.showVisited = true;
  $scope.toggleShowVisited = function() {
    $scope.showVisited = !$scope.showVisited;
  };

  $scope.showNotVisited = true;
  $scope.toggleShowNotVisited = function() {
    $scope.showNotVisited = !$scope.showNotVisited;
  };

  $scope.filterVisited = function(city) {
    if (!$scope.showVisited && city.visited) return false;
    if (!$scope.showNotVisited && !city.visited) return false;
    return true;
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
