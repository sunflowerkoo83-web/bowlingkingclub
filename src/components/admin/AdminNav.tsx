import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

const ADMIN_LINKS = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/gallery", label: "갤러리 관리" },
  { href: "/admin/scores", label: "회원 프로필 관리" },
];

export default function AdminNav() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 pb-4">
      <nav className="flex flex-wrap gap-2">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="min-h-[44px] rounded-full px-4 text-sm font-medium leading-[44px] text-navy-600 hover:bg-navy-50"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction}>
        <button
          type="submit"
          className="min-h-[44px] rounded-full px-4 text-sm font-medium text-ember-600 hover:bg-ember-50"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
