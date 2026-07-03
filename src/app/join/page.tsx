import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import ContactCard from "@/components/contact/ContactCard";

export const metadata: Metadata = {
  title: "Join | BowlingKing",
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Started"
        title="Join"
        description="볼링킹은 언제나 새로운 회원을 환영합니다. 아래 연락처로 문의해 주세요."
      />
      <Section>
        <ContactCard />
      </Section>
    </>
  );
}
