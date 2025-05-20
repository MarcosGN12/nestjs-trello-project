import PlusIcon from "../icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import '../css/KanbanBoard.css'

import { useKanbanBoard } from "../hooks/use-kanban-board";


export default function KanbanBoard() {

    const { state, sensors, tasksFns, columnsFns, dragFns } = useKanbanBoard()

    const { columns, columnsId, activeColumn, tasks, activeTask, colors, categories } = state

    const { createTask, updateTask, deleteTask } = tasksFns
    const { createNewColumn, updateColumn, deleteColumn } = columnsFns
    const { onDragStart, onDragEnd, onDragOver } = dragFns


    return (
        <div
            className="
            m-auto
            flex
            items-start
            pt-8
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
            bg-gradient-to-r
            from-gray-900
            "
        >
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="bg-slate-800/40 backdrop-blur-md h-full rounded-xl p-6 flex gap-4 shadow-2xl shadow-black/30">
                    <div className="flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map(col => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(task => task.columnId === col.id)}
                                    categories={
                                        categories
                                    }
                                    colors={colors}
                                />
                            ))}
                        </SortableContext>
                    </div>

                    <button
                        onClick={() => {
                            createNewColumn();
                        }}
                        className="
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                rounded-lg
                bg-white/10
                border-2
                border-white/20
                p-4
                text-white
                ring-rose-500
                hover:ring-2
                hover:bg-white/20
                transition
                duration-200
                flex
                gap-2
                "
                    >
                        <PlusIcon />
                        Add column
                    </button>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                                categories={categories}
                                colors={
                                    colors
                                }
                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                categories={categories}
                                colors={colors}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}
