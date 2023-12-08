export declare class ToDoItem {
    id: number;
    task: string;
    isDone: boolean;
    constructor(id: number, task: string, isDone?: boolean);
    printItem(): void;
}
