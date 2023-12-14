import { ToDoApplication } from "../app/toDoApplication";
import { parseNumber, parseDate } from "../support/helper";
import { COMMANDS } from "../support/constants";
import shutdownService from "./shutdown.service";
import startupService from "./startup.service";

class CommandService {
  commands: string[];
  toDoApplication: ToDoApplication | undefined;
  constructor() {
    this.commands = COMMANDS;
    this.toDoApplication = undefined;
  }

  async check(command: string) {
    this.commands.includes(command)
      ? command
      : console.log(`This command not in the list of allowed commands`);
  }

  async executeCommand(userInput: string) {
    const inputArray = userInput.split(" ");
    const command = inputArray[0];
    let firstParameter: string | boolean = inputArray[1];
    const secondParameter: string = inputArray[2];
    let thirdParameter: string | boolean = inputArray[3];
    let id: number;
    let formattedDate: Date;

    await this.check(command);

    switch (command) {
      case ".exit":
        shutdownService.sayBye();
        break;

      case "name":
        firstParameter === ""
          ? console.log(`Try again. Name shouldn't be blank`)
          : (this.toDoApplication = new ToDoApplication(firstParameter));
        console.log(
          `To Do App was created for user ${JSON.stringify(
            this.toDoApplication!.toDoCollection.author,
          )}`,
        );
        break;

      case "add":
        thirdParameter?.toLowerCase() === "true"
          ? (thirdParameter = true)
          : (thirdParameter = false);
        secondParameter
          ? (formattedDate = parseDate(secondParameter))
          : (formattedDate = new Date("01.01.2099"));
        this.toDoApplication
          ? (id = this.toDoApplication.toDoCollection.addItem(
              firstParameter,
              formattedDate,
              thirdParameter,
            ))
          : startupService.sayHello();
        console.log(`New task was added: ${firstParameter}, id: ${id!}`);
        break;

      case "get":
        id = parseNumber(firstParameter);
        Number.isNaN(id)
          ? console.log(`Wrong task id. Try again`)
          : this.toDoApplication?.toDoCollection.getItemById(id!);
        break;

      case "getall":
        firstParameter?.toLowerCase() == "true"
          ? (firstParameter = true)
          : (firstParameter = false);
        console.log(
          this.toDoApplication!.toDoCollection.getAllItems(firstParameter),
        );
        break;

      case "markdone":
        id = parseNumber(firstParameter);
        Number.isNaN(id)
          ? console.log(`Wrong task id. Try again`)
          : this.toDoApplication?.toDoCollection.markAsDone(id!);
        console.log(`Task ${id} marked as done`);
        break;

      case "marknotdone":
        id = parseNumber(firstParameter);
        Number.isNaN(id)
          ? console.log(`Wrong task id. Try again`)
          : this.toDoApplication?.toDoCollection.markAsNotDone(id!);
        console.log(`Task ${id} marked as not done`);
        break;

      case "removedone":
        this.toDoApplication?.toDoCollection.removeDoneItems();
        console.log(`Done tasks are removed`);
        break;

      case "markimportant":
        id = parseNumber(firstParameter);
        Number.isNaN(id)
          ? console.log(`Wrong task id. Try again`)
          : this.toDoApplication?.toDoCollection.markImportant(id!);
        console.log(`Task ${id} marked as important`);
        break;

      case "getimportant":
        console.log(this.toDoApplication!.toDoCollection.getImportant());
        break;

      case "export":
        this.toDoApplication?.exportToJson();
        break;

      default:
        console.log(`Unknown command. Try again`);
    }
  }
}

export default new CommandService();
