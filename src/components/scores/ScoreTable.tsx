import type { Member } from "@/lib/types";

export default function ScoreTable({ members }: { members: Member[] }) {
  return (
    <div>
      {/* 데스크톱: 표 형태 */}
      <table className="hidden w-full text-left md:table">
        <thead>
          <tr className="border-b border-navy-100 text-sm text-navy-600/70">
            <th className="py-3 pr-4">순위</th>
            <th className="py-3 pr-4">이름</th>
            <th className="py-3 pr-4">에버리지</th>
            <th className="py-3 pr-4">하이스코어</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} className="border-b border-navy-50">
              <td className="py-3 pr-4 font-bold text-ember-600">{index + 1}</td>
              <td className="py-3 pr-4 text-navy-600">{member.name}</td>
              <td className="py-3 pr-4 text-navy-600">{member.average}</td>
              <td className="py-3 pr-4 text-navy-600">{member.highScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모바일: 카드 스택 */}
      <ul className="space-y-3 md:hidden">
        {members.map((member, index) => (
          <li
            key={member.id}
            className="flex items-center justify-between rounded-xl border border-navy-100 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-ember-600">{index + 1}</span>
              <span className="font-semibold text-navy-600">{member.name}</span>
            </div>
            <div className="text-right text-sm text-navy-600/80">
              <p>에버리지 {member.average}</p>
              <p>하이스코어 {member.highScore}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
