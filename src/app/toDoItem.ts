export class ToDoItem {
  constructor(
    public id: number,
    public task: string,
    public isDone: boolean = false,
  ) {}

  printItem(): void {
    console.log(`${this.task} : ${this.isDone ? "done" : "not done"}`);
  }
}
