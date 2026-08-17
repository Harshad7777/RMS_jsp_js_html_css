
<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();

    /*
     * Used by common sidebar/header if your common layout
     * supports active page detection.
     */
    request.setAttribute("activePage", "reports");
    request.setAttribute("pageTitle", "Reports");
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
     REPORTS MAIN CONTENT
========================================================= -->

<div class="main-content">

    <main class="reports-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Billing Reports
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Reports
                    </span>

                </div>

            </div>


            <!-- PAGE ACTIONS -->

            <div class="page-actions">

                <button
                    type="button"
                    class="btn-export"
                    id="exportExcelBtn">

                    <i class="fa-solid fa-download"></i>

                    Export Excel

                </button>


                <button
                    type="button"
                    class="btn-print"
                    id="printReportBtn">

                    <i class="fa-solid fa-print"></i>

                    Print Report

                </button>

            </div>

        </div>


        <!-- =================================================
             FILTER PANEL
        ================================================== -->

        <section class="filter-card">


            <!-- DATE FROM -->

            <div class="filter-group">

                <label for="dateFrom">
                    Date From
                </label>

                <div class="date-input">

                    <input
                        type="date"
                        id="dateFrom"
                        value="2026-08-01">

                    <i class="fa-regular fa-calendar"></i>

                </div>

            </div>


            <!-- DATE TO -->

            <div class="filter-group">

                <label for="dateTo">
                    Date To
                </label>

                <div class="date-input">

                    <input
                        type="date"
                        id="dateTo"
                        value="2026-08-14">

                    <i class="fa-regular fa-calendar"></i>

                </div>

            </div>


            <!-- PAYMENT METHOD -->

            <div class="filter-group">

                <label for="paymentMethod">
                    Payment Method
                </label>

                <select id="paymentMethod">

                    <option value="ALL">
                        All
                    </option>

                    <option value="CASH">
                        Cash
                    </option>

                    <option value="UPI">
                        UPI
                    </option>

                    <option value="CARD">
                        Card
                    </option>

                    <option value="OTHER">
                        Other
                    </option>

                </select>

            </div>


            <!-- PAYMENT STATUS -->

            <div class="filter-group">

                <label for="paymentStatus">
                    Payment Status
                </label>

                <select id="paymentStatus">

                    <option value="ALL">
                        All
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

            </div>


            <!-- FILTER BUTTONS -->

            <div class="filter-buttons">

                <button
                    type="button"
                    class="btn-filter"
                    id="filterBtn">

                    <i class="fa-solid fa-filter"></i>

                    Filter

                </button>


                <button
                    type="button"
                    class="btn-reset"
                    id="resetBtn">

                    <i class="fa-solid fa-rotate-left"></i>

                    Reset

                </button>

            </div>

        </section>


        <!-- =================================================
             STATISTICS
        ================================================== -->

        <section class="stats-grid">


            <!-- TOTAL BILLS -->

            <div class="stat-card">

                <div class="stat-icon gold">

                    <i class="fa-solid fa-file-invoice"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Bills
                    </span>

                    <strong id="totalBills">
                        128
                    </strong>

                    <small>
                        This Month
                    </small>

                </div>

            </div>


            <!-- TOTAL REVENUE -->

            <div class="stat-card">

                <div class="stat-icon green">

                    <i class="fa-solid fa-indian-rupee-sign"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Revenue
                    </span>

                    <strong id="totalRevenue">
                        ₹45,680.50
                    </strong>

                    <small>
                        This Month
                    </small>

                </div>

            </div>


            <!-- PENDING -->

            <div class="stat-card">

                <div class="stat-icon pending">

                    <i class="fa-regular fa-clock"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Pending Amount
                    </span>

                    <strong id="pendingAmount">
                        ₹3,250.00
                    </strong>

                    <small>
                        From 8 Bills
                    </small>

                </div>

            </div>


            <!-- PAID -->

            <div class="stat-card">

                <div class="stat-icon blue">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Paid Amount
                    </span>

                    <strong id="paidAmount">
                        ₹42,430.50
                    </strong>

                    <small>
                        From 120 Bills
                    </small>

                </div>

            </div>


            <!-- DISCOUNT -->

            <div class="stat-card">

                <div class="stat-icon purple">

                    <i class="fa-solid fa-tag"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Discount
                    </span>

                    <strong id="totalDiscount">
                        ₹2,150.00
                    </strong>

                    <small>
                        This Month
                    </small>

                </div>

            </div>


            <!-- GST -->

            <div class="stat-card">

                <div class="stat-icon gst">

                    <i class="fa-solid fa-percent"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total GST
                    </span>

                    <strong id="totalGST">
                        ₹2,180.50
                    </strong>

                    <small>
                        This Month
                    </small>

                </div>

            </div>


            <!-- AVERAGE -->

            <div class="stat-card">

                <div class="stat-icon average">

                    <i class="fa-solid fa-chart-column"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Average Bill Value
                    </span>

                    <strong id="averageBill">
                        ₹357.66
                    </strong>

                    <small>
                        This Month
                    </small>

                </div>

            </div>

        </section>


        <!-- =================================================
             CHARTS
        ================================================== -->

        <section class="charts-grid">


            <!-- =================================================
                 REVENUE CHART
            ================================================== -->

            <div class="report-card revenue-card">

                <div class="card-title">

                    <div>

                        <h3>
                            Revenue Over Time
                        </h3>

                    </div>


                    <select id="revenuePeriod">

                        <option value="DAILY">
                            Daily
                        </option>

                        <option value="WEEKLY">
                            Weekly
                        </option>

                        <option value="MONTHLY">
                            Monthly
                        </option>

                    </select>

                </div>


                <div class="chart-box">

                    <canvas id="revenueChart"></canvas>

                </div>

            </div>


            <!-- =================================================
                 PAYMENT METHOD
            ================================================== -->

            <div class="report-card payment-card">

                <div class="card-title">

                    <h3>
                        Payment Method Distribution
                    </h3>

                </div>


                <div class="payment-content">


                    <div class="donut-container">

                        <canvas id="paymentChart"></canvas>

                    </div>


                    <div class="payment-legend">


                        <!-- CASH -->

                        <div class="legend-row">

                            <span class="legend-dot cash"></span>

                            <div>

                                <span>
                                    Cash
                                </span>

                                <strong>
                                    ₹20,150.00 (44%)
                                </strong>

                            </div>

                        </div>


                        <!-- UPI -->

                        <div class="legend-row">

                            <span class="legend-dot upi"></span>

                            <div>

                                <span>
                                    UPI
                                </span>

                                <strong>
                                    ₹13,240.00 (28%)
                                </strong>

                            </div>

                        </div>


                        <!-- CARD -->

                        <div class="legend-row">

                            <span class="legend-dot card"></span>

                            <div>

                                <span>
                                    Card
                                </span>

                                <strong>
                                    ₹9,680.50 (20%)
                                </strong>

                            </div>

                        </div>


                        <!-- OTHER -->

                        <div class="legend-row">

                            <span class="legend-dot other"></span>

                            <div>

                                <span>
                                    Other
                                </span>

                                <strong>
                                    ₹2,610.00 (8%)
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 BILL STATUS
            ================================================== -->

            <div class="report-card status-card">

                <div class="card-title">

                    <h3>
                        Bill Status Summary
                    </h3>

                </div>


                <div class="status-content">


                    <div class="status-donut">

                        <canvas id="statusChart"></canvas>

                        <div class="donut-center">

                            <strong id="statusTotal">
                                128
                            </strong>

                            <span>
                                Total
                            </span>

                        </div>

                    </div>


                    <div class="status-legend">


                        <!-- PAID -->

                        <div class="status-row">

                            <span class="status-dot paid"></span>

                            <div>

                                <strong>
                                    Paid
                                </strong>

                                <small>
                                    120 (93.75%)
                                </small>

                            </div>

                        </div>


                        <!-- PENDING -->

                        <div class="status-row">

                            <span class="status-dot pending"></span>

                            <div>

                                <strong>
                                    Pending
                                </strong>

                                <small>
                                    8 (6.25%)
                                </small>

                            </div>

                        </div>


                        <!-- CANCELLED -->

                        <div class="status-row">

                            <span class="status-dot cancelled"></span>

                            <div>

                                <strong>
                                    Cancelled
                                </strong>

                                <small>
                                    0 (0%)
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>


        <!-- =================================================
             BILL DETAILS
        ================================================== -->

        <section class="report-card bill-details-card">


            <div class="card-title">

                <h3>
                    Bill Details
                </h3>

            </div>


            <div class="table-wrapper">

                <table class="bill-table">

                    <thead>

                        <tr>

                            <th>
                                Bill No.
                            </th>

                            <th>
                                Order No.
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Table
                            </th>

                            <th>
                                Bill Date
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Discount
                            </th>

                            <th>
                                GST (5%)
                            </th>

                            <th>
                                Total Amount
                            </th>

                            <th>
                                Payment Method
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody id="billTableBody">


                        <!-- ROW 1 -->

                        <tr>

                            <td>
                                BILL-000128
                            </td>

                            <td>
                                ORD-36
                            </td>

                            <td>
                                Vikas Jadhav
                            </td>

                            <td>
                                T1
                            </td>

                            <td>
                                13 Aug 2026 03:26 PM
                            </td>

                            <td>
                                ₹304.50
                            </td>

                            <td>
                                ₹0.00
                            </td>

                            <td>
                                ₹14.50
                            </td>

                            <td>
                                ₹319.00
                            </td>

                            <td>

                                <span class="payment-badge cash">
                                    CASH
                                </span>

                            </td>

                            <td>

                                <span class="status-badge paid">
                                    PAID
                                </span>

                            </td>

                        </tr>


                        <!-- ROW 2 -->

                        <tr>

                            <td>
                                BILL-000127
                            </td>

                            <td>
                                ORD-35
                            </td>

                            <td>
                                Rahul Sharma
                            </td>

                            <td>
                                T5
                            </td>

                            <td>
                                13 Aug 2026 02:45 PM
                            </td>

                            <td>
                                ₹560.00
                            </td>

                            <td>
                                ₹0.00
                            </td>

                            <td>
                                ₹28.00
                            </td>

                            <td>
                                ₹588.00
                            </td>

                            <td>

                                <span class="payment-badge upi">
                                    UPI
                                </span>

                            </td>

                            <td>

                                <span class="status-badge paid">
                                    PAID
                                </span>

                            </td>

                        </tr>


                        <!-- ROW 3 -->

                        <tr>

                            <td>
                                BILL-000126
                            </td>

                            <td>
                                ORD-34
                            </td>

                            <td>
                                Neha Patil
                            </td>

                            <td>
                                T3
                            </td>

                            <td>
                                13 Aug 2026 02:10 PM
                            </td>

                            <td>
                                ₹245.00
                            </td>

                            <td>
                                ₹0.00
                            </td>

                            <td>
                                ₹12.25
                            </td>

                            <td>
                                ₹257.25
                            </td>

                            <td>

                                <span class="payment-badge card">
                                    CARD
                                </span>

                            </td>

                            <td>

                                <span class="status-badge paid">
                                    PAID
                                </span>

                            </td>

                        </tr>


                        <!-- ROW 4 -->

                        <tr>

                            <td>
                                BILL-000125
                            </td>

                            <td>
                                ORD-33
                            </td>

                            <td>
                                Amit Verma
                            </td>

                            <td>
                                T2
                            </td>

                            <td>
                                13 Aug 2026 01:40 PM
                            </td>

                            <td>
                                ₹780.00
                            </td>

                            <td>
                                ₹50.00
                            </td>

                            <td>
                                ₹36.50
                            </td>

                            <td>
                                ₹766.50
                            </td>

                            <td>

                                <span class="payment-badge cash">
                                    CASH
                                </span>

                            </td>

                            <td>

                                <span class="status-badge pending">
                                    PENDING
                                </span>

                            </td>

                        </tr>


                        <!-- ROW 5 -->

                        <tr>

                            <td>
                                BILL-000124
                            </td>

                            <td>
                                ORD-32
                            </td>

                            <td>
                                Sneha Kulkarni
                            </td>

                            <td>
                                T6
                            </td>

                            <td>
                                13 Aug 2026 01:15 PM
                            </td>

                            <td>
                                ₹420.00
                            </td>

                            <td>
                                ₹0.00
                            </td>

                            <td>
                                ₹21.00
                            </td>

                            <td>
                                ₹441.00
                            </td>

                            <td>

                                <span class="payment-badge upi">
                                    UPI
                                </span>

                            </td>

                            <td>

                                <span class="status-badge paid">
                                    PAID
                                </span>

                            </td>

                        </tr>


                    </tbody>

                </table>

            </div>


            <!-- =================================================
                 TABLE FOOTER
            ================================================== -->

            <div class="table-footer">


                <div class="showing-text">

                    Showing 1 to 5 of 128 bills

                </div>


                <div class="pagination">


                    <button
                        type="button"
                        disabled>

                        First

                    </button>


                    <button
                        type="button"
                        disabled>

                        Prev

                    </button>


                    <button
                        type="button"
                        class="active">

                        1

                    </button>


                    <button
                        type="button">

                        2

                    </button>


                    <button
                        type="button">

                        3

                    </button>


                    <button
                        type="button">

                        4

                    </button>


                    <span>
                        ...
                    </span>


                    <button
                        type="button">

                        26

                    </button>


                    <button
                        type="button">

                        Next

                    </button>


                    <button
                        type="button">

                        Last

                    </button>

                </div>

            </div>

        </section>


    </main>

</div>


<!-- =========================================================
     CONTEXT PATH
========================================================= -->

<script>

    window.CONTEXT_PATH =
        "<%= contextPath %>";

</script>


<!-- =========================================================
     CHART.JS
========================================================= -->

<script
    src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js">
</script>


<!-- =========================================================
     REPORTS JS
========================================================= -->

<script
    src="<%= contextPath %>/js/reports.js">
</script>


<!-- =========================================================
     COMMON FOOTER
========================================================= -->

<%@ include file="includes/footer.jsp" %>

