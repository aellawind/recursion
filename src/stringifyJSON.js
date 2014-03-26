// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
// I'm assuming I should not use toString() ?

var stringifyJSON = function (obj) {

	// Basic one-steps for undefined, null, or functions
	if (typeof(obj) === 'function' || obj === undefined) {return ''};
	if (obj === null) {return 'null'};

	// For strings or numbers or booleans
	if (typeof(obj) === 'string') {return '"' + obj + '"'};
	if (typeof(obj) === 'boolean' || typeof(obj) === 'number') {return "" + obj};

	// For anything that isn't a qualifying object?
	if (typeof(obj) !== 'object') {return "Where is this?"};

	// Recursion! For objects and arrays. Yayayayay.
	var stringified = '';
	if (Array.isArray(obj)) {
		stringified += "[";
		for (var i=0; i<obj.length;i++) {
			stringified += stringifyJSON(obj[i]);
			if (i != obj.length-1) { stringified += ","};
		}
		return stringified + "]";
	} else if (typeof(obj) === 'object') {
		stringified += "{";
		var hasExtraComma = false;
		for (var property in obj) {
			if (obj.hasOwnProperty(property)) {
				var newprop = stringifyJSON(property);
				var newval =  stringifyJSON(obj[property]);
				if (newprop && newval) {stringified+=newprop+":"+newval+","}; //checking for undefined
				hasExtraComma = true;
			}
		}
		if (hasExtraComma) {stringified = stringified.slice(0,-1)}; //removing extra comma
		return stringified + "}";
	} 
	return stringified;
};
