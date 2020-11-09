/* eslint-disable no-undef */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

// open Add todo window button
document.getElementById('createTodoBtn').addEventListener('click',() => {
    ipcRenderer.send('add-todo-window')
})

//helper
function addTodoToHtml(todoList, todo){
    todoList.innerHTML += `<li class="todo-item my-1">${todo.image + " " + todo.title}
                                <button name="${todo.id}" type="button" class="btn btn-info">
                                    Show
                                </button>
                                <button name="${todo.id}" type="button" class="btn btn-danger">
                                    Delete
                                </button>
                            </li>`
    return todoList
}

// on receive todos
ipcRenderer.on('todos', (event,todos) => {

    // get the todoList ul
    let todayList = document.getElementById('todayList')
    let tomorrowList = document.getElementById('tomorrowList')
    todayList.innerHTML = ``
    tomorrowList.innerHTML = ``

    //setup dates
    const today = (new Date()).toISOString().split('T')[0]
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = tomorrow.toISOString().split('T')[0]

    //add html lists
    for(let todo of todos){
        if(todo.date === today){
            todayList = addTodoToHtml(todayList,todo)
        } else if(todo.date === tomorrow){
            tomorrowList = addTodoToHtml(tomorrowList,todo)
        }
    }

    //add message if empty lists
    if(!todayList.innerHTML){
        todayList.innerHTML += `<div class="todo-item">You have nothing for today!</div>`
    }

    if(!tomorrowList.innerHTML){
        tomorrowList.innerHTML += `<div class="todo-item">You have nothing for tomorrow!</div>`
    }

})

//set listenenrs

ipcRenderer.on('set-lists', () => {
    //TODO : remove copy paste

    // add click handlers to delete the clicked todo
    todayList.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        }

        //check if button is delete and get todo title
        const isDelete = event.target.classList.contains('btn-danger')
        const todoId = event.target.name

        //if button is delete, delete the todo, else open edit todo window
        if(isDelete){
            if(confirm('Do you really want to delete this todo?')){
                ipcRenderer.send('delete-todo',todoId)
            }
        } else {
            ipcRenderer.send('edit-todo-window',todoId)
        }
      
    })

    // add click handlers to delete the clicked todo
    tomorrowList.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        }

        //check if button is delete and get todo title
        const isDelete = event.target.classList.contains('btn-danger')
        const todoId = event.target.name

        //if button is delete, delete the todo, else open edit todo window
        if(isDelete){
            if(confirm('Do you really want to delete this todo?')){
                ipcRenderer.send('delete-todo',todoId)
            }
        } else {
            ipcRenderer.send('edit-todo-window',todoId)
        }
      
    })
})

//browse windows

function showElement(id){

    let remindersDiv = document.getElementById('reminders')
    let calendarDiv = document.getElementById('calendar')

    //reset
    remindersDiv.style.display = "none"
    calendarDiv.style.display = "none"

    //will show a div based on what has been clicked
    switch(id){
        case 'reminders': 
            remindersDiv.style.display = "block";
            break

        case 'calendar': 
            calendarDiv.style.display = "block"; 
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

//calendar rendering

var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    displayEventTime: false,

    eventClick: function(info) {
        ipcRenderer.send('edit-todo-window',info.event.id);
    }
});

document.getElementById('btn_calendar').addEventListener('click', function() {
    calendar.render();
});

//helper
function createCalendarEvent(todo){
    calendarEvent = {
        id: todo.id,
        title: todo.title,
        start: todo.date,
        end: todo.date,
        allDay: false
    }
    return calendarEvent
}

ipcRenderer.on('set-calendar', (event,todos) => {
    //setup calendar
    for(let todo of todos){
        calendar.addEvent(createCalendarEvent(todo))
    }
})

ipcRenderer.on('add-calendar-event', (event,todo) => {
    //add an event
    calendar.addEvent(createCalendarEvent(todo))
})


ipcRenderer.on('remove-calendar-event', (event,todoId) => {
    //remove an event
    try {
        calendar.getEventById(todoId).remove() //this throws an arror for some reason
    } catch(e){
        //do nothing
    }
})