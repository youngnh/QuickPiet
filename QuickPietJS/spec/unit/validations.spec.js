describe 'Validations'
    describe 'given'
        it 'should throw a StackError if no args given'
	    -{ Validations.given() }.should.throw_error SyntaxError, "No arguments given!"
        end
    end
end