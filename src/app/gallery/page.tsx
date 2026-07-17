import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import YouTubeEmbed from "@/components/gallery/YouTubeEmbed";
import VideoGrid from "@/components/gallery/VideoGrid";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getGalleryImages } from "@/lib/firebase/gallery";
import { getChannelVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Gallery | BowlingKing",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [result, videos] = await Promise.all([getGalleryImages(), getChannelVideos(5)]);

  return (
    <>
      <PageHeader
        eyebrow="Photos & Videos"
        title="Gallery"
        description="볼링킹 회원들의 활동 모습을 만나보세요."
      />
      <Section>
        <div>
          <h2 className="mb-4 font-bold text-navy-600">영상</h2>
          <YouTubeEmbed />
          {videos.length > 0 && (
            <div className="mt-4">
              <VideoGrid videos={videos} />
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-bold text-navy-600">사진</h2>
          {result.status === "ok" && <GalleryGrid images={result.images} />}
          {result.status === "empty" && (
            <EmptyState
              title="아직 등록된 사진이 없습니다."
              description="곧 멋진 활동 사진들로 채워질 예정이에요!"
            />
          )}
          {result.status === "error" && <ErrorState title="갤러리를 불러오지 못했습니다." />}
        </div>
      </Section>
    </>
  );
}
