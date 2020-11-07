/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

//set todo
ipcRenderer.on('todo', (event,todo) => {
    document.getElementById('title').innerHTML = `${todo.title}`
    document.getElementById('description').innerHTML = `${todo.description}`
    document.getElementById('date').innerHTML = `${todo.date}`
})