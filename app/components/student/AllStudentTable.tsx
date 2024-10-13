import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterComponent from "../filter/FilterComponent";
import { getStudentByFilter } from "@/app/actions/getStudentByFilter";
import toast from "react-hot-toast";

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
  classLabel: string;
  sex: "Male" | "Female";
}

const AllStudentTable = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: "",
    classLabel: "",
    sex: "Male",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  async function getStudentsData() {
    const studentData = await axios("/api/student");
    setStudentData(studentData.data.allStudents);
  }
  useEffect(() => {
    getStudentsData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(studentData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function handleFilterSearch() {
    const searchedStudents = await getStudentByFilter(searchFilters);
    console.log(searchedStudents);
    if (searchedStudents?.status === 200) {
      toast.success(searchedStudents.message as string);
      if (searchedStudents.students)
        setStudentData(searchedStudents.students as Student[]);
    } else {
      toast.error(searchedStudents?.message as string);
      setStudentData([]);
    }
  }

  const handleReset = async () => {
    setSearchFilters({ name: "", classLabel: "", sex: "Male" });
    await getStudentsData();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <FilterComponent
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        handleFilterSearch={handleFilterSearch}
        handleReset={handleReset}
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
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
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
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllStudentTable;
