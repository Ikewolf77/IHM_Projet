/* eslint-disable no-undef */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// open Add todo window button
document.getElementById('createTodoBtn').addEventListener('click',() => {
    ipcRenderer.send('add-todo-window')
})

// on receive todos
ipcRenderer.on('todos', (event,todos) => {

    // get the todoList ul
    const todoList = document.getElementById('todoList')

    todoList.innerHTML = ``

    // create html string
    const todoItems = todos.reduce((html, todo) =>{
        html += `<li class="todo-item">${todo}</li>`
        return html
    },'')

    // set list html to the todo items
    todoList.innerHTML += todoItems

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})

//browse windows

let remindersDiv = document.getElementById('reminders')
let calendarDiv = document.getElementById('calendar')
let notesDiv = document.getElementById('notes')

function showElement(id){

    //reset
    remindersDiv.style.display = "none"
    calendarDiv.style.display = "none"
    notesDiv.style.display = "none"
    /*
    documents.getElementById("label_reminders").className = "btn btn-secondary"
    documents.getElementById("label_calendar").className = "btn btn-secondary"
    documents.getElementById("label_notes").className = "btn btn-secondary"*/

    switch(id){
        case 'reminders': 
            remindersDiv.style.display = "block";
            //document.getElementById("label_reminders").classList.add('active')
            break

        case 'calendar': 
            calendarDiv.style.display = "block"; 
            //document.getElementById("label_calendar").classList.add('active')
            break
            
        case 'notes': 
            notesDiv.style.display = "block"
            //document.getElementById("label_notes").classList.add('active')
            break
    }
}

//first loading
showElement('reminders')

document.getElementById('btn_reminders').addEventListener('click',() => {
    showElement('reminders')
})

document.getElementById('btn_calendar').addEventListener('click',() => {
    showElement('calendar')
})

document.getElementById('btn_notes').addEventListener('click',() => {
    showElement('notes')
})