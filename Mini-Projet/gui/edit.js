/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

//set todo
ipcRenderer.on('todo', (event,todo) => {

    window.globalTodo = todo
    document.getElementById('emoji').innerHTML = `${todo.image}`
    document.getElementById('title').innerHTML = `${todo.title}`
    document.getElementById('description').innerHTML = `${todo.description}`
    document.getElementById('date').innerHTML = `To do on ${todo.date}`
})

//quit button
document.getElementById('btn_quit').addEventListener('click',() => {
    //close window
    ipcRenderer.send('close-edit-window')
})

//Delete
document.getElementById('btn_delete').addEventListener('click',() => {
    ipcRenderer.send('close-edit-window')
    ipcRenderer.send('delete-todo', window.globalTodo.id)
})

