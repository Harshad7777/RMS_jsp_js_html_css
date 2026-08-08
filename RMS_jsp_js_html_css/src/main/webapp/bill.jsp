<%@ page language="java"
         contentType="text/html;charset=UTF-8" %>

<%@ include file="includes/header.jsp" %>

<body>

<%@ include file="includes/sidebar.jsp" %>

<div class="main-content">

    <%@ include file="includes/navbar.jsp" %>


    <div class="container-fluid">

        <!-- ================================================= -->
        <!-- PAGE TITLE -->
        <!-- ================================================= -->

        <div class="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h2 class="fw-bold mb-1">

                    <i class="fa-solid fa-file-invoice-dollar text-success me-2"></i>

                    Billing

                </h2>

                <p class="text-muted mb-0">

                    Generate and manage restaurant bills

                </p>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- BILL GENERATION -->
        <!-- ================================================= -->

        <div class="card shadow-sm mb-4">

            <div class="card-header bg-success text-white">

                <h5 class="mb-0">

                    <i class="fa-solid fa-receipt me-2"></i>

                    Generate Bill

                </h5>

            </div>


            <div class="card-body">

                <div class="row g-3">


                    <!-- ORDER ID -->

                    <div class="col-md-4">

                        <label
                            for="orderId"
                            class="form-label fw-semibold">

                            Order ID

                        </label>


                        <input
                            type="number"
                            id="orderId"
                            class="form-control"
                            placeholder="Enter Order ID"
                            min="1">

                    </div>


                    <!-- PAYMENT METHOD -->

                    <div class="col-md-3">

                        <label
                            for="paymentMethod"
                            class="form-label fw-semibold">

                            Payment Method

                        </label>


                        <select
                            id="paymentMethod"
                            class="form-select">

                            <option value="">

                                Select Payment Method

                            </option>

                            <option value="CASH">

                                Cash

                            </option>

                            <option value="CARD">

                                Card

                            </option>

                            <option value="UPI">

                                UPI

                            </option>

                        </select>

                    </div>


                    <!-- DISCOUNT -->

                    <div class="col-md-2">

                        <label
                            for="discount"
                            class="form-label fw-semibold">

                            Discount

                        </label>


                        <input
                            type="number"
                            id="discount"
                            class="form-control"
                            value="0"
                            min="0"
                            step="0.01">

                    </div>


                    <!-- LOAD ORDER -->

                    <div class="col-md-3 d-flex align-items-end">

                        <button
                            type="button"
                            id="loadOrderBtn"
                            class="btn btn-primary w-100">

                            <i class="fa-solid fa-magnifying-glass me-1"></i>

                            Load Order

                        </button>

                    </div>

                </div>


                <div class="row mt-3">


                    <div class="col-md-12">

                        <button
                            type="button"
                            id="generateBillBtn"
                            class="btn btn-success">

                            <i class="fa-solid fa-file-invoice me-1"></i>

                            Generate Bill

                        </button>


                        <button
                            type="button"
                            id="clearBillBtn"
                            class="btn btn-secondary ms-2">

                            <i class="fa-solid fa-rotate-left me-1"></i>

                            Clear

                        </button>

                    </div>

                </div>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- BILL -->
        <!-- ================================================= -->

        <div
            class="card shadow-sm"
            id="billArea">


            <div class="card-body p-4">


                <!-- RESTAURANT HEADER -->

                <div class="text-center">

                    <h2 class="fw-bold">

                        Restaurant Management System

                    </h2>

                    <p class="text-muted mb-1">

                        Restaurant Bill

                    </p>

                    <hr>

                </div>


                <!-- BILL INFORMATION -->

                <div class="row mb-4">

                    <div class="col-md-6">

                        <p class="mb-1">

                            <strong>Bill No:</strong>

                            <span id="billNo">
                                -
                            </span>

                        </p>


                        <p class="mb-1">

                            <strong>Order ID:</strong>

                            <span id="billOrderId">
                                -
                            </span>

                        </p>

                    </div>


                    <div class="col-md-6 text-md-end">

                        <p class="mb-1">

                            <strong>Customer:</strong>

                            <span id="customerName">
                                -
                            </span>

                        </p>


                        <p class="mb-1">

                            <strong>Date:</strong>

                            <span id="billDate">
                                -
                            </span>

                        </p>

                    </div>

                </div>


                <!-- ORDER ITEMS -->

                <div class="table-responsive">

                    <table
                        class="table table-bordered">

                        <thead class="table-primary">

                            <tr>

                                <th>
                                    #
                                </th>

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

                            </tr>

                        </thead>


                        <tbody id="billTable">

                            <tr>

                                <td
                                    colspan="5"
                                    class="text-center text-muted py-5">

                                    <i
                                        class="fa-solid fa-file-invoice fa-3x mb-3">
                                    </i>

                                    <br>

                                    Load an order to generate bill

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- TOTALS -->

                <div class="row justify-content-end">

                    <div class="col-md-5">

                        <table class="table">

                            <tr>

                                <th>
                                    Subtotal
                                </th>

                                <td class="text-end">

                                    ₹<span id="subTotal">
                                        0.00
                                    </span>

                                </td>

                            </tr>


                            <tr>

                                <th>
                                    GST (5%)
                                </th>

                                <td class="text-end">

                                    ₹<span id="gst">
                                        0.00
                                    </span>

                                </td>

                            </tr>


                            <tr>

                                <th>
                                    Discount
                                </th>

                                <td class="text-end">

                                    ₹<span id="billDiscount">
                                        0.00
                                    </span>

                                </td>

                            </tr>


                            <tr class="table-success">

                                <th class="fs-5">
                                    Grand Total
                                </th>

                                <td
                                    class="text-end fw-bold fs-5">

                                    ₹<span id="grandTotal">
                                        0.00
                                    </span>

                                </td>

                            </tr>

                        </table>

                    </div>

                </div>


                <!-- PAYMENT -->

                <div class="text-end mt-3">

                    <span class="badge bg-success">

                        Payment:

                        <span id="billPaymentMethod">
                            -
                        </span>

                    </span>

                </div>


                <!-- PRINT -->

                <div class="text-end mt-4">

                    <button
                        type="button"
                        id="printBillBtn"
                        class="btn btn-primary">

                        <i class="fa-solid fa-print me-1"></i>

                        Print Bill

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>


<script src="js/auth.js"></script>

<script src="js/bill.js"></script>


<%@ include file="includes/footer.jsp" %>