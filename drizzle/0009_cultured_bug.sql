ALTER TABLE "freedomListItem" DROP CONSTRAINT "freedomListItem_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "slip_date" DROP CONSTRAINT "slip_date_tracker_id_tracker_id_fk";
--> statement-breakpoint
ALTER TABLE "tracker" DROP CONSTRAINT "tracker_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "urge" DROP CONSTRAINT "urge_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "freedomListItem" ADD CONSTRAINT "freedomListItem_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slip_date" ADD CONSTRAINT "slip_date_tracker_id_tracker_id_fk" FOREIGN KEY ("tracker_id") REFERENCES "public"."tracker"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "urge" ADD CONSTRAINT "urge_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;