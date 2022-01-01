// const { showMenu, pause } = require('./helpers/messages');

const { inquirerMenu, pause, readInput, listTasksToRemove, confirm, showCheckList } = require('./helpers/inquirer');
const { saveTasks, loadTasks } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';

    const tasks = new Tasks();
    const fileTasks = loadTasks();

    if (fileTasks) {
        tasks.createTaskFromArr(fileTasks);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const description = await readInput('Descripción: ');
                tasks.createTask(description);
                break;
        
            case '2':
                tasks.getTasks();
                break;
                
            case '3':
                tasks.getTasksPendingCompleted();
                break;

            case '4':
                tasks.getTasksPendingCompleted(false);
                break;

            case '5':
                const taskIds = await showCheckList(tasks.listTasks);
                tasks.toggleCompleted(taskIds);
                break;

            case '6':
                const id = await listTasksToRemove(tasks.listTasks);
                if (id !== 0) {
                    const ok = await confirm('¿Estas seguro de confirmar que desea borrarlo?');
                    if (ok) {
                        tasks.removeTask(id);
                        console.log('La tarea ha sido eliminada correctamente');
                    }
                }
                break;
        }

        saveTasks(tasks.listTasks);

        if (opt !== '0') await pause();
    } while (opt !== '0');
}

main();