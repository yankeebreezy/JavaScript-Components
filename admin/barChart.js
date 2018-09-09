	var barApp = angular.module('barChartApp',[]);

		barApp.controller('barChartController', function($scope){
			$scope.data = [
							{date:"1/1",operator:"NTC",cost:200},
							{date:"1/1",operator:"NCELL",cost:500},
							{date:"1/1",operator:"SMARTCELL",cost:300},
							{date:"2/1",operator:"NTC",cost:1000},
							{date:"2/1",operator:"NCELL",cost:500},
							{date:"2/1",operator:"SMARTCELL",cost:1000},
							{date:"3/1",operator:"NTC",cost:730},
							{date:"3/1",operator:"NCELL",cost:150},
							{date:"3/1",operator:"SMARTCELL",cost:50},
							{date:"4/1",operator:"NTC",cost:950},
							{date:"4/1",operator:"NCELL",cost:550},
							{date:"4/1",operator:"SMARTCELL",cost:450},
							{date:"5/1",operator:"NTC",cost:100},
							{date:"5/1",operator:"NCELL",cost:600},
							{date:"5/1",operator:"SMARTCELL",cost:500},
							{date:"6/1",operator:"NTC",cost:100},
							{date:"6/1",operator:"NCELL",cost:600},
							{date:"6/1",operator:"SMARTCELL",cost:500},
							{date:"7/1",operator:"NTC",cost:100},
							{date:"7/1",operator:"NCELL",cost:600},
							{date:"7/1",operator:"SMARTCELL",cost:500},
							{date:"8/1",operator:"NTC",cost:100},
							{date:"8/1",operator:"NCELL",cost:600},
							{date:"8/1",operator:"SMARTCELL",cost:500},
							{date:"9/1",operator:"NTC",cost:100},
							{date:"9/1",operator:"NCELL",cost:600},
							{date:"9/1",operator:"SMARTCELL",cost:500},
							{date:"10/1",operator:"NTC",cost:100},
							{date:"10/1",operator:"NCELL",cost:600},
							{date:"10/1",operator:"SMARTCELL",cost:500},
							{date:"11/1",operator:"NTC",cost:200},
							{date:"11/1",operator:"NCELL",cost:500},
							{date:"11/1",operator:"SMARTCELL",cost:300},
							{date:"12/1",operator:"NTC",cost:1000},
							{date:"12/1",operator:"NCELL",cost:500},
							{date:"12/1",operator:"SMARTCELL",cost:1000},
							{date:"13/1",operator:"NTC",cost:730},
							{date:"13/1",operator:"NCELL",cost:150},
							{date:"13/1",operator:"SMARTCELL",cost:50},
							{date:"14/1",operator:"NTC",cost:950},
							{date:"14/1",operator:"NCELL",cost:550},
							{date:"14/1",operator:"SMARTCELL",cost:450},
							{date:"15/1",operator:"NTC",cost:100},
							{date:"15/1",operator:"NCELL",cost:600},
							{date:"15/1",operator:"SMARTCELL",cost:500},
							{date:"16/1",operator:"NTC",cost:100},
							{date:"16/1",operator:"NCELL",cost:600},
							{date:"16/1",operator:"SMARTCELL",cost:500},
							{date:"17/1",operator:"NTC",cost:100},
							{date:"17/1",operator:"NCELL",cost:600},
							{date:"17/1",operator:"SMARTCELL",cost:500},
							{date:"18/1",operator:"NTC",cost:100},
							{date:"18/1",operator:"NCELL",cost:600},
							{date:"18/1",operator:"SMARTCELL",cost:500},
							{date:"19/1",operator:"NTC",cost:100},
							{date:"19/1",operator:"NCELL",cost:600},
							{date:"19/1",operator:"SMARTCELL",cost:500},
							{date:"20/1",operator:"NTC",cost:100},
							{date:"20/1",operator:"NCELL",cost:600},
							{date:"20/1",operator:"SMARTCELL",cost:500}
							];
			$scope.find = function(){
				$scope.json = [];
				for(var i=0;i<$scope.data.length;i++){
					if(i==0){
					$scope.json.push({date:$scope.data[i].date,operator:[{op:$scope.data[i].operator,cost:$scope.data[i].cost}]});    
				}else{
					var newEntry = true;
					for(var j=0;j<$scope.json.length;j++){
						if($scope.json[j].date == $scope.data[i].date){
							$scope.json[j].operator.push({op:$scope.data[i].operator,cost:$scope.data[i].cost});
							newEntry = false;
						}
					}
					if(newEntry == true){
						$scope.json.push({date:$scope.data[i].date,operator:[{op:$scope.data[i].operator,cost:$scope.data[i].cost}]});    
						}
					}
				}
			};

			$scope.d3DataFormat = function() {
				 $scope.j = [];
				for(var i=0;i<$scope.data.length;i++){
					var json = {};
					if(i == 0) {
						var op = $scope.data[i].operator; var cost = $scope.data[i].cost;
						json['date'] = $scope.data[i].date;
						json[op] = cost;
						$scope.j.push(json);
				    }else {
				    	var newEntry = true;
				    	for(var k=0;k<$scope.j.length;k++){
							if($scope.j[k].date==$scope.data[i].date){
								var op = $scope.data[i].operator; var cost = $scope.data[i].cost;
				            	$scope.j[k][op]=cost;
				            	newEntry=false;
							} else {
								var op = $scope.data[i].operator; var cost = $scope.data[i].cost;
								json['date'] = $scope.data[i].date;
								json[op] = cost;
							}
						}
						if(newEntry == true) {
							$scope.j.push(json);
						}
					}
				}
			};
			$scope.d3DataFormat();
			$scope.find();
	});

	barApp.directive('barChart', ["d3", function(d3) {

			var svg;
			var legendDiv;
			var toolTipDiv;
			var globalData;
			var globalKeys;
			var checkBoxFlagElem = [];
		
		var drawBar = function(data) {

			if(svg){
				d3.select("svg").remove();		
			}
			if(toolTipDiv){
				d3.select(".toolTip").remove();
			}

			toolTipDiv = d3.select("bar-chart").append("div").attr("class","toolTip");

			svg = d3.select("#barDiv").append('svg');
			svg.attr("width",2000).attr("height",300).attr("style","padding-left:10px");
			
			var margin = {top: 20, right: 20, bottom: 30, left: 20};
		    width = +svg.attr("width") - margin.left - margin.right,
		    height = +svg.attr("height") - margin.top - margin.bottom,
		    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x0 = d3.scaleBand()
			    .rangeRound([0, width])
			    .paddingInner(0.1);

			var x1 = d3.scaleBand()
			    .padding(0.05);

			var y = d3.scaleLinear()
			    .rangeRound([height, 0]);

			var z = d3.scaleOrdinal()
			    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			var keySet = new Set();
			for(key in data){
				for(k in data[key]){
					if(k != 'date') {
						keySet.add(k);
					}

				}
			}
			var keys = Array.from(keySet);
			    
			x0.domain(data.map(function(d) { return d.date; }));
			x1.domain(keys).rangeRound([0, x0.bandwidth()]);
			y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

			g.append("g")
			   .selectAll("g")
			   .data(data)
			   .enter().append("g")
			   .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; })
			   .selectAll("rect")
			   .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
			   .enter().append("rect")
			   .on("mouseover", function(d,i){d3.select(this).attr('fill','#F1ED7C');
			   									toolTipDiv.style("left", d3.event.pageX+"px");
			   										toolTipDiv.style("top",d3.event.pageY+"px");
			   											toolTipDiv.style("display","inline-block");
			   												toolTipDiv.html((d.key) + "</br>" +(d.value));})
			   .on("mouseout", function(d){d3.select(this).attr("fill", z(d.key));
												toolTipDiv.style("display","none");})
			   .attr("x", function(d) { return x1(d.key); })
			   .attr("y", function(d) { return y(d.value); })
			   .attr("width", x1.bandwidth())
			   .attr("height", function(d) { return height - y(d.value); })
			   .attr("fill", function(d) { return z(d.key); });

			g.append("g")
			   .attr("class", "axis")
			   .attr("transform", "translate(0," + height + ")")
			   .call(d3.axisBottom(x0));

			g.append("g")
			   .attr("class", "axis")
			   .call(d3.axisLeft(y).ticks(null, "s"))
			   .append("text")
			   .attr("x", 2)
			   .attr("y", y(y.ticks().pop()) + 0.5)
			   .attr("dy", "0.32em")
			   .attr("fill", "#000")
			   .attr("font-weight", "bold")
			   .attr("text-anchor", "start")
			   .text("Cost");

		    if(legendDiv){
		    	legendDiv = d3.select("#legendDiv").select("svg").remove();
			}

		    legendDiv = d3.select("#legendDiv")
		       .append("svg")
		       .attr("width",200)
		       .attr("height",100)
		       .append("g")
			   .attr("font-family", "sans-serif")
			   .attr("font-size", 10)
			   .attr("text-anchor", "end")
			   .selectAll("g")
			   .data(globalKeys)
			   .enter().append("g")
			   .attr("transform", function(d, i) { return "translate(90," + i * 20 + ")"; });

			legendDiv.append("rect")
			    .attr("x", legendDiv.attr("width") - 15)
			    .attr("width", 19)
			    .attr("height", 19)
			    .attr("fill", z);

			legendDiv.append("text")
			    .attr("x", legendDiv.attr("width") - 20)
			    .attr("y", 9.5)
			    .attr("dy", "0.32em")
			    .text(function(d) { return d; });

			legendDiv.append("foreignObject")
	        	.attr("width", 100)
	        	.attr("height", 100)
	        	.html(function(key){if(checkBoxFlagElem.includes(key)){ return "<input type=checkbox id="+key+" style='margin:0 !important'>";} else{return "<input type=checkbox id="+key+" checked style='margin:0 !important'>";} })
	        	.attr("x", legendDiv.attr("width") + 10)
	        	.attr("width",25)
				.attr("height",55)
				.data(globalData)
				.data(function(d) { return globalKeys.map(function(key) { return key; }); })
		        .on("click", function(d, i){
		            var newDataFlag = true;
		            if(checkBoxFlagElem.length == 0){
		            	checkBoxFlagElem.push(d);	
		            } else {
		            	if(checkBoxFlagElem.includes(d)) {
		            		checkBoxFlagElem.splice(checkBoxFlagElem.indexOf(d),1);
		            		newDataFlag = false;
		            	} else {
		            		checkBoxFlagElem.push(d);
		            	}
		            }
		            
		            var newData = [];
		            	for(k in globalData){
		            		var json = {};
		            		for(v in globalData[k]){
		   						if(!checkBoxFlagElem.includes(v)) {
		   							json[v] = globalData[k][v];
		   						}	
		            		}  
		            		newData.push(json);
		            	}
		            
		            drawBar(newData);
		        });					
		};



		
		return {
				restrict : 'EA',
				//scope : {},
				template : '<div id="barDiv"></div><div id="legendDiv"></div>',
				compile: function(element, attribute, transclude) {
						var barDiv = d3.select("#barDiv")
										.attr("float","left")
									 	.attr("style","overflow:auto;width:500px;height:320px;position:absolute");
						var legendDiv = d3.select("#legendDiv")
										.attr("style","width:50px;height:320px;float:right;padding-right:210px;");

					return function(scope,element,attribute) {
						scope.$watch(scope.j, function(newVal, oldVal, scope) {
							globalData = scope.j;
							var keySet = new Set();
							for(key in globalData){
								for(k in globalData[key]){
									if(k != 'date') {
										keySet.add(k);
									}

								}
							}
							globalKeys = Array.from(keySet);
							globalKeys = globalKeys.slice().reverse();
							drawBar(scope.j);
						}, true);
					};
				}
			}
		}]);

		barApp.factory('d3', function() {
			return d3;
		})