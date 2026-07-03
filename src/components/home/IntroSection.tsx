import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const QUICK_LINKS = [
  {
    href: "/about",
    title: "동호회 소개",
    description: "볼링킹의 연혁, 활동 장소, 정기 모임 일정을 확인하세요.",
  },
  {
    href: "/gallery",
    title: "갤러리",
    description: "회원들의 생생한 활동 모습을 사진으로 만나보세요.",
  },
  {
    href: "/scores",
    title: "회원 점수 기록",
    description: "회원별 에버리지와 하이스코어를 확인할 수 있어요.",
  },
];

export default function IntroSection() {
  return (
    <Section>
      <h2 className="text-center text-2xl font-bold text-navy-600 sm:text-3xl">
        볼링킹을 소개합니다
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-navy-600/80">
        볼링킹은 신규 회원 모집부터 경기 일정 공유, 개인 기록 관리까지
        회원 간 소통과 실력 향상을 함께 지원하는 온라인 허브를 지향합니다.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-md">
              <h3 className="font-bold text-navy-600">{item.title}</h3>
              <p className="mt-2 text-sm text-navy-600/80">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
