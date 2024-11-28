import { db, Recipe } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Recipe).values([
		{
			title: "Test Recipe",
			author: "Moxie",
			body: "# this is a header\ni can put whatever",
			cookTime: "2 Minutes"
		},
		{ title: "Test Recipe Number 2", author: "Moxie" }
	]);
}
