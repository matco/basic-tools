import './extension.js';

export class Timeframe {
	constructor(startDate, stopDate) {
		if(startDate && stopDate && stopDate.isBefore(startDate)) {
			throw new Error(`Unable to create a timeframe with a stop date before its start date (start date: ${startDate.toISOString()}, stop date ${stopDate.toISOString()}`);
		}
		this.startDate = startDate;
		this.stopDate = stopDate;
	}
	isInfinite() {
		return !this.startDate && !this.stopDate;
	}
	isStaked() {
		return !!(this.startDate && this.stopDate);
	}
	isBlank() {
		return this.isStaked() && this.startDate.equals(this.stopDate);
	}
	getDays() {
		return this.isStaked() ? Date.getDifferenceInDays(this.startDate, this.stopDate) : undefined;
	}
	getHours() {
		return this.isStaked() ? Date.getDifferenceInHours(this.startDate, this.stopDate) : undefined;
	}
	getMinutes() {
		return this.isStaked() ? Date.getDifferenceInMinutes(this.startDate, this.stopDate) : undefined;
	}
	getSeconds() {
		return this.isStaked() ? Date.getDifferenceInSeconds(this.startDate, this.stopDate) : undefined;
	}
	getMilliseconds() {
		return this.isStaked() ? Date.getDifferenceInMilliseconds(this.startDate, this.stopDate) : undefined;
	}
	clone() {
		return new Timeframe(this.startDate ? this.startDate.clone() : undefined, this.stopDate ? this.stopDate.clone() : undefined);
	}
	surrounds(date) {
		return (!this.startDate || this.startDate.isBefore(date) || this.startDate.equals(date)) && (!this.stopDate || this.stopDate.isAfter(date) || this.stopDate.equals(date));
	}
	overlaps(timeframe) {
		if(timeframe.isInfinite()) {
			return true;
		}
		if(!timeframe.startDate) {
			return !this.startDate || this.startDate.isBefore(timeframe.stopDate);
		}
		if(!timeframe.stopDate) {
			return !this.stopDate || this.stopDate.isBefore(timeframe.startDate);
		}
		return this.surrounds(timeframe.startDate) || this.surrounds(timeframe.stopDate) || timeframe.surrounds(this.startDate);
	}
	toString() {
		return `${this.startDate.toISOString()} - ${this.stopDate.toISOString()}`;
	}
	equals(timeframe) {
		if(!timeframe) {
			return false;
		}
		const same_start_date = !this.startDate && !timeframe.startDate || this.startDate && timeframe.startDate && this.startDate.equals(timeframe.startDate);
		const same_stop_date = !this.stopDate && !timeframe.stopDate || this.stopDate && timeframe.stopDate && this.stopDate.equals(timeframe.stopDate);
		return same_start_date && same_stop_date;
	}
	extendPercentage(percentage) {
		if(this.isStaked()) {
			const margin = Math.round(this.getMilliseconds() * percentage / 200);
			this.startDate.addMilliseconds(-margin);
			this.stopDate.addMilliseconds(margin);
		}
		return this;
	}
	extendDays(days) {
		const margin = days / 2;
		this.startDate.addDays(-margin);
		this.stopDate.addDays(margin);
		return this;
	}
	extendHours(hours) {
		const margin = hours / 2;
		this.startDate.addHours(-margin);
		this.stopDate.addHours(margin);
		return this;
	}
	extendMinutes(minutes) {
		const margin = minutes / 2;
		this.startDate.addMinutes(-margin);
		this.stopDate.addMinutes(margin);
		return this;
	}
	extendSeconds(seconds) {
		const margin = seconds / 2;
		this.startDate.addSeconds(-margin);
		this.stopDate.addSeconds(margin);
		return this;
	}
	extendMilliseconds(milliseconds) {
		const margin = milliseconds / 2;
		this.startDate.addMilliseconds(-margin);
		this.stopDate.addMilliseconds(margin);
		return this;
	}
	roundToDay() {
		this.roundToHour();
		this.startDate.roundToDay();
		this.stopDate.roundToDay();
		return this;
	}
	roundToHour() {
		this.startDate.roundToHour();
		this.stopDate.roundToHour();
		return this;
	}
	roundToMinute() {
		this.startDate.roundToMinute();
		this.stopDate.roundToMinute();
		return this;
	}
	shiftDays(days) {
		this.startDate.addDays(days);
		this.stopDate.addDays(days);
		return this;
	}
	shiftHours(hours) {
		this.startDate.addHours(hours);
		this.stopDate.addHours(hours);
		return this;
	}
	shiftMinutes(minutes) {
		this.startDate.addMinutes(minutes);
		this.stopDate.addMinutes(minutes);
		return this;
	}
	shiftSeconds(seconds) {
		this.startDate.addSeconds(seconds);
		this.stopDate.addSeconds(seconds);
		return this;
	}
	shiftMilliseconds(milliseconds) {
		this.startDate.addMilliseconds(milliseconds);
		this.stopDate.addMilliseconds(milliseconds);
		return this;
	}
	shiftStartDate(date) {
		const offset = date.getTime() - this.startDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}
	shiftStopDate(date) {
		const offset = date.getTime() - this.stopDate.getTime();
		return this.shiftSeconds(offset / 1000);
	}
	isBefore(timeframe) {
		return this.startDate.isBefore(timeframe.startDate);
	}
	isAfter(timeframe) {
		return this.stopDate.isAfter(timeframe.stopDate);
	}
}
