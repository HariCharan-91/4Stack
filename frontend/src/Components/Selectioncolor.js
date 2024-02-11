import React, { useState } from "react";
import "../Styles/SelectionOption.css";
import ReportList from "./reportList";
import { ethers } from "ethers";

const SelectionOption = (selected) => {
  // const data = ReportList.props.data;
  
  // const types = data ? [...new Set(data.map((item) => item[6]))] : [];

  // const [selected, setSelected] = useState("TBD");

  const handleSelection = async(e) => {
    // setSelected(e.target.value);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = await provider.getSigner();
    // const contractAddress = '0x18F47f219a7E722D146E481c7Dd8771d95CA1C0f';

    // const contract = new ethers.Contract(contractAddress, abi, signer);
    
  };

  const getBackgroundColor = () => {
    switch (selected) {
      case "0":
        return "#ff6d6d";
      case "1":
        return "#efee6b";
      case "2":
        return "#8ce78c";
      default:
        return "white";
    }
  };

  return (
    <div className="selection-container">
      {/* <select
        value={selected}
        onChange={handleSelection}
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <option value="2">Resolved</option>
        <option value="0">Unresolved</option>
        <option value="1">Ongoing</option>
      </select> */}
    </div>
  );
};

export default SelectionOption;
