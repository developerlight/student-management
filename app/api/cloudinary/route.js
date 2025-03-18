import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(req, res) {
  try {
    const images = await cloudinary.search
      .expression("smk/profil-siswa")
      .execute();
    console.log(images);
    return Response.json(images, { status: 200 });
  } catch (error) {
    console.error("Cloudinary Fetch Error:", error);
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
