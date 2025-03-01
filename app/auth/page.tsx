import { AuthForm } from "@/components/auth/Form";
import { AuthQuotes } from "@/components/auth/Quotes";

async function getQuote(): Promise<any> {
  let quote = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Quotes?select=*`, {
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY + '',
      "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    },
    method: 'GET',
    cache: "force-cache",
  });
  
  quote = await quote.json();
  
  return quote;
}

export default async function AuthPage() {
  let data: any = await getQuote();
  data = data[Math.floor(Math.random() * data.length)];

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
