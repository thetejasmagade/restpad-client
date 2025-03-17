"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDefaultAppStore } from "@/store/useDefaultAppStore";
import { supabase } from "@/utils/supabaseClient";
import { Navbar } from "@/components/base/Navbar";
import { Sidebar } from "@/components/base/Sidebar";
import FullPageLoader from "@/components/base/FullPageLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { updateUserInfo } = useDefaultAppStore();
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
    else {
      console.log(user);
      updateUserInfo({
        id: user.id,
        email: user.user_metadata.email,
        fullName: user.user_metadata.display_name,
        plan: user.user_metadata.plan,
      });
      if (user && user?.user_metadata?.first_login) {
        // WRITE LOGIC HERE WHAT TO DO WHEN USER COMES AT FIRST AFTER EMAIL VERIFICATION🔥🔥🔥
        await supabase.auth.updateUser({
          data: { first_login: false },
        });
      }
      setLoading(false);
    }
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
