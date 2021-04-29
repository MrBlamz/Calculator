const numberButtons = document.querySelectorAll(".button.number");
const operatorButtons = document.querySelectorAll(".button.operator");
const pointButton = document.getElementById("btn-point");
const clearButton = document.getElementById("btn-clear");
const deleteButton = document.getElementById("btn-delete");
const equalsButton = document.getElementById("btn-equals");
const display = document.getElementById("display-content");
let input = "";
let operator = null;
let hasDecimal = false;

// Returns the result of the operation designated by the operator passed as parameter (String)
function operate(operator, firstNum, secondNum) {
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  const operations = {
    "+": add(firstNum, secondNum),
    "-": subtract(firstNum, secondNum),
    "*": multiply(firstNum, secondNum),
    "/": divide(firstNum, secondNum),
  };

  // Rounds the result to 2 decimal places if number is a Float
  return Math.round(operations[operator] * 100) / 100;
}
// Updates display DOM element
function updateDisplay(content) {
  display.textContent = content;
}

// Appends button value to operation
function appendNumber() {
  input += this.textContent;
  updateDisplay(input);
}

function appendOperator() {
  const lastChar = input[input.length - 1];

  if (lastChar === operator) {
    return;
  }

  if (isNaN(parseFloat(input))) {
    return;
  }

  if (operator !== null) {
    doOperation();
  }

  operator = this.textContent;
  input += operator;
  updateDisplay(input);
}

function appendDecimal() {
  if (hasDecimal) {
    return;
  }

  input += this.textContent;
  hasDecimal = true;
  updateDisplay(input);
}

// Clears input
function clearOperation() {
  input = "";
  operator = null;
  hasDecimal = false;
  updateDisplay("0");
}

// Delete last char from stored operation
function deleteLastChar() {
  const lastChar = input[input.length - 1];

  if (lastChar === operator) {
    operator = null;
  }

  if (lastChar === ".") {
    hasDecimal = false;
  }

  input = input.slice(0, input.length - 1);

  if (input.length === 0) {
    updateDisplay("0");
    return;
  }

  updateDisplay(input);
}

function doOperation() {
  if (operator === null) {
    return;
  }

  const lastChar = input[input.length - 1];
  if (lastChar === operator || lastChar === ".") {
    return;
  }

  const firstOperand = parseFloat(input.split(operator)[0]);
  const secondOperand = parseFloat(input.split(operator)[1]);
  let result = operate(operator, firstOperand, secondOperand);

  if (isNaN(result) || result === Infinity) {
    input = "";
    operator = null;
    hasDecimal = false;
    updateDisplay("Math ERROR");
    return;
  }

  operator = null;
  input = result.toString();
  updateDisplay(input);
}

numberButtons.forEach((button) =>
  button.addEventListener("click", appendNumber)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", appendOperator)
);

pointButton.addEventListener("click", appendDecimal);
clearButton.addEventListener("click", clearOperation);
deleteButton.addEventListener("click", deleteLastChar);
equalsButton.addEventListener("click", doOperation);
