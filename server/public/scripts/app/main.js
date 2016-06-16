'use strict';

var angular = require('angular');

/*jslint browser: true */
window.$ = window.jQuery = require('jquery');

var visitPlannr = angular.module('visitPlannr', []);

visitPlannr.factory('cityApi',
  ['$http', require('./cityApi')]);

visitPlannr.controller('CityListController',
  ['$scope', 'cityApi', require('./cityListController')]);
