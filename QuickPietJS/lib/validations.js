Validations = {
    given: function(args) {
	if(!args) {
	    throw new SyntaxError("No arguments given!");
	}
	return true;
    },

    minLength: function(args, length) {
	if(args.length < length) {
	    throw new SyntaxError("Expected '" + args + "' to be of length " + length);
	}
	return true;
    },

    numberSequence: function(args, length) {
	var results = [];
	jQuery.each(args.split(' '), function(index, value) {
	    var parsed = parseInt(value);
	    if(isNaN(parsed)) {
		throw new SyntaxError("'" + args + "' is not composed of parseable integers");
	    }
	    results.push(parseInt(value));
	});
	if(length && results.length != length) {
	    throw new SyntaxError("Expected " + length + " integers, but found " + results.length);
	}
	return results;
    },

    positive: function(values) {
	jQuery.each(values, function(index, value) {
	    if(value < 0) {
		throw new SyntaxError("Cannot give negative numbers");
	    }
	});
    }
};