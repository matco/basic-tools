/**
 * Generate a random UUID (version 4) string
 * @returns {string} A random UUID string
 */
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export const UUID = {
	Generate: function() {
		return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	}
};
