'use strict';

module.exports = function($scope, visitApi) {
  visitApi.getAll().then(function(res) {
    $scope.visits = res.data;
  });

  $scope.toggleVisited = function(visit) {
    var currentState = visit.visited || false;
    visit.visited = !visit.visited;
  };
};
