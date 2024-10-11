import React from "react";
import { Sidebar } from "@/app/components/sidebar/Sidebar";
import Appbar from "@/app/components/Appbar";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full overflow-y-auto">
      <Sidebar>
        <Appbar />
        {children}
      </Sidebar>
    </main>
  );
};

export default StudentLayout;
