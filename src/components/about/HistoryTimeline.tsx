import { HISTORY } from "@/lib/club-info";

export default function HistoryTimeline() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-600">동호회 연혁</h2>
      <ol className="mt-6 space-y-6 border-l-2 border-navy-100 pl-6">
        {HISTORY.map((item) => (
          <li key={item.year} className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-ember-600" />
            <p className="text-sm font-bold text-ember-600">{item.year}</p>
            <p className="mt-1 text-navy-600/90">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
