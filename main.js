const ADD = '+';
const SUB = '-';
const MUL = '*';
const DIV = '/';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

function addCommas(val) {
    let str = val.toString();

    if (str.length <= 3) {
        return str;
    }

    // Start at the 3rd digit from the end
    for (let i = str.length - 4; i >= 0; i -= 3) {
        let firstHalf = str.substring(0, i + 1);
        let secondHalf = str.substring(i + 1);
        str = firstHalf + ',' + secondHalf;
    }

    return str;
}

function updateDisplay(val) {
    const display = document.getElementById("output");
    let stringVal = addCommas(val);
    display.innerText = stringVal;
}

updateDisplay(1050000);