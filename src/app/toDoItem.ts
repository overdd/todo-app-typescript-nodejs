export interface IRow {
  id: number;
  task: string;
  dueDate: Date;
  isDone: 0 | 1;
  isImportant: 0 | 1;
}

export class ToDoItem {
  constructor(
    public id: number,
    public task: string,
    private dueDate?: Date,
    public isDone: boolean = false,
    public isImportant: boolean = false,
  ) {}

  printItem(): void {
    console.log(
      `${this.id}: ${this.task} - ${this.dueDate}: ${
        this.isDone ? "done" : "not done"
      }: ${this.isImportant ? "important" : "not important"}`,
    );
  }

  static fromRow(row: IRow): ToDoItem {
    return new ToDoItem(
      row.id,
      row.task,
      row.dueDate,
      row.isDone !== 0,
      row.isImportant !== 0,
    );
  }
}
