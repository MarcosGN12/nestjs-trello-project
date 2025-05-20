import Header from "@/components/ui/header";
import { useKanbanBoard } from "../dashboard/hooks/use-kanban-board";
import { Navigate } from "react-router-dom";
import MyChart1 from "./hooks/my-chart1";
import MyChart2 from "./hooks/my-chart2";

export default function Graphics() {

    const { state } = useKanbanBoard();
    const { columns, tasks, categories } = state;

    const isAuthorized = localStorage.getItem("token")

    if (!isAuthorized) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Header />
            <div className="flex gap-5">
                <MyChart1 columns={columns} tasks={tasks} />
                <MyChart2 tasks={tasks} categories={categories} />
            </div>
        </div>
    );
}
