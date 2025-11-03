import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Help from "./pages/Help";
import ThoughtFeed from "./pages/ThoughtFeed";
import ComplaintFeed from "./pages/ComplaintFeed";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/thoughts" element={<ThoughtFeed />} />
          <Route path="/complaints" element={<ComplaintFeed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fbbf24',
              border: '2px solid #6b46c1',
              fontFamily: 'Press Start 2P, cursive',
              fontSize: '10px',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
