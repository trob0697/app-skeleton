CREATE TABLE "Users" (
	"id" text PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"image_url" text NOT NULL,
	"subscription_end" timestamp NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
