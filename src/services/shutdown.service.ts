class ShutDownService{
    constructor() {}
    sayBye() {
        console.log(`Good bye!`);
        process.exit();
    }
}

export default new ShutDownService();