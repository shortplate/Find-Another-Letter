const startButton = document.querySelector("#start-button");
const stage = document.querySelector("#stage");
const mainDiv = document.querySelector("#main-div");
const subDiv = document.querySelector("#sub-div");
let stageNumber = 0;
let columnNumber = 3;
const letterObj = {
    0:["멵","먽"],
    1:["꿹","꿼"],
    2:["굙","곩"],
    3:["뗡","뎕"],
    4:["뾹","뽉"],
    5:["텮","턶"],
    6:["죩","쥵"],
    7:["쪉","쪊"],
    8:["쑑","쏡"],
    9:["혅","헍"],
};

// console.log(letterObj[0][1]);

function clickStartButton() {
    startButton.classList.add("hidden");
    printQuestion();
}

function printQuestion() {
    const randomKeyNumber = Math.floor(Math.random() * (Object.keys(letterObj).length));
    const backgroundValue = letterObj[randomKeyNumber][0];
    const specialValue = letterObj[randomKeyNumber][1];
    let specialNumber = [Math.floor(Math.random() * (columnNumber * 2)), Math.floor(Math.random() * columnNumber)];
    for(i = 0; i < columnNumber; i++) {
        const br = document.createElement("br");
        for(r = 0; r < columnNumber * 2; r++) {
            const span = document.createElement("span");
            let innerSpan = "";
            if(r === specialNumber[0] && i === specialNumber[1]) {
                innerSpan += specialValue;
            } else {
                innerSpan += backgroundValue;
            }
            span.innerText = innerSpan;
            subDiv.appendChild(span);
        }
        subDiv.appendChild(br);
    }
    stageNumber += 1;
    stage.innerText = `stage${stageNumber}`;
    columnNumber += 1;
}

function clickLetter(event) {
    console.dir(event.target.innerText);
    let trueOrFalse = false;
    for(i = 0; i < Object.keys(letterObj).length; i++) {
        if(event.target.innerText === letterObj[i][1]) {
            trueOrFalse = true;
        }
    }
    if(trueOrFalse === false) {
        alert("틀렸습니다.")
        subDiv.innerHTML = "";
        const h3 = document.createElement("h3");
        const form = document.createElement("form");
        const input = document.createElement("input");
        input.type = "submit";
        input.value = "다시하기";
        form.appendChild(input);
        h3.innerText = `당신은 ${stageNumber - 1}문제 맞히셨습니다.`;
        mainDiv.appendChild(h3);
        mainDiv.appendChild(form);
        stage.remove();
    } else {
        // alert("맞혔습니다.");
        subDiv.innerHTML = "";
        printQuestion();
    }
}

startButton.addEventListener("click", clickStartButton);
subDiv.addEventListener("click", clickLetter);