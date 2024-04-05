import mercury from "@mercury-js/core";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { MercuryInstance } from "../graphql/route";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
dotenv.config();
// import AWS from "aws-sdk";

const client = new S3Client({
  region: process.env.AWS_REGION_KEY,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const name = data.get("name")!;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${name.toString().split(" ")[0]}_${uuidv4()}.${
        file.name.split(".")[1]
      }`,
      Body: Buffer.from(await file.arrayBuffer()),
      ACL: "public-read",
    });

    const res = await client.send(command);
    console.log(res);

    const asset = await MercuryInstance.db.Asset.create(
      {
        name: data.get("name"),
        type: file.type,
        altText: data.get("altText"),
        path: "gbhjnk",
        description: data.get("description"),
      },
      { profile: "ADMIN" }
    );
    return NextResponse.json({ success: true, asset }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
