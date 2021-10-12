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
            message: `Presione ${'ENTER'.green} para continuar`
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

module.exports = {
    inquirerMenu,
    pause,
    readInput
}
