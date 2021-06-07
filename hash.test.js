import {Hash} from './hash.js';

export default function test(assert) {
	assert.begin();

	const object_1 = {toto: 'tata'};
	assert.equal(Hash.Encode(object_1), '#toto=tata', 'Hash works with simple object');
	assert.similar(Hash.Decode(Hash.Encode(object_1)), object_1, 'Hash is a bijection');

	const object_2 = {node: 'study', section: 'rules'};
	assert.equal(Hash.Encode(object_2), '#node=study&section=rules', 'Hash works with object');
	assert.similar(Hash.Decode(Hash.Encode(object_2)), object_2, 'Hash is a bijection');

	const object_3 = {countries: ['france', 'switzerland'], languages: ['fr', 'de', 'it']};
	assert.notEqual(Hash.Encode(object_3), '#countries=[france,switzerland]&language=[fr,de,it]', 'Hash does not works with object containing array');
	assert.notSimilar(Hash.Decode(Hash.Encode(object_3)), object_3, 'Hash is unable to decode hash containing arrays');

	assert.end();
}
