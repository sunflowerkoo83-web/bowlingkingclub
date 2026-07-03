import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import NoticeList from "@/components/community/NoticeList";
import PostForm from "@/components/community/PostForm";
import PostList from "@/components/community/PostList";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getNotices } from "@/lib/firebase/notices";
import { getPosts } from "@/lib/firebase/posts";

export const metadata: Metadata = {
  title: "Community | BowlingKing",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const [noticesResult, postsResult] = await Promise.all([getNotices(), getPosts()]);

  return (
    <>
      <PageHeader
        eyebrow="Say Hello"
        title="Community"
        description="볼링킹 회원들과 자유롭게 이야기를 나눠보세요."
      />
      <Section>
        {noticesResult.status === "ok" && (
          <div className="mb-10">
            <h2 className="mb-4 font-bold text-navy-600">공지사항</h2>
            <NoticeList notices={noticesResult.notices} />
          </div>
        )}

        <h2 className="mb-4 font-bold text-navy-600">자유게시판</h2>
        <PostForm />

        <div className="mt-10">
          {postsResult.status === "ok" && <PostList posts={postsResult.posts} />}
          {postsResult.status === "empty" && (
            <EmptyState
              title="아직 등록된 글이 없습니다."
              description="첫 번째 글을 남겨보세요!"
            />
          )}
          {postsResult.status === "error" && (
            <ErrorState title="게시글을 불러오지 못했습니다." />
          )}
        </div>
      </Section>
    </>
  );
}
