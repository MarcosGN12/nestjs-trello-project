import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Not Found</h1>
            <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 text-blue-500 hover:underline"></Link>
            <a href="/">Home</a>
        </div>
    );
}
