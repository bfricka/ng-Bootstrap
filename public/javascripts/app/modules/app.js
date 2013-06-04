// Create application
var app = angular.module('myApp', []);

app.run([
  '$rootScope'
  , function($rootScope) {
    $rootScope.safeApply = function(fn) {
      if (this.$root.$$phase) {
        if (fn && (typeof fn === 'function')) {
          fn();
        } else {
          this.$apply(fn);
        }
      }
    };
  }
]);