const electron = require('electron')
const { join } = require('path')
const App = require('spectron').Application

let app

beforeAll(() => {
  app = new App({
    path: electron,

    args: [join(__dirname, '../index.html')],
  })

  return app.start()
}, 15000)

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop()
  }
})

test('displays appropriate text', async () => {
  const text = await app.client.$('h1')

  const displayText = await text.getText()

  expect(displayText).toBe('⚡ Screen Recorder')
})
