import './extension.js';
/**
 * A queue for executing promises sequentially.
 */
export declare class Queue {
    /**@type {(() => Promise<any>)[]} */
    promises: (() => Promise<any>)[];
    resultCallback: ((result: any) => any) | undefined;
    running: (() => Promise<any>) | undefined;
    endCallback: (() => any) | undefined;
    exceptionCallback: ((exception: any) => any) | undefined;
    /**
     * Create a new queue
     * @param {(result: any) => any} [result_callback] - Optional callback invoked with each promise result
     */
    constructor(result_callback?: (result: any) => any);
    /**
     * Runs the next promise in the queue.
     * @returns {void}
     */
    run(): void;
    /**
     * Adds a promise to the queue.
     * @param {() => Promise<any>} promiser - A function that returns a promise
     * @returns {Queue} This queue instance for chaining
     */
    add(promiser: () => Promise<any>): Queue;
    /**
     * Add multiple promises to the queue
     * @param {(() => Promise<any>)[]} promisers - An array of functions that return promises
     * @returns {Queue} This queue instance for chaining
     */
    addAll(promisers: (() => Promise<any>)[]): Queue;
    /**
     * Clears all promises from the queue.
     * @returns {Queue} This queue instance for chaining
     */
    clear(): Queue;
    /**
     * Set a callback to be invoked when all promises have completed
     * @param {() => any} callback - The callback to invoke on completion
     * @returns {Queue} This queue instance for chaining
     */
    then(callback: () => any): Queue;
    /**
     * Set a callback to be invoked when a promise rejects
     * @param {(exception: any) => any} callback - The callback to invoke on error
     * @returns {Queue} This queue instance for chaining
     */
    catch(callback: (exception: any) => any): Queue;
}
