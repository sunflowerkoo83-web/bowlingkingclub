import { YOUTUBE_UPLOADS_PLAYLIST_ID } from "@/lib/constants";

export default function YouTubeEmbed() {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-navy-100">
      <iframe
        src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_UPLOADS_PLAYLIST_ID}`}
        title="볼링킹 유튜브 영상"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
