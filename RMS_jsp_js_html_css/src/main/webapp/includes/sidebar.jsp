<div class="sidebar">

    <h2>🍽 RMS</h2>

    <ul>

        <li>
            <a href="dashboard.jsp">
                <i class="fa fa-home"></i> Dashboard
            </a>
        </li>


        <!-- Admin Only -->
        <li class="admin-menu">
            <a href="category.jsp">
                <i class="fa fa-list"></i> Category
            </a>
        </li>


        <li>
            <a href="menu.jsp">
                <i class="fa fa-utensils"></i> Menu
            </a>
        </li>


        <li>
            <a href="customer.jsp">
                <i class="fa fa-users"></i> Customer
            </a>
        </li>


        <li>
            <a href="order.jsp">
                <i class="fa fa-cart-shopping"></i> Orders
            </a>
        </li>


        <li>
            <a href="bill.jsp">
                <i class="fa fa-file-invoice"></i> Billing
            </a>
        </li>



        <!-- Admin Only -->
        <li class="admin-menu">
            <a href="report.jsp">
                <i class="fa fa-chart-column"></i> Reports
            </a>
        </li>



        <!-- Admin Only -->
        <li class="admin-menu">
            <a href="users.jsp">
                <i class="fa fa-user-shield"></i> Users
            </a>
        </li>




        <!-- Admin Only -->
        <li class="admin-menu">
            <a href="profile.jsp">
                <i class="fa fa-user"></i> Profile
            </a>
        </li>




        <li>
            <a href="#" onclick="logout()">
                <i class="fa fa-right-from-bracket"></i> Logout
            </a>
        </li>


    </ul>


</div>




<script>

document.addEventListener("DOMContentLoaded", function(){


    const role = localStorage.getItem("role");


    const adminMenus = document.querySelectorAll(".admin-menu");



    if(role !== "ADMIN"){


        adminMenus.forEach(menu => {

            menu.style.display = "none";

        });


    }



});



function logout(){

    localStorage.clear();

    window.location.href="login.jsp";

}


</script>