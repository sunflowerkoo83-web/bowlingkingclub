import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import LocationCard from "@/components/about/LocationCard";
import ScheduleInfo from "@/components/about/ScheduleInfo";

export const metadata: Metadata = {
  title: "About | BowlingKing",
};

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-3xl font-black text-navy-600 sm:text-4xl">About</h1>
      <p className="mt-3 max-w-2xl text-navy-600/80">
        볼링킹은 가인볼링장 은평점을 중심으로 활동하는 볼링 동호회입니다.
        누구나 즐겁게 볼링을 배우고 함께 실력을 쌓아갈 수 있어요.
      </p>

      <div className="mt-12">
        <HistoryTimeline />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <LocationCard />
        <ScheduleInfo />
      </div>
    </Section>
  );
}
