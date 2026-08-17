<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Orders | Sankalp RMS</title>

    <!-- =====================================================
         APPLICATION CONTEXT
    ====================================================== -->

    <meta name="app-context"
          content="${pageContext.request.contextPath}">

    <!-- =====================================================
         FONT AWESOME
    ====================================================== -->

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- =====================================================
         COMMON CSS
    ====================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/common.css">

    <!-- =====================================================
         ORDER CSS
    ====================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/order.css">

</head>

<body>

<!-- =====================================================
     SIDEBAR
====================================================== -->

<%@ include file="includes/sidebar.jsp" %>


<!-- =====================================================
     MAIN CONTENT
====================================================== -->

<div class="main-content">


    <!-- =================================================
         HEADER
    ================================================== -->

    <header class="admin-header">

        <div class="header-left">

            <button
                type="button"
                class="sidebar-toggle"
                id="sidebarToggle"
                aria-label="Toggle sidebar">

                <i class="fa-solid fa-bars"></i>

            </button>

            <h1 class="header-title">
                Orders
            </h1>

        </div>


        <!-- SEARCH -->

        <div class="header-search">

            <input
                type="text"
                id="globalSearch"
                placeholder="Search here..."
                autocomplete="off">

            <i class="fa-solid fa-magnifying-glass"></i>

        </div>


        <!-- RIGHT -->

        <div class="header-right">

            <div class="header-date">

                <i class="fa-regular fa-calendar"></i>

                <div>

                    <strong id="currentDate">
                        Loading...
                    </strong>

                    <span id="currentDay">
                        Loading...
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="notification-btn"
                id="notificationBtn"
                aria-label="Notifications">

                <i class="fa-regular fa-bell"></i>

                <span
                    class="notification-count"
                    id="notificationCount">

                    0

                </span>

            </button>


            <div
                class="admin-profile"
                id="adminProfile">

                <div class="profile-avatar">

                    <i class="fa-solid fa-user-tie"></i>

                </div>

                <div class="profile-info">

                    <strong id="adminName">
                        Admin
                    </strong>

                    <span id="adminRole">
                        Administrator
                    </span>

                </div>

                <i class="fa-solid fa-chevron-down"></i>

            </div>

        </div>

    </header>


    <!-- =================================================
         ORDERS PAGE
    ================================================== -->

    <main class="order-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="order-page-header">

            <div>

                <h1>
                    Orders
                </h1>

                <div class="order-breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Orders
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="btn-add-order"
                id="openAddOrderBtn">

                <i class="fa-solid fa-plus"></i>

                Create Order

            </button>

        </div>


        <!-- =================================================
             ORDER STATS
        ================================================== -->

        <div class="order-stats">

            <div class="order-stat-card">

                <div class="order-stat-icon total">

                    <i class="fa-solid fa-receipt"></i>

                </div>

                <div>

                    <span>
                        Total Orders
                    </span>

                    <strong id="statTotalOrders">
                        0
                    </strong>

                </div>

            </div>


            <div class="order-stat-card">

                <div class="order-stat-icon pending">

                    <i class="fa-solid fa-clock"></i>

                </div>

                <div>

                    <span>
                        Pending
                    </span>

                    <strong id="statPendingOrders">
                        0
                    </strong>

                </div>

            </div>


            <div class="order-stat-card">

                <div class="order-stat-icon preparing">

                    <i class="fa-solid fa-fire-burner"></i>

                </div>

                <div>

                    <span>
                        Preparing
                    </span>

                    <strong id="statPreparingOrders">
                        0
                    </strong>

                </div>

            </div>


            <div class="order-stat-card">

                <div class="order-stat-icon completed">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <div>

                    <span>
                        Completed
                    </span>

                    <strong id="statCompletedOrders">
                        0
                    </strong>

                </div>

            </div>

        </div>


        <!-- =================================================
             ORDERS TABLE
        ================================================== -->

        <section class="orders-main-card">


            <!-- TOOLBAR -->

            <div class="orders-toolbar">

                <div class="orders-search">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="orderSearch"
                        placeholder="Search order, customer...">

                </div>


                <div class="orders-filter">

                    <select id="orderStatusFilter">

                        <option value="ALL">
                            All Status
                        </option>

                        <option value="PENDING">
                            Pending
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

                        <option value="COMPLETED">
                            Completed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>


                <button
                    type="button"
                    class="btn-refresh-orders"
                    id="refreshOrders">

                    <i class="fa-solid fa-rotate"></i>

                    Refresh

                </button>

            </div>


            <!-- TABLE -->

            <div class="orders-table-wrapper">

                <table class="orders-table">

                    <thead>

                        <tr>

                            <th>
                                Order ID
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Table
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody id="ordersTableBody">

                        <tr>

                            <td
                                colspan="7"
                                class="order-loading">

                                <i class="fa-solid fa-spinner fa-spin"></i>

                                Loading orders...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>


            <!-- FOOTER -->

            <div class="orders-table-footer">

                <div
                    id="orderShowingText"
                    class="order-showing-text">

                    Showing 0 orders

                </div>


                <div class="order-pagination">

                    <button
                        type="button"
                        id="orderFirstPage">

                        First

                    </button>

                    <button
                        type="button"
                        id="orderPrevPage">

                        Prev

                    </button>

                    <button
                        type="button"
                        id="orderCurrentPage"
                        class="active">

                        1

                    </button>

                    <button
                        type="button"
                        id="orderNextPage">

                        Next

                    </button>

                    <button
                        type="button"
                        id="orderLastPage">

                        Last

                    </button>

                </div>

            </div>

        </section>


        <!-- =================================================
             FOOTER
        ================================================== -->

        <div class="order-footer">

            <span>

                © 2026
                <strong>Sankalp</strong>
                Restaurant Management System

            </span>

            <span>
                Version 1.0.0
            </span>

        </div>

    </main>

</div>


<!-- =====================================================
     CREATE ORDER PANEL
====================================================== -->

<div
    class="order-panel-overlay"
    id="orderPanelOverlay">

    <section
        class="order-create-panel"
        id="orderCreatePanel">


        <div class="order-panel-header">

            <h2>
                Create New Order
            </h2>

            <button
                type="button"
                id="closeOrderPanel"
                class="order-panel-close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <form id="orderForm">


            <!-- CUSTOMER -->

            <div class="order-form-group">

                <label for="orderCustomer">

                    Customer

                    <span>*</span>

                </label>

                <div class="order-select-wrapper">

                    <select
                        id="orderCustomer"
                        required>

                        <option value="">
                            Select customer
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>

            </div>


            <!-- TABLE -->

            <div class="order-form-group">

                <label for="orderTable">

                    Table

                    <span>*</span>

                </label>

                <div class="order-select-wrapper">

                    <select
                        id="orderTable"
                        required>

                        <option value="">
                            Select table
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>

            </div>


            <!-- MENU ITEM -->

            <div class="order-form-group">

                <label for="orderMenuItem">

                    Menu Item

                    <span>*</span>

                </label>

                <div class="order-select-wrapper">

                    <select
                        id="orderMenuItem">

                        <option value="">
                            Select menu item
                        </option>

                    </select>

                    <i class="fa-solid fa-chevron-down"></i>

                </div>

            </div>


            <!-- QUANTITY -->

            <div class="order-form-group">

                <label>

                    Quantity

                </label>

                <div class="order-quantity-row">

                    <button
                        type="button"
                        id="decreaseQty">

                        <i class="fa-solid fa-minus"></i>

                    </button>

                    <input
                        type="number"
                        id="orderQuantity"
                        value="1"
                        min="1"
                        max="99">

                    <button
                        type="button"
                        id="increaseQty">

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

            </div>


            <!-- ADD ITEM -->

            <button
                type="button"
                class="btn-add-order-item"
                id="addOrderItemBtn">

                <i class="fa-solid fa-cart-plus"></i>

                Add Item

            </button>


            <!-- CART -->

            <div class="order-cart-section">

                <div class="order-cart-title">

                    <span>
                        Order Items
                    </span>

                    <strong id="cartCount">
                        0
                    </strong>

                </div>


                <div
                    class="order-cart-list"
                    id="orderCartList">

                    <div class="empty-cart">

                        <i class="fa-solid fa-basket-shopping"></i>

                        <span>
                            No items added yet
                        </span>

                    </div>

                </div>

            </div>


            <!-- TOTALS -->

            <div class="order-summary">

                <div>

                    <span>
                        Subtotal
                    </span>

                    <strong id="orderSubtotal">
                        ₹0.00
                    </strong>

                </div>

                <div>

                    <span>
                        GST (5%)
                    </span>

                    <strong id="orderGST">
                        ₹0.00
                    </strong>

                </div>

                <div>

                    <span>
                        Discount
                    </span>

                    <strong id="orderDiscount">
                        ₹0.00
                    </strong>

                </div>

                <div class="order-total-row">

                    <span>
                        Total
                    </span>

                    <strong id="orderGrandTotal">
                        ₹0.00
                    </strong>

                </div>

            </div>


            <!-- ACTION -->

            <div class="order-panel-actions">

                <button
                    type="button"
                    class="btn-order-cancel"
                    id="cancelOrderBtn">

                    Cancel

                </button>

                <button
                    type="submit"
                    class="btn-order-submit"
                    id="placeOrderBtn">

                    <i class="fa-solid fa-check"></i>

                    Place Order

                </button>

            </div>

        </form>

    </section>

</div>


<!-- =====================================================
     VIEW ORDER MODAL
====================================================== -->

<div
    class="order-view-overlay"
    id="orderViewOverlay">

    <section class="order-view-modal">

        <div class="order-view-header">

            <div>

                <h2>
                    Order Details
                </h2>

                <span id="viewOrderId">
                    #ORD-
                </span>

            </div>

            <button
                type="button"
                id="closeOrderView">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <div class="order-view-summary">

            <div>

                <span>
                    Customer
                </span>

                <strong id="viewCustomer">
                    -
                </strong>

            </div>

            <div>

                <span>
                    Table
                </span>

                <strong id="viewTable">
                    -
                </strong>

            </div>

            <div>

                <span>
                    Status
                </span>

                <strong id="viewStatus"
                        class="order-status-badge pending">

                    PENDING

                </strong>

            </div>

            <div>

                <span>
                    Total
                </span>

                <strong id="viewTotal">
                    ₹0.00
                </strong>

            </div>

        </div>


        <div class="order-details-table-wrapper">

            <table class="order-details-table">

                <thead>

                    <tr>

                        <th>
                            Item
                        </th>

                        <th>
                            Quantity
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Subtotal
                        </th>

                    </tr>

                </thead>

                <tbody id="orderDetailsBody">

                    <tr>

                        <td
                            colspan="4"
                            class="order-loading">

                            Loading details...

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>


        <div class="order-view-actions">

            <button
                type="button"
                class="btn-order-close"
                id="closeOrderViewBottom">

                Close

            </button>

        </div>

    </section>

</div>


<!-- =====================================================
     DELETE / CANCEL CONFIRM
====================================================== -->

<div
    class="order-cancel-overlay"
    id="orderCancelOverlay">

    <section class="order-cancel-modal">

        <div class="order-danger-icon">

            <i class="fa-solid fa-ban"></i>

        </div>

        <h3>
            Cancel Order?
        </h3>

        <p>
            Are you sure you want to cancel this order?
            This action cannot be undone.
        </p>

        <div class="order-cancel-actions">

            <button
                type="button"
                id="cancelCancelOrder">

                Keep Order

            </button>

            <button
                type="button"
                id="confirmCancelOrder">

                Cancel Order

            </button>

        </div>

    </section>

</div>


<!-- =====================================================
     TOAST
====================================================== -->

<div
    class="order-toast"
    id="orderToast">

    <i class="fa-solid fa-circle-check"></i>

    <span id="orderToastText">
        Success
    </span>

</div>


<!-- =====================================================
     COMMON JS
====================================================== -->

<script src="${pageContext.request.contextPath}/js/common.js"></script>


<!-- =====================================================
     ORDER JS
====================================================== -->

<script src="${pageContext.request.contextPath}/js/order.js"></script>

</body>

</html>