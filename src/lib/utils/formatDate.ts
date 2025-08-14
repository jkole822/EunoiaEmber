import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export function formatDate(date: string, time?: string, format = 'YYYY-MM-DD HH:mm') {
	if (!time) {
		return dayjs(date, format).format('MMMM Do, YYYY')
	}

	return dayjs(`${date} ${time}`, format).format('MMMM Do, YYYY [@] h:mm A');
}
