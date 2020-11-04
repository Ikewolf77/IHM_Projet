/* eslint-disable no-undef */
// Modules to control application life and create native browser window
const {app, ipcMain} = require('electron')
const path = require('path')

//custom includes
const Window = require('./src/window.js')
const DataStore = require('./src/datastore.js')

const todosData = new DataStore({ name: 'Todos Main'})

function main () {

  //windows
  let mainWindow = new Window({
    file: './gui/index.html'
  })
  let addTodoWindow

  //initialize main window with todos
  mainWindow.once('show',() => {
    mainWindow.webContents.send('todos', todosData.getTodos())
  })

  //create add todo window
  ipcMain.on('add-todo-window',() => {
    //check if window does not already exist
    if(!addTodoWindow) {
      addTodoWindow = new Window({
        file: path.join('renderer','add.html'),
        width: 400,
        height: 400,
        //close the main window
        parent: mainWindow
      })

      //cleanup
      addTodoWindow.on('closed', () => {
        addTodoWindow = null
      })
    }
  })

  //add todo from add todo window
  ipcMain.on('add-todo', (event,todo) => {
    const updatedTodos = todosData.addTodo(todo).getTodos()
    mainWindow.send('todos',updatedTodos)
  })

  //Delete todo from todo list window
  ipcMain.on('delete-todo', (event,todo) => {
    const updatedTodos = todosData.deleteTodo(todo).getTodos()
    mainWindow.send('todos',updatedTodos)
  })
}



app.on('ready',main)

app.on('window-all-closed', function() {
  app.quit()
})

/*
const DataStore = require("./src/datastore");

const todosData = new DataStore({ name: 'Todos Main'})

todosData
    .addTodo('I love birds')
    .addTodo('Me too')
    .addTodo('I don\'t')
    .deleteTodo('I don\'t')

console.log(todosData.getTodos())*/