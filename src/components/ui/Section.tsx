import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
};

export default function Section({
  as: Tag = "section",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
