import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer } from "../../../components/ui/chart";
import { Category, Color, Task } from "../../dashboard/types/types";

interface MyChartProps {
    tasks: Task[];
    categories: Category[];
    colors: Color[];
}

export default function MyChart2({ tasks, categories, colors }: MyChartProps) {

    const chartData = categories.map((cat) => ({
        name: cat.name,
        tasks: tasks.filter((t) => t.categoryId === cat.id).length,
    }));

    const charColorData = colors.map((col) => ({
        name: col.name,
        value: col.value
    }))

    const chartConfig = {
        tasks: {
            label: "Tareas",
            color: "#f43f5e",
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-lg p-8 mt-10">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Categories in tasks</h2>
            <ChartContainer config={chartConfig} className="bg-slate-800 rounded-lg p-6 min-h-[420px]">
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 16, right: 16, left: 8, bottom: 16 }}
                    >
                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#cbd5e1", fontSize: 13 }}
                            axisLine={{ stroke: "#475569" }}
                            tickLine={{ stroke: "#475569" }}
                        />
                        <YAxis
                            tick={{ fill: "#cbd5e1", fontSize: 13 }}
                            axisLine={{ stroke: "#475569" }}
                            tickLine={{ stroke: "#475569" }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                background: "#1e293b",
                                border: "1px solid #334155",
                                color: "#f1f5f9",
                                borderRadius: "0.5rem",
                                fontSize: "0.95rem",
                            }}
                        />
                        <Bar
                            dataKey="tasks"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                        >
                            {charColorData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.value}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}