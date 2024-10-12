"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface StudentDataType {
  name: string;
  email: string;
  username: string;
  password: string;
  sex: string;
  rollNo: string;
  dob: string;
  admissionNumber: string;
  bloodGroup?: string;
  admissionDate: string;
  bio?: string;
}
const AdmissionForm = () => {
  const [studentData, setStudentData] = useState<StudentDataType>({
    name: "",
    email: "",
    username: "",
    password: "",
    sex: "Male",
    rollNo: "",
    dob: "",
    admissionNumber: "",
    admissionDate: "",
    bloodGroup: "",
    bio: "",
  });

  function handleReset() {
    setStudentData({
      name: "",
      email: "",
      username: "",
      password: "",
      sex: "Male",
      rollNo: "",
      dob: "",
      admissionNumber: "",
      admissionDate: "",
      bloodGroup: "",
      bio: "",
    });
  }
  async function handleSubmit() {
    console.log(studentData);
    const result = await axios.post("/api/student", studentData);
    console.log(result);
    if (result.data.status === 200) {
      toast.success(result.data.message);
      handleReset();
    } else {
      toast.error(result.data.message);
    }
  }

  function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setStudentData({ ...studentData, [name]: value });
  }

  function handleOnSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setStudentData({ ...studentData, [name]: value });
  }
  console.log(studentData);
  return (
    <div className="bg-gray-200 px-2">
      <h1 className="mx-2 p-2 text-lg font-semibold">Add New Student</h1>
      <div className="grid grid-cols-4">
        <StudentFormInputBox
          id="name"
          name="name"
          placeholder="Full Name"
          type="text"
          onChange={handleOnInputChange}
          value={studentData?.name}
          required={true}
        />
        <StudentFormInputBox
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          onChange={handleOnInputChange}
          value={studentData?.email}
          required={true}
        />
        <StudentFormInputBox
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          onChange={handleOnInputChange}
          value={studentData?.username}
        />
        <StudentFormInputBox
          id="dob"
          name="dob"
          placeholder="Date Of Birth"
          type="Date"
          onChange={handleOnInputChange}
          value={studentData?.dob}
          required={true}
        />
        <StudentFormInputBox
          id="rollNo"
          name="rollNo"
          placeholder="Roll Number"
          type="text"
          onChange={handleOnInputChange}
          value={studentData?.rollNo}
          required={true}
        />
        <StudentFormSelectBox
          id="sex"
          name="sex"
          onChange={handleOnSelectChange}
          placeholder="Sex"
          options={["Male", "Female"]}
          value={studentData.sex}
          required={true}
        />
        <StudentFormInputBox
          id="admissionNumber"
          name="admissionNumber"
          placeholder="Admission Number"
          type="text"
          onChange={handleOnInputChange}
          value={studentData?.admissionNumber}
          required={true}
        />
        <StudentFormInputBox
          id="bloodGroup"
          name="bloodGroup"
          placeholder="Blood Group"
          type="text"
          onChange={handleOnInputChange}
          value={studentData.bloodGroup as string}
        />
        <StudentFormInputBox
          id="admissionDate"
          name="admissionDate"
          placeholder="Admission Date"
          type="Date"
          onChange={handleOnInputChange}
          value={studentData?.admissionDate}
          required={true}
        />
      </div>
      <div className="flex flex-col m-2 p-2 gap-y-2">
        <label htmlFor="bio" className="text-lg">
          Short Bio{" "}
          <span className="text-sm text-gray-500">
            (mention interests, hoobies)
          </span>
        </label>
        <textarea
          name="bio"
          id="bio"
          className="outline-none focus:cursor-auto p-1 h-32 w-80"
        />
      </div>
      <div className=" m-2 p-2  gap-4 flex text-lg font-semibold">
        <button
          className="py-2 px-4 rounded-md bg-yellow-500  hover:bg-blue-950 hover:text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="py-2 px-6 rounded-md bg-blue-950 text-white hover:bg-yellow-500 hover:text-black"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AdmissionForm;
const StudentFormInputBox = ({
  name,
  id,
  placeholder,
  value,
  onChange,
  type,
  required,
}: {
  name: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col m-2 p-2 gap-y-2">
      <label htmlFor={id} className="text-lg">
        {placeholder}
        {required && " *"}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 rounded-sm outline-none"
      />
    </div>
  );
};

const StudentFormSelectBox = ({
  name,
  id,
  placeholder,
  value,
  onChange,
  options,
  required,
}: {
  name: string;
  options: string[];
  id: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="flex flex-col m-2 p-2 gap-y-2">
      <label htmlFor={id} className="text-lg">
        {placeholder}
        {required && " *"}
      </label>
      <select
        className="p-2"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        {placeholder}
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};
