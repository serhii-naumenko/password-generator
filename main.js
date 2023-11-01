const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
  "P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
  "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=",
  "{","[","}","]",",","|",":",";","<",">",".","?","/"]

const lengthPasswordEl = document.getElementById('length-password')
const useSymbolsEl = document.getElementById('use-symbols')
const useDigitsEl = document.getElementById('use-digits')
const passwordOneEl = document.getElementById('passwordOne')
const passwordTwoEl = document.getElementById('passwordTwo')

const notificationEl = document.getElementById("notification")
const checkModeEl = document.getElementById('input-mode')
const pointModeEl = document.getElementById('point-mode')

const generatorEl = document.getElementById('generator')
const titleEl = document.getElementById('title')
const textEl = document.getElementById('text')
const legendEl = document.getElementById('legend')
const containerModeEl = document.getElementById('container-mode')

let lengthPassword = 15
let useSymbols = true
let useDigits = true
let start = false
let checkMode = false

function setParametr(event, name) {
  if (name === 'length') {
    const value = event.target.value
    if (value >= 6) {
      lengthPasswordEl.value = value
      lengthPassword = value
    } else {
      lengthPasswordEl.value = 6
      console.log(lengthPassword)
    }
  } else if (name === 'isSymbols') {
    useSymbolsEl.value = event.target.checked
    useSymbols = !useSymbols
  } else {
    useDigitsEl.value = event.target.checked
    useDigits = !useDigits
  }
}

function getRandomCharacter() {
  let usedCharacters = letters
  if (useSymbols && useDigits) {
    usedCharacters = letters.concat(digits, symbols)
  } else if (useSymbols && !useDigits) {
    usedCharacters = letters.concat(symbols)
  } else if (!useSymbols && useDigits) {
    usedCharacters = letters.concat(digits)
  }
  const randomIndex = Math.floor(Math.random() * usedCharacters.length)
  return usedCharacters[randomIndex]
}

function getRandomPassword() {
  start = true
  let passwordOne = ''
  let passwordTwo = ''
  for (let i = 0; i < lengthPassword; i++) {
    passwordOne += getRandomCharacter()
    passwordTwo += getRandomCharacter()
  }
  passwordOneEl.textContent = passwordOne
  passwordTwoEl.textContent = passwordTwo
}

function copyPassword(position) {
  if (start) {
    let text = passwordOneEl.textContent
    if (position === 'two') {
      text = passwordTwoEl.textContent
    }
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          notificationEl.style.display = "block";
          setTimeout(function() {
            notificationEl.style.display = "none";
          }, 2000);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error)
        });
    }
  }
}

function changeMode(event) {
  const checked = event.target.checked
  checkMode = checked
  if (checked) {
    pointModeEl.setAttribute('class', 'point-mode--light')
    generatorEl.setAttribute('class', 'generator--light')
    titleEl.setAttribute('class', 'title--light')
    textEl.setAttribute('class', 'text--light')
    legendEl.setAttribute('class', 'legend--light')
    containerModeEl.setAttribute('class', 'container-mode--light')
  } else {
    pointModeEl.setAttribute('class', 'point-mode--dark')
    generatorEl.setAttribute('class', 'generator--dark')
    titleEl.setAttribute('class', 'title--dark')
    textEl.setAttribute('class', 'text--dark')
    legendEl.setAttribute('class', 'legend--dark')
    containerModeEl.setAttribute('class', 'container-mode--dark')
  }
}
