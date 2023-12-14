import { ToDoCollection } from "./toDoCollection";
import fs from "fs";

export class ToDoApplication {
  public toDoCollection: ToDoCollection;

  constructor(author: string) {
    this.toDoCollection = new ToDoCollection(author);
  }

  exportToJson(): void {
    const toDoItems = this.toDoCollection.getAllItems(true);
    const fileName = `todo_items.json`;
    try {
      fs.writeFileSync(fileName, JSON.stringify(this.toDoCollection) + "\n");
      toDoItems.forEach((item) => {
        fs.appendFileSync(fileName, JSON.stringify(item) + "\n");
      });
      console.log(`ToDo items exported to ${fileName}`);
    } catch (error) {
      console.error("Error exporting todo items to JSON file:", error);
    }
  }
}
