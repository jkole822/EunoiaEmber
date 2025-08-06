CREATE TABLE "slip_date" (
	"id" text PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"tracker_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "slip_date" ADD CONSTRAINT "slip_date_tracker_id_tracker_id_fk" FOREIGN KEY ("tracker_id") REFERENCES "public"."tracker"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracker" DROP COLUMN "last_slip_date";--> statement-breakpoint
ALTER TABLE "tracker" DROP COLUMN "last_slip_time";--> statement-breakpoint
ALTER TABLE "tracker" DROP COLUMN "slip_count";