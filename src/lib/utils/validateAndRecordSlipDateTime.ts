import dayjs, { type Dayjs } from 'dayjs';
import { fail } from '@sveltejs/kit';
import { generateId } from '$lib/utils/generateId';
import { db } from '$lib/server/db';
import { slipDate } from '$lib/server/db/schema';

export async function validateAndRecordSlipDateTime({
	anchorDateTime,
	date,
	time,
	trackerId
}: {
	anchorDateTime: Dayjs;
	date: FormDataEntryValue;
	time: FormDataEntryValue;
	trackerId: string;
}) {
	const format = 'YYYY-MM-DD HH:mm';
	const now = dayjs();

	if (!date || !time) {
		return fail(400, { message: 'Slip date and time are required.' });
	}

	if (typeof date !== 'string' || typeof time !== 'string') {
		return fail(400, { message: 'Invalid form data.' });
	}

	const dateTime = dayjs(`${date} ${time}`, format);

	if (!dateTime.isValid()) {
		return fail(400, { message: 'Invalid slip date/time format.' });
	}

	if (dateTime.isAfter(now)) {
		return fail(400, { message: 'Last slip date cannot be in the future.' });
	}

	if (dateTime.isBefore(anchorDateTime)) {
		return fail(400, { message: 'Last slip date must be after anchor date.' });
	}

	const slipDateValues = {
		id: generateId(),
		date,
		time,
		trackerId
	};

	try {
		await db.insert(slipDate).values(slipDateValues);
	} catch {
		return fail(500, { message: 'Failed to create tracker entry.' });
	}
}
