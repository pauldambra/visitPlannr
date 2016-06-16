'use strict';

const angular = require('angular');

/*jslint browser: true */
window.$ = window.jQuery = require('jquery');

const visitPlannr = angular.module('visitPlannr', []);

visitPlannr.factory('visitApi',
  ['$http', require('./visitApi')]);

visitPlannr.controller('VisitListController',
  ['$scope', 'visitApi', require('./visitListController')]);
