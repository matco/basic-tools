/**
 * LZW compression and decompression utility.
 */
export declare const LZW: {
    INITIAL_DICT_SIZE: number;
    MAX_DICT_SIZE: number;
    /**
     * Compresses a string using LZW algorithm.
     * @param {string} string - The string to compress
     * @param {number} [dictionary_max_size] - Optional maximum dictionary size
     * @returns {number[]} Array of compressed codes
     */
    Compress: (string: string, dictionary_max_size?: number) => number[];
    /**
     * Compresses a string to a character string.
     * @param {string} string - The string to compress
     * @returns {string} The compressed string
     */
    CompressToString: (string: string) => string;
    /**
     * Decompresses an array of codes using LZW algorithm.
     * @param {number[]} integers - Array of codes to decompress
     * @param {number} [dictionary_max_size] - Optional maximum dictionary size
     * @returns {string} The decompressed string
     */
    Decompress: (integers: number[], dictionary_max_size?: number) => string;
    /**
     * Decompresses a string using LZW algorithm.
     * @param {string} string - The string to decompress
     * @returns {string} The decompressed string
     */
    DecompressString: (string: string) => string;
};
