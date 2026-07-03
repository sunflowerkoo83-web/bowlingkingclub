import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

export default function GalleryItem({ url, alt }: GalleryImage) {
  return (
    <div className="aspect-square overflow-hidden rounded-xl">
      <Image
        src={url}
        alt={alt}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
