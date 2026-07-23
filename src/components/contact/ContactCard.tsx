import Card from "@/components/ui/Card";
import { BOWLING_CENTER, BAND_URL, KAKAO_ID } from "@/lib/constants";

export default function ContactCard() {
  return (
    <Card className="mx-auto max-w-md text-center">
      <h2 className="text-xl font-bold text-navy-600">
        {BOWLING_CENTER.name}로 문의해 주세요
      </h2>
      <p className="mt-2 text-navy-600/80">
        볼링킹 가입을 원하시면 아래 연락처로 문의 주시면
        자세히 안내해 드립니다.
      </p>

      <div className="mt-6 space-y-3">
        <a
          href={`tel:${BOWLING_CENTER.phone.replace(/-/g, "")}`}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ember-600 px-6 font-semibold text-white transition-colors hover:bg-ember-700"
        >
          {BOWLING_CENTER.phone} 전화하기
        </a>
        <a
          href={BAND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-navy-600 px-6 font-semibold text-navy-600 transition-colors hover:bg-navy-50"
        >
          네이버 밴드에서 만나기
        </a>
        <div className="flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#FEE500] px-6 font-semibold text-[#3C1E1E]">
          카카오톡 ID: {KAKAO_ID}
        </div>
        <p className="text-sm text-navy-600/70">{BOWLING_CENTER.address}</p>
      </div>
    </Card>
  );
}
