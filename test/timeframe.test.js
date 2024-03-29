/*eslint-env mocha*/

import * as assert from 'assert';
import {Timeframe} from '../timeframe.js';

describe('Timeframe', function() {

	describe('#constructor', function() {
		it('does not accept timeframe with stop date before start date', function() {
			assert.throws(
				function() {
					new Timeframe(new Date('2004/02/26'), new Date('2004/02/25'));
				},
				undefined,
				'It is not possible to create a timeframe with a stop date before its start date'
			);
		});
	});

	describe('#isInfinite', function() {
		it('checks if a timeframe has no start date nor stop date', function() {
			assert.ok(!new Timeframe(new Date('2004/02/26'), new Date('2004/02/27')).isInfinite(), 'Timeframe with start date and stop date is not infinite');
			assert.ok(!new Timeframe(new Date('2004/02/26')).isInfinite(), 'Timeframe with only start date is not infinite');
			assert.ok(new Timeframe().isInfinite(), 'Timeframe without start date nor stop date is infinite');
		});
	});

	describe('#isStaked', function() {
		it('checks if a timeframe has a start date or a stop date', function() {
			assert.ok(new Timeframe(new Date('2004/02/26'), new Date('2004/02/27')).isStaked(), 'Timeframe with start date and stop date is stacked');
			assert.ok(!new Timeframe(new Date('2004/02/26')).isStaked(), 'Timeframe with only start date is not stacked');
			assert.ok(!new Timeframe().isStaked(), 'Timeframe without start date nor stop date is not stacked');
		});
	});

	describe('#isBlank', function() {
		it('checks if a timeframe has a start date equal to its stop date', function() {
			const date = new Date('2004/02/26');
			assert.ok(new Timeframe(date, date).isBlank(), 'Timeframe with the same start date and stop date is blank');
			assert.ok(new Timeframe(new Date('2004/02/26'), new Date('2004/02/26')).isBlank(), 'Timeframe with start date equal to stop date is blank');
			assert.ok(!new Timeframe(new Date('2004/02/26')).isBlank(), 'Timeframe with only start date is not blank');
			assert.ok(!new Timeframe().isBlank(), 'Timeframe without start date nor stop date is not blank');
		});
	});

	describe('#getDays, #getHours, #getMinutes and #getSeconds', function() {
		it('returns the right value', function() {
			let timeframe;

			timeframe = new Timeframe(new Date('2004/02/26'), new Date('2004/02/27'));
			assert.strictEqual(timeframe.getDays(), 1, 'There is 1 day between [2004/02/26] and [2004/02/27]');
			assert.strictEqual(timeframe.getHours(), 24, 'There are 24 hours between [2004/02/26] and [2004/02/27]');
			assert.strictEqual(timeframe.getMinutes(), 1440, 'There are 1440 minutes between [2004/02/26] and [2004/02/27]');
			assert.strictEqual(timeframe.getSeconds(), 86400, 'There are 86400 seconds between [2004/02/26] and [2004/02/27]');
			assert.strictEqual(timeframe.getMilliseconds(), 86400000, 'There are 86400000 milliseconds between [2004/02/26] and [2004/02/27]');

			timeframe = new Timeframe(new Date('2010/12/31'), new Date('2010/12/31'));
			assert.strictEqual(timeframe.getDays(), 0, 'There is 0 day between [2010/12/31] and [2010/12/31]');
			assert.strictEqual(timeframe.getHours(), 0, 'There is 0 hour between [2010/12/31] and [2010/12/31]');
			assert.strictEqual(timeframe.getMinutes(), 0, 'There is 0 minute between [2010/12/31] and [2010/12/31]');
			assert.strictEqual(timeframe.getSeconds(), 0, 'There is 0 second between [2010/12/31] and [2010/12/31]');
			assert.strictEqual(timeframe.getMilliseconds(), 0, 'There are 0 milliseconds between [2004/02/26] and [2004/02/27]');

			timeframe = new Timeframe(new Date('2004/02/26'), new Date('2004/03/01'));
			assert.strictEqual(timeframe.getDays(), 4, 'There are 4 days between [2004/02/26] and [2004/03/01]');

			timeframe = new Timeframe(new Date('2016-05-01T08:12:04.999Z'), new Date('2016-05-01T08:12:08.001Z'));
			assert.strictEqual(Math.round(timeframe.getDays()), 0, 'There are 0 day between [2016-05-01T08:12:04.999Z] and [2016-05-01T08:12:08.001Z]');
			assert.strictEqual(Math.round(timeframe.getHours()), 0, 'There are 0 hour between [2016-05-01T08:12:04.999Z] and [2016-05-01T08:12:08.001Z]');
			assert.strictEqual(Math.round(timeframe.getMinutes()), 0, 'There are 0 minute between [2016-05-01T08:12:04.999Z] and [2016-05-01T08:12:08.001Z]');
			assert.strictEqual(timeframe.getSeconds(), 3.002, 'There are 3.002 seconds between [2016-05-01T08:12:04.999Z] and [2016-05-01T08:12:08.001Z]');
			assert.strictEqual(timeframe.getMilliseconds(), 3002, 'There are 3002 milliseconds between [2016-05-01T08:12:04.999Z] and [2016-05-01T08:12:08.001Z]');

			//infinite time frame periods
			timeframe = new Timeframe(undefined, new Date('2016-05-01T08:12:04.999Z'));
			assert.strictEqual(timeframe.getDays(), undefined, 'Retrieving number of days with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getHours(), undefined, 'Retrieving number of hours with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getMinutes(), undefined, 'Retrieving number of minutes with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getSeconds(), undefined, 'Retrieving number of seconds with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getMilliseconds(), undefined, 'Retrieving number of milliseconds with an unstaked timeframe returns undefined');

			timeframe = new Timeframe(new Date('2004/02/26'));
			assert.strictEqual(timeframe.getDays(), undefined, 'Retrieving number of days with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getHours(), undefined, 'Retrieving number of hours with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getMinutes(), undefined, 'Retrieving number of minutes with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getSeconds(), undefined, 'Retrieving number of seconds with an unstaked timeframe returns undefined');
			assert.strictEqual(timeframe.getMilliseconds(), undefined, 'Retrieving number of milliseconds with an unstaked timeframe returns undefined');
		});
	});

	describe('#shift', function() {
		it('shifts a timeframe for a specified period', function() {
			const timeframe = new Timeframe(new Date('2010/12/27'), new Date('2010/12/31'));
			assert.strictEqual(timeframe.getDays(), 4, 'There are 4 days between [2010/12/27] and [2010/12/31]');
			timeframe.shiftDays(7);
			assert.strictEqual(timeframe.getDays(), 4, 'There are still 4 days between [2010/12/27] and [2010/12/31] with a shift of 7 days');
			assert.strictEqual(timeframe.startDate.toDisplay(), '2011-01-03', 'Timeframe beginning [2010/12/27] begins [2011/01/03] with a shift of 7 days');
			assert.strictEqual(timeframe.stopDate.toDisplay(), '2011-01-07', 'Timeframe ending [2010/12/31] ends [2011/01/06] with a shift of 7 days');
		});
	});

	describe('#surrounds', function() {
		it('checks if a date is included in a timeframe', function() {
			let timeframe;

			timeframe = new Timeframe(new Date('2009/02/01'), new Date('2009/10/01'));
			assert.ok(timeframe.surrounds(new Date('2009/04/01')), '2009/04/01 is between 2009/02/01 and 2009/10/01');
			assert.ok(timeframe.surrounds(new Date('2009/10/01')), '2009/10/01 is between 2009/02/01 and 2009/10/01');
			assert.ok(!timeframe.surrounds(new Date('2009/01/25')), '2009/01/25 is not between 2009/02/01 and 2009/10/01');

			//infinite time frame surround
			timeframe = new Timeframe(new Date('2009/02/01'));
			assert.ok(timeframe.surrounds(new Date('2009/04/01')), '2009/04/01 is between 2009/02/01 and infinite');
			assert.ok(timeframe.surrounds(new Date('2200/08/01')), '2200/08/01 is between 2009/02/01 and infinite');
			assert.ok(!timeframe.surrounds(new Date('2009/01/25')), '2009/01/25 is not between 2009/02/01 and infinite');

			timeframe = new Timeframe(undefined, new Date('2009/02/01'));
			assert.ok(timeframe.surrounds(new Date('2009/01/25')), '2009/01/25 is between infinite and 2009/02/01');
			assert.ok(timeframe.surrounds(new Date('1800/08/01')), '1800/08/01 is between infinite and 2009/02/01');
			assert.ok(!timeframe.surrounds(new Date('2009/04/01')), '2009/04/01 is not between infinite and 2009/02/01');
		});
	});

	describe('#overlaps', function() {
		it('checks if a timeframe overlaps with an other timeframe', function() {
			let timeframe_1, timeframe_2;

			timeframe_1 = new Timeframe(new Date('2009/02/01'), new Date('2009/10/01'));
			timeframe_2 = new Timeframe(new Date('2009/04/01'), new Date('2009/08/01'));
			assert.ok(timeframe_1.overlaps(timeframe_2), 'Timeframe [2009/04/01 to 2009/08/01] overlaps timeframe [2009/02/01 to 2009/10/01]');

			timeframe_1 = new Timeframe(new Date('2008/02/07'), new Date('2008/09/07'));
			timeframe_2 = new Timeframe(new Date('2010/01/07'), new Date('2010/02/20'));
			assert.ok(!timeframe_1.overlaps(timeframe_2), 'Timeframe [2008/02/07 to 2008/09/07] does not overlap timeframe [2010/01/07 to 2010/02/20]');

			timeframe_1 = new Timeframe(new Date('2008/02/07'), new Date('2008/09/07'));
			timeframe_2 = new Timeframe(new Date('2008/02/07'), new Date('2008/09/07'));
			assert.ok(timeframe_1.overlaps(timeframe_2), 'Timeframe [2008/02/07 to 2008/02/07] overlaps timeframe [2008/02/07 to 2008/02/07]');

			//infinite time frame overlap
			timeframe_1 = new Timeframe(new Date('2009/02/01'));
			timeframe_2 = new Timeframe(new Date('2009/04/01'), new Date('2009/08/01'));
			assert.ok(timeframe_1.overlaps(timeframe_2), 'Timeframe [2009/04/01 to infinite] overlaps timeframe [2009/02/01 to 2009/10/01]');

			timeframe_1 = new Timeframe(undefined, new Date('2008/09/07'));
			timeframe_2 = new Timeframe(undefined, new Date('2010/02/20'));
			assert.ok(timeframe_1.overlaps(timeframe_2), 'Timeframe [infinite to 2008/09/07] overlaps timeframe [infinite to 2010/02/20]');
		});
	});

	describe('#equals', function() {
		it('checks if 2 timeframes are equal', function() {
			let timeframe_1, timeframe_2;

			timeframe_1 = new Timeframe(new Date('2008/02/07'), new Date('2008/09/07'));
			timeframe_2 = new Timeframe(new Date('2008/02/07'), new Date('2008/09/07'));
			assert.ok(timeframe_1.equals(timeframe_2), 'Two timeframes with same start dates and same stop dates are similar');

			timeframe_2 = new Timeframe(new Date('2008/02/07'), new Date('2008/08/07'));
			assert.ok(!timeframe_1.equals(timeframe_2), 'Two timeframes with same start dates and different stop dates are not similar');

			//infinite time frame equal
			timeframe_1 = new Timeframe(new Date('2008/02/07'));
			timeframe_2 = new Timeframe(new Date('2008/02/07'));
			assert.ok(timeframe_1.equals(timeframe_2), 'Two timeframes with same start dates and no stop dates are similar');

			timeframe_2 = new Timeframe(new Date('2008/02/07'), new Date('2008/08/07'));
			assert.ok(!timeframe_1.equals(timeframe_2), 'Two timeframes with same start dates and different stop dates are not similar');
		});
	});

	describe('#extendPercentage', function() {
		it('extends a timeframe properly', function() {
			let timeframe;

			timeframe = new Timeframe(new Date('2020-06-01T10:00:00Z'), new Date('2020-06-01T14:00:00Z'));
			assert.strictEqual(timeframe.getSeconds(), 14400);
			timeframe.extendPercentage(10);
			assert.strictEqual(timeframe.getSeconds(), 15840, 'Adding 10 percents to a timeframe containing 14400 seconds gives a timeframe of 15840 seconds');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-06-01T09:48:00Z').getTime(), 'Adding 10 percents to a timeframe of 14400 seconds shifts its start date 5 percents earlier');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-06-01T14:12:00Z').getTime(), 'Adding 10 percents to a timeframe of 14400 seconds shifts its stop date 5 percents later');

			timeframe = new Timeframe(new Date('2020-01-05T12:00:00.450Z'), new Date('2020-01-05T12:00:00.550Z'));
			assert.strictEqual(timeframe.getMilliseconds(), 100);
			timeframe.extendPercentage(200);
			assert.strictEqual(timeframe.getMilliseconds(), 300, 'Adding 200 percents to a timeframe containing 100 milliseconds gives a timeframe of 300 milliseconds');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T12:00:00.350Z').getTime(), 'Adding 200 percents to a timeframe of 100 seconds shifts its start date 100 percents earlier');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T12:00:00.650Z').getTime(), 'Adding 200 percents to a timeframe of 100 seconds shifts its stop date 100 percents later');

			timeframe = new Timeframe(new Date('2020-01-05T12:00:00Z'), new Date('2020-01-05T13:00:00Z'));
			assert.strictEqual(timeframe.getMilliseconds(), 3600000);
			timeframe.extendPercentage(0);
			assert.strictEqual(timeframe.getMilliseconds(), 3600000, 'Adding 0 percent to a timeframe does not update it');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T12:00:00Z').getTime(), 'Adding 0 percent to a timeframe does not update it');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T13:00:00Z').getTime(), 'Adding 0 percent to a timeframe does not update it');

			timeframe = new Timeframe(new Date('2020-01-05T12:00:00Z'), new Date('2020-01-05T13:00:00Z'));
			assert.strictEqual(timeframe.getSeconds(), 3600);
			timeframe.extendPercentage(-10);
			assert.strictEqual(timeframe.getSeconds(), 3240, 'Adding -10 percents to a timeframe containing 3600 seconds gives a timeframe of 3240 seconds');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T12:03:00Z').getTime(), 'Adding -10 percents to a timeframe of 3600 seconds shifts its start date 5 percents later');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T12:57:00Z').getTime(), 'Adding -10 percents to a timeframe of 3600 seconds shifts its stop date 5 percents earlier');
		});

		it('does not update blank timeframes', function() {
			const timeframe = new Timeframe(new Date('2020-01-05T08:00:00Z'), new Date('2020-01-05T08:00:00Z'));
			assert.strictEqual(timeframe.getSeconds(), 0);
			timeframe.extendPercentage(10);
			assert.strictEqual(timeframe.getSeconds(), 0, 'Adding 10 percents to a blank timeframe does not update it');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T08:00:00Z').getTime(), 'Adding 10 percents to a blank timeframe does not update it');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T08:00:00Z').getTime(), 'Adding 10 percents to a blank timeframe does not update it');
		});

		it('does not update unstaked timeframes', function() {
			let timeframe;

			timeframe = new Timeframe(undefined, new Date('2020-01-05T13:00:00Z'));
			timeframe.extendPercentage(10);
			assert.strictEqual(timeframe.startDate, undefined, 'Adding 10 percents to an unstaked timeframe does not update it');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T13:00:00Z').getTime(), 'Adding 10 percents to an unstaked timeframe does not update it');

			timeframe = new Timeframe(new Date('2000-01-05T13:00:00Z'), undefined);
			timeframe.extendPercentage(50);
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2000-01-05T13:00:00Z').getTime(), 'Adding 50 percents to an unstaked timeframe does not update it');
			assert.strictEqual(timeframe.stopDate, undefined, 'Adding 50 percents to an unstaked timeframe does not update it');
		});
	});

	describe('#extendSeconds', function() {
		it('extends a timeframe by the right number of seconds', function() {
			let timeframe;

			timeframe = new Timeframe(new Date('2020-01-05T08:00:00'), new Date('2020-01-05T10:00:00'));
			assert.strictEqual(timeframe.getSeconds(), 7200);
			timeframe.extendSeconds(60);
			assert.strictEqual(timeframe.getSeconds(), 7260, 'Adding 60 seconds to a timeframe makes it 60 seconds longer');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T07:59:30').getTime(), 'Adding 60 seconds to a timeframe shifts its start date 30 seconds earlier');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T10:00:30').getTime(), 'Adding 60 seconds to a timeframe shifts its stop date 30 seconds later');

			timeframe = new Timeframe(new Date('2020-01-05T08:00:00'), new Date('2020-01-05T08:00:00'));
			assert.strictEqual(timeframe.getSeconds(), 0);
			timeframe.extendSeconds(1);
			assert.strictEqual(timeframe.getSeconds(), 1, 'Adding 1 seconds to a timeframe makes it 1 second longer');
			assert.strictEqual(timeframe.startDate.getTime(), new Date('2020-01-05T07:59:59.5').getTime(), 'Adding 1 second to a timeframe shifts its start date 0.5 second earlier');
			assert.strictEqual(timeframe.stopDate.getTime(), new Date('2020-01-05T08:00:00.5').getTime(), 'Adding 1 second to a timeframe shifts its stop date 0.5 second later');
		});
	});
});
