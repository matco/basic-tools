export class CSV {
	constructor(data: Array<Array<string>>);
	toString(): string;
	toBlob(): Blob;
	download(filename?: string): void;
	static parse(string: string): Array<Array<string>>;
	static parseToDictionary(string: string): Array<Record<string, string>>;
}
