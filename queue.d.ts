export class Queue {
	constructor(resultCallback?: (result: any) => any);
	run(): void;
	add(promiser: () => Promise<any>): Queue;
	addAll(promisers: Array<() => Promise<any>>): Queue;
	clear(): Queue;
	then(callback: (result: any) => any): Queue;
	catch(callback: (result: any) => any): Queue;
}
