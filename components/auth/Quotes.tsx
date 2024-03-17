import { Roboto_Slab } from "next/font/google";
import * as Types from "@/components/types";

const roboto_Slab = Roboto_Slab({ subsets: ["latin"] });

// const getPosts = async (): Promise<String> => {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await data.json();

//   return posts;
// };

export const AuthQuotes = () => {
//   const data = getPosts();

  return (
    <div className="flex items-center justify-center h-full">
      <svg
        className="-top-16 relative z-0 leading-none text-foreground-muted/30"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 24 24"
      >
        <path
          fill="#2a4680"
          d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179"
        />
      </svg>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <blockquote
          className={`text-3xl font-semibold z-3 text-slate-800 ${roboto_Slab.className}`}
        >
          {/* {data} */}
          Empower your projects with Restpads REST API and efficient database.
        </blockquote>
      </div>
    </div>
  );
};
