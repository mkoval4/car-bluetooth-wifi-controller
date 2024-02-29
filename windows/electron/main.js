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
PORT = 65433          // The port used by the server
let counter = 0

mainClient = new Client(PORT, HOST)
mainClient.connect()

ipcMain.handle('move-car:forward', () => {
  mainClient.send("forward")
})

ipcMain.handle('move-car:reverse', () => {
  mainClient.send("reverse")
})

ipcMain.handle('move-car:left', () => {
  mainClient.send("left")
})

ipcMain.handle('move-car:right', () => {
  mainClient.send("right")
})

ipcMain.handle('car-stats:get', async () => {
  mainClient.send("get")
  const data = await mainClient.receive()
  console.log(data)
  return data
})

ipcMain.handle('car-stats:updateLeftAngle', (event, angle) => {
  mainClient.send(`leftAngle:${angle}`)
})

ipcMain.handle('car-stats:updateRightAngle', (event, angle) => {
  mainClient.send(`rightAngle:${angle}`)
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