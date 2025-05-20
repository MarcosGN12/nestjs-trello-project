import Header from "@/components/ui/header";
import MyChart from "./hooks/my-chart";
import { useKanbanBoard } from "../dashboard/hooks/use-kanban-board"; // Ajusta ruta

export default function Graphics() {
    const { state } = useKanbanBoard();
    const { columns, tasks } = state;

    return (
        <div>
            <Header />
            <MyChart columns={columns} tasks={tasks} />
        </div>
    );
}
