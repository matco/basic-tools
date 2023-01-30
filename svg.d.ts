export class SVG {
	static Create(properties?: {[key: string]: string | number | boolean}): SVGElement;
	static Element(tag: string, properties?: {[key: string]: string | number | boolean}): SVGElement;
	static Group(properties?: {[key: string]: string | number | boolean}): SVGElement;
	static Rectangle(x: number, y: number, width: number, height: number, properties?: {[key: string]: string | number | boolean}): SVGRectElement;
	static RectangleCentered(x: number, y: number, width: number, height: number, properties?: {[key: string]: string | number | boolean}): SVGRectElement;
	static RectangleCenteredHorizontally(x: number, y: number, width: number, height: number, properties?: {[key: string]: string | number | boolean}): SVGRectElement;
	static RectangleCenteredVertically(x: number, y: number, width: number, height: number, properties?: {[key: string]: string | number | boolean}): SVGRectElement;
	static Circle(cx: number, cy: number, r: number, properties?: {[key: string]: string | number | boolean}): SVGCircleElement;
	static Line(x1: number, y1: number, x2: number, y2: number, properties?: {[key: string]: string | number | boolean}): SVGLineElement;
	static Polyline(points: number[], properties?: {[key: string]: string | number | boolean}): SVGPolylineElement
	static Text(x: number, y: number, content, properties?: {[key: string]: string | number | boolean}): SVGTextElement
	static Image(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string | number | boolean}): SVGImageElement;
	static ImageCentered(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string | number | boolean}): SVGImageElement;
	static ImageCenteredHorizontally(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string | number | boolean}): SVGImageElement;
	static ImageCenteredVertically(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string | number | boolean}): SVGImageElement;
	static Title(content: string, properties?: {[key: string]: string | number | boolean}): SVGTitleElement;
	static Link(href: string, properties?: {[key: string]: string | number | boolean}): SVGAElement;
	static Path(x: number, y: number, path: string, properties?: {[key: string]: string | number | boolean}): SVGPathElement
	static TextWrap(text: SVGTextElement, width: number);
	static TextEllipsis(text: SVGTextElement, width: number);
	static Center(element: SVGElement, x1: number, x2: number, y1: number, y2: number);
}
