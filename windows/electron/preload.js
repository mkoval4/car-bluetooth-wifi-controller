const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('moveCar', {
  forward: () => ipcRenderer.invoke('move-car:forward'),
  reverse: () => ipcRenderer.invoke('move-car:reverse'),
  left: () => ipcRenderer.invoke('move-car:left'),
  right: () => ipcRenderer.invoke('move-car:right')
})

contextBridge.exposeInMainWorld('carStats', {
  get: () => ipcRenderer.invoke('car-stats:get'),
  updateLeftAngle: (angle) => ipcRenderer.invoke('car-stats:updateLeftAngle', angle),
  updateRightAngle: (angle) => ipcRenderer.invoke('car-stats:updateRightAngle', angle)
})