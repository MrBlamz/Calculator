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

// Returns the result of the operation designated by the operator passed as parameter (String)
function operate(operator, firstNum, secondNum) {
  const operations = {
    "+": add(firstNum, secondNum),
    "-": subtract(firstNum, secondNum),
    "*": multiply(firstNum, secondNum),
    "/": divide(firstNum, secondNum),
  };

  return operations[operator];
}
