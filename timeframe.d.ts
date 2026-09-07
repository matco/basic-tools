import './extension.js';
export declare class Timeframe {
    /**@type {Date | undefined} */
    startDate: Date | undefined;
    /**@type {Date | undefined} */
    stopDate: Date | undefined;
    /**
     * Create a timeframe delimited by a start date and a stop date
     * @param {Date} [startDate] - The start date of the timeframe (undefined for an open start)
     * @param {Date} [stopDate] - The stop date of the timeframe (undefined for an open end)
     * @throws {Error} If the stop date is before the start date
     */
    constructor(startDate?: Date, stopDate?: Date);
    /**
     * Check if the timeframe is infinite (no start date and no stop date)
     * @returns {boolean} True if the timeframe has neither a start date nor a stop date
     */
    isInfinite(): boolean;
    /**
     * Check if the timeframe is staked (has both a start date and a stop date)
     * @returns {this is Timeframe & {startDate: Date, stopDate: Date}} True if the timeframe has both a start date and a stop date
     */
    isStaked(): this is Timeframe & {
        startDate: Date;
        stopDate: Date;
    };
    /**
     * Ensure the timeframe is staked, throwing an error otherwise
     * @param {string} message - The error message to throw if the timeframe is not staked
     * @returns {asserts this is Timeframe & {startDate: Date, stopDate: Date}} Narrows the timeframe's dates to be defined
     * @throws {Error} If the timeframe is not staked
     */
    checkStaked(message: string): asserts this is Timeframe & {
        startDate: Date;
        stopDate: Date;
    };
    /**
     * Check if the timeframe is blank (its start date equals its stop date)
     * @returns {boolean} True if the start date and stop date are equal
     */
    isBlank(): boolean;
    /**
     * Get the duration of the timeframe in days
     * @returns {number} The duration in days
     * @throws {Error} If the timeframe is not staked
     */
    getDays(): number;
    /**
     * Get the duration of the timeframe in hours
     * @returns {number} The duration in hours
     * @throws {Error} If the timeframe is not staked
     */
    getHours(): number;
    /**
     * Get the duration of the timeframe in minutes
     * @returns {number} The duration in minutes
     * @throws {Error} If the timeframe is not staked
     */
    getMinutes(): number;
    /**
     * Get the duration of the timeframe in seconds
     * @returns {number} The duration in seconds
     * @throws {Error} If the timeframe is not staked
     */
    getSeconds(): number;
    /**
     * Get the duration of the timeframe in milliseconds
     * @returns {number} The duration in milliseconds
     * @throws {Error} If the timeframe is not staked
     */
    getMilliseconds(): number;
    /**
     * Create a deep copy of the timeframe
     * @returns {Timeframe} A new timeframe with cloned start and stop dates
     */
    clone(): Timeframe;
    /**
     * Check if the timeframe surrounds the given date
     * @param {Date} date - The date to test
     * @returns {boolean} True if the date is within the timeframe (bounds included)
     */
    surrounds(date: Date): boolean;
    /**
     * Check if the timeframe overlaps the given timeframe
     * @param {Timeframe} timeframe - The timeframe to test against
     * @returns {boolean} True if the two timeframes overlap
     */
    overlaps(timeframe: Timeframe): boolean;
    /**
     * Get a string representation of the timeframe
     * @returns {string} The ISO representation of the start and stop dates
     */
    toString(): string;
    /**
     * Check if the timeframe equals the given timeframe
     * @param {Timeframe} timeframe - The timeframe to compare with
     * @returns {boolean} True if both timeframes have the same start and stop dates
     */
    equals(timeframe: Timeframe): boolean;
    /**
     * Extend the timeframe on both sides by a percentage of its duration
     * @param {number} percentage - The percentage of the duration to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     */
    extendPercentage(percentage: number): Timeframe;
    /**
     * Extend the timeframe on both sides by a number of days
     * @param {number} days - The number of days to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    extendDays(days: number): Timeframe;
    /**
     * Extend the timeframe on both sides by a number of hours
     * @param {number} hours - The number of hours to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    extendHours(hours: number): Timeframe;
    /**
     * Extend the timeframe on both sides by a number of minutes
     * @param {number} minutes - The number of minutes to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    extendMinutes(minutes: number): Timeframe;
    /**
     * Extend the timeframe on both sides by a number of seconds
     * @param {number} seconds - The number of seconds to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    extendSeconds(seconds: number): Timeframe;
    /**
     * Extend the timeframe on both sides by a number of milliseconds
     * @param {number} milliseconds - The number of milliseconds to add on each side
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    extendMilliseconds(milliseconds: number): Timeframe;
    /**
     * Round the start and stop dates to the nearest day
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    roundToDay(): Timeframe;
    /**
     * Round the start and stop dates to the nearest hour
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    roundToHour(): Timeframe;
    /**
     * Round the start and stop dates to the nearest minute
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    roundToMinute(): Timeframe;
    /**
     * Shift the whole timeframe by a number of days
     * @param {number} days - The number of days to shift by
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftDays(days: number): Timeframe;
    /**
     * Shift the whole timeframe by a number of hours
     * @param {number} hours - The number of hours to shift by
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftHours(hours: number): Timeframe;
    /**
     * Shift the whole timeframe by a number of minutes
     * @param {number} minutes - The number of minutes to shift by
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftMinutes(minutes: number): Timeframe;
    /**
     * Shift the whole timeframe by a number of seconds
     * @param {number} seconds - The number of seconds to shift by
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftSeconds(seconds: number): Timeframe;
    /**
     * Shift the whole timeframe by a number of milliseconds
     * @param {number} milliseconds - The number of milliseconds to shift by
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftMilliseconds(milliseconds: number): Timeframe;
    /**
     * Shift the timeframe so that its start date matches the given date
     * @param {Date} date - The new start date
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftStartDate(date: Date): Timeframe;
    /**
     * Shift the timeframe so that its stop date matches the given date
     * @param {Date} date - The new stop date
     * @returns {Timeframe} The timeframe itself, for chaining
     * @throws {Error} If the timeframe is not staked
     */
    shiftStopDate(date: Date): Timeframe;
    /**
     * Check if the timeframe starts before the given timeframe
     * @param {Timeframe} timeframe - The timeframe to compare with
     * @returns {boolean} True if this timeframe starts before the given timeframe
     * @throws {Error} If either timeframe is not staked
     */
    isBefore(timeframe: Timeframe): boolean;
    /**
     * Check if the timeframe ends after the given timeframe
     * @param {Timeframe} timeframe - The timeframe to compare with
     * @returns {boolean} True if this timeframe ends after the given timeframe
     * @throws {Error} If either timeframe is not staked
     */
    isAfter(timeframe: Timeframe): boolean;
}
