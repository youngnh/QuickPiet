describe 'Validations'
    describe 'given'
        it 'should throw a StackError if no args given'
	    -{ Validations.given() }.should.throw_error SyntaxError, "No arguments given!"
        end

        it 'should return true if a string is given'
	    Validations.given('anything').should.eql true
	end
    end

    describe 'minLength'
        it "should throw an error if argument isn't of specified length"
	    -{ Validations.minLength('abc', 5) }.should.throw_error SyntaxError, "Expected 'abc' to be of length 5"
	end

	it "should return true if args is as long or longer than specified"
	    Validations.minLength('abc', 3).should.eql true
	    Validations.minLength('abc', 2).should.eql true
	end
    end

    describe 'numberSequence'
        it 'should throw an error if argument contains non-alphanumeric chars'
	    -{ Validations.numberSequence('abc') }.should.throw_error SyntaxError, "'abc' is not composed of parseable integers"
	end

	it 'should return a list containing the parsed value'
	    Validations.numberSequence('9').should.eql [9]
	end

	it 'return an array of values if more than one'
	    Validations.numberSequence('9 3 2').should.eql [9, 3, 2]
	end

	it 'should throw an exception if exact number of integers not given'
	    -{ Validations.numberSequence('9', 2)}.should.throw_error SyntaxError, "Expected 2 integers, but found 1"
	    -{ Validations.numberSequence('9 3 2', 2)}.should.throw_error SyntaxError, "Expected 2 integers, but found 3"
	    Validations.numberSequence('9 3', 2).should.eql [9, 3]
	end

	it 'should use proper grammar in exception message'
	    -{ Validations.numberSequence('9 1', 1)}.should.throw_error SyntaxError, "Expected 1 integer, but found 2"
	end
    end

    describe 'positive'
        it 'should throw an error if any arguments are negative'
	    -{ Validations.positive([-1])}.should.throw_error SyntaxError, "Cannot give negative numbers"
	end
    end

    describe 'invalidCharsCheck'
        it 'should throw an error if argument contains invalid character'
	    -{ Validations.invalidCharsCheck('5,2', /[,]/)}.should.throw_error SyntaxError, "Invalid character ',' in '5,2'"
	    -{ Validations.invalidCharsCheck('5.2', /[.,]/)}.should.throw_error SyntaxError, "Invalid character '.' in '5.2'"
	end

	it 'should return true if no invalid character found'
	    Validations.invalidCharsCheck('5 2', /[,]/).should.eql true
	end
    end
end