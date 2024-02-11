import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Report from "./Components/report";
import { ThemeProvider } from "styled-components";
import Footer from './Components/Footer/Footer';
import GlobalStyle from "./globalStyles";
import Navbar from "./Components/Navbar";
import Portal from "./Components/portal";
const theme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgba(29 ,29, 29, .8)",
    white: "#fff",
    black: " #325e8a",
    helper: "	#FF3300",
    special: "rgba(243, 174, 71, 0.5)",
    blue:"#0000ff",
    cyan:"#0db9b6",
    moth_green:"#70971b",
    blk:"#3c3c3c",
    rose_dust:"#997070",

    bg: "#967BB6",
    new:"#C6AEC7",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router basename="/">
    <Navbar />
    <GlobalStyle />
    
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/report" element={<Report />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          
          {/* <Footer /> */}
        </Router>
    </ThemeProvider>
  );
}

export default App;
