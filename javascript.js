const displayTextActive = document.querySelector("#activeRow");
const displayTextOlder = document.querySelector("#olderRow");
const allButtons = document.querySelectorAll("button");

const calculation = {
  firstNumber: "",
  secondNumber: "",
  operator: null,
  currentResult: "",
  resultDisplayed: false,
  resultLocked: false,
};

function getNum(event, num) {
  const countDecimals = calculation[num].split(".").length - 1;
  const digitCount = calculation[num].replace(/\D/g, "").length;

  if (calculation[num].includes("%")) {
    return;
  }

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
  } else if (
    event.target.classList.contains("num") &&
    digitCount < 15
  ) {
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

  if (!isOperator || calculation.firstNumber === "") {
    return;
  }

  if (calculation.operator !== null && calculation.secondNumber === "") {
    calculation.operator = event.target.value;
    displayTextActive.textContent = createDisplayString();
    return;
  }

  if (calculation.operator !== null) {
    return;
  }

  calculation.firstNumber = removeLeadingZeros(
    removeUnusedDot(removeUnusedZero(calculation.firstNumber)),
  );

  calculation.operator = event.target.value;

  if (calculation.resultDisplayed) {
    calculation.resultDisplayed = false;
  }

  displayTextActive.textContent = createDisplayString();
}

function checkSecondOperator(event) {
  const isOperator =
    event.target.id === "add" ||
    event.target.id === "subtract" ||
    event.target.id === "multiply" ||
    event.target.id === "divide";

  if (
    !isOperator ||
    calculation.operator === null ||
    calculation.secondNumber === ""
  ) {
    return;
  }

  calculation.secondNumber = removeLeadingZeros(
    removeUnusedDot(removeUnusedZero(calculation.secondNumber)),
  );

  const isDivisionByZero =
    calculation.operator === "÷" &&
    (calculation.secondNumber === "0" || calculation.secondNumber === "0%");

  if (isDivisionByZero) {
    showErrorMessage(displayTextActive);
    return;
  }

  displayTextOlder.textContent = createDisplayString();

  calculation.currentResult = operate();

  if (!Number.isFinite(calculation.currentResult)) {
    showErrorMessage(displayTextActive);
    return;
  }

  calculation.firstNumber = String(calculation.currentResult);
  calculation.secondNumber = "";
  calculation.operator = event.target.value;
  calculation.resultDisplayed = false;
  calculation.resultLocked = true;

  displayTextActive.textContent = `${formatResult(calculation.currentResult)}${calculation.operator}`;
}

function checkEqual(event) {
  if (
    event.target.id !== "equals" ||
    calculation.firstNumber === "" ||
    calculation.secondNumber === "" ||
    calculation.operator === null
  ) {
    return;
  }

  calculation.secondNumber = removeLeadingZeros(
    removeUnusedDot(removeUnusedZero(calculation.secondNumber)),
  );

  const isDivisionByZero =
    calculation.operator === "÷" &&
    (calculation.secondNumber === "0" || calculation.secondNumber === "0%");

  if (isDivisionByZero) {
    showErrorMessage(displayTextActive);
    return;
  }

  displayTextOlder.textContent = createDisplayString();

  calculation.currentResult = operate();

  if (!Number.isFinite(calculation.currentResult)) {
    showErrorMessage(displayTextActive);
    return;
  }

  displayTextActive.textContent = formatResult(calculation.currentResult);

  calculation.firstNumber = String(calculation.currentResult);
  calculation.secondNumber = "";
  calculation.operator = null;
  calculation.resultDisplayed = true;
  calculation.resultLocked = true;
}

function showErrorMessage(element) {
  element.classList.add("errorMessage");
  element.textContent = "ERROR 404 ;)";

  calculation.firstNumber = "";
  calculation.secondNumber = "";
  calculation.operator = null;
  calculation.currentResult = "";
  calculation.resultDisplayed = true;
  calculation.resultLocked = false;
}

function operate() {
  let num1 = null;
  let num2 = null;

  const operator = calculation.operator;

  if (calculation.firstNumber.includes("%")) {
    const stringWithoutPercent = calculation.firstNumber.replace("%", "");

    num1 = parseFloat(stringWithoutPercent) / 100;
  } else {
    num1 = parseFloat(calculation.firstNumber);
  }

  if (calculation.secondNumber.includes("%")) {
    const stringWithoutPercent = calculation.secondNumber.replace("%", "");

    const decimalPercentage = parseFloat(stringWithoutPercent) / 100;

    if (operator === "+" || operator === "−") {
      num2 = decimalPercentage * num1;
    } else {
      num2 = decimalPercentage;
    }
  } else {
    num2 = parseFloat(calculation.secondNumber);
  }

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
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1e9 || (absoluteValue !== 0 && absoluteValue < 1e-10)) {
    return value.toExponential(8);
  }

  return value.toLocaleString("en-US", {
    useGrouping: false,
    maximumFractionDigits: 10,
  });
}

function removeUnusedDot(numString) {
  numString = numString.toString();

  if (!numString.includes(".")) {
    return numString;
  }

  if (numString.endsWith(".")) {
    return numString.slice(0, -1);
  }

  if (
    numString.charAt(numString.length - 1) === "%" &&
    numString.charAt(numString.length - 2) === "."
  ) {
    numString = numString.slice(0, -2) + numString.slice(-1);
  }

  return numString;
}

function removeUnusedZero(numString) {
  if (!numString.includes(".")) {
    return numString;
  }

  while (
    numString.length > 1 &&
    numString.charAt(numString.length - 1) === "0"
  ) {
    numString = numString.slice(0, -1);
  }

  while (
    numString.length > 1 &&
    numString.charAt(numString.length - 1) === "%" &&
    numString.charAt(numString.length - 2) === "0"
  ) {
    numString = numString.slice(0, -2) + numString.slice(-1);
  }

  return numString;
}

function removeLeadingZeros(numString) {
  const isNegative = numString.startsWith("-");
  const hasPercent = numString.endsWith("%");

  if (isNegative) {
    numString = numString.slice(1);
  }

  if (hasPercent) {
    numString = numString.slice(0, -1);
  }

  while (
    numString.length > 1 &&
    numString.startsWith("0") &&
    numString.charAt(1) !== "."
  ) {
    numString = numString.slice(1);
  }

  if (isNegative) {
    numString = `-${numString}`;
  }

  if (hasPercent) {
    numString += "%";
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
    if (!calculation.secondNumber.startsWith("-")) {
      calculation.secondNumber = String("-" + calculation.secondNumber);
      displayTextActive.textContent = createDisplayString();
      return;
    } else {
      calculation.secondNumber = calculation.secondNumber.replace("-", "");
      displayTextActive.textContent = createDisplayString();
      return;
    }
  }
  if (calculation.firstNumber !== "") {
    if (!calculation.firstNumber.startsWith("-")) {
      calculation.firstNumber = String("-" + calculation.firstNumber);
      displayTextActive.textContent = createDisplayString();
      return;
    } else {
      calculation.firstNumber = calculation.firstNumber.replace("-", "");
      displayTextActive.textContent = createDisplayString();
      return;
    }
  }
}

function checkPercent(event) {
  if (event.target.id !== "percent") {
    return;
  }

  if (
    !calculation.firstNumber.includes("%") &&
    calculation.firstNumber !== "" &&
    calculation.operator === null &&
    calculation.secondNumber === ""
  ) {
    calculation.firstNumber += "%";
    displayTextActive.textContent = createDisplayString();
  } else if (
    !calculation.secondNumber.includes("%") &&
    calculation.firstNumber !== "" &&
    calculation.operator !== null &&
    calculation.secondNumber !== ""
  ) {
    calculation.secondNumber += "%";
    displayTextActive.textContent = createDisplayString();
  }
}

function clearAll() {
  calculation.resultDisplayed = false;
  calculation.resultLocked = false;
  calculation.firstNumber = "";
  calculation.secondNumber = "";
  calculation.operator = null;
  calculation.currentResult = "";

  displayTextActive.classList.remove("errorMessage");
  displayTextActive.textContent = "";
  displayTextOlder.textContent = "";
}

function createDisplayString() {
  let num1 = calculation.firstNumber !== "" ? calculation.firstNumber : "";
  const num2 = calculation.secondNumber !== "" ? calculation.secondNumber : "";
  const operator = calculation.operator !== null ? calculation.operator : "";

  if (calculation.resultLocked && num1 !== "") {
    const hasPercent = num1.endsWith("%");
    const numberWithoutPercent = hasPercent ? num1.slice(0, -1) : num1;
    num1 = formatResult(Number(numberWithoutPercent));

    if (hasPercent) {
      num1 += "%";
    }
  }

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
    checkPercent(event);

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
    case "Enter":
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
