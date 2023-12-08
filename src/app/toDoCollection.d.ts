import { ToDoItem } from "./toDoItem";
export declare class ToDoCollection {
    author: string;
    private nextId;
    private itemMap;
    constructor(author: string);
    addItem(task: string, isDone?: boolean): number;
    getItemById(id: number): ToDoItem | void;
    getAllItems(includeDone: boolean): any[];
    markAsDone(id: number): void;
    markAsNotDone(id: number): void;
    removeDoneItems(): void;
}
