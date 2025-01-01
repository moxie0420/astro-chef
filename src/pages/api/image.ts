import type { APIRoute } from "astro";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";
import mime from "mime";

import No_Data from "src/icons/no_data.svg?raw";

const notfound = async () =>
  new Response(No_Data.toString(), {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });

const handleURL = (url: string) =>
  fetch(url)
    .then((res) => res)
    .catch(() => notfound());

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") as string;

  if (!path || path == "null") return await notfound();

  const isImage = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

  if (!isImage.test(path)) return await notfound();

  try {
    try {
      new URL(path);
      return await handleURL(path);
    } catch {}

    console.log(`opening ${path}`);
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
  } catch {
    return await notfound();
  }
};
