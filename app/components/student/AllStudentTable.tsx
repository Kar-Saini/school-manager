import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterComponent from "../filter/FilterComponent";
type Student = {
  id: string;
  name: string;
  email: string;
  dob: string;
  sex: string;
  bloodGroup: string;
  admissionDate: string;
};
const columns = [
  { header: "Student ID", key: "id" },
  { header: "Photo", key: "photo" },
  { header: "Name", key: "name" },
  { header: "Sex", key: "sex" },
  { header: "Roll No.", key: "rollNo" },
  { header: "Class", key: "class" },
  { header: "Section", key: "section" },
  { header: "Email", key: "email" },
  { header: "DOB", key: "dob" },
  { header: "Blood Group", key: "bloodGroup" },
  { header: "Admission Date", key: "admissionDate" },
];
export interface SearchFilters {
  name: string;
  class: string;
  sex: "Male" | "Female";
}
const AllStudentTable = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: "",
    class: "",
    sex: "Male",
  });

  useEffect(() => {
    async function getStudentsData() {
      const studentData = await axios("/api/student");
      console.log(studentData);
      setStudentData(studentData.data.allStudents);
    }
    getStudentsData();
  }, []);
  return (
    <div className="flex flex-col gap-y-4">
      <FilterComponent
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
      />
      <div className="overflow-x-auto border-[1px] border-black">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-2 py-1 border-b bg-gray-200 text-left text-gray-600 font-semibold"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentData.length > 0 ? (
              studentData.map((row, rowIndex) => (
                <tr key={rowIndex} className=" hover:bg-gray-100">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-2 py-2 border-b text-gray-700 hover:cursor-pointer ${
                        col.key === "id" && "hover:underline"
                      }`}
                      onClick={() => {
                        router.push("/students/" + row.id);
                      }}
                    >
                      {col.key === "id"
                        ? row.id.slice(0, 8)
                        : row[col.key as keyof typeof row]}
                      {col.key === "photo" &&
                        (row["sex"] === "Male" ? (
                          <Image
                            src="/male.png"
                            width={30}
                            height={30}
                            alt="male"
                            className="rounded-full p-[2px] bg-blue-600 shadow-xl"
                          />
                        ) : (
                          <Image
                            src="/female.png"
                            width={30}
                            height={30}
                            alt="female"
                            className="rounded-full p-[2px] bg-pink-600 shadow-xl"
                          />
                        ))}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudentTable;
