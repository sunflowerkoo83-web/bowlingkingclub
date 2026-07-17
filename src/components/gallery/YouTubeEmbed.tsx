export default function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-navy-100">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="볼링킹 유튜브 영상"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
