import React from "react";
import { useState } from "react";

const SelectionOption = () => {
  const [selected, setSelected] = useState("TBD");
  const handleSelection = (e) => {
    setSelected(e.target.value);
  };

  const getBackgroundColor = () => {
    switch (selected) {
      case "TBD":
        return "#ff6d6d";
      case "DISPATCHED":
        return "#efee6b";
      case "COMPLETED":
        return "#8ce78c";
      default:
        return "white";
    }
  };
  return (
    <select
      value={selected}
      onChange={handleSelection}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <option value="TBD">TBD</option>
      <option value="DISPATCHED">DISPATCHED</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  );
};

export default SelectionOption;