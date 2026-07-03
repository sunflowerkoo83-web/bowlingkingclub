import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SITE_NAME, YOUTUBE_URL } from "@/lib/constants";

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
          가인볼링장 은평점을 중심으로 활동하는 볼링 동호회, 볼링킹입니다.
          정기 모임과 경기, 서로의 실력 향상을 응원하는 따뜻한 커뮤니티에 함께해요.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/join" variant="primary">
            가입 문의하기
          </LinkButton>
          <LinkButton
            href={YOUTUBE_URL}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2 bg-white/95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12Z" />
            </svg>
            유튜브 구독하기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
