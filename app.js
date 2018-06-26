window.onload = function () {
    const inputField = document.getElementById('inp');

    inputField.addEventListener('keypress', function (event) {
        if (event.key == 'Enter') {
            allCalculations();
        }
    })
}

function allCalculations() {
    const inputField = document.getElementById('inp');
    let inputVal = inputField.value;

    if (inputVal == '') {
        alert('Input field is empty!');
        return;
    }

    const regex = /[a-zA-Z]+|[\!\@\#\$\%\^\&\(\)\_\=\[\]\{\}\:\"\'\\\|\,\<\>\?\;\~\`]/g;
    const regexBool = regex.test(inputVal);

    if (regexBool) {
        inputField.value = '';
        alert("You've entered a wrong value!");
        return;
    }

    const floatsAndDigitsArr = inputVal.match(/\d+(\.\d+)|\d+/g).map(Number);
    const operandsArr = inputVal.match(/[\+\-\*\/]/g);
    const inputValRemade = [];

    for (let i = 0; i < floatsAndDigitsArr.length; i++) {
        inputValRemade.push(Number(floatsAndDigitsArr[i]));

        if (operandsArr[i] != undefined) {
            inputValRemade.push(operandsArr[i]);
        }
    }

    for (let i = 0; i < inputValRemade.length; i++) {
        if (inputValRemade[i] == '/') {
            let calculatedNum = Number(inputValRemade[i - 1]) / Number(inputValRemade[i + 1]);
            inputValRemade.splice(i - 1, 3);
            inputValRemade.splice(i - 1, 0, calculatedNum);
            i -= 2;
        }
    }


    for (let i = 0; i < inputValRemade.length; i++) {
        if (inputValRemade[i] == '*') {
            let calculatedNum = Number(inputValRemade[i - 1]) * Number(inputValRemade[i + 1]);
            inputValRemade.splice(i - 1, 3);
            inputValRemade.splice(i - 1, 0, calculatedNum);
            i -= 2;
        }
    }

    for (let i = 0; i < inputValRemade.length; i++) {
        if (inputValRemade[i] == '-') {
            let calculatedNum = Number(inputValRemade[i - 1]) - Number(inputValRemade[i + 1]);
            inputValRemade.splice(i - 1, 3);
            inputValRemade.splice(i - 1, 0, calculatedNum);
            i -= 2;
        }
    }

    for (let i = 0; i < inputValRemade.length; i++) {
        if (inputValRemade[i] == '+') {
            let calculatedNum = Number(inputValRemade[i - 1]) + Number(inputValRemade[i + 1]);
            inputValRemade.splice(i - 1, 3);
            inputValRemade.splice(i - 1, 0, calculatedNum);
            i -= 2;
        }
    }

    if (isNaN(inputValRemade[0])) {
        inputField.value = '';
        alert("You've entered a wrong value!");
    } else {

        const historyDiv = document.getElementById('history');
        const parent = document.createElement("div");

        parent.innerHTML = `${inputField.value} = ${inputValRemade[0]}`;
        historyDiv.prepend(parent);

        document.getElementById('inp').value = inputValRemade[0];
    }
}