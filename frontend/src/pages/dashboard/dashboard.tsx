import KanbanBoard from "./components/KanbanBoard";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const isAuthorized = localStorage.getItem("token")

    if (!isAuthorized) {
        return <Navigate to="/login" />
    }

    return (
        <KanbanBoard />
    )
}