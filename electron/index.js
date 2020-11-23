const { app, BrowserWindow, nativeImage } = require('electron')
const { join, resolve } = require('path')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const rootPath = resolve(__dirname, '..')

const createWindow = () => {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

  if (app.dock) {
    app.dock.setIcon(icon)
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
  })

  mainWindow.loadFile(join(rootPath, 'src', 'index.html'))

  if (process.env.NODE_ENV === 'production') {
    mainWindow.removeMenu()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
