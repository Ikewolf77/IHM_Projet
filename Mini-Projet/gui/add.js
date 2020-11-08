
/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');
const Todo = require('../src/todo');

document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
    //when an emoji is selected, hide emoji picker and update shown emoji
    document.getElementById('emoji').innerHTML = `${event.detail.unicode}`
    document.getElementById('emoji-picker').style.display = "none"
});

document.getElementById('emoji-button').addEventListener('click', function() {
    document.getElementById('emoji-picker').style.display = "block"
});

document.getElementById('todoForm').addEventListener('submit', (event) => {
    //prevent default refresh functionnality of forms
    event.preventDefault()

    //input of the form
    const title = event.target[0]
    const description = event.target[1]
    const date = event.target[2]
    const image = document.getElementById('emoji').innerHTML

    const todo = new Todo(title.value, description.value, date.value,image)

    //send todo to main process
    console.log(todo)
    ipcRenderer.send('add-todo',todo)

    //reset input
    title.value=''
    description.value=''

    //close window
    ipcRenderer.send('close-add-window')
})