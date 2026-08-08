<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp"%>
<%@ include file="includes/sidebar.jsp"%>
<%@ include file="includes/navbar.jsp"%>

<style>

/* =========================================================
   ORDER PAGE LAYOUT
   ========================================================= */

.order-page {
    margin-left: 272px;
    padding: 95px 25px 40px 25px;
    width: calc(100% - 272px);
    min-height: 100vh;
    background: #f5f7fb;
    box-sizing: border-box;
}

/* Prevent Bootstrap/container from causing overflow */
.order-page *,
.order-page *::before,
.order-page *::after {
    box-sizing: border-box;
}

/* =========================================================
   PAGE TITLE
   ========================================================= */

.order-page .page-title {
    margin-bottom: 25px;
}

.order-page .page-title h2 {
    font-weight: 700;
    color: #1f2937;
}

.order-page .page-title p {
    color: #6b7280;
}

/* =========================================================
   DASHBOARD CARDS
   ========================================================= */

.order-page .dashboard-card {
    border: 0;
    border-radius: 16px;
    min-height: 105px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.order-page .dashboard-card h2 {
    font-weight: 700;
}

.order-page .dashboard-card i {
    font-size: 32px;
}

/* =========================================================
   MAIN CARDS
   ========================================================= */

.order-page .main-card {
    border: 0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
}

.order-page .card-header {
    min-height: 55px;
    display: flex;
    align-items: center;
}

.order-page .card-header h5 {
    font-weight: 700;
}

/* =========================================================
   FORM
   ========================================================= */

.order-page .form-label {
    color: #343a40;
}

.order-page .form-select,
.order-page .form-control {
    min-height: 48px;
    border-radius: 8px;
}

.order-page .form-select:focus,
.order-page .form-control:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 .2rem rgba(13,110,253,.15);
}

/* =========================================================
   CART
   ========================================================= */

.order-page .cart-wrapper {
    min-height: 240px;
}

.order-page #cartTable td,
.order-page #cartTable th {
    vertical-align: middle;
}

.order-page .empty-cart {
    padding: 55px 20px !important;
    color: #6c757d;
}

.order-page .empty-cart i {
    font-size: 55px;
    margin-bottom: 15px;
}

/* =========================================================
   TOTALS
   ========================================================= */

.order-page .totals-table {
    margin-bottom: 20px;
}

.order-page .totals-table th,
.order-page .totals-table td {
    padding: 9px 12px;
}

.order-page .grand-total {
    font-size: 22px;
    font-weight: 700;
}

/* =========================================================
   ORDER HISTORY
   ========================================================= */

.order-page #orderTable td,
.order-page #orderTable th {
    vertical-align: middle;
}

.order-page .history-card {
    margin-top: 25px;
}

/* =========================================================
   BUTTONS
   ========================================================= */

.order-page .btn {
    border-radius: 8px;
}

.order-page .add-cart-btn {
    min-height: 48px;
    font-weight: 600;
}

.order-page .place-order-btn {
    min-height: 52px;
    font-size: 17px;
    font-weight: 700;
}

/* =========================================================
   MODAL
   ========================================================= */

#orderModal .modal-content {
    border: 0;
    border-radius: 14px;
    overflow: hidden;
}

#orderModal .modal-header {
    min-height: 60px;
}

#orderModal .modal-title {
    font-weight: 700;
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 991.98px) {

    .order-page {
        margin-left: 0;
        width: 100%;
        padding: 85px 15px 30px 15px;
    }

}

@media (max-width: 575.98px) {

    .order-page {
        padding-left: 10px;
        padding-right: 10px;
    }

    .order-page .dashboard-card {
        min-height: 95px;
    }

}

/* =========================================================
   SIDEBAR SAFETY
   ========================================================= */

/*
   We are NOT changing the sidebar.
   These rules only ensure the order content
   does not cover it.
*/

body {
    overflow-x: hidden;
}

</style>


<!-- =========================================================
     ORDER PAGE
     ========================================================= -->

<div class="order-page">

    <!-- =====================================================
         PAGE TITLE
         ===================================================== -->

    <div class="page-title d-flex justify-content-between
                align-items-center flex-wrap gap-3">

        <div>

            <h2 class="mb-1">
                <i class="fa fa-cart-shopping text-success me-2"></i>
                Order Management
            </h2>

            <p class="mb-0">
                Create, manage and track restaurant orders
            </p>

        </div>

        <button
            type="button"
            id="refreshBtn"
            class="btn btn-primary">

            <i class="fa fa-rotate me-1"></i>
            Refresh

        </button>

    </div>


    <!-- =====================================================
         DASHBOARD
         ===================================================== -->

    <div class="row g-3 mb-4">

        <!-- TODAY -->

        <div class="col-xl-3 col-md-6">

            <div class="card dashboard-card bg-primary text-white">

                <div class="card-body
                            d-flex
                            justify-content-between
                            align-items-center">

                    <div>

                        <h6 class="mb-2">
                            Today's Orders
                        </h6>

                        <h2
                            id="todayOrders"
                            class="mb-0">
                            0
                        </h2>

                    </div>

                    <i class="fa fa-calendar-day"></i>

                </div>

            </div>

        </div>


        <!-- PENDING -->

        <div class="col-xl-3 col-md-6">

            <div class="card dashboard-card bg-warning text-dark">

                <div class="card-body
                            d-flex
                            justify-content-between
                            align-items-center">

                    <div>

                        <h6 class="mb-2">
                            Pending
                        </h6>

                        <h2
                            id="pendingOrders"
                            class="mb-0">
                            0
                        </h2>

                    </div>

                    <i class="fa fa-clock"></i>

                </div>

            </div>

        </div>


        <!-- COMPLETED -->

        <div class="col-xl-3 col-md-6">

            <div class="card dashboard-card bg-success text-white">

                <div class="card-body
                            d-flex
                            justify-content-between
                            align-items-center">

                    <div>

                        <h6 class="mb-2">
                            Completed
                        </h6>

                        <h2
                            id="completedOrders"
                            class="mb-0">
                            0
                        </h2>

                    </div>

                    <i class="fa fa-circle-check"></i>

                </div>

            </div>

        </div>


        <!-- REVENUE -->

        <div class="col-xl-3 col-md-6">

            <div class="card dashboard-card bg-danger text-white">

                <div class="card-body
                            d-flex
                            justify-content-between
                            align-items-center">

                    <div>

                        <h6 class="mb-2">
                            Revenue
                        </h6>

                        <h2 class="mb-0">
                            ₹<span id="revenue">0.00</span>
                        </h2>

                    </div>

                    <i class="fa fa-indian-rupee-sign"></i>

                </div>

            </div>

        </div>

    </div>


    <!-- =====================================================
         CREATE ORDER + CART
         ===================================================== -->

    <div class="row g-4">

        <!-- =================================================
             CREATE ORDER
             ================================================= -->

        <div class="col-xl-4 col-lg-5">

            <div class="card main-card h-100">

                <div class="card-header bg-success text-white">

                    <h5 class="mb-0">

                        <i class="fa fa-circle-plus me-2"></i>

                        Create Order

                    </h5>

                </div>


                <div class="card-body">

                    <!-- CUSTOMER -->

                    <div class="mb-3">

                        <label
                            for="customerId"
                            class="form-label fw-semibold">

                            Customer

                        </label>

                        <select
                            id="customerId"
                            class="form-select">

                            <option value="">
                                Select Customer
                            </option>

                        </select>

                    </div>


                    <!-- MENU -->

                    <div class="mb-3">

                        <label
                            for="menuId"
                            class="form-label fw-semibold">

                            Menu Item

                        </label>

                        <select
                            id="menuId"
                            class="form-select">

                            <option value="">
                                Select Menu
                            </option>

                        </select>

                    </div>


                    <!-- QUANTITY -->

                    <div class="mb-3">

                        <label
                            for="quantity"
                            class="form-label fw-semibold">

                            Quantity

                        </label>

                        <input
                            type="number"
                            id="quantity"
                            class="form-control"
                            value="1"
                            min="1"
                            step="1">

                    </div>


                    <!-- ADD CART -->

                    <button
                        type="button"
                        id="addItemBtn"
                        class="btn btn-primary w-100 add-cart-btn">

                        <i class="fa fa-cart-plus me-1"></i>

                        Add To Cart

                    </button>


                    <!-- INFO -->

                    <div class="alert alert-info mt-4 mb-0">

                        <i class="fa fa-circle-info me-1"></i>

                        Select a customer and menu item,
                        enter quantity and add the item
                        to the shopping cart.

                    </div>

                </div>

            </div>

        </div>


        <!-- =================================================
             SHOPPING CART
             ================================================= -->

        <div class="col-xl-8 col-lg-7">

            <div class="card main-card">

                <div class="card-header bg-primary text-white
                            justify-content-between">

                    <h5 class="mb-0">

                        <i class="fa fa-shopping-cart me-2"></i>

                        Shopping Cart

                    </h5>

                    <span
                        id="cartCount"
                        class="badge bg-warning text-dark">

                        0

                    </span>

                </div>


                <div class="card-body">

                    <div class="table-responsive cart-wrapper">

                        <table
                            class="table table-hover table-bordered align-middle mb-0">

                            <thead class="table-primary">

                                <tr>

                                    <th>
                                        Item
                                    </th>

                                    <th class="text-end">
                                        Price
                                    </th>

                                    <th class="text-center">
                                        Qty
                                    </th>

                                    <th class="text-end">
                                        Subtotal
                                    </th>

                                    <th class="text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody id="cartTable">

                                <tr>

                                    <td
                                        colspan="5"
                                        class="text-center empty-cart">

                                        <i class="fa fa-cart-shopping d-block"></i>

                                        Cart is Empty

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>


                    <hr class="my-4">


                    <!-- TOTALS -->

                    <div class="row">

                        <div class="col-lg-7 ms-auto">

                            <table class="table table-borderless
                                          totals-table">

                                <tr>

                                    <th>
                                        Subtotal
                                    </th>

                                    <td class="text-end">
                                        ₹<span id="subtotal">0.00</span>
                                    </td>

                                </tr>


                                <tr>

                                    <th>
                                        GST (5%)
                                    </th>

                                    <td class="text-end">
                                        ₹<span id="gst">0.00</span>
                                    </td>

                                </tr>


                                <tr>

                                    <th>
                                        Discount
                                    </th>

                                    <td class="text-end">
                                        ₹<span id="discount">0.00</span>
                                    </td>

                                </tr>


                                <tr class="border-top">

                                    <th class="grand-total">
                                        Grand Total
                                    </th>

                                    <td
                                        class="text-end text-success grand-total">

                                        ₹<span id="total">0.00</span>

                                    </td>

                                </tr>

                            </table>


                            <button
                                type="button"
                                id="placeOrderBtn"
                                class="btn btn-success w-100
                                       place-order-btn">

                                <i class="fa fa-check-circle me-1"></i>

                                Place Order

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- =====================================================
         ORDER HISTORY
         ===================================================== -->

    <div class="card main-card history-card">

        <div class="card-header bg-dark text-white
                    justify-content-between">

            <h5 class="mb-0">

                <i class="fa fa-clock-rotate-left me-2"></i>

                Order History

            </h5>


            <button
                type="button"
                id="refreshOrders"
                class="btn btn-light btn-sm">

                <i class="fa fa-rotate me-1"></i>

                Refresh

            </button>

        </div>


        <div class="card-body">

            <!-- SEARCH -->

            <div class="row mb-3">

                <div class="col-lg-5">

                    <div class="input-group">

                        <span class="input-group-text">
                            <i class="fa fa-search"></i>
                        </span>

                        <input
                            id="searchOrder"
                            type="text"
                            class="form-control"
                            placeholder="Search Order, Customer or Status...">

                    </div>

                </div>

            </div>


            <!-- TABLE -->

            <div class="table-responsive">

                <table
                    class="table table-hover table-bordered align-middle">

                    <thead class="table-primary">

                        <tr>

                            <th>ID</th>

                            <th>Customer</th>

                            <th class="text-end">
                                Total
                            </th>

                            <th>Status</th>

                            <th>Date</th>

                            <th class="text-center">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody id="orderTable">

                        <tr>

                            <td
                                colspan="6"
                                class="text-center py-5 text-muted">

                                <i class="fa fa-spinner fa-spin fa-2x"></i>

                                <br><br>

                                Loading Orders...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     ORDER DETAILS MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header bg-primary text-white">

                <h5
                    class="modal-title"
                    id="orderModalLabel">

                    <i class="fa fa-receipt me-2"></i>

                    Order Details

                </h5>


                <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal">

                </button>

            </div>


            <div class="modal-body">

                <div class="row g-3 mb-4">

                    <div class="col-md-3">

                        <div class="card border-primary h-100">

                            <div class="card-body">

                                <small class="text-muted">
                                    Order ID
                                </small>

                                <h5
                                    id="mOrderId"
                                    class="mb-0">
                                    -
                                </h5>

                            </div>

                        </div>

                    </div>


                    <div class="col-md-3">

                        <div class="card border-primary h-100">

                            <div class="card-body">

                                <small class="text-muted">
                                    Customer
                                </small>

                                <h5
                                    id="mCustomer"
                                    class="mb-0">
                                    -
                                </h5>

                            </div>

                        </div>

                    </div>


                    <div class="col-md-3">

                        <div class="card border-primary h-100">

                            <div class="card-body">

                                <small class="text-muted">
                                    Status
                                </small>

                                <h5
                                    id="mStatus"
                                    class="mb-0">
                                    -
                                </h5>

                            </div>

                        </div>

                    </div>


                    <div class="col-md-3">

                        <div class="card border-success h-100">

                            <div class="card-body">

                                <small class="text-muted">
                                    Total Amount
                                </small>

                                <h5
                                    id="mTotal"
                                    class="mb-0 text-success">

                                    ₹0.00

                                </h5>

                            </div>

                        </div>

                    </div>

                </div>


                <h5 class="mb-3">

                    <i class="fa fa-utensils text-success me-2"></i>

                    Ordered Items

                </h5>


                <div class="table-responsive">

                    <table
                        class="table table-bordered table-hover">

                        <thead class="table-primary">

                            <tr>

                                <th>Item</th>

                                <th class="text-end">
                                    Price
                                </th>

                                <th class="text-center">
                                    Quantity
                                </th>

                                <th class="text-end">
                                    Subtotal
                                </th>

                            </tr>

                        </thead>


                        <tbody id="detailTable">

                            <tr>

                                <td
                                    colspan="4"
                                    class="text-center text-muted">

                                    No Order Details Found

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    <i class="fa fa-times me-1"></i>

                    Close

                </button>

            </div>

        </div>

    </div>

</div>


<%@ include file="includes/footer.jsp"%>

<!-- IMPORTANT:
     Keep this AFTER the HTML above.
-->

<script src="js/order.js"></script>