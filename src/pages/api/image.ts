import type { APIRoute } from "astro";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";
import mime from "mime";

const notfound = async () => {
  const file = await fs.open(`${IMAGE_DIRECTORY}/no_data.svg`);
  const notFound = await file.readFile();
  file.close();

  const body: BodyInit = new Uint8Array(notFound.buffer);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "image/svg",
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") as string;

  if (!path || path == "null") return await notfound();

  const file = await fs.open(`${IMAGE_DIRECTORY}${path}`);
  const image = await file.readFile();
  file.close();
  const mimetype = mime.getType(`${IMAGE_DIRECTORY}${path}`);
  const body: BodyInit = new Uint8Array(image.buffer);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": `${mimetype}`,
    },
  });
};
