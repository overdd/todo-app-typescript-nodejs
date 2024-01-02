import select from "@inquirer/select";
import { ToDoApplication } from "./app/toDoApplication";
import input from "@inquirer/input";
import chechbox from "@inquirer/checkbox";
import { CHOICES, MESSAGES } from "./support/constants";

let toDoApplication: ToDoApplication;
let intake: string;
let intakeArray: string[];
let intake2: string;

async function displayToDoList(): Promise<void> {
  if (toDoApplication) {
    console.log(
      `${toDoApplication.toDoCollection.author}'s ToDo app. Tasks to be done: ${
        (await toDoApplication.toDoCollection.getAllItems()).length
      }`,
    );
    (await toDoApplication.toDoCollection.getAllItems(true)).length === 0
      ? toDoApplication.toDoCollection
      : console.log(
          (await toDoApplication.toDoCollection.getAllItems()).forEach((item) =>
            item.printItem(),
          ),
        );
  } else {
    console.log("ToDo application is not created, please create one.");
  }
}

async function prompt() {
  console.clear();
  displayToDoList();
  const answer = await select({
    message: `Select an option:`,
    choices: [
      {
        ...CHOICES.start,
        disabled: toDoApplication?.toDoCollection?.author ? true : false,
      },
      {
        ...CHOICES.add,
        disabled: toDoApplication?.toDoCollection?.author ? false : true,
      },
      {
        ...CHOICES.markDone,
        disabled:
          (await toDoApplication?.toDoCollection?.getAllItems(false))?.length >
          0
            ? false
            : true,
      },
      {
        ...CHOICES.markNotDone,
        disabled:
          (await toDoApplication?.toDoCollection?.getDoneItems())?.length > 0
            ? false
            : true,
      },
      {
        ...CHOICES.markImportant,
        disabled:
          (await toDoApplication?.toDoCollection?.getAllItems(true))?.length -
            toDoApplication?.toDoCollection?.getImportant?.length !=
            0 && toDoApplication?.toDoCollection?.author
            ? false
            : true,
      },
      {
        ...CHOICES.clear,
        disabled:
          (await toDoApplication?.toDoCollection?.getDoneItems())?.length > 0
            ? false
            : true,
      },
      {
        ...CHOICES.export,
        disabled: toDoApplication?.toDoCollection?.author ? false : true,
      },
      {
        ...CHOICES.quit,
      },
    ],
  });
  
  switch (answer) {
    case "start":
      intake = await input({ message: MESSAGES.WHATSYOURNAME });
      toDoApplication = new ToDoApplication(intake);
      break;
    case "add":
      intake = await input({ message: MESSAGES.DESCRIBETASK });
      intake2 = await input({ message: MESSAGES.WHATSDUEDATE });
      toDoApplication.toDoCollection.addItem(intake, intake2);
      break;
    case "markdone":
      intakeArray = await chechbox({
        message: MESSAGES.MARKDONE,
        choices: [
          ...(await toDoApplication.toDoCollection.getAllItems()).map(
            (todoItem) => ({
              name: todoItem.task,
              value: todoItem.id.toString(),
            }),
          ),
        ],
      });
      intakeArray.forEach((item) =>
        toDoApplication.toDoCollection.markAsDone(+item),
      );
      break;
    case "marknotdone":
      intakeArray = await chechbox({
        message: MESSAGES.MARKNOTDONE,
        choices: [
          ...(await toDoApplication.toDoCollection.getDoneItems()).map(
            (todoItem) => ({
              name: todoItem.task,
              value: todoItem.id.toString(),
            }),
          ),
        ],
      });
      intakeArray.forEach((item) =>
        toDoApplication.toDoCollection.markAsNotDone(+item),
      );
      break;
    case "markimportant":
      intakeArray = await chechbox({
        message: MESSAGES.MARKIMPORTANT,
        choices: [
          ...(await toDoApplication.toDoCollection.getAllItems()).map(
            (todoItem) => ({
              name: todoItem.task,
              value: todoItem.id.toString(),
            }),
          ),
        ],
      });
      intakeArray.forEach((item) =>
        toDoApplication.toDoCollection.markImportant(+item),
      );
      break;
    case "clear":
      toDoApplication.toDoCollection.removeDoneItems();
      break;
    case "export":
      toDoApplication.exportToJson();
      break;
  }

  if (answer === "quit") {
    console.log(MESSAGES.FAREWELL);
    process.exit();
  } else {
    prompt();
  }
}

prompt();
