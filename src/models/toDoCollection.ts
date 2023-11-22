import { ToDoItem } from "./toDoItem";

export class ToDoCollection {
    private nextId = 0;

    constructor(public author: string, public toDoItems: ToDoItem[] = []) {
    }

    addItem(task: string): number {
        const newToDoItem = new ToDoItem(this.nextId++, task)
        this.toDoItems.push(newToDoItem);
        return newToDoItem.id;
    }

    getItemById(id: number): ToDoItem | void {
        const foundItem = this.toDoItems.find(item => item.id === id); 
        if (!foundItem) {
            console.log(`No such item: ${id}`);
        }
        return foundItem;
    }

    markAsDone(id: number) {
        const toDoItem: ToDoItem | void = this.getItemById(id);
        toDoItem ? toDoItem.isDone = true : toDoItem ;
    }

    markAsNotDone(id: number) {
        const toDoItem: ToDoItem | void = this.getItemById(id);
        toDoItem ? toDoItem.isDone = false : toDoItem ;
    }
}