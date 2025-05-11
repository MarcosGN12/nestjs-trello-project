import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

export default function TaskCard() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Tarea 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>Descripcion: La programación es el proceso de diseñar, escribir, depurar y mantener el código fuente de programas informáticos. Utiliza lenguajes de programación como Python, Java, C++, entre otros, para crear instrucciones que una computadora puede entender y ejecutar. Su propósito es resolver problemas, automatizar tareas o desarrollar aplicaciones y sistemas que respondan a necesidades específicas. La programación combina lógica, creatividad y precisión, y es fundamental en el desarrollo de software, sitios web, videojuegos, inteligencia artificial y muchas otras áreas tecnológicas.</CardDescription>
                    <Badge className="mt-5 mb-5" variant="destructive">Importante</Badge>
                    <CardDescription>Fecha de creacion: 22/05/22</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button className="w-50">Terminar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}