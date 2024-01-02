import Database from "better-sqlite3";
// import { ToDoItem } from "./toDoItem";
import sqlite from "better-sqlite3";
import dbHandler from "../db/handler.db";
import { ToDoItem } from "./toDoItem";

export class ToDoCollection {
  private db!: sqlite.Database;
  constructor(public author: string) {
    try {
      this.db = new Database(`src/db/${this.author}.sqlite3`);
      dbHandler.createMainTable(this.db);
    } catch (error) {
      console.error("Failed to connect to database:", error);
    }
  }

  addItem(
    task: string,
    dueDate: string,
    isDone = false,
  ): Promise<number | bigint> {
    const dateString = dueDate == "" ? "No due date" : dueDate;
    return dbHandler.add(this.db, task, dateString, isDone);
  }

  getItemById(id: number): Promise<ToDoItem> {
    return dbHandler.getItemById(this.db, id);
  }

  async getDoneItems(): Promise<ToDoItem[]> {
    return await dbHandler.getDone(this.db);
  }

  async getAllItems(includeDone = false): Promise<ToDoItem[]> {
    return await dbHandler.getAll(this.db, includeDone);
  }

  async markAsDone(id: number): Promise<void> {
    await dbHandler.markAsDone(this.db, id);
  }

  async markAsNotDone(id: number): Promise<void> {
    await dbHandler.markAsNotDone(this.db, id);
  }

  async removeDoneItems(): Promise<void> {
    await dbHandler.removeDoneItems(this.db);
  }

  async markImportant(id: number): Promise<void> {
    await dbHandler.markImportant(this.db, id);
  }

  async getImportant(): Promise<ToDoItem[]> {
    return await dbHandler.getImportant(this.db);
  }
}
