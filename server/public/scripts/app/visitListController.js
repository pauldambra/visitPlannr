'use strict';

module.exports = function($scope, visitApi) {
  visitApi.getAll().then(function(res) {
    $scope.visits = res.data;
  });
};
