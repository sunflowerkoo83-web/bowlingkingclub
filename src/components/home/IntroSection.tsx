import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const QUICK_LINKS = [
  {
    href: "/about",
    title: "동호회 소개",
    description: "볼링킹의 연혁, 활동 장소, 정기전 일정을 확인하세요.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-10.5h.008v.008H12v-.008Zm0 3v3.75"
      />
    ),
  },
  {
    href: "/gallery",
    title: "갤러리",
    description: "회원들의 생생한 활동 모습을 사진으로 만나보세요.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75 8.4 9.6a2.4 2.4 0 0 1 3.4 0l6.45 6.45m-3.9-3.9 1.8-1.8a2.4 2.4 0 0 1 3.4 0l1.8 1.8M3.75 4.5h16.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Zm9.75 5.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    ),
  },
  {
    href: "/scores",
    title: "회원 프로필",
    description: "회원별 구력, 스타일, 에버리지와 하이스코어를 확인할 수 있어요.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
      />
    ),
  },
  {
    href: "/community",
    title: "커뮤니티",
    description: "자유롭게 글을 남기고 회원들과 이야기를 나눠보세요.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 10.5h7.5m-7.5 3h4.5m4.5-9H4.5a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h3v3.75l4.773-3.75H19.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z"
      />
    ),
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="group block h-full">
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-ember-100 group-hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50 text-ember-600 transition-colors group-hover:bg-ember-600 group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-navy-600">{item.title}</h3>
              <p className="mt-2 text-sm text-navy-600/80">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
