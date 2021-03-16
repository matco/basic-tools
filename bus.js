import './extension.js';

const awaiting_events = [];

class Bus {
	constructor() {
		this.enabled = true;
		this.paused = false;
		this.locked = false;
		this.listeners = [];
		this.onEvent = undefined;
	}
	disable() {
		this.enabled = false;
	}
	enable() {
		this.enabled = true;
	}
	lock() {
		this.locked = true;
	}
	unlock() {
		this.locked = false;
	}
	reset() {
		this.listeners = [];
	}
	register(listener) {
		if(!this.locked) {
			this.listeners.push(listener);
		}
	}
	unregister(listener) {
		if(!this.locked) {
			this.listeners.removeElement(listener);
		}
	}
	isRegistered(listener) {
		return this.listeners.includes(listener);
	}
	pause() {
		this.paused = true;
	}
	resume() {
		this.paused = false;
		awaiting_events.forEach(Bus.prototype.dispatch, this);
		awaiting_events.length = 0;
	}
	dispatch(event) {
		if(this.enabled) {
			if(!this.paused) {
				this.listeners.forEach(event.hit, event);
			}
			else {
				awaiting_events.push(event);
			}
			this.onEvent?.call(undefined, event);
		}
	}
}

class BusEvent {
	constructor() {
	}
	//get list of callback method names for the event
	/**
	 * @returns {string[]} - A list of method names that will be called on the listener
	 * @abstract
	 */
	getCallbacks() {
		throw new Error(`getCallbacks() is not implemented for ${this.constructor.name}`);
	}
	hit(listener) {
		this.getCallbacks().forEach(c => listener[c]?.call(listener, this));
	}
}

export {Bus, BusEvent};
