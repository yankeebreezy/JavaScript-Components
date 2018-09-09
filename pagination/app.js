 app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
   
});

app.directive('paging', function() {
    return {
      restrict : 'E',
      templateUrl: 'pagination.html',
      link: function(scope,elm,attr,ctrl){
        scope.data = [{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"},{id:1,name:"a"}]; 
        angular.element(document.querySelector('.scrollDiv')).bind('scroll', function(){
            console.log("scroll");
            var obj = {
              "id":1,"name":"c"
            };

            var newObj = [
            {
              "id":2,"name":"d"
            }, {
              "id":2,"name":"d"
            }, {
              "i":2,"name":"d"
            }, {
              "id":2,"name":"d"
            }, {
              "id":2,"name":"d"
            }];
            angular.copy(newObj, scope.data);
        });
      }
    };
  });
