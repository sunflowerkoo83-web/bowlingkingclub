type ErrorStateProps = {
  title: string;
  description?: string;
};

export default function ErrorState({
  title,
  description = "잠시 후 다시 시도해 주세요. 문제가 계속되면 운영진에게 문의해 주세요.",
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-ember-100 bg-ember-50 py-16 text-center">
      <p className="font-semibold text-ember-700">{title}</p>
      <p className="mt-2 text-sm text-navy-600/70">{description}</p>
    </div>
  );
}
