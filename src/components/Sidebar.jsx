"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import {
  IconHome,
  IconSettings,
  IconUser,
  IconBook,
  IconDatabase,
  IconArticle,
  IconCertificate,
  IconUsersGroup,
  IconUsers,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import logo from "../../public/osaka-logo.png";
import Image from "next/image";

export const links = [
  {
    name: "overview",
    href: "/dashboard",
    icon: <IconHome size={20} className="inline ml-2" />,
  },
  {
    name: "students",
    href: "/dashboard/students",
    subLinks: ["/create"],
    icon: <IconUsers size={20} className="inline ml-2" />,
  },
  {
    name: "groups",
    href: "/dashboard/groups",
    subLinks: ["/create"],
    icon: <IconUsersGroup size={20} className="inline ml-2" />,
  },
  {
    name: "courses",
    href: "/dashboard/courses",
    icon: <IconCertificate size={20} className="inline ml-2" />,
  },
  {
    name: "blogs",
    href: "/dashboard/blogs",
    icon: <IconArticle size={20} className="inline ml-2" />,
  },
  {
    name: "magazines",
    href: "/dashboard/magazines",
    icon: <IconBook size={20} className="inline ml-2" />,
  },
  {
    name: "results",
    href: "/dashboard/results",
    icon: <IconDatabase size={20} className="inline ml-2" />,
  },
  {
    name: "profile",
    href: "/dashboard/profile",
    icon: <IconUser size={20} className="inline ml-2" />,
  },
  // {
  //   name: "settings",
  //   href: "/settings",
  //   icon: <IconSettings size={20} className="inline ml-2" />,
  // },
];

export default function Sidebar() {
  const t = useTranslations("sidebar");
  const tt = useTranslations("Welcome");
  const path = usePathname();
  return (
    <aside className="p-4 border-l-2 border-slate-200 h-screen">
      <Image
        src={logo}
        alt={tt("platform")}
        style={{ width: "auto", height: "auto", objectFit: "cover" }}
        priority
      />
      <nav className="mt-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center p-2 rounded-md capitalize font-semibold ${
                  path.includes(link.href)
                    ? "bg-blue-500 text-gray-900"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {link.icon}
                <span className="ml-2">{t(link.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
