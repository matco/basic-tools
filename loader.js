export class Loader {
	/**
	 * Create a Loader instance
	 * @param {Document} [doc] - The document where scripts must be loaded (defaults to global document)
	 * @param {{[key: string]: any}} [parameters] - Optional parameters to bind to the instance
	 */
	constructor(doc, parameters) {
		//DOMDocument: document where scripts must be loaded
		this.document = doc || document;
		//String: base url for scripts
		this.url = undefined;
		//Boolean: add a timestamp after each script to avoid browser cache
		this.nocache = true;
		//bind parameters
		for(const parameter in parameters) {
			this[parameter] = parameters[parameter];
		}
	}

	/**
	 * Build a full URL by combining base URL with the given path
	 * @param {string} url - The URL path to build
	 * @returns {string} The full URL with optional cache-busting timestamp
	 */
	buildUrl(url) {
		let full_url = '';
		if(this.url) {
			full_url += this.url;
		}
		full_url += url;
		//append timestamp at the end of the url to avoid cache if required
		if(this.nocache) {
			full_url += `?${new Date().getTime()}`;
		}
		return full_url;
	}

	/**
	 * Load a JavaScript file dynamically
	 * @param {string} js - The URL of the JavaScript file to load
	 * @param {string} type - The type attribute for the script element (e.g., "text/javascript" or "module")
	 * @returns {Promise<void>}
	 */
	loadJavascript(js, type) {
		const js_url = this.buildUrl(js);
		const that = this;
		return new Promise(function(resolve, reject) {
			//check javascript has not already been included
			if(!that.document.head.querySelector(`script[type="${type}"][src^="${js_url}"]`)) {
				//create script element
				const script = that.document.createElement('script');
				script.setAttribute('type', type);
				script.setAttribute('src', js_url);
				script.addEventListener('load', () => resolve());
				script.addEventListener('error', reject);
				that.document.head.appendChild(script);
			}
			else {
				resolve();
			}
		});
	}

	/**
	 * Load a library (JavaScript file)
	 * @param {string} library - The URL of the library to load
	 * @returns {Promise<void>}
	 */
	loadLibrary(library) {
		return this.loadJavascript(library, 'text/javascript');
	}

	/**
	 * Load a module (JavaScript module file)
	 * @param {string} mod - The URL of the module to load
	 * @returns {Promise<void>}
	 */
	loadModule(mod) {
		return this.loadJavascript(mod, 'module');
	}

	/**
	 * Load multiple libraries sequentially
	 * @param {string[]} libraries - The URLs of the libraries to load
	 * @returns {Promise<void>}
	 */
	loadQueuedLibraries(libraries) {
		return libraries.reduce((a, l) => a.then(this.loadLibrary.bind(this, l)), Promise.resolve());
	}

	/**
	 * Load multiple libraries concurrently
	 * @param {string[]} libraries - The URLs of the libraries to load
	 * @returns {Promise<void[]>} A promise resolved once all libraries are loaded
	 */
	loadConcurrentLibraries(libraries) {
		return Promise.all(libraries.map(l => this.loadLibrary(l)));
	}

	/**
	 * Load a CSS file dynamically
	 * @param {string} css - The URL of the CSS file to load
	 * @returns {Promise<void>}
	 */
	loadCSS(css) {
		const css_url = this.buildUrl(css);
		const that = this;
		return new Promise(function(resolve, reject) {
			//check library has not already been included
			if(!that.document.head.querySelector(`link[type="text/css"][href^="${css_url}"]`)) {
				//create link element
				const link = that.document.createElement('link');
				link.setAttribute('type', 'text/css');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('href', css_url);
				link.addEventListener('load', () => resolve());
				link.addEventListener('error', reject);
				that.document.head.appendChild(link);
			}
			else {
				resolve();
			}
		});
	}

	/**
	 * Load an HTML file dynamically
	 * @param {string} html - The URL of the HTML file to load
	 * @param {Node} container - The container to append the loaded HTML to
	 * @returns {Promise<void>}
	 */
	loadHTML(html, container) {
		const html_url = this.buildUrl(html);
		const that = this;
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener(
				'load',
				function() {
					if(this.status === 200) {
						const node = that.document.importNode(this.response.body.firstElementChild, true);
						container.appendChild(node);
						resolve(node);
					}
					else {
						reject();
					}
				}
			);
			xhr.responseType = 'document';
			xhr.open('GET', html_url, true);
			xhr.send();
		});
	}

	/**
	 * Load an HTML template dynamically
	 * When loading a template, the template node is put in the "head" element.
	 * @param {string} html - The URL of the HTML template to load
	 * @param {Node} container - The container to append the template to
	 * @returns {Promise<void>}
	 */
	loadHTMLTemplate(html, container) {
		const html_url = this.buildUrl(html);
		const that = this;
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener(
				'load',
				function() {
					if(this.status === 200) {
						const node = that.document.importNode(this.response.head.firstElementChild, true);
						container.appendChild(node);
						resolve();
					}
					else {
						reject();
					}
				}
			);
			xhr.responseType = 'document';
			xhr.open('GET', html_url, true);
			xhr.send();
		});
	}
}
