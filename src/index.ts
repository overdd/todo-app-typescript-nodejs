import select from "@inquirer/select";
import { ToDoApplication } from "./app/toDoApplication";
import input from "@inquirer/input";

let toDoApplication: ToDoApplication;
let intake: string;

function displayToDoList(): void {
  if (toDoApplication) {
    console.log(
      `${
        toDoApplication.toDoCollection.author
      }'s ToDo app. Things to be done: ${toDoApplication.toDoCollection.getAllItems()}`,
    );
  } else {
    console.log("ToDo application is not created, please create one.");
  }
}

async function prompt(): Promise<void> {
  console.clear();
  displayToDoList();
  const answer = await select({
    message: `Select an option:`,
    choices: [
      {
        name: "Start",
        value: "start",
        description: "Start a new ToDO application",
        disabled: toDoApplication?.toDoCollection?.author ? true : false,
      },
      {
        name: "Quit",
        value: "quit",
        description: "Quit from ToDo application",
      },
    ],
  });
  switch (answer) {
    case "start":
      await input({ message: "What is your name?" });
      toDoApplication = new ToDoApplication(intake);
      break;
    case "quit":
      break;
  }
  if (answer === "quit") {
    console.log("Thank you for using the To-Do application.");
    process.exit();
  } else {
    prompt();
  }
}

prompt();
