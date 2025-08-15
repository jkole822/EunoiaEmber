CREATE TYPE "public"."polarity" AS ENUM('positive', 'negative');--> statement-breakpoint
ALTER TABLE "freedomListItem" ADD COLUMN "polarity" "polarity" NOT NULL;