set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."entries" (
	"entryId" serial NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"rating" float4 NOT NULL,
	"reviews" integer NOT NULL,
	"city" TEXT NOT NULL,
	"price" TEXT NOT NULL,
	"categories" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"phone" TEXT NOT NULL,
	"yelpUrl" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
