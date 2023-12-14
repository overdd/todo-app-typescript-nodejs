import { ToDoItem } from "./toDoItem";

export class ToDoCollection {
  private nextId = 0;
  private itemMap = new Map<number, ToDoItem>();
  constructor(public author: string) {}

  addItem(task: string, dueDate?: Date, isDone = false): number {
    const newToDoItem = new ToDoItem(this.nextId++, task, dueDate, isDone);
    this.itemMap.set(newToDoItem.id, newToDoItem);
    return newToDoItem.id;
  }

  getItemById(id: number): ToDoItem | void {
    const foundItem = this.itemMap.get(id);
    if (!foundItem) {
      console.log(`No such item: ${id}`);
    }
    return foundItem;
  }

  getAllItems(includeDone: boolean): ToDoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeDone || !item.isDone,
    );
  }

  markAsDone(id: number) {
    const toDoItem: ToDoItem | void = this.getItemById(id);
    toDoItem ? (toDoItem.isDone = true) : toDoItem;
  }

  markAsNotDone(id: number) {
    const toDoItem: ToDoItem | void = this.getItemById(id);
    toDoItem ? (toDoItem.isDone = false) : toDoItem;
  }

  removeDoneItems() {
    this.itemMap.forEach((item) =>
      item.isDone ? this.itemMap.delete(item.id) : item,
    );
  }

  markImportant(id: number){
    const toDoItem: ToDoItem | void = this.getItemById(id);
    toDoItem ? (toDoItem.isImportant = true) : toDoItem;
  }

  getImportant(): ToDoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => item.isImportant
    );
  }
}
