type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="bg-navy-900">
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-white/70">{description}</p>
        )}
      </div>
    </div>
  );
}
