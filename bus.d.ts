import './extension.js';
/**
 * Event bus for dispatching events to registered listeners.
 */
declare class Bus {
    dispatching: boolean;
    enabled: boolean;
    paused: boolean;
    locked: boolean;
    /**@type {object[]} */
    listeners: object[];
    onEvent: any;
    awaitingEvents: any[];
    consequenceEvents: any[];
    /**
     * Creates a new Bus instance.
     */
    constructor();
    /**
     * Disables event dispatching.
     * @returns {void}
     */
    disable(): void;
    /**
     * Enables event dispatching.
     * @returns {void}
     */
    enable(): void;
    /**
     * Locks listener registration/unregistration.
     * @returns {void}
     */
    lock(): void;
    /**
     * Unlocks listener registration/unregistration.
     * @returns {void}
     */
    unlock(): void;
    /**
     * Clears all registered listeners.
     * @returns {void}
     */
    reset(): void;
    /**
     * Registers a listener.
     * @param {object} listener - The listener to register
     * @returns {void}
     */
    register(listener: object): void;
    /**
     * Unregisters a listener.
     * @param {object} listener - The listener to unregister
     * @returns {void}
     */
    unregister(listener: object): void;
    /**
     * Checks if a listener is registered.
     * @param {object} listener - The listener to check
     * @returns {boolean} True if the listener is registered
     */
    isRegistered(listener: object): boolean;
    /**
     * Pauses event dispatching.
     * @returns {void}
     */
    pause(): void;
    /**
     * Resumes event dispatching.
     * @returns {void}
     */
    resume(): void;
    /**
     * Dispatches an event to all registered listeners.
     * @param {BusEvent} event - The event to dispatch
     * @returns {void}
     */
    dispatch(event: BusEvent): void;
}
/**
 * Base class for bus events.
 */
declare class BusEvent {
    /**
     * Creates a new BusEvent instance.
     */
    constructor();
    /**
     * Get list of callback method names for the event
     * @abstract
     * @returns {string[]} A list of method names that will be called on the listener
     */
    getCallbacks(): string[];
    /**
     * Invokes all callbacks on a listener.
     * @param {object} listener - The listener to invoke callbacks on
     * @returns {void}
     */
    hit(listener: object): void;
}
export { Bus, BusEvent };
