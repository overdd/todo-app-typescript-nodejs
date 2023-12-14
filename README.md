## ToDo App

The ToDo App is a simple task management tool that allows you to create, manage, and track your tasks. It features a command-line interface for easy use and provides the following functionalities:

1. **Create and manage tasks:** Add, edit and remove done tasks with ease.
2. **Mark tasks as done:** Easily track completed tasks and maintain a clear list of remaining to-dos.
3. **Set due dates:** Assign due dates to tasks to prioritize and plan your workload effectively.
4. **Search for tasks:** Filter tasks status (done/not done), or importance.
5. **Mark tasks as important:** Identify and prioritize essential tasks.
6. **Export task data:** Export task data in a human-readable format for backup or sharing.

### Usage:

1. Start the ToDo App by executing the following command in your terminal:

```
npm run start
```

2. Follow the prompts on the command line to interact with the app.

3. Use the following commands to manage your tasks:

   - `add <task> <dueDate> [isDone]`: Add a new task with a task description, optional due date, and optional done / not done status.

   - `get <id>`: Get the details of a specific task by providing its ID.

   - `getall [includeDone]`: Get all tasks, optionally excluding completed tasks.

   - `markdone <id>`: Mark a task as completed by providing its ID.

   - `marknotdone <id>`: Mark a task as incomplete by providing its ID.

   - `removedone`: Remove all completed tasks from the list.

   - `markimportant <id>`: Mark a task as important by providing its ID.

   - `getimportant`: Get all important tasks.

   - `export`: Export data to a file. 

   - `.exit`: Exit the ToDo App.


### Example Usage:

```
# Create a new task with a description, due date, and importance level
add task1 2023-12-31 true

# Get the details of the task with ID 1
get 1

# Get all tasks, including completed tasks
getall true

# Mark task with ID 2 as completed
markdone 2

# Mark task with ID 3 as unimportant
markimportant 3

# Get all important tasks
getimportant

# Export data to a file
export

# Exit the ToDo App
.exit
```

Happy task managing!