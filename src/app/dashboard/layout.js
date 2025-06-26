import AdminLayout from "@/Layout/AdminLayout";
import { MantineProvider } from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import React from "react";

export default async function DashboardLayout({ children }) {
  const AllCookies = await cookies();
  const locale = AllCookies.get("NEXT_LOCALE")?.value || "en";
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AdminLayout>{children}</AdminLayout>
      </MantineProvider>
    </NextIntlClientProvider>
  );
}
