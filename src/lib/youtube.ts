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

// 유튜브 RSS 피드가 채널당 간헐적으로 200 상태코드에 404 에러 페이지 본문을 실어 보내는 경우가 있어
// (실제 XML이 아닌 HTML 응답), 정상 XML을 받을 때까지 최대 3회 재시도
async function fetchFeedXml(retries = 3): Promise<string | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const xml = await res.text();
        if (xml.trimStart().startsWith("<?xml")) {
          return xml;
        }
      }
    } catch (error) {
      console.error(`[getChannelVideos] YouTube RSS 조회 실패 (시도 ${attempt + 1}/${retries}):`, error);
    }
  }

  return null;
}

export async function getChannelVideos(limit = 6): Promise<YouTubeVideo[]> {
  const xml = await fetchFeedXml();
  if (!xml) return [];

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
}
