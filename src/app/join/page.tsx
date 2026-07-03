import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactCard from "@/components/contact/ContactCard";

export const metadata: Metadata = {
  title: "가입 문의 | 볼링킹",
};

export default function JoinPage() {
  return (
    <Section>
      <div className="text-center">
        <h1 className="text-3xl font-black text-navy-600 sm:text-4xl">가입 문의</h1>
        <p className="mx-auto mt-3 max-w-xl text-navy-600/80">
          볼링킹은 언제나 새로운 회원을 환영합니다. 아래 연락처로 문의해 주세요.
        </p>
      </div>

      <div className="mt-10">
        <ContactCard />
      </div>
    </Section>
  );
}
