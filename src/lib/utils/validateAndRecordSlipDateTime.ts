import dayjs, { type Dayjs } from 'dayjs';
import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { generateId } from '$lib/utils/generateId';
import { slipDate } from '$lib/server/db/schema';

export async function recordSlipDateTime({
	date,
	time,
	trackerId
}: {
	date: string;
	time: string;
	trackerId: string;
}) {
	const slipDateValues = {
		id: generateId(),
		date,
		time,
		trackerId
	};

	try {
		await db.insert(slipDate).values(slipDateValues);
	} catch {
		return fail(500, { message: 'An error has occurred.' });
	}
}

export function validateAndTrimSlipDateTime({
	anchorDateTime,
	date: dateInput,
	time: timeInput
}: {
	anchorDateTime: Dayjs;
	date: FormDataEntryValue;
	time: FormDataEntryValue;
}) {
	if (!dateInput || !timeInput) {
		throw error(400, 'Slip date and time are required.');
	}

	if (typeof dateInput !== 'string' || typeof timeInput !== 'string') {
		throw error(400, 'Invalid form data.');
	}

	const date = dateInput.trim();
	const time = timeInput.trim();

	if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
		throw error(400, 'Invalid slip date format. Use YYYY-MM-DD.');
	}

	if (!dayjs(time, 'HH:mm', true).isValid()) {
		throw error(400, 'Invalid slip time format. Use HH:mm.');
	}

	const format = 'YYYY-MM-DD HH:mm';
	const now = dayjs();
	const dateTime = dayjs(`${date} ${time}`, format);

	if (dateTime.isAfter(now)) {
		throw error(400, 'Last slip date cannot be in the future.');
	}

	if (dateTime.isBefore(anchorDateTime)) {
		throw error(400, 'Last slip date must be after anchor date.');
	}

	return { date, time };
}
