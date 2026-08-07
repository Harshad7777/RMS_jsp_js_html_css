<%@ page language="java"
contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp"%>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

    <%@ include file="includes/navbar.jsp"%>

    <!-- ================= PAGE TITLE ================= -->

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2 class="mb-0">
            <i class="fa fa-cart-shopping text-success"></i>
            Restaurant Order Management
        </h2>

        <button id="refreshBtn" class="btn btn-primary">
            <i class="fa fa-rotate"></i>
            Refresh
        </button>

    </div>

    <!-- ================= DASHBOARD CARDS ================= -->

    <div class="row mb-4">

        <div class="col-md-3">

            <div class="card shadow border-0 bg-primary text-white">

                <div class="card-body">

                    <h6>Today's Orders</h6>

                    <h2 id="todayOrders">0</h2>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="card shadow border-0 bg-warning">

                <div class="card-body">

                    <h6>Pending</h6>

                    <h2 id="pendingOrders">0</h2>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="card shadow border-0 bg-success text-white">

                <div class="card-body">

                    <h6>Completed</h6>

                    <h2 id="completedOrders">0</h2>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="card shadow border-0 bg-danger text-white">

                <div class="card-body">

                    <h6>Revenue</h6>

                    <h2>₹<span id="revenue">0.00</span></h2>

                </div>

            </div>

        </div>

    </div>

    <!-- ================= CREATE ORDER + CART ================= -->

    <div class="row">

        <!-- Create Order -->

        <div class="col-lg-4">

            <div class="card shadow border-0">

                <div class="card-header bg-success text-white">

                    <h5 class="mb-0">
                        <i class="fa fa-plus-circle"></i>
                        Create Order
                    </h5>

                </div>

                <div class="card-body">

                    <div class="mb-3">

                        <label class="form-label">Customer</label>

                        <select id="customerId" class="form-select">
                            <option value="">Select Customer</option>
                        </select>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">Menu Item</label>

                        <select id="menuId" class="form-select">
                            <option value="">Select Menu</option>
                        </select>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">Quantity</label>

                        <input type="number" id="quantity" class="form-control" value="1" min="1">

                    </div>

                    <button class="btn btn-primary w-100" onclick="addItem()">
                        <i class="fa fa-cart-plus"></i>
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>

        <!-- Shopping Cart -->

        <div class="col-lg-8">

            <div class="card shadow border-0">

                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                    <h5 class="mb-0">
                        <i class="fa fa-shopping-cart"></i>
                        Shopping Cart
                    </h5>

                    <span class="badge bg-warning text-dark" id="cartCount">0</span>

                </div>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-hover">

                            <thead class="table-success">

                                <tr>

                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody id="cartTable">

                                <tr>

                                    <td colspan="5" class="text-center text-muted py-5">

                                        <i class="fa fa-cart-shopping fa-3x mb-3"></i>

                                        <br>

                                        Cart is Empty

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <hr>

                    <div class="row">

                        <div class="col-md-5 ms-auto">

                            <table class="table table-borderless">

                                <tr>

                                    <th>Subtotal</th>

                                    <td class="text-end">₹<span id="subtotal">0.00</span></td>

                                </tr>

                                <tr>

                                    <th>GST (5%)</th>

                                    <td class="text-end">₹<span id="gst">0.00</span></td>

                                </tr>

                                <tr>

                                    <th>Discount</th>

                                    <td class="text-end">₹<span id="discount">0.00</span></td>

                                </tr>

                                <tr class="border-top">

                                    <th class="fs-5">Grand Total</th>

                                    <th class="text-end text-success fs-3">
                                        ₹<span id="total">0.00</span>
                                    </th>

                                </tr>

                            </table>

                            <button id="placeOrderBtn"
                                    class="btn btn-success btn-lg w-100"
                                    onclick="placeOrder()">

                                <i class="fa fa-check-circle"></i>
                                Place Order

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <!-- ================= ORDER HISTORY ================= -->

    <div class="card shadow border-0 mt-4">

        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">

            <h5 class="mb-0">
                <i class="fa fa-clock-rotate-left"></i>
                Order History
            </h5>

            <button id="refreshOrders" class="btn btn-light btn-sm">
                <i class="fa fa-rotate"></i>
                Refresh
            </button>

        </div>

        <div class="card-body">

            <div class="row mb-3">

                <div class="col-md-4">

                    <div class="input-group">

                        <span class="input-group-text">

                            <i class="fa fa-search"></i>

                        </span>

                        <input id="searchOrder"
                               type="text"
                               class="form-control"
                               placeholder="Search Order...">

                    </div>

                </div>

            </div>

            <div class="table-responsive">

                <table class="table table-hover table-bordered">

                    <thead class="table-primary">

                        <tr>

                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody id="orderTable">

                        <tr>

                            <td colspan="6" class="text-center py-5">

                                <i class="fa fa-box-open fa-3x text-secondary"></i>

                                <br><br>

                                No Orders Found

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

<%@ include file="includes/footer.jsp"%>

<%@ include file="includes/footer.jsp"%>

<script src="${pageContext.request.contextPath}/js/order.js"></script>