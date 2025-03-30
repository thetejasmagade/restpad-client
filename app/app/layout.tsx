"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDefaultAppStore } from "@/store/useDefaultAppStore";
import { supabase } from "@/utils/supabaseClient";
import { Navbar } from "@/components/base/Navbar";
import { Sidebar } from "@/components/base/Sidebar";
import FullPageLoader from "@/components/base/FullPageLoader";
import { apiHandler } from "@/utils/apiHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { updateUserInfo } = useDefaultAppStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true);

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
      const userInfo = {
        id: user.id,
        email: user.user_metadata.email,
        fullName: user.user_metadata.display_name,
        plan: user.user_metadata.plan,
      };
      updateUserInfo(userInfo);
      if (user && user?.user_metadata?.first_login) {
        // WRITE LOGIC HERE WHAT TO DO WHEN USER COMES AT FIRST AFTER EMAIL VERIFICATION🔥🔥🔥
        const res = await apiHandler("user/add-user", {
          method: "POST",
          body: JSON.stringify({
            user_id: user.id,
            email: user.user_metadata.email,
            full_name: user.user_metadata.display_name,
            plan: user.user_metadata.plan,
          }),
        });
        if (res.status == 201) {
          await supabase.auth.updateUser({
            data: { first_login: false },
          });
        }
      }
      setFullPageLoading(false);
    }
    // THIS IS FAKE API REQUEST TO CHECK WHAT TO SEND NEW USER CREATION 🔥🔥🔥🔥
    // const { data, loading, error } = await apiHandler("", {
    //   method: "GET",
    // });
    // console.log(data, loading, error);
  };

  return (
    <>
      {fullPageLoading ? (
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
