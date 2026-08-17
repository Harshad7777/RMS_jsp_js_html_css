
<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();
%>





<!-- =========================================================
     APPLICATION CONTEXT
========================================================= -->

<meta
    name="app-context"
    content="<%= contextPath %>">


<!-- =========================================================
     COMMON HEADER
========================================================= -->

<%@ include file="includes/header.jsp" %>


<!-- =========================================================
     COMMON SIDEBAR
========================================================= -->

<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">

    <main class="billing-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Billing
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Billing
                    </span>

                </div>

            </div>

        </div>


        <!-- =================================================
             PAGE BODY
        ================================================== -->

        <section class="page-body">


            <!-- =================================================
                 SUMMARY CARDS
            ================================================== -->

            <div class="summary-grid">


                <!-- TOTAL BILLS -->

                <div class="summary-card">

                    <div class="summary-icon orange">

                        <i class="fa-solid fa-file-invoice"></i>

                    </div>

                    <div>

                        <span>
                            Total Bills
                        </span>

                        <h2 id="totalBills">
                            0
                        </h2>

                        <small>
                            This Month
                        </small>

                    </div>

                </div>


                <!-- TOTAL REVENUE -->

                <div class="summary-card">

                    <div class="summary-icon green">

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                    </div>

                    <div>

                        <span>
                            Total Revenue
                        </span>

                        <h2 id="totalRevenue">
                            ₹0.00
                        </h2>

                        <small>
                            This Month
                        </small>

                    </div>

                </div>


                <!-- PENDING -->

                <div class="summary-card">

                    <div class="summary-icon yellow">

                        <i class="fa-regular fa-clock"></i>

                    </div>

                    <div>

                        <span>
                            Pending Amount
                        </span>

                        <h2 id="pendingAmount">
                            ₹0.00
                        </h2>

                        <small>
                            Pending Bills
                        </small>

                    </div>

                </div>


                <!-- PAID -->

                <div class="summary-card">

                    <div class="summary-icon blue">

                        <i class="fa-solid fa-circle-check"></i>

                    </div>

                    <div>

                        <span>
                            Paid Amount
                        </span>

                        <h2 id="paidAmount">
                            ₹0.00
                        </h2>

                        <small>
                            Paid Bills
                        </small>

                    </div>

                </div>


            </div>


            <!-- =================================================
                 BILLING GRID
            ================================================== -->

            <div class="billing-grid">


                <!-- =================================================
                     LEFT
                ================================================== -->

                <div class="left-section">


                    <!-- =================================================
                         RECENT BILLS
                    ================================================== -->

                    <div class="panel">

                        <div class="panel-header">

                            <h3>
                                Recent Bills
                            </h3>


                            <div class="bill-filters">

                                <div class="table-search">

                                    <i class="fa-solid fa-magnifying-glass"></i>

                                    <input
                                        type="text"
                                        id="billSearch"
                                        placeholder="Search by bill no, customer, order..."
                                        autocomplete="off">

                                </div>


                                <select id="statusFilter">

                                    <option value="ALL">
                                        All Status
                                    </option>

                                    <option value="PAID">
                                        Paid
                                    </option>

                                    <option value="PENDING">
                                        Pending
                                    </option>

                                    <option value="CANCELLED">
                                        Cancelled
                                    </option>

                                </select>


                                <select id="dateFilter">

                                    <option value="TODAY">
                                        Today
                                    </option>

                                    <option value="WEEK">
                                        This Week
                                    </option>

                                    <option value="MONTH">
                                        This Month
                                    </option>

                                    <option value="ALL">
                                        All
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- TABLE -->

                        <div class="table-responsive">

                            <table class="billing-table">

                                <thead>

                                    <tr>

                                        <th>Bill No.</th>

                                        <th>Order No.</th>

                                        <th>Customer</th>

                                        <th>Table</th>

                                        <th>Amount</th>

                                        <th>Payment</th>

                                        <th>Status</th>

                                        <th>Bill Date</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody id="billTableBody">

                                    <tr>

                                        <td
                                            colspan="9"
                                            class="loading-row">

                                            <i class="fa-solid fa-spinner fa-spin"></i>

                                            Loading bills...

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>


                        <!-- PAGINATION -->

                        <div class="pagination-container">

                            <span id="billCount">
                                Showing 0 bills
                            </span>


                            <div class="pagination">

                                <button
                                    type="button"
                                    id="billFirstPage">

                                    First

                                </button>

                                <button
                                    type="button"
                                    id="billPrevPage">

                                    Prev

                                </button>

                                <button
                                    type="button"
                                    class="active"
                                    id="billCurrentPage">

                                    1

                                </button>

                                <button
                                    type="button"
                                    id="billNextPage">

                                    Next

                                </button>

                                <button
                                    type="button"
                                    id="billLastPage">

                                    Last

                                </button>

                            </div>

                        </div>

                    </div>


                    <!-- =================================================
                         SUMMARY PANELS
                    ================================================== -->

                    <div class="summary-panels">


                        <!-- PAYMENT METHOD -->

                        <div class="panel chart-panel">

                            <h3>
                                Payment Method Summary
                            </h3>


                            <div class="chart-content">

                                <div class="donut-chart">

                                    <div class="donut-inner">

                                        <strong id="paymentTotal">
                                            0
                                        </strong>

                                        <span>
                                            Total
                                        </span>

                                    </div>

                                </div>


                                <div class="legend">

                                    <div>

                                        <span class="dot cash"></span>

                                        Cash

                                        <strong id="cashAmount">
                                            ₹0
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="dot upi"></span>

                                        UPI

                                        <strong id="upiAmount">
                                            ₹0
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="dot card"></span>

                                        Card

                                        <strong id="cardAmount">
                                            ₹0
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="dot other"></span>

                                        Other

                                        <strong id="otherAmount">
                                            ₹0
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <!-- STATUS -->

                        <div class="panel chart-panel">

                            <h3>
                                Bill Status Summary
                            </h3>


                            <div class="chart-content">

                                <div class="donut-chart status-chart">

                                    <div class="donut-inner">

                                        <strong id="statusTotal">
                                            0
                                        </strong>

                                        <span>
                                            Total
                                        </span>

                                    </div>

                                </div>


                                <div class="legend">

                                    <div>

                                        <span class="dot paid"></span>

                                        Paid

                                        <strong id="paidCount">
                                            0
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="dot pending"></span>

                                        Pending

                                        <strong id="pendingCount">
                                            0
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="dot cancelled"></span>

                                        Cancelled

                                        <strong id="cancelledCount">
                                            0
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     RIGHT BILL GENERATOR
                ================================================== -->

                <div
                    class="bill-generator panel"
                    id="billGenerator">


                    <!-- HEADER -->

                    <div class="generator-header">

                        <h3>
                            Generate Customer Bill
                        </h3>

                        <button
                            type="button"
                            id="closeGenerator"
                            title="Collapse">

                            <i class="fa-solid fa-minus"></i>

                        </button>

                    </div>


                    <div
                        class="generator-content"
                        id="generatorContent">


                        <!-- SELECT ORDER -->

                        <div class="form-section">

                            <label for="orderSelect">

                                Select Order

                                <span>*</span>

                            </label>


                            <div class="order-select">

                                <select id="orderSelect">

                                    <option value="">
                                        Select an order
                                    </option>

                                </select>


                                <button
                                    type="button"
                                    id="loadOrderBtn"
                                    title="Load Order">

                                    <i class="fa-solid fa-magnifying-glass"></i>

                                </button>

                            </div>

                        </div>


                        <!-- CUSTOMER INFO -->

                        <div class="customer-info">


                            <div>

                                <label>
                                    Customer
                                </label>

                                <strong id="billCustomer">
                                    —
                                </strong>

                            </div>


                            <div>

                                <label>
                                    Order Date
                                </label>

                                <strong id="billOrderDate">
                                    —
                                </strong>

                            </div>


                            <div>

                                <label>
                                    Table
                                </label>

                                <strong id="billTable">
                                    —
                                </strong>

                            </div>


                            <div>

                                <label>
                                    Order Status
                                </label>

                                <span
                                    id="billOrderStatus"
                                    class="status-badge new">

                                    NEW

                                </span>

                            </div>

                        </div>


                        <!-- ORDER ITEMS -->

                        <div class="order-items">

                            <h4>
                                Order Items
                            </h4>


                            <table>

                                <thead>

                                    <tr>

                                        <th>Item</th>

                                        <th>Qty</th>

                                        <th>Price</th>

                                        <th>Amount</th>

                                    </tr>

                                </thead>


                                <tbody id="orderItemsBody">

                                    <tr>

                                        <td
                                            colspan="4"
                                            class="empty-items">

                                            Select an order

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>


                        <!-- TOTALS -->

                        <div class="bill-totals">

                            <div>

                                <span>
                                    Subtotal
                                </span>

                                <strong id="subtotal">
                                    ₹0.00
                                </strong>

                            </div>


                            <div>

                                <span>
                                    GST (5%)
                                </span>

                                <strong id="gst">
                                    ₹0.00
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Discount
                                </span>

                                <strong id="discount">
                                    ₹0.00
                                </strong>

                            </div>


                            <div class="grand-total">

                                <span>
                                    Grand Total
                                </span>

                                <strong id="grandTotal">
                                    ₹0.00
                                </strong>

                            </div>

                        </div>


                        <!-- PAYMENT METHOD -->

                        <div class="form-section">

                            <label>

                                Payment Method

                                <span>*</span>

                            </label>


                            <div class="payment-buttons">

                                <button
                                    type="button"
                                    class="payment-btn active"
                                    data-method="CASH">

                                    <i class="fa-solid fa-money-bill"></i>

                                    Cash

                                </button>


                                <button
                                    type="button"
                                    class="payment-btn"
                                    data-method="CARD">

                                    <i class="fa-regular fa-credit-card"></i>

                                    Card

                                </button>


                                <button
                                    type="button"
                                    class="payment-btn"
                                    data-method="UPI">

                                    <i class="fa-solid fa-qrcode"></i>

                                    UPI

                                </button>

                            </div>

                        </div>


                        <!-- PAYMENT STATUS -->

                        <div class="form-section">

                            <label>

                                Payment Status

                                <span>*</span>

                            </label>


                            <div class="payment-status">

                                <button
                                    type="button"
                                    class="payment-status-btn active"
                                    data-status="PAID">

                                    PAID

                                </button>


                                <button
                                    type="button"
                                    class="payment-status-btn"
                                    data-status="PENDING">

                                    PENDING

                                </button>

                            </div>

                        </div>


                        <!-- RECEIVED -->

                        <div class="form-section">

                            <label for="receivedAmount">

                                Received Amount

                                <span>*</span>

                            </label>


                            <input
                                type="number"
                                id="receivedAmount"
                                step="0.01"
                                min="0"
                                placeholder="Enter received amount">

                        </div>


                        <!-- NOTES -->

                        <div class="form-section">

                            <label for="billNotes">
                                Notes
                            </label>


                            <textarea
                                id="billNotes"
                                rows="3"
                                placeholder="Enter notes here..."></textarea>

                        </div>


                        <!-- ACTIONS -->

                        <div class="generator-actions">

                            <button
                                type="button"
                                id="cancelBillBtn"
                                class="btn-cancel">

                                Cancel

                            </button>


                            <button
                                type="button"
                                id="generateBillBtn"
                                class="btn-generate">

                                <i class="fa-solid fa-file-invoice"></i>

                                Generate Bill

                            </button>


                            <button
                                type="button"
                                id="printBillBtn"
                                class="btn-print">

                                <i class="fa-solid fa-print"></i>

                                Print Bill

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    </main>

</div>


<!-- =========================================================
     BILL DETAILS MODAL
========================================================= -->

<div
    id="billDetailsModal"
    class="bill-modal-overlay">

    <div class="bill-modal">


        <!-- HEADER -->

        <div class="bill-modal-header">

            <div>

                <h2>

                    <i class="fa-solid fa-file-invoice"></i>

                    Bill Details

                </h2>


                <span id="modalBillNo">
                    BILL-000000
                </span>

            </div>


            <button
                type="button"
                id="closeBillModal"
                class="bill-modal-close"
                title="Close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <!-- BODY -->

        <div class="bill-modal-body">


            <!-- BILL INFORMATION -->

            <div class="bill-modal-info-grid">


                <div class="bill-info-card">

                    <span>
                        Order ID
                    </span>

                    <strong id="modalOrderId">
                        -
                    </strong>

                </div>


                <div class="bill-info-card">

                    <span>
                        Bill Date
                    </span>

                    <strong id="modalBillDate">
                        -
                    </strong>

                </div>


                <div class="bill-info-card">

                    <span>
                        Payment Method
                    </span>

                    <strong id="modalPaymentMethod">
                        -
                    </strong>

                </div>


                <div class="bill-info-card">

                    <span>
                        Payment Status
                    </span>

                    <strong
                        id="modalPaymentStatus"
                        class="modal-status paid">

                        PAID

                    </strong>

                </div>

            </div>


            <!-- BILL SUMMARY -->

            <div class="bill-modal-section">

                <h3>

                    <i class="fa-solid fa-receipt"></i>

                    Bill Summary

                </h3>


                <div class="bill-summary-row">

                    <span>
                        Subtotal
                    </span>

                    <strong id="modalSubtotal">
                        ₹0.00
                    </strong>

                </div>


                <div class="bill-summary-row">

                    <span>
                        GST (5%)
                    </span>

                    <strong id="modalGst">
                        ₹0.00
                    </strong>

                </div>


                <div class="bill-summary-row">

                    <span>
                        Discount
                    </span>

                    <strong id="modalDiscount">
                        ₹0.00
                    </strong>

                </div>


                <div class="bill-summary-divider"></div>


                <div class="bill-summary-row grand">

                    <span>
                        Grand Total
                    </span>

                    <strong id="modalGrandTotal">
                        ₹0.00
                    </strong>

                </div>

            </div>


            <!-- PAYMENT -->

            <div class="bill-payment-box">

                <div>

                    <span>
                        Payment
                    </span>

                    <strong id="modalPayment">
                        CASH
                    </strong>

                </div>


                <div>

                    <span>
                        Status
                    </span>

                    <strong
                        id="modalStatus"
                        class="paid">

                        PAID

                    </strong>

                </div>

            </div>

        </div>


        <!-- FOOTER -->

        <div class="bill-modal-footer">

            <button
                type="button"
                id="modalCloseBtn"
                class="modal-btn secondary">

                <i class="fa-solid fa-xmark"></i>

                Close

            </button>


            <button
                type="button"
                id="modalPrintBtn"
                class="modal-btn primary">

                <i class="fa-solid fa-print"></i>

                Print Bill

            </button>

        </div>

    </div>

</div>


<!-- =========================================================
     TOAST
========================================================= -->

<div
    id="toast"
    class="toast-message">

    <i class="fa-solid fa-circle-check"></i>

    <span id="toastText">
        Success
    </span>

</div>


<!-- =========================================================
     CONTEXT PATH
========================================================= -->

<script>

    window.CONTEXT_PATH =
        "<%= contextPath %>";

</script>


<!-- =========================================================
     BILLING JS
========================================================= -->

<script
    src="<%= contextPath %>/js/billing.js">
</script>


<!-- =========================================================
     COMMON FOOTER
========================================================= -->

<%@ include file="includes/footer.jsp" %>
