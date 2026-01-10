import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

// Pages
import Home from "./pages/home";
import Studio from "./pages/studio";
import Work from "./pages/work";
import Journal from "./pages/journal";
import Connect from "./pages/collab";
import PDP from "./pages/PDP";

/* 🔍 Route logger – DEBUG ONLY */
function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    console.log("📍 CURRENT ROUTE:", location.pathname);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteLogger />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/project/:id" element={<PDP />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
