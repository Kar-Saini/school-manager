import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import axios from "axios";
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
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    async function getStudentsData() {
      const studentData = await axios("/api/student");
      console.log(studentData);
      setStudentData(studentData.data.allStudents);
    }
    getStudentsData();
  }, []);
  return <TableComponent columns={columns} data={studentData} />;
};

export default AllStudentTable;
