/*eslint-env mocha*/

import {assert} from './assert.js';
import {SVG} from '../svg.js';

describe('SVG', function() {

	describe('#Create', function() {
		it('creates an SVG element', function() {
			const svg = SVG.Create({class: 'test'});
			assert.strictEqual(svg.nodeName, 'svg', 'Creates the good node element');
			assert.strictEqual(svg.getAttribute('class'), 'test', 'Adds the specified attribute');
		});
	});

	describe('#Rectangle', function() {
		it('creates a rectangle properly', function() {
			let rectangle = SVG.Rectangle(10, 20, 80, 60, {class: 'test'});
			assert.strictEqual(rectangle.nodeName, 'rect', 'Creates the good node element');
			assert.strictEqual(rectangle.getAttribute('x'), '10.5', 'Rectangle has the specified x coordinate');
			assert.strictEqual(rectangle.getAttribute('y'), '20.5', 'Rectangle has the specified y coordinate');
			assert.strictEqual(rectangle.getAttribute('width'), '80', 'Rectangle has the specified width');
			assert.strictEqual(rectangle.getAttribute('height'), '60', 'Rectangle has the specified height');
			assert.strictEqual(rectangle.getAttribute('class'), 'test', 'Rectangle has the specified additional attribute');
			rectangle = SVG.Rectangle(10.12345, 20.5, 80.67859, 60, {class: 'test'});
			assert.strictEqual(rectangle.getAttribute('x'), '10.5', 'Rectangle has the specified x coordinate');
			assert.strictEqual(rectangle.getAttribute('y'), '20.5', 'Rectangle has the specified y coordinate');
			assert.strictEqual(rectangle.getAttribute('width'), '81', 'Rectangle has the specified width');
			assert.strictEqual(rectangle.getAttribute('height'), '60', 'Rectangle has the specified height');
		});
	});

	describe('#Image', function() {
		it('creates an image properly', function() {
			const image = SVG.Image(10, 20, 80, 60, 'test.png', {class: 'test'});
			assert.strictEqual(image.nodeName, 'image', 'Creates the good node element');
			assert.strictEqual(image.getAttribute('x'), '10.5', 'Image has the specified x coordinate');
			assert.strictEqual(image.getAttribute('y'), '20.5', 'Image has the specified y coordinate');
			assert.strictEqual(image.getAttribute('width'), '80', 'Image has the specified width');
			assert.strictEqual(image.getAttribute('height'), '60', 'Image has the specified height');
			assert.strictEqual(image.getAttribute('href'), 'test.png', 'Image has the right href');
			assert.strictEqual(image.getAttribute('class'), 'test', 'Image has the specified additional attribute');
		});
	});

	describe('#Link', function() {
		it('creates a link', function() {
			const image = SVG.Link('http://www.example.org', {class: 'test'});
			assert.strictEqual(image.nodeName, 'a', 'Creates the good node element');
			assert.strictEqual(image.getAttribute('href'), 'http://www.example.org', 'Link has the specified href');
			assert.strictEqual(image.getAttribute('class'), 'test', 'Image has the specified additional attribute');
		});
	});
});
