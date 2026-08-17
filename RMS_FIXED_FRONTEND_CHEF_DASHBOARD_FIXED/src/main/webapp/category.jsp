<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();
%>

<%@ include file="includes/header.jsp" %>

<link
    rel="stylesheet"
    href="<%= contextPath %>/css/category.css">


<body>

<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">

    <main class="category-page">


        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Category Management
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Categories
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="btn-add-category"
                id="openAddBtn">

                <i class="fa-solid fa-plus"></i>

                Add Category

            </button>

        </div>


        <!-- =====================================================
             CATEGORY LAYOUT

             CLOSED  = FULL WIDTH
             OPENED  = TABLE + FORM
        ====================================================== -->

        <div
            class="category-layout"
            id="categoryLayout">


            <!-- =================================================
                 CATEGORY TABLE
            ================================================== -->

            <section class="category-card">


                <!-- TOOLBAR -->

                <div class="category-toolbar">


                    <!-- SEARCH -->

                    <div class="search-box">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <input
                            type="text"
                            id="searchCategory"
                            placeholder="Search categories..."
                            autocomplete="off">

                    </div>


                    <!-- STATUS -->

                    <div class="status-filter">

                        <select id="statusFilter">

                            <option value="ALL">
                                All Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>

                        </select>

                        <i class="fa-solid fa-chevron-down"></i>

                    </div>

                </div>


                <!-- TABLE -->

                <div class="table-container">

                    <table class="category-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Category Name
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody id="categoryTable">

                            <tr>

                                <td
                                    colspan="5"
                                    class="loading-row">

                                    <i class="fa-solid fa-spinner fa-spin"></i>

                                    Loading categories...

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- TABLE FOOTER -->

                <div class="table-footer">

                    <div
                        class="showing-text"
                        id="showingText">

                        Showing 0 categories

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
                class="category-form-card"
                id="categoryFormPanel"
                aria-hidden="true">


                <!-- FORM HEADER -->

                <div class="form-header">

                    <h2 id="formTitle">
                        Add New Category
                    </h2>


                    <button
                        type="button"
                        class="close-form"
                        id="closeFormBtn"
                        aria-label="Close form">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>


                <!-- FORM -->

                <form id="categoryForm">


                    <!-- HIDDEN ID -->

                    <input
                        type="hidden"
                        id="categoryId"
                        name="categoryId">


                    <!-- CATEGORY NAME -->

                    <div class="form-group">

                        <label
                            for="categoryName">

                            Category Name

                            <span>*</span>

                        </label>

                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter category name"
                            maxlength="100"
                            autocomplete="off"
                            required>

                    </div>


                    <!-- DESCRIPTION -->

                    <div class="form-group">

                        <label
                            for="description">

                            Description

                        </label>

                        <textarea
                            id="description"
                            name="description"
                            maxlength="255"
                            placeholder="Enter description (optional)"
                            rows="4"></textarea>

                    </div>


                    <!-- STATUS -->

                    <div class="form-group">

                        <label
                            for="status">

                            Status

                            <span>*</span>

                        </label>


                        <div class="select-wrapper">

                            <select
                                id="status"
                                name="status">

                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="INACTIVE">
                                    INACTIVE
                                </option>

                            </select>

                            <i class="fa-solid fa-chevron-down"></i>

                        </div>

                    </div>


                    <!-- BUTTONS -->

                    <div class="form-actions">


                        <button
                            type="button"
                            class="btn-cancel"
                            id="cancelBtn">

                            Cancel

                        </button>


                        <!-- SAVE -->

                        <button
                            type="submit"
                            class="btn-save"
                            id="saveBtn">

                            <i class="fa-solid fa-check"></i>

                            Save Category

                        </button>


                        <!-- UPDATE -->

                        <button
                            type="button"
                            class="btn-save"
                            id="updateBtn"
                            style="display:none;">

                            <i class="fa-solid fa-check"></i>

                            Update Category

                        </button>

                    </div>

                </form>

            </section>

        </div>


        <!-- =====================================================
             FOOTER
        ====================================================== -->

        <div class="category-footer">

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


<!-- =========================================================
     DELETE MODAL
========================================================= -->

<div
    class="delete-modal-overlay"
    id="deleteModal"
    aria-hidden="true">


    <div class="delete-modal">


        <div class="delete-icon">

            <i class="fa-solid fa-trash"></i>

        </div>


        <h3>
            Delete Category?
        </h3>


        <p>

            Are you sure you want to delete this category?

            This action cannot be undone.

        </p>


        <div class="delete-actions">


            <button
                type="button"
                id="deleteCancelBtn"
                class="delete-cancel">

                Cancel

            </button>


            <button
                type="button"
                id="deleteConfirmBtn"
                class="delete-confirm">

                Delete

            </button>


        </div>

    </div>

</div>


<!-- =========================================================
     TOAST
========================================================= -->

<div
    id="toast"
    class="toast-message">

    <i
        id="toastIcon"
        class="fa-solid fa-circle-check">
    </i>

    <span id="toastText">
        Success
    </span>

</div>


<!-- =========================================================
     JAVASCRIPT
========================================================= -->

<script
    src="<%= contextPath %>/js/category.js">
</script>


<%@ include file="includes/footer.jsp" %>