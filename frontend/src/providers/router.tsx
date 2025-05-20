import Dashboard from "@/pages/dashboard/dashboard"
import NotFoundPage from "@/pages/NotFoundPage"
import LogIn from "@/pages/login/login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from "@/pages/register/register"
import Account from "@/pages/account/account"
import LogOut from "@/pages/logout/logout"
import Graphics from "@/pages/graphics/graphics"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/graphics',
        element: <Graphics />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/login',
        element: <LogIn />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/logout',
        element: <LogOut />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/register',
        element: <Register />,
        errorElement: <NotFoundPage />,
    },

    {
        path: '/account',
        element: <Account />,
        errorElement: <NotFoundPage />,
    },
])


export default function CustomRouterProvider() {
    return (
        <RouterProvider router={router} />
    )
}