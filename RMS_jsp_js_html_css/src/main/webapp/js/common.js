// Highlight active menu
document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });

});

// Logout
function logout() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    window.location.href = "login.jsp";
}