import { v4 as uuid } from 'uuid'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import * as FileSystem from 'expo-file-system';
import { Buffer } from "buffer"


const s3Client = new S3Client({
  apiVersion: "2006-03-01",
  region: process.env.EXPO_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.EXPO_PUBLIC_SECRET_KEY,
  },
});

export async function uploadImage(uri: string) {
  const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const arrayBuffer = Buffer.from(fileData, 'base64');
  const imageName = uuid();
  const imageFormat = uri.split(".").pop();
  const command = new PutObjectCommand({

    Bucket: process.env.EXPO_PUBLIC_BUCKET_NAME,
    Key: imageName,
    Body: arrayBuffer,
    ContentType: `image/${imageFormat}`
  });

  try {
    await s3Client.send(command);
    const publicUrl = `https://${process.env.EXPO_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${imageName}`;
    return publicUrl;

  } catch (error) {
    console.error("error while uploading file:",error);
    return false;
  }
};