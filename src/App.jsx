import React from "react";
import Home from "./pages/home";
// Import the Footer component from your components folder
import Footer from "./components/footer"; 

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      {/* Main content area */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default App;