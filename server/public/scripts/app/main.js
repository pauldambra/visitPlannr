'use strict';

const angular = require('angular');

const visitPlannr = angular.module('visitPlannr', []);

visitPlannr.factory('visitApi',
  ['$http', require('./visitApi')]);

visitPlannr.controller('VisitListController',
  ['$scope', 'visitApi', require('./visitListController')]);
