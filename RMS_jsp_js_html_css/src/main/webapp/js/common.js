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
// =====================================================
// COMMON AUTHENTICATION
// =====================================================

const AUTH_TOKEN =
    localStorage.getItem("token");

const USER_ROLE =
    localStorage.getItem("role");


// =====================================================
// LOGIN CHECK
// =====================================================

if (!AUTH_TOKEN) {

    window.location.href =
        "login.jsp";
}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // -------------------------------------------------
        // DISPLAY USERNAME
        // -------------------------------------------------

        const usernameElement =
            document.getElementById("username");

        const storedUsername =
            localStorage.getItem("username");


        if (usernameElement) {

            usernameElement.innerText =
                storedUsername ||
                "User";
        }


        // -------------------------------------------------
        // ROLE BASED SIDEBAR
        // -------------------------------------------------

        document
            .querySelectorAll(".admin-menu")
            .forEach(function (menu) {

                menu.style.display =
                    USER_ROLE === "ADMIN"
                        ? "block"
                        : "none";
            });


        document
            .querySelectorAll(".chef-menu")
            .forEach(function (menu) {

                menu.style.display =
                    USER_ROLE === "CHEF"
                        ? "block"
                        : "none";
            });


        document
            .querySelectorAll(".staff-menu")
            .forEach(function (menu) {

                menu.style.display =
                    USER_ROLE === "STAFF"
                        ? "block"
                        : "none";
            });
    }
);


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    window.location.href =
        "login.jsp";
}