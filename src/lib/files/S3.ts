import {
  S3_ACCESS_KEY,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_SECRET_KEY,
} from "astro:env/server";
import * as Minio from "minio";
import type { Fetcher, Uploader } from ".";

const client = new Minio.Client({
  endPoint: S3_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
});

/**
 * Represents whither the selected bucket exists
 * @returns true if the bucket exists, otherwise false
 */
export const doesBucketExist = (bucket?: string) =>
  client.bucketExists(bucket ?? S3_BUCKET);

/**
 * Fetch a presigned URL via the Minio S3 Client
 * @param file The file to fetch a url for
 * @returns
 */
export const getFileUrl = (file: string) =>
  client.presignedUrl("GET", S3_BUCKET, file);

/**
 * Fetch a file via the Minio S3 client
 * @param file - The file to fetch
 * @returns The requested file
 */
export const fetcher: Fetcher = async (file) => {
  if (!doesBucketExist(S3_BUCKET))
    throw new Error("The requested bucket was not found");
  const res = await client.getObject(S3_BUCKET, file);
  return new Blob(await res.toArray());
};

/**
 * Upload a file via the Minio S3 client
 * @param file - The file to upload
 * @returns true if successful, otherwise false
 */
export const uploader: Uploader = async (file, name) => {
  await client.putObject(S3_BUCKET, name, Buffer.from(file));
  return true;
};
