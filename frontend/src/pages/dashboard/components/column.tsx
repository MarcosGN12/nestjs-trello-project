import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export default function Column({ children }: PropsWithChildren) {
    return (
        <div className="rounded-lg shadow-md bg-white p-5 m-5">
            <h1 className="text-3xl font-bold text-center pb-5">Columna 1</h1>
            <div className="flex flex-col gap-4 bg-gray-200 p-5">
                {children}
            </div>
            <Button className="w-50 m-5">Agregar tarea</Button>
        </div>
    )
}