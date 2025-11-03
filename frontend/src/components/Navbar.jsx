import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-retroPurple text-white font-pixel text-sm py-4 px-6 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-retroYellow text-lg">🎮 CampusVerse</Link>
      <div className="space-x-4">
        <Link to="/help" className="hover:text-retroYellow">Help</Link>
        <Link to="/thoughts" className="hover:text-retroYellow">Thoughts</Link>
        <Link to="/complaints" className="hover:text-retroYellow">Complaints</Link>
        <Link to="/profile" className="hover:text-retroYellow">Profile</Link>
      </div>
    </nav>
  );
}

