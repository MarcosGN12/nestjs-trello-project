export default function account() {
    return (

        // MODO CLARO
        // <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-10 px-4">
        //     <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-8 relative overflow-hidden">
        //         {/* Círculo decorativo */}
        //         <div className="absolute -top-16 -right-16 w-48 h-48 bg-gray-200 rounded-full opacity-30 z-0"></div>

        //         {/* Perfil de usuario */}
        //         <div className="flex flex-col items-center relative z-10">
        //             <div className="w-24 h-24 rounded-full bg-gray-100 shadow-lg flex items-center justify-center mb-4">
        //                 {/* Icono de usuario */}
        //                 <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
        //                 </svg>
        //             </div>
        //             <h1 className="text-2xl font-bold text-gray-800">Juan Pérez</h1>
        //         </div>

        //         {/* Separador */}
        //         <div className="border-t border-gray-200 my-8"></div>

        //         {/* Información de usuario */}
        //         <div className="space-y-6 relative z-10">
        //             {/* Nombre */}
        //             <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm">
        //                 <div className="flex items-center space-x-3">
        //                     <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
        //                     </svg>
        //                     <span className="text-gray-700 font-medium">Name</span>
        //                 </div>
        //                 <span className="text-gray-600">Juan Pérez</span>
        //             </div>

        //             {/* Email */}
        //             <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm">
        //                 <div className="flex items-center space-x-3">
        //                     <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.09 7.09a2.25 2.25 0 01-3.182 0l-7.09-7.09A2.25 2.25 0 012.25 6.993V6.75" />
        //                     </svg>
        //                     <span className="text-gray-700 font-medium">Email</span>
        //                 </div>
        //                 <span className="text-gray-600">juan.perez@example.com</span>
        //             </div>

        //             {/* Contraseña */}
        //             <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm">
        //                 <div className="flex items-center space-x-3">
        //                     <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m12 0v7.5a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 013 18V10.5m15 0H6" />
        //                     </svg>
        //                     <span className="text-gray-700 font-medium">Password</span>
        //                 </div>
        //                 <span className="text-gray-400 tracking-widest select-none">••••••••</span>
        //             </div>
        //         </div>

        //         {/* Pie de página */}
        //         <div className="mt-10 text-center text-gray-400 text-xs">
        //             Última actualización: 13 mayo 2025 &nbsp;|&nbsp; © Mi Aplicación
        //         </div>
        //     </div>
        // </div>

        // MODO OSCURO
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-6">
            <div className="relative max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Círculo decorativo */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-900 rounded-full opacity-40 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-800 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

                {/* Contenido */}
                <div className="relative z-10 p-10">
                    {/* Perfil de usuario */}
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
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Juan Pérez</h1>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-700 my-8"></div>

                    {/* Información de usuario */}
                    <div className="space-y-8">
                        {/* Nombre */}
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
                            <span className="text-gray-400 font-medium text-lg">Juan Pérez</span>
                        </div>

                        {/* Email */}
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
                            <span className="text-gray-400 font-medium text-lg">juan.perez@example.com</span>
                        </div>

                        {/* Contraseña */}
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
                    </div>

                    {/* Pie de página */}
                    <div className="mt-12 text-center text-gray-500 text-xs font-light tracking-wide">
                        Última actualización: 13 mayo 2025 &nbsp;|&nbsp; © Mi Aplicación
                    </div>
                </div>
            </div>
        </div>
    )
}