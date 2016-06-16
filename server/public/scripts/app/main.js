'use strict';

const angular = require('angular');

const visitPlannr = angular.module('visitPlannr', []);

visitPlannr.controller('listVisitsController', function($scope) {
  $scope.visits = [];
});
