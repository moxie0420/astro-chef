import type { APIRoute } from "astro";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";
import mime from "mime";
import sharp from "sharp";

const notfound = async () => {
  const file = await fs.open(`${IMAGE_DIRECTORY}/No_data.png`);
  const notFound = await file.readFile();

  file.close();

  const body: BodyInit = await sharp(notFound).unflatten().toBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") as string;

  if (!path || path == "null") return await notfound();

  const isImage = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

  if (!isImage.test(path)) return await notfound();

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
