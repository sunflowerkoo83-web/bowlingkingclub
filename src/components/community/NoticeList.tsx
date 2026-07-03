import type { Notice } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticeList({ notices }: { notices: Notice[] }) {
  return (
    <div className="space-y-3">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="rounded-2xl border border-ember-100 bg-ember-50/50 p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-ember-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              공지
            </span>
            <span className="shrink-0 text-xs text-navy-600/60">
              {formatDate(notice.createdAt)}
            </span>
          </div>
          <h3 className="mt-2 font-bold text-navy-600">{notice.title}</h3>
          <p className="mt-2 whitespace-pre-wrap text-navy-600/80">{notice.content}</p>
        </div>
      ))}
    </div>
  );
}
