import sqlite from "better-sqlite3";
import { ToDoItem, IRow } from "../app/toDoItem";
import { queries } from "./query.db";

class DBHandler {
  public async createMainTable(db: sqlite.Database) {
    const createQuery = db.prepare(queries.createNewTable);
    createQuery.run();
  }

  public async add(
    db: sqlite.Database,
    task: string,
    dueDate: string,
    isDone = false,
  ): Promise<number | bigint> {
    const saveQuery = db.prepare(queries.addTask);
    const queryResult = saveQuery.run(
      task,
      dueDate,
      isDone === true ? 1 : 0,
      0,
    );
    return queryResult.lastInsertRowid;
  }

  public async getAll(
    db: sqlite.Database,
    includeDone: boolean,
  ): Promise<ToDoItem[]> {
    const getQuery = db.prepare(queries.getAll(includeDone));
    const queryResult = getQuery.all();
    return queryResult.map((row) => ToDoItem.fromRow(row as IRow));
  }

  public async getDone(db: sqlite.Database): Promise<ToDoItem[]> {
    const getQuery = db.prepare(queries.getDone);
    const queryResult = getQuery.all();
    return queryResult.map((row) => ToDoItem.fromRow(row as IRow));
  }

  public async getItemById(db: sqlite.Database, id: number): Promise<ToDoItem> {
    const getQuery = db.prepare(queries.getItemById(id));
    const queryResult = getQuery.get();
    return ToDoItem.fromRow(queryResult as IRow);
  }

  public async markAsDone(db: sqlite.Database, id: number): Promise<void> {
    const updateQuery = db.prepare(queries.markAsDone(id));
    updateQuery.run();
  }

  public async markAsNotDone(db: sqlite.Database, id: number): Promise<void> {
    const updateQuery = db.prepare(queries.markNotDone(id));
    updateQuery.run();
  }

  public async getImportant(db: sqlite.Database): Promise<ToDoItem[]> {
    const selectQuery = db.prepare(queries.getImportant);
    const queryResult = selectQuery.all();
    return queryResult.map((row) => ToDoItem.fromRow(row as IRow));
  }

  public async markImportant(db: sqlite.Database, id: number): Promise<void> {
    const updateQuery = db.prepare(queries.markimportant(id));
    updateQuery.run();
  }

  public async removeDoneItems(db: sqlite.Database): Promise<void> {
    const deleteQuery = db.prepare(queries.removeDoneItems);
    deleteQuery.run();
  }
}

export default new DBHandler();
