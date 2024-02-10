import React, { useEffect, useState } from "react";
// import GLobe from "../Assets/Globe.avif";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";
// import { gsap } from 'gsap';


function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/report"); // Change the path to "/report"
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  //Globe revolution

  // const globeRef = useRef(null);

  // useEffect(() => {
  //   const globeElement = globeRef.current;

  //   // Define GSAP timeline for rotation animation
  //   const tl = gsap.timeline({ paused: true })
  //     .to(globeElement, { rotation: 360, duration: 10, ease: "none", repeat: -1 });

  //   // Function to start animation on mouse enter
  //   const handleMouseEnter = () => {
  //     tl.play();
  //   };

  //   // Function to stop animation on mouse leave
  //   const handleMouseLeave = () => {
  //     tl.pause();
  //   };

  //   // Add event listeners
  //   globeElement.addEventListener('mouseenter', handleMouseEnter);
  //   globeElement.addEventListener('mouseleave', handleMouseLeave);

  //   // Clean up event listeners
  //   return () => {
  //     globeElement.removeEventListener('mouseenter', handleMouseEnter);
  //     globeElement.removeEventListener('mouseleave', handleMouseLeave);
  //   };
  // }, []);

  //globe revolution end

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">Unlock the perfect service with AI assistance.</p>
          <h1 className="text-title">
            Welcome to AI Assist: Your Emergency Lifeline. Instant Response, Infinite Solutions.
          </h1>
          <p className="text-descritpion">

          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}>
            Calls Registered
          </button>

        </div>

        <div className="hero-image-section">
          {/* <img className="hero-image1" src={GLobe} width={200} alt="Doctor" /> */}
          {/* <img className="hero-image1" ref={globeRef} src={GLobe} width={200} alt="Globe" /> */}
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
      
      </div>
    </div>
  );
}

export default Hero;
