export const queries = {
  createNewTable:
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT, dueDate TEXT, isDone BOOLEAN, isImportant BOOLEAN)",
  addTask:
    "INSERT INTO todos (task, dueDate, isDone, isImportant) VALUES (?, ?, ?, ?)",
  getAll: (includeDone: boolean) => {
    return `SELECT * FROM todos ${includeDone ? "" : "WHERE isDone = 0"}`;
  },
  getDone: "SELECT * FROM todos WHERE isDone = 1",
  getItemById: (id: number) => {
    return `SELECT * FROM todos WHERE id = ${id}`;
  },
  markAsDone: (id: number) => {
    return `UPDATE todos SET isDone = 1 WHERE id = ${id}`;
  },
  markNotDone: (id: number) => {
    return `UPDATE todos SET isDone = 0 WHERE id = ${id}`;
  },
  getImportant: "SELECT * FROM todos WHERE isImportant = 1",
  markimportant: (id: number) => {
    return `UPDATE todos SET isImportant = 1 WHERE id = ${id}`;
  },
  removeDoneItems: "DELETE FROM todos WHERE isDone = 1",
};
