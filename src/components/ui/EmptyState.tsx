type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-navy-100 py-16 text-center">
      <p className="font-semibold text-navy-600">{title}</p>
      <p className="mt-2 text-sm text-navy-600/70">{description}</p>
    </div>
  );
}
