import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PostForm from "@/components/community/PostForm";
import PostList from "@/components/community/PostList";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getPosts } from "@/lib/firebase/posts";

export const metadata: Metadata = {
  title: "Community | BowlingKing",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const result = await getPosts();

  return (
    <Section>
      <h1 className="text-3xl font-black text-navy-600 sm:text-4xl">Community</h1>
      <p className="mt-3 max-w-2xl text-navy-600/80">
        볼링킹 회원들과 자유롭게 이야기를 나눠보세요.
      </p>

      <div className="mt-8">
        <PostForm />
      </div>

      <div className="mt-10">
        {result.status === "ok" && <PostList posts={result.posts} />}
        {result.status === "empty" && (
          <EmptyState
            title="아직 등록된 글이 없습니다."
            description="첫 번째 글을 남겨보세요!"
          />
        )}
        {result.status === "error" && <ErrorState title="게시글을 불러오지 못했습니다." />}
      </div>
    </Section>
  );
}
