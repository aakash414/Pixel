import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Displaycards from "./pages/Displaycards";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="bg-gray-900">
        <Header /> {/* Header component */}
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatPage />} />{" "}
          {/* Route for ChatPage */}
          <Route path="/displaycards" element={<Displaycards />} />{" "}
          {/* Route for Displaycards page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
