import Image from "next/image";
import { deleteGalleryImageAction } from "@/app/admin/(protected)/gallery/actions";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import type { GalleryImage } from "@/lib/types";

export default function GalleryManageList({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return <p className="text-sm text-navy-600/70">등록된 사진이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {images.map((image) => (
        <div key={image.id} className="space-y-2">
          <div className="aspect-square overflow-hidden rounded-xl">
            <Image
              src={image.url}
              alt={image.alt}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="truncate text-xs text-navy-600/70">{image.alt}</p>
          <form action={deleteGalleryImageAction}>
            <input type="hidden" name="id" value={image.id} />
            <input type="hidden" name="url" value={image.url} />
            <ConfirmSubmitButton
              confirmMessage="이 사진을 삭제할까요?"
              className="w-full rounded-full border border-ember-600 px-3 py-1.5 text-xs font-semibold text-ember-600 hover:bg-ember-50"
            >
              삭제
            </ConfirmSubmitButton>
          </form>
        </div>
      ))}
    </div>
  );
}
