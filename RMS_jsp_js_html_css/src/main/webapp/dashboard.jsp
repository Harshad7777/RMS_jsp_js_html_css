<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<link rel="stylesheet" href="css/dashboard.css">

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

    <%@ include file="includes/navbar.jsp"%>

    <div class="container-fluid py-4">

        <div class="d-flex justify-content-between align-items-center mb-4">

            <h2 class="fw-bold">

                <i class="fa-solid fa-gauge-high text-primary"></i>

                Dashboard

            </h2>

            <span class="badge bg-success fs-6">

                Welcome Admin

            </span>

        </div>

        <!-- Dashboard Cards -->

        <div class="row g-4">

            <div class="col-xl-3 col-lg-6 col-md-6">

                <div class="card dashboard-card bg-primary">

                    <div class="card-body">

                        <div>

                            <h6>Total Categories</h6>

                            <h2 id="totalCategories">0</h2>

                        </div>

                        <i class="fa-solid fa-list dashboard-icon"></i>

                    </div>

                </div>

            </div>

            <div class="col-xl-3 col-lg-6 col-md-6">

                <div class="card dashboard-card bg-success">

                    <div class="card-body">

                        <div>

                            <h6>Total Menu</h6>

                            <h2 id="totalMenu">0</h2>

                        </div>

                        <i class="fa-solid fa-utensils dashboard-icon"></i>

                    </div>

                </div>

            </div>

            <div class="col-xl-3 col-lg-6 col-md-6">

                <div class="card dashboard-card bg-warning">

                    <div class="card-body">

                        <div>

                            <h6>Total Customers</h6>

                            <h2 id="totalCustomers">0</h2>

                        </div>

                        <i class="fa-solid fa-users dashboard-icon"></i>

                    </div>

                </div>

            </div>

            <div class="col-xl-3 col-lg-6 col-md-6">

                <div class="card dashboard-card bg-danger">

                    <div class="card-body">

                        <div>

                            <h6>Total Orders</h6>

                            <h2 id="totalOrders">0</h2>

                        </div>

                        <i class="fa-solid fa-cart-shopping dashboard-icon"></i>

                    </div>

                </div>

            </div>

        </div>

        <!-- Summary -->

        <div class="row mt-4 g-4">

            <div class="col-lg-6">

                <div class="card shadow-sm">

                    <div class="card-body text-center">

                        <h5>Today's Sales</h5>

                        <h1 class="text-success">

                            ₹ <span id="todaySales">0</span>

                        </h1>

                    </div>

                </div>

            </div>

            <div class="col-lg-6">

                <div class="card shadow-sm">

                    <div class="card-body text-center">

                        <h5>Pending Orders</h5>

                        <h1 class="text-danger">

                            <span id="pendingOrders">0</span>

                        </h1>

                    </div>

                </div>

            </div>

        </div>

        <!-- Recent Orders -->

        <div class="card shadow-sm mt-4">

            <div class="card-header bg-dark text-white">

                <h5 class="mb-0">

                    <i class="fa-solid fa-clock-rotate-left"></i>

                    Recent Orders

                </h5>

            </div>

            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-hover table-bordered">

                        <thead class="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Status</th>

                            <th>Date</th>

                        </tr>

                        </thead>

                        <tbody id="recentOrders">

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>

<script src="js/auth.js"></script>

<script src="js/dashboard.js?v=2"></script>

<%@ include file="includes/footer.jsp"%>