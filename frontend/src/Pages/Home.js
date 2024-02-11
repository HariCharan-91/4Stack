import React from "react";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";

// import Doctors from "../Components/Doctors";
// import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Hero />
      <Info />
      {/* <About /> */}
    </div>
  );
}

export default Home;
