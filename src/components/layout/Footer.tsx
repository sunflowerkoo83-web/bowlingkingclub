import { BOWLING_CENTER, SITE_NAME, SITE_NAME_EN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-white">
          {SITE_NAME} <span className="font-normal text-navy-100">{SITE_NAME_EN}</span>
        </p>
        <p className="mt-2 text-sm">
          활동 장소: {BOWLING_CENTER.name} · {BOWLING_CENTER.address}
        </p>
        <p className="mt-1 text-sm">문의: {BOWLING_CENTER.phone}</p>
        <p className="mt-6 text-xs text-navy-100/70">
          © {new Date().getFullYear()} {SITE_NAME_EN}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
