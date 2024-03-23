import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import ChatPage from "./pages/ChatPage";
import Landing from "./pages/Landing";
import Displaycards from "./pages/Displaycards";
import Header from "./components/Header";
import Orders from "./pages/Orders";
import StripePage from "./pages/StripePage";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="bg-gray-900">
        <Header /> {/* Header component */}
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<ChatPage />} />
          {/* Route for ChatPage */}
          <Route path="/pools" element={<Displaycards />} />
          <Route path="/my-order" element={<Orders />} />
          {/* <Route path="/profile" element={<Displaycards />} /> */}
          <Route path="/stripe" element={<StripePage />} />
          <Route path="/profile" element={<Profile />} />{" "}
          {/* Route for Displaycards page */}
          {/* <Route path="/sellproducts" element={<SellPoduct />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
