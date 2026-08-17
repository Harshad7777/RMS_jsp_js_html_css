<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String currentUri = request.getRequestURI();

    String pageTitle = "Dashboard";
    String pageCss = "dashboard.css";

    if (currentUri != null) {

        if (currentUri.endsWith("dashboard.jsp")) {
            pageTitle = "Dashboard";
            pageCss = "dashboard.css";
        }

        else if (currentUri.endsWith("category.jsp")) {
            pageTitle = "Dashboard";
            pageCss = "category.css";
        }

        else if (currentUri.endsWith("order.jsp")) {
            pageTitle = "Orders";
            pageCss = "order.css";
        }

        else if (currentUri.endsWith("menu.jsp")) {
            pageTitle = "Menu Management";
            pageCss = "menu.css";
        }

        else if (currentUri.endsWith("customer.jsp")) {
            pageTitle = "Customers";
            pageCss = "customer.css";
        }

        else if (currentUri.endsWith("billing.jsp")) {
            pageTitle = "Billing";
            pageCss = "billing.css";
        }

        else if (currentUri.endsWith("reports.jsp")
                || currentUri.endsWith("report.jsp")) {

            pageTitle = "Reports";
            pageCss = "reports.css";
        }

        else if (currentUri.endsWith("chef.jsp")
                || currentUri.endsWith("kitchen.jsp")) {

            pageTitle = "Kitchen (Chef)";
            pageCss = "chef.css";
        }

        else if (currentUri.endsWith("inventory.jsp")) {
            pageTitle = "Inventory";
            pageCss = "inventory.css";
        }

        else if (currentUri.endsWith("staff.jsp")) {
            pageTitle = "Staff Management";
            pageCss = "staff.css";
        }

        else if (currentUri.endsWith("settings.jsp")) {
            pageTitle = "Settings";
            pageCss = "settings.css";
        }
    }
%>

<!DOCTYPE html>

<html lang="en">

<head>

    <!-- =====================================================
         META
    ====================================================== -->

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <!-- APP CONTEXT -->
    <meta
        name="app-context"
        content="${pageContext.request.contextPath}">


    <!-- =====================================================
         TITLE
    ====================================================== -->

    <title>
        <%= pageTitle %> | Sankalp RMS
    </title>


    <!-- =====================================================
         FONT AWESOME
    ====================================================== -->

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">


    <!-- =====================================================
         COMMON CSS
    ====================================================== -->

    <link
        rel="stylesheet"
        href="${pageContext.request.contextPath}/css/common.css">


    <!-- =====================================================
         PAGE CSS
    ====================================================== -->

    <link
        rel="stylesheet"
        href="${pageContext.request.contextPath}/css/<%= pageCss %>">

</head>


<body>


<!-- =====================================================
     COMMON HEADER
====================================================== -->

<header class="admin-header">


    <!-- =================================================
         LEFT
    ================================================== -->

    <div class="header-left">

        <button
            type="button"
            class="sidebar-toggle"
            id="sidebarToggle"
            aria-label="Toggle sidebar">

            <i class="fa-solid fa-bars"></i>

        </button>


        <h1
            class="header-title"
            id="pageTitle">

            <%= pageTitle %>

        </h1>

    </div>


    <!-- =================================================
         GLOBAL SEARCH
    ================================================== -->

    <div class="header-search">

        <input
            type="text"
            id="globalSearch"
            placeholder="Search here..."
            autocomplete="off">

        <i class="fa-solid fa-magnifying-glass"></i>

    </div>


    <!-- =================================================
         HEADER RIGHT
    ================================================== -->

    <div class="header-right">


        <!-- =================================================
             DATE + LIVE TIME
        ================================================== -->

        <div
            class="header-date"
            id="headerDateTime">

            <i class="fa-regular fa-calendar"></i>

            <div>

                <!-- DATE -->
                <strong id="currentDate">
                    Loading...
                </strong>


                <!-- DAY + TIME -->
                <span id="currentDay">
                    Loading...
                </span>

            </div>

        </div>


        <!-- =================================================
             NOTIFICATION
        ================================================== -->

        <button
            type="button"
            class="notification-btn"
            id="notificationBtn"
            aria-label="Notifications">

            <i class="fa-regular fa-bell"></i>

            <span
                class="notification-count"
                id="notificationCount">

                0

            </span>

        </button>


        <!-- =================================================
             PROFILE
        ================================================== -->

        <div
            class="admin-profile"
            id="adminProfile">

            <div class="profile-avatar">

                <i class="fa-solid fa-user-tie"></i>

            </div>


            <div class="profile-info">

                <strong id="adminName">
                    Admin
                </strong>

                <span id="adminRole">
                    Administrator
                </span>

            </div>


            <i class="fa-solid fa-chevron-down"></i>

        </div>

    </div>

</header>


<!-- =====================================================
     PROFILE DROPDOWN
====================================================== -->

<div
    class="profile-dropdown"
    id="profileDropdown">


    <!-- PROFILE -->

    <a
        href="${pageContext.request.contextPath}/profile.jsp">

        <i class="fa-regular fa-user"></i>

        <span>
            My Profile
        </span>

    </a>


    <!-- SETTINGS -->

    <a
        href="${pageContext.request.contextPath}/settings.jsp">

        <i class="fa-solid fa-gear"></i>

        <span>
            Settings
        </span>

    </a>


    <!-- DIVIDER -->

    <div class="dropdown-divider"></div>


    <!-- LOGOUT -->

    <a
        href="${pageContext.request.contextPath}/login.jsp"
        id="headerLogout"
        class="logout-dropdown">

        <i class="fa-solid fa-right-from-bracket"></i>

        <span>
            Logout
        </span>

    </a>

</div>