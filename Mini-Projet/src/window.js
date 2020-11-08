/* eslint-disable no-undef */
const {BrowserWindow} = require('electron')

const defaultProps = {
    width: 1600,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor ({file, ...windowSettings}) {
    
        super({...defaultProps, ...windowSettings})

        //load html and open devtools
        this.loadFile(file)
        //this.webContents.openDevTools()
        this.removeMenu()

        // show when ready to prevent flickering
        this.once('ready-to-show',() => {
            this.show()
        })
    }
}

module.exports = Window