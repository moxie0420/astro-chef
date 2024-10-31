import { db, Recipe } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Recipe).values([
		{title: "Test Recipe", author: "Moxie", body: "# this is a header\nthis is a paragraph"},
		{title: "Test Recipe Number 2", author: "Moxie"}
	]);
}
