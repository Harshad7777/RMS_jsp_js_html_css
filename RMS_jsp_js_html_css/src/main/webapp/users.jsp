<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp" %>

<link rel="stylesheet" href="css/users.css">

<body>

<%@ include file="includes/sidebar.jsp" %>

<div class="main-content">

    <%@ include file="includes/navbar.jsp" %>

    <div class="container-fluid mt-4">

        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->

        <div class="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h2 class="fw-bold mb-1">
                    <i class="fa-solid fa-user-shield text-primary"></i>
                    User Management
                </h2>

                <p class="text-muted mb-0">
                    Manage restaurant administrators, staff and chefs
                </p>
            </div>

            <button type="button"
                    class="btn btn-primary"
                    onclick="clearForm()">

                <i class="fa-solid fa-user-plus"></i>
                New User

            </button>

        </div>


        <!-- =====================================================
             USER FORM
        ====================================================== -->

        <div class="card shadow-sm border-0 mb-4">

            <div class="card-header bg-primary text-white">

                <h5 class="mb-0">

                    <i class="fa-solid fa-user-gear"></i>

                    User Details

                </h5>

            </div>


            <div class="card-body">

                <!-- Hidden User ID -->

                <input type="hidden" id="userId">


                <!-- =================================================
                     ROW 1
                ================================================== -->

                <div class="row">

                    <!-- FULL NAME -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="fullName"
                               class="form-label fw-semibold">

                            Full Name

                            <span class="text-danger">*</span>

                        </label>

                        <input type="text"
                               id="fullName"
                               class="form-control"
                               placeholder="Enter full name"
                               maxlength="100">

                    </div>


                    <!-- USERNAME -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="userName"
                               class="form-label fw-semibold">

                            Username

                            <span class="text-danger">*</span>

                        </label>

                        <input type="text"
                               id="userName"
                               class="form-control"
                               placeholder="Enter username"
                               maxlength="50">

                    </div>

                </div>


                <!-- =================================================
                     ROW 2
                ================================================== -->

                <div class="row">

                    <!-- PASSWORD -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="password"
                               class="form-label fw-semibold">

                            Password

                            <span class="text-danger"
                                  id="passwordRequired">*</span>

                        </label>

                        <input type="password"
                               id="password"
                               class="form-control"
                               placeholder="Enter password">

                        <small class="text-muted">

                            Leave blank while updating if you do not
                            want to change the password.

                        </small>

                    </div>


                    <!-- ROLE -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="userRole"
                               class="form-label fw-semibold">

                            Role

                            <span class="text-danger">*</span>

                        </label>

                        <select id="userRole"
                                class="form-select">

                            <option value="STAFF">
                                STAFF
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>

                            <option value="CHEF">
                                CHEF
                            </option>

                        </select>

                    </div>

                </div>


                <!-- =================================================
                     ROW 3
                ================================================== -->

                <div class="row">

                    <!-- MOBILE -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="mobile"
                               class="form-label fw-semibold">

                            Mobile

                        </label>

                        <input type="text"
                               id="mobile"
                               class="form-control"
                               placeholder="Enter mobile number"
                               maxlength="15">

                    </div>


                    <!-- EMAIL -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="email"
                               class="form-label fw-semibold">

                            Email

                        </label>

                        <input type="email"
                               id="email"
                               class="form-control"
                               placeholder="Enter email"
                               maxlength="100">

                    </div>

                </div>


                <!-- =================================================
                     ROW 4
                ================================================== -->

                <div class="row">

                    <!-- STATUS -->

                    <div class="col-lg-6 col-md-6 col-12 mb-3">

                        <label for="userStatus"
                               class="form-label fw-semibold">

                            Status

                        </label>

                        <select id="userStatus"
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


                <!-- =================================================
                     BUTTONS
                ================================================== -->

                <div class="row mt-2">

                    <div class="col-lg-3 col-md-6 col-12 mb-2">

                        <button type="button"
                                class="btn btn-success w-100"
                                onclick="saveUser()">

                            <i class="fa-solid fa-floppy-disk"></i>

                            Save User

                        </button>

                    </div>


                    <div class="col-lg-3 col-md-6 col-12 mb-2">

                        <button type="button"
                                class="btn btn-warning w-100"
                                onclick="updateUser()">

                            <i class="fa-solid fa-pen-to-square"></i>

                            Update User

                        </button>

                    </div>


                    <div class="col-lg-3 col-md-6 col-12 mb-2">

                        <button type="button"
                                class="btn btn-secondary w-100"
                                onclick="clearForm()">

                            <i class="fa-solid fa-eraser"></i>

                            Clear

                        </button>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             USERS TABLE
        ====================================================== -->

        <div class="card shadow-sm border-0">

            <div class="card-header bg-dark text-white
                        d-flex justify-content-between
                        align-items-center">

                <h5 class="mb-0">

                    <i class="fa-solid fa-users"></i>

                    All Users

                </h5>

                <span class="badge bg-primary"
                      id="userCount">

                    0 Users

                </span>

            </div>


            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-bordered
                                  table-hover
                                  align-middle mb-0">

                        <thead class="table-primary">

                            <tr>

                                <th class="text-center">
                                    ID
                                </th>

                                <th>
                                    Full Name
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
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody id="userTable">

                            <tr>

                                <td colspan="8"
                                    class="text-center py-5">

                                    <div class="spinner-border
                                                text-primary"
                                         role="status">

                                    </div>

                                    <div class="mt-2 text-muted">

                                        Loading users...

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>


<!-- =====================================================
     JAVASCRIPT
====================================================== -->

<script src="js/auth.js"></script>

<script src="js/users.js"></script>


<%@ include file="includes/footer.jsp" %>