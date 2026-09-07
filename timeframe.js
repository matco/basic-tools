import './extension.js';

export class Timeframe {
	/**
	 * Create a timeframe delimited by a start date and a stop date
	 * @param {Date} [startDate] - The start date of the timeframe (undefined for an open start)
	 * @param {Date} [stopDate] - The stop date of the timeframe (undefined for an open end)
	 * @throws {Error} If the stop date is before the start date
	 */
	constructor(startDate, stopDate) {
		if(startDate && stopDate && stopDate.isBefore(startDate)) {
			throw new Error(`Unable to create a timeframe with a stop date before its start date (start date: ${startDate.toISOString()}, stop date ${stopDate.toISOString()}`);
		}
		/**@type {Date | undefined} */
		this.startDate = startDate;
		/**@type {Date | undefined} */
		this.stopDate = stopDate;
	}

	/**
	 * Check if the timeframe is infinite (no start date and no stop date)
	 * @returns {boolean} True if the timeframe has neither a start date nor a stop date
	 */
	isInfinite() {
		return !this.startDate && !this.stopDate;
	}

	/**
	 * Check if the timeframe is staked (has both a start date and a stop date)
	 * @returns {this is Timeframe & {startDate: Date, stopDate: Date}} True if the timeframe has both a start date and a stop date
	 */
	isStaked() {
		return !!(this.startDate && this.stopDate);
	}

	/**
	 * Ensure the timeframe is staked, throwing an error otherwise
	 * @param {string} message - The error message to throw if the timeframe is not staked
	 * @returns {asserts this is Timeframe & {startDate: Date, stopDate: Date}} Narrows the timeframe's dates to be defined
	 * @throws {Error} If the timeframe is not staked
	 */
	checkStaked(message) {
		if(!this.isStaked()) {
			throw new Error(message);
		}
	}

	/**
	 * Check if the timeframe is blank (its start date equals its stop date)
	 * @returns {boolean} True if the start date and stop date are equal
	 */
	isBlank() {
		return this.isStaked() && this.startDate.equals(this.stopDate);
	}

	/**
	 * Get the duration of the timeframe in days
	 * @returns {number} The duration in days
	 * @throws {Error} If the timeframe is not staked
	 */
	getDays() {
		this.checkStaked('Unable to get the duration of a timeframe that is not staked');
		return Date.getDifferenceInDays(this.startDate, this.stopDate);
	}

	/**
	 * Get the duration of the timeframe in hours
	 * @returns {number} The duration in hours
	 * @throws {Error} If the timeframe is not staked
	 */
	getHours() {
		this.checkStaked('Unable to get the duration of a timeframe that is not staked');
		return Date.getDifferenceInHours(this.startDate, this.stopDate);
	}

	/**
	 * Get the duration of the timeframe in minutes
	 * @returns {number} The duration in minutes
	 * @throws {Error} If the timeframe is not staked
	 */
	getMinutes() {
		this.checkStaked('Unable to get the duration of a timeframe that is not staked');
		return Date.getDifferenceInMinutes(this.startDate, this.stopDate);
	}

	/**
	 * Get the duration of the timeframe in seconds
	 * @returns {number} The duration in seconds
	 * @throws {Error} If the timeframe is not staked
	 */
	getSeconds() {
		this.checkStaked('Unable to get the duration of a timeframe that is not staked');
		return Date.getDifferenceInSeconds(this.startDate, this.stopDate);
	}

	/**
	 * Get the duration of the timeframe in milliseconds
	 * @returns {number} The duration in milliseconds
	 * @throws {Error} If the timeframe is not staked
	 */
	getMilliseconds() {
		this.checkStaked('Unable to get the duration of a timeframe that is not staked');
		return Date.getDifferenceInMilliseconds(this.startDate, this.stopDate);
	}

	/**
	 * Create a deep copy of the timeframe
	 * @returns {Timeframe} A new timeframe with cloned start and stop dates
	 */
	clone() {
		return new Timeframe(this.startDate ? this.startDate.clone() : undefined, this.stopDate ? this.stopDate.clone() : undefined);
	}

	/**
	 * Check if the timeframe surrounds the given date
	 * @param {Date} date - The date to test
	 * @returns {boolean} True if the date is within the timeframe (bounds included)
	 */
	surrounds(date) {
		return (!this.startDate || this.startDate.isBefore(date) || this.startDate.equals(date)) && (!this.stopDate || this.stopDate.isAfter(date) || this.stopDate.equals(date));
	}

	/**
	 * Check if the timeframe overlaps the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to test against
	 * @returns {boolean} True if the two timeframes overlap
	 */
	overlaps(timeframe) {
		if(timeframe.isInfinite()) {
			return true;
		}
		if(!timeframe.startDate) {
			return !this.startDate || (!!timeframe.stopDate && this.startDate.isBefore(timeframe.stopDate));
		}
		if(!timeframe.stopDate) {
			return !this.stopDate || this.stopDate.isAfter(timeframe.startDate);
		}
		return this.surrounds(timeframe.startDate) || this.surrounds(timeframe.stopDate) || (!!this.startDate && timeframe.surrounds(this.startDate));
	}

	/**
	 * Get a string representation of the timeframe
	 * @returns {string} The ISO representation of the start and stop dates
	 */
	toString() {
		return `${this.startDate?.toISOString() ?? '∞'} - ${this.stopDate?.toISOString() ?? '∞'}`;
	}

	/**
	 * Check if the timeframe equals the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to compare with
	 * @returns {boolean} True if both timeframes have the same start and stop dates
	 */
	equals(timeframe) {
		if(!timeframe) {
			return false;
		}
		const same_start_date = (!this.startDate && !timeframe.startDate) || !!(this.startDate && timeframe.startDate && this.startDate.equals(timeframe.startDate));
		const same_stop_date = (!this.stopDate && !timeframe.stopDate) || !!(this.stopDate && timeframe.stopDate && this.stopDate.equals(timeframe.stopDate));
		return same_start_date && same_stop_date;
	}

	/**
	 * Extend the timeframe on both sides by a percentage of its duration
	 * @param {number} percentage - The percentage of the duration to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	extendPercentage(percentage) {
		if(this.isStaked()) {
			const margin = Math.round(this.getMilliseconds() * percentage / 200);
			this.startDate.addMilliseconds(-margin);
			this.stopDate.addMilliseconds(margin);
		}
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of days
	 * @param {number} days - The number of days to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	extendDays(days) {
		this.checkStaked('Unable to extend a timeframe that is not staked');
		const margin = days / 2;
		this.startDate.addDays(-margin);
		this.stopDate.addDays(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of hours
	 * @param {number} hours - The number of hours to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	extendHours(hours) {
		this.checkStaked('Unable to extend a timeframe that is not staked');
		const margin = hours / 2;
		this.startDate.addHours(-margin);
		this.stopDate.addHours(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of minutes
	 * @param {number} minutes - The number of minutes to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	extendMinutes(minutes) {
		this.checkStaked('Unable to extend a timeframe that is not staked');
		const margin = minutes / 2;
		this.startDate.addMinutes(-margin);
		this.stopDate.addMinutes(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of seconds
	 * @param {number} seconds - The number of seconds to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	extendSeconds(seconds) {
		this.checkStaked('Unable to extend a timeframe that is not staked');
		const margin = seconds / 2;
		this.startDate.addSeconds(-margin);
		this.stopDate.addSeconds(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of milliseconds
	 * @param {number} milliseconds - The number of milliseconds to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	extendMilliseconds(milliseconds) {
		this.checkStaked('Unable to extend a timeframe that is not staked');
		const margin = milliseconds / 2;
		this.startDate.addMilliseconds(-margin);
		this.stopDate.addMilliseconds(margin);
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest day
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	roundToDay() {
		this.checkStaked('Unable to round a timeframe that is not staked');
		this.roundToHour();
		this.startDate.roundToDay();
		this.stopDate.roundToDay();
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest hour
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	roundToHour() {
		this.checkStaked('Unable to round a timeframe that is not staked');
		this.startDate.roundToHour();
		this.stopDate.roundToHour();
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest minute
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	roundToMinute() {
		this.checkStaked('Unable to round a timeframe that is not staked');
		this.startDate.roundToMinute();
		this.stopDate.roundToMinute();
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of days
	 * @param {number} days - The number of days to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftDays(days) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		this.startDate.addDays(days);
		this.stopDate.addDays(days);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of hours
	 * @param {number} hours - The number of hours to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftHours(hours) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		this.startDate.addHours(hours);
		this.stopDate.addHours(hours);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of minutes
	 * @param {number} minutes - The number of minutes to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftMinutes(minutes) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		this.startDate.addMinutes(minutes);
		this.stopDate.addMinutes(minutes);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of seconds
	 * @param {number} seconds - The number of seconds to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftSeconds(seconds) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		this.startDate.addSeconds(seconds);
		this.stopDate.addSeconds(seconds);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of milliseconds
	 * @param {number} milliseconds - The number of milliseconds to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftMilliseconds(milliseconds) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		this.startDate.addMilliseconds(milliseconds);
		this.stopDate.addMilliseconds(milliseconds);
		return this;
	}

	/**
	 * Shift the timeframe so that its start date matches the given date
	 * @param {Date} date - The new start date
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftStartDate(date) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		const offset = date.getTime() - this.startDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}

	/**
	 * Shift the timeframe so that its stop date matches the given date
	 * @param {Date} date - The new stop date
	 * @returns {Timeframe} The timeframe itself, for chaining
	 * @throws {Error} If the timeframe is not staked
	 */
	shiftStopDate(date) {
		this.checkStaked('Unable to shift a timeframe that is not staked');
		const offset = date.getTime() - this.stopDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}

	/**
	 * Check if the timeframe starts before the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to compare with
	 * @returns {boolean} True if this timeframe starts before the given timeframe
	 * @throws {Error} If either timeframe is not staked
	 */
	isBefore(timeframe) {
		const message = 'Unable to compare timeframes that are not staked';
		this.checkStaked(message);
		timeframe.checkStaked(message);
		return this.startDate.isBefore(timeframe.startDate);
	}

	/**
	 * Check if the timeframe ends after the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to compare with
	 * @returns {boolean} True if this timeframe ends after the given timeframe
	 * @throws {Error} If either timeframe is not staked
	 */
	isAfter(timeframe) {
		const message = 'Unable to compare timeframes that are not staked';
		this.checkStaked(message);
		timeframe.checkStaked(message);
		return this.stopDate.isAfter(timeframe.stopDate);
	}
}
