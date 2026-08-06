// ======================================
// Authentication & Authorization
// ======================================

// Get User Information
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

// ======================================
// Login Check
// ======================================

if (!token) {

    alert("Please Login First");

    window.location.href = "login.jsp";

}

// ======================================
// Load User Information
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // Navbar Username
    const userElement = document.getElementById("username");

    if (userElement) {

        userElement.innerHTML = username || "Guest";

    }

    // Navbar Role
    const roleElement = document.getElementById("role");

    if (roleElement) {

        roleElement.innerHTML = role || "";

    }

});

// ======================================
// ADMIN Access
// ======================================

function checkAdmin() {

    if (role !== "ADMIN") {

        alert("Access Denied!");

        window.location.href = "dashboard.jsp";

    }

}

// ======================================
// STAFF Access
// ======================================

function checkStaff() {

    if (role !== "STAFF") {

        alert("Access Denied!");

        window.location.href = "dashboard.jsp";

    }

}

// ======================================
// Login Check Function
// ======================================

function checkLogin() {

    if (!token) {

        alert("Please Login First");

        window.location.href = "login.jsp";

    }

}

// ======================================
// Logout
// ======================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        window.location.href = "login.jsp";

    }

}