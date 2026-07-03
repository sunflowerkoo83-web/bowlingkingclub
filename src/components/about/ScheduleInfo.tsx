import Card from "@/components/ui/Card";
import { REGULAR_MEETING } from "@/lib/club-info";

export default function ScheduleInfo() {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-navy-600">정기 모임 일정</h2>
      <dl className="mt-4 space-y-2 text-navy-600/90">
        <div className="flex gap-2">
          <dt className="font-semibold">주기</dt>
          <dd>{REGULAR_MEETING.frequency}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">시간</dt>
          <dd>{REGULAR_MEETING.time}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-navy-600/60">{REGULAR_MEETING.note}</p>
    </Card>
  );
}
