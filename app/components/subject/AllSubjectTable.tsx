import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import axios from "axios";
const columns = [
  { header: "Subject Label", key: "label" },
  { header: "Class", key: "class" },
  { header: "Subject ID", key: "id" },
  { header: "Created At", key: "createdAt" },
];
const AllSubjectTable = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    async function getSubjects() {
      const subjects = await axios("/api/subject");
      console.log(subjects);
      if (subjects.status === 200) {
        setSubjectData(subjects.data);
      }
    }
    getSubjects();
  }, []);

  return (
    <div className="col-span-2">
      {subjectData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <TableComponent columns={columns} data={subjectData} />
      )}
    </div>
  );
};

export default AllSubjectTable;
