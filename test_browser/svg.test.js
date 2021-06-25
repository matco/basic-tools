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

	describe('#RectangleCentered', function() {
		it('creates a centered rectangle properly', function() {
			const rectangle = SVG.RectangleCentered(50, 60, 20, 30);
			assert.strictEqual(rectangle.nodeName, 'rect', 'Creates the good node element');
			assert.strictEqual(rectangle.getAttribute('x'), '40.5', 'Rectangle has been centered horizontally');
			assert.strictEqual(rectangle.getAttribute('width'), '20', 'Rectangle has the specified width');
			assert.strictEqual(rectangle.getAttribute('y'), '45.5', 'Rectangle has the centered vertically');
			assert.strictEqual(rectangle.getAttribute('height'), '30', 'Rectangle has the specified height');
		});
	});

	describe('#RectangleCenteredHorizontally', function() {
		it('creates an horizontally centered rectangle properly', function() {
			const rectangle = SVG.RectangleCenteredHorizontally(50, 60, 20, 30);
			assert.strictEqual(rectangle.nodeName, 'rect', 'Creates the good node element');
			assert.strictEqual(rectangle.getAttribute('x'), '40.5', 'Rectangle has been centered horizontally');
			assert.strictEqual(rectangle.getAttribute('width'), '20', 'Rectangle has the specified width');
			assert.strictEqual(rectangle.getAttribute('y'), '60.5', 'Rectangle has the specified y coordinate');
			assert.strictEqual(rectangle.getAttribute('height'), '30', 'Rectangle has the specified height');
		});
	});

	describe('#RectangleCenteredVertically', function() {
		it('creates a vertically centered rectangle properly', function() {
			const rectangle = SVG.RectangleCenteredVertically(50, 60, 20, 30);
			assert.strictEqual(rectangle.nodeName, 'rect', 'Creates the good node element');
			assert.strictEqual(rectangle.getAttribute('x'), '50.5', 'Rectangle has the specified x coordinate');
			assert.strictEqual(rectangle.getAttribute('width'), '20', 'Rectangle has the specified width');
			assert.strictEqual(rectangle.getAttribute('y'), '45.5', 'Rectangle has been centered vertically');
			assert.strictEqual(rectangle.getAttribute('height'), '30', 'Rectangle has the specified height');
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

	describe('#ImageCentered', function() {
		it('creates a centered image properly', function() {
			const image = SVG.ImageCentered(50, 60, 20, 30, 'test.png');
			assert.strictEqual(image.nodeName, 'image', 'Creates the good node element');
			assert.strictEqual(image.getAttribute('x'), '40.5', 'Image has been centered horizontally');
			assert.strictEqual(image.getAttribute('width'), '20', 'Image has the specified width');
			assert.strictEqual(image.getAttribute('y'), '45.5', 'Image has the centered vertically');
			assert.strictEqual(image.getAttribute('height'), '30', 'Image has the specified height');
		});
	});

	describe('#ImageCenteredHorizontally', function() {
		it('creates an horizontally centered image properly', function() {
			const image = SVG.ImageCenteredHorizontally(50, 60, 20, 30, 'test.png');
			assert.strictEqual(image.nodeName, 'image', 'Creates the good node element');
			assert.strictEqual(image.getAttribute('x'), '40.5', 'Image has been centered horizontally');
			assert.strictEqual(image.getAttribute('width'), '20', 'Image has the specified width');
			assert.strictEqual(image.getAttribute('y'), '60.5', 'Image has the specified y coordinate');
			assert.strictEqual(image.getAttribute('height'), '30', 'Image has the specified height');
		});
	});

	describe('#ImageCenteredVertically', function() {
		it('creates a vertically centered image properly', function() {
			const image = SVG.ImageCenteredVertically(50, 60, 20, 30, 'test.png');
			assert.strictEqual(image.nodeName, 'image', 'Creates the good node element');
			assert.strictEqual(image.getAttribute('x'), '50.5', 'Image has the specified x coordinate');
			assert.strictEqual(image.getAttribute('width'), '20', 'Image has the specified width');
			assert.strictEqual(image.getAttribute('y'), '45.5', 'Image has been centered vertically');
			assert.strictEqual(image.getAttribute('height'), '30', 'Image has the specified height');
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
