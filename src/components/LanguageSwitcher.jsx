"use client";
import { Button } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const language = getCookie("NEXT_LOCALE");
  const router = useRouter();
  const SwitchLanguage = async (val) => {
    const locale = val === "en" ? "ar" : "en";
    setCookie("NEXT_LOCALE", locale);
    (await import(`../messages/${locale}.json`)).default;
    router.refresh();
  };
  return (
    <div>
      <Button onClick={() => SwitchLanguage(language)}>
        {language === "en" ? "عربي" : "English"}
      </Button>
    </div>
  );
}
