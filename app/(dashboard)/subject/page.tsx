"use client";
import React, { useState } from "react";
import PageHeading from "../../api/components/PageHeading";
import AddSubjectForm from "../../api/components/subject/AddSubjectForm";
import AllSubjectTable from "@/app/api/components/subject/AllSubjectTable";

const SubjectPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="m-6 flex flex-col gap-y-6">
      <PageHeading label="All Subjects" />
      <div
        className={`${isOpen && "grid grid-cols-3 gap-4"} ${!isOpen && " "}`}
      >
        <AddSubjectForm isOpen={isOpen} setIsOpen={setIsOpen} />
        <AllSubjectTable />
      </div>
    </div>
  );
};

export default SubjectPage;
