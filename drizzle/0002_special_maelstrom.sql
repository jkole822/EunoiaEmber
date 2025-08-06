ALTER TABLE "tracker" ALTER COLUMN "last_slip_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tracker" ALTER COLUMN "last_slip_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tracker" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;