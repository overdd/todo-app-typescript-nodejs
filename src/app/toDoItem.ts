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
      `${this.task} - ${this.dueDate ? this.dueDate : "no due date"}: ${
        this.isDone ? "done" : "not done"
      }`,
    );
  }
}
