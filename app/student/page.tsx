import React from "react";
import { CiUser } from "react-icons/ci";
import { PiNotepad } from "react-icons/pi";

const Student = () => {
  return (
    <main className="m-4 ">
      <section className="p-2 font-semibold text-lg">
        <h2 className="">Student Dashboard</h2>
      </section>
      <div className="flex ">
        <AboutMe />
        <div className="p-2 flex-col  w-2/3 mx-2 my-1">
          <DashboardCards />
          <ExamResults />
        </div>
      </div>
    </main>
  );
};

export default Student;

function AboutMe() {
  return (
    <div className="w-1/3 bg-neutral-200 rounded-md mt-2 p-3 flex flex-col gap-4">
      <section className="text-md font-semibold">About Me</section>
      <div className="flex gap-4 items-center">
        <section>
          <CiUser className="text-7xl rounded-full p-2 bg-blue-200" />
        </section>
        <section className="flex flex-col justify-end gap-2">
          <h1>Utkarsh Patel</h1>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            optio?
          </p>
        </section>
      </div>
      <InformationSection />
    </div>
  );
}

const INFORMATION = {
  Name: "Utkarsh Patel",
  Gender: "Shemale",
  ["Father's Name"]: "Kartik Saini",
  ["Mother's Name"]: "",
  DOB: "18 Dec 1999",
  ["Father's Ocuppation"]: "Service",
  ["Email ID"]: "utkarshPatel@gmail.com",
  ["Admission Date"]: "01 Jan 2000",
  Class: "VII",
  Section: "A",
  ["Roll No."]: "1234",
  Address: "Lorem ipsum dolor sit amet",
  ["Phone Number"]: "123456789",
};
function InformationSection() {
  return (
    <section className=" m-1 p-2 flex flex-col gap-y-2">
      {Object.keys(INFORMATION).map((key) => (
        <section key={key} className="flex text-sm ">
          <p className="flex-1 text-neutral-600">{key}</p>
          <p className="flex-1">{INFORMATION[key]}</p>
        </section>
      ))}
    </section>
  );
}

function DashboardCards() {
  return (
    <div className="flex w-full justify-between">
      <div className="bg-neutral-200 flex w-[240px] h-[90px] p-2 rounded-md items-center justify-between">
        <PiNotepad className="text-7xl" />
        <div className="flex flex-col justify-start">
          <h1 className="text-neutral-400 font-semibold">Notification</h1>
          <p className="text-md font-bold">10</p>
        </div>
      </div>
      <div className="bg-neutral-200 flex w-[240px] h-[90px] p-2 rounded-md items-center justify-between">
        <PiNotepad className="text-7xl" />
        <div className="flex flex-col justify-start">
          <h1 className="text-neutral-400 font-semibold">Notification</h1>
          <p className="text-md font-bold">10</p>
        </div>
      </div>
      <div className="bg-neutral-200 flex w-[240px] h-[90px] p-2 rounded-md items-center justify-between">
        <PiNotepad className="text-7xl" />
        <div className="flex flex-col justify-start">
          <h1 className="text-neutral-400 font-semibold">Notification</h1>
          <p className="text-md font-bold">10</p>
        </div>
      </div>
    </div>
  );
}

function ExamResults() {
  return (
    <div className=" p-2 my-4">
      <h1 className="font-semibold text-lg">Exam Results</h1>
      <div className="p-2 rounded-md">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

const Table = ({
  columns,
  data,
}: {
  columns: ColumnType[];
  data: DataType[];
}) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-700"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// Define the columns for the table
const columns: ColumnType[] = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Subject", accessor: "subject" },
  { label: "Grade", accessor: "grade" },
  { label: "Date", accessor: "date" },
  { label: "Percentage", accessor: "percentage" },
];
interface ColumnType {
  label: string;
  accessor: string;
}
interface DataType {
  id: string;
  name: string;
  subject: string;
  grade: string;
  date: string;
  percentage: string;
}
// Define the data for the table
const data: DataType[] = [
  {
    id: "123",
    name: "Unit test",
    subject: "Maths",
    grade: "A",
    date: "12/09/2024",
    percentage: "90%",
  },
  {
    id: "124",
    name: "Final exam",
    subject: "Science",
    grade: "B",
    date: "15/09/2024",
    percentage: "85%",
  },
  {
    id: "125",
    name: "Mid-term test",
    subject: "English",
    grade: "A-",
    date: "18/09/2024",
    percentage: "88%",
  },
  {
    id: "126",
    name: "Pop quiz",
    subject: "History",
    grade: "B+",
    date: "20/09/2024",
    percentage: "82%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "127",
    name: "Semester exam",
    subject: "Physics",
    grade: "A",
    date: "22/09/2024",
    percentage: "92%",
  },
  {
    id: "128",
    name: "Weekly test",
    subject: "Chemistry",
    grade: "B+",
    date: "24/09/2024",
    percentage: "84%",
  },
];
