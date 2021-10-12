const fs = require('fs');

const file = './outputs/data.json';

const loadTasks = () => {
    if (!fs.existsSync(file)) return null;

    const info = fs.readFileSync(file, { encoding: 'utf-8' });
    return JSON.parse(info);
}

const saveTasks = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

module.exports = {
    loadTasks,
    saveTasks,
}
