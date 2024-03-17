"use client"
import { useState } from "react";
import Link from "next/link";
import { GithubAuthBtn } from "./GithubAuthBtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Types from "@/components/types";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="m-6 absolute top-0">
        <Link href="/" className="logo font-semibold">
          💥 RestPad.io
        </Link>
      </div>
      <div className="mx-16">
        <h1 className="text-3xl mb-2 font-bold text-[#232323]">{ isLogin ? 'Sign in' : 'Sign up' }</h1>
        <h2 className="text-sm text-[#969696]">
          Please { isLogin ? 'Sign in' : 'Sign up' } to continue to your account.
        </h2>

        <GithubAuthBtn isLogin={isLogin} />

        <div className="relative mt-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-strong"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 text-sm bg-white text-foreground">or</span></div></div>

        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="text"
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
            id="password"
            type="password"
            className="mt-2 mb-8 w-full border-2 bg-gray-50 border-gray-300 focus:border-blue-800"
          />
          <Button className="block w-full bg-[#2a4680] hover:bg-blue-950">
          { isLogin ? 'Sign in' : 'Sign up' }
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p>
            { isLogin ? "Don't have an account?" : 'Have an account?' }
            <span onClick={() => setIsLogin(!isLogin)} className="ml-1 text-blue-600 hover:text-blue-900 cursor-pointer">
              { isLogin ? 'Sign Up Now' : 'Log In Now' }
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
  );
};
