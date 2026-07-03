import "server-only";
import { YOUTUBE_CHANNEL_ID } from "@/lib/constants";

export type YouTubeVideo = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
};

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getChannelVideos(limit = 6): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
    );

    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    return entries.slice(0, limit).map((entry) => {
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] ?? "";

      return {
        videoId,
        title: decodeXmlEntities(title),
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      };
    });
  } catch (error) {
    console.error("[getChannelVideos] YouTube RSS 조회 실패:", error);
    return [];
  }
}
