'use strict';

var angular = require('angular');

/*jslint browser: true */
window.$ = window.jQuery = require('jquery');

var visitPlannr = angular.module('visitPlannr', []);

visitPlannr.factory('visitApi',
  ['$http', require('./visitApi')]);

visitPlannr.controller('VisitListController',
  ['$scope', 'visitApi', require('./visitListController')]);
