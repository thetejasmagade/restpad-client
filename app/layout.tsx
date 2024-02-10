"use client"
import type { Metadata } from "next";
import { useState } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/base/Navbar";
import "./globals.css";
import { Sidebar } from "@/components/base/Sidebar";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarHandler = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  const closeSidebarHandler = () => {
    if(isSidebarOpen) sidebarHandler();
    else return;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar visible={isSidebarOpen} />
          <div onClick={closeSidebarHandler} className={`w-full min-h-screen xl:w-[85vw] ${isSidebarOpen ? 'bg-black xl:bg-current opacity-20 xl:opacity-0' : ''}`}>
            <Navbar handleSidebar={sidebarHandler} />
            <main className="p-4 static">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
