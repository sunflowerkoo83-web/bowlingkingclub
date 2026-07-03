export default function ScoreEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-navy-100 py-16 text-center">
      <p className="text-navy-600 font-semibold">아직 등록된 기록이 없습니다.</p>
      <p className="mt-2 text-sm text-navy-600/70">
        경기 결과가 입력되면 이곳에서 회원별 점수를 확인할 수 있어요.
      </p>
    </div>
  );
}
