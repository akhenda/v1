CREATE TABLE "book-author" (
	"author_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	CONSTRAINT "book-author_book_id_author_id_pk" PRIMARY KEY("book_id","author_id")
);
--> statement-breakpoint
CREATE TABLE "book" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"genre" varchar(255) NOT NULL,
	"borrower_id" integer,
	"isbn" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" varchar(255) NOT NULL,
	"contact_phone" varchar(20) NOT NULL,
	"phone_verified" boolean DEFAULT false,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"confirmation_code" varchar(8),
	"password" text NOT NULL,
	"role" varchar(50) DEFAULT 'READER' NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_contact_phone_unique" UNIQUE("contact_phone"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
CREATE INDEX "book-author_book_id_idx" ON "book-author" USING btree ("book_id");--> statement-breakpoint
CREATE INDEX "book-author_author_id_idx" ON "book-author" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "book_borrower_id_idx" ON "book" USING btree ("borrower_id");--> statement-breakpoint
CREATE INDEX "book_isbn_idx" ON "book" USING btree ("isbn");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_phone_idx" ON "user" USING btree ("contact_phone");--> statement-breakpoint
CREATE INDEX "user_role_idx" ON "user" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "user_clerk_user_id_idx" ON "user" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "user_email_phone_idx" ON "user" USING btree ("email","contact_phone");