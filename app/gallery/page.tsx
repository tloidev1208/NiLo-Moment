"use client";

import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-5 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/" className="text-xl mr-4">
          ←
        </Link>
        <h1 className="text-xl font-semibold">Lịch sử ảnh</h1>
      </div>

      {/* Grid ảnh giả */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-700 rounded-lg"
          />
        ))}
      </div>

     
    
      {/* <div className="flex flex-col items-center justify-center mt-20 opacity-60">
        <p>Chưa có ảnh nào</p>
      </div> */}

    </div>
  );
}
