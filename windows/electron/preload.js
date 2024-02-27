const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('moveCar', {
  straight: () => ipcRenderer.invoke('move-car:straight'),
  reverse: () => ipcRenderer.invoke('move-car:reverse')
})