'use strict';

module.exports = function($http) {
  return {
    getAll: function() {
      return $http.get('/visits');
    },
    hasVisited: function(index) {
      $http.put('/visits/' + index + '/visited');
    },
    hasNotVisited: function(index) {
      $http.delete('/visits/' + index + '/visited');
    }
  };
};
