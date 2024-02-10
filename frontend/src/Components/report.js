import React, { useState } from 'react';
import ReportList from './reportList';
import '../Styles/report.css';

export default function Report() {
  // State variable to keep track of the active button
  const [activeButton, setActiveButton] = useState(1); // Default active button is 1

  // Function to handle button click and set the active button
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    console.log(`Button ${buttonNumber} clicked`);
  };

  return (
    <div className="report-page">
      <div className="overlay">{/* Overlay with low opacity covering the whole page */}
      <div className="container">
        <div className="button-group">
          <button className={`button ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>Ongoing</button>
          <button className={`button ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>Unresolved</button>
          <button className={`button ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>Resolved</button>
        </div>
        <div className="report-list-container">
          {/* Render the ReportList component based on the active button and its corresponding data */}
          <ReportList />
        </div>
      </div>
      </div> 
    </div>
  );
}
