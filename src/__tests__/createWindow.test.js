const Electron = require('electron')
const { join } = require('path')
const App = require('spectron').Application

let app

beforeAll(() => {
  app = new App({
    path: Electron,

    args: [join(__dirname, '../index.html')],
  })

  return app.start()
}, 15000)

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop()
  }
})

test('show application window', async () => {
  const windowCount = await app.client.getWindowCount()

  expect(windowCount).toBe(1)
})
