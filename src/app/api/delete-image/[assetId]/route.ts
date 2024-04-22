import { NextRequest, NextResponse } from "next/server";
import { MercuryInstance } from "../../graphql/route";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";


const client = new S3Client({
  region: process.env.AWS_REGION_KEY,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "AKIAUGJSFTLHXBO2645E",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function DELETE(request: NextRequest, params: any) {
    try {
        const { assetId } = params.params;

        if (!assetId) {
            throw new Error("Asset ID is required.");
        }

        const asset = await MercuryInstance.db.Asset.get({ _id: assetId }, { profile: "ADMIN" });
        console.log(asset);


        if (!asset) {
            throw new Error("Asset not found.");
        }

        const command = new DeleteObjectCommand({
            Bucket: `${process.env.BUCKET_NAME}`,
            Key: asset?.path.split('/').splice(asset?.path.split('/').length - 2).join('/'),
        });

        await client.send(command);

        await MercuryInstance.db.Asset.delete(assetId, { profile: "ADMIN" });

        return NextResponse.json({ success: true, message: "Asset deleted successfully." }, { status: 200 });
    } catch (error: any) {
     }
}