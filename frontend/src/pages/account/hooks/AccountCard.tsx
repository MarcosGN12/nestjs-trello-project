import { request } from "@/lib/axios";
import axios from "axios"
import { useEffect, useState } from "react"
import { User } from "../types/types";
import { Link } from "react-router-dom";

export default function AccountCard() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error getting profile:", error);
            }
        };

        fetchProfile();
    }, []);

    async function deleteUser(id: number) {
        await request({
            url: `/users/${id}/`,
            method: "delete",
        });
        localStorage.removeItem("token");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-start justify-center py-12 px-6">
            <div className="relative max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">

                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-900 rounded-full opacity-40 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-800 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 p-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-700 to-blue-900 shadow-lg flex items-center justify-center mb-5 border-4 border-blue-600">
                            <svg
                                className="w-16 h-16 text-blue-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">{user?.name}</h1>
                    </div>

                    <div className="border-t border-gray-700 my-8"></div>

                    <div className="space-y-8">
                        <div className="flex items-center justify-between bg-gray-800 rounded-xl p-5 shadow-inner border border-gray-700">
                            <div className="flex items-center space-x-4">
                                <svg
                                    className="w-7 h-7 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z"
                                    />
                                </svg>
                                <span className="text-gray-300 font-semibold text-lg">Name</span>
                            </div>
                            <span className="text-gray-400 font-medium text-lg">{user?.name}</span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-800 rounded-xl p-5 shadow-inner border border-gray-700">
                            <div className="flex items-center space-x-4">
                                <svg
                                    className="w-7 h-7 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.09 7.09a2.25 2.25 0 01-3.182 0l-7.09-7.09A2.25 2.25 0 012.25 6.993V6.75"
                                    />
                                </svg>
                                <span className="text-gray-300 font-semibold text-lg">Email</span>
                            </div>
                            <span className="text-gray-400 font-medium text-lg">{user?.email}</span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-800 rounded-xl p-5 shadow-inner border border-gray-700">
                            <div className="flex items-center space-x-4">
                                <svg
                                    className="w-7 h-7 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m12 0v7.5a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 013 18V10.5m15 0H6"
                                    />
                                </svg>
                                <span className="text-gray-300 font-semibold text-lg">Password</span>
                            </div>
                            <span className="text-blue-500 font-mono text-lg tracking-widest select-none">••••••••</span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-800 rounded-xl p-5 shadow-inner border border-gray-700">
                            <div className="flex items-center space-x-4">
                                <svg
                                    className="w-7 h-7 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-gray-300 font-semibold text-lg">Created At</span>
                            </div>
                            <span className="text-gray-400 font-mono text-lg tracking-widest">
                                {user?.createdAt && new Date(user.createdAt).toLocaleString("es-ES", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Link to={"/login"}
                                onClick={() => {
                                    if (user && user.id !== undefined) {
                                        deleteUser(user.id);
                                    }
                                }}
                                className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-200"
                                type="button"
                            >
                                Delete account
                            </Link>
                        </div>

                        <div className="flex items-center justify-center mt-8 mb-2">
                            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow" role="alert">
                                <span className="ml-2">Be careful to not press the delete account button if you don't wish to do it</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
