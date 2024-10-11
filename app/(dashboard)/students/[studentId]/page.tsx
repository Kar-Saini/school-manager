"use client";
import PageHeading from "@/app/components/PageHeading";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type StudentPageProps = {
  params: {
    studentId: string;
  };
};

interface StudentData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  sex: string;
  role: string;
  dob: string;
  admissionDate: string;
  bloodGroup: string;
  parentId: string;
  classId: string;
}
const StudentDataHeader: { header: string; key: keyof StudentData }[] = [
  { header: "Student Id", key: "id" },
  { header: "Name", key: "name" },
  { header: "Class", key: "classId" },
  { header: "Email", key: "email" },
  { header: "Username", key: "username" },
  { header: "Sex", key: "sex" },
  { header: "DOB", key: "dob" },
  { header: "Admission Date", key: "admissionDate" },
  { header: "Blood Group", key: "bloodGroup" },
  { header: "Parent", key: "parentId" },
];

const StudentPage = ({ params }: StudentPageProps) => {
  const { studentId } = params;
  const [studentData, setStudentData] = useState<StudentData | null>();
  useEffect(() => {
    async function getStudentData() {
      if (studentId) {
        try {
          const result = await axios.get(`/api/student/${studentId}`);
          setStudentData(result.data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    }
    getStudentData();
  }, [studentId]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-6 flex flex-col gap-y-6 ">
      <PageHeading label="Student" />
      <div className="bg-gray-200 py-4 px-6 flex flex-col gap-y-4 rounded-md">
        <h1 className="text-xl font-semibold">About Me</h1>
        <div className="flex gap-6">
          <div className=" p-2 ">
            {studentData["sex"] === "Male" ? (
              <Image
                src="/male.png"
                width={300}
                height={150}
                alt="male"
                className="rounded-full shadow-xl p-1 bg-gray-400"
              />
            ) : (
              <Image
                src="/female.png"
                width={300}
                height={150}
                alt="female"
                className="rounded-full shadow-xl"
              />
            )}
          </div>
          <div className="px-4 flex flex-col gap-y-2">
            <h1 className="text-xl font-semibold">{studentData["name"]}</h1>
            <table>
              <tbody className="p-2">
                {StudentDataHeader.map((item) => (
                  <tr key={item.key}>
                    <td className="px-4 py-2 text-gray-600">{item.header} :</td>
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {studentData[item.key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
