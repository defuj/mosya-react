// bottom navigation
var navItems = document.querySelectorAll(".bottom-nav-item");
navItems.forEach(function(e, i) {
    e.addEventListener("click", function(e) {
        navItems.forEach(function(e2, i2) {
            e2.classList.remove("active");
        });
        this.classList.add("active");
        if(i == 0) {
            window.location.href = "./home.html";
        } else if(i == 1) {
            window.location.href = "./catalog.html";
        } else if(i == 2) {
            window.location.href = "./history.html";
        } else if(i == 3) {
            window.location.href = "./profile.html";
        }
    });
});

// tab naigation
// var menuTabs = document.querySelectorAll(".menu-tab-item");
// menuTabs.forEach(function(e, i) {
//     e.addEventListener("click", function(e) {
//     menuTabs.forEach(function(e2, i2) {
//         e2.classList.remove("active");
//     });
//     this.classList.add("active");
//     });
// });