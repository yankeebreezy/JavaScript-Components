var scrollApp = angular.module('scrollApp', []);

scrollApp.controller('scrollController', function($scope,$http) {
		$scope.data = [];
		var page = 0;
		$scope.defaultLoading = true;
		
		$scope.loadData = function() {	
			if($scope.defaultLoading==true){
				for(var i = 0; i < 5; i++) {
					$scope.data.push({id: page, details: [{time:'1:17',activities:'changed pwd'},{time:'10:05',activities:'changed username'}]});
					page += 10;
				}	
			}
		};

		$scope.loadData();
});

scrollApp.directive('whenScrolled', ['scrollService', function(scrollService) {
	return {
		restrict : 'A',
		link : function(scope,element,attribute,controller) {

				element.bind('scroll', function() {
					
					//scroll down range to fetch data	
					if(element[0].scrollHeight - element[0].offsetHeight == element[0].scrollTop) {
						var resPromise = scrollService.scrollDownData();
						resPromise.then(function(result) {
							scope.data.splice(0,scope.data.length);
							angular.forEach(result.data, function(k,v) {
								scope.data.push(k);
							});
							checkForJustNow();
						});
						
						element[0].scrollTop = element[0].clientHeight - 60;
					}
					
					//scroll up range to fetch data
					if(element[0].scrollTop == 0) {
						var resPromise = scrollService.scrollUpData();
						resPromise.then(function(result) {
							scope.data.splice(0,scope.data.length);
							angular.forEach(result.data, function(k,v) {
								scope.data.push(k);
							});
							checkForJustNow();
						});

						element[0].scrollTop = element[0].clientHeight - 280;
					}
					
			});

			function checkForJustNow() {
				var d = new Date();
				var currentTime = d.getHours()+":"+d.getMinutes();
				angular.forEach(scope.data, function(key,value) {
					angular.forEach(key.details, function(k,v) {
						var curr;
						if(currentTime.substr(0,2)>12){
							var hour = parseInt(currentTime.substr(0,2))%12; 
							if(hour.toString.	length == 1){
								curr = '0' + hour+":"+currentTime.substr(3,5);	
							}else{
								curr = hour+":"+currentTime.substr(3,5);	
							}
						}
						if(k.time == curr ) {	
							k.time = 'Just now';
						}	
					});
				});
			}
		}
	};
}]);

scrollApp.service('scrollService', ['$http', function($http, $scope){
	var numDown = 0;
	var numUp = 0;
	this.scrollDownData = function () {
		return $http({method:"GET", url:"dummy"+numDown+".json"}).then(function(result){
          	//scroll down data will be accessible after promise resolves
          	numDown += 1;
          	if(numDown==3){
          		numDown = 0;
          	}
            return result;
        });
	};

	this.scrollUpData = function () {
		return $http({method:"GET", url:"upscroll"+numUp+".json"}).then(function(result){
			//scoll up data will be accessible after promise resolves
			numUp += 1;
			if(numUp==3){
				numUp = 0;
			}
			return result;
		});
	};
}]);