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