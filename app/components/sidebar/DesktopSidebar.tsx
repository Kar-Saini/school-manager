"use client";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { DESKTOP_SIDEBAR_ITEMS, SubMenu } from "./ustils";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DesktopSidebar = () => {
  const [openItem, setOpenItem] = useState<string>("1");
  const [collapse, setCollapse] = useState(false);

  const toggleOpenMenu: (key: string) => void = (key: string) => {
    if (openItem === key) setOpenItem("0");
    else setOpenItem(key);
  };
  return (
    <div
      className={`h-full hidden sm:flex flex-col bg-gray-800 w-[200px] ${
        collapse && "w-[60px]"
      }`}
    >
      <div className="flex items-center gap-2 bg-black px-2 relative h-[60px] border-b-[1px] border-white">
        {!collapse && (
          <div className="  flex items-center relative ">
            <Image src="/logo.jpeg" alt="Logo" width={100} height={150} />
          </div>
        )}
        <div className="text-neutral-300 hover:cursor-pointer hover:scale-105  hover:text-neutral-400 flex justify-center items-center px-2 transition-all duration-300">
          {!collapse ? (
            <GiHamburgerMenu
              className="text-4xl mt-2 transition-all duration-300 font-semibold transform"
              onClick={() => setCollapse(!collapse)}
            />
          ) : (
            <FaLongArrowAltRight
              className="text-2xl transition-all duration-300  transform"
              onClick={() => setCollapse(!collapse)}
            />
          )}
        </div>
      </div>
      <div>
        {DESKTOP_SIDEBAR_ITEMS.map((item) => (
          <DesktopSidebarItems
            key={item.key}
            label={item.label}
            icon={item.icon as React.ComponentType}
            toggleOpenMenu={toggleOpenMenu}
            keyValue={item.key}
            isOpen={openItem === item.key}
            subMenu={item.submenu}
            collapse={collapse}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

function DesktopSidebarItems({
  label,
  icon: Icon,
  toggleOpenMenu,
  keyValue,
  isOpen,
  subMenu,
  collapse,
  href,
}: {
  label: string;
  icon: React.ComponentType;
  toggleOpenMenu: (key: string) => void;
  keyValue?: string;
  isOpen?: boolean;
  subMenu?: SubMenu[] | undefined;
  collapse: boolean;
  href?: string;
}) {
  const router = useRouter();
  return (
    <>
      <div
        className={`w-full bg-gray-800 p-2 flex justify-between items-center shadow-md px-4  border-b-[1px] border-neutral-700
          hover:cursor-pointer hover:bg-gray-900 ${isOpen && "bg-gray-950"}`}
        onClick={() => toggleOpenMenu(keyValue as string)}
      >
        <div
          className="text-yellow-500 text-3xl flex gap-3 items-center"
          onClick={() => {
            if (!subMenu) {
              router.push(
                label.substring(1, 0).toLowerCase() + label.substring(1)
              );
            }
          }}
        >
          <Icon />
          {!collapse && (
            <p
              className="text-sm text-neutral-200 tracking-wider"
              onClick={() => {
                if (href) {
                  router.push(href);
                }
              }}
            >
              {label}
            </p>
          )}
        </div>
        {subMenu &&
          !collapse &&
          (subMenu && subMenu?.length > 1 && isOpen ? (
            <MdOutlineKeyboardArrowDown className="text-neutral-400" />
          ) : (
            <MdOutlineKeyboardArrowRight className="text-neutral-400" />
          ))}
      </div>
      {!collapse &&
        isOpen &&
        subMenu?.map((item) => (
          <DesktopSidebarSubMenuItem
            label={item.label}
            key={item.key}
            href={item.href}
          />
        ))}
    </>
  );
}
export default DesktopSidebar;

function DesktopSidebarSubMenuItem({
  label,
  href,
}: {
  label: string;
  keyValue?: string;
  href?: string;
}) {
  const router = useRouter();
  return (
    <div
      className="w-full bg-gray-700 p-2 flex items-center shadow-md px-8 border-spacing-1
     border-neutral-500 border-b-[1px] hover:cursor-pointer hover:bg-gray-800"
    >
      <p
        className="text-xs text-neutral-200 tracking-wider"
        onClick={() => {
          if (href) {
            router.push(href);
          }
        }}
      >
        {label}
      </p>
    </div>
  );
}
