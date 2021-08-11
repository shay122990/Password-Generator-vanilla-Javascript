const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperCaseEl = document.getElementById('uppercase');
const lowerCaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText
  if (!password) {
    return
  }
  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password is copied!')
})
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value //'+' converts the value to a number
  const hasUpper = upperCaseEl.checked
  const hasLower = lowerCaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked
  resultEl.innerText= generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

function generatePassword(lower,upper,number,symbol,length) {
  let gerenartedPassword = ''
  //The count of checked boxes
  const checkedCount = lower + upper + number + symbol
  //filter through a value of 'false'
  const checkedArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])
  if (checkedCount === 0) {
    return ''
  }
//Loop though checkedCount then,  grab index name of chackedArray and add a a randomFunc to empyt string.
  for (let i = 0; i < length; i+= checkedCount){
    checkedArray.forEach(type => {
      const funcName = Object.keys(type)[0]
      gerenartedPassword += randomFunc[funcName]()
    })
  }
// grab the generatedPassword and slice the characters and return it. 
  const finalPassword = gerenartedPassword.slice(0, length)
  return finalPassword
}
// Generate random lower case letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random()*26)+97)
}
//Generate random Upper
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random()*26)+65)
}
//Generate random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random()*10)+48)
}
//Generate random Symbol
function getRandomSymbol() {
  const symbols = "@#$%^&*(){}[]=<>/,."
  return symbols[Math.floor(Math.random() * symbols.length)]
}
