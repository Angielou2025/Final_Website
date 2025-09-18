// Tab navigation
const navHome = document.getElementById("nav-home");
const navSchedules = document.getElementById("nav-schedules");
const contentHome = document.getElementById("content-home");
const contentSchedules = document.getElementById("content-schedules");

function setActiveTab(tab) {
  if (tab === "home") {
    navHome.classList.add("active");
    navSchedules.classList.remove("active");
    contentHome.hidden = false;
    contentSchedules.hidden = true;
  } else {
    navSchedules.classList.add("active");
    navHome.classList.remove("active");
    contentSchedules.hidden = false;
    contentHome.hidden = true;
  }
}
navHome.addEventListener("click", () => setActiveTab("home"));
navSchedules.addEventListener("click", () => setActiveTab("schedules"));

// Custom Logout Confirmation
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

logoutBtn.addEventListener("click", () => {
  logoutModal.classList.remove("hidden");
});

cancelLogout.addEventListener("click", () => {
  logoutModal.classList.add("hidden");
});

confirmLogout.addEventListener("click", () => {
  window.location.href = "login.html"; // change to your login page
});


// This is for ourlink
    function navigateToPage(url) {
  if (url) {
    window.location.href = url; // pupunta sa link na pinili mo
  }
}