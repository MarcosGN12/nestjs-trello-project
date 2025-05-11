import Dashboard from "@/pages/dashboard/dashboard"
import NotFoundPage from "@/pages/NotFoundPage"
import LogIn from "@/pages/login/login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/login',
        element: <LogIn />,
        errorElement: <NotFoundPage />,
    },
])


export default function CustomRouterProvider() {
    return (
        <RouterProvider router={router} />
    )
}