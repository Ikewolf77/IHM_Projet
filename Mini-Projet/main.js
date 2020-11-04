/* eslint-disable no-undef */
// Modules to control application life and create native browser window
const {app} = require('electron')
const Window = require('./src/window.js')

function main () {
  let mainWindow = new Window({
    file: './gui/index.html'
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