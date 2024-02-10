"use client";
import { useState } from "react";
import { Navbar } from "@/components/base/Navbar";
import { Sidebar } from "@/components/base/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarHandler = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarHandler = () => {
    if (isSidebarOpen) sidebarHandler();
    else return;
  };

  return (
    <div className="flex">
      <Sidebar visible={isSidebarOpen} />
      <div
        onClick={closeSidebarHandler}
        className={`w-full h-[calc(100dvh)] xl:w-[85vw] ${
          isSidebarOpen ? "bg-black xl:bg-current opacity-20 xl:opacity-0" : ""
        }`}
      >
        <Navbar handleSidebar={sidebarHandler} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
