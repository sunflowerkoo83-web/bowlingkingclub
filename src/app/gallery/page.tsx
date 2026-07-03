import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "갤러리 | 볼링킹",
};

export default function GalleryPage() {
  return (
    <Section>
      <h1 className="text-3xl font-black text-navy-600 sm:text-4xl">갤러리</h1>
      <p className="mt-3 max-w-2xl text-navy-600/80">
        볼링킹 회원들의 활동 모습을 만나보세요.
      </p>

      <div className="mt-10">
        <GalleryGrid />
      </div>
    </Section>
  );
}
