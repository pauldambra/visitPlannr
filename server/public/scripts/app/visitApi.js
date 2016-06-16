'use strict';

module.exports = function($http) {
  return {
    getAll: function() {
      return $http.get('/visits');
    }
  };
};
