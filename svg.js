import './extension.js';

/**
 * Append attributes to an element using
 * @param {SVGElement} object - The element to enhance
 * @param {object} properties - The properties to append
 * @returns {SVGElement} The enhanced element
 */
function append_xhtml_properties(object, properties) {
	if(object && properties) {
		for(const property in properties) {
			object.setAttribute(property, properties[property]);
		}
	}
	return object;
}

/**
 * Append attributes to an element using with null namespace
 * @param {SVGElement} object - The element to enhance
 * @param {object} properties - The properties to append
 * @returns {SVGElement} The enhanced element
 */
function append_properties(object, properties) {
	if(object && properties) {
		for(const property in properties) {
			object.setAttributeNS(null, property, properties[property]);
		}
	}
	return object;
}

/**
 * Round a coordinate to the nearest half integer to avoid anti-aliasing
 * @param {number} coordinate - The coordinate to round
 * @returns {number} The rounded coordinate
 */
function round_coordinate(coordinate) {
	return Math.round(coordinate - 0.5) + 0.5;
	//return coordinate;
}

/**
 * Round a dimension to the nearest integer to avoid anti-aliasing
 * @param {number} dimension - The dimension to round
 * @returns {number} The rounded dimension
 */
function round_dimension(dimension) {
	return Math.round(dimension);
	//return dimension;
}

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

export const SVG = {
	/**
	 * Create an SVG element
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGElement} The created SVG element
	 */
	Create: function(properties) {
		const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
		append_xhtml_properties(svg, {
			'version': '1.2',
			'xmlns': SVG_NAMESPACE,
			'xmlns:xhtml': XHTML_NAMESPACE
		});
		return append_xhtml_properties(svg, properties);
	},

	/**
	 * Create an element with the specified tag
	 * @param {string} tag - The SVG tag name
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGElement} The created element
	 */
	Element: function(tag, properties) {
		return append_properties(document.createElementNS(SVG_NAMESPACE, tag), properties);
	},

	/**
	 * Create an SVG group element
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGElement} The created group element
	 */
	Group: function(properties) {
		return SVG.Element('g', properties);
	},

	/**
	 * Create an SVG rectangle element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGRectElement} The created rectangle element
	 */
	Rectangle: function(x, y, width, height, properties) {
		return /**@type {SVGRectElement}*/ (append_properties(SVG.Element('rect', {
			x: round_coordinate(x),
			y: round_coordinate(y),
			width: round_dimension(width),
			height: round_dimension(height)
		}), properties));
	},

	/**
	 * Create a centered SVG rectangle element
	 * @param {number} x - The x coordinate of center
	 * @param {number} y - The y coordinate of center
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGRectElement} The created rectangle element
	 */
	RectangleCentered: function(x, y, width, height, properties) {
		return /**@type {SVGRectElement}*/ (SVG.Rectangle(x - width / 2, y - height / 2, width, height, properties));
	},

	/**
	 * Create a horizontally centered SVG rectangle element
	 * @param {number} x - The x coordinate of center
	 * @param {number} y - The y coordinate
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGRectElement} The created rectangle element
	 */
	RectangleCenteredHorizontally: function(x, y, width, height, properties) {
		return /**@type {SVGRectElement}*/ (SVG.Rectangle(x - width / 2, y, width, height, properties));
	},

	/**
	 * Create a vertically centered SVG rectangle element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate of center
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGRectElement} The created rectangle element
	 */
	RectangleCenteredVertically: function(x, y, width, height, properties) {
		return /**@type {SVGRectElement}*/ (SVG.Rectangle(x, y - height / 2, width, height, properties));
	},

	/**
	 * Create an SVG circle element
	 * @param {number} cx - The x coordinate of center
	 * @param {number} cy - The y coordinate of center
	 * @param {number} r - The radius
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGCircleElement} The created circle element
	 */
	Circle: function(cx, cy, r, properties) {
		return /**@type {SVGCircleElement}*/ (append_properties(SVG.Element('circle', {
			cx: round_coordinate(cx),
			cy: round_coordinate(cy),
			r: round_dimension(r)
		}), properties));
	},

	/**
	 * Create an SVG line element
	 * @param {number} x1 - The x coordinate of start point
	 * @param {number} y1 - The y coordinate of start point
	 * @param {number} x2 - The x coordinate of end point
	 * @param {number} y2 - The y coordinate of end point
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGLineElement} The created line element
	 */
	Line: function(x1, y1, x2, y2, properties) {
		return /**@type {SVGLineElement}*/ (append_properties(SVG.Element('line', {
			x1: round_coordinate(x1),
			y1: round_coordinate(y1),
			x2: round_coordinate(x2),
			y2: round_coordinate(y2)
		}), properties));
	},

	/**
	 * Create an SVG polyline element
	 * @param {number[]} points - Array of coordinate numbers
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGPolylineElement} The created polyline element
	 */
	Polyline: function(points, properties) {
		return /**@type {SVGPolylineElement}*/ (append_properties(SVG.Element('polyline', {
			points: points.map(round_coordinate).join(' ')
		}), properties));
	},

	/**
	 * Create an SVG text element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate
	 * @param {string} content - The text content
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGTextElement} The created text element
	 */
	Text: function(x, y, content, properties) {
		const text = /**@type {SVGTextElement}*/ (append_properties(SVG.Element('text', {
			x: round_coordinate(x),
			y: round_coordinate(y)
		}), properties));
		text.appendChild(document.createTextNode(content));
		return text;
	},

	/**
	 * Create an SVG image element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {string} href - The image URL
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGImageElement} The created image element
	 */
	Image: function(x, y, width, height, href, properties) {
		return /**@type {SVGImageElement}*/ (append_properties(SVG.Element('image', {
			x: round_coordinate(x),
			y: round_coordinate(y),
			width: round_dimension(width),
			height: round_dimension(height),
			href: href
		}), properties));
	},

	/**
	 * Create a centered SVG image element
	 * @param {number} x - The x coordinate of center
	 * @param {number} y - The y coordinate of center
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {string} href - The image URL
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGImageElement} The created image element
	 */
	ImageCentered: function(x, y, width, height, href, properties) {
		return /**@type {SVGImageElement}*/ (SVG.Image(x - width / 2, y - height / 2, width, height, href, properties));
	},

	/**
	 * Create a horizontally centered SVG image element
	 * @param {number} x - The x coordinate of center
	 * @param {number} y - The y coordinate
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {string} href - The image URL
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGImageElement} The created image element
	 */
	ImageCenteredHorizontally: function(x, y, width, height, href, properties) {
		return /**@type {SVGImageElement}*/ (SVG.Image(x - width / 2, y, width, height, href, properties));
	},

	/**
	 * Create a vertically centered SVG image element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate of center
	 * @param {number} width - The width dimension
	 * @param {number} height - The height dimension
	 * @param {string} href - The image URL
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGImageElement} The created image element
	 */
	ImageCenteredVertically: function(x, y, width, height, href, properties) {
		return /**@type {SVGImageElement}*/ (SVG.Image(x, y - height / 2, width, height, href, properties));
	},

	/**
	 * Create an SVG title element
	 * @param {string} content - The title text content
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGTitleElement} The created title element
	 */
	Title: function(content, properties) {
		const title = /**@type {SVGTitleElement}*/ (SVG.Element('title', properties));
		title.appendChild(document.createTextNode(content));
		return title;
	},

	/**
	 * Create an SVG link element
	 * @param {string} href - The link URL
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGAElement} The created link element
	 */
	Link: function(href, properties) {
		return /**@type {SVGAElement}*/ (append_properties(SVG.Element('a', {
			href: href
		}), properties));
	},

	/**
	 * Create an SVG path element
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate
	 * @param {string} path - The path data
	 * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
	 * @returns {SVGPathElement} The created path element
	 */
	Path: function(x, y, path, properties) {
		return /**@type {SVGPathElement}*/ (append_properties(SVG.Element('path', {d: `M${round_coordinate(x)} ${round_coordinate(y)} ${path}`}), properties));
	},

	/**
	 * Wrap text content into multiple lines
	 * @param {SVGTextElement} text - The text element to wrap
	 * @param {number} width - The maximum line width
	 * @returns {void}
	 */
	//work only with left to right and top to bottom languages
	TextWrap: function(text, width) {
		//retrieve all words and clear text
		const words = text.textContent.split(' ');
		text.textContent = '';
		//create first line
		let tspan = /**@type {SVGTextContentElement}*/ (SVG.Element('tspan', {x: text.getAttribute('x'), dy: 0}));
		text.appendChild(tspan);
		//re-add word one after an other
		let word;
		let line = [];
		while(!words.isEmpty()) {
			word = words.shift();
			line.push(word);
			tspan.textContent = line.join(' ');
			//check if text is too long
			//a single word line must necessary fit in one line
			//otherwise, that means that a single word alone cannot fit in specified width and will create a infinite loop
			if(line.length > 1 && tspan.getComputedTextLength() > width) {
				//remove last word and close line
				line.pop();
				tspan.textContent = line.join(' ');
				//start a new line
				tspan = /**@type {SVGTextContentElement}*/ (SVG.Element('tspan', {x: text.getAttribute('x'), dy: 15}));
				text.appendChild(tspan);
				line = [];
				//excluded word must be managed next loop
				words.unshift(word);
			}
		}
	},

	/**
	 * Truncate text with ellipsis
	 * @param {SVGTextElement} text - The text element to truncate
	 * @param {number} width - The maximum text width
	 * @returns {void}
	 */
	//work only with left to right languages
	TextEllipsis: function(text, width) {
		let letters = text.textContent.split('');
		let truncated = false;
		while(text.getComputedTextLength() > width) {
			truncated = true;
			letters = letters.slice(0, letters.length - 1);
			text.textContent = letters.join('');
		}
		if(truncated) {
			letters = letters.slice(0, letters.length - 3);
			text.textContent = `${letters.join('')}...`;
		}
	},

	/**
	 * Center an element within a bounding box
	 * @param {SVGGraphicsElement} element - The element to center
	 * @param {number} x1 - The left boundary
	 * @param {number} x2 - The right boundary
	 * @param {number} y1 - The top boundary
	 * @param {number} y2 - The bottom boundary
	 * @returns {void}
	 */
	Center: function(element, x1, x2, y1, y2) {
		const box = element.getBBox();
		element.setAttribute('x', `${round_coordinate(x1 + (x2 - x1) / 2 - box.width / 2)}`);
		element.setAttribute('y', `${round_coordinate(y1 + (y2 - y1) / 2 + box.height / 2)}`);
	}
};

SVG.Namespaces = {
	SVG: SVG_NAMESPACE,
	XHTML: XHTML_NAMESPACE
};
