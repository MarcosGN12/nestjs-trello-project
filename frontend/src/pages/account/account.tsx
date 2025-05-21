import Header from "@/components/ui/header";
import { Navigate } from "react-router-dom";
import AccountCard from "./hooks/AccountCard";

export default function Profile() {
    const isAuthorized = localStorage.getItem("token")

    if (!isAuthorized) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Header />
            <AccountCard />
        </div>
    )
}