import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types/types";
import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";


export function useKanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    )


    function generateId() {
        return Math.floor(Math.random() * 1000);
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        }

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    function createNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `New Column ${columns.length + 1}`,
        };
        setColumns([...columns, columnToAdd])
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter(col => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks)
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });
        setColumns(newColumns);
    }


    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;

        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);

            const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);

        })
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const IsOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        if (isActiveATask && IsOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id ===
                    activeId);

                const overIndex = tasks.findIndex((t) => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex)
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id ===
                    activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex)
            });
        }
    }

    return {
        tasksFns: {
            createTask,
            deleteTask,
            updateTask,
        },
        columnsFns: {
            createNewColumn,
            deleteColumn,
            updateColumn,
        },
        dragFns: {
            onDragStart,
            onDragEnd,
            onDragOver
        },
        state: {
            columns,
            columnsId,
            activeColumn,
            tasks,
            activeTask
        },
        sensors
    }
}