import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Types from "@/components/types";

export const AuthForm = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="m-6 absolute top-0">
        <Link href="/" className="logo font-semibold">
          💥 RestPad.io
        </Link>
      </div>
      <div className="mx-16">
        <h1 className="text-3xl mb-2 font-bold text-[#232323]">Sign in</h1>
        <h2 className="text-sm text-[#969696]">
          Please login to continue to your account.
        </h2>

        <form className="mt-8">
          <label>Email</label>
          <Input
            type="text"
            className="mt-2 mb-4 w-full border-2 border-gray-300 focus:border-blue-800"
          />
          <label>Password</label>
          <Input
            type="password"
            className="mt-2 mb-8 w-full border-2 border-gray-300 focus:border-blue-800"
          />
          <Button className="block w-full bg-[#2a4680] hover:bg-blue-950">Sign In</Button>
        </form>
        <div className="border mt-7"></div>
      </div>
    </div>
  );
};
