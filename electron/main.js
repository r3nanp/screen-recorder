import { app, BrowserWindow, nativeImage } from 'electron'
import { join, resolve } from 'path'
import * as url from 'url'

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
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(
      url.format({
        pathname: join(rootPath, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    )
  } else {
    throw new Error('Error to find HTML')
  }

  if (process.env.NODE_ENV === 'production') {
    mainWindow.removeMenu()
  }
}

app.on('ready', createWindow)

app.allowRendererProcessReuse = true
