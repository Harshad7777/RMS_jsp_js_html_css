"use strict";

/* =========================================================
   SANKALP RMS - ORDER MANAGEMENT
========================================================= */

console.log("======================================");
console.log("Sankalp Order Management Loaded");
console.log("======================================");


/* =========================================================
   CONFIGURATION
========================================================= */

const BACKEND_URL =
    "http://localhost:8080";

const ORDER_API =
    BACKEND_URL + "/api/order";

const CUSTOMER_API =
    BACKEND_URL + "/api/customer";

const MENU_API =
    BACKEND_URL + "/api/menu";


/* =========================================================
   GLOBAL DATA
========================================================= */

let allOrders = [];

let filteredOrders = [];

let customers = [];

let menuItems = [];

let orderCart = [];

let currentOrderPage = 1;

const ORDER_PAGE_SIZE = 10;

let orderToCancel = null;


/* =========================================================
   CONTEXT PATH
========================================================= */

const contextMeta =
    document.querySelector(
        'meta[name="app-context"]'
    );

const CONTEXT_PATH =
    contextMeta
        ? contextMeta.getAttribute("content") || ""
        : "";


/* =========================================================
   TOKEN
========================================================= */

function getToken() {

    return localStorage.getItem("token");

}


/* =========================================================
   HEADERS
========================================================= */

function getHeaders() {

    const token = getToken();

    const headers = {

        "Accept":
            "application/json",

        "Content-Type":
            "application/json"

    };

    if (token) {

        headers["Authorization"] =
            "Bearer " + token;

    }

    return headers;

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Order page initialized"
        );

        const token =
            getToken();

        if (!token) {

            console.warn(
                "JWT token not found"
            );

            window.location.href =
                CONTEXT_PATH +
                "/login.jsp";

            return;

        }

        initializeOrderPage();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

async function initializeOrderPage() {

    setCurrentDate();

    loadAdminInfo();

    setupOrderEvents();

    populateTableSelect();

    await Promise.all([
        loadCustomers(),
        loadMenuItems(),
        loadOrders()
    ]);

}


/* =========================================================
   SETUP EVENTS
========================================================= */

function setupOrderEvents() {

    /* =====================================================
       CREATE ORDER
    ===================================================== */

    const openButton =
        document.getElementById(
            "openAddOrderBtn"
        );

    if (openButton) {

        openButton.addEventListener(
            "click",
            openCreateOrderPanel
        );

    }


    /* =====================================================
       CLOSE CREATE PANEL
    ===================================================== */

    const closePanel =
        document.getElementById(
            "closeOrderPanel"
        );

    if (closePanel) {

        closePanel.addEventListener(
            "click",
            closeCreateOrderPanel
        );

    }


    const cancelPanel =
        document.getElementById(
            "cancelOrderBtn"
        );

    if (cancelPanel) {

        cancelPanel.addEventListener(
            "click",
            closeCreateOrderPanel
        );

    }


    /* =====================================================
       ORDER FORM
    ===================================================== */

    const orderForm =
        document.getElementById(
            "orderForm"
        );

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                createOrder();

            }
        );

    }


    /* =====================================================
       ADD ITEM
    ===================================================== */

    const addItemButton =
        document.getElementById(
            "addOrderItemBtn"
        );

    if (addItemButton) {

        addItemButton.addEventListener(
            "click",
            addItemToCart
        );

    }


    /* =====================================================
       QUANTITY
    ===================================================== */

    const decreaseQty =
        document.getElementById(
            "decreaseQty"
        );

    if (decreaseQty) {

        decreaseQty.addEventListener(
            "click",
            decreaseQuantity
        );

    }


    const increaseQty =
        document.getElementById(
            "increaseQty"
        );

    if (increaseQty) {

        increaseQty.addEventListener(
            "click",
            increaseQuantity
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const search =
        document.getElementById(
            "orderSearch"
        );

    if (search) {

        search.addEventListener(
            "input",
            filterOrders
        );

    }


    /* =====================================================
       GLOBAL HEADER SEARCH
    ===================================================== */

    const globalSearch =
        document.getElementById(
            "globalSearch"
        );

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                const text =
                    globalSearch.value;

                if (search) {

                    search.value =
                        text;

                    filterOrders();

                }

            }
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    const statusFilter =
        document.getElementById(
            "orderStatusFilter"
        );

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterOrders
        );

    }


    /* =====================================================
       REFRESH
    ===================================================== */

    const refresh =
        document.getElementById(
            "refreshOrders"
        );

    if (refresh) {

        refresh.addEventListener(
            "click",
            loadOrders
        );

    }


    /* =====================================================
       PAGINATION
    ===================================================== */

    const firstPage =
        document.getElementById(
            "orderFirstPage"
        );

    if (firstPage) {

        firstPage.addEventListener(
            "click",
            function () {

                currentOrderPage = 1;

                renderOrders();

            }
        );

    }


    const prevPage =
        document.getElementById(
            "orderPrevPage"
        );

    if (prevPage) {

        prevPage.addEventListener(
            "click",
            function () {

                if (
                    currentOrderPage > 1
                ) {

                    currentOrderPage--;

                    renderOrders();

                }

            }
        );

    }


    const nextPage =
        document.getElementById(
            "orderNextPage"
        );

    if (nextPage) {

        nextPage.addEventListener(
            "click",
            function () {

                const totalPages =
                    getOrderTotalPages();

                if (
                    currentOrderPage <
                    totalPages
                ) {

                    currentOrderPage++;

                    renderOrders();

                }

            }
        );

    }


    const lastPage =
        document.getElementById(
            "orderLastPage"
        );

    if (lastPage) {

        lastPage.addEventListener(
            "click",
            function () {

                const totalPages =
                    getOrderTotalPages();

                currentOrderPage =
                    totalPages || 1;

                renderOrders();

            }
        );

    }


    /* =====================================================
       VIEW MODAL
    ===================================================== */

    const closeOrderViewButton =
        document.getElementById(
            "closeOrderView"
        );

    if (closeOrderViewButton) {

        closeOrderViewButton.addEventListener(
            "click",
            closeOrderView
        );

    }


    const closeOrderViewBottom =
        document.getElementById(
            "closeOrderViewBottom"
        );

    if (closeOrderViewBottom) {

        closeOrderViewBottom.addEventListener(
            "click",
            closeOrderView
        );

    }


    const orderViewOverlay =
        document.getElementById(
            "orderViewOverlay"
        );

    if (orderViewOverlay) {

        orderViewOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    orderViewOverlay
                ) {

                    closeOrderView();

                }

            }
        );

    }


    /* =====================================================
       CANCEL MODAL
    ===================================================== */

    const cancelCancelOrder =
        document.getElementById(
            "cancelCancelOrder"
        );

    if (cancelCancelOrder) {

        cancelCancelOrder.addEventListener(
            "click",
            closeCancelModal
        );

    }


    const confirmCancelButton =
        document.getElementById(
            "confirmCancelOrder"
        );

    if (confirmCancelButton) {

        confirmCancelButton.addEventListener(
            "click",
            confirmCancelOrder
        );

    }


    const orderCancelOverlay =
        document.getElementById(
            "orderCancelOverlay"
        );

    if (orderCancelOverlay) {

        orderCancelOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    orderCancelOverlay
                ) {

                    closeCancelModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCreateOrderPanel();

                closeOrderView();

                closeCancelModal();

            }

        }
    );

}


/* =========================================================
   LOAD CUSTOMERS
========================================================= */

async function loadCustomers() {

    try {

        const response =
            await fetch(
                CUSTOMER_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

        console.log(
            "Customer HTTP Status:",
            response.status
        );

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "CUSTOMER API ERROR:",
                errorText
            );

            throw new Error(
                "Unable to load customers. HTTP " +
                response.status
            );

        }

        const data =
            await response.json();

        customers =
            Array.isArray(data)
                ? data
                : [];

        populateCustomerSelect();

        console.log(
            "Customers loaded:",
            customers.length
        );

    }
    catch (error) {

        console.error(
            "CUSTOMER LOAD ERROR:",
            error
        );

        showToast(
            error.message ||
            "Unable to load customers.",
            "error"
        );

    }

}


/* =========================================================
   POPULATE CUSTOMER SELECT
========================================================= */

function populateCustomerSelect() {

    const select =
        document.getElementById(
            "orderCustomer"
        );

    if (!select) {

        return;

    }

    let html =
        `<option value="">Select customer</option>`;

    customers.forEach(
        function (customer) {

            const id =
                customer.customerId ??
                customer.id;

            const name =
                customer.fullName ||
                customer.customerName ||
                customer.name ||
                "Unknown Customer";

            const status =
                String(
                    customer.status ||
                    "ACTIVE"
                ).toUpperCase();

            if (
                status === "INACTIVE"
            ) {

                return;

            }

            html += `

                <option value="${escapeHTML(id)}">

                    ${escapeHTML(name)}

                </option>

            `;

        }
    );

    select.innerHTML =
        html;

}


/* =========================================================
   LOAD MENU
========================================================= */

async function loadMenuItems() {

    try {

        const response =
            await fetch(
                MENU_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

        console.log(
            "Menu HTTP Status:",
            response.status
        );

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "MENU API ERROR:",
                errorText
            );

            throw new Error(
                "Unable to load menu. HTTP " +
                response.status
            );

        }

        const data =
            await response.json();

        menuItems =
            Array.isArray(data)
                ? data
                : [];

        menuItems =
            menuItems.filter(
                function (item) {

                    return String(
                        item.status ||
                        "AVAILABLE"
                    ).toUpperCase() ===
                    "AVAILABLE";

                }
            );

        populateMenuSelect();

        console.log(
            "Menu loaded:",
            menuItems.length
        );

    }
    catch (error) {

        console.error(
            "MENU LOAD ERROR:",
            error
        );

        showToast(
            error.message ||
            "Unable to load menu items.",
            "error"
        );

    }

}


/* =========================================================
   POPULATE MENU SELECT
========================================================= */

function populateMenuSelect() {

    const select =
        document.getElementById(
            "orderMenuItem"
        );

    if (!select) {

        return;

    }

    let html =
        `<option value="">Select menu item</option>`;

    menuItems.forEach(
        function (item) {

            const id =
                item.itemId;

            const name =
                item.itemName ||
                "Menu Item";

            const price =
                Number(
                    item.price || 0
                );

            html += `

                <option value="${escapeHTML(id)}">

                    ${escapeHTML(name)}
                    - ₹${price.toFixed(2)}

                </option>

            `;

        }
    );

    select.innerHTML =
        html;

}


/* =========================================================
   TABLE SELECT
========================================================= */

function populateTableSelect() {

    const select =
        document.getElementById(
            "orderTable"
        );

    if (!select) {

        return;

    }

    let html =
        `<option value="">Select table</option>`;

    /*
     * Temporary table list.
     *
     * Your OrderDTO requires tableId.
     * Replace this later with GET /api/table
     * once TableController is connected.
     */

    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        html += `

            <option value="${i}">
                Table ${i}
            </option>

        `;

    }

    select.innerHTML =
        html;

}


/* =========================================================
   LOAD ORDERS
========================================================= */

async function loadOrders() {

    const tbody =
        document.getElementById(
            "ordersTableBody"
        );

    if (!tbody) {

        console.error(
            "ordersTableBody element not found."
        );

        return;

    }

    tbody.innerHTML = `

        <tr>

            <td
                colspan="7"
                class="order-loading">

                <i class="fa-solid fa-spinner fa-spin"></i>

                Loading orders...

            </td>

        </tr>

    `;

    try {

        const response =
            await fetch(
                ORDER_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

        console.log(
            "Order HTTP Status:",
            response.status
        );

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        if (!response.ok) {

            const text =
                await response.text();

            console.error(
                "ORDER API ERROR:",
                text
            );

            throw new Error(
                "Unable to load orders. HTTP " +
                response.status
            );

        }

        const data =
            await response.json();

        console.log(
            "ORDER API RESPONSE:",
            data
        );

        allOrders =
            Array.isArray(data)
                ? data
                : [];

        filteredOrders =
            [...allOrders];

        currentOrderPage =
            1;

        renderOrders();

        updateOrderStats();

    }
    catch (error) {

        console.error(
            "LOAD ORDERS ERROR:",
            error
        );

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="order-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    ${escapeHTML(
                        error.message ||
                        "Failed to load orders."
                    )}

                </td>

            </tr>

        `;

        updateOrderStats();

    }

}


/* =========================================================
   FILTER ORDERS
========================================================= */

function filterOrders() {

    const search =
        document.getElementById(
            "orderSearch"
        );

    const status =
        document.getElementById(
            "orderStatusFilter"
        );

    const searchText =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";

    const statusValue =
        status
            ? status.value
            : "ALL";

    filteredOrders =
        allOrders.filter(
            function (order) {

                const customerName =
                    getOrderCustomerName(
                        order
                    ).toLowerCase();

                const orderId =
                    String(
                        getOrderId(
                            order
                        )
                    ).toLowerCase();

                const tableNumber =
                    String(
                        getOrderTableNumber(
                            order
                        )
                    ).toLowerCase();

                const amount =
                    String(
                        getOrderAmount(
                            order
                        )
                    ).toLowerCase();

                const orderStatus =
                    getOrderStatus(
                        order
                    ).toUpperCase();

                const searchMatch =
                    customerName.includes(
                        searchText
                    ) ||
                    orderId.includes(
                        searchText
                    ) ||
                    tableNumber.includes(
                        searchText
                    ) ||
                    amount.includes(
                        searchText
                    );

                const statusMatch =
                    statusValue === "ALL" ||
                    orderStatus ===
                    statusValue;

                return (
                    searchMatch &&
                    statusMatch
                );

            }
        );

    currentOrderPage =
        1;

    renderOrders();

}


/* =========================================================
   RENDER ORDERS
========================================================= */

function renderOrders() {

    const tbody =
        document.getElementById(
            "ordersTableBody"
        );

    if (!tbody) {

        return;

    }

    const totalPages =
        getOrderTotalPages();

    if (
        totalPages > 0 &&
        currentOrderPage >
        totalPages
    ) {

        currentOrderPage =
            totalPages;

    }

    if (
        totalPages === 0
    ) {

        currentOrderPage =
            1;

    }

    const startIndex =
        (
            currentOrderPage -
            1
        ) *
        ORDER_PAGE_SIZE;

    const pageOrders =
        filteredOrders.slice(
            startIndex,
            startIndex +
            ORDER_PAGE_SIZE
        );

    if (
        pageOrders.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="order-empty">

                    <i class="fa-solid fa-receipt"></i>

                    No orders found.

                </td>

            </tr>

        `;

        updateOrderPagination(
            totalPages
        );

        return;

    }

    let rows = "";

    pageOrders.forEach(
        function (order) {

            const id =
                getOrderId(
                    order
                );

            const customerName =
                getOrderCustomerName(
                    order
                );

            /*
             * IMPORTANT:
             * Table number is preferred over table ID.
             */
            const tableNumber =
                getOrderTableNumber(
                    order
                );

            const amount =
                getOrderAmount(
                    order
                );

            const status =
                getOrderStatus(
                    order
                );

            const date =
                getOrderDate(
                    order
                );

            const statusClass =
                getStatusClass(
                    status
                );

            const canCancel =
                ![
                    "CANCELLED",
                    "COMPLETED",
                    "SERVED"
                ].includes(
                    status.toUpperCase()
                );

            rows += `

                <tr>

                    <!-- ORDER ID -->

                    <td>

                        <span class="order-id">

                            #ORD${escapeHTML(id)}

                        </span>

                    </td>


                    <!-- CUSTOMER -->

                    <td>

                        <div
                            class="order-customer-cell">

                            <div
                                class="order-customer-avatar">

                                ${escapeHTML(
                                    getInitials(
                                        customerName
                                    )
                                )}

                            </div>

                            <span>

                                ${escapeHTML(
                                    customerName
                                )}

                            </span>

                        </div>

                    </td>


                    <!-- TABLE -->

					<td>

					    <span class="order-table-number">

					        ${
					            tableNumber
					                ? escapeHTML(
					                    String(tableNumber)
					                  )
					                : "Table -"
					        }

					    </span>

					</td>

                    <!-- AMOUNT -->

                    <td>

                        <span
                            class="order-amount">

                            ₹${formatMoney(
                                amount
                            )}

                        </span>

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="
                                order-status-badge
                                ${statusClass}
                            ">

                            ${escapeHTML(
                                status
                            )}

                        </span>

                    </td>


                    <!-- DATE -->

                    <td>

                        ${escapeHTML(
                            formatDate(
                                date
                            )
                        )}

                    </td>


                    <!-- ACTIONS -->

                    <td>

                        <div
                            class="order-actions">

                            <!-- VIEW -->

                            <button
                                type="button"
                                class="
                                    order-action-btn
                                    order-view-btn
                                "
                                title="View Order"
                                onclick="
                                    viewOrder(
                                        ${Number(id)}
                                    )
                                ">

                                <i class="fa-solid fa-eye"></i>

                            </button>


                            <!-- CANCEL -->

                            <button
                                type="button"
                                class="
                                    order-action-btn
                                    order-cancel-btn
                                "
                                title="Cancel Order"
                                ${canCancel ? "" : "disabled"}
                                onclick="
                                    openCancelModal(
                                        ${Number(id)}
                                    )
                                ">

                                <i class="fa-solid fa-xmark"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );

    tbody.innerHTML =
        rows;

    updateOrderPagination(
        totalPages
    );

}


/* =========================================================
   TOTAL PAGES
========================================================= */

function getOrderTotalPages() {

    return Math.ceil(
        filteredOrders.length /
        ORDER_PAGE_SIZE
    );

}


/* =========================================================
   PAGINATION UI
========================================================= */

function updateOrderPagination(
    totalPages
) {

    const current =
        document.getElementById(
            "orderCurrentPage"
        );

    const first =
        document.getElementById(
            "orderFirstPage"
        );

    const prev =
        document.getElementById(
            "orderPrevPage"
        );

    const next =
        document.getElementById(
            "orderNextPage"
        );

    const last =
        document.getElementById(
            "orderLastPage"
        );

    if (current) {

        current.innerText =
            currentOrderPage;

    }

    if (first) {

        first.disabled =
            currentOrderPage <= 1 ||
            totalPages === 0;

    }

    if (prev) {

        prev.disabled =
            currentOrderPage <= 1 ||
            totalPages === 0;

    }

    if (next) {

        next.disabled =
            totalPages === 0 ||
            currentOrderPage >=
            totalPages;

    }

    if (last) {

        last.disabled =
            totalPages === 0 ||
            currentOrderPage >=
            totalPages;

    }

    const total =
        filteredOrders.length;

    const start =
        total === 0
            ? 0
            : (
                (
                    currentOrderPage -
                    1
                ) *
                ORDER_PAGE_SIZE
            ) + 1;

    const end =
        Math.min(
            currentOrderPage *
            ORDER_PAGE_SIZE,
            total
        );

    const text =
        document.getElementById(
            "orderShowingText"
        );

    if (text) {

        text.innerText =
            total === 0
                ? "Showing 0 orders"
                : `Showing ${start} to ${end} of ${total} orders`;

    }

}


/* =========================================================
   ORDER STATS
========================================================= */

function updateOrderStats() {

    const total =
        allOrders.length;

    let pending =
        0;

    let preparing =
        0;

    let completed =
        0;

    allOrders.forEach(
        function (order) {

            const status =
                getOrderStatus(
                    order
                ).toUpperCase();

            if (
                [
                    "PENDING",
                    "NEW"
                ].includes(
                    status
                )
            ) {

                pending++;

            }

            if (
                [
                    "PREPARING",
                    "ACCEPTED"
                ].includes(
                    status
                )
            ) {

                preparing++;

            }

            if (
                [
                    "COMPLETED",
                    "SERVED"
                ].includes(
                    status
                )
            ) {

                completed++;

            }

        }
    );

    setText(
        "statTotalOrders",
        total
    );

    setText(
        "statPendingOrders",
        pending
    );

    setText(
        "statPreparingOrders",
        preparing
    );

    setText(
        "statCompletedOrders",
        completed
    );

}


/* =========================================================
   OPEN CREATE PANEL
========================================================= */

function openCreateOrderPanel() {

    clearOrderForm();

    const overlay =
        document.getElementById(
            "orderPanelOverlay"
        );

    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE CREATE PANEL
========================================================= */

function closeCreateOrderPanel() {

    const overlay =
        document.getElementById(
            "orderPanelOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearOrderForm() {

    orderCart = [];

    const form =
        document.getElementById(
            "orderForm"
        );

    if (form) {

        form.reset();

    }

    const customer =
        document.getElementById(
            "orderCustomer"
        );

    if (customer) {

        customer.value =
            "";

    }

    const table =
        document.getElementById(
            "orderTable"
        );

    if (table) {

        table.value =
            "";

    }

    const menu =
        document.getElementById(
            "orderMenuItem"
        );

    if (menu) {

        menu.value =
            "";

    }

    const quantity =
        document.getElementById(
            "orderQuantity"
        );

    if (quantity) {

        quantity.value =
            "1";

    }

    renderCart();

}


/* =========================================================
   QUANTITY
========================================================= */

function increaseQuantity() {

    const input =
        document.getElementById(
            "orderQuantity"
        );

    if (!input) {

        return;

    }

    let value =
        Number(
            input.value
        ) || 1;

    value =
        Math.min(
            value + 1,
            99
        );

    input.value =
        value;

}


function decreaseQuantity() {

    const input =
        document.getElementById(
            "orderQuantity"
        );

    if (!input) {

        return;

    }

    let value =
        Number(
            input.value
        ) || 1;

    value =
        Math.max(
            value - 1,
            1
        );

    input.value =
        value;

}


/* =========================================================
   ADD ITEM TO CART
========================================================= */

function addItemToCart() {

    const menuSelect =
        document.getElementById(
            "orderMenuItem"
        );

    const quantityInput =
        document.getElementById(
            "orderQuantity"
        );

    if (
        !menuSelect ||
        !quantityInput
    ) {

        return;

    }

    const itemId =
        Number(
            menuSelect.value
        );

    const quantity =
        Number(
            quantityInput.value
        ) || 1;

    if (!itemId) {

        showToast(
            "Please select a menu item.",
            "error"
        );

        return;

    }

    if (
        quantity < 1
    ) {

        showToast(
            "Quantity must be at least 1.",
            "error"
        );

        return;

    }

    const menu =
        menuItems.find(
            function (item) {

                return Number(
                    item.itemId
                ) ===
                itemId;

            }
        );

    if (!menu) {

        showToast(
            "Selected menu item was not found.",
            "error"
        );

        return;

    }

    const existing =
        orderCart.find(
            function (item) {

                return Number(
                    item.itemId
                ) ===
                itemId;

            }
        );

    if (existing) {

        existing.quantity +=
            quantity;

    }
    else {

        orderCart.push({

            itemId:
                Number(
                    menu.itemId
                ),

            itemName:
                menu.itemName || "",

            price:
                Number(
                    menu.price || 0
                ),

            quantity:
                quantity

        });

    }

    renderCart();

    menuSelect.value =
        "";

    quantityInput.value =
        "1";

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "orderCartList"
        );

    const count =
        document.getElementById(
            "cartCount"
        );

    if (!container) {

        return;

    }

    if (count) {

        count.innerText =
            orderCart.reduce(
                function (
                    total,
                    item
                ) {

                    return total +
                        item.quantity;

                },
                0
            );

    }

    if (
        orderCart.length ===
        0
    ) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-basket-shopping"></i>

                <span>
                    No items added yet
                </span>

            </div>

        `;

        calculateOrderTotal();

        return;

    }

    let html = "";

    orderCart.forEach(
        function (
            item,
            index
        ) {

            const subtotal =
                Number(
                    item.price
                ) *
                Number(
                    item.quantity
                );

            html += `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <strong>

                            ${escapeHTML(
                                item.itemName
                            )}

                        </strong>

                        <span>

                            ${item.quantity}
                            ×
                            ₹${formatMoney(
                                item.price
                            )}

                            =
                            ₹${formatMoney(
                                subtotal
                            )}

                        </span>

                    </div>


                    <div
                        class="cart-item-actions">

                        <button
                            type="button"
                            onclick="
                                decreaseCartItem(
                                    ${index}
                                )
                            ">

                            <i class="fa-solid fa-minus"></i>

                        </button>


                        <button
                            type="button"
                            onclick="
                                increaseCartItem(
                                    ${index}
                                )
                            ">

                            <i class="fa-solid fa-plus"></i>

                        </button>


                        <button
                            type="button"
                            class="cart-remove"
                            onclick="
                                removeCartItem(
                                    ${index}
                                )
                            ">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>

            `;

        }
    );

    container.innerHTML =
        html;

    calculateOrderTotal();

}


/* =========================================================
   CART CONTROLS
========================================================= */

function increaseCartItem(index) {

    if (
        !orderCart[index]
    ) {

        return;

    }

    orderCart[index].quantity++;

    renderCart();

}


function decreaseCartItem(index) {

    if (
        !orderCart[index]
    ) {

        return;

    }

    orderCart[index].quantity--;

    if (
        orderCart[index].quantity <=
        0
    ) {

        orderCart.splice(
            index,
            1
        );

    }

    renderCart();

}


function removeCartItem(index) {

    if (
        !orderCart[index]
    ) {

        return;

    }

    orderCart.splice(
        index,
        1
    );

    renderCart();

}


/* =========================================================
   CALCULATE ORDER TOTAL
========================================================= */

function calculateOrderTotal() {

    const subtotal =
        orderCart.reduce(
            function (
                total,
                item
            ) {

                return total +
                    (
                        Number(
                            item.price
                        ) *
                        Number(
                            item.quantity
                        )
                    );

            },
            0
        );

    const gst =
        subtotal * 0.05;

    const discount =
        0;

    const total =
        subtotal +
        gst -
        discount;

    setText(
        "orderSubtotal",
        "₹" +
        formatMoney(
            subtotal
        )
    );

    setText(
        "orderGST",
        "₹" +
        formatMoney(
            gst
        )
    );

    setText(
        "orderDiscount",
        "₹" +
        formatMoney(
            discount
        )
    );

    setText(
        "orderGrandTotal",
        "₹" +
        formatMoney(
            total
        )
    );

}


/* =========================================================
   CREATE ORDER
========================================================= */

async function createOrder() {

    const customerElement =
        document.getElementById(
            "orderCustomer"
        );

    const tableElement =
        document.getElementById(
            "orderTable"
        );

    const customerId =
        customerElement
            ? Number(
                customerElement.value
            )
            : 0;

    const tableId =
        tableElement
            ? Number(
                tableElement.value
            )
            : 0;

    const staffId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

    if (!customerId) {

        showToast(
            "Please select a customer.",
            "error"
        );

        return;

    }

    if (!tableId) {

        showToast(
            "Please select a table.",
            "error"
        );

        return;

    }

    if (!staffId) {

        showToast(
            "Staff ID is missing. Please login again.",
            "error"
        );

        return;

    }

    if (
        orderCart.length ===
        0
    ) {

        showToast(
            "Please add at least one item.",
            "error"
        );

        return;

    }

    const items =
        orderCart.map(
            function (item) {

                return {

                    orderDetailId:
                        0,

                    orderId:
                        0,

                    itemId:
                        Number(
                            item.itemId
                        ),

                    itemName:
                        item.itemName,

                    quantity:
                        Number(
                            item.quantity
                        ),

                    price:
                        Number(
                            item.price
                        ),

                    subtotal:
                        Number(
                            item.price
                        ) *
                        Number(
                            item.quantity
                        )

                };

            }
        );

    const payload = {

        customerId:
            customerId,

        tableId:
            tableId,

        staffId:
            staffId,

        items:
            items

    };

    console.log(
        "CREATE ORDER PAYLOAD:",
        payload
    );

    const button =
        document.getElementById(
            "placeOrderBtn"
        );

    if (button) {

        button.disabled =
            true;

        button.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            Creating...

        `;

    }

    try {

        const response =
            await fetch(
                ORDER_API,
                {

                    method:
                        "POST",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            payload
                        )

                }
            );

        console.log(
            "Create Order HTTP Status:",
            response.status
        );

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        const data =
            await parseResponse(
                response
            );

        if (!response.ok) {

            throw new Error(
                getServerErrorMessage(
                    data,
                    "Unable to create order."
                )
            );

        }

        console.log(
            "Order created:",
            data
        );

        showToast(
            "Order created successfully.",
            "success"
        );

        closeCreateOrderPanel();

        clearOrderForm();

        await loadOrders();

    }
    catch (error) {

        console.error(
            "CREATE ORDER ERROR:",
            error
        );

        showToast(
            error.message ||
            "Unable to create order.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML = `

                <i class="fa-solid fa-check"></i>

                Place Order

            `;

        }

    }

}


/* =========================================================
   VIEW ORDER
========================================================= */

async function viewOrder(orderId) {

    const overlay =
        document.getElementById(
            "orderViewOverlay"
        );

    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

    setText(
        "viewOrderId",
        "#ORD" +
        orderId
    );

    setText(
        "viewCustomer",
        "Loading..."
    );

    setText(
        "viewTable",
        "Table -"
    );

    setText(
        "viewTotal",
        "₹0.00"
    );

    const detailsBody =
        document.getElementById(
            "orderDetailsBody"
        );

    if (detailsBody) {

        detailsBody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="order-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading details...

                </td>

            </tr>

        `;

    }

    try {

        const orderResponse =
            await fetch(
                ORDER_API +
                "/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method:
                        "GET",

                    headers:
                        getHeaders()

                }
            );

        if (
            orderResponse.status === 401 ||
            orderResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        if (!orderResponse.ok) {

            const errorText =
                await orderResponse.text();

            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to load order."
                )
            );

        }

        const order =
            await orderResponse.json();

        const detailResponse =
            await fetch(
                ORDER_API +
                "/details/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method:
                        "GET",

                    headers:
                        getHeaders()

                }
            );

        if (
            detailResponse.status === 401 ||
            detailResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        if (!detailResponse.ok) {

            const errorText =
                await detailResponse.text();

            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to load order details."
                )
            );

        }

        const details =
            await detailResponse.json();

        setText(
            "viewCustomer",
            getOrderCustomerName(
                order
            )
        );

        /*
         * IMPORTANT:
         * Show actual table number first.
         */
        const tableNumber =
            getOrderTableNumber(
                order
            );

        setText(
            "viewTable",
            tableNumber
                ? String(
                    tableNumber
                )
                : "Table -"
        );

        setText(
            "viewTotal",
            "₹" +
            formatMoney(
                getOrderAmount(
                    order
                )
            )
        );

        const status =
            getOrderStatus(
                order
            );

        const statusElement =
            document.getElementById(
                "viewStatus"
            );

        if (statusElement) {

            statusElement.innerText =
                status;

            statusElement.className =
                "order-status-badge " +
                getStatusClass(
                    status
                );

        }

        renderOrderDetails(
            Array.isArray(details)
                ? details
                : []
        );

    }
    catch (error) {

        console.error(
            "VIEW ORDER ERROR:",
            error
        );

        if (detailsBody) {

            detailsBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="order-empty">

                        ${escapeHTML(
                            error.message ||
                            "Unable to load order details."
                        )}

                    </td>

                </tr>

            `;

        }

        showToast(
            error.message ||
            "Unable to load order.",
            "error"
        );

    }

}


/* =========================================================
   RENDER ORDER DETAILS
========================================================= */

function renderOrderDetails(
    details
) {

    const tbody =
        document.getElementById(
            "orderDetailsBody"
        );

    if (!tbody) {

        return;

    }

    if (
        !details ||
        details.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="order-empty">

                    No order details found.

                </td>

            </tr>

        `;

        return;

    }

    let html = "";

    details.forEach(
        function (item) {

            const name =
                item.itemName ||
                "Menu Item";

            const quantity =
                Number(
                    item.quantity || 0
                );

            const price =
                Number(
                    item.price || 0
                );

            const subtotal =
                Number(
                    item.subtotal ??
                    (
                        quantity *
                        price
                    )
                );

            html += `

                <tr>

                    <td>

                        ${escapeHTML(
                            name
                        )}

                    </td>

                    <td>

                        ${quantity}

                    </td>

                    <td>

                        ₹${formatMoney(
                            price
                        )}

                    </td>

                    <td>

                        ₹${formatMoney(
                            subtotal
                        )}

                    </td>

                </tr>

            `;

        }
    );

    tbody.innerHTML =
        html;

}


/* =========================================================
   CLOSE ORDER VIEW
========================================================= */

function closeOrderView() {

    const overlay =
        document.getElementById(
            "orderViewOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   OPEN CANCEL MODAL
========================================================= */

function openCancelModal(
    orderId
) {

    const id =
        Number(
            orderId
        );

    if (!id) {

        showToast(
            "Invalid order ID.",
            "error"
        );

        return;

    }

    orderToCancel =
        id;

    const overlay =
        document.getElementById(
            "orderCancelOverlay"
        );

    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE CANCEL MODAL
========================================================= */

function closeCancelModal() {

    orderToCancel =
        null;

    const overlay =
        document.getElementById(
            "orderCancelOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CONFIRM CANCEL
========================================================= */

async function confirmCancelOrder() {

    if (!orderToCancel) {

        showToast(
            "No order selected.",
            "error"
        );

        return;

    }

    const orderId =
        orderToCancel;

    const button =
        document.getElementById(
            "confirmCancelOrder"
        );

    if (button) {

        button.disabled =
            true;

        button.innerText =
            "Cancelling...";

    }

    try {

        const response =
            await fetch(
                ORDER_API +
                "/cancel/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method:
                        "PUT",

                    headers:
                        getHeaders()

                }
            );

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }

        const data =
            await parseResponse(
                response
            );

        if (!response.ok) {

            throw new Error(
                getServerErrorMessage(
                    data,
                    "Unable to cancel order."
                )
            );

        }

        closeCancelModal();

        showToast(
            "Order cancelled successfully.",
            "success"
        );

        await loadOrders();

    }
    catch (error) {

        console.error(
            "CANCEL ORDER ERROR:",
            error
        );

        showToast(
            error.message ||
            "Unable to cancel order.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerText =
                "Cancel Order";

        }

    }

}


/* =========================================================
   GET ORDER ID
========================================================= */

function getOrderId(
    order
) {

    if (!order) {

        return "";

    }

    return (
        order.orderId ??
        order.id ??
        ""
    );

}


/* =========================================================
   GET CUSTOMER NAME
========================================================= */

function getOrderCustomerName(
    order
) {

    if (!order) {

        return "Walk-in Customer";

    }

    return (
        order.customerName ||
        order.customer?.fullName ||
        order.customer?.customerName ||
        findCustomerName(
            order.customerId
        ) ||
        "Walk-in Customer"
    );

}


/* =========================================================
   FIND CUSTOMER NAME
========================================================= */

function findCustomerName(
    customerId
) {

    if (!customerId) {

        return "";

    }

    const customer =
        customers.find(
            function (item) {

                return Number(
                    item.customerId ??
                    item.id
                ) ===
                Number(
                    customerId
                );

            }
        );

    if (!customer) {

        return "";

    }

    return (
        customer.fullName ||
        customer.customerName ||
        customer.name ||
        ""
    );

}


/* =========================================================
   GET TABLE NUMBER
========================================================= */

function getOrderTableNumber(order) {

    if (!order) {
        return "";
    }

    // 1. Normal backend response
    if (
        order.tableNumber !== null &&
        order.tableNumber !== undefined &&
        String(order.tableNumber).trim() !== ""
    ) {
        return String(order.tableNumber).trim();
    }

    // 2. Nested table object
    if (
        order.table &&
        order.table.tableNumber !== null &&
        order.table.tableNumber !== undefined &&
        String(order.table.tableNumber).trim() !== ""
    ) {
        return String(
            order.table.tableNumber
        ).trim();
    }

    // 3. snake_case response
    if (
        order.table_number !== null &&
        order.table_number !== undefined &&
        String(order.table_number).trim() !== ""
    ) {
        return String(
            order.table_number
        ).trim();
    }

    // 4. Fall back to table ID
    if (
        order.tableId !== null &&
        order.tableId !== undefined &&
        String(order.tableId).trim() !== ""
    ) {
        return "Table " +
            String(order.tableId).trim();
    }

    // 5. Other possible names
    if (
        order.table_id !== null &&
        order.table_id !== undefined &&
        String(order.table_id).trim() !== ""
    ) {
        return "Table " +
            String(order.table_id).trim();
    }

    return "";
}


/* =========================================================
   GET AMOUNT
========================================================= */

function getOrderAmount(
    order
) {

    if (!order) {

        return 0;

    }

    return Number(
        order.totalAmount ??
        order.total ??
        order.grandTotal ??
        0
    );

}


/* =========================================================
   GET STATUS
========================================================= */

function getOrderStatus(
    order
) {

    if (!order) {

        return "PENDING";

    }

    return String(
        order.status ||
        order.orderStatus ||
        "PENDING"
    ).toUpperCase();

}


/* =========================================================
   GET DATE
========================================================= */

function getOrderDate(
    order
) {

    if (!order) {

        return "";

    }

    return (
        order.orderDate ||
        order.createdAt ||
        order.createdDate ||
        ""
    );

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(
    status
) {

    const value =
        String(
            status || ""
        ).toUpperCase();

    if (
        value === "COMPLETED"
    ) {

        return "completed";

    }

    if (
        value === "SERVED"
    ) {

        return "served";

    }

    if (
        value === "READY"
    ) {

        return "ready";

    }

    if (
        value === "PREPARING"
    ) {

        return "preparing";

    }

    if (
        value === "ACCEPTED"
    ) {

        return "accepted";

    }

    if (
        value === "CANCELLED" ||
        value === "CANCELED"
    ) {

        return "cancelled";

    }

    return "pending";

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(
    name
) {

    const value =
        String(
            name || ""
        ).trim();

    if (!value) {

        return "CU";

    }

    const words =
        value.split(
            /\s+/
        );

    if (
        words.length === 1
    ) {

        return value
            .substring(
                0,
                2
            )
            .toUpperCase();

    }

    return (
        words[0].charAt(0) +
        words[1].charAt(0)
    ).toUpperCase();

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(
    value
) {

    const number =
        Number(
            value
        ) || 0;

    return number.toLocaleString(
        "en-IN",
        {

            minimumFractionDigits:
                2,

            maximumFractionDigits:
                2

        }
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }

    const date =
        new Date(
            value
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }

    return date.toLocaleDateString(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    );

}


/* =========================================================
   PARSE RESPONSE
========================================================= */

async function parseResponse(
    response
) {

    const text =
        await response.text();

    if (!text) {

        return "";

    }

    try {

        return JSON.parse(
            text
        );

    }
    catch (error) {

        return text;

    }

}


/* =========================================================
   SERVER ERROR MESSAGE
========================================================= */

function getServerErrorMessage(
    data,
    defaultMessage
) {

    if (!data) {

        return defaultMessage;

    }

    if (
        typeof data ===
        "object"
    ) {

        return (
            data.message ||
            data.error ||
            data.details ||
            defaultMessage
        );

    }

    const text =
        String(
            data
        )
        .replace(
            /<[^>]*>/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

    return (
        text &&
        text.length < 300
    )
        ? text
        : defaultMessage;

}


/* =========================================================
   CURRENT DATE
========================================================= */

function setCurrentDate() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );

    const dayElement =
        document.getElementById(
            "currentDay"
        );

    if (
        !dateElement ||
        !dayElement
    ) {

        return;

    }

    const now =
        new Date();

    dateElement.innerText =
        now.toLocaleDateString(
            "en-US",
            {

                month:
                    "long",

                day:
                    "numeric",

                year:
                    "numeric"

            }
        );

    dayElement.innerText =
        now.toLocaleDateString(
            "en-US",
            {

                weekday:
                    "long"

            }
        );

}


/* =========================================================
   ADMIN INFO
========================================================= */

function loadAdminInfo() {

    const name =
        document.getElementById(
            "adminName"
        );

    const username =
        localStorage.getItem(
            "username"
        );

    if (
        name &&
        username
    ) {

        name.innerText =
            username;

    }

    const roleElement =
        document.getElementById(
            "adminRole"
        );

    const role =
        localStorage.getItem(
            "role"
        );

    if (
        roleElement &&
        role
    ) {

        roleElement.innerText =
            role === "ADMIN"
                ? "Administrator"
                : role;

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "orderToast"
        );

    const text =
        document.getElementById(
            "orderToastText"
        );

    if (!toast) {

        alert(message);

        return;

    }

    if (text) {

        text.innerText =
            message;

    }

    toast.classList.remove(
        "success",
        "error",
        "show"
    );

    toast.classList.add(
        type
    );

    requestAnimationFrame(
        function () {

            toast.classList.add(
                "show"
            );

        }
    );

    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =========================================================
   UNAUTHORIZED
========================================================= */

function handleUnauthorized() {

    console.warn(
        "Session expired or unauthorized."
    );

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "userId"
    );

    localStorage.removeItem(
        "username"
    );

    localStorage.removeItem(
        "role"
    );

    localStorage.removeItem(
        "chefId"
    );

    window.location.href =
        CONTEXT_PATH +
        "/login.jsp";

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );

    if (element) {

        element.innerText =
            value;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ??
        ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* =========================================================
   INLINE HTML FUNCTIONS
========================================================= */

window.viewOrder =
    viewOrder;

window.openCancelModal =
    openCancelModal;

window.confirmCancelOrder =
    confirmCancelOrder;

window.increaseCartItem =
    increaseCartItem;

window.decreaseCartItem =
    decreaseCartItem;

window.removeCartItem =
    removeCartItem;

window.openCreateOrderPanel =
    openCreateOrderPanel;

window.closeCreateOrderPanel =
    closeCreateOrderPanel;


/* =========================================================
   FINAL
========================================================= */

console.log(
    "======================================"
);

console.log(
    "Sankalp RMS Order JavaScript Ready"
);

console.log(
    "Backend:",
    BACKEND_URL
);

console.log(
    "Order API:",
    ORDER_API
);

console.log(
    "Customer API:",
    CUSTOMER_API
);

console.log(
    "Menu API:",
    MENU_API
);

console.log(
    "======================================"
);