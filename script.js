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

