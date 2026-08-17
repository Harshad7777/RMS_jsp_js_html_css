"use strict";

/* =====================================================
   SANKALP RMS
   COMMON JS
===================================================== */

console.log("======================================");
console.log("Sankalp Common JS Loaded");
console.log("======================================");


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const role = getCurrentRole();

        console.log(
            "Logged-in role:",
            role
        );

        applyRoleBasedSidebar(role);

        updateDateTime();

        startLiveClock();

        loadAdmin();

        setupSidebar();

        setupProfile();

        setupLogout();

        setActiveSidebarLink();

    }
);


/* =====================================================
   GET ROLE
===================================================== */

function getCurrentRole() {

    let role =
        localStorage.getItem("role");


    if (!role) {

        role =
            localStorage.getItem("userRole");

    }


    if (!role) {

        role =
            localStorage.getItem("chefRole");

    }


    return String(
        role || ""
    )
        .trim()
        .toUpperCase();

}


/* =====================================================
   ROLE BASED SIDEBAR
===================================================== */

function applyRoleBasedSidebar(role) {

    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    if (!sidebar) {

        console.error(
            "adminSidebar not found"
        );

        return;

    }


    const elements =
        sidebar.querySelectorAll(
            "[data-roles]"
        );


    elements.forEach(
        function (element) {

            const roles =
                String(
                    element.getAttribute(
                        "data-roles"
                    ) || ""
                )
                    .trim()
                    .toUpperCase()
                    .split(/\s+/);


            if (
                roles.includes(role)
            ) {

                element.style.display = "";

            }
            else {

                element.style.display =
                    "none";

            }

        }
    );


    /* =================================================
       CHEF SPECIAL MODE
    ================================================= */

    if (role === "CHEF") {

        console.log(
            "CHEF MODE ENABLED"
        );


        /* ------------------------------------------------
           Hide all normal navigation links
        ------------------------------------------------ */

        const links =
            sidebar.querySelectorAll(
                ".sidebar-link"
            );


        links.forEach(
            function (link) {

                const page =
                    link.getAttribute(
                        "data-page"
                    );


                if (
                    page === "chef" ||
                    link.id === "sidebarLogout"
                ) {

                    link.style.display =
                        "flex";

                }
                else {

                    link.style.display =
                        "none";

                }

            }
        );


        /* ------------------------------------------------
           Hide all section titles
        ------------------------------------------------ */

        const sections =
            sidebar.querySelectorAll(
                ".nav-section-title"
            );


        sections.forEach(
            function (section) {

                section.style.display =
                    "none";

            }
        );


        /* ------------------------------------------------
           Remove admin bottom card
        ------------------------------------------------ */

        const bottomCard =
            document.getElementById(
                "sidebarBottomCard"
            );


        if (bottomCard) {

            bottomCard.style.display =
                "none";

        }


        /* ------------------------------------------------
           Add KITCHEN title
        ------------------------------------------------ */

        const nav =
            sidebar.querySelector(
                ".sidebar-nav"
            );


        const kitchenLink =
            sidebar.querySelector(
                '[data-page="chef"]'
            );


        if (
            nav &&
            kitchenLink &&
            !document.getElementById(
                "chefOnlySection"
            )
        ) {

            const title =
                document.createElement(
                    "div"
                );


            title.id =
                "chefOnlySection";


            title.className =
                "nav-section-title";


            title.style.display =
                "block";


            title.textContent =
                "KITCHEN";


            nav.insertBefore(
                title,
                kitchenLink
            );

        }


        /* ------------------------------------------------
           Add ACCOUNT section before logout
        ------------------------------------------------ */

        const logoutLink =
            document.getElementById(
                "sidebarLogout"
            );


        if (
            nav &&
            logoutLink &&
            !document.getElementById(
                "chefAccountSection"
            )
        ) {

            const title =
                document.createElement(
                    "div"
                );


            title.id =
                "chefAccountSection";


            title.className =
                "nav-section-title";


            title.style.display =
                "block";


            title.textContent =
                "ACCOUNT";


            nav.insertBefore(
                title,
                logoutLink
            );

        }

    }


    /* =================================================
       STAFF MODE
    ================================================= */

    if (role === "STAFF") {

        console.log(
            "STAFF MODE ENABLED"
        );


        const bottomCard =
            document.getElementById(
                "sidebarBottomCard"
            );


        if (bottomCard) {

            bottomCard.style.display =
                "none";

        }

    }


    /* =================================================
       ADMIN MODE
    ================================================= */

    if (role === "ADMIN") {

        console.log(
            "ADMIN MODE ENABLED"
        );

    }

}


/* =====================================================
   ACTIVE SIDEBAR
===================================================== */

function setActiveSidebarLink() {

    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    if (!sidebar) {
        return;
    }


    const currentPath =
        window.location.pathname
            .toLowerCase();


    const links =
        sidebar.querySelectorAll(
            ".sidebar-link[data-page]"
        );


    links.forEach(
        function (link) {

            const page =
                link.getAttribute(
                    "data-page"
                );


            let active = false;


            switch (page) {

                case "dashboard":

                    active =
                        currentPath.endsWith(
                            "dashboard.jsp"
                        );

                    break;


                case "order":

                    active =
                        currentPath.endsWith(
                            "order.jsp"
                        );

                    break;


                case "table":

                    active =
                        currentPath.endsWith(
                            "table.jsp"
                        );

                    break;


                case "menu":

                    active =
                        currentPath.endsWith(
                            "menu.jsp"
                        );

                    break;


                case "category":

                    active =
                        currentPath.endsWith(
                            "category.jsp"
                        );

                    break;


                case "customer":

                    active =
                        currentPath.endsWith(
                            "customer.jsp"
                        );

                    break;


                case "billing":

                    active =
                        currentPath.endsWith(
                            "billing.jsp"
                        );

                    break;


                case "reports":

                    active =
                        currentPath.endsWith(
                            "reports.jsp"
                        ) ||
                        currentPath.endsWith(
                            "report.jsp"
                        );

                    break;


                case "chef":

                    active =
                        currentPath.endsWith(
                            "chef.jsp"
                        ) ||
                        currentPath.endsWith(
                            "kitchen.jsp"
                        );

                    break;


                case "inventory":

                    active =
                        currentPath.endsWith(
                            "inventory.jsp"
                        );

                    break;


                case "staff":

                    active =
                        currentPath.endsWith(
                            "staff.jsp"
                        );

                    break;


                case "settings":

                    active =
                        currentPath.endsWith(
                            "settings.jsp"
                        );

                    break;

            }


            if (active) {

                link.classList.add(
                    "active"
                );

            }
            else {

                link.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   DATE + TIME
===================================================== */

function updateDateTime() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );


    const dayElement =
        document.getElementById(
            "currentDay"
        );


    if (!dateElement) {
        return;
    }


    const now =
        new Date();


    dateElement.textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    if (dayElement) {

        dayElement.textContent =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long"
                }
            ) +
            " | " +
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

    }

}


/* =====================================================
   LIVE CLOCK
===================================================== */

function startLiveClock() {

    updateDateTime();


    setInterval(
        function () {

            updateDateTime();

        },
        1000
    );

}


/* =====================================================
   LOAD ADMIN / USER
===================================================== */

function loadAdmin() {

    let username =
        localStorage.getItem(
            "username"
        );


    if (!username) {

        username =
            localStorage.getItem(
                "userName"
            );

    }


    const role =
        getCurrentRole();


    const nameElement =
        document.getElementById(
            "adminName"
        );


    const roleElement =
        document.getElementById(
            "adminRole"
        );


    if (
        nameElement &&
        username
    ) {

        nameElement.textContent =
            username;

    }


    if (roleElement) {

        switch (role) {

            case "ADMIN":

                roleElement.textContent =
                    "Administrator";

                break;


            case "STAFF":

                roleElement.textContent =
                    "Staff";

                break;


            case "CHEF":

                roleElement.textContent =
                    "Chef";

                break;


            default:

                roleElement.textContent =
                    "User";

                break;

        }

    }

}


/* =====================================================
   SIDEBAR TOGGLE
===================================================== */

function setupSidebar() {

    const toggle =
        document.getElementById(
            "sidebarToggle"
        );


    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    if (
        !toggle ||
        !sidebar
    ) {

        return;
    }


    toggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );


            if (overlay) {

                overlay.classList.toggle(
                    "show"
                );

            }

        }
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                sidebar.classList.remove(
                    "open"
                );


                overlay.classList.remove(
                    "show"
                );

            }
        );

    }

}


/* =====================================================
   PROFILE
===================================================== */

function setupProfile() {

    const profile =
        document.getElementById(
            "adminProfile"
        );


    const dropdown =
        document.getElementById(
            "profileDropdown"
        );


    if (
        !profile ||
        !dropdown
    ) {

        return;
    }


    profile.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            dropdown.classList.toggle(
                "show"
            );

        }
    );


    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function () {

            dropdown.classList.remove(
                "show"
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    const buttons = [

        document.getElementById(
            "sidebarLogout"
        ),

        document.getElementById(
            "headerLogout"
        )

    ];


    buttons.forEach(
        function (button) {

            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    console.log(
                        "Logout clicked"
                    );


                    clearLoginData();


                    const meta =
                        document.querySelector(
                            'meta[name="app-context"]'
                        );


                    const contextPath =
                        meta
                            ? meta.getAttribute(
                                "content"
                            ) || ""
                            : "";


                    window.location.href =
                        contextPath +
                        "/login.jsp";

                }
            );

        }
    );

}


/* =====================================================
   CLEAR LOGIN DATA
===================================================== */

function clearLoginData() {

    const keys = [

        "token",
        "jwtToken",

        "userId",

        "username",
        "userName",

        "role",
        "userRole",

        "chefId",
        "chefToken",
        "chefRole"

    ];


    keys.forEach(
        function (key) {

            localStorage.removeItem(
                key
            );

        }
    );

}


/* =====================================================
   FINAL LOG
===================================================== */

console.log(
    "Sankalp Common JS Ready"
);