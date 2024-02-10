import { usePathname, useSearchParams } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';
import "./Sidebar.css";

interface Props {
  visible: boolean;
}

interface Menu {
  id: number,
  name: string,
  icon: string,
  active?: boolean,
  to: string,
}

type Menus = Array<Menu>;

const menus: Menus = [
  {
    id: 0,
    name: "Dashboard",
    icon: "/menu-icons/dashboard.svg",
    to: "/app",
  },
  {
    id: 2,
    name: "Projects",
    icon: "/menu-icons/projects.svg",
    active: true,
    to: "/app/projects",
  },
  {
    id: 3,
    name: "Billing",
    icon: "/menu-icons/tasks.svg",
    to: "",
  },
  {
    id: 4,
    name: "Reporting",
    icon: "/menu-icons/reporting.svg",
    to: "",
  },
  {
    id: 5,
    name: "Users",
    icon: "/menu-icons/users.svg",
    to: "",
  },
  {
    id: 6,
    name: "Support",
    icon: "/menu-icons/support.svg",
    to: "",
  },
  {
    id: 7,
    name: "Settings",
    icon: "/menu-icons/settings.svg",
    to: "",
  },
];

export const Sidebar = (props: Props) => {
  const pathname = usePathname();
  

  return (
    <aside className={`absolute left-0 h-[calc(100dvh)] bg-[#101828] text-white w-[70vw] md:w-[35vw] lg:w-[30vw] xl:w-[15vw] border-r p-4 transition-transform duration-300 ease-in-out z-30 xl:static ${
      props.visible ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
    }`}>
      <Link href="/" className="logo font-semibold">💥 RestPad.io</Link>
      <div className="mt-6 flex flex-col justify-between h-[93%]">
        <ul>
          {menus.map((menu, i) => {
            return i <= 4 ? (
              <Link href={menu.to} key={i}>
              <li
                className={`menu cursor-pointer my-2 hover:bg-[#344054] pl-4 ${(pathname == menu.to || (pathname == '/app/api-builder' && menu.name == 'Projects')) ? 'active' : ''}`}
              >
                <Image width={24} height={24} src={menu.icon} alt={menu.name} />
                <span className="text-left text-[14px]">{menu.name}</span>
              </li>
              </Link>
            ) : (
              ""
            );
          })}
        </ul>

        <ul>
          {menus.map((menu, i) => {
            return i > 4 ? (
              <li
                className={`menu cursor-pointer my-2 hover:bg-[#344054] pl-4`}
                key={i}
              >
                <Image width={24} height={24} src={menu.icon} alt={menu.name} />
                <span className="text-left text-[14px]">{menu.name}</span>
              </li>
            ) : (
              ""
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
