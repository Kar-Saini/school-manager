"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbDashboard } from "react-icons/tb";

interface SubMenu {
  label: string;
  icon: React.ReactNode;
  key: string;
}
interface DesktopSidebarMenuItem extends SubMenu {
  submenu?: SubMenu[];
}

const DESKTOP_SIDEBAR_ITEMS: DesktopSidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: <TbDashboard />,
    key: "1",
    submenu: [
      { label: "Dashboard", icon: <TbDashboard />, key: "11" },
      { label: "Dashboard", icon: <TbDashboard />, key: "12" },
      { label: "Dashboard", icon: <TbDashboard />, key: "13" },
    ],
  },
  { label: "Dashboard", icon: <TbDashboard />, key: "2" },
];

const DesktopSidebar = () => {
  const [openItem, setOpenItem] = useState<string>("1");
  const toggleOpenMenu: (key: string) => void = (key: string) => {
    if (openItem === key) setOpenItem("0");
    else setOpenItem(key);
  };
  console.log(openItem);
  return (
    <div className="w-[180px] h-full flex flex-col">
      <div className="w-full  flex items-center justify-between text-xl p-2">
        <div>Logo</div>
        <div>
          <GiHamburgerMenu />
        </div>
      </div>
      <div>
        {DESKTOP_SIDEBAR_ITEMS.map((item) => (
          <DesktopSidebarItems
            key={item.key}
            label={item.label}
            icon={item.icon}
            toggleOpenMenu={toggleOpenMenu}
            keyValue={item.key}
            isOpen={openItem === item.key}
            subMenu={item.submenu}
          />
        ))}
      </div>
    </div>
  );
};

function DesktopSidebarItems({
  label,
  icon,
  toggleOpenMenu,
  keyValue,
  isOpen,
  subMenu,
}: {
  label: string;
  icon: React.ReactNode;
  toggleOpenMenu: (key: string) => void;
  keyValue?: string;
  isOpen?: boolean;
  subMenu?: SubMenu[] | undefined;
}) {
  return (
    <div>
      <div
        className="w-full bg-blue-800 p-2 flex justify-between items-center shadow-md border border-black"
        onClick={() => toggleOpenMenu(keyValue as string)}
      >
        <div className="text-yellow-300 text-xl flex gap-2 items-center">
          {icon}
          <p className="text-xs font-semibold text-neutral-300 tracking-wider">
            {label}
          </p>
        </div>

        {subMenu?.length > 1 && isOpen ? (
          <MdOutlineKeyboardArrowDown />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </div>
      <div className="ml-4">
        {isOpen &&
          subMenu &&
          subMenu.map((item) => (
            <DesktopSidebarItems
              key={item.key}
              label={item.label}
              icon={item.icon}
              toggleOpenMenu={toggleOpenMenu}
              keyValue={item.key}
            />
          ))}
      </div>
    </div>
  );
}
export default DesktopSidebar;
