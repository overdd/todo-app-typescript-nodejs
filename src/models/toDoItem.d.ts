export declare class ToDoItem {
    id: number;
    task: string;
    complete: boolean;
    constructor(id: number, task: string, complete?: boolean);
    printItem(): void;
}
