var app =angular.module('numApp',[]);

app.controller('numberController',function($scope){
  
  $scope.numberModal = 1;
  $scope.numberModal1 = 1;
  
  $scope.numberIncrement = function(field){
      performAction(field,"plus");
  }
  
  $scope.numberDecrement = function(field){
      performAction(field,"minus");
  }
  
  function performAction(field, op) {
      var count = 0;
      if(field == 1){
          count = parseInt($scope.numberModal);
      }else{
          count = parseInt($scope.numberModal1);
      }
      if(op == "plus"){
        if(parseInt($scope.numberModal)+parseInt($scope.numberModal1)<100) {
          count = count + 1;
        }  
      }else{
          if(field == 1) {
            if($scope.numberModal1 == 0 && count == 1){
              return;
            } else {
              if(count != 0){
                  count = count -1;
                }
            }
          } else{
              if($scope.numberModal == 0 && count == 1){
                  return;
              } else {
                 if(count != 0){
                      count = count -1;
                  }
              }
          }
      }
      if(field == 1){
         $scope.numberModal = count;
      }else{
         $scope.numberModal1 = count;
      }
  }

})

app.directive('numberDir',function(){
    return {
            restrict:"E",
            transclude:true,
            scope:{ numbermodal: "=numbermodal",decrement:"&dec",increment:"&inc"},
            template: "<div><input type='button' ng-click='decrement()' value='-' style='float:left'/>"+
                      "<input type='text' ng-model='numbermodal' maxlength='3' minlength='1' size=3 style='float:left'/>"+
                      "<input type='button' ng-click='increment()' value='+' style='float:left'/></div>",
            link: function(scope,elm,attr,ctrl){          

            elm.on('keydown', function(event) {
               if(event.shiftKey)
               {
                 event.preventDefault(); 
                 return false;
                 
               }
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                  return true;
                } else if (event.which >= 48 && event.which <= 57) {
                  return true;
                } else  if (event.which >= 96 && event.which <= 105) {
                  return true;
                }
                else {
                  event.preventDefault();
                  return false;
                }
            });

            elm.on('keyup', function() {
              var num = scope.numbermodal;
              if(!num) {
                scope.numbermodal = 0;
                return;
              }
              console.log(num);
              var pattern = /^[0-9]$|^[1-9][0-9]?$|^100$/;
              if(!pattern.test(num)){
                console.log('d');
                scope.numbermodal = 0;
                return;
              }
            });       
        }      
    }
})