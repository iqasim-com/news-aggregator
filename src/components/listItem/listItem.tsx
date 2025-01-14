import React from "react";
import {ListItemProps} from "../types.ts";


const ListItem: React.FC<ListItemProps> = (
  {
    children,
    className = "",
    onClick,
  }) => {
  return (
    <li className={`reusable-list-item ${className}`} onClick={onClick}>
      {children}
    </li>
  );
};

export default ListItem;
