import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg flex items-center justify-between border-b border-gray-700 sticky top-0 z-50">
            <span className="text-white text-2xl font-extrabold tracking-wide">Trello Board</span>

            <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9"
                onClick={() => setOpen(!open)}
                aria-label="Abrir menú"
            >
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
            </button>

            <nav className="hidden md:flex gap-4 sm:gap-8">
                <Link to="/" className="text-gray-300 hover:text-white font-semibold text-lg">DashBoard</Link>
                <Link to="/graphics" className="text-gray-300 hover:text-white font-semibold text-lg">Graphics</Link>
                <Link to="/profile" className="text-gray-300 hover:text-white font-semibold text-lg">Profile</Link>
                <Link to="/logout" className="text-gray-300 hover:text-white font-semibold text-lg">Logout</Link>
            </nav>

            {open && (
                <nav className="md:hidden fixed top-[72px] left-0 w-full bg-gray-900 flex flex-col items-center gap-4 py-6 z-50 shadow-lg border-b border-gray-700">
                    <Link to="/" className="text-gray-300 hover:text-white font-semibold text-lg" onClick={() => setOpen(false)}>DashBoard</Link>
                    <Link to="/graphics" className="text-gray-300 hover:text-white font-semibold text-lg" onClick={() => setOpen(false)}>Graphics</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white font-semibold text-lg" onClick={() => setOpen(false)}>Profile</Link>
                    <Link to="/logout" className="text-gray-300 hover:text-white font-semibold text-lg" onClick={() => setOpen(false)}>Logout</Link>
                </nav>
            )}
        </header>
    );
}