import Image from "next/image";
import type { Member } from "@/lib/types";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-navy-50 px-3 py-2 text-center">
      <p className="text-xs text-navy-600/60">{label}</p>
      <p className="font-bold text-navy-600">{value}</p>
    </div>
  );
}

export default function MemberProfileCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col rounded-2xl border border-navy-100 p-5">
      <div className="flex items-center gap-4">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-ember-600 text-xl font-bold text-white">
            {member.name.slice(0, 1)}
          </div>
        )}
        <div>
          <p className="text-lg font-bold text-navy-600">{member.name}</p>
          <p className="text-sm text-navy-600/70">
            {[member.experience, member.bowlingStyle].filter(Boolean).join(" · ") || "정보 없음"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatTile label="에버" value={String(member.average)} />
        <StatTile label="하이점수" value={String(member.highScore)} />
        <StatTile
          label="평균 구속"
          value={member.avgBallSpeed !== undefined ? `${member.avgBallSpeed}km/h` : "-"}
        />
        <StatTile label="평균 RPM" value={member.avgRpm !== undefined ? String(member.avgRpm) : "-"} />
      </div>

      {(member.strengths || member.weaknesses || member.notes) && (
        <dl className="mt-4 space-y-1 text-sm text-navy-600/80">
          {member.strengths && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-navy-600">장점</dt>
              <dd>{member.strengths}</dd>
            </div>
          )}
          {member.weaknesses && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-navy-600">단점</dt>
              <dd>{member.weaknesses}</dd>
            </div>
          )}
          {member.notes && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-navy-600">특이사항</dt>
              <dd>{member.notes}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
