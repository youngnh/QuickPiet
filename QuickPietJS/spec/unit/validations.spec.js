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

	it 'should return the parse of the given string'
	    Validations.numberSequence('9').should.eql 9
	end

	it 'return an array of values if more than one'
	    Validations.numberSequence('9 3 2').should.eql [9, 3, 2]
	end

	it 'should throw an exception if exact number of integers not given'
	    -{ Validations.numberSequence('9', 2)}.should.throw_error SyntaxError, "Expected 2 integers, but found 1"
	    -{ Validations.numberSequence('9 3 2', 2)}.should.throw_error SyntaxError, "Expected 2 integers, but found 3"
	    Validations.numberSequence('9 3', 2).should.eql [9, 3]
	end
    end
end