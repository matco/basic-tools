/**
 * Hash utility for encoding and decoding objects to/from URL hash strings.
 */
export declare const Hash: {
    /**
     * Encode an object to a URL hash string
     * @param {object} object - The object to encode
     * @returns {string} The encoded hash string
     */
    Encode: (object: object) => string;
    /**
     * Decode a URL hash string to an object
     * @param {string} hash - The hash string to decode
     * @returns {object} The decoded object
     */
    Decode: (hash: string) => object;
};
