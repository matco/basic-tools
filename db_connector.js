/**
 * IndexedDB connector class for managing database operations
 * @template T - The type of items stored in the database
 */
export class DBConnector {
	/**
	 * Create a DBConnector instance
	 * @param {string} name - The name of the database
	 * @param {string} keypath - The key path for the object store
	 */
	constructor(name, keypath) {
		this.name = name;
		this.keypath = keypath;
		/**@type {IDBDatabase | undefined} */
		this.database = undefined;
	}

	/**
	 * Check if the database is open
	 * @returns {this is this & {database: IDBDatabase}} True if the database is open, false otherwise
	 */
	isOpen() {
		return !!this.database;
	}

	/**
	 * Open the database
	 * @returns {Promise<IDBDatabase>} Promise resolving to the IDBDatabase instance
	 */
	open() {
		return new Promise((resolve, reject) => {
			const version = 1;
			const request = indexedDB.open(this.name, version);
			request.addEventListener('upgradeneeded', () => {
				const db = request.result;
				//delete old store
				if(db.objectStoreNames.contains(this.name)) {
					db.deleteObjectStore(this.name);
				}
				//create new store
				db.createObjectStore(this.name, {keyPath: this.keypath});
			});
			//onsuccess is called after onupgradeneeded
			request.addEventListener('success', () => {
				//store handle to database
				this.database = request.result;
				//add error handler directly to the db to catch all errors
				this.database.addEventListener('error', () => {
					reject(`Uncaught general error with database ${this.name}`);
				});
				this.database.addEventListener('abort', () => {
					reject(`Uncaught abort error with database ${this.name}`);
				});
				resolve(this.database);
			});
			request.addEventListener('error', () => {
				//user did not allow to use IndexedDB
				reject('Use of IndexedDB not allowed');
			});
		});
	}

	/**
	 * Drop the database
	 * @returns {Promise<Event>} Promise resolving to the success event
	 */
	drop() {
		return new Promise((resolve, reject) => {
			if(this.isOpen()) {
				this.database.close();
			}
			const request = indexedDB.deleteDatabase(this.name);
			request.addEventListener('error', () => {
				reject(`Error while deleting database ${this.name}`);
			});
			request.addEventListener('success', resolve);
		});
	}

	/**
	 * Get a cursor for iterating over the database
	 * @returns {IDBRequest} The cursor request
	 * @throws {Error} If the database is not open
	 */
	getCursor() {
		if(!this.isOpen()) {
			throw new Error('The database must be open before a transaction can occur');
		}
		//start transaction
		const transaction = this.database.transaction([this.name], 'readwrite');
		//retrieve store
		const store = transaction.objectStore(this.name);
		//do request
		return store.openCursor();
	}

	/**
	 * Add an item to the database
	 * @param {T} item - The item to add
	 * @returns {Promise<Event>} Promise resolving to the success event
	 */
	add(item) {
		return new Promise((resolve, reject) => {
			if(!this.isOpen()) {
				reject('The database must be open before a transaction can occur');
				return;
			}
			//start transaction
			const transaction = this.database.transaction([this.name], 'readwrite');
			transaction.addEventListener('error', () => {
				reject(`Error with transaction while adding item ${item[this.keypath]} in database ${this.name}: ${transaction.error}`);
			});
			transaction.addEventListener('abort', () => {
				reject(`Transaction aborted while adding item ${item[this.keypath]} in database ${this.name}: ${transaction.error}`);
			});
			//retrieve store
			const store = transaction.objectStore(this.name);
			//do request
			const request = store.put(item);
			request.addEventListener('error', () => {
				reject(`Error with request while adding item ${item[this.keypath]} in database ${this.name}: ${transaction.error}`);
			});
			request.addEventListener('success', resolve);
		});
	}

	/**
	 * Add multiple items to the database
	 * @param {T[]} items - The items to add
	 * @returns {Promise<Event[]>} Promise resolving to an array of success events
	 */
	addAll(items) {
		return Promise.all(items.map(item => this.add(item)));
	}

	/**
	 * Get an item from the database by key
	 * @param {string | number} key - The key of the item to retrieve
	 * @returns {Promise<T>} Promise resolving to the retrieved item
	 */
	get(key) {
		return new Promise((resolve, reject) => {
			if(!this.isOpen()) {
				reject('The database must be open before a transaction can occur');
				return;
			}
			//start transaction
			const transaction = this.database.transaction([this.name]);
			transaction.addEventListener('error', () => {
				reject(`Error with transaction while retrieving item ${key} in database ${this.name}: ${transaction.error}`);
			});
			transaction.addEventListener('abort', () => {
				reject(`Transaction aborted while retrieving item ${key} in database ${this.name}: ${transaction.error}`);
			});
			//retrieve store
			const store = transaction.objectStore(this.name);
			//do request
			const request = store.get(key);
			request.addEventListener('error', () => {
				reject(`Error with request while retrieving item ${key} in database ${this.name}: ${transaction.error}`);
			});
			request.addEventListener('success', () => {
				resolve(request.result);
			});
		});
	}

	/**
	 * Get all items from the database
	 * @returns {Promise<T[]>} Promise resolving to an array of all items
	 */
	getAll() {
		return new Promise((resolve, reject) => {
			if(!this.isOpen()) {
				reject('The database must be open before a transaction can occur');
				return;
			}
			//start transaction
			const transaction = this.database.transaction([this.name]);
			transaction.addEventListener('error', () => {
				reject(`Error with transaction while retrieving all items from database ${this.name}: ${transaction.error}`);
			});
			transaction.addEventListener('abort', () => {
				reject(`Transaction aborted while retrieving all items from database ${this.name}: ${transaction.error}`);
			});
			//retrieve store
			const store = transaction.objectStore(this.name);
			//do request
			const request = store.getAll();
			request.addEventListener('error', () => {
				reject(`Error with request while retrieving all items from database ${this.name}: ${transaction.error}`);
			});
			request.addEventListener('success', () => {
				resolve(request.result);
			});
		});
	}

	/**
	 * Get some items from the database matching a filter
	 * @param {(item: T) => boolean} [filter] - Optional filter function
	 * @returns {Promise<T[]>} Promise resolving to an array of filtered items
	 */
	getSome(filter) {
		return this.getAll().then(results => {
			//apply filter on results if needed
			return filter ? results.filter(filter) : results;
		});
	}

	/**
	 * Remove an item from the database by key
	 * @param {string | number} key - The key of the item to remove
	 * @returns {Promise<T>} Promise resolving to the removed item
	 */
	remove(key) {
		return new Promise((resolve, reject) => {
			if(!this.isOpen()) {
				reject('The database must be open before a transaction can occur');
				return;
			}
			//start transaction
			const transaction = this.database.transaction([this.name], 'readwrite');
			transaction.addEventListener('error', () => {
				reject(`Error with transaction while removing item ${key} in database ${this.name}: ${transaction.error}`);
			});
			transaction.addEventListener('abort', () => {
				reject(`Transaction aborted while removing item ${key} in database ${this.name}: ${transaction.error}`);
			});
			//retrieve store
			const store = transaction.objectStore(this.name);
			//do request
			const request = store.delete(key);
			request.addEventListener('error', () => {
				reject(`Error with request while removing item ${key} in database ${this.name}: ${transaction.error}`);
			});
			request.addEventListener('success', () => {
				resolve(/**@type {T}*/ (request.result));
			});
		});
	}

	/**
	 * Remove all items from the database
	 * @returns {Promise<T[]>} Promise resolving to an array of removed items
	 */
	removeAll() {
		return this.removeSome();
	}

	/**
	 * Remove some items from the database matching a filter
	 * @param {(item: T) => boolean} [filter] - Optional filter function
	 * @returns {Promise<T[]>} Promise resolving to an array of removed items
	 */
	removeSome(filter) {
		return this.getSome(filter).then(items => Promise.all(items.map(item => this.remove(item[this.keypath]))));
	}
}
