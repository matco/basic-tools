/*eslint-env mocha*/

import '../extension.js';

import * as assert from 'assert';

describe('extension', function() {

	describe('Object', function() {

		describe('#isObject', function() {
			it('considers all objects as objects', function() {
				const object = {toto: 'tutu'};

				assert.ok(Object.isObject(object), 'An object variable is an object');
				assert.ok(Object.isObject({toto: 'titi'}), 'An anonymous object is an object');
				assert.ok(Object.isObject({}), 'An empty object is an object');
			});

			it('does not consider not objects as objects', function() {
				const func = function() {'nothing to do';};
				const not_func = 'nothing';

				assert.ok(!Object.isObject(func), 'A function variable is not an object');
				assert.ok(!Object.isObject('nothing'), 'A string is not an object');
				assert.ok(!Object.isObject(not_func.toString), 'toString method of string is not an object');
				assert.ok(!Object.isObject([]), 'Empty array is not an object');
			});
		});

		describe('#isEmpty', function() {
			it('considers objects without a key as empty', function() {
				assert.ok(Object.isEmpty({}), 'Anonymous object {} is an empty object');
				assert.ok(!Object.isEmpty({toto: undefined}), '{toto : undefined} is not an empty object');

				let object = {};
				assert.ok(Object.isEmpty(object), 'Variable containing {} is an empty object');

				let constructor = function() {};
				object = new constructor();
				assert.ok(Object.isEmpty(object), 'Object built from empty constructor is an empty object');

				constructor = function() {
					this.property;
				};
				object = new constructor();
				assert.ok(Object.isEmpty(object), 'Object built from constructor defining property without value is an empty object');

				constructor = function() {
					this.property = 'value';
				};
				object = new constructor();
				assert.ok(!Object.isEmpty(object), 'Object built from constructor defining property and its value is not an empty object');
			});
		});

		describe('#equals', function() {
			it('works with basic types', function() {
				assert.ok(Object.equals(1, 1), '1 is equal to 1');
				assert.ok(!Object.equals(1, '1'), '1 is not equal to "1"');
				assert.ok(Object.equals('toto', 'toto'), '"toto" is equal to "toto"');
				assert.ok(!Object.equals('toto', 'titi'), '"toto" is equal to "titi"');
				assert.ok(Object.equals('', ''), '"" is equal to ""');
				assert.ok(Object.equals(undefined, undefined), 'undefined is equal to undefined');
			});

			it('works with arrays', function() {
				assert.ok(Object.equals([1,2,3], [1,2,3]), '[1,2,3] is equal to [1,2,3]');
				assert.ok(!Object.equals([1,2,3], [1,2,3,4]), '[1,2,3] is not equal to [1,2,3,4]');
			});

			it('works with objects', function() {
				assert.ok(
					Object.equals(
						{one: 'un', two: 'deux'},
						{one: 'un', two: 'deux'}
					),
					'Two object with same keys (in the same order) and values are equal');
				assert.ok(
					!Object.equals(
						{one: 'un', two: 'deux'},
						{two: 'deux', one: 'un'}
					),
					'Two object with same keys (in a different order) and values are not equal');
				assert.ok(
					Object.equals(
						{property: 'value', other_property: ['toto', 'titi']},
						{property: 'value', other_property: ['toto', 'titi']}
					),
					'Object containing string and array is equal to an other object containing an equal string and an equal array');

				const value = [1,2,'tutu'];
				assert.ok(Object.equals({property: value}, {property: value}), 'Object containing an array is equal to an other object containing the same array');
			});
		});

		describe('#clone', function() {
			it('clones serializable objects', function() {
				const object = {property: 'value'};
				const cloned_object = Object.clone(object);
				assert.ok(cloned_object.hasOwnProperty('property'), 'Cloned object has the same property like the original');
				assert.deepStrictEqual(cloned_object.property, object.property, 'Cloned object property has the same value than the original object property');
			});

			it('clones only class properties', function() {
				const constructor = function() {
					this.property = 'value';
				};
				constructor.prototype.doNothing = function() {
					'nothing to do';
				};
				const object = new constructor();
				const cloned_object = Object.clone(object);
				assert.ok(cloned_object.hasOwnProperty('property'), 'Cloned object has the same property like the original');
				assert.deepStrictEqual(cloned_object.property, object.property, 'Cloned object property has the same value than the original object property');
				assert.notDeepStrictEqual(object.constructor, cloned_object.constructor, 'Unfortunately, cloned object from object built from a constructor does not share the same constructor than the original');
				assert.ok(Function.isFunction(object.doNothing), 'Original object has a "doNothing" method inherited from prototype chain');
				assert.ok(!Function.isFunction(cloned_object.doNothing), 'Cloned object does not have a "doNothing" method');
			});
		});

		describe('#key', function() {
			it('retrieves key for value with basic type', function() {
				assert.strictEqual(Object.key({titi: 'tutu'}, 'tutu'), 'titi', 'Key for a string value is the right key');
				assert.strictEqual(Object.key({titi: 42}, 42), 'titi', 'Key for a number value is the right key');
				assert.throws(
					() => Object.key({titi: 'tutu'}, 'toto'),
					e => e instanceof Error && e.message === 'Object does not contains value',
					'Asking key for a non existing value throws an exception'
				);
			});

			it('does not retrieve key for value with object type', function() {
				const embedded_object = {mama: 'momo', mimi: 'mumu'};
				const object = {toto: 'toto', titi: embedded_object};

				assert.strictEqual(Object.key(object, embedded_object), 'titi', 'Key for an object value is the right key');
				assert.throws(
					() => Object.key(object, {mama: 'momo', mimi: 'mumu'}),
					e => e instanceof Error && e.message === 'Object does not contains value',
					'Asking key for a similar value throws an exception'
				);
			});
		});

		describe('#getObjectPathValue and #getLastObjectInPath', function() {
			it('works with one-level objects', function() {
				const family = {
					name: 'Doe'
				};
				assert.strictEqual(Object.getObjectPathValue(family, 'name'), 'Doe', 'Get object path value on object for path "name" gives "John"');
				assert.strictEqual(Object.getObjectPathValue(family, 'age'), undefined, 'Get object path value on object for path "age" gives undefined');
				const person = {
					name: 'John'
				};
				family.chief = person;
				assert.strictEqual(Object.getObjectPathValue(family, 'chief'), person, 'Get object path value on object for path "chief" gives the family chief person');
				assert.strictEqual(Object.getObjectPathValue(family, 'chief.name'), 'John', 'Get object path value on object for path "chief.name" gives "John"');
			});

			it('works with deeper objects', function() {
				const main_shop = {
					name: 'Migros',
					category: 'Supermarket',
					label: function() {
						return `${this.category} ${this.name}`;
					}
				};
				const main_street = {
					name: 'Avenue de Champel',
					population: 100,
					shops: [
						main_shop,
						{
							name: 'Pompei',
							category: 'Restaurant'
						}
					],
					main_shop: main_shop
				};
				const city = {
					names: {
						en: 'Geneva',
						fr: 'Genève'
					},
					population: 500000,
					streets: [
						main_street,
						{
							name: 'Rue de Lausanne',
							length: 1000
						}
					],
					main_street: main_street
				};

				assert.strictEqual(Object.getObjectPathValue(city, 'names.en'), 'Geneva', 'Get object path value on city for path "names.en" gives "Geneva"');
				assert.strictEqual(Object.getObjectPathValue(city, 'names.de'), undefined, 'Get object path value on city for path "names.de" gives undefined');
				assert.strictEqual(Object.getObjectPathValue(city, 'main_street.shops'), main_street.shops, 'Get object path value on city for path "main_street.shops" gives all main street shops');
				assert.strictEqual(Object.getObjectPathValue(city, 'main_street.population'), 100, 'Get object path value on city for path "main_street.population" gives the population of the main street');
				assert.strictEqual(Object.getObjectPathValue(city, 'main_street.main_shop.label'), 'Supermarket Migros', 'Get object path value on city for path "main_street.main_shop.label" gives the label od main shop of the main street using a function');

				//TODO does not work yet
				//assert.strictEqual(Object.getObjectPathValue(city, 'streets[0].shops[0].name'), 'Migros', 'Get object path value on object for path "streets[0].shops[0].name" gives the population of the name of the first shop inf the first street');

				assert.strictEqual(Object.getLastObjectInPath(city, 'names.en').object, city.names, 'Get last object in path "names.en" gives the names object');
				assert.strictEqual(Object.getLastObjectInPath(city, 'names.en').property, 'en', 'Get last object in path "names.en" gives the "en" property');
				assert.strictEqual(Object.getLastObjectInPath(city, 'main_street.population').object, main_street, 'Get last object in path "main_street.population" gives the main street object');
				assert.strictEqual(Object.getLastObjectInPath(city, 'main_street.population').property, 'population', 'Get last object in path "main_street.population" gives the "population" property');
				assert.strictEqual(Object.getLastObjectInPath(city, 'main_street.shops.length').object, main_street.shops, 'Get last object in path "main_street.shops.length" gives the array of shops in the main street object');
				assert.strictEqual(Object.getLastObjectInPath(city, 'main_street.shops.length').property, 'length', 'Get last object in path "main_street.shops.length" gives the "length" property');
			});
		});
	});

	describe('Function', function() {

		describe('#isFunction', function() {
			it('considers all functions as functions', function() {
				const func = function() {'nothing to do';};
				const not_func = 'nothing';

				assert.ok(Function.isFunction(func), 'A function variable is a function');
				assert.ok(Function.isFunction(function() {}), 'An empty anonymous function is a function');
				assert.ok(Function.isFunction(function() {'function';}), 'An anonymous function is a function');
				assert.ok(!Function.isFunction(not_func), 'A string is not a function');
				assert.ok(Function.isFunction(not_func.toString), 'toString method of string is a function');
				assert.ok(Function.isFunction(func.constructor), 'Function constructor is a function');
				assert.ok(Function.isFunction(String.prototype.capitalize), 'capitalize method of String prototype is a function');
				assert.ok(!Function.isFunction({}), 'Empty object is not a function');
				assert.ok(!Function.isFunction([]), 'Empty array is not a function');
			});
		});
	});

	describe('String', function() {

		describe('#capitalize', function() {
			it('set the first character of a string in uppercase and do not touch other characters', function() {
				assert.strictEqual('rodanotech'.capitalize(), 'Rodanotech', 'Capitalize "rodanotech" gives "Rodanotech"');
				assert.strictEqual('RODANOTECH'.capitalize(), 'RODANOTECH', 'Capitalize "RODANOTECH" gives "RODANOTECH"');
				assert.strictEqual('rODANOTECH'.capitalize(), 'RODANOTECH', 'Capitalize "rODANOTECH" gives "RODANOTECH"');
				assert.strictEqual('rodanotech sarl'.capitalize(), 'Rodanotech sarl', 'Capitalize "rodanotech sarl" gives "Rodanotech sarl"');
				assert.strictEqual('rodanotech sArL'.capitalize(), 'Rodanotech sArL', 'Capitalize "rodanotech sArL" gives "Rodanotech sArL"');
				assert.strictEqual(''.capitalize(), '', 'Capitalize "" gives ""');
				const string = 'abçdé';
				const string_capitalized = string.capitalize();
				assert.strictEqual(string, 'abçdé', 'Capitalize create a new string');
				assert.notStrictEqual(string, string_capitalized, 'Capitalize create a new string');
			});
		});

		describe('#reverse', function() {
			it('reverses any string', function() {
				assert.strictEqual('ab', 'ba'.reverse(), 'Reverse of "ab" is "ba"');
				assert.notStrictEqual('ab', 'baba'.reverse(), 'Reverse of "ab" is not "baba"');
				assert.strictEqual('1true3', '3eurt1'.reverse(), 'Reverse works with any character');
				assert.strictEqual('-', '-'.reverse(), 'Reverse works with any character');

				const rodano = new String('rodano'); //eslint-disable-line no-new-wrappers

				assert.strictEqual('onador', rodano.reverse(), 'Reverse of "rodano" is "onador"');
				assert.strictEqual('rodano', rodano.reverse().reverse(), '"rodano" reversed two times is "rodano"');
				assert.notStrictEqual(rodano, rodano.reverse().reverse(), 'Reverse of reversed string is not the same string');
			});
		});

		describe('#nocaseIncludes', function() {
			it('check if a string contains an other string discarding case', function() {
				const rodano = 'rodano';

				assert.ok('rodano'.nocaseIncludes('o'), '"rodano" contains "o" without case check');
				assert.ok('rodano'.nocaseIncludes('R'), '"rodano" contains "R" without case check');
				assert.ok('rodano'.nocaseIncludes('DaNo'), '"rodano" contains "DaNo" without case check');
				assert.ok(!'rodano'.nocaseIncludes('DaNoN'), '"rodano" does not contains "DaNoN" without case check');
				assert.ok(rodano.nocaseIncludes('od'), '"rodano" contains "od" without case check');
				assert.ok(rodano.nocaseIncludes('RO'), '"rodano" contains "RO" without case check');
			});
		});

		describe('#compareTo', function() {
			it('compares 2 strings alphabetically', function() {
				assert.ok('alpha'.compareTo('beta') < 0, '"alpha" is lower than "beta"');
				assert.ok('beta'.compareTo('alpha') > 0, '"beta" is higher than "alpha"');
				assert.ok('a'.compareTo('beta') < 0, '"a" is lower than "beta"');
				assert.strictEqual('alpha'.compareTo('alpha'), 0, '"alpha" compare to "alpha" is 0');
				assert.ok(''.compareTo('alpha') < 0, '"" is lower than "alpha"');
			});
		});

		describe('#replaceObject', function() {
			it('replaces specials token in a string with the value of an object', function() {
				assert.strictEqual('Welcome ${name}'.replaceObject({'name': 'Mat'}), 'Welcome Mat', 'ReplaceObject fill blanks with object properties');
				assert.strictEqual(
					'Welcome ${name}. I am happy to see you, ${name}.'.replaceObject({'name': 'Mat', 'other': 'Matthieu'}),
					'Welcome Mat. I am happy to see you, Mat.',
					'ReplaceObject can replace more than one blank with the same object properties');
				assert.strictEqual(
					'Cool ${what} : $, { or } or even {}.'.replaceObject({'what': 'characters', 'test': 'test'}),
					'Cool characters : $, { or } or even {}.',
					'ReplaceObject works with any character');
				assert.strictEqual(
					'Welcome ${person.firstname} ${person.lastname} or ${surname}'.replaceObject({'person': {firstname: 'John', lastname: 'Doe'}, 'surname': 'Jdo'}),
					'Welcome John Doe or Jdo',
					'ReplaceObject fill blanks with object path');
				assert.strictEqual(
					'Welcome ${person.firstname.reverse} ${person.lastname.reverse} or ${surname.reverse}'.replaceObject({'person': {firstname: 'John', lastname: 'Doe'}, 'surname': 'Jdo'}),
					'Welcome nhoJ eoD or odJ',
					'ReplaceObject fill blanks with object path containing a method');
				assert.strictEqual(
					'Welcome ${person.firstname.reverse.reverse}'.replaceObject({'person': {firstname: 'John'}}),
					'Welcome John',
					'ReplaceObject fill blanks with object path containing a chain of methods');
			});
		});
	});

	describe('Number', function() {

		describe('#isNumber', function() {
			it('considers all numbers as numbers', function() {
				assert.ok(!Number.isNumber(''), '"" is not a number');
				assert.ok(!Number.isNumber('abcd'), '"abcd" is not a number');
				assert.ok(!Number.isNumber('abcd12'), '"abcd12" is not a number');
				assert.ok(!Number.isNumber('12abcd'), '"12abcd" is not a number');
				assert.ok(Number.isNumber(0), '0 is a number');
				assert.ok(Number.isNumber(12), '12 is a number');
				assert.ok(Number.isNumber(2.5), '2.5 is a number');
				assert.ok(Number.isNumber('012'), '"012" is a number');
				assert.ok(Number.isNumber('012.0'), '"012.0" is a number');
				assert.ok(Number.isNumber('2.5'), '"2.5" is a number');
				assert.ok(!Number.isNumber('2,5'), '"2,5" is not a number');
			});
		});

		describe('#pad', function() {
			it('transforms a number in a string of the chosen length padded with 0', function() {
				assert.strictEqual((3).pad(3), '003', 'Pad 3 for 3 is "003"');
				assert.strictEqual((42).pad(8), '00000042', 'Pad 8 for 42 is "00000042"');
				assert.strictEqual((42).pad(1), '42', 'Pad 1 for 42 is "42"');
				assert.strictEqual((42).pad(-1), '42', 'Pad -1 for 42 is "42"');
			});
		});
	});

	describe('Array', function() {

		describe('#isEmpty', function() {
			it('checks if an arrays is empty', function() {
				assert.ok(new Array().isEmpty(), 'A new array is empty');
				assert.ok([].isEmpty(), 'Array type is empty when created');
				assert.ok(!new Array(1, 2).isEmpty(), 'New array [1, 2] is not empty');
				assert.ok(!['a', 'b'].isEmpty(), 'Array type initialized with values is not empty');
			});
		});

		describe('#remove', function() {
			it('removes the specified index from the array', function() {
				let array;
				array = [1,2,3,4];
				array.remove(1);
				assert.ok(Object.equals(array, [1,3,4]), 'Remove (1) on array [1,2,3,4] gives array [1,3,4]');

				array = new Array(1,2,3,4);
				array.remove(1);
				assert.ok(Object.equals(array, [1,3,4]), 'Remove (1) on object array [1,2,3,4] gives array [1,3,4]');

				array = [1,2,3,4];
				array.remove(0, 2);
				assert.ok(Object.equals(array, [4]), 'Remove (0,2) to array [1,2,3,4] gives array [4]');
			});
		});

		describe('#includesAll', function() {
			it('check if the array includes all the elements of the parameter array', function() {
				const array = ['toto', 'titi', 'tutu'];

				assert.ok(array.includesAll(['titi', 'tutu']), 'Array ["toto","titi","tutu"] contains all ["titi","tutu"]');
				assert.ok(array.includesAll(['toto', 'titi', 'tutu']), 'Array ["toto","titi","tutu"] contains all ["toto","titi","tutu"]');
				assert.ok(array.includesAll([]), 'Array ["toto","titi","tutu"] contains all []');
				assert.ok(!array.includesAll(['toto', 'titi', 'tutu', 'tata']), 'Array ["toto","titi","tutu"] does not contain all ["toto","titi","tutu","tata"]');
				assert.ok(!array.includesAll(['toto', 'tata']), 'Array ["toto","titi","tutu"] does not contain all ["toto","tata"]');
				assert.ok(!array.includesAll(['tata']), 'Array ["toto","titi","tutu"] does not contain ["tata"]');
			});
		});

		describe('#includesOne', function() {
			it('check if the array includes one of the elements of the parameter array', function() {
				const array = ['toto', 'titi', 'tutu'];

				assert.ok(array.includesOne(['titi', 'tata']), 'Array ["toto","titi","tutu"] contains one of ["titi","tata"]');
				assert.ok(!array.includesOne([]), 'Array ["toto","titi","tutu"] does not contains one of []');
				assert.ok(!array.includesOne(['tata', 'tyty']), 'Array ["toto","titi","tutu"] does not contain one of ["tata","tyty"]');
			});
		});

		describe('#includesSame', function() {
			it('check if the array includes one of the elements of the parameter array using the "equals" operator', function() {
				const people_1 = {
					firstname: 'Luke',
					lastname: 'Skywalker'
				};
				const people_2 = {
					fistname: 'Han',
					lastname: 'Solo'
				};
				const people_3 = {
					firstame: 'Leia',
					lastname: ' Organa'
				};
				const people_4 = {
					firstname: 'Luke',
					lastname: 'Skywalker'
				};
				const people_5 = {
					firstame: 'Anakin',
					lastname: 'Skywalker'
				};
				const people = [people_1, people_2, people_3];

				assert.ok(people.includesSame(people_3), '"Contains same" function works the same way than "Contains" function with an object which is equal to an object in the array');
				assert.ok(!people.includesSame(people_5), '"Contains same" function works the same way than "Contains" function with an object which is equal to an object in the array');

				assert.notStrictEqual(people_1, people_4, 'Two objects with same properties and values are not equals with the native way');
				assert.ok(Object.equals(people_1, people_4), 'Two objects with same properties and values are equals with the special function "equals"');
				assert.ok(!people.includes(people_4), '"Contains" function does not work with similar objects');
				assert.ok(people.includesSame(people_4), '"Contains same" function works with similar objects');
				assert.ok(people.includesSame({firstname: 'Luke', lastname: 'Skywalker'}), '"Contains same" function works with similar anonymous objects');
				assert.ok(!people.includesSame({firstname: 'Anakin', lastname: 'Skywalker'}), '"Contains same" function does not work with not similar objects');
			});
		});

		describe('#removeElement', function() {
			it('removed the element if it is in the array', function() {
				const array = ['toto', 'titi', 'tutu'];
				array.removeElement('tutu');
				assert.ok(Object.equals(array, ['toto', 'titi']), 'Remove element "tutu" to array ["toto","titi","tutu"] gives array ["toto","titi"]');
			});

			it('does not update the array if the element is not in the array', function() {
				const array = ['toto', 'titi'];
				array.removeElement('tata');
				assert.ok(Object.equals(array, ['toto', 'titi']), 'Remove an element which is not in the array does not change the array"');
			});
		});

		describe('#removeElements', function() {
			it('removed the elements if they are in the array', function() {
				const array = ['toto', 'titi', 'tutu', 'tete'];
				array.removeElements(['titi', 'tete']);
				assert.ok(Object.equals(array, ['toto', 'tutu']), 'Remove elements "titi" and "tete" to array ["toto","titi","tutu", "tete"] gives array ["toto","tutu"]');
			});

			it('removes only elements that are in the array', function() {
				const array = ['toto', 'titi', 'tutu', 'tete'];
				array.removeElements(['titi', 'tete', 'tata', 'titi']);
				assert.ok(Object.equals(array, ['toto', 'tutu']), 'Remove some elements including one which is not in the array to an array removes only elements that are in the array"');
			});
		});

		describe('#replace', function() {
			it('replaces an element if it is in the array', function() {
				const array = ['toto', 'titi'];
				array.replace('titi', 'tata');
				assert.ok(Object.equals(array, ['toto', 'tata']), 'Replace element "titi" by "tata" in array ["toto","titi"] gives array ["toto","tata"]');
			});

			it('does not update the array if the element is not in the array', function() {
				const array = ['toto', 'tata'];
				array.replace('titi', 'tata');
				assert.ok(Object.equals(array, ['toto', 'tata']), 'Replace an element which is not is the array does not change the array');
			});
		});

		describe('#insert', function() {
			it('insert the parameter at the chosen index', function() {
				const array = ['toto', 'titi', 'tutu'];
				let a, b;

				a = array.slice();
				a.insert(0, 'tata');
				assert.ok(Object.equals(a, ['tata', 'toto', 'titi', 'tutu']), 'Insert element at position 0 inserts the element at the beginning of the array');

				a = array.slice();
				b = array.slice();
				a.insert(0, 'tata');
				b.unshift('tata');
				assert.ok(Object.equals(a, b), 'Insert element at position 0 is the same as unshift element');

				a = array.slice();
				a.insert(2, 'tata');
				assert.ok(Object.equals(a, ['toto', 'titi', 'tata', 'tutu']), 'Insert element at position 2 insert the element so it will be at the index 2');

				a = array.slice();
				a.insert(-2, 'tete');
				assert.ok(Object.equals(a, ['toto', 'tete', 'titi', 'tutu']), 'Insert element at a negative position insert element at the specified position but starting from the end of the array');

				a = array.slice();
				a.insert(10, 'tete');
				assert.ok(Object.equals(a, ['toto', 'titi', 'tutu', 'tete']), 'Insert element at a position higher than array length insert the element at the end of the array');

				a = array.slice();
				b = array.slice();
				a.insert(10, 'tete');
				b.push('tete');
				assert.ok(Object.equals(a, b), 'Insert element at a position higher than array length is the same as push element');
			});
		});
	});

	describe('Date', function() {

		describe('#isDate', function() {
			it('considers all dates as dates', function() {
				assert.ok(Date.isDate(new Date()), 'New date is a date');
				assert.ok(Date.isDate(new Date('3148/12/31')), 'Date [3148/12/31] is a date');
				assert.ok(!Date.isDate({}), 'Empty object is not a date');
				assert.ok(!Date.isDate(1368608924718), 'A timestamp is not a date');
				assert.ok(Date.isDate(new Date('2013/02/38')), 'Invalid date [2013/02/38] is a date');
			});
		});

		describe('#isValidDate', function() {
			it('checks if a date exists', function() {
				assert.ok(Date.isValidDate(new Date()), 'New date is a valid date');
				assert.ok(Date.isValidDate(new Date('3148/12/31')), 'Date [3148/12/31] is a valid date');
				assert.ok(!Date.isValidDate({}), 'Empty object is not a valid date');
				assert.ok(!Date.isValidDate(1368608924718), 'A timestamp is not a valid date');
				assert.ok(Date.isValidDate(new Date(1368608924718)), 'A date built from a timestamp is a valid date');
				assert.ok(!Date.isValidDate(new Date('une date')), 'A date built from string "une date" is not a valid date');
				const date = new Date('2013/04/32');
				assert.ok(!Date.isValidDate(date) || date.getTime() === new Date('2013/05/02').getTime(), 'Date [2013/04/32] is valid date [2013/05/02] for some browsers and is invalid for others browsers');
			});
		});

		describe('#compare', function() {
			it('compare 2 dates chronologically', function() {
				assert.ok(new Date('2009/01/01').isBefore(new Date('2009/01/05')), '[2009/01/01] is before [2009/01/05]');
				assert.ok(new Date('2009/01/05').isAfter(new Date('2009/01/01')), '[2009/01/05] is after [2009/01/01]');
				assert.ok(!new Date('2009/01/05').isBefore(new Date('2009/01/01')), '[2009/01/05] is not before [2009/01/05]');
				assert.ok(!new Date('2009/01/01').isAfter(new Date('2009/01/05')), '[2009/01/05] is not after [2009/01/05]');
			});
		});

		describe('#equals', function() {
			it('checks if 2 dates are equal', function() {
				assert.ok(!new Date('2009/01/01').equals(new Date('2009/01/05')), '[2009/01/01] is not equals to [2009/01/05]');
				assert.ok(new Date('2009/01/01').equals(new Date('2009/01/01')), '[2009/01/01] is equals to [2009/01/01]');
				assert.ok(!new Date('2009/01/01').equals(undefined), '[2009/01/01] is not equals to undefined date');
			});
		});

		describe('#toDisplay, #toUTCDisplay, #toFullDisplay, #toUTCFullDisplay, #format and #formatUTC', function() {
			it('converts date to string using a predefined or chosen format', function() {
				//do not set timezone in date string so Javascript engine will use the timezone of the context, like the toDisplay method
				assert.strictEqual(new Date('2009-01-25T00:00:00').toDisplay(), '2009-01-25', 'Date "2009-01-25T00:00:00" to display is "2009-01-25"');
				assert.strictEqual(new Date('2009-01-25T00:00:00+02:00').toUTCDisplay(), '2009-01-24', 'Date "2009-01-25T00:00:00+02:00" to UTC display is "2009-01-24"');
				assert.strictEqual(new Date('2009-01-25T00:00:00Z').toUTCDisplay(), '2009-01-25', 'Date "2009-01-25T00:00:00Z" to UTC display is "2009-01-25"');

				assert.strictEqual(new Date('2009-01-25T00:00:00').toFullDisplay(), '2009-01-25 00:00:00', 'Date "2009-01-25T00:00:00" to full display is "2009-01-25 00:00:00"');
				assert.strictEqual(new Date('2009-01-25T00:00:00+02:00').toUTCFullDisplay(), '2009-01-24 22:00:00', 'Date "2009-01-25T00:00:00+02:00" to UTC full display is "2009-01-24 22:00:00"');
				assert.strictEqual(new Date('2009-01-25T00:00:00Z').toUTCFullDisplay(), '2009-01-25 00:00:00', 'Date "2009-01-25T00:00:00Z" to UTC full display is "2009-01-25 00:00:00"');

				assert.strictEqual(new Date('2009-01-25T22:38:46.234').toFullDisplay(), '2009-01-25 22:38:46', 'Date "2009-01-25T22:38:46.234" to full display is "2009-01-25 22:38:46"');
				assert.strictEqual(new Date('2009-01-25T22:38:46.234Z').toUTCFullDisplay(), '2009-01-25 22:38:46', 'Date "2009-01-25T22:38:46.234Z" to full display is "2009-01-25 22:38:46"');

				assert.strictEqual(new Date('2009-12-25T22:44').toFullDisplay(), '2009-12-25 22:44:00', 'Date "2009-11-25T22:44" to full display is "2009-12-25 22:38:00"');
				assert.strictEqual(new Date('2009-12-25T22:44Z').toUTCFullDisplay(), '2009-12-25 22:44:00', 'Date "2009-11-25T22:44Z" to full display is "2009-12-25 22:38:00"');

				assert.strictEqual(new Date('2009-01-25T00:00:00').format('${day}.${month}.${year}'), '25.01.2009', 'Date "2009-01-25T00:00:00" formatter with formatter "${day}.${month}.${year}" is "25.01.2009"');
				assert.strictEqual(new Date('2009-01-25T00:00:00+02:00').formatUTC('${day}.${month}.${year}'), '24.01.2009', 'Date "2009-01-25T00:00:00+02:00" formatter with formatter "${day}.${month}.${year}" is "24.01.2009"');
				assert.strictEqual(new Date('2009-01-25T00:00:00Z').formatUTC('${day}.${month}.${year}'), '25.01.2009', 'Date "2009-01-25T00:00:00Z" formatter with formatter "${day}.${month}.${year}" is "25.01.2009"');

				assert.strictEqual(
					new Date('2009-01-25T00:00:00').format('${day}.${month}.${year} ${hour}:${minute}:${second}:${millisecond}'),
					'25.01.2009 00:00:00:000',
					'Date "2009-01-25T00:00:00" formatted with formatter "${day}.${month}.${year} ${hour}:${minute}:${second}:${millisecond}" is "25.01.2009 00:00:00:000"');
				assert.strictEqual(
					new Date('2009-12-17T03:24:12').format('${day}.${month}.${year} ${hour}:${minute}:${second}'),
					'17.12.2009 03:24:12',
					'Date "2009-12-17T03:24:12" formatted with formatter "${day}.${month}.${year} ${hour}:${minute}:${second}" is "17.12.2009 03:24:12"');
				assert.strictEqual(
					new Date('2042-06-01T22:20:52.420').format('${day}.${month}.${year} ${hour}:${minute}:${second}:${millisecond}'),
					'01.06.2042 22:20:52:420',
					'Date "2042-06-01T22:20:52.420" formatted with formatter "${day}.${month}.${year} ${hour}:${minute}:${second}:${millisecond}" is "01.06.2042 22:20:52:420"');
				assert.strictEqual(
					new Date('2009-01-25T00:00:00').format('Date : ${month}.${day} (month, day)'),
					'Date : 01.25 (month, day)',
					'Date "2009-01-25T00:00:00" formatter with formatter "Date : ${month}.${day} (month, day)" is "Date : 01.25 (month, day)"');
				assert.strictEqual(
					new Date('2009-12-17T19:24:12').format('${hour}$${minute}seconds${second} // Day ${day} of month ${month} in year ${year}'),
					'19$24seconds12 // Day 17 of month 12 in year 2009',
					'Date "2009-12-17T19:24:12" formatted with formatter "${hour}$${minute}seconds${second} // Day ${day} of month ${month} in year ${year}" is "19$$24seconds12 // Day 17 of month 12 in year 2009"');

			});
		});

		describe('#parseToDisplay', function() {
			it('parses a date using the context timezone', function() {
				assert.strictEqual(Date.parseToDisplay('2009-01-25').getTime(), new Date('2009/01/25').getTime(), 'Parsing date "2009-01-25" gives the good date');
				assert.strictEqual(Date.parseToDisplay('2009-2-5').getTime(), new Date('2009/2/5').getTime(), 'Parsing date "2009-2-5" gives the good date');
				assert.ok(!Date.isValidDate(Date.parseToDisplay('09-01-25')), 'Incomplete date "09-01-25" cannot be parsed');
				const date = Date.parseToDisplay('2009-01-33');
				assert.ok(!Date.isValidDate(date) || date.getTime() === new Date('2009/02/02').getTime(), 'Parsing date "2009-01-33" gives date [2009/02/02] for some browsers and gives an invalid date for others browsers');
			});
		});

		describe('#parseToFullDisplay', function() {
			it('parses a date time using the context timezone', function() {
				assert.strictEqual(Date.parseToFullDisplay('2009-01-25 22:38:46').getTime(), new Date(2009, 0, 25, 22, 38, 46).getTime(), 'Parsing date "2009-01-25 22:38:46" gives the good date');
				assert.strictEqual(Date.parseToFullDisplay('2009-01-25 22:62:46').getTime(), new Date(2009, 0, 25, 23, 2, 46).getTime(), 'Parsing date "2009-01-25 22:62:46" gives the good date');
				assert.strictEqual(Date.parseToFullDisplay('2009-01-25 2:6:4').getTime(), new Date(2009, 0, 25, 2, 6, 4).getTime(), 'Parsing date "2009-01-25 2:6:4" gives the good date');
				assert.ok(!Date.isValidDate(Date.parseToFullDisplay('25.01.09 2:6:4')), 'Incomplete date "25.01.09 2:6:4" cannot be parsed');
			});
		});

		describe('#parseToFullDisplayUTC', function() {
			it('parses a date time in UTC', function() {
				assert.strictEqual(Date.parseToFullDisplayUTC('2009-01-25 22:38:46').getTime(), new Date(Date.UTC(2009, 0, 25, 22, 38, 46)).getTime(), 'Parsing date "2009-01-25 22:38:46" gives the good date');
				assert.strictEqual(Date.parseToFullDisplayUTC('2009-01-25 22:62:46').getTime(), new Date(Date.UTC(2009, 0, 25, 23, 2, 46)).getTime(), 'Parsing date "2009-01-25 22:62:46" gives the good date');
				let local_date;
				//test with winter time
				local_date = new Date(2014, 1, 25, 10, 42, 30);
				assert.strictEqual(
					Date.parseToFullDisplay('2014-01-25 10:42:30').getTime() - Date.parseToFullDisplayUTC('2014-01-25 10:42:30').getTime(),
					local_date.getTimezoneOffset() * 60 * 1000,
					'Difference between date "2014-01-25 10:42:30" parsed as UTC and the same date parsed as local time is equals to the local timezone offset');
				//test with summer time
				local_date = new Date(2014, 7, 25, 10, 42, 30);
				assert.strictEqual(
					Date.parseToFullDisplay('2014-07-25 10:42:30').getTime() - Date.parseToFullDisplayUTC('2014-07-25 10:42:30').getTime(),
					local_date.getTimezoneOffset() * 60 * 1000,
					'Difference between date "2014-07-25 10:42:30" parsed as UTC and the same date parsed as local time is equals to the local timezone offset');
			});
		});

		describe('#roundToDay, #roundToHour and #roundToMinute', function() {
			it('rounds the date to the specified unit', function() {
				let date = Date.parseToFullDisplay('2015-01-20 22:42:12');
				date.roundToMinute();
				assert.strictEqual(date.toFullDisplay(), '2015-01-20 22:42:00', 'Rounding date to minute give a date with 0 second');
				date.roundToHour();
				assert.strictEqual(date.toFullDisplay(), '2015-01-20 23:00:00', 'Rounding date to hour give a date with 0 minute');
				date.roundToDay();
				assert.strictEqual(date.toFullDisplay(), '2015-01-21 00:00:00', 'Rounding date to day give a date with 0 hour');

				date = Date.parseToFullDisplay('2015-01-20 12:29:52');
				date.roundToMinute();
				assert.strictEqual(date.toFullDisplay(), '2015-01-20 12:30:00', 'Rounding date to minute give a date with 0 second');
				date.roundToHour();
				assert.strictEqual(date.toFullDisplay(), '2015-01-20 13:00:00', 'Rounding date to hour give a date with 0 minute');
				date.roundToDay();
				assert.strictEqual(date.toFullDisplay(), '2015-01-21 00:00:00', 'Rounding date to day give a date with 0 hour');

				date = Date.parseToFullDisplay('2015-01-20 03:00:12');
				date.roundToDay();
				assert.strictEqual(date.toFullDisplay(), '2015-01-20 00:00:00', 'Rounding date to day give a date with 0 hour');
			});
		});

		describe('#addDays, #addMinutes, #addSeconds', function() {
			it('add the number of units to a date', function() {
				let date, time;

				date = new Date('2020-01-05T07:59:59.142');
				time = date.getTime();
				date.addMilliseconds(42);
				assert.strictEqual(date.getTime(), new Date('2020-01-05T07:59:59.184').getTime(), 'Adding 42 milliseconds to a date updates the date to 42 milliseconds later');
				date.addMilliseconds(900);
				assert.strictEqual(date.getTime(), new Date('2020-01-05T08:00:00.084').getTime(), 'Adding 900 milliseconds to a date updates the date to 900 milliseconds later');

				date = new Date('2020-01-05T07:59:59');
				time = date.getTime();
				date.addSeconds(2);
				assert.strictEqual(date.getTime() - time, 2000, 'Adding 2 seconds is the same as adding 2000 milliseconds');
				assert.strictEqual(date.getTime(), new Date('2020-01-05T08:00:01').getTime(), 'Adding 2 seconds to a date updates the date to 2 seconds later');

				date = new Date('2020-01-04T23:59:59');
				time = date.getTime();
				date.addSeconds(1);
				assert.strictEqual(date.getTime() - time, 1000, 'Adding 1 second is the same as adding 1000 milliseconds');
				assert.strictEqual(date.getTime(), new Date('2020-01-05T00:00:00').getTime(), 'Adding 1 second to a date updates the date to 1 second later');

				date = new Date('2020-01-04T23:59:59');
				time = date.getTime();
				date.addSeconds(0.5);
				assert.strictEqual(date.getTime() - time, 500, 'Adding 0.5 second is the same as adding 500 milliseconds');
				assert.strictEqual(date.getTime(), new Date('2020-01-04T23:59:59.5').getTime(), 'Adding 0.5 second to a date updates the date to 0.5 second later');

				date = new Date('2009/01/25');
				date.addDays(3);
				assert.strictEqual(date.getTime(), new Date('2009/01/28').getTime(), 'Add 3 days to [2009/01/25] gives [2009/01/28]');

				date = new Date('2009/01/25');
				date.addDays(-1);
				assert.strictEqual(date.getTime(), new Date('2009/01/24').getTime(), 'Add -1 day to [2009/01/25] gives [2009/01/24]');

				date = new Date('2009/01/25');
				date.addDays(3.8);
				assert.strictEqual(date.toDisplay(), '2009-01-28', 'Add 3.8 days to [2009/01/25] to display is [2009-01-28]');

				date = new Date('2009/01/25');
				date.addDays(4.1);
				assert.strictEqual(date.toDisplay(), '2009-01-29', 'Add 4.1 days to [2009/01/25] to display is [2009-01-29]');
			});
		});

		describe('#addTimeString', function() {
			it('add a period defined as a string to a date', function() {
				const date = new Date('2009/01/25');
				assert.ok(Object.equals(date.clone().addTimeString('1y'), date.clone().addYears(1)), 'Add "1y" to a date adds 1 year"');
				assert.ok(Object.equals(date.clone().addTimeString('1y5d'), date.clone().addYears(1).addDays(5)), 'Add "1y5d" to a date adds 1 year and 5 days"');
				assert.ok(Object.equals(date.clone().addTimeString('1y5d0M0S'), date.clone().addYears(1).addDays(5)), 'Add "1y5d0M0S" to a date adds 1 year and 5 days"');
				assert.ok(Object.equals(date.clone().addTimeString('-1y5d'), date.clone().addYears(-1).addDays(5)), 'Add "-1y5d" to a date removes one year and add 5 days"');
				assert.ok(Object.equals(date.clone().addTimeString('6m24H300S'), date.clone().addMonths(6).addHours(24).addSeconds(300)), 'Add "6m24H300s" to a date adds 6 months, 24 hours and 300 seconds"');
				assert.ok(Object.equals(date.clone().addTimeString('6m0H-30M'), date.clone().addMonths(6).addMinutes(-30)), 'Add "6m24H300s" to a date adds 6 months and removes 30 minutes"');
			});
		});

		describe('#getDurationLiteral', function() {
			it('transform a duration from seconds to a string', function() {
				assert.strictEqual(Date.getDurationLiteral(0), '', 'Duration literal for 0 is the empty string');
				assert.strictEqual(Date.getDurationLiteral(2), '2 seconds', 'Duration literal for 2 is "2 seconds"');
				assert.strictEqual(Date.getDurationLiteral(60), '1 minutes', 'Duration literal for 60 is "1 minutes"');
				assert.strictEqual(Date.getDurationLiteral(61), '1 minutes 1 seconds', 'Duration literal for 61 is "1 minutes 1 seconds"');
				assert.strictEqual(Date.getDurationLiteral(179), '2 minutes 59 seconds', 'Duration literal for 179 is "2 minutes 59 seconds"');
				assert.strictEqual(Date.getDurationLiteral(3601), '1 hours 1 seconds', 'Duration literal for 3601 is "1 hours 1 seconds"');
				assert.strictEqual(Date.getDurationLiteral(86400), '1 days', 'Duration literal for 86400 is "1 days"');
				assert.strictEqual(Date.getDurationLiteral(86401), '1 days 1 seconds', 'Duration literal for 86401 is "1 days 1 seconds"');
			});
		});

		describe('#getAgeLiteral', function() {
			it('returns the age of a date as a string', function() {
				assert.strictEqual(new Date().getAgeLiteral(), 'just now', 'Literal age of now is "just now"');
				assert.strictEqual(new Date().addSeconds(-1).getAgeLiteral(), 'a second ago', 'Literal age of 1 second old date is "one second ago"');
				assert.strictEqual(new Date().addSeconds(-12).getAgeLiteral(), '12 seconds ago', 'Literal age of 12 seconds old date is "12 seconds ago"');
				assert.strictEqual(new Date().addSeconds(-59).getAgeLiteral(), '59 seconds ago', 'Literal age of 59 seconds old date is "59 seconds ago"');
				assert.strictEqual(new Date().addSeconds(-60).getAgeLiteral(), 'a minute ago', 'Literal age of 60 seconds old date is "a minute ago"');
				assert.strictEqual(new Date().addSeconds(-61).getAgeLiteral(), 'a minute ago', 'Literal age of 61 seconds old date is "a minute ago"');
				assert.strictEqual(new Date().addSeconds(-89).getAgeLiteral(), 'a minute ago', 'Literal age of 89 seconds old date is "a minute ago"');
				assert.strictEqual(new Date().addSeconds(-90).getAgeLiteral(), '2 minutes ago', 'Literal age of 90 seconds old date is "2 minutes ago"');
				assert.strictEqual(new Date().addSeconds(-91).getAgeLiteral(), '2 minutes ago', 'Literal age of 91 seconds old date is "2 minutes ago"');
				assert.strictEqual(new Date().addSeconds(-4254).getAgeLiteral(), 'an hour ago', 'Literal age of 4254 seconds old date is "an hour ago"');
				assert.strictEqual(new Date().addHours(-23).getAgeLiteral(), '23 hours ago', 'Literal age of 23 hours old date is "23 hours ago"');
				assert.strictEqual(new Date().addHours(-24).getAgeLiteral(), 'a day ago', 'Literal age of 24 hours old date is "a day ago"');
				assert.strictEqual(new Date().addDays(-1).getAgeLiteral(), 'a day ago', 'Literal age of 24 hours old date is "a day ago"');
				assert.strictEqual(new Date().addDays(-42).getAgeLiteral(), '42 days ago', 'Literal age of 42 days old date is "42 days ago"');

				assert.strictEqual(new Date().addSeconds(10).getAgeLiteral(), 'in 10 seconds', 'Literal age of 10 seconds in the future date is "in 10 seconds"');
			});
		});
	});
});
