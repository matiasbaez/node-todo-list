const Task = require('./task');

class Tasks {

    constructor() {
        this._list = {};
    }

    createTask(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    createTaskFromArr(tasks = []) {
        tasks.forEach(task => this._list[task.id] = task);
    }

    get listTasks() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    getTasks() {
        this.listTasks.forEach((task, index) => {
            const idx = `${index + 1}`.green;
            const { description, completedAt } = task;
            const state = completedAt ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${description} :: ${state}`);
        });
    }

    getTasksPendingCompleted(completed = true) {

        let index = 0;
        this.listTasks.forEach(task => {
            const { description, completedAt } = task;
            const state = completedAt ? 'Completada'.green : 'Pendiente'.red;

            if (completed) {
                if (completedAt) {
                    index++;
                    console.log(`${(index + '.').green} ${description} :: ${state}`);
                }
            } else {
                if (!completedAt) {
                    index++;
                    console.log(`${(index + '.').green} ${description} :: ${state}`);
                }
            }
        });

        if (!this.listTasks.length) console.log('No hay tareas completadas');
    }

    removeTask(id) {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

}

module.exports = Tasks;
