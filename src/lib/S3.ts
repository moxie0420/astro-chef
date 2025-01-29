import { S3_ACCESS_KEY, S3_ENDPOINT, S3_SECRET_KEY } from "astro:env/server";
import { fileTypeFromBlob } from "file-type";
import * as Minio from "minio";

class MinioHandler {
  minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: S3_ENDPOINT,
      port: 9000,
      useSSL: false,
      accessKey: S3_ACCESS_KEY,
      secretKey: S3_SECRET_KEY,
    });
  }

  public doesBucketExist = (bucket: string) =>
    this.minioClient.bucketExists(bucket);

  fetchSingle = async (name: string, bucket: string) =>
    await this.minioClient.getObject(bucket, name);

  uploadSingle = async (currentFile: File, bucket: string) => {
    const name = currentFile.name;
    const metadata: Minio.ItemBucketMetadata = {
      "Content-Type": `${(await fileTypeFromBlob(currentFile))?.mime}`,
    };
    const buffer = Buffer.from(await currentFile.arrayBuffer());
    return this.minioClient.putObject(
      bucket,
      name,
      buffer,
      buffer.length,
      metadata,
    );
  };

  uploadMultiple = async (files: File[], bucket: string) =>
    await Promise.resolve(files.map((file) => this.uploadSingle(file, bucket)));
}

const S3 = new MinioHandler();

export default S3;
