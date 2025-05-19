import Header from "@/components/ui/header";
import { Navigate } from "react-router-dom";
import AccountCard from "./components/accountCard";

export default function Account() {
    const isAuthorized = localStorage.getItem("token")

    if (!isAuthorized) {
        return <Navigate to="auth/login" />
    }

    return (
        <div>
            <Header />
            <AccountCard />
        </div>
    )
}