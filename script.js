// Sidebar menu items
const menuItems = document.querySelectorAll(".menu-item");

// Pages
const homePage = document.querySelector(".home-page");
const stopwatchPage = document.querySelector(".stopwatch-page");
const timerPage = document.querySelector(".timer-page");

// Add click event to every menu item
menuItems.forEach(function(item){

    item.addEventListener("click", function(){

        // Hide all pages
        homePage.classList.add("hidden");
        stopwatchPage.classList.add("hidden");
        timerPage.classList.add("hidden");

        // Remove active class from all menu items
        menuItems.forEach(function(menu){
            menu.classList.remove("active");
        });

        // Highlight clicked menu
        item.classList.add("active");

        // Show selected page
        if(item.id === "time-menu"){
            homePage.classList.remove("hidden");
        }

        else if(item.id === "stopwatch-menu"){
            stopwatchPage.classList.remove("hidden");
        }

        else if(item.id === "timer-menu"){
            timerPage.classList.remove("hidden");
        }

    });

});
//Live Clock
const time = document.getElementById("time");
const day = document.getElementById("day");
const date = document.getElementById("date");
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const timeFormatBtn = document.getElementById("time-format-btn");
let is24HourFormat = false;
timeFormatBtn.addEventListener("click", function(){
    is24HourFormat = !is24HourFormat;
    if(is24HourFormat){
        timeFormatBtn.textContent = "Switch to 12 Hour Format";
    }
    else{
        timeFormatBtn.textContent = "Switch to 24 Hour Format";
    }
    updateClock();
});
// Function to update clock
function updateClock() {
    const now = new Date();
    // Time
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
        if(is24HourFormat){
            hours = String(hours).padStart(2,"0");
            time.textContent = `${hours}:${minutes}:${seconds}`;
        }
        else{
            let period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours;
            hours = String(hours).padStart(2,"0");
            time.textContent = `${hours}:${minutes}:${seconds} ${period}`;
        }
    // Day
    let currentDay = days[now.getDay()];
    // Date
    let currentDate = now.getDate();
    let currentMonth = months[now.getMonth()];
    let currentYear = now.getFullYear();
    // Update UI
    day.textContent = currentDay;
    date.textContent = `${currentDate} ${currentMonth} ${currentYear}`;
}
// Display immediately
updateClock();
// Update every second
setInterval(updateClock, 1000);

// Stopwatch
const stopwatchDisplay = document.querySelector(".stopwatch-time");
const startBtn = document.getElementById("start-stopwatch");
const stopBtn = document.getElementById("stop-stopwatch");
const resetBtn = document.getElementById("reset-stopwatch");
const lapBtn = document.getElementById("lap-stopwatch");
const lapsList = document.getElementById("laps-list");

let stopwatchInterval = null;
let elapsedTime = 0;
let startTime = 0;
let isRunning = false;
let lapCount = 1;

// Update Stopwatch Display
function updateStopwatch() {

    elapsedTime = Date.now() - startTime;

    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Start
startBtn.addEventListener("click", function () {
    if (isRunning) {
        return;
    }
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
});

// Stop
stopBtn.addEventListener("click", function () {
    if (!isRunning) {
        return;
    }
    clearInterval(stopwatchInterval);
    isRunning = false;
});

// Reset
resetBtn.addEventListener("click", function () {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    stopwatchDisplay.textContent = "00:00:00";
    lapsList.innerHTML = "";
    lapCount = 1;
    stopwatchLaps.classList.add("hidden");
});
// Lap
const stopwatchLaps = document.querySelector(".stopwatch-laps");
lapBtn.addEventListener("click", function () {
    if (!isRunning) {
        return;
    }
    if(lapCount === 1){
    stopwatchLaps.classList.remove("hidden");
    }
    const lap = document.createElement("div");
    lap.classList.add("lap-row");
    lap.innerHTML = `
        <span>${lapCount}</span>
        <span>Lap ${lapCount}</span>
        <span>${stopwatchDisplay.textContent}</span>
    `;
    lapsList.appendChild(lap);
    lapsList.scrollTop = lapsList.scrollHeight;
    lapCount++;
});

// Timer
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const timerDisplay = document.querySelector(".timer-display");

const startTimerBtn = document.getElementById("start-timer");
const pauseTimerBtn = document.getElementById("pause-timer");
const resetTimerBtn = document.getElementById("reset-timer");

let timerInterval = null;
let totalSeconds = 0;
let isTimerRunning = false;

function updateTimerDisplay(){
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}
startTimerBtn.addEventListener("click", function(){
    if(isTimerRunning){
        return;
    }
    if(totalSeconds === 0){
        const h = Number(hoursInput.value) || 0;
        const m = Number(minutesInput.value) || 0;
        const s = Number(secondsInput.value) || 0;
        if(m > 59 || s > 59){
            alert("Minutes and seconds must be between 0 and 59.");
            return;
        }
        totalSeconds = h * 3600 + m * 60 + s;
        if(totalSeconds <= 0){
            alert("Please enter a valid time.");
            return;
        }
        updateTimerDisplay();
    }
    isTimerRunning = true;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;

    timerInterval = setInterval(function(){
        totalSeconds--;
        updateTimerDisplay();
        if(totalSeconds === 0){
            clearInterval(timerInterval);
            isTimerRunning = false;
            hoursInput.disabled = false;
            minutesInput.disabled = false;
            secondsInput.disabled = false;
            alert("Time's up!");
            return;
        }
    },1000);
});
pauseTimerBtn.addEventListener("click", function(){
    clearInterval(timerInterval);
    isTimerRunning = false;
});
resetTimerBtn.addEventListener("click", function(){
    clearInterval(timerInterval);
    isTimerRunning = false;
    totalSeconds = 0;
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    timerDisplay.textContent = "00:00:00";
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
});