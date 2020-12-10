const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

// Get styles from HTML
const getStyles = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialTheme = {
  bg: getStyles(html, '--bg'),
  text: getStyles(html, '--text'),
  primary: getStyles(html, '--primary'),
  primaryHover: getStyles(html, '--primary-hover'),
  red: getStyles(html, '--red'),
  redHover: getStyles(html, '--red-hover'),
  blue: getStyles(html, '--blue'),
}

const lightTheme = {
  bg: '#fcfcfc',
  text: '#121214',
  primary: '#09814A',
  primaryHover: '#04A777',
  red: '#DB2B39',
  redHover: '#F2545B',
  blue: '#5863F8',
}

// Set dynamic variables to change colors
const transformKey = key => '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()

const changeColors = colors => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  )
}

const isExistedLocalStorage = key => localStorage.getItem(key) !== null

const createOrEditLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getValue = key => JSON.parse(localStorage.getItem(key))

/* function that change theme when the checkbox is checked,
and create or edit a local storage to keep the theme */

checkbox.addEventListener('change', ({ target }) => {
  if (target.checked) {
    changeColors(lightTheme)
    createOrEditLocalStorage('mode', 'lightTheme')
  } else {
    changeColors(initialTheme)
    createOrEditLocalStorage('mode', 'initialTheme')
  }
})

if (!isExistedLocalStorage('mode')) {
  createOrEditLocalStorage('mode', 'lightTheme')
}

if (getValue('mode') === 'initialTheme') {
  checkbox.removeAttribute('checked')
  changeColors(initialTheme)
} else {
  checkbox.setAttribute('checked', '')
  changeColors(lightTheme)
}
