
/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

document.getElementById('todoForm').addEventListener('submit', (event) => {
    //prevent default refresh functionnality of forms
    event.preventDefault()

    //input of the form
    const input = event.target[0]

    //send todo to main process
    ipcRenderer.send('add-todo',input.value)

    //reset input
    input.value=''
})