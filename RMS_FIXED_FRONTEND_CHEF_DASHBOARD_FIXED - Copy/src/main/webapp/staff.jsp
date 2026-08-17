<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();
%>

<%@ include file="includes/header.jsp" %>

<link
    rel="stylesheet"
    href="<%= contextPath %>/css/staff.css">

<body>

<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">

    <div class="container-fluid staff-page">

        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->

        <div class="staff-page-header">

            <div>

                <h2>
                    <i class="fa-solid fa-user-group"></i>
                    Team Management
                </h2>

                <p>
                    Manage restaurant staff members and kitchen chefs
                </p>

            </div>


            <button
                type="button"
                class="btn btn-primary"
                id="addStaffBtn">

                <i class="fa-solid fa-user-plus"></i>

                Add Staff / Chef

            </button>

        </div>


        <!-- =====================================================
             STATISTICS
        ====================================================== -->

        <div class="staff-stat-row">

            <!-- TOTAL -->

            <div>

                <div class="staff-stat-card total">

                    <div class="staff-stat-icon">

                        <i class="fa-solid fa-users"></i>

                    </div>

                    <div>

                        <span>
                            Total Team
                        </span>

                        <strong id="totalStaff">
                            0
                        </strong>

                    </div>

                </div>

            </div>


            <!-- ACTIVE -->

            <div>

                <div class="staff-stat-card active">

                    <div class="staff-stat-icon">

                        <i class="fa-solid fa-user-check"></i>

                    </div>

                    <div>

                        <span>
                            Active Members
                        </span>

                        <strong id="activeStaff">
                            0
                        </strong>

                    </div>

                </div>

            </div>


            <!-- INACTIVE -->

            <div>

                <div class="staff-stat-card inactive">

                    <div class="staff-stat-icon">

                        <i class="fa-solid fa-user-xmark"></i>

                    </div>

                    <div>

                        <span>
                            Inactive Members
                        </span>

                        <strong id="inactiveStaff">
                            0
                        </strong>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             TEAM LIST
        ====================================================== -->

        <div class="card staff-list-card">

            <div class="card-header">

                <div>

                    <h5>
                        <i class="fa-solid fa-users"></i>
                        Staff / Chef List
                    </h5>

                </div>

                <span
                    class="badge"
                    id="staffCount">

                    0 Members

                </span>

            </div>


            <div class="card-body">

                <!-- SEARCH -->

                <div class="staff-search-box">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="staffSearch"
                        class="form-control"
                        placeholder="Search by name, username, mobile, email or role..."
                        autocomplete="off">

                </div>


                <!-- TABLE -->

                <div class="table-responsive">

                    <table class="staff-table">

                        <thead>

                            <tr>

                                <th class="text-center">
                                    ID
                                </th>

                                <th>
                                    Staff / Chef
                                </th>

                                <th>
                                    Username
                                </th>

                                <th>
                                    Mobile
                                </th>

                                <th>
                                    Email
                                </th>

                                <th class="text-center">
                                    Role
                                </th>

                                <th class="text-center">
                                    Status
                                </th>

                                <th class="text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody id="staffTable">

                            <tr>

                                <td
                                    colspan="8"
                                    class="loading-cell">

                                    <i
                                        class="fa-solid fa-spinner fa-spin">
                                    </i>

                                    Loading staff and chefs...

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     ADD / EDIT STAFF-CHEF MODAL
========================================================= -->

<div
    class="modal fade"
    id="staffModal"
    tabindex="-1"
    aria-labelledby="staffModalTitle"
    aria-hidden="true">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <!-- HEADER -->

            <div class="modal-header">

                <div>

                    <h5
                        class="modal-title"
                        id="staffModalTitle">

                        Add Staff / Chef

                    </h5>

                    <small>
                        Team account details
                    </small>

                </div>


                <button
                    type="button"
                    class="btn-close btn-close-white"
                    id="closeStaffModalBtn"
                    aria-label="Close">
                </button>

            </div>


            <!-- BODY -->

            <div class="modal-body">

                <input
                    type="hidden"
                    id="staffUserId">


                <!-- ROW 1 -->

                <div class="row">

                    <!-- FULL NAME -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffFullName"
                            class="form-label">

                            Full Name
                            <span>*</span>

                        </label>

                        <input
                            type="text"
                            id="staffFullName"
                            class="form-control"
                            maxlength="100"
                            autocomplete="off"
                            placeholder="Enter full name">

                    </div>


                    <!-- USERNAME -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffUsername"
                            class="form-label">

                            Username
                            <span>*</span>

                        </label>

                        <input
                            type="text"
                            id="staffUsername"
                            class="form-control"
                            maxlength="50"
                            autocomplete="off"
                            placeholder="Enter username">

                    </div>

                </div>


                <!-- ROW 2 -->

                <div class="row">

                    <!-- PASSWORD -->

                    <div
                        class="col-md-6 mb-3"
                        id="staffPasswordGroup">

                        <label
                            for="staffPassword"
                            class="form-label">

                            Password
                            <span>*</span>

                        </label>

                        <input
                            type="password"
                            id="staffPassword"
                            class="form-control"
                            autocomplete="new-password"
                            placeholder="Enter password">

                        <small class="form-help">
                            Minimum 6 characters
                        </small>

                    </div>


                    <!-- MOBILE -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffMobile"
                            class="form-label">

                            Mobile

                        </label>

                        <input
                            type="text"
                            id="staffMobile"
                            class="form-control"
                            maxlength="15"
                            autocomplete="off"
                            placeholder="Enter mobile number">

                    </div>

                </div>


                <!-- ROW 3 -->

                <div class="row">

                    <!-- EMAIL -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffEmail"
                            class="form-label">

                            Email

                        </label>

                        <input
                            type="email"
                            id="staffEmail"
                            class="form-control"
                            maxlength="100"
                            autocomplete="off"
                            placeholder="Enter email">

                    </div>


                    <!-- ROLE -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffRole"
                            class="form-label">

                            Role
                            <span>*</span>

                        </label>

                        <select
                            id="staffRole"
                            class="form-select">

                            <option value="STAFF">
                                STAFF
                            </option>

                            <option value="CHEF">
                                CHEF
                            </option>

                        </select>

                    </div>

                </div>


                <!-- ROW 4 -->

                <div class="row">

                    <!-- STATUS -->

                    <div class="col-md-6 mb-3">

                        <label
                            for="staffStatus"
                            class="form-label">

                            Status

                        </label>

                        <select
                            id="staffStatus"
                            class="form-select">

                            <option value="ACTIVE">
                                ACTIVE
                            </option>

                            <option value="INACTIVE">
                                INACTIVE
                            </option>

                        </select>

                    </div>

                </div>


                <!-- INFO -->

                <div class="staff-role-info">

                    <i class="fa-solid fa-circle-info"></i>

                    You can create either

                    <strong>STAFF</strong>

                    or

                    <strong>CHEF</strong>

                    accounts.

                </div>

            </div>


            <!-- FOOTER -->

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    id="cancelStaffModalBtn">

                    Cancel

                </button>


                <button
                    type="button"
                    class="btn btn-save"
                    id="saveStaffBtn">

                    <i class="fa-solid fa-floppy-disk"></i>

                    Save

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     CHANGE PASSWORD MODAL
========================================================= -->

<div
    class="modal fade"
    id="staffPasswordModal"
    tabindex="-1"
    aria-labelledby="staffPasswordModalTitle"
    aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5
                    class="modal-title"
                    id="staffPasswordModalTitle">

                    <i class="fa-solid fa-key"></i>

                    Change Password

                </h5>


                <button
                    type="button"
                    class="btn-close btn-close-white"
                    id="closePasswordModalBtn"
                    aria-label="Close">
                </button>

            </div>


            <div class="modal-body">

                <label
                    for="newStaffPassword"
                    class="form-label">

                    New Password
                    <span>*</span>

                </label>

                <input
                    type="password"
                    id="newStaffPassword"
                    class="form-control"
                    autocomplete="new-password"
                    placeholder="Enter new password">

                <small class="form-help">
                    Minimum 6 characters
                </small>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    id="cancelPasswordModalBtn">

                    Cancel

                </button>


                <button
                    type="button"
                    class="btn btn-save"
                    id="updateStaffPasswordBtn">

                    <i class="fa-solid fa-key"></i>

                    Update Password

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     JAVASCRIPT
========================================================= -->

<script
    src="<%= contextPath %>/js/auth.js">
</script>

<script
    src="<%= contextPath %>/js/staff.js">
</script>


<%@ include file="includes/footer.jsp" %>