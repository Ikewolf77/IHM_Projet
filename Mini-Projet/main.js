/* eslint-disable no-undef */
// Modules to control application life and create native browser window
const {app, ipcMain} = require('electron')

//custom includes
const Window = require('./src/window')
const DataStore = require('./src/datastore')

const todosData = new DataStore({ name: 'Todos Main'})

function main () {

  //windows
  let mainWindow = new Window({
    file: './gui/index.html'
  })
  let addTodoWindow
  let editTodoWindow

  //initialize main window with todos
  mainWindow.once('show',() => {
    mainWindow.webContents.send('todos', todosData.todos)
    mainWindow.webContents.send('set-calendar', todosData.todos)
  })

  //create add todo window
  ipcMain.on('add-todo-window',() => {
    //check if window does not already exist
    if(!addTodoWindow) {
      addTodoWindow = new Window({
        file: './gui/add.html',
        width: 1280,
        height: 720,
        //close the main window
        parent: mainWindow
      })

      //cleanup
      addTodoWindow.on('closed', () => {
        addTodoWindow = null
      })

    }
  })

  //create add todo window
  ipcMain.on('edit-todo-window',(event, todoId) => {
    //check if window does not already exist
    if(!editTodoWindow) {
      editTodoWindow = new Window({
        file: './gui/edit.html',
        width: 1280,
        height: 720,
        //close the main window
        parent: mainWindow
      })

      //send todo to new window
      editTodoWindow.once('show',() => {
        currentTodo = todosData.getTodo(todoId)
        editTodoWindow.send('todo', currentTodo)
      })

      //cleanup
      editTodoWindow.on('closed', () => {
        editTodoWindow = null
      })
    }
  })

  //add todo from add todo window
  ipcMain.on('add-todo', (event,todo) => {
    //update calendar
    mainWindow.send('add-calendar-event',todo)

    //update database and reminders
    const updatedTodos = todosData.addTodo(todo).todos
    mainWindow.send('todos',updatedTodos)
  })

  //Delete todo from todo list window
  ipcMain.on('delete-todo', (event,todoId) => {
    //update calendar
    mainWindow.send('remove-calendar-event',todoId)

    //update database and reminders
    const updatedTodos = todosData.deleteTodo(todoId).todos
    mainWindow.send('todos',updatedTodos)
  })

  //close add window
  ipcMain.on('close-add-window', () => {
    addTodoWindow.close()
    addTodoWindow = null
  })

  //close add window
  ipcMain.on('close-edit-window', () => {
    editTodoWindow.close()
    editTodoWindow = null
  })

}

app.on('ready',main)

app.on('window-all-closed', function() {
  app.quit()
})