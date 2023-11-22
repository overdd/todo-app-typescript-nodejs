import { ToDoItem } from "./toDoItem";
export declare class ToDoCollection {
    author: string;
    toDoItems: ToDoItem[];
    private nextId;
    constructor(author: string, toDoItems?: ToDoItem[]);
    addItem(task: string): number;
}
