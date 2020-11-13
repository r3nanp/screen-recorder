const { app, BrowserWindow } = require('electron')
const { join } = require('path')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon: join(__dirname, '/build/video-camera.png'),
    darkTheme: true,
    backgroundColor: '#41414d',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
  })

  mainWindow.loadFile(join(__dirname, 'index.html'))

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
