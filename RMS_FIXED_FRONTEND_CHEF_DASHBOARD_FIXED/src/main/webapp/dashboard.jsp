<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<!-- =====================================================
     COMMON HEADER
====================================================== -->

<%@ include file="includes/header.jsp" %>


<!-- =====================================================
     SIDEBAR
====================================================== -->

<%@ include file="includes/sidebar.jsp" %>


<!-- =====================================================
     MAIN CONTENT
====================================================== -->

<div class="main-content">

    <main class="dashboard-container">


        <!-- =================================================
             DASHBOARD HEADING
        ================================================== -->

        <div class="dashboard-heading">

            <div>

                <h1>
                    Welcome, Admin 👋
                </h1>

                <p>
                    Here's what's happening in your restaurant today.
                </p>

            </div>


            <button
                type="button"
                class="refresh-btn"
                id="refreshDashboard">

                <i class="fa-solid fa-rotate"></i>

                Refresh

            </button>

        </div>


        <!-- =================================================
             STAT CARDS
        ================================================== -->

        <div class="stats-grid">


            <!-- TOTAL ORDERS -->

            <div class="stat-card">

                <div class="stat-icon orders">

                    <i class="fa-solid fa-bag-shopping"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Orders
                    </span>

                    <h2 id="totalOrders">
                        0
                    </h2>

                    <small class="positive">

                        <i class="fa-solid fa-arrow-up"></i>

                        Today's orders

                    </small>

                </div>

            </div>


            <!-- TOTAL REVENUE -->

            <div class="stat-card">

                <div class="stat-icon revenue">

                    <i class="fa-solid fa-indian-rupee-sign"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Revenue
                    </span>

                    <h2>
                        ₹<span id="todaySales">0</span>
                    </h2>

                    <small class="positive">

                        <i class="fa-solid fa-arrow-up"></i>

                        Today's sales

                    </small>

                </div>

            </div>


            <!-- TOTAL CUSTOMERS -->

            <div class="stat-card">

                <div class="stat-icon customers">

                    <i class="fa-solid fa-users"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Total Customers
                    </span>

                    <h2 id="totalCustomers">
                        0
                    </h2>

                    <small class="positive">

                        <i class="fa-solid fa-user-plus"></i>

                        Registered customers

                    </small>

                </div>

            </div>


            <!-- PENDING ORDERS -->

            <div class="stat-card">

                <div class="stat-icon pending">

                    <i class="fa-solid fa-clipboard-list"></i>

                </div>

                <div class="stat-content">

                    <span>
                        Pending Orders
                    </span>

                    <h2 id="pendingOrders">
                        0
                    </h2>

                    <small class="negative">

                        <i class="fa-solid fa-clock"></i>

                        Need attention

                    </small>

                </div>

            </div>


        </div>


        <!-- =================================================
             CHARTS
        ================================================== -->

        <div class="dashboard-grid">


            <!-- REVENUE -->

            <div class="dashboard-card chart-card">

                <div class="card-heading">

                    <div>

                        <h3>
                            Revenue Overview
                        </h3>

                        <p>
                            Restaurant sales performance
                        </p>

                    </div>


                    <select id="chartPeriod">

                        <option value="week">
                            This Week
                        </option>

                        <option value="month">
                            This Month
                        </option>

                    </select>

                </div>


                <div class="chart-wrapper">

                    <canvas id="revenueChart"></canvas>

                </div>

            </div>


            <!-- ORDER STATUS -->

            <div class="dashboard-card status-card">

                <div class="card-heading">

                    <div>

                        <h3>
                            Order Status
                        </h3>

                        <p>
                            Current order distribution
                        </p>

                    </div>


                    <select id="statusPeriod">

                        <option value="today">
                            Today
                        </option>

                        <option value="week">
                            This Week
                        </option>

                    </select>

                </div>


                <div class="status-content">


                    <div class="donut-container">

                        <canvas
                            id="orderStatusChart">
                        </canvas>


                        <div class="donut-center">

                            <strong id="statusTotal">
                                0
                            </strong>

                            <span>
                                Total
                            </span>

                        </div>

                    </div>


                    <div class="status-list">


                        <div class="status-item">

                            <span>

                                <i class="status-dot completed"></i>

                                Completed

                            </span>

                            <strong id="completedCount">
                                0
                            </strong>

                        </div>


                        <div class="status-item">

                            <span>

                                <i class="status-dot preparing"></i>

                                Preparing

                            </span>

                            <strong id="preparingCount">
                                0
                            </strong>

                        </div>


                        <div class="status-item">

                            <span>

                                <i class="status-dot pending"></i>

                                Pending

                            </span>

                            <strong id="pendingStatusCount">
                                0
                            </strong>

                        </div>


                        <div class="status-item">

                            <span>

                                <i class="status-dot cancelled"></i>

                                Cancelled

                            </span>

                            <strong id="cancelledCount">
                                0
                            </strong>

                        </div>


                    </div>

                </div>

            </div>

        </div>


        <!-- =================================================
             RECENT ORDERS
        ================================================== -->

        <div class="dashboard-grid bottom-grid">


            <div class="dashboard-card recent-card">

                <div class="card-heading">

                    <div>

                        <h3>
                            Recent Orders
                        </h3>

                        <p>
                            Latest restaurant orders
                        </p>

                    </div>


                    <a
                        href="${pageContext.request.contextPath}/order.jsp"
                        class="view-all-btn">

                        View All

                    </a>

                </div>


                <div class="table-responsive">

                    <table class="orders-table">

                        <thead>

                            <tr>

                                <th>Order ID</th>

                                <th>Customer</th>

                                <th>Amount</th>

                                <th>Status</th>

                                <th>Date</th>

                            </tr>

                        </thead>


                        <tbody id="recentOrders">

                            <tr>

                                <td
                                    colspan="5"
                                    class="empty-row">

                                    Loading orders...

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            <!-- =================================================
                 TOP SELLING
            ================================================== -->

            <div class="dashboard-card top-items-card">

                <div class="card-heading">

                    <div>

                        <h3>
                            Top Selling Items
                        </h3>

                        <p>
                            Most popular menu items
                        </p>

                    </div>


                    <a
                        href="${pageContext.request.contextPath}/menu.jsp"
                        class="view-all-btn">

                        View All

                    </a>

                </div>


                <div class="top-items">


                    <div class="top-item">

                        <div class="rank">
                            1
                        </div>

                        <div class="food-image">

                            <i class="fa-solid fa-bowl-food"></i>

                        </div>

                        <div class="food-info">

                            <strong>
                                Paneer Butter Masala
                            </strong>

                            <span>
                                Popular Item
                            </span>

                        </div>

                        <div class="food-percent">

                            <strong>28%</strong>

                            <div class="progress">

                                <div style="width:28%;"></div>

                            </div>

                        </div>

                    </div>


                    <div class="top-item">

                        <div class="rank">
                            2
                        </div>

                        <div class="food-image">

                            <i class="fa-solid fa-bowl-rice"></i>

                        </div>

                        <div class="food-info">

                            <strong>
                                Veg Biryani
                            </strong>

                            <span>
                                Popular Item
                            </span>

                        </div>

                        <div class="food-percent">

                            <strong>23%</strong>

                            <div class="progress">

                                <div style="width:23%;"></div>

                            </div>

                        </div>

                    </div>


                    <div class="top-item">

                        <div class="rank">
                            3
                        </div>

                        <div class="food-image">

                            <i class="fa-solid fa-plate-wheat"></i>

                        </div>

                        <div class="food-info">

                            <strong>
                                Masala Dosa
                            </strong>

                            <span>
                                Popular Item
                            </span>

                        </div>

                        <div class="food-percent">

                            <strong>19%</strong>

                            <div class="progress">

                                <div style="width:19%;"></div>

                            </div>

                        </div>

                    </div>


                    <div class="top-item">

                        <div class="rank">
                            4
                        </div>

                        <div class="food-image">

                            <i class="fa-solid fa-bowl-food"></i>

                        </div>

                        <div class="food-info">

                            <strong>
                                Chicken Biryani
                            </strong>

                            <span>
                                Popular Item
                            </span>

                        </div>

                        <div class="food-percent">

                            <strong>16%</strong>

                            <div class="progress">

                                <div style="width:16%;"></div>

                            </div>

                        </div>

                    </div>


                    <div class="top-item">

                        <div class="rank">
                            5
                        </div>

                        <div class="food-image">

                            <i class="fa-solid fa-cookie"></i>

                        </div>

                        <div class="food-info">

                            <strong>
                                Gulab Jamun
                            </strong>

                            <span>
                                Popular Item
                            </span>

                        </div>

                        <div class="food-percent">

                            <strong>14%</strong>

                            <div class="progress">

                                <div style="width:14%;"></div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>

        </div>


    </main>

</div>


<!-- =====================================================
     CHART JS
====================================================== -->

<script
    src="https://cdn.jsdelivr.net/npm/chart.js">
</script>


<!-- =====================================================
     DASHBOARD JS
====================================================== -->

<script
    src="${pageContext.request.contextPath}/js/dashboard.js">
</script>


<!-- =====================================================
     FOOTER
====================================================== -->

<%@ include file="includes/footer.jsp" %> 
<script src="${pageContext.request.contextPath}/js/common.js"></script>