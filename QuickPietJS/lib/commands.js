Commands = {
	':' : function() { },
	
	push : function(stack, args) {
	    Validations.given(args);
	    Validations.invalidCharsCheck(args, /[.,]/);
	    var values = Validations.numberSequence(args);
	    Validations.positive(values);

	    jQuery.each(values, function(index, value) {
		stack.push(value);
	    });
	},
	
	pop : function(stack, args) {
	    var pops_count;
	    try {
		Validations.given(args);
	    } catch(e) {
		pops_count = 1;
	    }

	    if(!pops_count) {
		Validations.invalidCharsCheck(args, /[.,]/);
		[pops_count] = Validations.numberSequence(args, 1);
		Validations.positive(pops_count);
	    }

	    Validations.minStackSize(stack, pops_count);
	    for(var i = 0; i < pops_count; i++) {
		stack.pop();
	    }
	},
	
	duplicate : function(stack) {
	    Validations.minStackSize(stack, 1);
		
	    var val = stack.pop();
	    stack.push(val);
	    stack.push(val);
	},
	
	roll : function(stack, args) {
	    var depth, turns;
	    try {
		Validations.given(args);
	    } catch(e) {
		turns = stack.pop();
		depth = stack.pop();
	    }

	    if(!depth || !turns) {
		Validations.invalidCharsCheck(args, /[.,]/);
		[depth, turns] = Validations.numberSequence(args, 2);
	    }
	    Validations.positive(depth);
	    Validations.minStackSize(stack, depth);


	    var depth_index = stack.length - depth

	    if(turns >= 0) {
		for(var turn = 0; turn < turns; turn++) {
		    stack.splice(depth_index, 0, stack.pop())
		}
	    } else {
		turns = turns * -1
		
		for(var turn = 0; turn < turns; turn++) {
		    stack.push(stack.splice(depth_index, 1)[0])
		}
	    }
	},
	
	// Done as a string b/c of issue in Chrome
	'in' : function(stack, args, STDIN, STDOUT) {
		var character = STDIN.pop()
		var numeric_value = character.charCodeAt(0)
		
		console && console.log('IN:(' + numeric_value + '|' + character + ')')
		
		stack.push(numeric_value)
	},
	
	// Done as a string b/c of issue in Chrome
	'out' : function(stack, args, STDIN, STDOUT) {
	    Validations.minStackSize(stack, 1);
		
	    var numeric_value = stack.pop()

	    if(numeric_value < 1) {
		throw new EvalError('Can not output negative values (' + numeric_value + ')')
	    }

	    var character = String.fromCharCode(numeric_value)

	    console && console.log('OUT:(' + numeric_value + '|' + character + ')')

	    STDOUT.push(character)
	},
	
	add : function(stack) {
	    Validations.minStackSize(stack, 2);
		
	    stack.push(stack.pop() + stack.pop())
	},
	
	subtract : function(stack) {
	    Validations.minStackSize(stack, 2);

	    var top = stack.pop()
	    var second_top = stack.pop()
	    stack.push(second_top - top)
	},
	
	multiply : function(stack) {
	    Validations.minStackSize(stack, 2);

	    stack.push(stack.pop() * stack.pop())
	},
	
	divide : function(stack) {
	    Validations.minStackSize(stack, 2);

	    var top = stack.pop()
	    var second_top = stack.pop()
	    stack.push(parseInt(second_top / top))
	},
	
	mod : function(stack) {
	    Validations.minStackSize(stack, 2);

	    var top = stack.pop()
	    var second_top = stack.pop()
	    stack.push(parseInt(second_top % top))
	},
	
	not : function(stack) {
	    Validations.minStackSize(stack, 1);

	    stack.push(stack.pop() == 0 ? 1 : 0)
	},
	
	greater : function(stack) {
	    Validations.minStackSize(stack, 2)

	    stack.push(stack.pop() < stack.pop() ? 1 : 0)
	},
	
	end : function() {
		return '_END_'	
	},
	
	goto : function(stack, args) {
	    args = jQuery.trim(args)

	    if(!args || args.length < 2 || args.match(/[^a-zA-Z0-9\s]/)) {
		throw new SyntaxError('Invalid argument(s)')
	    }

	    var arguments = args.split(' ')

	    if(arguments.length != 2) {
		throw new SyntaxError('Invalid argument(s)')
	    }

	    Validations.minStackSize(stack, 1);

	    var switch_value = stack.pop() % 4
	    switch_value = switch_value < 0 ? switch_value * (-1) : switch_value

	    if(switch_value == 1) {
		return arguments[0]
	    } else if(switch_value == 3) {
		return arguments[1]
	    }
	},
	
	assert : function(stack, args) {
		var check_values = jQuery.trim(args).split(' ')
		var num_check_values = check_values.length
		
		if((!args && stack.length != 0) || (num_check_values != stack.length && args)) {
			throw new EvalError('Invalid stack: wrong number of values')
		}
		
		for(var index = 0; index < num_check_values && args; index++) {
			var stack_value = stack.pop()
			var check_value = parseInt(check_values[index])
			
			if(stack_value != check_value) {
				throw new EvalError('Invalid stack: wrong values')
			}
		}
	}
}