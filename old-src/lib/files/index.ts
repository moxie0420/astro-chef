export type Fetcher = (
  file: string,
) => string | Blob | Promise<string> | Promise<Blob>;

export type Uploader = (
  file: Buffer,
  name: string,
) => boolean | Promise<boolean>;

/**
 * Fetch a file using the given fetcher()
 * @param file - The file you want to fetch
 * @param fetcher - The function used to fetch the file
 * @returns
 */
export async function fetchSingle(file: string, fetcher: Fetcher) {
  try {
    return await fetcher(file);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return;
  }
}

/**
 * Fetches files using the given fetcher()
 * @param files - An array containing the files you want to fetch
 * @param fetcher - The function used to fetch the file
 * @returns
 */
export async function fetchMultiple(files: string[], fetcher: Fetcher) {
  const promises = files.map(async (file) => await fetcher(file));
  return await Promise.all(promises);
}

/**
 * Upload a file using the given uploader()
 * @param file - The file you wish to upload
 * @param uploader - The function used to upload the file
 * @returns True if successful, false if not
 */
export async function uploadSingle(
  file: Buffer,
  name: string,
  uploader: Uploader,
) {
  return uploader(file, name);
}

/**
 * Fetches files using the given uploader()
 * @param files - An array containing the files you want to upload
 * @param name - The name of the file you are uploading
 * @param uploader - The function used to upload the files
 * @returns
 */
export async function uploadMultiple(
  files:
    | {
        data: Buffer<any>;
        name: string;
      }[]
    | Promise<{
        data: Buffer<any>;
        name: string;
      }>[],
  uploader: Uploader,
) {
  const res = files.map(async (file) =>
    uploader((await file).data, (await file).name),
  );
  return await Promise.all(res);
}
