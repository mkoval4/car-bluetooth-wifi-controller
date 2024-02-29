const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('moveCar', {
  straight: () => ipcRenderer.invoke('move-car:straight'),
  reverse: () => ipcRenderer.invoke('move-car:reverse'),
  left: () => ipcRenderer.invoke('move-car:left'),
  right: () => ipcRenderer.invoke('move-car:right'),
  selfDrive: () => ipcRenderer.invoke('move-car:selfDrive'),
  stopSelfDrive: () => ipcRenderer.invoke('move-car:stopSelfDrive'),
  get: () => ipcRenderer.invoke('move-car:get')
})