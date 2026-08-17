<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Table Management | Sankalp RMS</title>

    <meta name="app-context"
          content="${pageContext.request.contextPath}">

    <!-- =====================================================
         FONT AWESOME
    ====================================================== -->

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- =====================================================
         COMMON CSS
    ====================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/common.css">

    <!-- =====================================================
         TABLE CSS
    ====================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/table.css">

</head>

<body>


<!-- =====================================================
     SIDEBAR
====================================================== -->

<%@ include file="includes/sidebar.jsp" %>


<!-- =====================================================
     MAIN CONTENT
====================================================== -->

<div class="main-content">


    <!-- =================================================
         HEADER
    ================================================== -->

    <header class="admin-header">

        <div class="header-left">

            <button
                type="button"
                class="sidebar-toggle"
                id="sidebarToggle"
                aria-label="Toggle sidebar">

                <i class="fa-solid fa-bars"></i>

            </button>

            <h1 class="header-title">
                Table Management
            </h1>

        </div>


        <!-- SEARCH -->

        <div class="header-search">

            <input
                type="text"
                id="globalSearch"
                placeholder="Search here..."
                autocomplete="off">

            <i class="fa-solid fa-magnifying-glass"></i>

        </div>


        <!-- RIGHT -->

        <div class="header-right">

            <div class="header-date">

                <i class="fa-regular fa-calendar"></i>

                <div>

                    <strong id="currentDate">
                        Loading...
                    </strong>

                    <span id="currentDay">
                        Loading...
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="notification-btn"
                id="notificationBtn">

                <i class="fa-regular fa-bell"></i>

                <span
                    class="notification-count"
                    id="notificationCount">

                    0

                </span>

            </button>


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


    <!-- =================================================
         TABLE PAGE
    ================================================== -->

    <main class="table-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="table-page-header">

            <div class="table-title-area">

                <h1>
                    Table Management
                </h1>

                <div class="table-breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Tables
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="btn-add-table"
                id="openAddTableBtn">

                <i class="fa-solid fa-plus"></i>

                Add Table

            </button>

        </div>


        <!-- =================================================
             TABLE STATS
        ================================================== -->

        <div class="table-stats">


            <!-- TOTAL -->

            <div class="table-stat-card">

                <div class="table-stat-icon total">

                    <i class="fa-solid fa-chair"></i>

                </div>

                <div>

                    <span>
                        Total Tables
                    </span>

                    <strong id="totalTableCount">
                        0
                    </strong>

                </div>

            </div>


            <!-- AVAILABLE -->

            <div class="table-stat-card">

                <div class="table-stat-icon available">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <div>

                    <span>
                        Available
                    </span>

                    <strong id="availableTableCount">
                        0
                    </strong>

                </div>

            </div>


            <!-- OCCUPIED -->

            <div class="table-stat-card">

                <div class="table-stat-icon occupied">

                    <i class="fa-solid fa-user-group"></i>

                </div>

                <div>

                    <span>
                        Occupied
                    </span>

                    <strong id="occupiedTableCount">
                        0
                    </strong>

                </div>

            </div>


            <!-- RESERVED -->

            <div class="table-stat-card">

                <div class="table-stat-icon reserved">

                    <i class="fa-solid fa-calendar-check"></i>

                </div>

                <div>

                    <span>
                        Reserved
                    </span>

                    <strong id="reservedTableCount">
                        0
                    </strong>

                </div>

            </div>

        </div>


        <!-- =================================================
             TABLE CARD
        ================================================== -->

        <section class="table-main-card">


            <!-- TOOLBAR -->

            <div class="table-toolbar">


                <div class="table-search-box">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="tableSearch"
                        placeholder="Search tables...">

                </div>


                <div class="table-filter-box">

                    <select id="tableStatusFilter">

                        <option value="ALL">
                            All Status
                        </option>

                        <option value="AVAILABLE">
                            Available
                        </option>

                        <option value="OCCUPIED">
                            Occupied
                        </option>

                        <option value="RESERVED">
                            Reserved
                        </option>

                        <option value="MAINTENANCE">
                            Maintenance
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>


                <button
                    type="button"
                    class="btn-refresh-tables"
                    id="refreshTables">

                    <i class="fa-solid fa-rotate"></i>

                    Refresh

                </button>

            </div>


            <!-- TABLE -->

            <div class="table-data-wrapper">

                <table class="restaurant-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Table
                            </th>

                            <th>
                                Capacity
                            </th>

                            <th>
                                Location
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody id="tableDataBody">

                        <tr>

                            <td
                                colspan="6"
                                class="table-loading">

                                <i class="fa-solid fa-spinner fa-spin"></i>

                                Loading tables...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>


            <!-- FOOTER -->

            <div class="table-data-footer">

                <div
                    class="table-showing-text"
                    id="tableShowingText">

                    Showing 0 tables

                </div>


                <div class="table-pagination">

                    <button
                        type="button"
                        id="tableFirstPage">

                        First

                    </button>

                    <button
                        type="button"
                        id="tablePrevPage">

                        Prev

                    </button>

                    <button
                        type="button"
                        id="tableCurrentPage"
                        class="active">

                        1

                    </button>

                    <button
                        type="button"
                        id="tableNextPage">

                        Next

                    </button>

                    <button
                        type="button"
                        id="tableLastPage">

                        Last

                    </button>

                </div>

            </div>

        </section>


        <!-- =================================================
             FOOTER
        ================================================== -->

        <div class="table-footer">

            <span>

                © 2026
                <strong>Sankalp</strong>
                Restaurant Management System

            </span>

            <span>
                Version 1.0.0
            </span>

        </div>

    </main>

</div>


<!-- =====================================================
     ADD / EDIT PANEL
====================================================== -->

<div
    class="table-panel-overlay"
    id="tablePanelOverlay">

    <section class="table-form-panel">


        <!-- HEADER -->

        <div class="table-form-header">

            <h2 id="tableFormTitle">
                Add New Table
            </h2>

            <button
                type="button"
                id="closeTableForm">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <!-- FORM -->

        <form id="tableForm">


            <input
                type="hidden"
                id="tableId">


            <!-- TABLE NUMBER -->

            <div class="table-form-group">

                <label for="tableNumber">

                    Table Number

                    <span>*</span>

                </label>

                <input
                    type="text"
                    id="tableNumber"
                    placeholder="Enter table number"
                    maxlength="20"
                    required>

            </div>


            <!-- CAPACITY -->

            <div class="table-form-group">

                <label for="tableCapacity">

                    Capacity

                    <span>*</span>

                </label>

                <input
                    type="number"
                    id="tableCapacity"
                    min="1"
                    max="50"
                    placeholder="Enter seating capacity"
                    required>

            </div>


            <!-- LOCATION -->

            <div class="table-form-group">

                <label for="tableLocation">

                    Location

                </label>

                <input
                    type="text"
                    id="tableLocation"
                    maxlength="100"
                    placeholder="e.g. Ground Floor, Window Side">

            </div>


            <!-- STATUS -->

            <div class="table-form-group">

                <label for="tableStatus">

                    Status

                    <span>*</span>

                </label>

                <div class="table-select-wrapper">

                    <select id="tableStatus">

                        <option value="AVAILABLE">
                            AVAILABLE
                        </option>

                        <option value="OCCUPIED">
                            OCCUPIED
                        </option>

                        <option value="RESERVED">
                            RESERVED
                        </option>

                        <option value="MAINTENANCE">
                            MAINTENANCE
                        </option>

                        <option value="INACTIVE">
                            INACTIVE
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>

            </div>


            <!-- ACTIONS -->

            <div class="table-form-actions">

                <button
                    type="button"
                    class="btn-table-cancel"
                    id="cancelTableForm">

                    Cancel

                </button>


                <button
                    type="submit"
                    class="btn-table-save"
                    id="saveTableBtn">

                    <i class="fa-solid fa-check"></i>

                    Save Table

                </button>

            </div>

        </form>

    </section>

</div>


<!-- =====================================================
     DELETE MODAL
====================================================== -->

<div
    class="table-delete-overlay"
    id="tableDeleteOverlay">

    <div class="table-delete-modal">

        <div class="table-delete-icon">

            <i class="fa-solid fa-trash"></i>

        </div>

        <h3>
            Delete Table?
        </h3>

        <p>
            Are you sure you want to delete this table?
            This action cannot be undone.
        </p>

        <div class="table-delete-actions">

            <button
                type="button"
                id="cancelTableDelete">

                Cancel

            </button>

            <button
                type="button"
                id="confirmTableDelete">

                Delete

            </button>

        </div>

    </div>

</div>


<!-- =====================================================
     TOAST
====================================================== -->

<div
    class="table-toast"
    id="tableToast">

    <i class="fa-solid fa-circle-check"></i>

    <span id="tableToastText">
        Success
    </span>

</div>


<!-- =====================================================
     COMMON JS
====================================================== -->

<script
    src="${pageContext.request.contextPath}/js/common.js">
</script>


<!-- =====================================================
     TABLE JS
====================================================== -->

<script
    src="${pageContext.request.contextPath}/js/table.js">
</script>

</body>

</html>