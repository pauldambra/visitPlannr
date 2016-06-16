'use strict';

module.exports = function($scope, visitApi) {
  visitApi.getAll().then(function(res) {
    $scope.visits = (res.data || []).map(function(el, i) {
      el.id = i;
      return el;
    });
  });

  $scope.toggleVisited = function(visit) {
    var currentState = visit.visited || false;
    visit.visited = !visit.visited;

    var apiMethod = visit.visited ? visitApi.hasVisited : visitApi.hasNotVisited;
    apiMethod(visit.id);
  };
};
