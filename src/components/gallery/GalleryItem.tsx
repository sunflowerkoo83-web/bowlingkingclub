import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { GalleryImage } from "@/lib/types";

export default function GalleryItem({ src, alt }: GalleryImage) {
  return (
    <div className="aspect-square overflow-hidden rounded-xl">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ) : (
        <PlaceholderImage label={alt} className="h-full w-full" />
      )}
    </div>
  );
}
