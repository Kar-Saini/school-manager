import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  { header: "Sex", key: "sex" },
  { header: "DOB", key: "dob" },
  { header: "Blood Group", key: "bloodGroup" },
  { header: "Admission Date", key: "admissionDate" },
];
const AllStudentTable = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState<Student[]>([]);
  useEffect(() => {
    async function getStudentsData() {
      const studentData = await axios("/api/student");
      console.log(studentData);
      setStudentData(studentData.data.allStudents);
    }
    getStudentsData();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 border-b bg-gray-200 text-left text-gray-600 font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentData.length > 0 ? (
            studentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 border-b text-gray-700 hover:cursor-pointer ${
                      col.key === "id" && "hover:underline"
                    }`}
                    onClick={() => {
                      router.push("/students/" + row.id);
                    }}
                  >
                    {col.key === "id"
                      ? row.id.slice(0, 8)
                      : row[col.key as keyof typeof row] || "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudentTable;
