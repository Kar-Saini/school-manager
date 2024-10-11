"use client";
import AllStudentTable from "@/app/components/student/AllStudentTable";
import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col m-4 p-4 gap-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      </div>
      <AllStudentTable />
      <div className="flex">
        <div>Students </div>
        <div>Calendar</div>
      </div>
    </div>
  );
};

export default page;
