"use client";
import AllStudentTable from "@/app/components/student/AllStudentTable";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-4 bg-gray-200 rounded-sm flex flex-col gap-y-4">
        <h1 className="text-xl font-semibold ">All Students Data</h1>
        <AllStudentTable />
      </div>
      <div className="flex">
        <div>Students </div>
        <div>Calendar</div>
      </div>
    </div>
  );
};

export default page;
