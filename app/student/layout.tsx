import React from "react";
import { Sidebar } from "../components/Sidebar";
import Appbar from "../components/Appbar";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <main className=" h-full w-full">
        <Appbar />
        {children}
      </main>
    </Sidebar>
  );
};

export default StudentLayout;
