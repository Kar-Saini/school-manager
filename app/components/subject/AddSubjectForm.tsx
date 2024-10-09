"use client";
import React, { useEffect, useState } from "react";
import AddSubjectFormInput from "./AddSubjectFormInput";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const AddSubjectForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (flag: boolean) => void;
}) => {
  const [subjectName, setSubjectName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function getClassesData() {
      const getClasses = await axios("/api/class");
      setClasses(getClasses.data.classesArray);
    }
    getClassesData();
  }, []);

  async function handleSubmit() {
    if (subjectName !== "" && classValue !== "") {
      const result = await axios.post("/api/subject", {
        subjectName,
        classValue,
      });
      console.log(result);
    }
  }

  function handleReset() {
    setSubjectName("");
    setClassValue("");
  }

  function handleSubjectNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubjectName(event.target.value);
  }

  function handleClassValueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setClassValue(event.target.value);
  }

  return isOpen ? (
    <div className="col-span-1 flex flex-col bg-neutral-200 justify-center p-2 rounded-md py-2">
      <div className="flex flex-col gap-y-4 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Add new subject</h1>
          <IoMdClose
            className="text-xl font-semibold text-neutral-400 hover:scale-105 hover:cursor-pointer hover:text-neutral-600 transition"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <AddSubjectFormInput
          label="Subject Name"
          value={subjectName}
          onChangeFunction={handleSubjectNameChange}
        />
        <div className="flex flex-col gap-y-2">
          <label htmlFor="class">Class</label>
          <select
            name="class"
            id="class"
            className="rounded-md outline-none px-2 py-2"
            value={classValue}
            onChange={handleClassValueChange}
          >
            <option value="">Select Class</option>
            {classes &&
              classes.map((classVal) => (
                <option key={classVal.id} value={classVal.label}>
                  {classVal.label}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center gap-4">
          <ButtonElement label="Submit" onClickFunction={handleSubmit} />
          <ButtonElement label="Reset" onClickFunction={handleReset} />
        </div>
      </div>
    </div>
  ) : (
    <button
      className="bg-neutral-200 inline-block mb-6 px-2 py-1 rounded-md  hover:scale-105 hover:bg-neutral-300 transition "
      onClick={() => setIsOpen(true)}
    >
      Add Subject
    </button>
  );
};
export default AddSubjectForm;

function ButtonElement({
  label,
  onClickFunction,
}: {
  label: string;
  onClickFunction: () => void;
}) {
  return (
    <button
      className="bg-neutral-800 text-neutral-200 py-1 px-2 rounded-md hover:scale-105 transition"
      onClick={onClickFunction}
    >
      {label}
    </button>
  );
}
