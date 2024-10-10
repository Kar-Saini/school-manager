import React from "react";

type Subject = {
  id: string;
  label: string;
  classId: string;
  class: {
    id: string;
    label: string;
  };
  createdAt?: string;
};
type Student = {
  id: string;
  name: string;
  email: string;
  dob: string;
  sex: string;
  bloodGroup: string;
  admissionDate: string;
};
type TableProps = {
  columns: {
    header: string;
    key: keyof Subject | keyof Student | "class" | string;
  }[];
  data: Subject[] | Student[];
};

const TableComponent = ({ columns, data }: TableProps) => {
  console.log(columns);
  console.log(data);
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 border-b text-gray-700"
                  >
                    {col.key === "class" && "class" in row
                      ? (row as Subject).class?.label
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

export default TableComponent;
