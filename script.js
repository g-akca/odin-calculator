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

function calculate() {
    // Calculate if operator is selected
    if (operator != "") {
        // If num2 wasn't entered, keep num1 and remove the operator
        if (num2 == "") {
            operator = "";
            display.value = num1;
            return;
        }

        const result = operate(operator, Number(num1), Number(num2));
        display.value = result;

        // Reset variables, num1 is the result
        num1 = result.toString();
        num2 = "";
        operator = "";
    }
}

const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const display = document.getElementById("display");

let num1 = "0";
let num2 = "";
let operator = "";

digitButtons.forEach(btn => btn.addEventListener("click", () => {
    // If no operator is selected, edit num1
    if (operator == "") {
        // If number is 0, either do nothing or turn the number into the new digit
        if (num1 == "0") {
            if (btn.id == "zero") return;
            num1 = btn.textContent;
        }
        // If number is not 0, add new digit to the end
        else num1 += btn.textContent;
    }
    // If operator is selected, edit num2
    else {
        if (num2 == "0") {
            if (btn.id == "zero") return;
            num2 = btn.textContent;
        }
        else num2 += btn.textContent;
    }
    
    display.value = `${num1} ${operator} ${num2}`;
}));

operatorButtons.forEach(btn => btn.addEventListener("click", () => {
    // Calculate will work if operator was selected already
    calculate();

    // Add operator to display
    operator = btn.textContent;
    display.value = `${num1} ${btn.textContent} `;
}));

const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener("click", calculate);

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    num1 = "0";
    num2 = "";
    operator = "";
    display.value = "0";
});