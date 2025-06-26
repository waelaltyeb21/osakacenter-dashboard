"use client";
import { links } from "@/components/Sidebar";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("sidebar");
  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="p-4 flex flex-col justify-center items-center gap-4 hover:bg-gray-300 transition-ease bordered"
          >
            <span className="text-3xl">{link.icon}</span>
            <span className="text-xl font-semibold capitalize whitespace-nowrap">
              {t(link.name)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
