import { supabase } from "@/app/lib/supabase";
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

export async function POST(req, res) {
  try {
    const reqData = await req.json();
    console.log('reqData:', reqData);
    const {data, error} = await supabase.from('images').insert(reqData);
    if (error) {
      console.error('Supabase Insert Error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
    console.log('data:', data);
    return Response.json({ message: 'Data inserted successfully', data }, { status: 201 });
  } catch (error) {
    console.error("Cloudinary Signature Error:", error);
    return Response.json({ error: "Failed to sign request" }, { status: 500 });
  }
}