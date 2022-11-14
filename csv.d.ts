export class CSV {
	constructor(data: Array<Array<string>>);
	toString(): string;
	toBlob(): Blob;
	download(filename: string);
	static parse(string: string): Array<Array<string>>;
	static parseToDictionary(string: string): Array<{key: string, value: string}>;
}
