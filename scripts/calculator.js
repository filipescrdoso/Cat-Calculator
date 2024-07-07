const atualScreen = document.getElementById("atualScreen");
const previousScreen = document.getElementById("previousScreen");

let runningOperator;
let runningValue;
let firstValue;
let secondValue;

document.addEventListener('keydown', keyboardInput);

function numberButton(element) {
    //Function to add the characters to screen and firstValue

    if(secondValue != null || atualScreen.value == 'Entrada Inválida') {
        cleanScreen();
    }
    
    if(element == '.'){
        //Ensures that the value has only one floating point
        if(atualScreen.value.includes('.')) {
            return;
        }
    } 
    else if (element == '+/-') {
        //Makes the value switch between negative and positive
        if(atualScreen.value.includes('-')) {
            atualScreen.value = atualScreen.value.substring(1)
        } else {
            atualScreen.value = atualScreen.value.slice(0, 0) + `-` + atualScreen.value.slice(0);
            runningValue = Number(atualScreen.value);
        }
        return;
    }
    
    if(atualScreen.value === '0'){
        //Removes the default "0" on first click
        atualScreen.value = null;
    }

    atualScreen.value += element;
    runningValue = Number(atualScreen.value);

    checkValue();
}

function operatorButton(element) {
    //Function that defines the operator of the next calculation

    if(runningOperator == null) {
        runningOperator = element;
        firstValue = runningValue;
        runningValue = 0;

        atualScreen.value = runningValue;
        previousScreen.value = `${firstValue} ${runningOperator} `;
    }
    else {
        //Changes the previous runningOperator to a new one, keeping the result of the last operation as firstValue
        let lastValue = runningValue;
        cleanScreen();
        firstValue = lastValue;
        runningOperator = element;
        atualScreen.value = runningValue;
        previousScreen.value = `${firstValue} ${runningOperator} `;
    }

}

function complexOperators(element){
    //Complex operations
    if(runningValue != null) {
        if(element == '%') {
            //Makes the percentage of the secondValue of firstValue
            if(firstValue) {
                let result = (runningValue / 100) * firstValue;
                runningValue = result;
                previousScreen.value = `${firstValue} ${runningOperator} ${runningValue}`;
                atualScreen = runningValue;
            } else {
                cleanScreen();
            }
        }
        else if(element == '√') {
            //Gets the square root from runningValue
            let result = Number(atualScreen.value);
            runningValue = Math.sqrt(result);
            atualScreen.value = runningValue;
        }
        else if(element == 'π') {
            //runningValue gets Pi's value;
            runningValue = Math.PI;
            atualScreen.value = runningValue;
        }
        else if(element == '!') {
            //Factors runningValue
            let result = 1;
            for (let i = 2; i <= Number(runningValue); i++) {
                result *= i;
            }
            runningValue = result;
            atualScreen.value = runningValue;
        }
        else if(element == 'sin') {
            //Gets the sine in degrees of a number
            let rad = runningValue * (Math.PI / 180);
            runningValue = Math.sin(rad);
            runningValue = checkFloat(runningValue);
            atualScreen.value = runningValue;
        }
        else if(element == 'cos') {
            //Gets the cosine in degrees of a number
            let rad = runningValue * (Math.PI / 180);
            runningValue = Math.cos(rad);
            runningValue = checkFloat(runningValue);
            atualScreen.value = runningValue;
        }
        else if(element == 'tan') {
            //Gets the tangent in degrees of a number
            let rad = runningValue * (Math.PI / 180);
            runningValue = Math.tan(rad);
            runningValue = checkFloat(runningValue);
            atualScreen.value = runningValue;
        }
        else if(element == 'log') {
            let result = Math.log(atualScreen.value);
            runningValue = result
            atualScreen.value = runningValue;
        }  
    }

    checkValue();
}

function result() {
//Function that actually calculates the values

    if(runningOperator != null) {
        secondValue = runningValue;
        switch(runningOperator){
            case '÷':
                runningValue = firstValue / secondValue;
                break;
            case '×':
                runningValue = firstValue * secondValue;
                break;
            case '+':
                runningValue = firstValue + secondValue;
                break;
            case '-':
                runningValue = firstValue - secondValue;
                break;
            case '^':
                runningValue = firstValue ** secondValue;
                break;
        }
        
        runningValue = checkFloat(runningValue);

        atualScreen.value = runningValue;
        previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
    }

    checkValue();
}

function backValue() {
//Removes the last charactere of the runningValue

    const strValue = atualScreen.value;

    if(String(strValue.value).length){
        atualScreen.value = strValue.slice(0, -1);
    }

    if(String(atualScreen.value).length <= 0) {
        atualScreen.value = 0;
    }

    if(runningValue == 0 && runningOperator != null){
        cleanScreen();
    }

    runningValue = Number(atualScreen.value);
    atualScreen.value = runningValue;
    checkValue();
}

function cleanScreen() {
//Fully cleans the screen

    firstValue = null;
    secondValue = null;
    runningOperator = null;
    runningValue = 0;

    atualScreen.value = runningValue;
    previousScreen.value = '';

    checkValue()
}

function checkValue() {
    if(atualScreen.value == 'NaN') {
        atualScreen.value = "Entrada Inválida";
    }

    //"Controls" the screen's font-size
    if(atualScreen.value.length > 9 && atualScreen.value.length < 19) {
        atualScreen.style = `font-size: 20px`;
    }
    else if(atualScreen.value.length >= 19) {
        atualScreen.style = `font-size: 15px`;
    }
    else {
        atualScreen.style = `font-size: 35px`;
    }
}

function checkFloat(element) {
//Rounds the "broken floats" from js to a fixed number
    let strValue = String(element);

    if(strValue.includes('.') && strValue.length >= 5) {
        return Number(element.toFixed(10));
    }
    else {
        return element;
    }
}

function keyboardInput(k) {
//Makes the calculator works with keyboard inputs

    k.preventDefault();

    switch(k.key){
        //Numerical Inputs
        case "7": numberButton(k.key);
        break;
        case "8": numberButton(k.key);
        break;
        case "9": numberButton(k.key);
        break;
        case "4": numberButton(k.key);
        break;
        case "5": numberButton(k.key);
        break;
        case "6": numberButton(k.key);
        break;
        case "1": numberButton(k.key);
        break;
        case "2": numberButton(k.key);
        break;
        case "3": numberButton(k.key);
        break;
        case "0": numberButton(k.key);
        break;
        case ".": numberButton(k.key);
        break;
        //Operator Inputs
        case '/': operatorButton('÷');
        break;
        case '*': operatorButton('×');
        break;
        case '+': operatorButton(k.key);
        break;
        case '-': operatorButton(k.key);
        break;
        case '%': complexOperators('%');
        break;
        case '!': complexOperators('!');
        break;
        case 's': complexOperators('sin');
        break;
        case 'c': complexOperators('cos');
        break;
        case 't': complexOperators('tan');
        break;
        case 'l': complexOperators('log');
        break;
        
        //Screen Inputs
        case 'Backspace' : backValue();
        break;
        case 'Enter': result();
        break;
    }
}