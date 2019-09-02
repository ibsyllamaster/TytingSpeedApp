const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const textAlert = document.querySelector("#errorMessage");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errorCheck;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9){
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero (timer[0]) + ":" + leadingZero (timer[1]) + ":" + leadingZero (timer[2]) ;
    theTimer.innerHTML = currentTime; 
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]* 60));
    timer[2] = Math.floor (timer[3] - (timer[1] * 100) - (timer[0] * 6000))
}

// Match the text entered with the provided text on the page:

function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText){
        clearInterval(interval);
        textAlert.innerHTML = "you're done. Good job !";
        textAlert.style.color = "#429890";
        testWrapper.style.borderColor = "#429890";
    } else {
        if(textEntered == originTextMatch) {
            textAlert.innerHTML = "you doing great keep going !";
            textAlert.style.color = "#429890";
            testWrapper.style.borderColor = "#65CCf3";

        } else {
            textAlert.innerHTML = "you make a mistake";
            textAlert.style.color = "#E95D0F";
            testWrapper.style.borderColor = "#E95D0F";

        }

    }

    // if (textEntered !== originTextMatch) {
    //     textAlert.innerHTML = "you make a mistake";
    //     textAlert.style.color = "#E95D0F";
    // } else {
    //     textAlert.innerHTML = "you doing great keep going !";
    //     textAlert.style.color = "#429890";
    // }
}


// Start the timer:
function start() {
    let textEnterLenghth = testArea.value.length;
    if (textEnterLenghth === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer,10);

    } 
    console.log(textEnterLenghth);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = " 00:00:00";
    testWrapper.style.borderColor = "grey";
    textAlert.innerHTML = ""; 

}

// Event listeners for keyboard input and the reset button:

testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);