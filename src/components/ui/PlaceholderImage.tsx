type PlaceholderImageProps = {
  label?: string;
  className?: string;
};

export default function PlaceholderImage({
  label = "사진 준비중",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-600 to-ember-600 text-white ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-10 w-10 opacity-80"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="14" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-sm font-medium opacity-90">{label}</span>
    </div>
  );
}
