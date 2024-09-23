"use client";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const Appbar = () => {
  return (
    <div className=" shadow-md h-[44px] py-1 flex items-center w-full justify-between px-6">
      <div className="hidden mx-2 md:flex flex-1 items-center gap-2  h-full px-2 rounded-sm ">
        <IoIosSearch className="text-xl text-neutral-500 hover:scale-105 hover:cursor-pointer transition" />
        <input
          type="text"
          className="outline-none w-full p-1 text-sm  text-neutral-600 tracking-wide rounded-lg"
          placeholder="Find something"
        />
      </div>
      <div className="flex flex-1 justify-end  gap-6 px-2 items-center">
        <div className="flex gap-2 items-center">
          <div className="text-xs flex flex-col justify-center gap-x-2">
            <p className="font-semibold">Utkarsh Patel</p>
            <p className="text-neutral-400">Student</p>
          </div>
          <div className="bg-pink-300 rounded-full p-1 text-2xl hover:cursor-pointer transition hover:scale-105">
            <CiUser />
          </div>
        </div>
        <div className="text-2xl md:flex gap-4 hidden">
          <CiMail className="hover:cursor-pointer hover:scale-105 transition" />
          <IoIosNotificationsOutline className="hover:cursor-pointer hover:scale-105 transition" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
