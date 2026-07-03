import GalleryItem from "@/components/gallery/GalleryItem";
import type { GalleryImage } from "@/lib/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
      {images.map((image) => (
        <GalleryItem key={image.id} {...image} />
      ))}
    </div>
  );
}
