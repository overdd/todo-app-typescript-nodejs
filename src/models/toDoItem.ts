export class ToDoItem {
    constructor(public id: string, public task: string, public complete: boolean = false) {
    }
    
    printItem(): void {
        console.log(`${this.task} : ${this.complete ? "done" : "not done"}`);
    }
}