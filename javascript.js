const displayTextActive = document.querySelector("#activeRow");
const displayTextOlder = document.querySelector("#olderRow");
const allButtons = document.querySelectorAll("button");

const calculation = {
  firstNumber: "",
  secondNumber: "",
  operator: null,
  currentUserInput: "",
  currentResult: "",
  resultDisplayed: false,
  resultLocked: false,
};

function getNum(event, num) {
  const countDecimals = calculation[num].split(".").length - 1;
  if (
    countDecimals === 0 &&
    event.target.id === "dot" &&
    calculation[num].length === 0
  ) {
    calculation[num] += `0${event.target.value}`;
  } else if (
    countDecimals === 0 &&
    event.target.id === "dot" &&
    calculation[num].length > 0
  ) {
    calculation[num] += event.target.value;
  } else if (event.target.classList.contains("num")) {
    calculation[num] += event.target.value;
  }
  displayTextActive.textContent = createDisplayString();
}

function checkOperator(event) {
  const isOperator =
    event.target.id === "add" ||
    event.target.id === "subtract" ||
    event.target.id === "multiply" ||
    event.target.id === "divide";

  if (calculation.operator === null && isOperator) {
    calculation.firstNumber = removeLeadingZeros(
      removeUnusedDot(calculation.firstNumber),
    );
    calculation.operator = event.target.value;
    if (calculation.resultDisplayed) {
      calculation.resultDisplayed = false;
    }
    displayTextActive.textContent = createDisplayString();
  }
}

function checkSecondOperator(event) {
  const isOperator =
    event.target.id === "add" ||
    event.target.id === "subtract" ||
    event.target.id === "multiply" ||
    event.target.id === "divide";
  const isDivisionByZero =
    calculation.operator === "÷" && Number(calculation.secondNumber) === 0;

  if (
    !isOperator ||
    calculation.operator === null ||
    calculation.secondNumber === ""
  ) {
    return;
  }
  calculation.secondNumber = removeLeadingZeros(
    removeUnusedDot(calculation.secondNumber),
  );
  if (isDivisionByZero) {
    toggleErrorMessage(displayTextActive);
    calculation.resultDisplayed = true;
    return;
  }
  displayTextOlder.textContent = createDisplayString();
  calculation.currentResult = operate();
  calculation.firstNumber = String(calculation.currentResult);
  calculation.resultLocked = true;
  calculation.secondNumber = "";
  calculation.operator = event.target.value;
  calculation.resultDisplayed = false;
  displayTextActive.textContent = createDisplayString();
}

function checkEqual(event) {
  const isDivisionByZero =
    calculation.operator === "÷" && Number(calculation.secondNumber) === 0;

  if (
    event.target.id !== "equals" ||
    calculation.firstNumber === "" ||
    calculation.secondNumber === "" ||
    calculation.operator === null
  ) {
    return;
  }
  calculation.secondNumber = removeLeadingZeros(
    removeUnusedDot(calculation.secondNumber),
  );
  if (isDivisionByZero) {
    toggleErrorMessage(displayTextActive);
    calculation.resultDisplayed = true;
    return;
  }
  calculation.currentResult = operate();
  displayTextOlder.textContent = createDisplayString();
  displayTextActive.textContent = formatResult(calculation.currentResult);
  calculation.firstNumber = String(calculation.currentResult);
  calculation.secondNumber = "";
  calculation.operator = null;
  calculation.resultDisplayed = true;
  calculation.resultLocked = true;
}

function toggleErrorMessage(element) {
  element.classList.toggle("errorMessage");
  if (element.classList.contains("errorMessage")) {
    element.textContent = "ERROR 404 ;)";
    calculation.firstNumber = "";
    calculation.secondNumber = "";
    calculation.operator = null;
    calculation.resultLocked = false;
  }
}

function operate() {
  const num1 = parseFloat(calculation.firstNumber);
  const num2 = parseFloat(calculation.secondNumber);
  const operator = calculation.operator;
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "−":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

function formatResult(value) {
  if (Math.abs(value) >= 1e9) {
    return value.toExponential(8);
  } else {
    return value.toLocaleString("en-US", {
      useGrouping: false,
      maximumFractionDigits: 10,
    });
  }
}

function removeUnusedDot(numString) {
  numString = numString.toString();
  if (numString.endsWith(".")) {
    return numString.slice(0, -1);
  }
  return numString;
}

function removeLeadingZeros(numString) {
  while (
    numString.length > 1 &&
    numString.charAt(0) === "0" &&
    numString.charAt(1) !== "."
  ) {
    numString = numString.slice(1);
  }
  return numString;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function checkAC(event) {
  if (event.target.id === "ac") {
    clearAll();
  }
}

function checkBackspace(event) {
  if (event.target.id !== "delete") {
    return;
  }
  if (calculation.resultLocked && calculation.operator === null) {
    return;
  }
  if (calculation.operator !== null && calculation.secondNumber !== "") {
    calculation.secondNumber = calculation.secondNumber.slice(0, -1);
  } else if (calculation.operator !== null) {
    calculation.operator = null;
  } else if (!calculation.resultLocked) {
    calculation.firstNumber = calculation.firstNumber.slice(0, -1);
  }
  displayTextActive.textContent = createDisplayString();
}

function checkPositiveNegative(event) {
  if (event.target.id !== "positiveNegative") {
    return;
  }
  if (calculation.secondNumber !== "") {
    calculation.secondNumber *= -1;
    displayTextActive.textContent = createDisplayString();
    return;
  } else if (calculation.firstNumber !== "") {
    calculation.firstNumber *= -1;
    displayTextActive.textContent = createDisplayString();
    return;
  }
}

function clearAll() {
  calculation.resultDisplayed = false;
  calculation.resultLocked = false;
  calculation.firstNumber = "";
  calculation.secondNumber = "";
  calculation.operator = null;
  displayTextActive.classList.remove("errorMessage");
  displayTextActive.textContent = "";
  displayTextOlder.textContent = "";
}

function createDisplayString() {
  const num1 = calculation.firstNumber !== "" ? calculation.firstNumber : "";
  const num2 = calculation.secondNumber !== "" ? calculation.secondNumber : "";
  const operator = calculation.operator !== null ? calculation.operator : "";
  return `${num1}${operator}${num2}`;
}

allButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    checkOperator(event);
    if (event.target.classList.contains("num") || event.target.id === "dot") {
      if (!calculation.resultDisplayed) {
        if (calculation.operator === null) {
          getNum(event, "firstNumber");
        } else {
          getNum(event, "secondNumber");
        }
      } else {
        clearAll();
        getNum(event, "firstNumber");
      }
    }
    checkEqual(event);
    checkSecondOperator(event);
    checkAC(event);
    checkBackspace(event);
    checkPositiveNegative(event);
    displayTextActive.scrollLeft = displayTextActive.scrollWidth;
    displayTextOlder.scrollTop = displayTextOlder.scrollHeight;
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case "0":
      document.getElementById("zero").click();
      break;
    case "1":
      document.getElementById("one").click();
      break;
    case "2":
      document.getElementById("two").click();
      break;
    case "3":
      document.getElementById("three").click();
      break;
    case "4":
      document.getElementById("four").click();
      break;
    case "5":
      document.getElementById("five").click();
      break;
    case "6":
      document.getElementById("six").click();
      break;
    case "7":
      document.getElementById("seven").click();
      break;
    case "8":
      document.getElementById("eight").click();
      break;
    case "9":
      document.getElementById("nine").click();
      break;
    case ".":
      document.getElementById("dot").click();
      break;
    case "+":
      document.getElementById("add").click();
      break;
    case "-":
      document.getElementById("subtract").click();
      break;
    case "*":
      document.getElementById("multiply").click();
      break;
    case "/":
      document.getElementById("divide").click();
      break;
    case "%":
      document.getElementById("percent").click();
      break;
    case "=":
      document.getElementById("equals").click();
      break;
    case "Backspace":
      document.getElementById("delete").click();
      break;
    case "Delete":
      document.getElementById("ac").click();
      break;
    case "F9":
      document.getElementById("positiveNegative").click();
      break;
  }
});
