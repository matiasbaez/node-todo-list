const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.green} Crear tareas` },
            { value: '2', name: `${'2.'.green} Listar tareas` },
            { value: '3', name: `${'3.'.green} Listar tareas completadas` },
            { value: '4', name: `${'4.'.green} Listar tareas pendientes` },
            { value: '5', name: `${'5.'.green} Completar tarea(s)` },
            { value: '6', name: `${'6.'.green} Borrar tarea` },
            { value: '0', name: `${'0.'.green} Salir \n` }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('Seleccione una opción'.green);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar`
        }
    ];

    await inquirer.prompt(question);
}

const readInput = async (message = '') => {
    const question = [
        {
            type: 'input',
            name: 'answer',
            message,
            validate(value) {
                if (value.length === 0) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ];

    console.log('\n');
    const { answer } = await inquirer.prompt(question);
    return answer;
}

const listTasksToRemove = async(tasks = []) => {
    const choices = tasks.map((task, index) => ({ value: task.id, name: `${index+1}. ${task.description}` }));
    choices.unshift({ value: 0, name: '0.'.green + ' Cancelar' });
    
    const taskQuestions = [
        {
            type: 'list',
            name: 'taskId',
            message: 'Borrar',
            choices
        }
    ];

    const { taskId } = await inquirer.prompt(taskQuestions);
    return taskId;
}

const showCheckList = async(tasks = []) => {
    const choices = tasks.map((task, index) => ({ value: task.id, name: `${index+1}. ${task.description}`, checked: (task.completedAt) ? true : false }));
    const taskQuestions = [
        {
            type: 'checkbox',
            name: 'taskIds',
            message: 'Selecciones',
            choices
        }
    ];

    const { taskIds } = await inquirer.prompt(taskQuestions);
    return taskIds;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    console.log('\n');
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    confirm,
    inquirerMenu,
    pause,
    readInput,
    showCheckList,
    listTasksToRemove
}
