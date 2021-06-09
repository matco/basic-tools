/*eslint-env mocha*/

import '../dom_extension.js';

import {assert} from './assert.js';

describe('dom_extension', function() {

	describe('Node', function() {

		describe('#empty', function() {
			it('empty a node', function() {
				const div = document.createElement('div');

				//add random nodes
				div.appendChild(document.createElement('span'));
				div.appendChild(document.createElement('span'));
				div.appendChild(document.createTextNode('hop'));
				assert.strictEqual(div.childNodes.length, 3, 'There is 3 child nodes in newly created container');
				div.empty();
				assert.strictEqual(div.childNodes.length, 0, 'There is 0 child node in container after it has been cleared');

				//add text node
				div.appendChild(document.createTextNode('hop'));
				assert.strictEqual(div.childNodes.length, 1, 'There is 1 child text node in container');
				div.empty();
				assert.strictEqual(div.childNodes.length, 0, 'There is 0 child text node in container after it has been cleared');
			});
		});

		describe('#appendChildren', function() {
			it('append an array of child nodes to a node', function() {
				const div = document.createElement('div');

				//add random nodes
				assert.strictEqual(div.childNodes.length, 0, 'There is 0 child node in newly created container');
				div.appendChildren([document.createElement('span'), document.createElement('span')]);
				assert.strictEqual(div.childNodes.length, 2, 'There is 2 child nodes in container after 2 child nodes have been added');

				//add text node
				div.appendChildren([document.createTextNode('hop')]);
				assert.strictEqual(div.childNodes.length, 3, 'There is 3 child nodes in container after 1 child text node has been added');
			});
		});
	});

	describe('Element', function() {

		describe('#setAttributes', function() {
			it('adds a map of attribute to an element', function() {
				const a = document.createElement('a');

				assert.ok(!a.hasAttribute('href'), 'Newly created link has no attribute "href"');

				//add some attributes
				a.setAttributes({href: '#here', 'class': 'important', style: 'border: 1px solid black;'});

				assert.ok(a.hasAttribute('href'), 'Link has attribute "href"');
				assert.ok(a.hasAttribute('class'), 'Link has attribute "class"');
				assert.strictEqual(a.getAttribute('href'), '#here', 'Attribute "href" has been set with good value');
				assert.strictEqual(a.getAttribute('class'), 'important', 'Attribute "class" has been set with good value');

				//overwrite one attribute and add a new one
				a.setAttributes({'class': 'useless', title: 'Useless link'});

				assert.strictEqual(a.getAttribute('class'), 'useless', 'Attribute "class" has been overridden with good value');
				assert.strictEqual(a.getAttribute('title'), 'Useless link', 'Attribute "title" has been set with good value');
			});
		});
	});

	describe('Document', function() {

		describe('#createFullElement', function() {
			it('create an element with attributes, text content and listeners', function() {
				let clicked = false;
				const button = document.createFullElement(
					'button',
					{type: 'button', 'class': 'important', style: 'cursor: pointer;'},
					'Here',
					{
						click: function(event) {
							event.preventDefault();
							clicked = true;
						}
					}
				);

				assert.strictEqual(button.nodeName, 'BUTTON', 'Button has been created');
				assert.strictEqual(button.getAttribute('class'), 'important', 'Button "class" has been set with good value');
				assert.strictEqual(button.textContent, 'Here', 'Button text has been set with good text');
				assert.ok(!clicked, 'Button has not been clicked yet');
				button.click();
				assert.ok(clicked, 'Button listener has been set successfully');
			});
		});
	});

	describe('Form', function() {

		describe('#disable and #enable', function() {
			it('disables and enables a form', function() {
				const form = document.createElement('form');
				const input = document.createFullElement('input', {name: 'value_1'});
				const select = document.createFullElement('select', {name: 'value_2'});
				const button_submit = document.createFullElement('button', {type: 'submit'}, 'Submit');
				const button_close = document.createFullElement('button', {type: 'button'}, 'Close');
				const p = document.createFullElement('p', {}, 'Form errors placeholder');
				form.appendChildren([input, select, button_submit, button_close, p]);

				form.disable();
				assert.ok(input.hasAttribute('disabled'), 'Input field has been disabled');
				assert.ok(select.hasAttribute('disabled'), 'Select field has been disabled');
				assert.ok(button_submit.hasAttribute('disabled'), 'Submit button has been disabled');
				assert.ok(button_close.hasAttribute('disabled'), 'Normal button has been disabled');
				assert.ok(!p.hasAttribute('disabled'), 'Paragraph element has not been disabled');

				form.enable();
				assert.ok(!input.hasAttribute('disabled'), 'Input field has been enabled');
				assert.ok(!select.hasAttribute('disabled'), 'Select field has been enabled');
				assert.ok(!button_submit.hasAttribute('disabled'), 'Submit button has been enabled');
				assert.ok(!button_close.hasAttribute('disabled'), 'Normal button has been enabled');
				assert.ok(!p.hasAttribute('disabled'), 'Paragraph has never been disabled');
			});
		});
	});

	describe('Storage', function() {

		describe('#setObject and #getObject', function() {
			it('set and get an object in a storage', function() {
				const city = {
					name: 'Geneva',
					population: 500000,
					country: 'Switzerland'
				};
				localStorage.setObject('city', city);
				assert.strictEqual(localStorage.getObject('city').name, 'Geneva', 'Store city object in local storage and retrieve city name to obtain "Geneva"');
				assert.strictEqual(localStorage.getObject('city').population, 500000, 'Store city object in local storage and retrieve city population to obtain 500000');
				assert.strictEqual(localStorage.getItem('city'), '{"name":"Geneva","population":500000,"country":"Switzerland"}', 'Store city object in local storage and retrieve it');
				localStorage.removeItem('city');
			});
		});
	});
});
