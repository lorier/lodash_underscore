(function(){
'use strict';

	$.getJSON('../ionic/birdApp/www/data/fakeData.json', function() {
		console.log("first function called");
	})
		.done(function(data){
		console.log('data called');
		//I guess i need to call the lodash 
		//within the success callback 
		//so the rest of the script doesnt execute before the data loads.
		runLodash(data);
	})
		.fail(function(){
		console.log('error');
	});
var selectedColors = ["red", "yellow", "Purple", "Plaid"];
var matchedSets = [];

function runLodash(birdData){
	// for each of the items in birdData, call intersection
	_.each(birdData, intersection);
	arrayLogger(matchedSets);
}
function intersection(singleBirdInfo){
		var id = singleBirdInfo._id;
		var setMatches =  _.intersection(singleBirdInfo.colors, selectedColors);
		if(setMatches.length){
			console.log('there are matches here! >');
			matchedSets.push(
		 	[id, setMatches]
		  );
		}
}
function arrayLogger(itemToLog){
	_.each(itemToLog, function(n){
		$('body').append('<div>' + n[0] + '</div>');
		$('body').append('<div>' + n[1] + '</div>');
	});
}



})();
