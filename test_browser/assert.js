function log(success, message, specification) {
	let text = success ? 'Success' : 'Fail';
	if(message) {
		text += ' : ';
		text += message;
		if(specification) {
			text += ' - ';
			text += specification;
		}
	}
	console.log(text);
}

function check_exception(exception, exception_assert, message, specification) {
	if(!exception_assert) {
		this.success(message || 'Code throws an exception', specification);
	}
	//check exception matches criteria
	else {
		const check = exception_assert.call(undefined, exception);
		if(check === undefined) {
			this.fail(`${message}: Exception assert must return a boolean`, specification);
		}
		else if(check) {
			this.success(message || 'Code throws an exception matching criteria', specification);
		}
		else {
			this.fail(`${message}: Code does not throw the good exception: Actual [${exception}]`, specification);
		}
	}
}

export const assert = {
	success(message, specification) {
		log.call(this, true, message, specification);
	},
	fail(message, specification) {
		log.call(this, false, message, specification);
	},
	equal(actual, expected, message, specification) {
		actual === expected ? this.success(message, specification) : this.fail(`${message}: Actual [${actual}] - Expected [${expected}]`, specification);
	},
	strictEqual(actual, expected, message, specification) {
		this.equal(actual, expected, message, specification);
	},
	notEqual(actual, notExpected, message, specification) {
		actual !== notExpected ? this.success(message, specification) : this.fail(`${message}: Actual [${actual}] - Not expected [${notExpected}]`, specification);
	},
	notStrictEqual(actual, expected, message, specification) {
		this.equal(actual, expected, message, specification);
	},
	similar(actual, expected, message, specification) {
		Object.equals(actual, expected) ? this.success(message, specification) : this.fail(`${message}: Actual [${actual}] - Expected [${expected}]`, specification);
	},
	notSimilar(actual, notExpected, message, specification) {
		!Object.equals(actual, notExpected) ? this.success(message, specification) : this.fail(`${message}: Actual [${actual}] - Not expected [${notExpected}]`, specification);
	},
	defined(value, message, specification) {
		this.notEqual(value, undefined, message, specification);
	},
	undefined(value, message, specification) {
		this.equal(value, undefined, message, specification);
	},
	null(value, message, specification) {
		this.equal(value, null, message, specification);
	},
	notNull(value, message, specification) {
		this.notEqual(value, null, message, specification);
	},
	ok(assertion, message, specification) {
		this.equal(assertion, true, message, specification);
	},
	notOk(assertion, message, specification) {
		this.equal(assertion, false, message, specification);
	},
	throws(block, exception_assert, message, specification) {
		try {
			block.call();
			this.fail(message || 'Code does not throw an exception', specification);
		}
		catch(exception) {
			check_exception.call(this, exception, exception_assert, message, specification);
		}
	},
	doesNotThrow(block, message, specification) {
		try {
			block.call();
			this.success(message || 'Code does not throw an exception', specification);
		}
		catch(exception) {
			this.fail(`${message}: Code throws an exception: ${exception}`, specification);
		}
	},
	async throwAsync(block, exception_assert, message, specification) {
		try {
			await block.call();
			this.fail(message || 'Code does not throw an exception', specification);
		}
		catch(exception) {
			check_exception.call(this, exception, exception_assert, message, specification);
		}
	},
	async doesNotThrowAsync(block, message, specification) {
		try {
			await block.call();
			this.success(message || 'Code does not throw an exception', specification);
		}
		catch(exception) {
			this.fail(`${message}: Code throws an exception: ${exception}`, specification);
		}
	}
};
