import React from "react";
import {SelectableListProps} from "../types.ts";

const SelectableList: React.FC<SelectableListProps> = ({ label, id, options, value, onChange }) => {
  return (
    <div className="custom-select">
      <div className="mb-1">
        {label}
      </div>
      <select id={id} multiple value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectableList;
