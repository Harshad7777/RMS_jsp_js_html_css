const role = localStorage.getItem("role");
var token = localStorage.getItem("token");

// If user is not logged in
if (!token) {
    window.location.href = "login.jsp";
}

// Hide Admin menus for STAFF
if (role === "STAFF") {

    document.querySelectorAll(".admin-menu").forEach(function(menu) {
        menu.style.display = "none";
    });

}