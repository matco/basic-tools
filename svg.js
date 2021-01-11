import './extension.js';

function append_xhtml_properties(object, properties) {
	if(object && properties) {
		for(const property in properties) {
			object.setAttribute(property, properties[property]);
		}
	}
	return object;
}

function append_properties(object, properties) {
	if(object && properties) {
		for(const property in properties) {
			object.setAttributeNS(null, property, properties[property]);
		}
	}
	return object;
}

function round_coordinate(coordinate) {
	return Math.round(coordinate - 0.5) + 0.5;
	//return coordinate;
}

function round_dimension(dimension) {
	return Math.round(dimension);
	//return dimension;
}

export const SVG = {
	Create: function(width, height, properties) {
		const svg = document.createElementNS(SVG.Namespaces.SVG, 'svg');
		append_xhtml_properties(svg, {
			version: '1.2',
			xmlns: SVG.Namespaces.SVG,
			'xmlns:xhtml': SVG.Namespaces.XHTML,
			'xmlns:xlink': SVG.Namespaces.XLINK,
			width: `${width}px`,
			height: `${height}px`
		});
		return append_xhtml_properties(svg, properties);
	},
	Element: function(tag, properties) {
		return append_properties(document.createElementNS(SVG.Namespaces.SVG, tag), properties);
	},
	Rectangle: function(x, y, width, height, properties) {
		return append_properties(SVG.Element('rect', {
			x: round_coordinate(x),
			y: round_coordinate(y),
			width: round_dimension(width),
			height: round_dimension(height)
		}), properties);
	},
	Circle: function(cx, cy, r, properties) {
		return append_properties(SVG.Element('circle', {
			cx: round_coordinate(cx),
			cy: round_coordinate(cy),
			r: round_dimension(r)
		}), properties);
	},
	Line: function(x1, y1, x2, y2, properties) {
		return append_properties(SVG.Element('line', {
			x1: round_coordinate(x1),
			y1: round_coordinate(y1),
			x2: round_coordinate(x2),
			y2: round_coordinate(y2)
		}), properties);
	},
	Polyline: function(points, properties) {
		return append_properties(SVG.Element('polyline', {
			points: points.map(round_coordinate).join(' '),
		}), properties);
	},
	Text: function(x, y, content, properties) {
		const text = append_properties(SVG.Element('text', {
			x: round_coordinate(x),
			y: round_coordinate(y)
		}), properties);
		text.appendChild(document.createTextNode(content));
		return text;
	},
	Title: function(content, properties) {
		const title = SVG.Element('title', properties);
		title.appendChild(document.createTextNode(content));
		return title;
	},
	Link: function(url, properties) {
		const link = SVG.Element('a');
		link.setAttributeNS(SVG.Namespaces.XLINK, 'href', url);
		return append_properties(link, properties);
	},
	Path: function(x, y, path, properties) {
		return append_properties(SVG.Element('path', {'d': `M${round_coordinate(x)} ${round_coordinate(y)} ${path}`}), properties);
	},
	//work only with left to right and top to bottom languages
	TextWrap: function(text, width) {
		//retrieve all words and clear text
		const words = text.textContent.split(' ');
		text.textContent = '';
		//create first line
		let tspan = append_properties(SVG.Element('tspan', {x: text.getAttribute('x'), dy: 0}));
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
			//otherwise, that means that a single word alone can not fit in specified width and will create a infinite loop
			if(line.length > 1 && tspan.getComputedTextLength() > width) {
				//remove last word and close line
				line.pop();
				tspan.textContent = line.join(' ');
				//start a new line
				tspan = append_properties(SVG.Element('tspan', {x: text.getAttribute('x'), dy: 15}));
				text.appendChild(tspan);
				line = [];
				//excluded word must be managed next loop
				words.unshift(word);
			}
		}
	},
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
	Center: function(element, x1, x2, y1, y2) {
		const box = element.getBBox();
		element.setAttribute('x', round_coordinate(x1 + (x2 - x1) / 2 - box.width / 2));
		element.setAttribute('y', round_coordinate(y1 + (y2 - y1) / 2 + box.height / 2));
	}
};

SVG.Namespaces = {
	SVG: 'http://www.w3.org/2000/svg',
	XHTML: 'http://www.w3.org/1999/xhtml',
	XLINK: 'http://www.w3.org/1999/xlink'
};
