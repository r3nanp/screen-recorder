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

test('Must click in the buttons', async () => {
  const button = await app.client.$('button')

  button.click()

  expect(button)
})
