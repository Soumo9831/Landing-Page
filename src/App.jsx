import React from "react";
import Home from "../src/pages/Home";
import Navbar from "../src/components/Navbar"; // Make sure the path is correct
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-gradient-to-br from-[#0f172a] to-green-600 min-h-screen flex flex-col overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;