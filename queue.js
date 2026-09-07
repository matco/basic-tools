import './extension.js';

/**
 * A queue for executing promises sequentially.
 */
export class Queue {
	/**
	 * Create a new queue
	 * @param {(result: any) => any} [result_callback] - Optional callback invoked with each promise result
	 */
	constructor(result_callback) {
		/**@type {(() => Promise<any>)[]} */
		this.promises = [];
		this.resultCallback = result_callback;
		/**@type {() => any} */
		this.endCallback;
		/**@type {(exception: any) => any} */
		this.exceptionCallback;
		/**@type {(() => Promise<any>) | undefined} */
		this.running;
	}

	/**
	 * Runs the next promise in the queue.
	 * @returns {void}
	 */
	run() {
		if(!this.running) {
			if(this.promises.isEmpty()) {
				if(this.endCallback) {
					this.endCallback();
				}
			}
			else {
				const promiser = this.promises.shift();
				if(promiser) {
					this.running = promiser;
					promiser()
						.then(result => {
							if(this.resultCallback) {
								this.resultCallback(result);
							}
							this.running = undefined;
							this.run();
						})
						.catch(exception => {
							if(this.exceptionCallback) {
								this.exceptionCallback(exception);
							}
							//clear the running promise and continue with the rest of the queue so a rejection does not stall it
							this.running = undefined;
							this.run();
						});
				}
			}
		}
	}

	/**
	 * Adds a promise to the queue.
	 * @param {() => Promise<any>} promiser - A function that returns a promise
	 * @returns {Queue} This queue instance for chaining
	 */
	add(promiser) {
		this.promises.push(promiser);
		this.run();
		return this;
	}

	/**
	 * Add multiple promises to the queue
	 * @param {(() => Promise<any>)[]} promisers - An array of functions that return promises
	 * @returns {Queue} This queue instance for chaining
	 */
	addAll(promisers) {
		this.promises.pushAll(promisers);
		this.run();
		return this;
	}

	/**
	 * Clears all promises from the queue.
	 * @returns {Queue} This queue instance for chaining
	 */
	clear() {
		this.promises = [];
		return this;
	}

	/**
	 * Set a callback to be invoked when all promises have completed
	 * @param {() => any} callback - The callback to invoke on completion
	 * @returns {Queue} This queue instance for chaining
	 */
	then(callback) {
		this.endCallback = callback;
		return this;
	}

	/**
	 * Set a callback to be invoked when a promise rejects
	 * @param {(exception: any) => any} callback - The callback to invoke on error
	 * @returns {Queue} This queue instance for chaining
	 */
	catch(callback) {
		this.exceptionCallback = callback;
		return this;
	}
}
