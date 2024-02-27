const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')
const Client = require('./client')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

HOST = "192.168.2.18" // IP address of your Raspberry PI
PORT = 65432          // The port used by the server

mainClient = new Client(PORT, HOST)
mainClient.connect()

ipcMain.handle('move-car:straight', () => {
  console.log("Move Car Straight")
  mainClient.send("Move Car Straight")
})

ipcMain.handle('move-car:reverse', () => {
  console.log("Move Car Reverse")
  mainClient.send("Move Car Reverse")
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainClient.disconnect()
  }
})