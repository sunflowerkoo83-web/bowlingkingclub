import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SITE_NAME, YOUTUBE_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-br from-ember-600/30 via-navy-600/20 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <pattern id="bowling-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="3" fill="white" />
          <circle cx="46" cy="34" r="3" fill="white" />
          <circle cx="14" cy="54" r="3" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#bowling-pattern)" />
      </svg>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <div className="rounded-full bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={88}
            height={88}
            priority
            className="rounded-full"
          />
        </div>

        <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75">
          가인볼링장 은평점 · 볼링 동호회
        </span>

        <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          함께 굴리고, 함께 성장하는 볼링킹
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          정기 모임과 경기, 서로의 실력 향상을 응원하는 따뜻한 커뮤니티에 함께해요.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/join" variant="primary">
            가입 문의하기
          </LinkButton>
          <LinkButton href={YOUTUBE_URL} variant="ghost" target="_blank" rel="noopener noreferrer">
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
