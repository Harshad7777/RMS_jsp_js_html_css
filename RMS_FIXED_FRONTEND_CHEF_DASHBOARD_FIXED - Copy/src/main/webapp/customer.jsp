<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();
%>

<meta
    name="app-context"
    content="<%= contextPath %>">

<%@ include file="includes/header.jsp" %>

<link
    rel="stylesheet"
    href="<%= contextPath %>/css/customer.css">


<body>

<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">

    <main class="customer-page">


        <!-- =====================================================
             HEADER
        ====================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Customers
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Customers
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="btn-add-customer"
                id="openAddBtn">

                <i class="fa-solid fa-plus"></i>

                Add Customer

            </button>

        </div>


        <!-- =====================================================
             CUSTOMER LAYOUT

             CLOSED = FULL WIDTH

             OPEN = TABLE + FORM
        ====================================================== -->

        <div
            class="customer-layout"
            id="customerLayout">


            <!-- =================================================
                 CUSTOMER TABLE
            ================================================== -->

            <section class="customer-card">


                <!-- TOOLBAR -->

                <div class="customer-toolbar">


                    <div class="customer-search-box">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <input
                            type="text"
                            id="searchCustomer"
                            placeholder="Search customers..."
                            autocomplete="off">

                    </div>


                    <div class="customer-status-filter">

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

                <div class="customer-table-container">

                    <table class="customer-table">

                        <thead>

                            <tr>

                                <th class="customer-id-column">
                                    ID
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Phone
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Total Orders
                                </th>

                                <th>
                                    Total Spent
                                </th>

                                <th>
                                    Status
                                </th>

                                <th class="customer-actions-column">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody id="customerTable">

                            <tr>

                                <td
                                    colspan="8"
                                    class="loading-row">

                                    <i
                                        class="fa-solid fa-spinner fa-spin">
                                    </i>

                                    Loading customers...

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- FOOTER -->

                <div class="customer-table-footer">

                    <div
                        class="showing-text"
                        id="showingText">

                        Showing 0 customers

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
                 ADD / EDIT CUSTOMER FORM
            ================================================== -->

            <section
                class="customer-form-card"
                id="customerFormPanel"
                aria-hidden="true">


                <!-- HEADER -->

                <div class="customer-form-header">

                    <h2 id="formTitle">
                        Add New Customer
                    </h2>


                    <button
                        type="button"
                        class="close-customer-form"
                        id="closeFormBtn"
                        aria-label="Close">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>


                <!-- FORM -->

                <form id="customerForm">


                    <input
                        type="hidden"
                        id="customerId"
                        name="customerId">


                    <!-- FULL NAME -->

                    <div class="customer-form-group">

                        <label for="fullName">

                            Full Name

                            <span>*</span>

                        </label>

                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter full name"
                            autocomplete="off"
                            maxlength="100"
                            required>

                    </div>


                    <!-- PHONE -->

                    <div class="customer-form-group">

                        <label for="mobile">

                            Phone Number

                            <span>*</span>

                        </label>

                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter phone number"
                            maxlength="15"
                            autocomplete="off"
                            required>

                    </div>


                    <!-- EMAIL -->

                    <div class="customer-form-group">

                        <label for="email">

                            Email

                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address (optional)"
                            autocomplete="off"
                            maxlength="100">

                    </div>


                    <!-- ADDRESS -->

                    <div class="customer-form-group">

                        <label for="address">

                            Address

                        </label>

                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter address (optional)"
                            rows="4"
                            maxlength="255"></textarea>

                    </div>


                    <!-- STATUS -->

                    <div class="customer-form-group">

                        <label for="status">

                            Status

                            <span>*</span>

                        </label>


                        <div class="customer-select-wrapper">

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

                            <i
                                class="fa-solid fa-chevron-down">
                            </i>

                        </div>

                    </div>


                    <!-- BUTTONS -->

                    <div class="customer-form-actions">


                        <button
                            type="button"
                            class="btn-customer-cancel"
                            id="cancelBtn">

                            Cancel

                        </button>


                        <button
                            type="submit"
                            class="btn-customer-save"
                            id="saveBtn">

                            <i class="fa-solid fa-check"></i>

                            Save Customer

                        </button>


                        <button
                            type="button"
                            class="btn-customer-save"
                            id="updateBtn"
                            style="display:none;">

                            <i class="fa-solid fa-check"></i>

                            Update Customer

                        </button>

                    </div>

                </form>

            </section>

        </div>


        <!-- =====================================================
             DELETE MODAL
        ====================================================== -->

        <div
            class="customer-delete-modal"
            id="deleteModal">

            <div class="customer-delete-box">

                <div class="customer-delete-icon">

                    <i class="fa-solid fa-trash"></i>

                </div>


                <h3>
                    Delete Customer?
                </h3>


                <p>

                    Are you sure you want to delete this customer?

                    This action cannot be undone.

                </p>


                <div class="customer-delete-actions">

                    <button
                        type="button"
                        id="deleteCancelBtn"
                        class="customer-delete-cancel">

                        Cancel

                    </button>


                    <button
                        type="button"
                        id="deleteConfirmBtn"
                        class="customer-delete-confirm">

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
            class="customer-toast">

            <i class="fa-solid fa-circle-check"></i>

            <span id="toastText">
                Success
            </span>

        </div>


        <!-- =====================================================
             FOOTER
        ====================================================== -->

        <div class="customer-footer">

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
     CUSTOMER JS
========================================================= -->

<script
    src="<%= contextPath %>/js/customer.js">
</script>


<%@ include file="includes/footer.jsp" %>