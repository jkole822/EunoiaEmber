import type { Dayjs } from 'dayjs';

export function* dateRange(start: Dayjs, end: Dayjs) {
	let current = start;

	while (current.isBefore(end) || current.isSame(end, 'day')) {
		yield current;
		current = current.add(1, 'day');
	}
}
