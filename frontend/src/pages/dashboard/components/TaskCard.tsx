import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Category, Color, Task } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    task: Task;
    deleteTask: (id: number) => void;
    updateTask: (id: number, name: string, description: string, categoryId: number, columnId: number) => void;
    categories: Category[]
    colors: Color[]
}

export default function TaskCard({ task, deleteTask, updateTask, categories, colors }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState<"none" | "name" | "description">("none");
    const [editedName, setEditedName] = useState(task.name);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const category = categories.find(cat => cat.id === task.categoryId);
    const color = colors.find(col => col.id === category?.colorId);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
        useSortable({
            id: task.id,
            data: {
                type: "Task",
                task,
            },
            disabled: editMode !== "none",
        });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    function saveAndExitEdit() {
        updateTask(task.id, editedName, editedDescription, task.categoryId, task.columnId);
        setEditMode("none");
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-mainBackgroundColor p-4 flex items-center rounded-xl border-2 border-rose-500"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
                bg-blue-900/30
                p-4 
                flex 
                flex-col 
                gap-2
                text-left 
                rounded-xl 
                shadow-lg
                hover:ring-2 
                hover:ring-rose-500 
                transition-all 
                duration-150
                relative 
                group
            "
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >

            {editMode === "name" ? (
                <input
                    className="mb-1 w-full border-none rounded bg-transparent text-white text-lg font-bold focus:outline-none"
                    value={editedName}
                    autoFocus
                    placeholder="Nombre de la tarea"
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={saveAndExitEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveAndExitEdit();
                    }}
                />
            ) : (
                <p
                    className="font-bold text-white text-lg break-words whitespace-normal cursor-pointer"
                    onClick={e => {
                        e.stopPropagation();
                        setEditMode("name");
                    }}
                >
                    {task.name}
                </p>
            )}

            <div className="text-xs text-gray-400">
                Creation date: {""}
                {new Date(task.createdAt).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>

            <div className="flex items-center gap-2">
                <select
                    className="
                    bg-gray-800 
                    text-white 
                    text-sm 
                    rounded 
                    px-3 
                    py-1 
                    focus:outline-none 
                    border 
                    border-gray-700 hover:border-rose-400 transition-all w-full appearance-none shadow-sm"
                    value={task.categoryId}
                    onChange={(e) => {
                        const newCategoryId = parseInt(e.target.value);
                        updateTask(task.id, editedName, editedDescription, newCategoryId, task.columnId);
                    }}
                >
                    <option disabled value="">
                        Select category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div
                    className="w-5 h-5 rounded"
                    style={{
                        backgroundColor: color ? color.value : "#2d3748",
                        border: "1px solid #4a5568"
                    }}
                    title={color ? color.name : "Sin color"}
                />
            </div>

            {editMode === "description" ? (
                <textarea
                    className="w-full resize-none border-none rounded bg-transparent text-gray-300 focus:outline-none text-sm mt-1"
                    value={editedDescription}
                    placeholder="Task description"
                    autoFocus
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={saveAndExitEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveAndExitEdit();
                    }}
                />
            ) : (
                <p
                    className="text-sm text-gray-300 break-words whitespace-pre-wrap overflow-y-auto cursor-pointer mt-1"
                    onClick={e => {
                        e.stopPropagation();
                        setEditMode("description");
                    }}
                >
                    {task.description}
                </p>
            )}

            {mouseIsOver && (
                <button
                    onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                    className="stroke-white absolute right-3 top-3 bg-red-600 bg-opacity-80 p-2 rounded-full opacity-80 hover:opacity-100 transition-all shadow-lg"
                    title="Eliminar tarea"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
}