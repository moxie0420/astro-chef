CREATE TABLE `ingredients` (
	`Id` integer PRIMARY KEY NOT NULL,
	`Recipe` integer,
	`Title` text,
	`Amount` real,
	`Unit` text
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`Id` integer PRIMARY KEY NOT NULL,
	`Title` text,
	`Body` text,
	`Ingredient_ids` integer,
	`PrepTime` integer,
	`CookTime` integer
);
