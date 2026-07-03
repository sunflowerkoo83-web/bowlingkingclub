import type { Metadata } from "next";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import GalleryManageList from "@/components/admin/GalleryManageList";
import ErrorState from "@/components/ui/ErrorState";
import { getGalleryImages } from "@/lib/firebase/gallery";

export const metadata: Metadata = {
  title: "갤러리 관리 | 볼링킹",
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const result = await getGalleryImages();
  const images = result.status === "ok" ? result.images : [];

  return (
    <div>
      <h1 className="text-2xl font-black text-navy-600">갤러리 관리</h1>

      <div className="mt-6">
        <GalleryUploadForm />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-bold text-navy-600">등록된 사진 ({images.length})</h2>
        {result.status === "error" ? (
          <ErrorState title="사진 목록을 불러오지 못했습니다." />
        ) : (
          <GalleryManageList images={images} />
        )}
      </div>
    </div>
  );
}
