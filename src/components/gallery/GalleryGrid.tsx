import GalleryItem from "@/components/gallery/GalleryItem";
import { GALLERY_IMAGES } from "@/lib/gallery-data";

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
      {GALLERY_IMAGES.map((image) => (
        <GalleryItem key={image.alt} {...image} />
      ))}
    </div>
  );
}
