import { ToDoApplication } from "../app/toDoApplication";
import { parseNumber } from "../support/helper";
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
    let secondParameter: string | boolean = inputArray[2];

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
        secondParameter?.toLowerCase() === "true"
          ? (secondParameter = true)
          : (secondParameter = false);
        this.toDoApplication
          ? this.toDoApplication.toDoCollection.addItem(
              firstParameter,
              secondParameter,
            )
          : startupService.sayHello();
        console.log(`New task was added: ${firstParameter}`);
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
        const id = parseNumber(firstParameter);
        Number.isNaN(id) ? console.log(`Wrong task id. Try again`) : this.toDoApplication?.toDoCollection.markAsDone(id!);
        break;
      default:
        console.log(`Unknown command. Try again`);
    }
  }
}

export default new CommandService();
