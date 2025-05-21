import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full px-8 py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg flex items-center justify-between  border-b border-gray-700 relative z-20">
            <div className="flex items-center space-x-3">
                <span className="text-white text-2xl font-extrabold tracking-wide">Trello Board</span>
            </div>
            <nav className="flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white font-semibold text-lg transition-colors duration-150">DashBoard</Link>
                <Link to="/graphics" className="text-gray-300 hover:text-white font-semibold text-lg transition-colors duration-150">Graphics</Link>
                <Link to="/profile" className="text-gray-300 hover:text-white font-semibold text-lg transition-colors duration-150">Profile</Link>
                <Link to="/logout" className="text-gray-300 hover:text-white font-semibold text-lg transition-colors duration-150">Logout</Link>
            </nav>
        </header>
    );
}