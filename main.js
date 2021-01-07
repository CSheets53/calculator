const ADD = '+';
const SUB = '-';
const MUL = '*';
const DIV = '/';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const ALL_BTNS = document.querySelectorAll(".btn");

let currentTotal = 0;
let currentDisplay = "0";

function operate(a, b, operator) {
    switch (operator) {
        case ADD:
            return add(a, b);
        case SUB:
            return subtract(a, b);
        case MUL:
            return multiply(a, b);
        case DIV:
            return divide(a, b);
        default:
            return '?';
    }
}

function updateDisplay(val) {
    const display = document.getElementById("output");
    display.innerText = val;
}

let firstVal = 0;
let secondVal = 0;
let currentOperator;
let operatorPressed = false;
let displayNeedsReset = false;

function resetVals() {
    secondVal = 0;
    currentOperator = undefined;
    operatorPressed = false;
    displayNeedsReset = true;
}

function resetDisplay() {
    if (displayNeedsReset) {
        displayNeedsReset = false;
        currentDisplay = 0;
    }
}

function reduceDecimal(total) {
    const NUM_REDUCE = 5;

    let totalStr = total.toString();

    if (totalStr.indexOf(".") != -1) {
        trail = totalStr.substring(totalStr.indexOf(".") + 1);
        if (trail.length > NUM_REDUCE) {
            return total.toFixed(NUM_REDUCE);
        }
    }

    return total;
}

function evaluate() {
    if (operatorPressed) {
        secondVal = Number(currentDisplay);

        if (currentOperator === '/' && secondVal === 0) {
            currentDisplay = "NO";
        } else {
            let output = operate(firstVal, secondVal, currentOperator)

            output = reduceDecimal(output);

            currentDisplay = output;
        }

        firstVal = output;
        resetVals();
    }
}

function operatorButton(btn) {
    resetDisplay();

    evaluate();

    if (firstVal === 0) {
        firstVal = Number(currentDisplay);
    }
    currentOperator = btn.innerText;
    operatorPressed = true;
}

function clearButton() {
    resetVals();
    resetDisplay();
    firstVal = 0;
}

function digitButton(btn) {
    resetDisplay();

    const strVal = btn.innerText;

    if (operatorPressed || currentDisplay == 0) {
        currentDisplay = strVal;
    } else {
        currentDisplay += strVal;
    }
}

function btnClicked() {
    if (this.className === "btn eq") {
        evaluate();
    } else if (this.className === "btn op") {
        operatorButton(this);
    } else if (this.className === "btn clear") {
        clearButton();
    } else {
        digitButton(this);
    }

    updateDisplay(currentDisplay);
}

ALL_BTNS.forEach(btn => btn.addEventListener("click", btnClicked));