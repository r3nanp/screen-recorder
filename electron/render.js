const { desktopCapturer, remote } = require('electron')
const { writeFile } = require('fs')
const { dialog, Menu } = remote

let mediaRecorder
const recordedChunks = []

const videoElement = document.querySelector('video')
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const videoSelectBtn = document.getElementById('selectBtn')

startBtn.onclick = () => {
  mediaRecorder.start()
  startBtn.classList.add('is-danger')
  startBtn.innerText = 'Start Recording! 🔴'
}

stopBtn.onclick = () => {
  mediaRecorder.stop()
  startBtn.classList.remove('is-danger')
  startBtn.innerText = 'Stop Recording! ⏱'
}

videoSelectBtn.onclick = getVideoSources

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
  })

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source),
      }
    })
  )

  videoOptionsMenu.popup()
}

async function selectSource(source) {
  videoSelectBtn.innerText = source.name

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      },
    },
  }

  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  videoElement.srcObject = stream
  videoElement.play()

  const options = { mimeType: 'video/webm; codecs=vp9' }
  mediaRecorder = new MediaRecorder(stream, options)

  mediaRecorder.ondataavailable = handleDataAvailable
  mediaRecorder.onstop = handleStop
}

function handleDataAvailable(e) {
  console.log('video data available')
  recordedChunks.push(e.data)
}

async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9',
  })

  const buffer = Buffer.from(await blob.arrayBuffer())

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save video',
    defaultPath: `vid-${Date.now()}.webm`,
  })

  writeFile(filePath, buffer, () => console.log('video saved successfully!'))
}
