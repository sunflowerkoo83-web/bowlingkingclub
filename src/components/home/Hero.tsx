import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-navy-900 via-navy-600 to-ember-600">
      <svg
        className="absolute inset-0 h-full w-full opacity-10"
        aria-hidden="true"
      >
        <pattern
          id="bowling-pattern"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="4" fill="white" />
          <circle cx="40" cy="30" r="4" fill="white" />
          <circle cx="12" cy="46" r="4" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#bowling-pattern)" />
      </svg>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <Image
          src="/logo.png"
          alt={SITE_NAME}
          width={96}
          height={96}
          priority
          className="rounded-2xl bg-white/90 p-2 shadow-lg"
        />
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
          함께 굴리고, 함께 성장하는 볼링킹
        </h1>
        <p className="max-w-xl text-base text-white/90 sm:text-lg">
          은평가인볼링센터를 중심으로 활동하는 볼링 동호회, 볼링킹입니다.
          정기 모임과 경기, 서로의 실력 향상을 응원하는 따뜻한 커뮤니티에 함께해요.
        </p>
        <LinkButton href="/join" variant="primary" className="mt-2">
          가입 문의하기
        </LinkButton>
      </div>
    </div>
  );
}
