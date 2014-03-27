// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// Directions say to used document.body, element.childNodes, and element.classList
var getElementsByClassName = function (className) {

	var allElements = []; //results array
	var getElements = function(node) {
		var childNodes = node.childNodes; //getting all the child nodes to iterate over them and check
		for (var i=0; i<childNodes.length;i++) {
			console.log(childNodes[i]);
			//have to remember to check if the node even has any classes in its classList
			if(childNodes[i].classList && childNodes[i].classList.contains(className)) {
				allElements.push(childNodes[i]); //if the element has the class, add it to results list
			}
			getElements(childNodes[i], className); //recursively check the child node too
		}
		return allElements;	
	}
	return getElements(document.body);
};
