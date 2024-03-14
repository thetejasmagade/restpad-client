import { AuthForm } from "@/components/auth/Form";
import { AuthQuotes } from "@/components/auth/Quotes";

export default function AuthPage() {
  return (
    <>
      <div className="flex items-center justify-between min-h-screen">
        <div className="w-[40%] h-screen">
          <AuthForm />
        </div>
        <div className="w-[70%] h-screen bg-slate-100">
          <AuthQuotes />
        </div>
      </div>
    </>
  );
}
