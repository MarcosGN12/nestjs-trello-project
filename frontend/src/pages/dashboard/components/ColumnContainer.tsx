import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Category, Color, Column, Task } from "../types/types"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: number) => void;
    updateColumn: (id: number, title: string, taskOrder: number[]) => void;
    createTask: (columnId: number, categoryId: number) => void;
    updateTask: (id: number, name: string, description: string, categoryId: number, columnId: number) => void;
    deleteTask: (id: number) => void;
    tasks: Task[];
    categories: Category[],
    colors: Color[]
}

export default function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props

    const [editMode, setEditMode] = useState(false)

    const taskOrder = column.taskOrder


    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        =
        useSortable({
            id: column.id,
            data: {
                type: "Column",
                column,
            },
            disabled: editMode,
        });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
            bg-columnBackgroundColor
            opacity-60
            border-2
            border-rose-500
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
        "
            ></div >
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
            bg-columnBackgroundColor
            w-[450px]
            h-[800px]
            max-h-[700px]
            rounded-md
            flex
            flex-col
        "
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true)
                }}
                className="
            bg-mainBackgroundColor
            text-md
            h-[60px]
            rounded-md
            rounded-b-none
            p-3
            font-bold
            border-columnBackgroundColor
            border-4
            flex
            items-center
            justify-between
            ">
                <div className="flex gap-2">
                    <div className="
                flex
                justify-center
                items-center
                bg-columnBackgroundColor
                px-2
                py-1
                text-sm
                rounded-full
                "
                    >
                        {tasks.length + " Tasks"}
                    </div>
                    {!editMode && column.name}
                    {editMode && (
                        <input
                            className="
                            bg-black 
                            focus:border-rose-500
                            border rounded
                            outline-none
                            px-2
                            "
                            value={column.name}
                            onChange={(e) => updateColumn(column.id, e.target.value, column.taskOrder)}
                            autoFocus
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id)
                    }}
                    className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
            "
                >
                    <TrashIcon />
                </button>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext id={`${column.id}`} items={taskOrder}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            colors={props.colors}
                            categories={props.categories}
                        />
                    ))}
                </SortableContext>
            </div>
            <button
                className="
            flex
            gap-2
            items-center
            border-columnBackgroundColor
            border-2
            rounded-md
            p-4
            border-x-columnBackgroundColor
            hover:bg-mainBackgroundColor
            hover:bg-mainBackgroundColor
            hover:text-rose-500
            "
                onClick={() => {
                    createTask(column.id, column.id);
                }}><PlusIcon />Add task</button>
        </div >
    );
}