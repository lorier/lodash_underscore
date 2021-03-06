(function(){
	'use strict';

	//dummy data
	var selectedSize = 'tiny';
	var selectedColors = ["red"];
	var selectedBehavior = 'soaring';
	
/*	var globalBirdData =  [{
		//initializing this variable with data - for testing whether this is 
		//successfully replaced by the .getJSON call
		"excerpt" : "Looking through the code you may notice that a new function named init() was added that wasn’t in the previous examples. It’s responsible for accepting any initialization data that the Calculator object needs to work correctly. As soon as the page loads the Calculator object is created but init() needs to be called to pass two HTML elements that it interacts with. An example of calling init() is shown next:",
		"id" : 1
		},
		{
		"excerpt" : "The Revealing Module Pattern is currently my favorite pattern out there for structuring JavaScript code mainly because it’s easy to use, very readable (which is important for maintenance), and provides a simple way to expose public members to consumers. What if we could combine this pattern with the Prototype Pattern though to get the benefits provided by prototyping? That’ll be the subject of my next post",
		"id" : 2
		}
	];*/
	
	

	//set up ajax call
	//**Still unclear on the proper use of .success, .done, .fail
		$.getJSON('../ionic/birdApp/www/data/fakeData.json', function(data) {
			// globalBirdData = data;
			// the truncateSummary function was compiling/executing before the 
			// data came through, so I enclosed it in an init function.
			// **Why did I need to do this?
			loadProgram(data);
		})
		.fail(function(){
			console.log('error');
		});

	//UNUSED helper function. I rewrote this in the data module. 
	//Is it better to have in the module or out here?
	// function intersection(singleBirdInfo){
	// 	var id = singleBirdInfo._id;
	// 	//check for common colors between the selected
	// 	var commonColors =  _.intersection(singleBirdInfo.colors, selectedColors);
	// 	if(commonColors.length){
	// 		matchedSets.push(
	// 	 	[id, setMatches]
	// 	  );
	// 	}
	// }

	//////// Cached data module //////////
	//this function only fires after the ajax call has completed
	//and the data has loaded
	function loadProgram(birdData) {
		
		var data = function(){

			//get the summary 
			var truncateSummary = function(){
				//return either the cached result 
				//or run the logic to get it
					var result = null;
					var get = function(gbd){
						if (result === null){
							result = _.trunc(globalBirdData[0].excerpt, 50);		
						}
						return result;
					};
					return {
						get: get
					};
				}(),

				findCommonColors = (function(){
					var matchedForColor = [];

					// for each of the items in birdData, call intersection
					var get = function(gbd){
						_.each(gbd, function (el, index){
							var setMatches =  _.intersection(el.colors, selectedColors);
								if(setMatches.length){
									matchedForColor.push(el);
								}
							}
						);
						return matchedForColor;
					};
					return {
						get : get
					};
				}()),

				filterBySize = (function(){
					var matchedForSize = [];
					var get = function(gbd){
						_.each(gbd, function(el, index, list){
							if(el.sizes == selectedSize){
								matchedForSize.push(el);
							}
						});
						return matchedForSize;
					};
					return {
						get : get
					};
				}()),

				filterByBehavior = (function(){
					var matchedForBehavior = [];
					var get = function(gbd){
						_.each(gbd, function(el, index, list){
							
							if(el.behaviors == selectedBehavior){
								matchedForBehavior.push(el);
							}
						});
						return matchedForBehavior;
					};
					return {
						get : get
					};
				}());

			return {
				truncateSummary: truncateSummary,
				findCommonColors: findCommonColors,
				filterBySize: filterBySize,
				filterByBehavior: filterByBehavior
			};

		}(); //end data - should there be an argument here?

///////////////// end data module ///////////////////////////////////////////////////

	//output hardcoded selections to the screen for clarity		
	arrayLogger(selectedSize, '#size-data-in');
	arrayLogger(selectedColors, '#color-data-in');
	arrayLogger(selectedBehavior, '#behavior-data-in');

	//test output of module
	//not sure why I need the param? Doesn't work without it

	var sizeMatch = data.filterBySize.get(birdData);
	var colorIntersection = data.findCommonColors.get(birdData);
	var behaviorMatch = data.filterByBehavior.get(birdData);


	//attach click handlers
	$('#match-size').on("click", function(){
		arrayLogger(sizeMatch, '#size-matches ul', 'commonName' );
		$(this).detach();
	});
	$('#match-colors').on("click", function(){
		arrayLogger(colorIntersection, '#color-matches ul', 'commonName');
		$(this).detach();
	});
	$('#match-behavior').on("click", function(){
		arrayLogger(behaviorMatch, '#behavior-matches ul', 'commonName');
		$(this).detach();
	});
		
	/*test whether the caching works
	var excerpt2 = truncateSummary.getTruncate(globalBirdData);
	console.log("get the excerpt a second time: " + excerpt2);

	var matchedColors = findCommonColors.getMatchedSets(globalBirdData);
	console.log("matched sets: " + matchedColors);*/

	}

	//end load program	

	function arrayLogger(itemToLog, whichDiv, prop ){
		
		if (typeof itemToLog == "object" || $.isArray(itemToLog)){
			//for array or objects
			_.each(itemToLog, function(el, index, list) {
				if ( typeof el  == "object") {
					$(whichDiv).append('<li>' + el[prop] + '</li>');
				} else {
					$(whichDiv).append('<li>' + el + '</li>');
				}
			});
		}else{
			//for string
			$(whichDiv).append('<li>' + itemToLog + '</li>');
		}
	}

})();
	/*
		

		Sum mixin example
		Im not sure why this is set up as an IIFE that's passed into _mixIn.
		from http://www.pluralsight.com/training/player?author=craig-shoemaker&name=underscore-fundamentals-m7&mode=live&clip=2&course=underscore-fundamentals
		
		var _mixIn = (function() {
			_.mixin({
				sum: function(value, key){
					var returnValue = 0;
					returnValue = _.reduce(value, 
						function(memo, value){
							value = _.isNumber(value) ? value : value[key];
							return memo + value;
						}, 0);
					return returnValue;
				}
			});
		})();

		var theOOPSum = _([1,1,2,3]).sum();

		var theFuncSum = _.sum([
			{ price: 1	},
			{ price: 1 },
			{ price: 1 }
			], 'price');
		console.log("the OOP sum: " + theOOPSum);
		console.log("the Functional sum: " + theFuncSum); Sum mixin example Sum Mixin example
	*/

