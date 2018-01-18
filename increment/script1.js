(function(angular) {
  'use strict';
angular.module('customIncrementDirective', [])
  .controller('Controller', ['$scope', function($scope) {
  
  $scope.regex = '\\d+'
  $scope.incrementValue = 0;
  
  $scope.decrement = function() {
  $scope.count = $scope.incrementValue;
  $scope.count = $scope.count - 1;
    if($scope.count >= 0) {
      $scope.incrementValue = $scope.count;
    }
  };
  
  $scope.increment = function() {
  $scope.count = $scope.incrementValue;
  if(angular.isString($scope.count)){
    $scope.count = parseInt($scope.count);
  }

  $scope.count  = $scope.count + 1;
    if($scope.count <= 100) {
      $scope.incrementValue = $scope.count;
    }
  };
  }])
  .directive('incrementField', function() {
    return {
      templateUrl: 'increment.html',
      link: function(scope,elm,attr,ctrl){
        elm.on('keydown', function(event) {
           if(event.shiftKey){event.preventDefault(); return false;}
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    return true;
                } 
                else {
                    event.preventDefault();
                    return false;
                }
        })
      }
    };
  });
})(window.angular);
