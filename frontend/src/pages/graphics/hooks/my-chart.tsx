import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer } from "../../../components/ui/chart";
import { Column, Task } from "../../dashboard/types/types";

interface MyChartProps {
    columns: Column[];
    tasks: Task[];
}

export default function MyChart({ columns, tasks }: MyChartProps) {

    const chartData = columns.map((col) => ({
        name: col.name,
        tareas: tasks.filter((t) => t.columnId === col.id).length,
    }));

    const chartConfig = {
        tareas: {
            label: "Tareas",
            color: "#f43f5e",
        }
    };

    return (
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tareas" fill="#f43f5e" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}