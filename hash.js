/**
 * Hash utility for encoding and decoding objects to/from URL hash strings.
 */
export const Hash = {
	/**
	 * Encode an object to a URL hash string
	 * @param {object} object - The object to encode
	 * @returns {string} The encoded hash string
	 */
	Encode: function(object) {
		return `#${Object.entries(object).map(e => `${e[0]}=${e[1]}`).join('&')}`;
	},

	/**
	 * Decode a URL hash string to an object
	 * @param {string} hash - The hash string to decode
	 * @returns {object} The decoded object
	 */
	Decode: function(hash) {
		//remove front dash and transform hash to an object
		return Object.fromEntries(hash.substring(1).split('&').map(p => p.split('=')));
	}
};
