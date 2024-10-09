"use client";
import React, { useState } from "react";
import PageHeading from "../../components/PageHeading";
import AddSubjectForm from "../../components/subject/AddSubjectForm";

const SubjectPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="m-6 flex flex-col gap-y-6">
      <PageHeading label="All Subjects" />
      <div
        className={`${isOpen && "grid grid-cols-3 gap-4"} ${!isOpen && " "}`}
      >
        <AddSubjectForm isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="bg-red-500 col-span-2">Item 2</div>
      </div>
    </div>
  );
};

export default SubjectPage;
