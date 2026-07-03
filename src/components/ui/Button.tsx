import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-ember-600 text-white shadow-lg shadow-ember-900/20 hover:bg-ember-700 focus-visible:outline-ember-700",
  secondary:
    "bg-white text-navy-600 border border-navy-600 hover:bg-navy-50 focus-visible:outline-navy-600",
  // 어두운/컬러 배경(히어로 등) 위에 올리는 반투명 버튼
  ghost:
    "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-white",
};

const BASE_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
