/**
 * Generates a random 4-character hexadecimal string.
 * @returns {string} A random 4-character hexadecimal string
 */
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

/**
 * UUID utility for generating random UUID-like strings.
 */
export const UUID = {
	/**
	 * Generates a random UUID-like string.
	 * @returns {string} A random UUID-like string in the format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	Generate: function() {
		return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	}
};
