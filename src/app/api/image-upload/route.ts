import mercury from "@mercury-js/core";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { MercuryInstance } from "../graphql/route";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const name = data.get("name")!;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/assets/uploads/${
    name.toString().split(" ")[0]
  }_${uuidv4()}.${file.name.split(".")[1]}`;

  await writeFile(path, buffer);
  const fePath = path.split("/").splice(2).join("/");

  const asset = await MercuryInstance.db.Asset.create(
    {
      name: data.get("name"),
      type: file.type,
      altText: data.get("altText"),
      path: fePath,
      description: data.get("description"),
    },
    { profile: "ADMIN" }
  );
  return NextResponse.json({ success: true, asset });
}
