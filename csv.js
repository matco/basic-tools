export class CSV {
	static INVALID_CHARACTERS = ['\r'];

	static MIME_TYPE = 'text/csv';

	static DELIMITER_LINE = '\n';

	static DELIMITER_COLUMN = ',';

	static CHARACTER_QUOTER = '"';

	/**
	 * Create a CSV instance
	 * @param {string[][]} data - The CSV data
	 */
	constructor(data) {
		this.data = data;
		this.regexp = new RegExp(CSV.CHARACTER_QUOTER, 'g');
	}

	/**
	 * Generate a line of the CSV file from an array of cells
	 * @param {string[]} line - The array of cells
	 * @returns {string} The generated CSV line
	 */
	#generateLine(line) {
		return line
			.map(c => c || '')
			.map(c => c.replace(this.regexp, `${CSV.CHARACTER_QUOTER}${CSV.CHARACTER_QUOTER}`))
			.map(c => `${CSV.CHARACTER_QUOTER}${c}${CSV.CHARACTER_QUOTER}`)
			.join(CSV.DELIMITER_COLUMN);
	}

	/**
	 * Convert the CSV data to a string
	 * @returns {string} The CSV string representation
	 */
	toString() {
		return this.data.map(l => this.#generateLine(l)).join(CSV.DELIMITER_LINE);
	}

	/**
	 * Convert the CSV data to a Blob
	 * @returns {Blob} The CSV data as a Blob
	 */
	toBlob() {
		return new Blob([this.toString()], {type: CSV.MIME_TYPE});
	}

	/**
	 * Download the CSV data
	 * @param {string} [name] - The filename for the download (defaults to the current date)
	 * @returns {void}
	 */
	download(name) {
		const filename = name || new Date().toFullDisplay();
		const blob = this.toBlob();
		const file = new File([blob], filename, {type: CSV.MIME_TYPE, lastModified: Date.now()});
		const url = URL.createObjectURL(file);
		//Chrome does not support to set location href
		if(/Chrome/.test(navigator.userAgent)) {
			const link = document.createFullElement('a', {href: url, download: filename});
			//add link in the current document to be able to test the download
			//if the link is not included in the document, there is no way to detect if it has been "used" (created and programmatically clicked) in tests
			document.body.appendChild(link); //this line is only for tests to be able to detect the click on the link
			const event = new MouseEvent('click', {bubbles: true, cancelable: true});
			link.dispatchEvent(event);
			//remove link because it is useless
			link.remove();
		}
		else {
			location.href = url;
		}
		//revoke url after event has been dispatched
		setTimeout(() => URL.revokeObjectURL(url), 0);
	}

	/**
	 * Parse a CSV string into a 2D array
	 * @param {string} string - The CSV string to parse
	 * @returns {string[][]} The parsed CSV data
	 */
	static parse(string) {
		const lines = [];
		let columns = [];
		let column = '';
		//store if this is the beginning of a column
		let beginning = true;
		//store if the parser is currently reading the text of a column (in this mode, column and line delimiters are not considered)
		let reading_text = false;
		//store if the previous character was a quote to be able to detect double quotes that are used to quote text in a column
		let quote_before = false;
		for(let i = 0; i < string.length; i++) {
			const character = string[i];
			//manage quotes
			if(character === CSV.CHARACTER_QUOTER) {
				if(quote_before) {
					column += CSV.CHARACTER_QUOTER;
					quote_before = false;
					reading_text = true;
				}
				else {
					quote_before = true;
					reading_text = beginning;
				}
				continue;
			}
			quote_before = false;
			beginning = false;
			//manage column and line delimiters only if not reading text
			if(!reading_text) {
				if(character === CSV.DELIMITER_COLUMN || character === CSV.DELIMITER_LINE) {
					//end current column
					columns.push(column);
					column = '';
					beginning = true;
					if(character === CSV.DELIMITER_LINE) {
						//end current line
						lines.push(columns);
						columns = [];
					}
					continue;
				}
				//do not accept some characters outside quotes
				if(CSV.INVALID_CHARACTERS.includes(character)) {
					continue;
				}
			}
			column += character;
		}
		//file may end without any delimiter
		if(column || columns.length > 0) {
			columns.push(column);
			lines.push(columns);
		}
		return lines;
	}

	/**
	 * Parse a CSV string into an array of objects (dictionaries)
	 * @param {string} string - The CSV string to parse
	 * @returns {Record<string, string>[]} The parsed CSV data as an array of objects
	 */
	static parseToDictionary(string) {
		const data = CSV.parse(string);
		//remove header line
		const header = data.shift();
		if(!header) {
			return [];
		}
		return data.map(line => {
			return Object.fromEntries(header.map((header, index) => [header, line[index]]));
		});
	}
}
