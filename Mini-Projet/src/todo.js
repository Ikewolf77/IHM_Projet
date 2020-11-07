
/* eslint-disable no-undef */
const { v4: uuidv4 } = require('uuid');

class Todo {
    constructor(title, description, date, image){
        this.id = uuidv4()
        this.title = title
        this.date = date
        this.description = description
        this.image = image
    }
}

module.exports = Todo