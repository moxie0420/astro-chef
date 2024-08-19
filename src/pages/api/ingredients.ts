import type { APIRoute } from "astro";
import {db} from "@lib/database" 

export const GET: APIRoute = async ({ params }) => {
  db.query("SELECT * FROM Ingredients WHERE Id=" + params.)
};
