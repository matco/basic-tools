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
		/**@type {Date} */
		this.startDate = startDate;
		/**@type {Date} */
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
	 * @returns {boolean} True if the timeframe has both a start date and a stop date
	 */
	isStaked() {
		return !!(this.startDate && this.stopDate);
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
	 * @returns {number} The duration in days, or undefined if the timeframe is not staked
	 */
	getDays() {
		return this.isStaked() ? Date.getDifferenceInDays(this.startDate, this.stopDate) : undefined;
	}

	/**
	 * Get the duration of the timeframe in hours
	 * @returns {number} The duration in hours, or undefined if the timeframe is not staked
	 */
	getHours() {
		return this.isStaked() ? Date.getDifferenceInHours(this.startDate, this.stopDate) : undefined;
	}

	/**
	 * Get the duration of the timeframe in minutes
	 * @returns {number} The duration in minutes, or undefined if the timeframe is not staked
	 */
	getMinutes() {
		return this.isStaked() ? Date.getDifferenceInMinutes(this.startDate, this.stopDate) : undefined;
	}

	/**
	 * Get the duration of the timeframe in seconds
	 * @returns {number} The duration in seconds, or undefined if the timeframe is not staked
	 */
	getSeconds() {
		return this.isStaked() ? Date.getDifferenceInSeconds(this.startDate, this.stopDate) : undefined;
	}

	/**
	 * Get the duration of the timeframe in milliseconds
	 * @returns {number} The duration in milliseconds, or undefined if the timeframe is not staked
	 */
	getMilliseconds() {
		return this.isStaked() ? Date.getDifferenceInMilliseconds(this.startDate, this.stopDate) : undefined;
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
			return !this.startDate || this.startDate.isBefore(timeframe.stopDate);
		}
		if(!timeframe.stopDate) {
			return !this.stopDate || this.stopDate.isAfter(timeframe.startDate);
		}
		return this.surrounds(timeframe.startDate) || this.surrounds(timeframe.stopDate) || timeframe.surrounds(this.startDate);
	}

	/**
	 * Get a string representation of the timeframe
	 * @returns {string} The ISO representation of the start and stop dates
	 */
	toString() {
		return `${this.startDate.toISOString()} - ${this.stopDate.toISOString()}`;
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
		const same_start_date = (!this.startDate && !timeframe.startDate) || (this.startDate && timeframe.startDate && this.startDate.equals(timeframe.startDate));
		const same_stop_date = (!this.stopDate && !timeframe.stopDate) || (this.stopDate && timeframe.stopDate && this.stopDate.equals(timeframe.stopDate));
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
	 */
	extendDays(days) {
		const margin = days / 2;
		this.startDate.addDays(-margin);
		this.stopDate.addDays(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of hours
	 * @param {number} hours - The number of hours to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	extendHours(hours) {
		const margin = hours / 2;
		this.startDate.addHours(-margin);
		this.stopDate.addHours(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of minutes
	 * @param {number} minutes - The number of minutes to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	extendMinutes(minutes) {
		const margin = minutes / 2;
		this.startDate.addMinutes(-margin);
		this.stopDate.addMinutes(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of seconds
	 * @param {number} seconds - The number of seconds to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	extendSeconds(seconds) {
		const margin = seconds / 2;
		this.startDate.addSeconds(-margin);
		this.stopDate.addSeconds(margin);
		return this;
	}

	/**
	 * Extend the timeframe on both sides by a number of milliseconds
	 * @param {number} milliseconds - The number of milliseconds to add on each side
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	extendMilliseconds(milliseconds) {
		const margin = milliseconds / 2;
		this.startDate.addMilliseconds(-margin);
		this.stopDate.addMilliseconds(margin);
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest day
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	roundToDay() {
		this.roundToHour();
		this.startDate.roundToDay();
		this.stopDate.roundToDay();
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest hour
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	roundToHour() {
		this.startDate.roundToHour();
		this.stopDate.roundToHour();
		return this;
	}

	/**
	 * Round the start and stop dates to the nearest minute
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	roundToMinute() {
		this.startDate.roundToMinute();
		this.stopDate.roundToMinute();
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of days
	 * @param {number} days - The number of days to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftDays(days) {
		this.startDate.addDays(days);
		this.stopDate.addDays(days);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of hours
	 * @param {number} hours - The number of hours to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftHours(hours) {
		this.startDate.addHours(hours);
		this.stopDate.addHours(hours);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of minutes
	 * @param {number} minutes - The number of minutes to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftMinutes(minutes) {
		this.startDate.addMinutes(minutes);
		this.stopDate.addMinutes(minutes);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of seconds
	 * @param {number} seconds - The number of seconds to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftSeconds(seconds) {
		this.startDate.addSeconds(seconds);
		this.stopDate.addSeconds(seconds);
		return this;
	}

	/**
	 * Shift the whole timeframe by a number of milliseconds
	 * @param {number} milliseconds - The number of milliseconds to shift by
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftMilliseconds(milliseconds) {
		this.startDate.addMilliseconds(milliseconds);
		this.stopDate.addMilliseconds(milliseconds);
		return this;
	}

	/**
	 * Shift the timeframe so that its start date matches the given date
	 * @param {Date} date - The new start date
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftStartDate(date) {
		const offset = date.getTime() - this.startDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}

	/**
	 * Shift the timeframe so that its stop date matches the given date
	 * @param {Date} date - The new stop date
	 * @returns {Timeframe} The timeframe itself, for chaining
	 */
	shiftStopDate(date) {
		const offset = date.getTime() - this.stopDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}

	/**
	 * Check if the timeframe starts before the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to compare with
	 * @returns {boolean} True if this timeframe starts before the given timeframe
	 */
	isBefore(timeframe) {
		return this.startDate.isBefore(timeframe.startDate);
	}

	/**
	 * Check if the timeframe ends after the given timeframe
	 * @param {Timeframe} timeframe - The timeframe to compare with
	 * @returns {boolean} True if this timeframe ends after the given timeframe
	 */
	isAfter(timeframe) {
		return this.stopDate.isAfter(timeframe.stopDate);
	}
}
