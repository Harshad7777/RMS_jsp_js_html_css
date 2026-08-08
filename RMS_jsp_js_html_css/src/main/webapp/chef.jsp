<%@ page language="java"
         contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp"%>

<%@ include file="includes/sidebar.jsp"%>

<%@ include file="includes/navbar.jsp"%>


<!-- ===================================================== -->
<!-- CHEF DASHBOARD -->
<!-- ===================================================== -->

<div class="container-fluid py-4">

    <!-- HEADER -->

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 class="fw-bold">

                <i class="fa-solid fa-utensils text-primary"></i>

                Kitchen Dashboard

            </h2>

            <p class="text-muted mb-0">
                Manage and prepare restaurant orders
            </p>

        </div>

        <button
            class="btn btn-primary"
            onclick="loadKitchenOrders()">

            <i class="fa-solid fa-rotate"></i>

            Refresh

        </button>

    </div>


    <!-- ================================================= -->
    <!-- STATISTICS -->
    <!-- ================================================= -->

    <div class="row g-3 mb-4">

        <!-- NEW -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h6 class="text-muted">
                                New Orders
                            </h6>

                            <h2
                                id="newCount"
                                class="fw-bold text-warning">

                                0

                            </h2>

                        </div>

                        <i
                            class="fa-solid fa-bell fa-2x text-warning">
                        </i>

                    </div>

                </div>

            </div>

        </div>


        <!-- ACCEPTED -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h6 class="text-muted">
                                Accepted
                            </h6>

                            <h2
                                id="acceptedCount"
                                class="fw-bold text-info">

                                0

                            </h2>

                        </div>

                        <i
                            class="fa-solid fa-check fa-2x text-info">
                        </i>

                    </div>

                </div>

            </div>

        </div>


        <!-- PREPARING -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h6 class="text-muted">
                                Preparing
                            </h6>

                            <h2
                                id="preparingCount"
                                class="fw-bold text-danger">

                                0

                            </h2>

                        </div>

                        <i
                            class="fa-solid fa-fire fa-2x text-danger">
                        </i>

                    </div>

                </div>

            </div>

        </div>


        <!-- READY -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <div>

                            <h6 class="text-muted">
                                Ready
                            </h6>

                            <h2
                                id="readyCount"
                                class="fw-bold text-success">

                                0

                            </h2>

                        </div>

                        <i
                            class="fa-solid fa-circle-check fa-2x text-success">
                        </i>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- ================================================= -->
    <!-- FILTER -->
    <!-- ================================================= -->

    <div class="card shadow-sm mb-4">

        <div class="card-body">

            <div class="row">

                <div class="col-md-4">

                    <label class="form-label">
                        Kitchen Status
                    </label>

                    <select
                        id="statusFilter"
                        class="form-select"
                        onchange="filterOrders()">

                        <option value="ALL">
                            All Orders
                        </option>

                        <option value="NEW">
                            New
                        </option>

                        <option value="ACCEPTED">
                            Accepted
                        </option>

                        <option value="PREPARING">
                            Preparing
                        </option>

                        <option value="READY">
                            Ready
                        </option>

                    </select>

                </div>

            </div>

        </div>

    </div>


    <!-- ================================================= -->
    <!-- KITCHEN ORDERS -->
    <!-- ================================================= -->

    <div
        class="row g-4"
        id="kitchenOrders">

    </div>

</div>


<!-- ===================================================== -->
<!-- FOOTER -->
<!-- ===================================================== -->

<%@ include file="includes/footer.jsp"%>
