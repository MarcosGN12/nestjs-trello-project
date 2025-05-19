import Header from "@/components/ui/header";
import KanbanBoard from "./components/KanbanBoard";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const isAuthorized = localStorage.getItem("token")

    if (!isAuthorized) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Header />
            <KanbanBoard />
        </div>
    )
}