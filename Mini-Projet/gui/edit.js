/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

ipcRenderer.on('todo', (event,todo) => {
    document.getElementById('title').innerHTML = `${todo.title}`
})