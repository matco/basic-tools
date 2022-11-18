export class SVG {
	static Create(properties?: {[key: string]: string}): SVGElement;
	static Element(tag: string, properties?: {[key: string]: string}): SVGElement;
	static Group(properties?: {[key: string]: string}): SVGElement;
	static Rectangle(x: number, y: number, width: number, height: number, properties?: {[key: string]: string}): SVGRectElement;
	static RectangleCentered(x: number, y: number, width: number, height: number, properties?: {[key: string]: string}): SVGRectElement;
	static RectangleCenteredHorizontally(x: number, y: number, width: number, height: number, properties?: {[key: string]: string}): SVGRectElement;
	static RectangleCenteredVertically(x: number, y: number, width: number, height: number, properties?: {[key: string]: string}): SVGRectElement;
	static Circle(cx: number, cy: number, r: number, properties?: {[key: string]: string}): SVGCircleElement;
	static Line(x1: number, y1: number, x2: number, y2: number, properties?: {[key: string]: string}): SVGLineElement;
	static Polyline(points: number[], properties?: {[key: string]: string}): SVGPolylineElement
	static Text(x: number, y: number, content, properties?): SVGTextElement
	static Image(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string}): SVGImageElement;
	static ImageCentered(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string}): SVGImageElement;
	static ImageCenteredHorizontally(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string}): SVGImageElement;
	static ImageCenteredVertically(x: number, y: number, width: number, height: number, href: string, properties?: {[key: string]: string}): SVGImageElement;
	static Title(content: string, properties?: {[key: string]: string}): SVGTitleElement;
	static Link(href: string, properties?: {[key: string]: string}): SVGAElement;
	static Path(x: number, y: number, path: string, properties?: {[key: string]: string}): SVGPathElement
	static TextWrap(text: SVGTextElement, width: number);
	static TextEllipsis(text: SVGTextElement, width: number);
	static Center(element: SVGElement, x1: number, x2: number, y1: number, y2: number);
}
