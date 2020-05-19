// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

let win = null
let contents = null


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    //transparent:true,
    //frame:false,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    },
  })

  // and load the index.html of the app.
  win.loadURL('http://localhost:3000')

}

function toggleDevTools() {
  contents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  createShortcuts()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', recreateWindow)


function recreateWindow() {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}