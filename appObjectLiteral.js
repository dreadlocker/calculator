window.onload = function () {
    const userInput = document.getElementById('inp');
    userInput.addEventListener('keypress', (event) => {
        if (event.key == 'Enter') {
            calculator.initialize();
        }
    })
}

const calculator = {
    inputField: '',
    inputVal: '',
    regex: '',
    regexBool: '',
    floatsAndDigitsArr: '',
    operandsArr: '',
    inputValRemade: '',
    mathSymbolsArr: [],
    initialize() {
        this.setValues();

        if (this.isInputFieldEmpty()) {
            return;
        }

        if (this.isInputValueWrong()) {
            return;
        }

        this.getDigits();
        this.concatFloatsArrOperandsArr();
        this.makeAllCalculations();

        if (this.isCalculationWrong()) {
            return;
        }

        this.viewResult();
    },
    setValues() {
        this.inputField = document.getElementById('inp');
        this.inputVal = this.inputField.value;
        this.inputValRemade = [];
        this.operandsArr = this.inputVal.match(/[\+\-\*\/]/g);
        this.mathSymbolsArr = ['/', '*', '-', '+'];
    },
    isInputFieldEmpty() {
        if (this.inputField.value == '') {
            alert('Input field is empty!');
            return true;
        } else {
            return false;
        }
    },
    isInputValueWrong() {
        this.regex = /[a-zA-Z]+|[\!\@\#\$\%\^\&\(\)\_\=\[\]\{\}\:\"\'\\\|\,\<\>\?\;\~\`]/g;
        this.regexBool = this.regex.test(this.inputVal);


        if (this.regexBool) {
            this.inputField.value = '';
            alert("You've entered a wrong value!");
            return true;
        } else {
            return false;
        }
    },
    getDigits() {
        this.floatsAndDigitsArr = this.inputVal.match(/\d+(\.\d+)|\d+/g).map(Number);
    },
    concatFloatsArrOperandsArr() {
        this.setValues();

        for (let i = 0; i < this.floatsAndDigitsArr.length; i++) {
            this.inputValRemade.push((this.floatsAndDigitsArr[i]));

            if (this.operandsArr[i] != null) {
                this.inputValRemade.push(this.operandsArr[i]);
            }
        }
        return this.inputValRemade;
    },
    makeAllCalculations(symbol) {
        for (let i = 0; i < this.mathSymbolsArr.length; i++) {
            this.calculateNumbers(this.mathSymbolsArr[i]);
        }
    },
    calculateNumbers(operand) {
        for (let i = 0; i < this.inputValRemade.length; i++) {
            if (this.inputValRemade[i] == operand) {
                let calculatedNum = this.mathCalculationsWith(operand, i);
                this.inputValRemade.splice(i - 1, 3);
                this.inputValRemade.splice(i - 1, 0, calculatedNum);
                i -= 2;
            }
        }
    },
    mathCalculationsWith(operand, index) {
        return {
            '/': this.inputValRemade[index - 1] / this.inputValRemade[index + 1],
            '*': this.inputValRemade[index - 1] * this.inputValRemade[index + 1],
            '-': this.inputValRemade[index - 1] - this.inputValRemade[index + 1],
            '+': this.inputValRemade[index - 1] + this.inputValRemade[index + 1]
        }[operand];
    },
    isCalculationWrong() {
        if (isNaN(this.inputValRemade[0])) {
            this.inputField.value = '';
            alert("You've entered a wrong value!");
            return true;
        } else {
            return false;
        }
    },
    viewResult() {
        const historyDiv = document.getElementById('history');
        const parent = document.createElement("div");

        parent.innerHTML = `${this.inputField.value} = ${this.inputValRemade[0]}`;
        historyDiv.prepend(parent);

        return document.getElementById('inp').value = this.inputValRemade[0];
    }
};