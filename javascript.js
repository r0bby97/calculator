const displayTextActive = document.querySelector("#activeRow");
const displayTextOlder = document.querySelector("#olderRow");
const numButtons = document.querySelectorAll("button.num");
const allButtons = document.querySelectorAll("button");

const calculation = {
  firstNumber: "",
  secondNumber: "",
  operator: null,
  currentUserInput: "",
  currentResult: "",
  resultDisplayed: false,
};

function getNum1(event) {
  const countDecimals = calculation.firstNumber.split(".").length - 1;
  if (
    countDecimals === 0 &&
    event.target.id === "dot" &&
    calculation.firstNumber.charAt(0) !== "."
  ) {
    calculation.firstNumber += event.target.value;
  } else if (event.target.classList.contains("num")) {
    calculation.firstNumber += event.target.value;
  }
  displayTextActive.textContent = createDisplayString();
}

function getNum2(event) {
  const countDecimals = calculation.secondNumber.split(".").length - 1;
  if (
    countDecimals === 0 &&
    event.target.id === "dot" &&
    calculation.secondNumber.charAt(0) !== "."
  ) {
    calculation.secondNumber += event.target.value;
  } else if (event.target.classList.contains("num")) {
    calculation.secondNumber += event.target.value;
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

  if (calculation.operator !== null && calculation.secondNumber !== "") {
    if (calculation.secondNumber !== "0" && isOperator) {
      displayTextOlder.textContent = createDisplayString();
      calculation.currentResult = operate();
      calculation.firstNumber = String(calculation.currentResult);
      calculation.secondNumber = "";
      calculation.operator = event.target.value;
      displayTextActive.textContent = createDisplayString();
      calculation.resultDisplayed = false;
    } else if (
      calculation.secondNumber === "0" &&
      calculation.operator === "÷" &&
      isOperator
    ) {
      toggleErrorMessage(displayTextActive);
      calculation.resultDisplayed = false;
    }
  }
}

function checkEqual(event) {
  if (
    event.target.id === "equals" &&
    calculation.firstNumber !== "" &&
    calculation.secondNumber !== "" &&
    calculation.secondNumber !== "0" &&
    calculation.operator !== null
  ) {
    calculation.currentResult = operate();
    displayTextOlder.textContent = createDisplayString();
    displayTextActive.textContent = formatResult(calculation.currentResult);
    calculation.firstNumber = String(calculation.currentResult);
    calculation.secondNumber = "";
    calculation.operator = null;
    calculation.resultDisplayed = true;
  } else if (
    event.target.id === "equals" &&
    calculation.firstNumber !== "" &&
    calculation.secondNumber === "0" &&
    calculation.operator !== null
  ) {
    toggleErrorMessage(displayTextActive);
    calculation.resultDisplayed = true;
  }
}

function toggleErrorMessage(element) {
  element.classList.toggle("errorMessage");
  if (element.classList.contains("errorMessage")) {
    element.textContent = "ERROR 404 ;)";
    calculation.firstNumber = "";
    calculation.secondNumber = "";
    calculation.operator = null;
  }
}

function operate() {
  const num1 = parseFloat(calculation.firstNumber);
  const num2 = parseFloat(calculation.secondNumber);
  console.log(
    `num1: ${num1} num2: ${num2} typeof(num1): ${typeof num1} typeof(num2): ${typeof num2}`,
  );
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
   return Math.abs(value) >= 1e9
    ? value.toExponential(8)
    : value.toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: 10,
      });
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

function clearAll() {
  calculation.resultDisplayed = false;
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
          getNum1(event);
        } else {
          getNum2(event);
        }
      } else {
        clearAll();
        getNum1(event);
      }
    }
    checkEqual(event);
    checkSecondOperator(event);
    checkAC(event);

    displayTextActive.scrollLeft = displayTextActive.scrollWidth;
    displayTextOlder.scrollTop = displayTextOlder.scrollHeight;
  });
});
