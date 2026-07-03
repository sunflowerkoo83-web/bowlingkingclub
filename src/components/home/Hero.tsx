import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SITE_NAME, YOUTUBE_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-navy-900">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-40"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/90 to-navy-900"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <div className="rounded-full border border-gold-400/40 bg-white/5 p-3 backdrop-blur">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={80}
            height={80}
            priority
            className="rounded-full"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">
          가인볼링장 은평점 · 볼링 동호회
        </p>

        <h1 className="font-serif max-w-2xl text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
          함께 굴리고,
          <br />
          함께 성장하는 볼링킹
        </h1>

        <div className="h-px w-16 bg-gold-400/50" aria-hidden="true" />

        <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          정기 모임과 경기, 서로의 실력 향상을 응원하는 따뜻한 커뮤니티에 함께해요.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
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
