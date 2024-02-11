import React from "react";
import Contact from "./Contact"; // Import the Contact component
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div>
      <div className="about-section" id="about">
        <div className="about-image-content">
          {/* <img src={Doctor} alt="Doctor Group" className="about-image1" /> */}
        </div>

        <div className="about-text-content">
          <h3 className="about-title">
            <span>About Us</span>
          </h3>
          {/* Include the Contact component here */}
          
        </div>
      </div>
    </div>
  );
}

export default About;
