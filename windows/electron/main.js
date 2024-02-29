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
PORT = 65435          // The port used by the server
let counter = 0

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

ipcMain.handle('move-car:left', () => {
  console.log("Move Car Left")
  mainClient.send("Move Car Left")
})

ipcMain.handle('move-car:right', () => {
  console.log("Move Car Right")
  mainClient.send("Move Car Right")
})

ipcMain.handle('move-car:selfDrive', () => {
  console.log("Self Drive")
  mainClient.send("Self Drive")
})

ipcMain.handle('move-car:stopSelfDrive', () => {
  console.log("Stop Self Drive")
  mainClient.send("Stop Self Drive")
})

ipcMain.handle('move-car:get', () => {
  console.log("Get Car Stats")
  mainClient.send("Get Car Stats")
  mainClient.receive()
  return counter++
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