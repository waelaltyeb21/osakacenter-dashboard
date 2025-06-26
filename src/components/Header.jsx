"use client";
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { links } from "./Sidebar";
import { IconPower } from "@tabler/icons-react";

export default function Header({ locale }) {
  const [opened, { toggle }] = useDisclosure();
  // const supervisor = JSON.parse(window.localStorage.getItem("Supervisor")) || "";
  const supervisor = "Wael Altyeb";
  // Translations
  const t = useTranslations("Welcome");
  const TLinks = useTranslations("sidebar");

  // Logout
  const LogOut = () => {
    deleteCookie("token");
    deleteCookie("supervisor");
    console.log("Logout");
    redirect("/auth/login");
  };
  return (
    <section className="relative p-4 flex justify-between items-center">
      <article
        className={`bg-white shadow ${
          locale === "ar" ? "lg:md:mr-72" : "lg:md:ml-72"
        } p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center`}
      >
        <Burger className="lg:md:hidden" opened={opened} onClick={toggle} />
        <Drawer
          position="left"
          opened={opened}
          onClose={toggle}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          title="منصة اوساكا التعليمية"
        >
          <div className="">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="p-2 flex items-center mb-4 hover:bg-gray-300 transition-ease bordered"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-xl font-semibold capitalize whitespace-nowrap">
                  {TLinks(link.name)}
                </span>
              </Link>
            ))}
          </div>
        </Drawer>
        <h3 className="justify-self-start lg:text-xl font-semibold">
          <span>
            {t("greeting")}
            {supervisor}
          </span>
          {/* <span>✅</span> */}
        </h3>
        <div className="flex items-center gap-4 cursor-pointer">
          {/* <Avatar /> */}
          <IconPower onClick={LogOut} />

          <LanguageSwitcher />
        </div>
      </article>
      {/* <LanguageSwitcher />
        <ModeSwitcher /> */}
    </section>
  );
}
