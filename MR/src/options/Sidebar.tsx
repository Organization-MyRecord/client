import React from "react";
import { options } from "./options";

function Sidebar() {
  const option = options.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  return <div></div>;
}

export default Sidebar;
