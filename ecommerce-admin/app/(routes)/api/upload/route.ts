import { NextResponse } from 'next/server';
import mime from 'mime-types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
const bucketName = process.env.S3_BUCKET_NAME;

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  const ext = fileName.split('.').pop();
  const newFilename = Date.now() + '.' + ext;

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentType: 'image/jpg',
    })
  );

  return newFilename;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // console.log('form data', formData);

    const links = [];

    for (let [_, file] of formData) {
      if (!file) {
        return NextResponse.json(
          { error: 'No files received.' },
          { status: 400 }
        );
      }
      if (file instanceof File) {
        // console.log({ ext, file });
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = await uploadFileToS3(buffer, file.name);

        const link = `https://${bucketName}.s3.amazonaws.com/${filename}`;
        links.push(link);
      }
      return NextResponse.json({ success: true, links });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading file' });
  }
}
