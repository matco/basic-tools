/*eslint-env mocha*/

import * as assert from 'assert';
import {Hash} from '../hash.js';

describe('Hash', function() {

	describe('#Encode and #Decode', function() {
		it('encodes and decodes simple objects', function() {
			const object_1 = {toto: 'tata'};
			assert.strictEqual(Hash.Encode(object_1), '#toto=tata', 'Hash works with simple object');
			assert.deepStrictEqual(Hash.Decode(Hash.Encode(object_1)), object_1, 'Hash is a bijection');

			const object_2 = {node: 'study', section: 'rules'};
			assert.strictEqual(Hash.Encode(object_2), '#node=study&section=rules', 'Hash works with object');
			assert.deepStrictEqual(Hash.Decode(Hash.Encode(object_2)), object_2, 'Hash is a bijection');
		});

		it('does not encode and decode complex objects', function() {
			const object_3 = {countries: ['france', 'switzerland'], languages: ['fr', 'de', 'it']};
			assert.notStrictEqual(Hash.Encode(object_3), '#countries=[france,switzerland]&language=[fr,de,it]', 'Hash does not works with object containing array');
			assert.notDeepStrictEqual(Hash.Decode(Hash.Encode(object_3)), object_3, 'Hash is unable to decode hash containing arrays');
		});
	});
});
