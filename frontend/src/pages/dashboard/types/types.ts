export type Column = {
    id: number;
    name: string;
    taskOrder: number[];
}

export type Task = {
    id: number;
    columnId: number;
    name: string;
    description: string;
    createdAt: string;
    categoryId: number;
}

export type Category = {
    id: number;
    name: string;
    colorId: number;
};

export type Color = {
    id: number;
    name: string;
    value: string;
};