import React from "react";
import DesktopSidebar from "./DesktopSidebar";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full ">
      <DesktopSidebar />
      <main className="w-full bg-neutral-100 ">{children}</main>
    </div>
  );
};
