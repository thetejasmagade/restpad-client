"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
    console.log(data);
  
    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  })

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
