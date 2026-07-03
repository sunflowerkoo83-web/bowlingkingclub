import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인 | 볼링킹",
};

export default function AdminLoginPage() {
  return (
    <Section>
      <div className="mx-auto max-w-sm">
        <h1 className="text-2xl font-black text-navy-600">관리자 로그인</h1>
        <p className="mt-2 text-sm text-navy-600/70">운영진만 접근할 수 있습니다.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </Section>
  );
}
