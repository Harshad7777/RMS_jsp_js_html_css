<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String contextPath = request.getContextPath();
%>

<meta
    name="app-context"
    content="<%= contextPath %>"
>

<!-- COMMON HEADER -->
<%@ include file="includes/header.jsp" %>

<!-- COMMON SIDEBAR -->
<%@ include file="includes/sidebar.jsp" %>


<!-- =========================================================
     MAIN CONTENT
========================================================= -->

<div class="main-content">

    <main class="kitchen-page">


        <!-- =================================================
             PAGE HEADER
        ================================================== -->

        <div class="page-header">

            <div class="page-title-area">

                <h1>
                    Kitchen Dashboard
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="active">
                        Kitchen
                    </span>

                </div>

            </div>


            <div class="kitchen-header-actions">

              <!--   <div class="kitchen-date">

                    <i class="fa-regular fa-calendar"></i>

                    <div>

                        <strong id="kitchenDate">
                            --
                        </strong>

                        <small id="kitchenTime">
                            --
                        </small>

                    </div>

                </div> -->


                <button
                    type="button"
                    class="refresh-btn"
                    id="refreshKitchenBtn">

                    <i class="fa-solid fa-rotate"></i>

                    Refresh

                </button>

            </div>

        </div>


        <!-- =================================================
             KITCHEN STATISTICS
        ================================================== -->

        <section class="kitchen-stats">


            <div class="kitchen-stat-card">

                <div class="kitchen-stat-icon new-icon">

                    <i class="fa-solid fa-bell"></i>

                </div>

                <div>

                    <span>
                        New Orders
                    </span>

                    <h2 id="newOrdersCount">
                        0
                    </h2>

                    <small>
                        Waiting for acceptance
                    </small>

                </div>

            </div>


            <div class="kitchen-stat-card">

                <div class="kitchen-stat-icon accepted-icon">

                    <i class="fa-solid fa-check"></i>

                </div>

                <div>

                    <span>
                        Accepted
                    </span>

                    <h2 id="acceptedOrdersCount">
                        0
                    </h2>

                    <small>
                        Ready to prepare
                    </small>

                </div>

            </div>


            <div class="kitchen-stat-card">

                <div class="kitchen-stat-icon preparing-icon">

                    <i class="fa-solid fa-fire-burner"></i>

                </div>

                <div>

                    <span>
                        Preparing
                    </span>

                    <h2 id="preparingOrdersCount">
                        0
                    </h2>

                    <small>
                        Currently cooking
                    </small>

                </div>

            </div>


            <div class="kitchen-stat-card">

                <div class="kitchen-stat-icon ready-icon">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <div>

                    <span>
                        Ready
                    </span>

                    <h2 id="readyOrdersCount">
                        0
                    </h2>

                    <small>
                        Waiting for serving
                    </small>

                </div>

            </div>


        </section>


        <!-- =================================================
             KITCHEN TOOLBAR
        ================================================== -->

        <section class="kitchen-toolbar">


            <div class="kitchen-tabs">


                <button
                    type="button"
                    class="kitchen-tab active"
                    data-status="ALL">

                    All Orders

                    <span id="allOrdersBadge">
                        0
                    </span>

                </button>


                <button
                    type="button"
                    class="kitchen-tab"
                    data-status="NEW">

                    New

                    <span id="newTabBadge">
                        0
                    </span>

                </button>


                <button
                    type="button"
                    class="kitchen-tab"
                    data-status="ACCEPTED">

                    Accepted

                    <span id="acceptedTabBadge">
                        0
                    </span>

                </button>


                <button
                    type="button"
                    class="kitchen-tab"
                    data-status="PREPARING">

                    Preparing

                    <span id="preparingTabBadge">
                        0
                    </span>

                </button>


                <button
                    type="button"
                    class="kitchen-tab"
                    data-status="READY">

                    Ready

                    <span id="readyTabBadge">
                        0
                    </span>

                </button>


                <button
                    type="button"
                    class="kitchen-tab"
                    data-status="SERVED">

                    Served

                    <span id="servedTabBadge">
                        0
                    </span>

                </button>


            </div>


            <div class="kitchen-search">

                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    id="kitchenSearch"
                    placeholder="Search order, customer or table..."
                    autocomplete="off"
                >

            </div>


        </section>


        <!-- =================================================
             KITCHEN BOARD
        ================================================== -->

        <section class="kitchen-board">


            <div
                id="kitchenLoading"
                class="kitchen-loading"
            >

                <i class="fa-solid fa-spinner fa-spin"></i>

                <span>
                    Loading kitchen orders...
                </span>

            </div>


            <div
                id="kitchenEmpty"
                class="kitchen-empty"
                style="display:none;"
            >

                <i class="fa-solid fa-utensils"></i>

                <h3>
                    No Kitchen Orders
                </h3>

                <p>
                    There are no active kitchen orders.
                </p>

            </div>


            <div
                id="kitchenOrdersGrid"
                class="kitchen-orders-grid"
            >
            </div>


        </section>


    </main>

</div>


<!-- =========================================================
     ORDER DETAILS MODAL
========================================================= -->

<div
    class="kitchen-modal"
    id="orderDetailsModal"
>


    <div class="kitchen-modal-overlay"></div>


    <div class="kitchen-modal-content">


        <div class="modal-header">

            <div>

                <h2>
                    Order Details
                </h2>

                <span id="modalOrderNumber">
                    --
                </span>

            </div>


            <button
                type="button"
                id="closeOrderModal"
                class="modal-close"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <div class="modal-body">


            <div class="modal-info-grid">


                <div>

                    <label>
                        Customer
                    </label>

                    <strong id="modalCustomer">
                        --
                    </strong>

                </div>


                <div>

                    <label>
                        Table
                    </label>

                    <strong id="modalTable">
                        --
                    </strong>

                </div>


                <div>

                    <label>
                        Order Date
                    </label>

                    <strong id="modalDate">
                        --
                    </strong>

                </div>


                <div>

                    <label>
                        Status
                    </label>

                    <span
                        id="modalStatus"
                        class="order-status"
                    >
                        --
                    </span>

                </div>


            </div>


            <div class="modal-items">


                <h3>
                    Order Items
                </h3>


                <div id="modalItems">
                </div>


            </div>


            <div class="modal-note">


                <h3>
                    Kitchen Note
                </h3>


                <p id="modalKitchenNote">
                    No kitchen note.
                </p>


            </div>


        </div>

    </div>

</div>


<!-- =========================================================
     TOAST
========================================================= -->

<div
    id="kitchenToast"
    class="kitchen-toast"
>

    <i class="fa-solid fa-circle-check"></i>

    <span id="kitchenToastText">
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
     KITCHEN JS
========================================================= -->

<script
    src="<%= contextPath %>/js/chef.js">
</script>


<!-- COMMON FOOTER -->

<%@ include file="includes/footer.jsp" %>