import { writeFile } from "fs/promises";
import sharp from "sharp";


//






export const uploadImageHandler = async (file: File) => {


  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.name.split('.').pop()}`;
  const path = `public/uploads/avatar/${uniqueName}`;

  // resize

  sharp(buffer).resize({ width: 300 }).jpeg({ quality: 90 }).toFile(path);

  //

  if (!file) {
    return new Error;
  }

  await writeFile(path, buffer);

  console.log(`Uploaded ${file.name} with size ${file.size} bytes`)
  return uniqueName;
}


