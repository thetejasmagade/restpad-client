"use client";
import { useState, FormEvent, useEffect, useMemo } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { GithubAuthBtn } from "./GithubAuthBtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerifyMailModal from "./VerifyMailModal";
import * as Types from "@/components/types";

export const AuthForm = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullPageloading, setfullPageloading] = useState<boolean>(true);
  const [authFields, setAuthFields] = useState<Types.AuthFields>({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [verifyModal, setverifyModal] = useState<Types.VerifyMailModal>({
    isModalOpen: false,
    email: "",
  });

  useEffect(() => {
    getUserFromSupabase();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (type: Types.AuthField, value: string) => {
    const fieldToUpdate = type === Types.AuthField.Email ? "email" : "password";
    setAuthFields((authFields) => ({
      ...authFields,
      [fieldToUpdate]: value,
    }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    const res = await supabase.auth.signUp({
      ...authFields,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    console.log("signupclick", res);
    if (res.error) toast.error(res.error.message);
    else {
      if (res.data && res.data.user) {
        if (res.data.user.identities && res.data.user.identities.length > 0) {
          console.log("Sign-up successful!");
          setverifyModal({
            isModalOpen: true,
            email: res.data.user.email || "",
          });
        } else {
          toast.error("Email address is already taken.");
          resetFields();
        }
      }
    }
    resetFields();
    // if(user) router.push('/app')

    // router.refresh();
  };

  const handleSignIn = async () => {
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({
      ...authFields,
    });
    console.log("Login", res);
    setLoading(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    } else {
      if (res.data.session) router.push("/app");
    }
    resetFields();
    // router.refresh();
  };

  const getUserFromSupabase = async () => {
    // const { error } = await supabase.auth.signOut()
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("onload", user);

    if (user?.user_metadata?.email_verified) {
      setUser(user);
      router.push("/app");
    }
    setfullPageloading(false);
  };

  const resetFields = () => {
    setAuthFields({
      email: "",
      password: "",
    });
  };

  const checkValidations = useMemo((): boolean => {
    if (authFields.email && authFields.password) {
      return true;
    } else {
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authFields]);

  return (
    <>
      <div className="h-full flex flex-col justify-center">
        <div className="m-6 absolute top-0">
          <Link href="/" className="logo font-semibold">
            💥 RestPad.io
          </Link>
        </div>
        <div className="mx-16">
          <h1 className="text-3xl mb-2 font-bold text-[#232323]">
            {isLogin ? "Sign in" : "Sign up"}
          </h1>
          <h2 className="text-sm text-[#969696]" onClick={resetFields}>
            Please {isLogin ? "Sign in" : "Sign up"} to continue to your
            account.
          </h2>

          <GithubAuthBtn isLogin={isLogin} />

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-strong"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-sm bg-white text-foreground">or</span>
            </div>
          </div>

          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email</label>
            <Input
              onInput={(e: FormEvent<HTMLInputElement>) =>
                handleChange(Types.AuthField.Email, e.currentTarget.value)
              }
              id="email"
              type="text"
              value={authFields.email}
              className="mt-2 mb-4 w-full border-2 bg-gray-50 border-gray-300 focus:border-blue-800"
            />
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <Link
                href="/forgot-password"
                className={`text-xs text-blue-600 hover:text-blue-900`}
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              onInput={(e: FormEvent<HTMLInputElement>) =>
                handleChange(Types.AuthField.Password, e.currentTarget.value)
              }
              id="password"
              type="password"
              value={authFields.password}
              className="mt-2 mb-8 w-full border-2 bg-gray-50 border-gray-300 focus:border-blue-800"
            />
            <Button
              onClick={isLogin ? handleSignIn : handleSignUp}
              className={`block w-full bg-[#2a4680] hover:bg-blue-950 ${
                checkValidations ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <Image
                    src="/loading-spinner.svg"
                    width="20"
                    height="20"
                    alt="loading-spinner"
                  />
                ) : (
                  <span>{isLogin ? "Sign in" : "Sign up"}</span>
                )}
              </div>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p>
              {isLogin ? "Don't have an account?" : "Have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 hover:text-blue-900 cursor-pointer"
              >
                {isLogin ? "Sign Up Now" : "Log In Now"}
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-xs text-center mt-6 w-[90%]">
              By proceeding, you acknowledge and agree to the{" "}
              <Link
                href="/terms-conditions"
                className="text-blue-600 hover:text-blue-900 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-conditions"
                className="text-blue-600 hover:text-blue-900 underline"
              >
                Privacy Policy
              </Link>{" "}
              of our platform.
            </p>
          </div>
        </div>
      </div>
      <VerifyMailModal
        isModalOpen={verifyModal.isModalOpen}
        email={verifyModal.email}
      />
    </>
  );
};
