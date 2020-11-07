
/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');
const Todo = require('../src/todo');

document.getElementById('todoForm').addEventListener('submit', (event) => {
    //prevent default refresh functionnality of forms
    event.preventDefault()

    //input of the form
    const title = event.target[0]
    const description = event.target[1]

    const todo = new Todo(title.value,description.value,'nothing')

    //send todo to main process
    console.log(todo)
    ipcRenderer.send('add-todo',todo)

    //reset input
    title.value=''
    description.value=''
})