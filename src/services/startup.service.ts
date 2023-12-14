class StartUpService {
  constructor() {}
  sayHello() {
    console.log(`Welcome to To Do App! 
        \nPlease enter "name YourName" to start... 
        \nUse --help command to access help section.`);
  }
}

export default new StartUpService();
