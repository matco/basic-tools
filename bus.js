import './extension.js';

/**
 * Event bus for dispatching events to registered listeners.
 */
class Bus {
	/**
	 * Creates a new Bus instance.
	 */
	constructor() {
		this.dispatching = false;
		this.enabled = true;
		this.paused = false;
		this.locked = false;
		/**@type {object[]} */
		this.listeners = [];
		this.onEvent = undefined;

		this.awaitingEvents = [];
		this.consequenceEvents = [];
	}

	/**
	 * Disables event dispatching.
	 * @returns {void}
	 */
	disable() {
		this.enabled = false;
	}

	/**
	 * Enables event dispatching.
	 * @returns {void}
	 */
	enable() {
		this.enabled = true;
	}

	/**
	 * Locks listener registration/unregistration.
	 * @returns {void}
	 */
	lock() {
		this.locked = true;
	}

	/**
	 * Unlocks listener registration/unregistration.
	 * @returns {void}
	 */
	unlock() {
		this.locked = false;
	}

	/**
	 * Clears all registered listeners.
	 * @returns {void}
	 */
	reset() {
		this.listeners = [];
	}

	/**
	 * Registers a listener.
	 * @param {object} listener - The listener to register
	 * @returns {void}
	 */
	register(listener) {
		if(!this.locked) {
			this.listeners.push(listener);
		}
	}

	/**
	 * Unregisters a listener.
	 * @param {object} listener - The listener to unregister
	 * @returns {void}
	 */
	unregister(listener) {
		if(!this.locked) {
			this.listeners.removeElement(listener);
		}
	}

	/**
	 * Checks if a listener is registered.
	 * @param {object} listener - The listener to check
	 * @returns {boolean} True if the listener is registered
	 */
	isRegistered(listener) {
		return this.listeners.includes(listener);
	}

	/**
	 * Pauses event dispatching.
	 * @returns {void}
	 */
	pause() {
		this.paused = true;
	}

	/**
	 * Resumes event dispatching.
	 * @returns {void}
	 */
	resume() {
		this.paused = false;
		this.awaitingEvents.forEach(Bus.prototype.dispatch, this);
		this.awaitingEvents.length = 0;
	}

	/**
	 * Dispatches an event to all registered listeners.
	 * @param {BusEvent} event - The event to dispatch
	 * @returns {void}
	 */
	dispatch(event) {
		//dispatch events like a wave instead of a tree
		//an event is first dispatched to all the listeners, then the consequences are dispatched
		if(!this.dispatching) {
			this.dispatching = true;
			//dispatch incoming event
			if(this.enabled) {
				if(!this.paused) {
					this.listeners.forEach(event.hit, event);
					this.onEvent?.call(undefined, event);
				}
				else {
					this.awaitingEvents.push(event);
				}
			}
			//consume consequences events
			this.dispatching = false;
			//more consequences events may pile up while the current one are being consumed
			while(this.consequenceEvents.length > 0) {
				this.dispatch(this.consequenceEvents.shift());
			}
		}
		else {
			this.consequenceEvents.push(event);
		}
	}
}

/**
 * Base class for bus events.
 */
class BusEvent {
	/**
	 * Creates a new BusEvent instance.
	 */
	constructor() {
	}

	/**
	 * Get list of callback method names for the event
	 * @abstract
	 * @returns {string[]} A list of method names that will be called on the listener
	 */
	getCallbacks() {
		throw new Error(`getCallbacks() is not implemented for ${this.constructor.name}`);
	}

	/**
	 * Invokes all callbacks on a listener.
	 * @param {object} listener - The listener to invoke callbacks on
	 * @returns {void}
	 */
	hit(listener) {
		this.getCallbacks().forEach(c => listener[c]?.call(listener, this));
	}
}

export {Bus, BusEvent};
