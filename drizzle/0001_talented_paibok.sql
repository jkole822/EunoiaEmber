CREATE TABLE "tracker" (
	"id" text PRIMARY KEY NOT NULL,
	"anchor_date" text NOT NULL,
	"anchor_time" text NOT NULL,
	"last_slip_date" text NOT NULL,
	"last_slip_time" text NOT NULL,
	"slip_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
