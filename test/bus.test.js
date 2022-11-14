/*eslint-env mocha*/

import '../extension.js';

import * as assert from 'assert';
import {Bus, BusEvent} from '../bus.js';

const bus = new Bus();

let beeps_number = 0;
const beeps_type_numbers = {
	short: 0,
	long: 0
};
const beeps_sequence = [];

const beep_counter = {
	onBeep: function(event) {
		beeps_type_numbers[event.type]++;
		beeps_number++;
	}
};

const beep_recorder = {
	onBeepShort: function(event) {
		beeps_sequence.push({type: 'short', volume: event.volume});
	},
	onBeepLong: function(event) {
		beeps_sequence.push({type: 'long', volume: event.volume});
	}
};

//create node
class BusEventBeep extends BusEvent {
	constructor(type, volume) {
		super();
		this.type = type;
		this.volume = volume;
	}
	getCallbacks() {
		return [`onBeep${this.type.capitalize()}`, 'onBeep'];
	}
}

describe('Bus', function() {

	describe('#register', function() {
		it('registers listener properly', function() {
			bus.register(beep_counter);
			assert.strictEqual(bus.listeners.length, 1);
			assert.ok(bus.isRegistered(beep_counter));
		});
	});

	describe('#lock and #unlock', function() {
		it('does not register listener when locked', function() {
			bus.lock();
			bus.register(beep_recorder);
			assert.strictEqual(bus.listeners.length, 1, 'There is still 1 listener in bus after 1 listener has been registered when bus is locked');
			assert.ok(!bus.isRegistered(beep_recorder), 'Listener is not registered after it has been registered when bus is locked');

			bus.unlock();
			bus.register(beep_recorder);
			assert.strictEqual(bus.listeners.length, 2, 'There is 2 listeners in bus after 1 new listener has been registered and bus has been unlocked');
			assert.ok(bus.isRegistered(beep_recorder), 'Listener is registered after it has been registered');

			bus.lock();
			bus.unregister(beep_recorder);
			assert.strictEqual(bus.listeners.length, 2, 'There is still 2 listener in bus after 1 listener has been unregistered when bus is locked');
			assert.ok(bus.isRegistered(beep_recorder), 'Listener is still registered after it has been unregistered when bus is locked');

			bus.unlock();
			bus.unregister(beep_recorder);
			assert.strictEqual(bus.listeners.length, 1, 'There is 1 listener in bus after 1 listener has been unregistered');
			assert.ok(!bus.isRegistered(beep_recorder), 'Listener is no more registered after it has been unregistered');
		});
	});

	describe('#reset', function() {
		it('removes all listeners', function() {
			bus.reset();
			assert.ok(bus.listeners.isEmpty(), 'Bus has no more listener after being reset');
			assert.ok(!bus.isRegistered(beep_counter), 'Listener is not registered after bus has been reset');
			assert.ok(!bus.isRegistered(beep_recorder), 'Listener is not registered after bus has been reset');
		});
	});

	const short_loud_beep = new BusEventBeep('short', 10);
	//var long_loud_beep = new BusEventBeep('long', 10);
	//var short_quiet_beep = new BusEventBeep('short', 1);
	const long_quiet_beep = new BusEventBeep('long', 1);

	describe('#dispatch', function() {
		it('dispatches events properly', function() {
			bus.register(beep_counter);
			bus.register(beep_recorder);


			bus.dispatch(short_loud_beep);
			assert.strictEqual(beeps_number, 1, 'There was 1 beep');
			assert.strictEqual(beeps_type_numbers['short'], 1, 'There was 1 short beep');
			assert.strictEqual(beeps_type_numbers['long'], 0, 'There was 0 long beep');
			assert.strictEqual(beeps_sequence.length, 1, 'There was 1 beep in beeps sequence');

			bus.dispatch(long_quiet_beep);
			assert.strictEqual(beeps_number, 2, 'There was 2 beeps');
			assert.strictEqual(beeps_type_numbers['short'], 1, 'There was 1 short beep');
			assert.strictEqual(beeps_type_numbers['long'], 1, 'There was 1 long beep');
			assert.strictEqual(beeps_sequence.length, 2, 'There was 2 beeps in beeps sequence');
		});
	});

	describe('#disable and #enable', function() {
		it('discards events when disabled', function() {
			bus.disable();

			bus.dispatch(short_loud_beep);
			bus.dispatch(long_quiet_beep);
			assert.strictEqual(beeps_number, 2, 'There was 2 beeps');
			assert.strictEqual(beeps_type_numbers['short'], 1, 'There was 1 short beep');
			assert.strictEqual(beeps_type_numbers['long'], 1, 'There was 1 long beep');
			assert.strictEqual(beeps_sequence.length, 2, 'There was 2 beeps in beeps sequence');

			bus.enable();

			bus.dispatch(short_loud_beep);
			bus.dispatch(long_quiet_beep);
			assert.strictEqual(beeps_number, 4, 'There was 4 beeps');
			assert.strictEqual(beeps_type_numbers['short'], 2, 'There was 2 short beeps');
			assert.strictEqual(beeps_type_numbers['long'], 2, 'There was 2 long beeps');
			assert.strictEqual(beeps_sequence.length, 4, 'There was 4 beeps in beeps sequence');
		});
	});

	describe('#pause and #resume', function() {
		it('does not dispatch events when paused', function() {
			bus.pause();

			bus.dispatch(short_loud_beep);
			bus.dispatch(long_quiet_beep);
			assert.strictEqual(beeps_number, 4, 'There was 4 beeps');
			assert.strictEqual(beeps_type_numbers['short'], 2, 'There was 2 short beeps');
			assert.strictEqual(beeps_type_numbers['long'], 2, 'There was 2 long beeps');
			assert.strictEqual(beeps_sequence.length, 4, 'There was 4 beeps in beeps sequence');

			bus.resume();

			assert.strictEqual(beeps_number, 6, 'There was 6 beeps');
			assert.strictEqual(beeps_type_numbers['short'], 3, 'There was 3 short beeps');
			assert.strictEqual(beeps_type_numbers['long'], 3, 'There was 3 long beeps');
			assert.strictEqual(beeps_sequence.length, 6, 'There was 6 beeps in beeps sequence');
		});
	});
});
