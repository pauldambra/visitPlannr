'use strict';

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
};
