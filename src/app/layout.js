import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "flag-icons/css/flag-icons.min.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { Cairo } from "next/font/google";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Notifications } from "@mantine/notifications";

const cairo = Cairo({
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Osaka Center Platform",
  description: "E-learning platform for Osaka Center",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  // Get Mode From Cookies
  const PageDirection = locale === "ar" ? "rtl" : "ltr";
  const messages = (await import(`../messages/${locale}.json`)).default;
  return (
    <html lang={locale} dir={PageDirection} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        {/* Viewport => disable zoom */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Theme color */}
        <meta
          name="theme-color"
          content="#339af0"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1A1B1E"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${cairo.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications />
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
