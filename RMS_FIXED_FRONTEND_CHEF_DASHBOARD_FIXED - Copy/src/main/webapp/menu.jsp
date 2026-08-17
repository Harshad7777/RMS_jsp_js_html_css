<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Menu Management | Sankalp RMS</title>


    <!-- =====================================================
         APPLICATION CONTEXT
    ====================================================== -->

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
         MENU CSS
    ====================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/menu.css">

</head>


<body>


<!-- =========================================================
     SIDEBAR
========================================================= -->

<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">


    <!-- =====================================================
         HEADER
    ====================================================== -->

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
                Menu Management
            </h1>

        </div>


        <!-- GLOBAL SEARCH -->

        <div class="header-search">

            <input
                type="text"
                id="globalSearch"
                placeholder="Search here..."
                autocomplete="off">

            <i class="fa-solid fa-magnifying-glass"></i>

        </div>


        <!-- HEADER RIGHT -->

        <div class="header-right">


            <!-- DATE -->

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


            <!-- NOTIFICATION -->

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


            <!-- PROFILE -->

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
         MENU PAGE
    ====================================================== -->

    <main class="menu-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Menu Management
                </h1>


                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Menu Management
                    </span>

                </div>

            </div>


            <!-- ADD NEW BUTTON -->

            <button
                type="button"
                class="btn-add-menu"
                id="openAddBtn">

                <i class="fa-solid fa-plus"></i>

                Add New Item

            </button>

        </div>


        <!-- =================================================
             MENU LAYOUT
        ================================================== -->

        <div class="menu-layout"
             id="menuLayout">


            <!-- =================================================
                 MENU TABLE CARD
            ================================================== -->

            <section class="menu-card">


                <!-- TOOLBAR -->

                <div class="menu-toolbar">


                    <!-- SEARCH -->

                    <div class="menu-search-box">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <input
                            type="text"
                            id="searchMenu"
                            placeholder="Search menu items..."
                            autocomplete="off">

                    </div>


                    <!-- CATEGORY FILTER -->

                    <div class="menu-filter">

                        <select id="categoryFilter">

                            <option value="ALL">
                                All Categories
                            </option>

                        </select>

                        <i class="fa-solid fa-chevron-down"></i>

                    </div>


                    <!-- STATUS FILTER -->

                    <div class="menu-filter">

                        <select id="statusFilter">

                            <option value="ALL">
                                All Status
                            </option>

                            <option value="AVAILABLE">
                                Available
                            </option>

                            <option value="UNAVAILABLE">
                                Unavailable
                            </option>

                        </select>

                        <i class="fa-solid fa-chevron-down"></i>

                    </div>

                </div>


                <!-- =================================================
                     TABLE
                ================================================== -->

                <div class="menu-table-container">

                    <table class="menu-table">

                        <thead>

                            <tr>

                                <th class="menu-id-column">
                                    ID
                                </th>

                                <th class="image-column">
                                    Image
                                </th>

                                <th>
                                    Item Name
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Status
                                </th>

                                <th class="actions-column">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody id="menuTable">

                            <tr>

                                <td
                                    colspan="7"
                                    class="loading-row">

                                    <i class="fa-solid fa-spinner fa-spin"></i>

                                    Loading menu items...

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- =================================================
                     PAGINATION
                ================================================== -->

                <div class="menu-table-footer">

                    <div
                        class="showing-text"
                        id="showingText">

                        Showing 0 items

                    </div>


                    <div class="pagination">

                        <button
                            type="button"
                            id="firstPage">

                            First

                        </button>


                        <button
                            type="button"
                            id="prevPage">

                            Prev

                        </button>


                        <button
                            type="button"
                            class="page-number active"
                            id="currentPage">

                            1

                        </button>


                        <button
                            type="button"
                            id="nextPage">

                            Next

                        </button>


                        <button
                            type="button"
                            id="lastPage">

                            Last

                        </button>

                    </div>

                </div>

            </section>


            <!-- =================================================
                 ADD / EDIT FORM
            ================================================== -->

            <section
                class="menu-form-card"
                id="menuFormPanel"
                aria-hidden="true">


                <!-- FORM HEADER -->

                <div class="menu-form-header">

                    <h2 id="formTitle">
                        Add New Menu Item
                    </h2>


                    <button
                        type="button"
                        class="close-menu-form"
                        id="closeFormBtn"
                        aria-label="Close">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>


                <!-- FORM -->

                <form id="menuForm">


                    <!-- HIDDEN ID -->

                    <input
                        type="hidden"
                        id="itemId"
                        name="itemId">


                    <!-- ITEM NAME -->

                    <div class="menu-form-group">

                        <label for="itemName">

                            Item Name

                            <span>*</span>

                        </label>


                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            placeholder="Enter item name"
                            maxlength="100"
                            autocomplete="off"
                            required>

                    </div>


                    <!-- CATEGORY -->

                    <div class="menu-form-group">

                        <label for="categoryId">

                            Category

                            <span>*</span>

                        </label>


                        <div class="menu-select-wrapper">

                            <select
                                id="categoryId"
                                name="categoryId"
                                required>

                                <option value="">
                                    Select category
                                </option>

                            </select>

                            <i class="fa-solid fa-chevron-down"></i>

                        </div>

                    </div>


                    <!-- PRICE -->

                    <div class="menu-form-group">

                        <label for="price">

                            Price (₹)

                            <span>*</span>

                        </label>


                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            min="0"
                            step="0.01"
                            required>

                    </div>


                    <!-- DESCRIPTION -->

                    <div class="menu-form-group">

                        <label for="description">

                            Description

                        </label>


                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            maxlength="255"
                            placeholder="Enter description (optional)"></textarea>

                    </div>


                    <!-- IMAGE -->

                    <div class="menu-form-group">

                        <label>
                            Image
                        </label>


                        <div
                            class="image-upload"
                            id="imageUpload">


                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/png,image/jpeg,image/jpg"
                                hidden>


                            <div
                                class="upload-content"
                                id="uploadContent">

                                <i class="fa-solid fa-cloud-arrow-up"></i>

                                <strong>
                                    Click to upload image
                                </strong>

                                <span>
                                    PNG, JPG up to 2MB
                                </span>

                            </div>


                            <img
                                id="imagePreview"
                                class="image-preview"
                                src=""
                                alt="Image Preview">

                        </div>

                    </div>


                    <!-- STATUS -->

                    <div class="menu-form-group">

                        <label for="status">

                            Status

                            <span>*</span>

                        </label>


                        <div class="menu-select-wrapper">

                            <select
                                id="status"
                                name="status">

                                <option value="AVAILABLE">
                                    AVAILABLE
                                </option>

                                <option value="UNAVAILABLE">
                                    UNAVAILABLE
                                </option>

                            </select>


                            <i class="fa-solid fa-chevron-down"></i>

                        </div>

                    </div>


                    <!-- FORM ACTIONS -->

                    <div class="menu-form-actions">

                        <button
                            type="button"
                            class="btn-menu-cancel"
                            id="cancelBtn">

                            Cancel

                        </button>


                        <button
                            type="submit"
                            class="btn-menu-save"
                            id="saveMenuBtn">

                            <i class="fa-solid fa-check"></i>

                            <span id="saveButtonText">
                                Save Item
                            </span>

                        </button>

                    </div>

                </form>

            </section>

        </div>


        <!-- =================================================
             FOOTER
        ================================================== -->

        <div class="menu-footer">

            <span>

                © 2026

                <strong>
                    Sankalp
                </strong>

                Restaurant Management System

            </span>


            <span>
                Version 1.0.0
            </span>

        </div>

    </main>

</div>


<!-- =====================================================
     DELETE MODAL
====================================================== -->

<div
    class="menu-delete-modal"
    id="deleteModal">

    <div class="menu-delete-box">

        <div class="menu-delete-icon">

            <i class="fa-solid fa-trash"></i>

        </div>


        <h3>
            Delete Menu Item?
        </h3>


        <p>
            Are you sure you want to delete this menu item?
            This action cannot be undone.
        </p>


        <div class="menu-delete-actions">

            <button
                type="button"
                class="menu-delete-cancel"
                id="deleteCancelBtn">

                Cancel

            </button>


            <button
                type="button"
                class="menu-delete-confirm"
                id="deleteConfirmBtn">

                Delete

            </button>

        </div>

    </div>

</div>


<!-- =====================================================
     TOAST
====================================================== -->

<div
    id="toast"
    class="menu-toast">

    <i class="fa-solid fa-circle-check"></i>

    <span id="toastText">
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
     MENU JS
====================================================== -->

<script
    src="${pageContext.request.contextPath}/js/menu.js">
</script>


</body>

</html>