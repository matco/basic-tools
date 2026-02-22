import * as assert from 'assert';
import {Queue} from '../queue.js';

const messages = [];
let chrono = 0;
const delay = 50;

/**
 * Generate a promise that will add a message to the messages list and increase the chrono by a given time after a delay
 * @param {string} message - The message to add to the messages list
 * @param {number} time - The time to wait before resolving the promise
 * @returns {() => Promise<void>} A function that returns a promise
 */
function timer_generator(message, time) {
	return () => new Promise(function(resolve) {
		messages.push(message);
		chrono += time;
		console.log(message);
		setTimeout(resolve, time);
	});
}

describe('Queue', function() {
	describe('#add and #addAll', function() {
		it('add one promise or an array or promises to a queue', function(done) {
			const queue = new Queue().then(done);

			queue.add(timer_generator('Message 1 (1d)', delay));

			queue.addAll([
				timer_generator('Message 2 (2d)', delay),
				timer_generator('Message 3 (3d)', delay)
			]);

			queue.addAll([
				timer_generator('Message 4 (4d)', delay / 2),
				timer_generator('Message 5 (4.5d)', delay / 2)
			]);

			queue.add(() => new Promise(function(resolve) {
				assert.strictEqual(messages.length, 5, 'Messages list contains 5 messages');
				assert.strictEqual(messages[0], 'Message 1 (1d)', 'First message is good message');
				assert.strictEqual(messages[1], 'Message 2 (2d)', 'Second message is good message');
				assert.strictEqual(messages[2], 'Message 3 (3d)', 'Third message is good message');
				assert.strictEqual(messages[3], 'Message 4 (4d)', 'Fourth message is good message');
				assert.strictEqual(messages[4], 'Message 5 (4.5d)', 'Fifth message is good message');
				assert.strictEqual(chrono, 4 * delay, 'Tests are done 4d later');
				setTimeout(resolve, 2 * delay);
			}));

			queue.addAll([
				timer_generator('Message 6 (7d)', delay),
				timer_generator('Message 7 (8d)', delay)
			]);

			//following lines should be useless
			queue.run();
			queue.run();
			queue.run();
		});
	});
});
