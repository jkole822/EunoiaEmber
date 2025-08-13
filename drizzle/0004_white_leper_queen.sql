CREATE TABLE "urge" (
	"id" text PRIMARY KEY NOT NULL,
	"data" text NOT NULL,
	"time" text NOT NULL,
	"intensity" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "urge" ADD CONSTRAINT "urge_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;