var flightapp = angular.module('flightapp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

flightapp.controller('flightctrl', function($scope, $http) {

  $scope.states = ['Baglung (BGL)','Baitadi (BIT)','Bajhang (BJH)','Bajura	(BJU)','Bhadrapur (BDP)','Siddharthanagar (BWA)','Bharatpur (BHR)','Bhojpur (BHP)','Biratnagar (BIR)','Chaurjahari (RUK)','Tulsipur (DNP)','Darchula (DAP)','Dhangadhi (DHI)','Dolpa (DOP)','Dipayal (SIH)','Gorkha (GKH)','Janakpur (JKR)','Jiri (JIR)','Jomsom (JMO)','Chandan Nath (JUM)','Kamal Bazar','Kangel Danda','Kathmandu (KTM)','Khanidanda (KDN)','Khotang Bazar (TMK)','Lamidanda (LDN)','Langtang (LTG)','Lukla (LUA)','Bhim Datta (XMG)','Manang (NGX)','Meghauli (MEY)','Nepalgunj (KEP)','Phaplu (PPL)','Pokhara (PKR)','Rajbiraj (RJB)','Manthali (RHP)','Rara National Park','Rolpa (RPA)','Rukumkot (RUK)','Rumjatar (RUM)','Sanphebagar (FEB)','Simara (SIF)','Simikot (IMK)','Birendranagar (SKH)','Syangboche (SYH)','Taplejung (VNTJ)','Tikapur (TPU)','Tumlingtar (TMI)'];

  $scope.priceRange = 10000;
  $scope.flightDetailFlag = false;
  $scope.model = {
  	isDisabled : true
	}
  $scope.chooseFlightType = function(flighttype){
  	$scope.flight = flighttype;
  	if(flighttype != 'oneway'){
  		$scope.model.isDisabled = false;
  	} else {
  		$scope.model.isDisabled = true;
  	}
  }
});

flightapp.controller('dateController', function($scope) {
	
  $scope.today = function() {
  	$scope.dt = new Date;
  }
  $scope.today();

  $scope.dateOptions = {
  	dateDisabled : disabled,
  	formatYear: 'yy',
  	maxDate : 	new Date(2020, 5, 22),
  	minDate : new Date(),
  	startingDay: 1
  }

  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }


  $scope.openDatePickerDepart = function() {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.openDatePickerReturn = function() {
    $scope.popup2.opened = true;
  };

  $scope.popup2 = {
    opened: false
  };	
})

flightapp.controller('numberController',function($scope){
  
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

flightapp.directive('numberDir',function(){
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
              
              var pattern = /^[0-9]$|^[1-9][0-9]?$|^100$/;
              if(!pattern.test(num)){
                scope.numbermodal = 0;
                return;
              }
            });       
        }      
    }
})

flightapp.directive('searchbutton', ['flightDetails', function(flightDetails){
	return{
		restrict :"E",
		template : "<input type='button' value='Search' ng-click='searchFlight()'>",
		link : function(scope,elem,attr,ctrl){
      scope.searchFlight = function(){
            scope.flightdata = [];
            scope.flightDetailFlag = true;
				  	var flightSearchResponse = flightDetails.flightData();
  					flightSearchResponse.then(function(result) {
              angular.forEach(result.data, function(k,v) {
                if(k.from == scope.from && k.to == scope.to){
                  scope.flightdata.push(k);
                }
                console.log(scope.flight);
                if(scope.flight == 'roundtrip'){
                 if(k.from == scope.to && k.to == scope.from){
                  scope.flightdata.push(k);
                  } 
                }
              }); 
				    })
            console.log(scope.flightdata);
			   }
		  }
	 };
}])

flightapp.factory('flightDetails', ['$http', function($http,$scope){
	 return {
	 	flightData : function(){
		return $http({method:"GET",url:"flight.json"}).then(function(result){
			return result;
		});
	}
}
}])

flightapp.filter('pirceRangeFilter', function() {
  return function(flight, price) {
    var filteredFlight = [];
    angular.forEach(flight, function(flightObj){
      if(flightObj.price >=1 && flightObj.price <= price) {
        filteredFlight.push(flightObj);
      }
    });
    return filteredFlight;
  }
})