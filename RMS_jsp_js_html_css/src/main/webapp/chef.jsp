<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp" %>
<%@ include file="includes/sidebar.jsp" %>
<%@ include file="includes/navbar.jsp" %>


<!-- =====================================================
     APPLICATION CONFIGURATION
===================================================== -->

<div id="appConfig"
     data-context-path="${pageContext.request.contextPath}">
</div>


<div class="container-fluid mt-4">


    <!-- =================================================
         HEADER
    ================================================= -->

    <div class="d-flex justify-content-between
                align-items-center mb-4">

        <div>

            <h4 class="mb-1">

                <i class="fa-solid fa-fire-burner"></i>

                Kitchen Dashboard

            </h4>

            <small class="text-muted">

                Manage incoming restaurant orders

            </small>

        </div>


        <div>

            <i class="fa-solid fa-user-chef"></i>

            <strong id="chefName">

                Chef

            </strong>

        </div>

    </div>



    <!-- =================================================
         STATISTICS
    ================================================= -->

    <div class="row g-4 mb-4">


        <!-- NEW -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="text-muted">
                        NEW
                    </div>

                    <div class="fs-2 fw-bold"
                         id="newCount">

                        0

                    </div>

                </div>

            </div>

        </div>



        <!-- ACCEPTED -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="text-muted">
                        ACCEPTED
                    </div>

                    <div class="fs-2 fw-bold"
                         id="acceptedCount">

                        0

                    </div>

                </div>

            </div>

        </div>



        <!-- PREPARING -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="text-muted">
                        PREPARING
                    </div>

                    <div class="fs-2 fw-bold"
                         id="preparingCount">

                        0

                    </div>

                </div>

            </div>

        </div>



        <!-- READY -->

        <div class="col-lg-3 col-md-6">

            <div class="card shadow-sm border-0">

                <div class="card-body">

                    <div class="text-muted">
                        READY
                    </div>

                    <div class="fs-2 fw-bold"
                         id="readyCount">

                        0

                    </div>

                </div>

            </div>

        </div>

    </div>



    <!-- =================================================
         ORDERS HEADER
    ================================================= -->

    <div class="d-flex justify-content-between
                align-items-center mb-3">

        <h4 class="mb-0">

            <i class="fa-solid fa-kitchen-set"></i>

            Kitchen Orders

        </h4>


        <button
            type="button"
            class="btn btn-outline-primary"
            onclick="loadDashboard()">

            <i class="fa-solid fa-rotate"></i>

            Refresh

        </button>

    </div>



    <!-- =================================================
         STATUS FILTER
    ================================================= -->

    <div class="mb-3">

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

            <option value="SERVED">
                Served
            </option>

        </select>

    </div>



    <!-- =================================================
         ORDERS
    ================================================= -->

    <div id="ordersContainer"
         class="row g-4">

        <div class="col-12">

            <div class="text-center py-5">

                <div class="spinner-border text-primary">
                </div>

                <div class="mt-2 text-muted">

                    Loading kitchen orders...

                </div>

            </div>

        </div>

    </div>


</div>


<!-- =====================================================
     CHEF JAVASCRIPT
===================================================== -->

<script src="${pageContext.request.contextPath}/js/chef.js"></script>


<%@ include file="includes/footer.jsp" %>