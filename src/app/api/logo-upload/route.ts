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

  const path = `./public/assets/logo.png`;

  await writeFile(path, buffer);

  return NextResponse.json({ success: true });
}
