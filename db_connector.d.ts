/**
 * IndexedDB connector class for managing database operations
 * @template T - The type of items stored in the database
 */
export declare class DBConnector<T> {
    name: string;
    keypath: string;
    /**@type {IDBDatabase | undefined} */
    database: IDBDatabase | undefined;
    /**
     * Create a DBConnector instance
     * @param {string} name - The name of the database
     * @param {string} keypath - The key path for the object store
     */
    constructor(name: string, keypath: string);
    /**
     * Check if the database is open
     * @returns {this is this & {database: IDBDatabase}} True if the database is open, false otherwise
     */
    isOpen(): this is this & {
        database: IDBDatabase;
    };
    /**
     * Open the database
     * @returns {Promise<IDBDatabase>} Promise resolving to the IDBDatabase instance
     */
    open(): Promise<IDBDatabase>;
    /**
     * Drop the database
     * @returns {Promise<Event>} Promise resolving to the success event
     */
    drop(): Promise<Event>;
    /**
     * Get a cursor for iterating over the database
     * @returns {IDBRequest} The cursor request
     * @throws {Error} If the database is not open
     */
    getCursor(): IDBRequest;
    /**
     * Add an item to the database
     * @param {T} item - The item to add
     * @returns {Promise<Event>} Promise resolving to the success event
     */
    add(item: T): Promise<Event>;
    /**
     * Add multiple items to the database
     * @param {T[]} items - The items to add
     * @returns {Promise<Event[]>} Promise resolving to an array of success events
     */
    addAll(items: T[]): Promise<Event[]>;
    /**
     * Get an item from the database by key
     * @param {string | number} key - The key of the item to retrieve
     * @returns {Promise<T>} Promise resolving to the retrieved item
     */
    get(key: string | number): Promise<T>;
    /**
     * Get all items from the database
     * @returns {Promise<T[]>} Promise resolving to an array of all items
     */
    getAll(): Promise<T[]>;
    /**
     * Get some items from the database matching a filter
     * @param {(item: T) => boolean} [filter] - Optional filter function
     * @returns {Promise<T[]>} Promise resolving to an array of filtered items
     */
    getSome(filter?: (item: T) => boolean): Promise<T[]>;
    /**
     * Remove an item from the database by key
     * @param {string | number} key - The key of the item to remove
     * @returns {Promise<T>} Promise resolving to the removed item
     */
    remove(key: string | number): Promise<T>;
    /**
     * Remove all items from the database
     * @returns {Promise<T[]>} Promise resolving to an array of removed items
     */
    removeAll(): Promise<T[]>;
    /**
     * Remove some items from the database matching a filter
     * @param {(item: T) => boolean} [filter] - Optional filter function
     * @returns {Promise<T[]>} Promise resolving to an array of removed items
     */
    removeSome(filter?: (item: T) => boolean): Promise<T[]>;
}
