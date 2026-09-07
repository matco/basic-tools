export declare class CSV {
    #private;
    data: string[][];
    regexp: RegExp;
    static INVALID_CHARACTERS: string[];
    static MIME_TYPE: string;
    static DELIMITER_LINE: string;
    static DELIMITER_COLUMN: string;
    static CHARACTER_QUOTER: string;
    /**
     * Create a CSV instance
     * @param {string[][]} data - The CSV data
     */
    constructor(data: string[][]);
    /**
     * Convert the CSV data to a string
     * @returns {string} The CSV string representation
     */
    toString(): string;
    /**
     * Convert the CSV data to a Blob
     * @returns {Blob} The CSV data as a Blob
     */
    toBlob(): Blob;
    /**
     * Download the CSV data
     * @param {string} [name] - The filename for the download (defaults to the current date)
     * @returns {void}
     */
    download(name?: string): void;
    /**
     * Parse a CSV string into a 2D array
     * @param {string} string - The CSV string to parse
     * @returns {string[][]} The parsed CSV data
     */
    static parse(string: string): string[][];
    /**
     * Parse a CSV string into an array of objects (dictionaries)
     * @param {string} string - The CSV string to parse
     * @returns {Record<string, string>[]} The parsed CSV data as an array of objects
     */
    static parseToDictionary(string: string): Record<string, string>[];
}
