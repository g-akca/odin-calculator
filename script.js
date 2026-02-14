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
    if (num2 == 0) return "Can't divide by 0!";
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const display = document.getElementById("display");
const equalsBtn = document.getElementById("equals");
const resetBtn = document.getElementById("reset");

let num1 = "";
let num2 = "";
let operator = "";
let shouldResetDisplay = false;

function calculate() {
    if (num1 == "" || num2 == "" || operator == "") return;

    let result = operate(operator, Number(num1), Number(num2));

    // If divide by zero
    if (typeof result === "string") {
        display.value = result;
        resetCalculator();
        return;
    }

    result = Math.round(result * 100000) / 100000;
    display.value = result;

    num1 = result.toString();
    num2 = "";
    operator = "";
    shouldResetDisplay = true;
}

function resetCalculator() {
    num1 = "";
    num2 = "";
    operator = "";
    shouldResetDisplay = false;
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (shouldResetDisplay) {
            resetCalculator();
            display.value = "";
        }

        if (operator == "") {
            num1 += button.textContent;
            display.value = num1;
        }
        else {
            num2 += button.textContent;
            display.value = num2;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (num1 == "") return;
        if (num2 != "") calculate();

        operator = button.textContent;
        shouldResetDisplay = false;
    });
});

equalsBtn.addEventListener("click", calculate);

resetBtn.addEventListener("click", () => {
    resetCalculator();
    display.value = "0";
});