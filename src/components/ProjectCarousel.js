"use client";

import { Carousel } from "antd";
import Image from "next/image";

export default function ProjectCarousel({ images }) {
  return (
    <div className="rounded-2xl overflow-hidden project-card w-full">
      <Carousel autoplay dots>
        {images.map((src, i) => (
          <div key={i}>
            <div className="relative w-full h-[160px] sm:h-[220px] md:h-[340px] lg:h-[420px] max-h-[60vh]">
              <Image
                src={src}
                alt={`Project screenshot ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}


