export class BusEvent {
	getCallbacks(): Array<string>;
	hit(listener: any): void;
}

export class Bus {
	disable(): void;
	enable(): void;
	lock(): void;
	unlock(): void;
	reset(): void;
	register(listener: any): void;
	unregister(listener: any): void;
	isRegistered(listener: any): boolean;
	pause(): void;
	resume(): void;
	dispatch(event: BusEvent): void;
	listeners: any;
}
