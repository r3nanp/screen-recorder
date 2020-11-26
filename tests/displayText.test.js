const electron = require('electron')
const { join } = require('path')
const App = require('spectron').Application

const path = join(__dirname, '..')
jest.setTimeout(10000)
let app = null

beforeAll(() => {
  app = new App({
    path: electron,

    args: [join(path, 'src', 'index.html')],
  })

  return app.start()
}, 15000)

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop()
  }
})

test('displays appropriate text', async () => {
  const text = await app.client.$('strong')

  const displayText = await text.getText()

  expect(displayText).toBe('⚡ Screen Recorder')
})
