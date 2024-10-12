import React from "react";
import { SearchFilters } from "@/app/components/student/AllStudentTable";
const FilterComponent = ({
  searchFilters,
  setSearchFilters,
}: {
  searchFilters: SearchFilters;
  setSearchFilters: (searchFilters: SearchFilters) => void;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };

  const handleReset = () => {
    setSearchFilters({ name: "", class: "", sex: "Male" });
  };
  console.log(searchFilters);
  return (
    <div className=" flex justify-between">
      <input
        type="text"
        name="name"
        placeholder="Search by Name"
        className="p-2 outline-none rounded-sm"
        value={searchFilters.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Search by Class"
        className="p-2 outline-none rounded-sm"
        value={searchFilters.class}
        name="class"
        onChange={handleInputChange}
      />
      <select
        name="sex"
        id=""
        className="rounded-sm px-1"
        value={searchFilters.sex}
        onChange={handleSelectChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <div className="flex gap-6">
        <button className="bg-gray-900 px-3 text-gray-100 rounded-md hover:bg-blue-700 transition">
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-yellow-500 px-3 text-gray-800 rounded-md hover:bg-blue-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
