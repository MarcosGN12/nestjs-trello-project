import { useEffect, useMemo, useState } from "react";
import { Category, Color, Column, Task } from "../types/types";
import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { request } from "@/lib/axios";
import { arrayMove } from "@dnd-kit/sortable";

export function useKanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);

    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    )

    useEffect(() => {
        request({
            url: "/columns/",
            method: "get"
        })
            .then((columns: Column[]) => {
                if (columns) {
                    setColumns(columns)
                }
            });
    }, []);

    useEffect(() => {
        request({
            url: "/tasks/",
            method: "get",
        })
            .then((tasks: Task[]) => {
                if (tasks) {
                    setTasks(tasks)
                }
            });
    }, []);

    useEffect(() => {
        request({
            url: "/colors/",
            method: "get"
        })
            .then((colors: Color[]) => {
                if (colors) {
                    setColors(colors);
                }
            });
    }, []);

    useEffect(() => {
        request({
            url: "/categories/",
            method: "get"
        })
            .then((categories: Category[]) => {
                if (categories) {
                    setCategories(categories);
                }
            });
    }, []);

    async function createTask(columnId: number) {
        const task = await request({
            url: "/tasks/",
            method: "post",
            data: {
                columnId,
                categoryId: 1,
                name: `Title`,
                description: `Description`,
            }
        });
        const column: Column = columns.find(c => c.id === columnId)!
        const currenTaskOrder = tasks.filter(t => t.columnId === columnId).map(t => t.id)

        updateColumn(columnId, column.name, [...currenTaskOrder, task.id])
        setTasks([...tasks, task]);
    }

    async function deleteTask(id: number) {
        await request({
            url: `/tasks/${id}/`,
            method: "delete",
        });

        const taskToDelete = tasks.find(t => t.id === id)!
        const columnId = taskToDelete.columnId

        const column: Column = columns.find(c => c.id === columnId)!
        const newTaskOrder = tasks.filter((task) => task.id !== id).filter(t => t.columnId === columnId).map(t => t.id)

        updateColumn(columnId, column.name, newTaskOrder)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    async function updateTask(id: number, name: string, description: string, categoryId: number, columnId: number) {
        const taskIds = tasks.findIndex(t => t.id === id)
        const updatedTask: Task = { ...tasks[taskIds], name, description, categoryId, columnId }
        const taskToUpdate = tasks.find(t => t.id === id)!

        if (taskToUpdate.columnId !== columnId) {
            const column: Column = columns.find(c => c.id === columnId)!
            const newTaskOrder = tasks.filter(t => t.columnId === columnId).map(t => t.id)
            updateColumn(columnId, column.name, newTaskOrder)
        }

        await request({
            url: `/tasks/${id}/`,
            method: "put",
            data: updatedTask,
        });

        setTasks((oldTasks) => {
            oldTasks[taskIds] = updatedTask
            return [...oldTasks]
        });
    }

    async function createNewColumn() {
        const column = await request({
            url: "/columns/",
            method: "post",
            data: {
                name: `New Column ${columns.length + 1}`,
            }
        })

        if (column) {
            setColumns([...columns, column])
        }
    }

    async function deleteColumn(id: number) {
        await request({
            url: `/columns/${id}/`,
            method: "delete",
        });

        setColumns((prevColumns) => prevColumns.filter((column) => column.id !== id));
    }

    async function updateColumn(id: number, name: string, taskOrder: number[]) {
        const updatedColumn = { id, name, taskOrder };

        await request({
            url: `/columns/${id}/`,
            method: "put",
            data: updatedColumn,
        });

        setColumns((prev) => prev.map((column) => (column.id === id ? { ...column, name, taskOrder } : column)));
    }


    function onDragStart(event: DragStartEvent) {
        const data = event.active.data.current;
        if (!data) return;

        if (data.type === "Column") {
            setActiveColumn(data.column);
        }
        else if (data.type === "Task") {
            setActiveTask(data.task);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;

        if (!over) return;

        const activeData = active.data.current;
        const overData = over.data.current;
        if (!activeData || !overData) return;

        const activeId = active.id;
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const taskToUpdate = tasks[activeIndex]
        updateTask(taskToUpdate.id, taskToUpdate.name, taskToUpdate.description, taskToUpdate.categoryId, taskToUpdate.columnId)

        const columnId = Number(activeData.sortable.containerId)
        const column = columns.find(c => c.id === columnId)

        if (column) {
            updateColumn(columnId, column.name, tasks.filter(t => t.columnId === columnId).map(t => t.id))
        }
    }

    async function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";
        const isOverAColumn = over.data.current?.type === "Column";

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id ===
                    activeId);

                const overIndex = tasks.findIndex((t) => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex)
            });
        }

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                tasks[activeIndex].columnId = +overId;
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
            activeTask,
            colors, categories
        },
        sensors
    }
}