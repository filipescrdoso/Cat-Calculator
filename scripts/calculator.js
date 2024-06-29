const atualScreen = document.getElementById("atualScreen");
const previousScreen = document.getElementById("previousScreen");

let runningOperator;
let runningValue;
let firstValue;
let secondValue;

document.addEventListener('keydown', keyboardInput);

function numberButton(element) {
    if(secondValue != null) {
        cleanScreen();
    }
    
    if(element == '.'){
        if(atualScreen.value.includes('.')) {
            return;
        }
        else {
            atualScreen.value += element;
            runningValue = Number(atualScreen.value);
        }
        return;
    } 
    else if (element == '+/-') {
        if(atualScreen.value.includes('-')) {
            atualScreen.value = atualScreen.value.substring(1)
        } else {
            atualScreen.value = atualScreen.value.slice(0, 0) + `-` + atualScreen.value.slice(0);
            runningValue = Number(atualScreen.value);
        }
        return;
    }
    
    if(atualScreen.value === '0'){
        atualScreen.value = null
    }

    atualScreen.value += element;
    runningValue = Number(atualScreen.value);

    console.log(Number(runningValue));
}

function operatorButton(element) {

    if(runningOperator == null) {
        runningOperator = element;
        firstValue = runningValue;
        runningValue = 0;

        atualScreen.value = runningValue;
        previousScreen.value = `${firstValue} ${runningOperator} `;
    }
    else {
        let lastValue = runningValue;
        cleanScreen();
        firstValue = lastValue;
        runningOperator = element;
        atualScreen.value = runningValue;
        previousScreen.value = `${firstValue} ${runningOperator} `;
    }

}

function result() {
    if(runningOperator != null) {
        secondValue = runningValue;
        switch(runningOperator){
            case '÷':
                runningValue = firstValue / secondValue;
                atualScreen.value = runningValue;
                previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
                break;
            case '×':
                runningValue = firstValue * secondValue;
                atualScreen.value = runningValue;
                previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
                break;
            case '+':
                runningValue = firstValue + secondValue;
                atualScreen.value = runningValue;
                previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
                break;
            case '-':
                runningValue = firstValue - secondValue;
                atualScreen.value = runningValue;
                previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
                break;
            case '^':
                runningValue = firstValue ** secondValue;
                atualScreen.value = runningValue;
                previousScreen.value = `${firstValue} ${runningOperator} ${secondValue} = `;
                break;
        }
    } 
    else {
        
    }
}

function backValue() {
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
}

function cleanScreen() {
    firstValue = null;
    secondValue = null;
    runningOperator = null;
    runningValue = 0;

    atualScreen.value = runningValue;
    previousScreen.value = '';
}

function keyboardInput(k) {
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
        //Screen Inputs
        case 'Backspace' : backValue();
        break;
        case 'Enter': result();
        break;
    }
}