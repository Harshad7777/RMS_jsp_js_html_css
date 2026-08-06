<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

<%@ include file="includes/navbar.jsp"%>

<div class="container-fluid py-4">

    <!-- Page Heading -->
    <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">

        <h2 class="mb-3 mb-md-0">
            <i class="fa-solid fa-users text-primary"></i>
            Customer Management
        </h2>

    </div>

    <!-- Customer Form -->
    <div class="card shadow border-0 mb-4">

        <div class="card-header bg-primary text-white">

            <h5 class="mb-0">
                <i class="fa fa-user-plus"></i>
                Customer Details
            </h5>

        </div>

        <div class="card-body">

            <input type="hidden" id="customerId">

            <div class="row g-3">

                <div class="col-lg-4 col-md-6">

                    <label class="form-label">Customer Name</label>

                    <input type="text"
                           id="customerName"
                           class="form-control"
                           placeholder="Enter Customer Name">

                </div>

                <div class="col-lg-4 col-md-6">

                    <label class="form-label">Mobile</label>

                    <input type="text"
                           id="mobile"
                           class="form-control"
                           placeholder="Enter Mobile">

                </div>

                <div class="col-lg-4 col-md-6">

                    <label class="form-label">Email</label>

                    <input type="email"
                           id="email"
                           class="form-control"
                           placeholder="Enter Email">

                </div>

                <div class="col-lg-8">

                    <label class="form-label">Address</label>

                    <textarea id="address"
                              class="form-control"
                              rows="3"
                              placeholder="Enter Address"></textarea>

                </div>

                <div class="col-lg-4">

                    <label class="form-label">Status</label>

                    <select id="status" class="form-select">

                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>

                    </select>

                </div>

            </div>

            <div class="mt-4 d-flex flex-wrap gap-2">

                <button class="btn btn-success"
                        onclick="saveCustomer()">

                    <i class="fa fa-save"></i>
                    Save

                </button>

                <button class="btn btn-warning text-white"
                        onclick="updateCustomer()">

                    <i class="fa fa-edit"></i>
                    Update

                </button>

                <button class="btn btn-secondary"
                        onclick="clearForm()">

                    <i class="fa fa-refresh"></i>
                    Clear

                </button>

            </div>

        </div>

    </div>

    <!-- Customer List -->
    <div class="card shadow border-0">

        <div class="card-header bg-dark text-white">

            <div class="row align-items-center">

                <div class="col-md-6">

                    <h5 class="mb-0">

                        <i class="fa fa-list"></i>

                        Customer List

                    </h5>

                </div>

                <div class="col-md-6 mt-3 mt-md-0">

                    <input type="text"
                           id="searchCustomer"
                           class="form-control"
                           placeholder="Search Customer..."
                           onkeyup="searchCustomer()">

                </div>

            </div>

        </div>

        <div class="card-body p-0">

            <div class="table-responsive">

                <table class="table table-hover table-striped align-middle mb-0">

                    <thead class="table-primary">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th width="130">Action</th>

                    </tr>

                    </thead>

                    <tbody id="customerTable">

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

</div>

<script src="js/auth.js"></script>
<script src="js/customer.js"></script>

<%@ include file="includes/footer.jsp"%>