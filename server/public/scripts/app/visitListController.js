'use strict';

module.exports = function($scope, visitApi) {
  $scope.visits = visitApi.getAll();
};
