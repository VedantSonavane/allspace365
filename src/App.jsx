import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/header";
import Footer from "./components/footer";

// Pages
import Home from "./pages/home";
import Studio from "./pages/studio";
import Work from "./pages/work";
import Journal from "./pages/journal";
import Connect from "./pages/collab";
import PDP from "./pages/PDP";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/project/:id" element={<PDP />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
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