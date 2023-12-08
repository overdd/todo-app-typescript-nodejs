import { ToDoCollection } from "./toDoCollection";

export class ToDoApplication {
    public toDoCollection: ToDoCollection;

    constructor(author: string) {
        this.toDoCollection = new ToDoCollection(author);
    }
}