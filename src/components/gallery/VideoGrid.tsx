import Image from "next/image";
import type { YouTubeVideo } from "@/lib/youtube";

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
      {videos.map((video) => (
        <a
          key={video.videoId}
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-100">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 24 24" fill="white" className="h-10 w-10 drop-shadow">
                <path d="M8 5v14l11-7Z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-navy-600">{video.title}</p>
        </a>
      ))}
    </div>
  );
}
