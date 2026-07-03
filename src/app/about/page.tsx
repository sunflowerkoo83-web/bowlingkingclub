import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import LocationCard from "@/components/about/LocationCard";
import ScheduleInfo from "@/components/about/ScheduleInfo";

export const metadata: Metadata = {
  title: "About | BowlingKing",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Club"
        title="About"
        description="볼링킹은 가인볼링장 은평점을 중심으로 활동하는 볼링 동호회입니다. 누구나 즐겁게 볼링을 배우고 함께 실력을 쌓아갈 수 있어요."
      />
      <Section>
        <HistoryTimeline />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <LocationCard />
          <ScheduleInfo />
        </div>
      </Section>
    </>
  );
}
