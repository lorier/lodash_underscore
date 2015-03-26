var excerptMock = 
[ {
	"excerpt" : "Looking through the code you may notice that a new function named init() was added that wasn’t in the previous examples. It’s responsible for accepting any initialization data that the Calculator object needs to work correctly. As soon as the page loads the Calculator object is created but init() needs to be called to pass two HTML elements that it interacts with. An example of calling init() is shown next:",
	"id" : 1
	},
	{
	"excerpt" : "The Revealing Module Pattern is currently my favorite pattern out there for structuring JavaScript code mainly because it’s easy to use, very readable (which is important for maintenance), and provides a simple way to expose public members to consumers. What if we could combine this pattern with the Prototype Pattern though to get the benefits provided by prototyping? That’ll be the subject of my next post",
	"id" : 2
	}
];
var truncateSummary = function(excerptMock){
	console.log("truncate being called. data is: ")
	console.log(excerptMock);
	var result = null;
	var getTruncate = function(excerptMock){
		if (result === null){
			result = _.trunc(excerptMock[0].excerpt, 50);		
		}
		return result;
	};
	return {
		getTruncate: getTruncate
	};
}();
// in this case, no param is necessary within the invoking parens above.


var summary = truncateSummary.getTruncate(excerptMock);

console.log("Here is the summary");
console.log(summary);