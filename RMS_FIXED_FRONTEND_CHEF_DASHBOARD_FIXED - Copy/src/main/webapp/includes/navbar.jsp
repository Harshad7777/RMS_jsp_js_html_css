<!-- =========================================
     ADMIN NAVBAR
========================================= -->

<header class="admin-navbar">

    <!-- LEFT -->

    <div class="navbar-left">

        <button
            type="button"
            class="menu-toggle"
            id="menuToggle">

            <i class="fa-solid fa-bars"></i>

        </button>

        <h3 id="pageTitle">
            Dashboard
        </h3>

    </div>


    <!-- SEARCH -->

    <div class="navbar-search">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input
            type="text"
            placeholder="Search here..."
            id="globalSearch">

    </div>


    <!-- RIGHT -->

    <div class="navbar-right">


        <!-- DATE -->

        <div class="navbar-date">

            <i class="fa-regular fa-calendar"></i>

            <div>

                <strong id="currentDate">
                    May 13, 2026
                </strong>

                <small id="currentDay">
                    Tuesday
                </small>

            </div>

        </div>


        <!-- NOTIFICATION -->

        <div class="notification-box">

            <i class="fa-regular fa-bell"></i>

            <span id="notificationCount">
                0
            </span>

        </div>


        <!-- ADMIN PROFILE -->

        <div class="admin-profile">

            <div class="admin-avatar">

                <i class="fa-solid fa-user"></i>

            </div>

            <div class="admin-info">

                <strong id="adminName">
                    Admin
                </strong>

                <small>
                    Administrator
                </small>

            </div>

            <i class="fa-solid fa-chevron-down"></i>

        </div>

    </div>

</header>