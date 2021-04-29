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

  // Rounds the result to 2 decimal places if result is a Float
  return Math.round(operations[operator] * 100) / 100;
}

// Updates calculator display
function updateDisplay(content) {
  content ? (display.textContent = content) : (display.textContent = "0");
}

function appendNumber(number) {
  input += number;
}

function inputIsInvalid() {
  if (!input) {
    return true;
  }

  const lastChar = input[input.length - 1];

  if (lastChar === operator || lastChar === ".") {
    return true;
  }

  if (!parseFloat(input)) {
    return true;
  }

  return false;
}

function appendOperator(operatorType) {
  if (inputIsInvalid()) {
    return;
  }

  operator = operatorType;
  input += operator;
}

function appendPoint() {
  if (hasDecimal) {
    return;
  }

  input += ".";
  hasDecimal = true;
}

// Sets variables to their starting values
function clearInput() {
  input = "";
  operator = null;
  hasDecimal = false;
}

// Delete last char from input
function deleteLastChar() {
  const lastChar = input[input.length - 1];

  switch (lastChar) {
    case operator:
      operator = null;
      break;
    case ".":
      hasDecimal = false;
      break;
    default:
      break;
  }

  // Removes last char from input
  input = input.slice(0, input.length - 1);
}

function doOperation() {
  const firstOperand = parseFloat(input.split(operator)[0]);
  const secondOperand = parseFloat(input.split(operator)[1]);
  return operate(operator, firstOperand, secondOperand);
}

function resultIsInvalid(result) {
  if (!result || result === Infinity) {
    return true;
  }

  return false;
}

numberButtons.forEach((numberBtn) =>
  numberBtn.addEventListener("click", () => {
    appendNumber(numberBtn.textContent);
    updateDisplay(input);
  })
);

operatorButtons.forEach((operatorBtn) =>
  operatorBtn.addEventListener("click", () => {
    if (operator && !inputIsInvalid()) {
      const result = doOperation();

      if (resultIsInvalid(result)) {
        clearInput();
        updateDisplay("Math ERROR");
        return;
      }

      operator = operatorBtn.textContent;
      input = result.toString();
      updateDisplay(input);
    }

    appendOperator(operatorBtn.textContent);
    updateDisplay(input);
  })
);

pointButton.addEventListener("click", () => {
  appendPoint();
  updateDisplay(input);
});

clearButton.addEventListener("click", () => {
  clearInput();
  updateDisplay("0");
});

deleteButton.addEventListener("click", () => {
  deleteLastChar();
  updateDisplay(input);
});

equalsButton.addEventListener("click", () => {
  if (!operator) {
    return;
  }

  if (inputIsInvalid()) {
    return;
  }

  const result = doOperation();

  if (resultIsInvalid(result)) {
    clearInput();
    updateDisplay("Math ERROR");
    return;
  }

  operator = null;
  input = result.toString();
  updateDisplay(input);
});

// Add keyboard shortcuts
window.addEventListener("keydown", (e) => {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    if (button.textContent === e.key) {
      button.click();
    }
    if (button.textContent === "=" && e.key === "Enter") {
      button.click();
    }
    if (button.textContent === "Clear" && e.key === "Backspace") {
      button.click();
    }
  });
});
