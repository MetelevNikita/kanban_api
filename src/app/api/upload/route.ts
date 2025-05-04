import { writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import sharp from "sharp";





export const POST = async (request: Request) => {

  const formData = await request.formData();
  const file: File | null = await formData.get('avatar') as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.name.split('.').pop()}`;
  const path = `public/uploads/avatar/${uniqueName}`;

  // resize

  sharp(buffer).resize({ width: 200 }).jpeg({ quality: 90 }).toFile(path);

  //

  if (!file) {
    return new NextResponse(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  await writeFile(path, buffer);

  console.log(`Uploaded ${file.name} with size ${file.size} bytes`)
  return new NextResponse(JSON.stringify({ message: `Uploaded ${file.name} with size ${file.size} bytes` }), { status: 200 })
}


