// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:
// Amira Anuar note: Got a lot of help from the provided resource of the book 
// Javascript: The Good Parts by O'reilly
var parseJSON = function (json) {

    var jsonparse = function () {
        
    	// Declaring necessary values for later
        var index_at; // The index of the current curr_character
        var curr_ch; // The current curr_character
        var value; // value function that we'll declare later
        var text; // the json text we're working with
        // The escape curr_characters
        var escapee = {
            '"': '"',
            '\\': '\\',
        };

        // Throws my error
        var error = function (error_message) {
            throw {
                name: 'Syntax Error',
                message: error_message,

            };
        };

        // Moves on to the next character and increases our index_at by 1
        var next = function (c) {
            // curr_checks to make sure the next curr_character is what we're expecting
            if (c && c !== curr_ch) {
                error("Expected '" + c + "', not '" + curr_ch + "'");
            }
            // Goes on to the next curr_character
            curr_ch = text.charAt(index_at);
            index_at += 1;
            return curr_ch;
        };

        // Parse a number value
        var parse_number = function () {

            var number,
                string = '';

            if (curr_ch === '-') {
                string = '-';
                next('-');
            }
            while (curr_ch >= '0' && curr_ch <= '9') {
                string += curr_ch;
                next();
            }
            if (curr_ch === '.') {
                string += '.';
                while (next() && curr_ch >= '0' && curr_ch <= '9') {
                    string += curr_ch;
                }
            }
            number = +string;
            if (isNaN(number)) {
                error("Bad number");
            } else {
                return number;
            }
        };

        // Parse a string value.
        var parse_string = function () {

            var string = '';

            if (curr_ch === '"') {
                while (next()) {
                    if (curr_ch === '"') {
                        next();
                        return string;
                    } else if (curr_ch === '\\') {
                        next();
                        if (typeof escapee[curr_ch] === 'string') {
                            string += escapee[curr_ch];
                        } else {
                            break;
                        }
                    } else {
                        string += curr_ch;
                    }
                }
            }
            error("Bad string");
        };

        // Skip whitespace.
        var whitespace = function () {

            while (curr_ch && curr_ch <= ' ') {
                next();
            }
        };

        var parse_word = function () {
            switch (curr_ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + curr_ch + "'");
        };

        // Parse an array
        var parse_array = function () {

            var array = [];

            if (curr_ch === '[') {
                next('[');
                whitespace();
                if (curr_ch === ']') {
                    next(']');
                    return array; // empty array
                }
                while (curr_ch) {
                    array.push(value());
                    whitespace();
                    if (curr_ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    whitespace();
                }
            }
            error("Bad Array");
        };

        // Parse an object value.
        var parse_object = function () {

            var object = {};
            var key;

            if (curr_ch === '{') {
                next('{');
                whitespace();
                if (curr_ch === '}') {
                    next('}');
                    return object; // empty object
                }
                while (curr_ch) {
                    key = parse_string();
                    whitespace();
                    next(':');
                    object[key] = value();
                    whitespace();
                    if (curr_ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    whitespace();
                }
            }
            error("Bad Object");
        };

        // Parse a JSON value. 
        value = function () {

            whitespace();
            switch (curr_ch) {
            case '{':
                return parse_object();
            case '[':
                return parse_array();
            case '"':
                return parse_string();
            case '-':
                return parse_number();
            default:
                return curr_ch >= '0' && curr_ch <= '9' ? parse_number() : parse_word();
            }
        };

        // This function has access to the other variables, and takes in the json value
        // and evaluates it through the value function
        return function (json_val) {
            var result;

            text = json_val;
            index_at = 0;
            curr_ch = ' '; //starts at whitespace, will go to next until not whitespace
            result = value();
            whitespace();
            if (curr_ch) {
                error("Syntax error"); //errors out because we should have no more curr_ch
            }

            return result;

        };
    }();

    return jsonparse(json);

}