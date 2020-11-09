/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

function toDateString(date){
    if(date.length < 10){
        throw new Error("Invalid date format in toDateString")
    }

    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8,10)
    let monthWord
    let suffix = "th"

    switch(month){
        case '01': monthWord = 'January'; suffix = "st"; break
        case '02': monthWord = 'February'; suffix = "nd"; break
        case '03': monthWord = 'March'; break
        case '04': monthWord = 'April'; break
        case '05': monthWord = 'May'; break
        case '06': monthWord = 'June'; break
        case '07': monthWord = 'July'; break
        case '08': monthWord = 'August'; break
        case '09': monthWord = 'September'; break
        case '10': monthWord = 'October'; break
        case '11': monthWord = 'November'; break
        case '12': monthWord = 'December'; break
        default: throw new Error("Invalid date format in toDateString")
    }

    return day + suffix + " of " + monthWord + " " + year
}

//set todo
ipcRenderer.on('todo', (event,todo) => {

    window.globalTodo = todo
    document.getElementById('emoji').innerHTML = `${todo.image}`
    document.getElementById('title').innerHTML = `${todo.title}`
    document.getElementById('description').innerHTML = `${todo.description}`
    document.getElementById('date').innerHTML = `To do on the ${toDateString(todo.date)}`
})

//quit button
document.getElementById('btn_quit').addEventListener('click',() => {
    //close window
    ipcRenderer.send('close-edit-window')
})

//Delete
document.getElementById('btn_delete').addEventListener('click',() => {
    if(confirm('Do you really want to delete this todo?')){
        ipcRenderer.send('close-edit-window')
        ipcRenderer.send('delete-todo', window.globalTodo.id)
    }
})

