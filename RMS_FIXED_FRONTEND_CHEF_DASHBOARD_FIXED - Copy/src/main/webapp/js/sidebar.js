const role = localStorage.getItem("role");
const token = localStorage.getItem("token");

// ==========================================
// LOGIN CHECK
// ==========================================

if (!token) {

    window.location.href = "login.jsp";

}


// ==========================================
// ROLE BASED SIDEBAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // --------------------------------------
    // ADMIN
    // --------------------------------------

    if (role === "ADMIN") {

        // Admin sees admin menu
        document
            .querySelectorAll(".admin-menu")
            .forEach(function (menu) {

                menu.style.display = "block";

            });

        // Hide chef menu
        document
            .querySelectorAll(".chef-menu")
            .forEach(function (menu) {

                menu.style.display = "none";

            });

    }


    // --------------------------------------
    // STAFF
    // --------------------------------------

    else if (role === "STAFF") {

        // Hide admin-only menu
        document
            .querySelectorAll(".admin-menu")
            .forEach(function (menu) {

                menu.style.display = "none";

            });

        // Hide chef menu
        document
            .querySelectorAll(".chef-menu")
            .forEach(function (menu) {

                menu.style.display = "none";

            });

    }


    // --------------------------------------
    // CHEF
    // --------------------------------------

    else if (role === "CHEF") {

        // Hide admin/staff menu
        document
            .querySelectorAll(".admin-menu")
            .forEach(function (menu) {

                menu.style.display = "none";

            });

        // Show chef menu
        document
            .querySelectorAll(".chef-menu")
            .forEach(function (menu) {

                menu.style.display = "block";

            });

    }


    // --------------------------------------
    // INVALID ROLE
    // --------------------------------------

    else {

        alert("Invalid Role");

        localStorage.clear();

        window.location.href = "login.jsp";

    }

});