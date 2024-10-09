import React from "react";

type TableProps = {
  columns: { header: string; key: string }[];
  data: { [key: string]: any }[];
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
                    {col.key === "class" ? row.class?.label : row[col.key]}
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
