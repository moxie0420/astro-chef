import type { APIRoute } from "astro";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";
import mime from "mime";

const notfound = async () => {
  const file = await fs.open(`${IMAGE_DIRECTORY}/No_data.png`);
  const notFound = await file.readFile();
  file.close();
  return new Response(notFound.buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") as string;

  if (!path) return await notfound();

  const file = await fs.open(`${IMAGE_DIRECTORY}${path}`);
  const image = await file.readFile();
  file.close();
  const mimetype = mime.getType(`${IMAGE_DIRECTORY}${path}`);

  return new Response(image.buffer, {
    status: 200,
    headers: {
      "Content-Type": `${mimetype}`,
    },
  });
};
