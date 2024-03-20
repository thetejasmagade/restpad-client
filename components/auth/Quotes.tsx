import { Roboto_Slab } from "next/font/google";
import * as Types from "@/components/types";

const roboto_Slab = Roboto_Slab({ subsets: ["latin"] });

export function AuthQuotes(props: Types.QuotesProps) {
  return (
    // <div className="flex items-center justify-center h-full">
    // <svg
    //   className="-top-16  z-0 leading-none text-foreground-muted/30"
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="80"
    //   height="80"
    //   viewBox="0 0 24 24"
    // >
    //   <path
    //     fill="#2a4680"
    //     d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179"
    //   />
    // </svg>
    // <div className="w-1/2 flex flex-col items-center justify-center">
    //   <blockquote
    //     className={`text-3xl font-semibold z-3 text-slate-800 ${roboto_Slab.className}`}
    //   >
    //     {props.quote}
    //   </blockquote>
    // </div>
    // </div>

    // <div className="flex items-center justify-center h-full">
    //   <div className="relative flex items-center justify-center">
    //     <svg
    //       className="absolute -top-12 left-40 z-0 leading-none text-foreground-muted/30"
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="80"
    //       height="80"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         fill="#2a4680"
    //         d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179"
    //       />
    //     </svg>
    //     <div className="w-1/2 flex flex-col items-center justify-center">
    //       <blockquote
    //         className={`text-3xl font-semibold z-3 text-slate-800 ${roboto_Slab.className}`}
    //       >
    //         {props.quote}
    //       </blockquote>
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center h-full">
      <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
        <div className="relative flex flex-col gap-6">
          <div className="absolute select-none -top-14 -left-16">
            <span className="text-[160px] leading-none text-foreground-muted/30">
              <svg
                className="z-0 leading-none text-foreground-muted/30"
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
            </span>
          </div>
          <blockquote className={`z-10 max-w-lg text-3xl ${roboto_Slab.className}`}>
            {props.quote}
          </blockquote>
        </div>
      </aside>
    </div>
  );
}
