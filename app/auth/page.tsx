import { AuthForm } from "@/components/auth/Form";
import { AuthQuotes } from "@/components/auth/Quotes";


async function getQuote(): Promise<any> {
  let quote = await fetch(`${process.env.CLIENT_SIDE_API_URL}api/quotes`, { cache: 'no-store' });
  quote = await quote.json();

  return quote;
}

export default async function AuthPage() {
  const data = await getQuote();

  return (
    <>
      <div className="flex items-center justify-between min-h-screen">
        <div className="w-[40%] h-screen">
          <AuthForm />
        </div>
        <div className="w-[70%] h-screen bg-slate-100">
          <AuthQuotes quote={data.quote} />
        </div>
      </div>
    </>
  );
}
