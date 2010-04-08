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
	    var clause = length == 1 ? (length + " integer,") : (length + " integers,");
	    throw new SyntaxError("Expected " + clause + " but found " + results.length);
	}
	return results;
    },

    positive: function(values) {
	if(!values.length) {
	    values = [values];
	}
	jQuery.each(values, function(index, value) {
	    if(value < 0) {
		throw new SyntaxError("Cannot give negative numbers");
	    }
	});
    },

    invalidCharsCheck: function(args, re) {
	var i = args.search(re);
	if(i == -1) {
	    return true;
	}
	throw new SyntaxError("Invalid character '" + args[i] + "' in '" + args + "'");
    },

    minStackSize: function(stack, size) {
	try {
	    this.minLength(stack, size);
	} catch(e) {
	    throw new EvalError("Stack [" + stack + "] not of length " + size);
	}
	return true;
    }
};