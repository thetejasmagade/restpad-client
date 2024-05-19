import { useRouter } from "next/navigation";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { supabase } from "@/utils/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  handleSidebar(): unknown;
}

export const Navbar = (props: Props) => {
  const router = useRouter();
  const avatar = createAvatar(lorelei, {
    seed: "Tejas Magade",
    backgroundType: ["solid"],
    backgroundColor: ["ebebeb"],
  });

  const avatarSvg = avatar.toDataUriSync();


  const logOut = () => {
    supabase.auth.signOut();
    router.push('/auth');
  }

  return (
    <nav>
      <div className="bg-gray-50 flex items-center justify-between h-[6vh] xl:h-[8vh] px-4 py-1 border-b">
        <button onClick={props.handleSidebar} className="block xl:hidden">
          <Image
            src="/menu-icons/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
          />
        </button>
        <div className="search hidden md:block">
          <Input
            className="w-[381px] h-[34px] bg-[#efefef78] p-4 rounded-lg text-sm"
            type="text"
            placeholder="Search Something...."
          />
        </div>
        <div className="actions-parent flex items-center">
          <div className="name-plan-info flex flex-col mr-4">
            <span className="text-[12px] text-[#344054] font-semibold">
              Tejas Magade
            </span>
            <span className="text-[10px] text-right text-red-500 ">
              FREE Plan
            </span>
          </div>
          <div className="avatar" onClick={logOut}>
            <Avatar>
              <AvatarImage src={avatarSvg} />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};
