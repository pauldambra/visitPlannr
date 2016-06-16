'use strict';

module.exports = function($http) {
  return {
    getAll: function() {
      return $http.get('/cities');
    },
    hasVisited: function(index) {
      $http.put('/cities/' + index + '/visited');
    },
    hasNotVisited: function(index) {
      $http.delete('/cities/' + index + '/visited');
    }
  };
};
