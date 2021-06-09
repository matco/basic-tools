/*eslint-env mocha*/

import * as assert from 'assert';
import {CSV} from '../csv.js';

const data = [
	['First name', 'Last name', 'Quote'],
	['Anakin "Darth Vader"', 'Skywalker', 'I am altering the deal.\nPray I don’t alter it any further.'],
	['Luke', 'Skywalker'],
	['Leia', 'Organa, Skywalker'],
];

const file = `"First name","Last name","Quote"
"Anakin ""Darth Vader""","Skywalker","I am altering the deal.\nPray I don’t alter it any further."
"Luke","Skywalker"
"Leia","Organa, Skywalker"`;

describe('CSV', function() {

	describe('#toString', function() {
		it('serializes a CSV to a string', function() {
			const csv = new CSV(data);
			const string = csv.toString();
			assert.strictEqual(string, file, 'CSV are serialized to strings properly');

			//does not work in Node.js
			/*const blob = csv.toBlob();
			assert.equal(blob.constructor.name, 'Blob', 'CSV are serialized to blob properly');
			assert.equal(await blob.text(), file, 'CSV are serialized to blob properly');*/
		});
	});

	describe('#parse', function() {
		it('creates a CSV from a string', function() {
			assert.deepStrictEqual(CSV.parse(file), data, 'Standard CSV are parsed to data properly');

			const other_file = `First name,Last name,Quote
"Anakin ""Darth Vader""",Skywalker,"I am altering the deal.\nPray I don’t alter it any further."
Luke,Skywalker
Leia,"Organa, Skywalker"`;

			assert.deepStrictEqual(CSV.parse(other_file), data, 'Standard CSV are parsed to data properly');
		});
	});

	describe('#parseToDictionary', function() {
		it('parses a CSV string to a dictionary', function() {
			const dictionary = [
				{'First name': 'Anakin "Darth Vader"', 'Last name': 'Skywalker', Quote: 'I am altering the deal.\nPray I don’t alter it any further.'},
				{'First name': 'Luke', 'Last name': 'Skywalker', Quote: undefined},
				{'First name': 'Leia', 'Last name': 'Organa, Skywalker', Quote: undefined}
			];
			assert.deepStrictEqual(CSV.parseToDictionary(file), dictionary, 'Standard CSV are serialized to strings properly');
		});
	});
});
