const electron = require('electron')
const { join } = require('path')
const App = require('spectron').Application

const path = join(__dirname, '..')
jest.setTimeout(10000)
let app = null

beforeAll(() => {
  app = new App({
    path: electron,

    args: [join(path, 'electron', 'index.js')],
  })

  return app.start()
}, 15000)

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop()
  }
})

test('show application window', async () => {
  const isVisible = await app.browserWindow.isVisible()
  expect(isVisible).toBe(true)

  const windowCount = await app.client.getWindowCount()
  expect(windowCount).toEqual(1)
})
