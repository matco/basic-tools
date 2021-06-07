import {CSV} from './csv.js';

export default async function test(assert) {
	assert.begin();

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

	//test generation
	const csv = new CSV(data);
	const string = csv.toString();
	assert.equal(string, file, 'CSV are serialized to strings properly');

	//does not work in Node.js
	/*const blob = csv.toBlob();
	assert.equal(blob.constructor.name, 'Blob', 'CSV are serialized to blob properly');
	assert.equal(await blob.text(), file, 'CSV are serialized to blob properly');*/

	//test parsing
	assert.similar(CSV.parse(file), data, 'Standard CSV are parsed to data properly');

	const dictionary = [
		{'First name': 'Anakin "Darth Vader"', 'Last name': 'Skywalker', Quote: 'I am altering the deal.\nPray I don’t alter it any further.'},
		{'First name': 'Luke', 'Last name': 'Skywalker', Quote: undefined},
		{'First name': 'Leia', 'Last name': 'Organa, Skywalker', Quote: undefined}
	];
	assert.similar(CSV.parseToDictionary(file), dictionary, 'Standard CSV are serialized to strings properly');

	const other_file = `First name,Last name,Quote
"Anakin ""Darth Vader""",Skywalker,"I am altering the deal.\nPray I don’t alter it any further."
Luke,Skywalker
Leia,"Organa, Skywalker"`;

	assert.similar(CSV.parse(other_file), data, 'Standard CSV are parsed to data properly');

	assert.end();
}
