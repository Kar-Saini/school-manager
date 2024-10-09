import React from "react";

const AddSubjectFormInput = ({
  label,
  value,
  onChangeFunction,
}: {
  label: string;
  value: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={label.trim()}>{label}</label>
      <input
        type="text"
        id={label.trim()}
        value={value}
        onChange={(event) => onChangeFunction(event)}
        className="py-2 px-4 outline-none rounded-md"
      />
    </div>
  );
};

export default AddSubjectFormInput;
