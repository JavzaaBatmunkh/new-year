import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    // ✅ Await params
    const { folder } = await params;

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 30);

    const photosDir = path.join(process.cwd(), "public", "cdn", folder);

    if (!fs.existsSync(photosDir)) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    const files = fs.readdirSync(photosDir);
    files.sort(); // optional

    const start = (page - 1) * limit;
    const end = start + limit;
    const pageFiles = files.slice(start, end);

    const images = pageFiles.map((name) => `/cdn/${folder}/${name}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
