"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
};

export default function ImageCarousel({
  images,
  alt,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) {
    return (
      <div className="flex h-56 items-center justify-center bg-gray-100 text-gray-400">
        No image
      </div>
    );
  }

  return (
    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
      <Image
        src={images[current]}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrent(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrent((prev) => (prev + 1) % images.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full ${
                  index === current ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
