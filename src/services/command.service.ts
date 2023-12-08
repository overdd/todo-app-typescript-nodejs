import { ToDoApplication } from "../app/toDoApplication";

import { COMMANDS } from "../support/constants";
import shutdownService from "./shutdown.service";
import startupService from "./startup.service";

class CommandService{
    commands: string[];
    toDoApplication: TO;
    constructor() {  
        this.commands = COMMANDS;
        this.toDoApplication = null;
    }

    async check(command: string) {
        (this.commands.includes(command)) ? command : console.log(`This command not in the list of allowed commands`);
    }

    async executeCommand(userInput: string) {
        const inputArray = userInput.split(" ");
        const command = inputArray[0];
        const firstParameter = inputArray[1];
        const secondParameter = inputArray[2];

        await this.check(command);

        switch(command) {
            case ".exit":
                shutdownService.sayBye();
                break;
            case "name":
                firstParameter === "" ? console.log(`Try again. Name shouldn't be blank`) : this.toDoApplication = new ToDoApplication(firstParameter);
                console.log(`To Do App was created for user ${JSON.stringify(this.toDoApplication.toDoCollection.author)}`);
                break;
            case "add": 
                this.toDoApplication ? this.toDoApplication.addItem(firstParameter, secondParameter) : startupService.sayHello();

                break;
            default: 
                console.log(`Unknown command`);
        }
    }
}

export default new CommandService();