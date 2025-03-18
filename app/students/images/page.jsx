"use client"; // Pastikan ini client component karena ada useState & useEffect

import { useState, useEffect } from "react";
import Image from "next/image";
import CloudinaryUploader from "@/app/components/cloudinaryUploader";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/cloudinary")
      .then((res) => res.json())
      .then((data) => setImages(data.resources || []))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <main>
      <h1 className="text-5xl text-center mt-4">
        Next JS Cloudinary Integration
      </h1>

      <CloudinaryUploader />

      <h2 className="text-3xl text-center mt-10 mb-2">
        {images.length === 1 ? "Uploaded Image" : "Uploaded Images"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 &&
          images.map((image) => (
            <div key={image.asset_id} className="container mx-auto max-w-screen-xl px-8">
              <Image
                className="flex flex-wrap justify-center"
                src={image.secure_url}
                height={image.height}
                width={image.width}
                alt="My cloudinary image"
                priority
              />
            </div>
          ))}
      </div>
    </main>
  );
}
