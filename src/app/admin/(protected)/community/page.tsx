import type { Metadata } from "next";
import ErrorState from "@/components/ui/ErrorState";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { getPosts } from "@/lib/firebase/posts";
import { deletePostAction } from "@/app/admin/(protected)/community/actions";

export const metadata: Metadata = {
  title: "게시판 관리 | 볼링킹",
};

export const dynamic = "force-dynamic";

export default async function AdminCommunityPage() {
  const result = await getPosts();
  const posts = result.status === "ok" ? result.posts : [];

  return (
    <div>
      <h1 className="text-2xl font-black text-navy-600">게시판 관리</h1>
      <p className="mt-2 text-sm text-navy-600/70">
        로그인 없이 누구나 작성 가능한 게시판입니다. 스팸/부적절한 글은 삭제해 주세요.
      </p>

      <div className="mt-8">
        <h2 className="mb-4 font-bold text-navy-600">게시글 목록 ({posts.length})</h2>
        {result.status === "error" ? (
          <ErrorState title="게시글 목록을 불러오지 못했습니다." />
        ) : posts.length === 0 ? (
          <p className="text-sm text-navy-600/70">등록된 게시글이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-navy-100 p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-navy-600">{post.title}</p>
                  <p className="text-sm text-navy-600/70">{post.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-navy-600/60">{post.content}</p>
                </div>
                <form action={deletePostAction} className="shrink-0">
                  <input type="hidden" name="id" value={post.id} />
                  <ConfirmSubmitButton
                    confirmMessage="이 글을 삭제할까요?"
                    className="min-h-[44px] rounded-full border border-ember-600 px-3 text-xs font-semibold text-ember-600 hover:bg-ember-50"
                  >
                    삭제
                  </ConfirmSubmitButton>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
