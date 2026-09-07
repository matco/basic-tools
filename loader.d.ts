export declare class Loader {
    document: Document;
    url: any;
    nocache: boolean;
    /**
     * Create a Loader instance
     * @param {Document} [doc] - The document where scripts must be loaded (defaults to global document)
     * @param {{[key: string]: any}} [parameters] - Optional parameters to bind to the instance
     */
    constructor(doc?: Document, parameters?: {
        [key: string]: any;
    });
    /**
     * Build a full URL by combining base URL with the given path
     * @param {string} url - The URL path to build
     * @returns {string} The full URL with optional cache-busting timestamp
     */
    buildUrl(url: string): string;
    /**
     * Load a JavaScript file dynamically
     * @param {string} js - The URL of the JavaScript file to load
     * @param {string} type - The type attribute for the script element (e.g., "text/javascript" or "module")
     * @returns {Promise<void>}
     */
    loadJavascript(js: string, type: string): Promise<void>;
    /**
     * Load a library (JavaScript file)
     * @param {string} library - The URL of the library to load
     * @returns {Promise<void>}
     */
    loadLibrary(library: string): Promise<void>;
    /**
     * Load a module (JavaScript module file)
     * @param {string} mod - The URL of the module to load
     * @returns {Promise<void>}
     */
    loadModule(mod: string): Promise<void>;
    /**
     * Load multiple libraries sequentially
     * @param {string[]} libraries - The URLs of the libraries to load
     * @returns {Promise<void>}
     */
    loadQueuedLibraries(libraries: string[]): Promise<void>;
    /**
     * Load multiple libraries concurrently
     * @param {string[]} libraries - The URLs of the libraries to load
     * @returns {Promise<void[]>} A promise resolved once all libraries are loaded
     */
    loadConcurrentLibraries(libraries: string[]): Promise<void[]>;
    /**
     * Load a CSS file dynamically
     * @param {string} css - The URL of the CSS file to load
     * @returns {Promise<void>}
     */
    loadCSS(css: string): Promise<void>;
    /**
     * Load an HTML file dynamically
     * @param {string} html - The URL of the HTML file to load
     * @param {Node} container - The container to append the loaded HTML to
     * @returns {Promise<void>}
     */
    loadHTML(html: string, container: Node): Promise<void>;
    /**
     * Load an HTML template dynamically
     * When loading a template, the template node is put in the "head" element.
     * @param {string} html - The URL of the HTML template to load
     * @param {Node} container - The container to append the template to
     * @returns {Promise<void>}
     */
    loadHTMLTemplate(html: string, container: Node): Promise<void>;
}
