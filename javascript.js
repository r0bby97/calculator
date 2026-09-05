const displayTextActive = document.querySelector("#activeRow");
const displayTextOlder = document.querySelector("#olderRow");
const numButtons = document.querySelectorAll("button.num");
const allButtons = document.querySelectorAll("button");

const calculation = {
  firstNumber: "",
  secondNumber: "",
  operator: null,
};

function getNum1(event) {
  calculation.firstNumber += event.target.value;
  console.log("num1 :" + calculation.firstNumber);
  displayTextActive.textContent = createDisplayString();
}

function getNum2(event) {
  calculation.secondNumber += event.target.value;
  console.log("num2: " + calculation.secondNumber);
  displayTextActive.textContent = createDisplayString();
}

function checkOperator(event) {
  if (
    calculation.operator === null &&
    (event.target.id === "add" ||
      event.target.id === "subtract" ||
      event.target.id === "multiply" ||
      event.target.id === "divide")
  ) {
    calculation.operator = event.target.value;
    console.log("operator :" + calculation.operator);
    displayTextActive.textContent = createDisplayString();
  }
}

function checkSecondOperator(event) {
  if (calculation.operator !== null && calculation.secondNumber !== "") {
    if (
      event.target.id === "add" ||
      event.target.id === "subtract" ||
      event.target.id === "multiply" ||
      event.target.id === "divide"
    ) {
      displayTextOlder.textContent = createDisplayString();
      const result = operate();
      calculation.firstNumber = result;
      calculation.secondNumber = "";
      calculation.operator = event.target.value;
      displayTextActive.textContent = createDisplayString();
    }
  }
}

function checkEqual(event) {
  if (
    event.target.id === "equals" &&
    calculation.firstNumber !== "" &&
    calculation.secondNumber !== "" &&
    calculation.operator !== null
  ) {
    const result = operate();
    console.log("result: " + result);
    displayTextOlder.textContent = createDisplayString();
    displayTextActive.textContent = result;
  }
}

function operate() {
  const num1 = Number(calculation.firstNumber);
  const num2 = Number(calculation.secondNumber);
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
    calculation.firstNumber = "";
    calculation.secondNumber = "";
    calculation.operator = null;
    displayTextActive.textContent = "";
    displayTextOlder.textContent = "";
    console.log(
      `num1: ${calculation.firstNumber}; operator: ${calculation.operator}; num2: ${calculation.secondNumber}`,
    );
  }
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
    if (event.target.classList.contains("num")) {
      if (calculation.operator === null) {
        getNum1(event);
      } else {
        getNum2(event);
      }
    }
    checkEqual(event);
    checkSecondOperator(event);
    checkAC(event);
  });
});
