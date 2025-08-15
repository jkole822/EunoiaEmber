import { pgTable, integer, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const polarityEnum = pgEnum('polarity', ['positive', 'negative']);

export const freedomListItem = pgTable('freedomListItem', {
	id: text('id').primaryKey(),
	polarity: polarityEnum().notNull(),
	reason: text('reason').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const slipDate = pgTable('slip_date', {
	id: text('id').primaryKey(),
	date: text('date').notNull(),
	time: text('time').notNull(),
	trackerId: text('tracker_id')
		.notNull()
		.references(() => tracker.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const tracker = pgTable('tracker', {
	id: text('id').primaryKey(),
	anchorDate: text('anchor_date').notNull(),
	anchorTime: text('anchor_time').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const urge = pgTable('urge', {
	id: text('id').primaryKey(),
	date: text('data').notNull(),
	time: text('time').notNull(),
	intensity: integer('intensity').notNull(),
	notes: text('notes'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export type FreedomListItem = typeof freedomListItem.$inferSelect;
export type FreedomListItemInsert = typeof freedomListItem.$inferInsert;
export type Session = typeof session.$inferSelect;
export type SlipDate = typeof slipDate.$inferSelect;
export type SlipDateInsert = typeof slipDate.$inferInsert;
export type Tracker = typeof tracker.$inferSelect;
export type TrackerInsert = typeof tracker.$inferInsert;
export type Urge = typeof urge.$inferSelect;
export type UrgeInsert = typeof urge.$inferInsert;
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
