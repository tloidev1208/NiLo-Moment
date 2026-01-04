"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    console.log(imageData);
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-black px-5">
      {/* Camera frame */}
      <div className="flex justify-center p-1 bg-amber-50 rounded-3xl shadow-lg">
        <div className="relative w-[90vw] max-w-sm aspect-square rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-around text-white bg-amber-50/10 p-4 rounded-3xl shadow-lg">
        <button onClick={() => router.push("/gallery")} className="text-2xl">
          🏝
        </button>

        <button
          onClick={takePhoto}
          className="w-16 h-16 rounded-full bg-white border-4 border-gray-400"
        />

        <button
          onClick={() =>
            setFacingMode((p) => (p === "user" ? "environment" : "user"))
          }
          className="text-2xl"
        >
          🔄
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
