"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { Navbar } from "@/components/base/Navbar";
import { Sidebar } from "@/components/base/Sidebar";
import FullPageLoader from "@/components/base/FullPageLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const sidebarHandler = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarHandler = () => {
    if (isSidebarOpen) sidebarHandler();
    else return;
  };

  useEffect(() => {
    getUserFromSupabase();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserFromSupabase = async () => {
    // const { error } = await supabase.auth.signOut()
    // setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) router.push("/auth");
    else setLoading(false);
  };

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <div className="flex">
          <Sidebar visible={isSidebarOpen} handleSidebar={sidebarHandler} />
          <div
            onClick={closeSidebarHandler}
            className={`w-full h-[calc(100dvh)] xl:w-[85vw] ${
              isSidebarOpen ? "" : ""
            }`}
          >
            <Navbar handleSidebar={sidebarHandler} />
            <main className="p-4">{children}</main>
          </div>
        </div>
      )}
    </>
  );
}
