// report.js
import React, { useEffect, useState } from 'react';
import ReportList from './reportList';
import '../Styles/report.css';
import { ethers } from 'ethers';
import abi from '../data/abi.json';
import { useNavigate } from 'react-router-dom';

export default function Report() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);
  const [data, setdata] = useState([]);
  const [load,setload]=useState(false)

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    // setload(!load);
  };

  const Loaddata = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = '0x18F47f219a7E722D146E481c7Dd8771d95CA1C0f';

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const address = await signer.getAddress();
    const bool = await contract.whiteList(address);

    if (bool) {
      const Data = await contract.getProposals();
      setdata(Data);

    } else {
      window.alert("You are not whitelisted");
      navigate("/");
    }
  };

  useEffect(() => {

    Loaddata();
  }, [activeButton]);

  return (
    <div className="overlay">
      <div className="container">
        <div className="button-group">
          <button className={`button ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>Unresolved</button>
          <button className={`button ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>Ongoing</button>
          <button className={`button ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>Resolved</button>
        </div>
        <div className="report-list-container">
          <ReportList data={data} activeButton={activeButton} />
        </div>
      </div>
    </div>
  );
}
