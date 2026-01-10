import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home";
import Footer from "./components/footer";
import Header from "./components/header";

// Import other pages
import Studio from "./pages/studio";
import Work from "./pages/work.jsx";
import Journal from "./pages/journal";
import Connect from "./pages/connect";
import PDP from "./pages/PDP"; // Import the new PDP page

// We create a wrapper component for the Routes so we can access useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    /* mode="wait" ensures the current page finishes its 
       exit animation before the new one enters.
    */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Work />} />
        <Route path="/studio" element={<Studio />} />
        {/* <Route path="/work" element={<Work />} /> */}
        <Route path="/journal" element={<Journal />} />
        <Route path="/connect" element={<Connect />} />
        
        {/* PDP Route: The ':id' is a dynamic parameter 
            that your PDP page will use to find the right project.
        */}
        <Route path="/project/:id" element={<PDP />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;