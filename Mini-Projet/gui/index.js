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
        html += `<li class="todo-item">${todo.title}
                    <button name="${todo.id}" type="button" class="btn btn-info">
                        Show or Edit
                    </button>
                    <button name="${todo.id}" type="button" class="btn btn-danger">
                        Delete
                    </button>
                </li>`
        return html
    },'')

    // set list html to the todo items
    todoList.innerHTML += todoItems

    // add click handlers to delete the clicked todo
    todoList.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        }

        //check if button is delete and get todo title
        const isDelete = event.target.classList.contains('btn-danger')
        const todoId = event.target.name

        //if button is delete, delete the todo, else open edit todo window
        if(isDelete){
            ipcRenderer.send('delete-todo',todoId)
        } else {
            ipcRenderer.send('edit-todo-window')
        }
      
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

    //will show a div based on what has been clicked
    switch(id){
        case 'reminders': 
            remindersDiv.style.display = "block";
            break

        case 'calendar': 
            calendarDiv.style.display = "block"; 
            break
            
        case 'notes': 
            notesDiv.style.display = "block"
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

//calendar rendering
document.getElementById('btn_calendar').addEventListener('click', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
});