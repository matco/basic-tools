export type Factory = (entity: string, container?: object) => object;

export type PropertyDefinition = {
	type?: string;
	back_reference?: boolean;
};

export type ReviverParameters = {
	entityProperty?: string;
	factory?: Factory;
	entitiesConstructors?: (entity: string) => (new () => object) | undefined;
	entitiesProperties?: (entity: string) => {[property: string]: PropertyDefinition} | object;
	enforceTypes?: boolean;
	preserveUnknownProperties?: boolean;
	preserveEntityProperty?: boolean;
	debug?: boolean;
	callback?: (revived_object: object, entity: string, container: object, plain_object: object) => void;
};

export class Reviver {
	static ENTITY_PROPERTY: string;
	constructor(parameters: ReviverParameters);
	revive(object: object, container?: object, type?: string): object;
}
