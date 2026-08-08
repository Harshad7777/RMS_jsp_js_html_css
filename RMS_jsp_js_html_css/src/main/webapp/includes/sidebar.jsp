<%
String currentPage = request.getRequestURI();
%>

<aside class="sidebar">

    <!-- LOGO -->
    <div class="sidebar-logo">
        <h2 class="logo">
            <i class="fas fa-utensils"></i>
            RMS
        </h2>
    </div>


    <ul class="sidebar-menu">

        <!-- ========================================= -->
        <!-- ADMIN / STAFF DASHBOARD -->
        <!-- ========================================= -->

        <li class="admin-staff-menu">
            <a href="dashboard.jsp">
                <i class="fa fa-home"></i>
                <span>Dashboard</span>
            </a>
        </li>


        <!-- ========================================= -->
        <!-- ADMIN MENU -->
        <!-- ========================================= -->

        <li class="admin-menu">
            <a href="category.jsp">
                <i class="fa fa-list"></i>
                <span>Category</span>
            </a>
        </li>

        <li class="admin-menu">
            <a href="menu.jsp">
                <i class="fa fa-utensils"></i>
                <span>Menu</span>
            </a>
        </li>


        <!-- ========================================= -->
        <!-- ADMIN + STAFF -->
        <!-- ========================================= -->

        <li class="admin-staff-menu">
            <a href="customer.jsp">
                <i class="fa fa-users"></i>
                <span>Customer</span>
            </a>
        </li>

        <li class="admin-staff-menu">
            <a href="order.jsp">
                <i class="fa fa-cart-shopping"></i>
                <span>Orders</span>
            </a>
        </li>

        <li class="admin-staff-menu">
            <a href="bill.jsp">
                <i class="fa fa-file-invoice"></i>
                <span>Billing</span>
            </a>
        </li>


        <!-- ========================================= -->
        <!-- ADMIN ONLY -->
        <!-- ========================================= -->

        <li class="admin-menu">
            <a href="report.jsp">
                <i class="fa fa-chart-column"></i>
                <span>Reports</span>
            </a>
        </li>

        <li class="admin-menu">
            <a href="users.jsp">
                <i class="fa fa-user-shield"></i>
                <span>Users</span>
            </a>
        </li>


        <!-- ========================================= -->
        <!-- CHEF MENU -->
        <!-- ========================================= -->

        <li class="chef-menu">
            <a href="chef.jsp">
                <i class="fa-solid fa-kitchen-set"></i>
                <span>Kitchen Dashboard</span>
            </a>
        </li>

        <li class="chef-menu">
            <a href="chef.jsp?status=NEW">
                <i class="fa-solid fa-bell"></i>
                <span>New Orders</span>
            </a>
        </li>

        <li class="chef-menu">
            <a href="chef.jsp?status=PREPARING">
                <i class="fa-solid fa-fire"></i>
                <span>Preparing</span>
            </a>
        </li>

        <li class="chef-menu">
            <a href="chef.jsp?status=READY">
                <i class="fa-solid fa-circle-check"></i>
                <span>Ready</span>
            </a>
        </li>

        <li class="chef-menu">
            <a href="chef-history.jsp">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <span>Order History</span>
            </a>
        </li>


        <!-- ========================================= -->
        <!-- COMMON -->
        <!-- ========================================= -->

        <li class="common-menu">
            <a href="profile.jsp">
                <i class="fa fa-user"></i>
                <span>Profile</span>
            </a>
        </li>

        <li class="common-menu">
            <a href="#" onclick="logout(); return false;">
                <i class="fa fa-right-from-bracket"></i>
                <span>Logout</span>
            </a>
        </li>

    </ul>

</aside>


<script>

document.addEventListener("DOMContentLoaded", function () {

    const role = localStorage.getItem("role");

    console.log("Logged in role:", role);

    /*
     * Hide everything first
     */
    document.querySelectorAll(
        ".admin-menu, .admin-staff-menu, .chef-menu"
    ).forEach(function(menu) {

        menu.style.display = "none";

    });


    /*
     * ADMIN
     */
    if (role === "ADMIN") {

        document.querySelectorAll(
            ".admin-menu, .admin-staff-menu"
        ).forEach(function(menu) {

            menu.style.display = "block";

        });

    }


    /*
     * STAFF
     */
    else if (role === "STAFF") {

        document.querySelectorAll(
            ".admin-staff-menu"
        ).forEach(function(menu) {

            menu.style.display = "block";

        });

    }


    /*
     * CHEF
     */
    else if (role === "CHEF") {

        document.querySelectorAll(
            ".chef-menu"
        ).forEach(function(menu) {

            menu.style.display = "block";

        });

    }


    /*
     * COMMON MENU
     * Profile + Logout
     */
    document.querySelectorAll(
        ".common-menu"
    ).forEach(function(menu) {

        menu.style.display = "block";

    });

});

</script>