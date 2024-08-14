import { NextRequest, NextResponse } from "next/server";
import { MercuryInstance } from "../graphql/route";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION_KEY,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "AKIAUGJSFTLHXBO2645E",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    console.log(file, "file");

    if (!file) {
      throw new Error("File not found");
    }
    const userId = data.get("userId");
    console.log(userId,"userId");
    const name = data.get("name");
    console.log(name,"name");


    if (!userId || !name) {
      throw new Error("userId or name is missing");
    }

    const userIdStr = userId.toString();
    const nameStr = name.toString();

    const user = await MercuryInstance.db.User.mongoModel.findById(userIdStr).populate("profile");

    if (!user) {
      throw new Error("User not found");
    }

    const existingProfile = user.profile;
    if (existingProfile) {
      console.log("Existing Profile ID:", existingProfile._id);
    }
    const fileKey = `profile/${nameStr.split(" ")[0]}_${uuidv4()}.${file.name.split(".")[1]}`;
    console.log("File Key:", fileKey);
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileKey,
      Body: Buffer.from(await file.arrayBuffer()),
      ACL: "public-read",
      ContentType: file.type,
    });
    await client.send(command);
    const profileData = {
      name: nameStr,
      type: file.type,
      path: `https://s3.${process.env.AWS_REGION_KEY}.amazonaws.com/${process.env.BUCKET_NAME}/${fileKey}`,
    };

    let profile;
    if (existingProfile) {
      existingProfile.set(profileData);
      profile = await existingProfile.save();
    } else {
      profile = await MercuryInstance.db.Profile.create(profileData, {
        profile: "ADMIN",
      });
      user.profile = profile._id;
      await user.save();
    }

    console.log("Profile:", profile);
    return NextResponse.json({ success: true, user, profile });
  } catch (error: any) {
    console.error("Error:", error);
    return new NextResponse(error.message, { statusText: error.message });
  }
}
