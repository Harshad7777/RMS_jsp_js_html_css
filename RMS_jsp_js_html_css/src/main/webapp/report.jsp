<%@ page language="java"
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp" %>

<body>

<%@ include file="includes/sidebar.jsp" %>

<div class="main-content">

    <%@ include file="includes/navbar.jsp" %>

    <div class="container-fluid py-4">

        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->

        <div class="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h2 class="fw-bold mb-1">

                    <i class="fa-solid fa-chart-column text-success"></i>

                    Sales Report

                </h2>

                <p class="text-muted mb-0">

                    View paid bill sales, orders and top-selling menu items

                </p>

            </div>


            <div class="d-flex gap-2">

                <button type="button"
                        class="btn btn-outline-primary"
                        onclick="loadReport()">

                    <i class="fa-solid fa-rotate"></i>

                    Refresh

                </button>


                <button type="button"
                        class="btn btn-primary"
                        onclick="printReport()">

                    <i class="fa-solid fa-print"></i>

                    Print Report

                </button>

            </div>

        </div>


        <!-- =====================================================
             SUMMARY CARDS
        ====================================================== -->

        <div class="row g-3 mb-4">


            <!-- TOTAL SALES -->

            <div class="col-xl-3 col-md-6">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">

                            <div>

                                <p class="text-muted mb-1">

                                    Total Sales

                                </p>

                                <h3 class="fw-bold mb-0 text-success">

                                    ₹ <span id="totalSales">0.00</span>

                                </h3>

                            </div>


                            <div class="rounded-circle bg-success-subtle p-3">

                                <i class="fa-solid fa-indian-rupee-sign text-success fs-4"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <!-- TOTAL PAID ORDERS -->

            <div class="col-xl-3 col-md-6">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">

                            <div>

                                <p class="text-muted mb-1">

                                    Total Paid Orders

                                </p>

                                <h3 class="fw-bold mb-0">

                                    <span id="totalOrders">0</span>

                                </h3>

                            </div>


                            <div class="rounded-circle bg-primary-subtle p-3">

                                <i class="fa-solid fa-cart-shopping text-primary fs-4"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <!-- ACTIVE CUSTOMERS -->

            <div class="col-xl-3 col-md-6">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">

                            <div>

                                <p class="text-muted mb-1">

                                    Active Customers

                                </p>

                                <h3 class="fw-bold mb-0">

                                    <span id="totalCustomers">0</span>

                                </h3>

                            </div>


                            <div class="rounded-circle bg-warning-subtle p-3">

                                <i class="fa-solid fa-users text-warning fs-4"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <!-- REPORT DAYS -->

            <div class="col-xl-3 col-md-6">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">

                            <div>

                                <p class="text-muted mb-1">

                                    Report Days

                                </p>

                                <h3 class="fw-bold mb-0">

                                    <span id="reportDays">0</span>

                                </h3>

                            </div>


                            <div class="rounded-circle bg-info-subtle p-3">

                                <i class="fa-solid fa-calendar-days text-info fs-4"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             DATE WISE SALES
        ====================================================== -->

        <div class="card shadow-sm border-0 mb-4">

            <div class="card-header bg-success text-white
                        d-flex justify-content-between
                        align-items-center">

                <h5 class="mb-0">

                    <i class="fa-solid fa-chart-line"></i>

                    Date Wise Sales

                </h5>


                <span class="badge bg-light text-success">

                    Paid Bills Only

                </span>

            </div>


            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-striped
                                  table-hover
                                  table-bordered
                                  align-middle mb-0">

                        <thead class="table-primary">

                            <tr>

                                <th class="text-center">

                                    <i class="fa-solid fa-calendar-days"></i>

                                    Date

                                </th>


                                <th class="text-center">

                                    <i class="fa-solid fa-cart-shopping"></i>

                                    Total Orders

                                </th>


                                <th class="text-end">

                                    <i class="fa-solid fa-indian-rupee-sign"></i>

                                    Total Sales

                                </th>

                            </tr>

                        </thead>


                        <tbody id="reportTable">

                            <tr>

                                <td colspan="3"
                                    class="text-center py-5">

                                    <div class="spinner-border text-success"
                                         role="status">
                                    </div>

                                    <div class="mt-2 text-muted">

                                        Loading Sales Report...

                                    </div>

                                </td>

                            </tr>

                        </tbody>


                        <tfoot class="table-light">

                            <tr>

                                <th colspan="2"
                                    class="text-end">

                                    Total Sales:

                                </th>


                                <th class="text-end text-success">

                                    ₹ <span id="totalSalesFooter">

                                        0.00

                                    </span>

                                </th>

                            </tr>

                        </tfoot>

                    </table>

                </div>

            </div>


            <div class="card-footer">

                <strong>

                    Report Generated:

                </strong>

                <span id="generatedDate">

                    --

                </span>

            </div>

        </div>


        <!-- =====================================================
             TOP SELLING MENU ITEMS
        ====================================================== -->

        <div class="card shadow-sm border-0 mb-4">

            <div class="card-header bg-dark text-white
                        d-flex justify-content-between
                        align-items-center">

                <h5 class="mb-0">

                    <i class="fa-solid fa-ranking-star"></i>

                    Top Selling Menu Items

                </h5>


                <span class="badge bg-success">

                    Top 5

                </span>

            </div>


            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-bordered
                                  table-hover
                                  align-middle mb-0">

                        <thead class="table-primary">

                            <tr>

                                <th class="text-center"
                                    style="width:80px;">

                                    #

                                </th>


                                <th>

                                    Item Name

                                </th>


                                <th class="text-center">

                                    Quantity Sold

                                </th>


                                <th class="text-end">

                                    Sales

                                </th>

                            </tr>

                        </thead>


                        <tbody id="topMenuTable">

                            <tr>

                                <td colspan="4"
                                    class="text-center py-4">

                                    <div class="spinner-border text-primary"
                                         role="status">
                                    </div>

                                    <div class="mt-2 text-muted">

                                        Loading...

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>


        <!-- =====================================================
             REPORT SUMMARY
        ====================================================== -->

        <div class="card shadow-sm border-0">

            <div class="card-body">

                <div class="row text-center">


                    <div class="col-md-4">

                        <div class="text-muted">

                            Total Paid Sales

                        </div>

                        <h4 class="text-success fw-bold">

                            ₹ <span id="summarySales">

                                0.00

                            </span>

                        </h4>

                    </div>


                    <div class="col-md-4">

                        <div class="text-muted">

                            Total Paid Orders

                        </div>

                        <h4 class="text-primary fw-bold">

                            <span id="summaryOrders">

                                0

                            </span>

                        </h4>

                    </div>


                    <div class="col-md-4">

                        <div class="text-muted">

                            Active Customers

                        </div>

                        <h4 class="text-warning fw-bold">

                            <span id="summaryCustomers">

                                0

                            </span>

                        </h4>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div> </div>

<%@ include file="includes/footer.jsp" %>

<script src="<%= request.getContextPath() %>/js/report.js"></script>