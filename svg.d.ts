import './extension.js';
export declare const SVG: {
    /**
     * Create an SVG element
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGElement} The created SVG element
     */
    Create: (properties?: {
        [key: string]: string | number | boolean;
    }) => SVGElement;
    /**
     * Create an element with the specified tag
     * @param {string} tag - The SVG tag name
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGElement} The created element
     */
    Element: (tag: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGElement;
    /**
     * Create an SVG group element
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGElement} The created group element
     */
    Group: (properties?: {
        [key: string]: string | number | boolean;
    }) => SVGElement;
    /**
     * Create an SVG rectangle element
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {number} width - The width dimension
     * @param {number} height - The height dimension
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGRectElement} The created rectangle element
     */
    Rectangle: (x: number, y: number, width: number, height: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGRectElement;
    /**
     * Create a centered SVG rectangle element
     * @param {number} x - The x coordinate of center
     * @param {number} y - The y coordinate of center
     * @param {number} width - The width dimension
     * @param {number} height - The height dimension
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGRectElement} The created rectangle element
     */
    RectangleCentered: (x: number, y: number, width: number, height: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGRectElement;
    /**
     * Create a horizontally centered SVG rectangle element
     * @param {number} x - The x coordinate of center
     * @param {number} y - The y coordinate
     * @param {number} width - The width dimension
     * @param {number} height - The height dimension
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGRectElement} The created rectangle element
     */
    RectangleCenteredHorizontally: (x: number, y: number, width: number, height: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGRectElement;
    /**
     * Create a vertically centered SVG rectangle element
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate of center
     * @param {number} width - The width dimension
     * @param {number} height - The height dimension
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGRectElement} The created rectangle element
     */
    RectangleCenteredVertically: (x: number, y: number, width: number, height: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGRectElement;
    /**
     * Create an SVG circle element
     * @param {number} cx - The x coordinate of center
     * @param {number} cy - The y coordinate of center
     * @param {number} r - The radius
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGCircleElement} The created circle element
     */
    Circle: (cx: number, cy: number, r: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGCircleElement;
    /**
     * Create an SVG line element
     * @param {number} x1 - The x coordinate of start point
     * @param {number} y1 - The y coordinate of start point
     * @param {number} x2 - The x coordinate of end point
     * @param {number} y2 - The y coordinate of end point
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGLineElement} The created line element
     */
    Line: (x1: number, y1: number, x2: number, y2: number, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGLineElement;
    /**
     * Create an SVG polyline element
     * @param {number[]} points - Array of coordinate numbers
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGPolylineElement} The created polyline element
     */
    Polyline: (points: number[], properties?: {
        [key: string]: string | number | boolean;
    }) => SVGPolylineElement;
    /**
     * Create an SVG text element
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {string} content - The text content
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGTextElement} The created text element
     */
    Text: (x: number, y: number, content: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGTextElement;
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
    Image: (x: number, y: number, width: number, height: number, href: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGImageElement;
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
    ImageCentered: (x: number, y: number, width: number, height: number, href: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGImageElement;
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
    ImageCenteredHorizontally: (x: number, y: number, width: number, height: number, href: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGImageElement;
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
    ImageCenteredVertically: (x: number, y: number, width: number, height: number, href: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGImageElement;
    /**
     * Create an SVG title element
     * @param {string} content - The title text content
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGTitleElement} The created title element
     */
    Title: (content: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGTitleElement;
    /**
     * Create an SVG link element
     * @param {string} href - The link URL
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGAElement} The created link element
     */
    Link: (href: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGAElement;
    /**
     * Create an SVG path element
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {string} path - The path data
     * @param {{[key: string]: string | number | boolean}} [properties] - Optional properties to set
     * @returns {SVGPathElement} The created path element
     */
    Path: (x: number, y: number, path: string, properties?: {
        [key: string]: string | number | boolean;
    }) => SVGPathElement;
    /**
     * Wrap text content into multiple lines
     * @param {SVGTextElement} text - The text element to wrap
     * @param {number} width - The maximum line width
     * @returns {void}
     */
    TextWrap: (text: SVGTextElement, width: number) => void;
    /**
     * Truncate text with ellipsis
     * @param {SVGTextElement} text - The text element to truncate
     * @param {number} width - The maximum text width
     * @returns {void}
     */
    TextEllipsis: (text: SVGTextElement, width: number) => void;
    /**
     * Center an element within a bounding box
     * @param {SVGGraphicsElement} element - The element to center
     * @param {number} x1 - The left boundary
     * @param {number} x2 - The right boundary
     * @param {number} y1 - The top boundary
     * @param {number} y2 - The bottom boundary
     * @returns {void}
     */
    Center: (element: SVGGraphicsElement, x1: number, x2: number, y1: number, y2: number) => void;
};
