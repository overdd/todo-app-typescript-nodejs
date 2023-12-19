import select from "@inquirer/select";
import { ToDoApplication } from "./app/toDoApplication";
import input from "@inquirer/input";
import { parseDate } from "./support/helper";

let toDoApplication: ToDoApplication;
let intake: string;
let intake2: string;

function displayToDoList(): void {
  if (toDoApplication) {
    console.log(
      `${
        toDoApplication.toDoCollection.author
      }'s ToDo app. Things to be done: ${toDoApplication.toDoCollection.getAllItems().length}`,
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
        name: "Add",
        value: "add",
        description: "Add a new task",
        disabled: toDoApplication?.toDoCollection?.author ? false : true,
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
      intake = await input({ message: "What is your name?" });
      toDoApplication = new ToDoApplication(intake);
      break;
    case "add":
      intake = await input({ message:'Describe the task:' });
      intake2 = await input({ message:'What is due date?' });
      toDoApplication.toDoCollection.addItem(intake, parseDate(intake2));
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
