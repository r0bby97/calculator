const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const dot = document.querySelector("#dot");
const positivNegativ = document.querySelector("#positivNegativ");
const plusSign = document.querySelector("#add");
const minusSign = document.querySelector("#subtract");
const multiplicationSign = document.querySelector("#multiply");
const divisionSign = document.querySelector("#divide");
const equalSign = document.querySelector("#equals");
const del = document.querySelector("#delete");
const ac = document.querySelector("#ac");
const percent = document.querySelector("#percent");
const displayTextActive = document.querySelector("#activeRow");
const displayTextOlder = document.querySelector("#olderRow");
const numButtons = document.querySelectorAll("button.num");
const allButtons = document.querySelectorAll("button");

let num1 = "";
let num2 = "";
let operatorID = "";
let operatorSign = "";
let activeDisplayString = "";
let result = "";

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      add(num1, num2);
      break;
    case "−":
      subtract(num1, num2);
      break;
    case "×":
      multiply(num1, num2);
      break;
    case "÷":
      divide(num1, num2);
      break;
    default:
    // code block
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

function checkOperator(event) {
  if (
    event.target.id === "add" ||
    event.target.id === "subtract" ||
    event.target.id === "multiply" ||
    event.target.id === "divide"
  ) {
    operatorID = event.target.id;
    operatorSign = event.target.value;
    return true;
  } else {
    return false;
  }
}

function getNum2(event) {
  num2 += event.target.value;
}

function getNum1(event) {
  num1 += event.target.value;
}

function runArithmeticOperation() {
  const intNumber1 = Number(num1);
  const intNumber2 = Number(num2);
  switch (operatorID) {
    case "add":
      result = add(intNumber1, intNumber2);
      break;
    case "subtract":
      result = subtract(intNumber1, intNumber2);
      break;
    case "multiply":
      result = multiply(intNumber1, intNumber2);
      break;
    case "divide":
      result = divide(intNumber1, num2);
      break;
  }
  return result;
}

function createDisplayString(num1, operatorSign, num2) {
  return `${num1}${operatorSign}${num2}`;
}

allButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (checkOperator(event)) {
      displayTextActive.textContent = createDisplayString(
        num1,
        operatorSign,
        num2,
      );
      return;
    }
    if (event.target.classList.contains("num")) {
      if (operatorSign === "") {
        getNum1(event);
      } else {
        getNum2(event);
      }
      displayTextActive.textContent = createDisplayString(
        num1,
        operatorSign,
        num2,
      );
    }
    if (num1 !== "" && operatorSign !== "" && num2 !== "") {
      if (event.target.id === "equals") {
        result = runArithmeticOperation();
        displayTextOlder.textContent = createDisplayString(
          num1,
          operatorSign,
          num2,
        );
        displayTextActive.textContent = result;
      }
    }

    console.log("num1 :" + num1);
    console.log("operator :" + operatorSign);
    console.log("num2: " + num2);
    console.log("result: " + result);
  });
});
