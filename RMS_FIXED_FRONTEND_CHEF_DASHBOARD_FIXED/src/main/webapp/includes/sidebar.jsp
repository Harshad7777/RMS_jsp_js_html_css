<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String currentPage = request.getRequestURI();
%>


<!-- =====================================================
     ADMIN SIDEBAR
====================================================== -->

<aside
    class="admin-sidebar"
    id="adminSidebar">


    <!-- =================================================
         LOGO
    ================================================== -->

    <div class="sidebar-logo">

        <a
            href="${pageContext.request.contextPath}/dashboard.jsp">

            <img
                src="${pageContext.request.contextPath}/images/logo.png"
                alt="Sankalp Restaurant">

        </a>

    </div>


    <!-- =================================================
         NAVIGATION
    ================================================== -->

    <nav class="sidebar-nav">


        <!-- =================================================
             MAIN MENU
        ================================================== -->

        <div
            class="nav-section-title"
            data-roles="ADMIN STAFF">

            MAIN MENU

        </div>


        <!-- =================================================
             DASHBOARD
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/dashboard.jsp"
            class="sidebar-link <%= currentPage.endsWith("dashboard.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="dashboard">

            <i class="fa-solid fa-house"></i>

            <span>
                Dashboard
            </span>

        </a>


        <!-- =================================================
             ORDERS
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/order.jsp"
            class="sidebar-link <%= currentPage.endsWith("order.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="order">

            <i class="fa-solid fa-cart-shopping"></i>

            <span>
                Orders
            </span>

            <span
                class="sidebar-badge"
                id="sidebarOrderCount">

                0

            </span>

        </a>


        <!-- =================================================
             TABLE MANAGEMENT
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/table.jsp"
            class="sidebar-link <%= currentPage.endsWith("table.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="table">

            <i class="fa-solid fa-chair"></i>

            <span>
                Table Management
            </span>

        </a>


        <!-- =================================================
             MENU MANAGEMENT
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/menu.jsp"
            class="sidebar-link <%= currentPage.endsWith("menu.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="menu">

            <i class="fa-solid fa-utensils"></i>

            <span>
                Menu Management
            </span>

        </a>


        <!-- =================================================
             CATEGORY MANAGEMENT
             ADMIN ONLY
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/category.jsp"
            class="sidebar-link <%= currentPage.endsWith("category.jsp") ? "active" : "" %>"
            data-roles="ADMIN"
            data-page="category">

            <i class="fa-solid fa-layer-group"></i>

            <span>
                Category Management
            </span>

        </a>


        <!-- =================================================
             CUSTOMERS
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/customer.jsp"
            class="sidebar-link <%= currentPage.endsWith("customer.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="customer">

            <i class="fa-solid fa-users"></i>

            <span>
                Customers
            </span>

        </a>


        <!-- =================================================
             BUSINESS
        ================================================= -->

        <div
            class="nav-section-title"
            data-roles="ADMIN STAFF">

            BUSINESS

        </div>


        <!-- =================================================
             BILLING
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/billing.jsp"
            class="sidebar-link <%= currentPage.endsWith("billing.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="billing">

            <i class="fa-solid fa-file-invoice-dollar"></i>

            <span>
                Billing
            </span>

        </a>


        <!-- =================================================
             REPORTS
             ADMIN ONLY
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/reports.jsp"
            class="sidebar-link <%= currentPage.endsWith("reports.jsp") ? "active" : "" %>"
            data-roles="ADMIN"
            data-page="reports">

            <i class="fa-solid fa-chart-column"></i>

            <span>
                Reports
            </span>

        </a>


        <!-- =================================================
             KITCHEN
             ADMIN + CHEF
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/chef.jsp"
            class="sidebar-link <%= currentPage.endsWith("chef.jsp") ? "active" : "" %>"
            data-roles="ADMIN CHEF"
            data-page="chef">

            <i class="fa-solid fa-kitchen-set"></i>

            <span>
                Kitchen (Chef)
            </span>

        </a>


        <!-- =================================================
             INVENTORY
        ================================================= -->

    <%--     <a
            href="${pageContext.request.contextPath}/inventory.jsp"
            class="sidebar-link <%= currentPage.endsWith("inventory.jsp") ? "active" : "" %>"
            data-roles="ADMIN STAFF"
            data-page="inventory">

            <i class="fa-solid fa-boxes-stacked"></i>

            <span>
                Inventory
            </span>

        </a> --%>


        <!-- =================================================
             MANAGEMENT
        ================================================= -->

        <div
            class="nav-section-title"
            data-roles="ADMIN">

            MANAGEMENT

        </div>


        <!-- =================================================
             STAFF MANAGEMENT
             ADMIN ONLY
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/staff.jsp"
            class="sidebar-link <%= currentPage.endsWith("staff.jsp") ? "active" : "" %>"
            data-roles="ADMIN"
            data-page="staff">

            <i class="fa-solid fa-user-tie"></i>

            <span>
                Staff Management
            </span>

        </a>


        <!-- =================================================
             SETTINGS
             ADMIN ONLY
        ================================================= -->
<%-- 
        <a
            href="${pageContext.request.contextPath}/settings.jsp"
            class="sidebar-link <%= currentPage.endsWith("settings.jsp") ? "active" : "" %>"
            data-roles="ADMIN"
            data-page="settings">

            <i class="fa-solid fa-gear"></i>

            <span>
                Settings
            </span>

        </a> --%>


        <!-- =================================================
             ACCOUNT
        ================================================= -->

        <div
            class="nav-section-title"
            data-roles="ADMIN STAFF CHEF">

            ACCOUNT

        </div>


        <!-- =================================================
             LOGOUT
        ================================================= -->

        <a
            href="${pageContext.request.contextPath}/login.jsp"
            class="sidebar-link logout-link"
            id="sidebarLogout"
            data-roles="ADMIN STAFF CHEF">

            <i class="fa-solid fa-right-from-bracket"></i>

            <span>
                Logout
            </span>

        </a>


    </nav>


    <!-- =================================================
         ADMIN CARD
    ================================================= -->

    <div
        class="sidebar-bottom-card"
        id="sidebarBottomCard">

        <div class="premium-icon">

            <i class="fa-solid fa-crown"></i>

        </div>

        <h6>
            Sankalp Admin
        </h6>

        <p>
            Restaurant Management
        </p>

    </div>


</aside>


<!-- =====================================================
     MOBILE OVERLAY
====================================================== -->

<div
    class="sidebar-overlay"
    id="sidebarOverlay">
</div>