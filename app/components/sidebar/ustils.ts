import { PiStudent } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiBooksFill } from "react-icons/pi";
import { PiExam } from "react-icons/pi";
import { MdOutlineMenuBook } from "react-icons/md";

import { SiGoogleclassroom } from "react-icons/si";

export interface SubMenu {
  label: string;
  icon?: React.ComponentType;
  key: string;
  href?: string;
}

export interface DesktopSidebarMenuItem extends SubMenu {
  submenu?: SubMenu[];
}

export const DESKTOP_SIDEBAR_ITEMS: DesktopSidebarMenuItem[] = [
  {
    label: "Students",
    icon: PiStudent,
    key: "2",
    href: "/student",
    submenu: [
      { label: "All Students", key: "21" },
      { label: "Student Detail", key: "22" },
      { label: "Admission Form", key: "23" },
      { label: "Student Promotion", key: "24" },
    ],
  },
  {
    label: "Parents",
    icon: BsFillPeopleFill,
    key: "3",
    href: "/parent",
    submenu: [
      { label: "All Parents", key: "31" },
      { label: "Parents Detail", key: "32" },
      { label: "Add Parent", key: "33" },
      { label: "Payment", key: "34" },
    ],
  },
  {
    label: "Teachers",
    icon: IoIosPeople,
    key: "4",
    href: "/teacher",
    submenu: [
      { label: "All Teachers", key: "41" },
      { label: "Teacher Detail", key: "42" },
      { label: "Add Teacher", key: "43" },
      { label: "Payment", key: "44" },
    ],
  },
  {
    label: "Library",
    icon: PiBooksFill,
    key: "5",
    submenu: [
      { label: "All Books", key: "51" },
      { label: "Add new book", key: "52" },
    ],
  },
  {
    label: "Class",
    icon: SiGoogleclassroom,
    key: "6",
    submenu: [
      { label: "All Classes", key: "61" },
      { label: "Add new Class", key: "62" },
    ],
  },
  {
    label: "Exam",
    icon: PiExam,
    key: "7",
    submenu: [
      { label: "All Exams", key: "71" },
      { label: "Exam schedule", key: "72" },
    ],
  },
  {
    label: "Subject",
    icon: MdOutlineMenuBook,
    key: "8",
  },
];
