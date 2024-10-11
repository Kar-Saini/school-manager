import React, { useEffect, useState } from "react";
import axios from "axios";

const columns: { header: string; key: keyof Subject | "class" | string }[] = [
  { header: "Subject Label", key: "label" },
  { header: "Class", key: "class" },
  { header: "Subject ID", key: "id" },
  { header: "Created At", key: "createdAt" },
];

type Subject = {
  id: string;
  label: string;
  classId: string;
  class?: {
    id: string;
    label: string;
  };
  createdAt?: string;
};

const AllSubjectTable = () => {
  const [subjectData, setSubjectData] = useState<Subject[]>([]);

  useEffect(() => {
    async function getSubjects() {
      const subjects = await axios.get("/api/subject");
      console.log(subjects);
      if (subjects.status === 200) {
        setSubjectData(subjects.data);
      }
    }
    getSubjects();
  }, []);

  return (
    <div className="col-span-2">
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
            {subjectData.length > 0 ? (
              subjectData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-2 border-b text-gray-700 hover:cursor-pointer"
                    >
                      {col.key === "class"
                        ? row.class?.label || "N/A"
                        : col.key === "id"
                        ? row.id.slice(0, 8)
                        : (row[col.key as keyof Subject] as
                            | string
                            | undefined) || "N/A"}
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
    </div>
  );
};

export default AllSubjectTable;
