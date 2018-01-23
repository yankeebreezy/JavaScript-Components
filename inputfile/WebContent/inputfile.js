var app = angular.module('app',[]);

app.controller('appctrl', function($scope) {
	
	$scope.upload = function() {
		var _URL = window.URL || window.webkitURL;
		var file,img;
	    if ((file = document.getElementById("img").files[0])) {
	        img = new Image();
	        img.onload = function() {
	            console.log(this.width + " " + this.height);
	        };
	        img.onerror = function() {
	            console.log( "not a valid file: " + file.type);
	        };
	        img.src = _URL.createObjectURL(file);
	    }
	}
})

app.directive('inputfile', function(){
	return{
		scope:{
			inputfile:"="
		},
		link: function(scope,elem,attr){
			elem.bind("change", function(changeEvent){
				var reader = new FileReader();
				reader.onload = function(loadEvent){
					scope.$apply(function(){
						scope.inputfile = loadEvent.target.result;
					});
				}
				reader.readAsDataURL(changeEvent.target.files[0]);
				console.log(changeEvent.target.files[0]);
			})
		}	
	};
})