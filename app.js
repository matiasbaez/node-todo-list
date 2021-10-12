// const { showMenu, pause } = require('./helpers/messages');

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';

    const tasks = new Tasks();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const description = await readInput('Descripción: ');
                tasks.createTask(description);
                break;
        
            case '2':
                console.log(tasks.listTasks);
                break;
                
            case '3':
                break;

            case '4':
                break;

            case '5':
                break;

            case '6':
                break;
        }

        if (opt !== '0') await pause();
    } while (opt !== '0');
}

main();