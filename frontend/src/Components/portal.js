// report.js
import React, { useEffect, useState } from 'react';
import ReportList from './reportList';
import '../Styles/report.css';
import abi from '../data/abi.json';
import { ethers } from 'ethers';

export default function Portal() {

    const [id, setId] = useState('');
    const [status, setStatus] = useState(0);
  
    const handleIdChange = (event) => {
      setId(event.target.value);
    };
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
  
    const handleSubmit = async() => {
        

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = '0x18F47f219a7E722D146E481c7Dd8771d95CA1C0f';
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.updateStatus(id, status);

      console.log('Submitted:', { id, status });
    };
  

  return (
    <div className="status-form-container">
    <div className="status-form">
      <h2>Update Status</h2>
      <label htmlFor="idInput">ID:</label>
      <input
        type="text"
        id="idInput"
        value={id}
        onChange={handleIdChange}
      />
      <label htmlFor="statusSelect">Status:</label>
      <select id="statusSelect" value={status} onChange={handleStatusChange}>
        <option value="2">Resolved</option>
        <option value="0">Unresolved</option>
        <option value="1">Ongoing</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>
  );
}
