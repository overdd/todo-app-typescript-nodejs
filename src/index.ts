import readline from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import commandService from "./services/command.service";
import startUpService from "./services/startup.service";
import shutdownService from "./services/shutdown.service";

const main = () => {
    const rl = readline.createInterface({ input, output });

    startUpService.sayHello();

    rl.on("line", async (data) => {
        await commandService.executeCommand(data);
    })

    rl.on("SIGINT", () => {
        shutdownService.sayBye();
    }) 

};

main();