import React from "react";
import Sidebar from "@/components/Sidebar";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "@/components/Header";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }) {
  const AllCookies = await cookies();
  const locale = AllCookies.get("NEXT_LOCALE")?.value || "en";
  return (
    <MantineProvider>
      
      <div className="Admin-Layout h-screen">
        {/* Sidebar */}
        <div className="sidebar-container lg:md:block hidden lg:md:fixed">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div
          className={`main-content ${
            locale == "ar" ? "lg:md:mr-[300px]" : "lg:md:ml-[300px]"
          }`}
        >
          <Header locale={locale} />
          <main className="p-8 mt-4">{children}</main>
        </div>
      </div>
    </MantineProvider>
  );
}
