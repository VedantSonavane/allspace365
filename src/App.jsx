import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";
import Header from "./components/header"; // Import the Header component

// Import other pages
import Studio from "./pages/studio";
import Work from "./pages/work";
import Journal from "./pages/journal";
import Connect from "./pages/connect";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        {/* Header is placed here so it persists across all routes. 
            Because it uses 'fixed' positioning, it will float 
            above the content regardless of the route.
        */}
        <Header />

        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            {/* Home page (contains your HeroSection) */}
            <Route path="/" element={<Home />} />

            {/* Other navigation pages */}
            <Route path="/studio" element={<Studio />} />
            <Route path="/work" element={<Work />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
        </main>

        {/* Footer section */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;