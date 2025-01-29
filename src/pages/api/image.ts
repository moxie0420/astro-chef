import S3 from "@lib/S3";
import type { APIRoute } from "astro";
import { fileTypeFromBuffer } from "file-type";
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const req = await request.formData();
    const files = req.values();
    const body = files.map((val) => val as File);

    const bucket = "astro-chef";

    if (!S3.doesBucketExist(bucket)) throw new Error("Bucket does not exist");
    await S3.uploadMultiple(body.toArray(), bucket);

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return new Response(null, { status: 500 });
  }
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") as string;

  if (!path || path == "null") return await notfound();

  const isImage = /[/.](gif|jpg|jpeg|tiff|png)$/i;

  if (!isImage.test(path)) return await notfound();

  try {
    // fetch image
    const res = await S3.fetchSingle(path, "astro-chef");

    const body = await res.toArray();

    const mime = await fileTypeFromBuffer(Buffer.from(body));

    if (res.closed || res.errored || !mime) throw new Error("Image Not Found");

    return new Response(new Blob(body), {
      status: 200,
      headers: {
        "Content-Type": mime.mime,
      },
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return await notfound();
  }
};
