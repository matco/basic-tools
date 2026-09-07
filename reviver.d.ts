export type Factory = (entity: string, container?: object) => object;
/**
 * @callback Factory
 * @param {string} entity - String containing the object entity
 * @param {object} [container] - The container of the object that is currently being revived
 * @returns {object} The constructor associated to the entity
 */
declare class Reviver {
    entityProperty: string;
    /**@type {Factory | undefined} */
    factory: Factory | undefined;
    entitiesConstructors: any;
    entitiesProperties: any;
    enforceTypes: boolean;
    preserveUnknownProperties: boolean;
    preserveEntityProperty: boolean;
    debug: boolean;
    callback: any;
    static ENTITY_PROPERTY: string;
    constructor(parameters: any);
    /**
     * Revive a plain object into a class instance
     * @param {object} object - The object to revive
     * @param {object} [container] - The container of the object that will be bound to object back references
     * @param {string} [type] - Awaited type of object
     * @returns {object} The revived object
     * @throws {TypeDoesNotMatch} If the type of a property does not match the expected type
     */
    revive(object: object, container?: object, type?: string): object;
}
export { Reviver };
