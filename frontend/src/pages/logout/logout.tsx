import { useEffect } from "react";
import { useLogout } from "./hooks/use-logout";

export default function Logout() {
    const { logout } = useLogout();

    useEffect(() => {
        logout();
    });

    return null;
}