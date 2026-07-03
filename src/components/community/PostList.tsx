import type { Post } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-2xl border border-navy-100 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-navy-600">{post.title}</h3>
            <span className="shrink-0 text-xs text-navy-600/60">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-sm text-navy-600/70">{post.name}</p>
          <p className="mt-3 whitespace-pre-wrap text-navy-600/90">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
