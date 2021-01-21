import { app, BrowserWindow, nativeImage } from 'electron'
import { join, resolve } from 'path'
import * as url from 'url'

let mainWindow: BrowserWindow | null

const rootPath = resolve(__dirname, '..')

const createWindow = () => {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

  if (app.dock) {
    app.dock.setIcon(icon)
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    maxWidth: 1100,
    maxHeight: 900,
    icon,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
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
  }

  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(
      url.format({
        pathname: join(rootPath, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    )
    mainWindow.removeMenu()
  }
}

app.on('ready', createWindow)

app.allowRendererProcessReuse = true
