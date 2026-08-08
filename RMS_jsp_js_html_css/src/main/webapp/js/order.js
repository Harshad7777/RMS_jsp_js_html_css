"use strict";

/*
===========================================================
 ORDER MANAGEMENT JAVASCRIPT
 Restaurant Management System
===========================================================
*/


// ========================================================
// API URLs
// ========================================================

const ORDER_API =
    "http://localhost:8080/api/order";

const CUSTOMER_API =
    "http://localhost:8080/api/customer";

const MENU_API =
    "http://localhost:8080/api/menu";


// ========================================================
// JWT TOKEN
// ========================================================

const token =
    localStorage.getItem("token");


// ========================================================
// GLOBAL VARIABLES
// ========================================================

let menuList = [];

let items = [];

let allOrders = [];


// ========================================================
// LOGIN CHECK
// ========================================================

if (!token) {

    alert("Please Login First");

    window.location.href =
        "login.jsp";

}


// ========================================================
// PAGE LOAD
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePage();

    }
);


// ========================================================
// INITIALIZE PAGE
// ========================================================

function initializePage() {

    loadCustomers();

    loadMenu();

    loadOrders();

    showCart();

    calculateTotals();


    // ----------------------------------------------------
    // ADD ITEM
    // ----------------------------------------------------

    const addItemBtn =
        document.getElementById(
            "addItemBtn"
        );

    if (addItemBtn) {

        addItemBtn.addEventListener(
            "click",
            addItem
        );

    }


    // ----------------------------------------------------
    // PLACE ORDER
    // ----------------------------------------------------

    const placeOrderBtn =
        document.getElementById(
            "placeOrderBtn"
        );

    if (placeOrderBtn) {

        placeOrderBtn.addEventListener(
            "click",
            placeOrder
        );

    }


    // ----------------------------------------------------
    // REFRESH ALL
    // ----------------------------------------------------

    const refreshBtn =
        document.getElementById(
            "refreshBtn"
        );

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            function () {

                loadCustomers();

                loadMenu();

                loadOrders();

            }
        );

    }


    // ----------------------------------------------------
    // REFRESH ORDERS
    // ----------------------------------------------------

    const refreshOrders =
        document.getElementById(
            "refreshOrders"
        );

    if (refreshOrders) {

        refreshOrders.addEventListener(
            "click",
            loadOrders
        );

    }


    // ----------------------------------------------------
    // SEARCH
    // ----------------------------------------------------

    const searchOrder =
        document.getElementById(
            "searchOrder"
        );

    if (searchOrder) {

        searchOrder.addEventListener(
            "input",
            filterOrders
        );

    }


    // ----------------------------------------------------
    // ENTER KEY FOR QUANTITY
    // ----------------------------------------------------

    const quantity =
        document.getElementById(
            "quantity"
        );

    if (quantity) {

        quantity.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    addItem();

                }

            }
        );

    }

}


// ========================================================
// COMMON FETCH HEADERS
// ========================================================

function getHeaders() {

    return {

        "Authorization":
            "Bearer " + token,

        "Content-Type":
            "application/json"

    };

}


// ========================================================
// LOAD CUSTOMERS
// ========================================================

async function loadCustomers() {

    const customerElement =
        document.getElementById(
            "customerId"
        );

    if (!customerElement) {
        return;
    }


    try {

        customerElement.innerHTML = `
            <option value="">
                Loading Customers...
            </option>
        `;


        const response =
            await fetch(
                CUSTOMER_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );


        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Unable to load customers. " +
                "Status: " +
                response.status +
                " " +
                responseText
            );

        }


        let data = [];

        try {

            data =
                responseText
                    ? JSON.parse(responseText)
                    : [];

        } catch (error) {

            throw new Error(
                "Invalid customer API response."
            );

        }


        if (!Array.isArray(data)) {

            data = [];

        }


        customerElement.innerHTML = `
            <option value="">
                Select Customer
            </option>
        `;


        data.forEach(
            function (customer) {

                const id =
                    customer.customerId;

                const name =
                    customer.customerName ||
                    "Unknown Customer";


                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    id;

                option.textContent =
                    name;

                customerElement.appendChild(
                    option
                );

            }
        );


        console.log(
            "Customers Loaded:",
            data
        );

    }

    catch (error) {

        console.error(
            "Load Customer Error:",
            error
        );


        customerElement.innerHTML = `
            <option value="">
                Unable to load customers
            </option>
        `;

    }

}


// ========================================================
// LOAD MENU
// ========================================================

async function loadMenu() {

    const menuElement =
        document.getElementById(
            "menuId"
        );

    if (!menuElement) {
        return;
    }


    try {

        menuElement.innerHTML = `
            <option value="">
                Loading Menu...
            </option>
        `;


        const response =
            await fetch(
                MENU_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );


        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Unable to load menu. " +
                "Status: " +
                response.status +
                " " +
                responseText
            );

        }


        let data = [];

        try {

            data =
                responseText
                    ? JSON.parse(responseText)
                    : [];

        }

        catch (error) {

            throw new Error(
                "Invalid menu API response."
            );

        }


        menuList =
            Array.isArray(data)
                ? data
                : [];


        menuElement.innerHTML = `
            <option value="">
                Select Menu
            </option>
        `;


        menuList.forEach(
            function (menu) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    menu.itemId;


                option.textContent =
                    (menu.itemName ||
                     "Unknown Item") +
                    " - ₹" +
                    Number(
                        menu.price || 0
                    ).toFixed(2);


                menuElement.appendChild(
                    option
                );

            }
        );


        console.log(
            "Menu Loaded:",
            menuList
        );

    }

    catch (error) {

        console.error(
            "Load Menu Error:",
            error
        );


        menuElement.innerHTML = `
            <option value="">
                Unable to load menu
            </option>
        `;

    }

}


// ========================================================
// ADD ITEM TO CART
// ========================================================

function addItem() {

    const menuElement =
        document.getElementById(
            "menuId"
        );

    const quantityElement =
        document.getElementById(
            "quantity"
        );


    if (!menuElement ||
        !quantityElement) {

        return;

    }


    const menuId =
        Number(
            menuElement.value
        );


    const quantity =
        Number(
            quantityElement.value
        );


    // ----------------------------------------------------
    // VALIDATE MENU
    // ----------------------------------------------------

    if (!menuId) {

        alert(
            "Please select a menu item."
        );

        menuElement.focus();

        return;

    }


    // ----------------------------------------------------
    // VALIDATE QUANTITY
    // ----------------------------------------------------

    if (!Number.isInteger(quantity) ||
        quantity <= 0) {

        alert(
            "Please enter a valid quantity."
        );

        quantityElement.focus();

        return;

    }


    // ----------------------------------------------------
    // FIND MENU
    // ----------------------------------------------------

    const menu =
        menuList.find(
            function (item) {

                return Number(
                    item.itemId
                ) === menuId;

            }
        );


    if (!menu) {

        alert(
            "Menu item not found."
        );

        return;

    }


    const price =
        Number(
            menu.price || 0
        );


    // ----------------------------------------------------
    // CHECK EXISTING ITEM
    // ----------------------------------------------------

    const existing =
        items.find(
            function (item) {

                return Number(
                    item.itemId
                ) === menuId;

            }
        );


    if (existing) {

        existing.quantity +=
            quantity;


        existing.subtotal =
            existing.price *
            existing.quantity;

    }

    else {

        items.push({

            itemId:
                Number(menu.itemId),

            itemName:
                menu.itemName ||
                "Unknown Item",

            price:
                price,

            quantity:
                quantity,

            subtotal:
                price * quantity

        });

    }


    console.log(
        "Current Cart:",
        items
    );


    showCart();


    // ----------------------------------------------------
    // RESET MENU AND QUANTITY
    // ----------------------------------------------------

    menuElement.value = "";

    quantityElement.value = "1";

}


// ========================================================
// SHOW CART
// ========================================================

function showCart() {

    const cartTable =
        document.getElementById(
            "cartTable"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartTable) {
        return;
    }


    // ----------------------------------------------------
    // EMPTY CART
    // ----------------------------------------------------

    if (items.length === 0) {

        cartTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-5">

                    <i
                        class="fa fa-cart-shopping
                               fa-3x mb-3">
                    </i>

                    <br>

                    Cart is Empty

                </td>

            </tr>

        `;


        if (cartCount) {

            cartCount.textContent = "0";

        }


        calculateTotals();

        return;

    }


    // ----------------------------------------------------
    // CART ROWS
    // ----------------------------------------------------

    let rows = "";


    items.forEach(
        function (item, index) {

            rows += `

                <tr>

                    <td>

                        <div class="fw-semibold">

                            ${escapeHtml(
                                item.itemName
                            )}

                        </div>

                    </td>


                    <td class="text-end">

                        ₹${Number(
                            item.price
                        ).toFixed(2)}

                    </td>


                    <td
                        class="text-center">

                        <div
                            class="d-flex
                                   justify-content-center
                                   align-items-center
                                   gap-2">

                            <button
                                type="button"
                                class="btn btn-outline-secondary
                                       btn-sm"
                                onclick="decreaseQuantity(${index})">

                                <i class="fa fa-minus"></i>

                            </button>


                            <span
                                class="fw-bold">

                                ${item.quantity}

                            </span>


                            <button
                                type="button"
                                class="btn btn-outline-secondary
                                       btn-sm"
                                onclick="increaseQuantity(${index})">

                                <i class="fa fa-plus"></i>

                            </button>

                        </div>

                    </td>


                    <td
                        class="text-end fw-semibold">

                        ₹${Number(
                            item.subtotal
                        ).toFixed(2)}

                    </td>


                    <td
                        class="text-center">

                        <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            onclick="removeItem(${index})">

                            <i class="fa fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    cartTable.innerHTML =
        rows;


    // ----------------------------------------------------
    // CART COUNT
    // ----------------------------------------------------

    if (cartCount) {

        const count =
            items.reduce(
                function (total, item) {

                    return total +
                        Number(
                            item.quantity || 0
                        );

                },
                0
            );


        cartCount.textContent =
            count;

    }


    calculateTotals();

}


// ========================================================
// INCREASE QUANTITY
// ========================================================

function increaseQuantity(index) {

    if (!items[index]) {
        return;
    }


    items[index].quantity++;


    items[index].subtotal =
        items[index].price *
        items[index].quantity;


    showCart();

}


// ========================================================
// DECREASE QUANTITY
// ========================================================

function decreaseQuantity(index) {

    if (!items[index]) {
        return;
    }


    if (items[index].quantity <= 1) {

        removeItem(index);

        return;

    }


    items[index].quantity--;


    items[index].subtotal =
        items[index].price *
        items[index].quantity;


    showCart();

}


// ========================================================
// REMOVE ITEM
// ========================================================

function removeItem(index) {

    if (index < 0 ||
        index >= items.length) {

        return;

    }


    const itemName =
        items[index].itemName;


    if (!confirm(
        "Remove " +
        itemName +
        " from cart?"
    )) {

        return;

    }


    items.splice(
        index,
        1
    );


    showCart();

}


// ========================================================
// CALCULATE TOTALS
// ========================================================

function calculateTotals() {

    let subtotal = 0;


    items.forEach(
        function (item) {

            subtotal +=
                Number(
                    item.price || 0
                ) *
                Number(
                    item.quantity || 0
                );

        }
    );


    // ----------------------------------------------------
    // GST 5%
    // ----------------------------------------------------

    const gst =
        subtotal * 0.05;


    // ----------------------------------------------------
    // DISCOUNT
    // ----------------------------------------------------

    const discount = 0;


    // ----------------------------------------------------
    // GRAND TOTAL
    // ----------------------------------------------------

    const total =
        subtotal +
        gst -
        discount;


    setText(
        "subtotal",
        subtotal.toFixed(2)
    );


    setText(
        "gst",
        gst.toFixed(2)
    );


    setText(
        "discount",
        discount.toFixed(2)
    );


    setText(
        "total",
        total.toFixed(2)
    );


}


// ========================================================
// PLACE ORDER
// ========================================================

async function placeOrder() {

    const customerElement =
        document.getElementById(
            "customerId"
        );


    const placeButton =
        document.getElementById(
            "placeOrderBtn"
        );


    if (!customerElement) {
        return;
    }


    const customerId =
        Number(
            customerElement.value
        );


    // ----------------------------------------------------
    // CUSTOMER VALIDATION
    // ----------------------------------------------------

    if (!customerId) {

        alert(
            "Please select a customer."
        );

        customerElement.focus();

        return;

    }


    // ----------------------------------------------------
    // CART VALIDATION
    // ----------------------------------------------------

    if (items.length === 0) {

        alert(
            "Shopping cart is empty."
        );

        return;

    }


    // ----------------------------------------------------
    // ORDER ITEMS
    // ----------------------------------------------------

    const orderItems =
        items.map(
            function (item) {

                return {

                    orderDetailId: 0,

                    orderId: 0,

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


    // ----------------------------------------------------
    // ORDER REQUEST
    // ----------------------------------------------------

    const orderData = {

        customerId:
            customerId,

        tableId:
            1,

        staffId:
            14,

        items:
            orderItems

    };


    console.log(
        "ORDER REQUEST:",
        JSON.stringify(
            orderData,
            null,
            2
        )
    );


    // ----------------------------------------------------
    // DISABLE BUTTON
    // ----------------------------------------------------

    if (placeButton) {

        placeButton.disabled =
            true;

        placeButton.innerHTML = `
            <span
                class="spinner-border
                       spinner-border-sm
                       me-2">
            </span>
            Placing Order...
        `;

    }


    try {

        const response =
            await fetch(
                ORDER_API,
                {

                    method: "POST",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            orderData
                        )

                }
            );


        const responseText =
            await response.text();


        console.log(
            "ORDER STATUS:",
            response.status
        );


        console.log(
            "ORDER RESPONSE:",
            responseText
        );


        // ------------------------------------------------
        // AUTH ERROR
        // ------------------------------------------------

        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        // ------------------------------------------------
        // ERROR
        // ------------------------------------------------

        if (!response.ok) {

            let message =
                responseText ||
                "Unable to place order.";


            try {

                const errorJson =
                    JSON.parse(
                        responseText
                    );


                message =
                    errorJson.message ||
                    errorJson.error ||
                    errorJson.details ||
                    message;

            }

            catch (error) {

                // Response was plain text.

            }


            throw new Error(
                "Status " +
                response.status +
                ": " +
                message
            );

        }


        // ------------------------------------------------
        // SUCCESS
        // ------------------------------------------------

        let successMessage =
            "Order Placed Successfully";


        if (responseText) {

            try {

                const responseJson =
                    JSON.parse(
                        responseText
                    );


                successMessage =
                    responseJson.message ||
                    responseJson.response ||
                    responseJson.data ||
                    successMessage;

            }

            catch (error) {

                if (responseText.trim()) {

                    successMessage =
                        responseText;

                }

            }

        }


        alert(
            successMessage
        );


        // ------------------------------------------------
        // CLEAR CART
        // ------------------------------------------------

        items = [];


        showCart();


        // ------------------------------------------------
        // RESET FORM
        // ------------------------------------------------

        customerElement.value =
            "";


        const menuElement =
            document.getElementById(
                "menuId"
            );


        if (menuElement) {

            menuElement.value =
                "";

        }


        const quantityElement =
            document.getElementById(
                "quantity"
            );


        if (quantityElement) {

            quantityElement.value =
                "1";

        }


        // ------------------------------------------------
        // RELOAD ORDERS
        // ------------------------------------------------

        await loadOrders();

    }

    catch (error) {

        console.error(
            "Place Order Error:",
            error
        );


        alert(
            "Unable To Place Order\n\n" +
            error.message
        );

    }

    finally {

        if (placeButton) {

            placeButton.disabled =
                false;

            placeButton.innerHTML = `
                <i
                    class="fa fa-circle-check me-1">
                </i>
                Place Order
            `;

        }

    }

}


// ========================================================
// LOAD ORDERS
// ========================================================

async function loadOrders() {

    const orderTable =
        document.getElementById(
            "orderTable"
        );


    if (orderTable) {

        orderTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center py-5">

                    <div
                        class="spinner-border
                               text-primary mb-3">
                    </div>

                    <br>

                    Loading Orders...

                </td>

            </tr>

        `;

    }


    try {

        const response =
            await fetch(
                ORDER_API,
                {

                    method: "GET",

                    headers:
                        getHeaders()

                }
            );


        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Unable to load orders. " +
                "Status: " +
                response.status +
                " " +
                responseText
            );

        }


        let data = [];

        try {

            data =
                responseText
                    ? JSON.parse(responseText)
                    : [];

        }

        catch (error) {

            throw new Error(
                "Invalid order API response."
            );

        }


        allOrders =
            Array.isArray(data)
                ? data
                : [];


        console.log(
            "Orders Loaded:",
            allOrders
        );


        updateDashboard(
            allOrders
        );


        renderOrders(
            allOrders
        );

    }

    catch (error) {

        console.error(
            "Load Orders Error:",
            error
        );


        if (orderTable) {

            orderTable.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="text-center
                               text-danger py-5">

                        <i
                            class="fa fa-triangle-exclamation
                                   fa-2x mb-3">
                        </i>

                        <br>

                        Unable to load orders.

                        <br>

                        <small>
                            ${escapeHtml(
                                error.message
                            )}
                        </small>

                    </td>

                </tr>

            `;

        }

    }

}


// ========================================================
// RENDER ORDERS
// ========================================================

function renderOrders(data) {

    const orderTable =
        document.getElementById(
            "orderTable"
        );


    if (!orderTable) {
        return;
    }


    if (!Array.isArray(data) ||
        data.length === 0) {

        orderTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center
                           text-muted py-5">

                    <i
                        class="fa fa-box-open
                               fa-3x mb-3">
                    </i>

                    <br>

                    No Orders Found

                </td>

            </tr>

        `;

        return;

    }


    let rows = "";


    data.forEach(
        function (order) {

            const status =
                String(
                    order.orderStatus ||
                    ""
                ).toUpperCase();


            // --------------------------------------------
            // STATUS BADGE
            // --------------------------------------------

            let badge =
                "bg-secondary";


            if (status === "PENDING") {

                badge =
                    "bg-warning text-dark";

            }

            else if (status === "COMPLETED") {

                badge =
                    "bg-success";

            }

            else if (status === "CANCELLED") {

                badge =
                    "bg-danger";

            }

            else if (status === "PROCESSING") {

                badge =
                    "bg-info text-dark";

            }


            // --------------------------------------------
            // DATE
            // --------------------------------------------

            const orderDate =
                formatDate(
                    order.orderDate
                );


            // --------------------------------------------
            // CANCEL BUTTON
            // --------------------------------------------

            let cancelButton = "";


            if (status !== "CANCELLED" &&
                status !== "COMPLETED") {

                cancelButton = `

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="cancelOrder(${Number(
                            order.orderId
                        )})">

                        <i class="fa fa-ban"></i>

                        Cancel

                    </button>

                `;

            }


            // --------------------------------------------
            // ROW
            // --------------------------------------------

            rows += `

                <tr>

                    <td class="fw-semibold">

                        #${escapeHtml(
                            order.orderId ?? "-"
                        )}

                    </td>


                    <td>

                        ${escapeHtml(
                            order.customerName ||
                            "-"
                        )}

                    </td>


                    <td
                        class="text-end fw-semibold">

                        ₹${Number(
                            order.totalAmount || 0
                        ).toFixed(2)}

                    </td>


                    <td>

                        <span
                            class="badge ${badge}">

                            ${escapeHtml(
                                order.orderStatus ||
                                "-"
                            )}

                        </span>

                    </td>


                    <td>

                        ${escapeHtml(
                            orderDate
                        )}

                    </td>


                    <td
                        class="text-center">

                        <button
                            type="button"
                            class="btn btn-info btn-sm me-1"
                            onclick="viewOrder(${Number(
                                order.orderId
                            )})">

                            <i
                                class="fa fa-eye">
                            </i>

                            View

                        </button>

                        ${cancelButton}

                    </td>

                </tr>

            `;

        }
    );


    orderTable.innerHTML =
        rows;

}


// ========================================================
// DASHBOARD
// ========================================================

function updateDashboard(orders) {

    const todayOrdersElement =
        document.getElementById("todayOrders");

    const pendingElement =
        document.getElementById("pendingOrders");

    const completedElement =
        document.getElementById("completedOrders");

    const revenueElement =
        document.getElementById("revenue");


    let todayCount = 0;
    let pendingCount = 0;
    let completedCount = 0;
    let revenue = 0;


    // ----------------------------------------------------
    // TODAY
    // ----------------------------------------------------

    const today = new Date();

    const todayString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");


    // ----------------------------------------------------
    // PROCESS ORDERS
    // ----------------------------------------------------

    orders.forEach(function (order) {

        const status =
            String(
                order.orderStatus || ""
            )
            .trim()
            .toUpperCase();


        // ------------------------------------------------
        // PENDING ORDERS
        // ------------------------------------------------
        // Backend is returning NEW for newly created orders.
        // Therefore NEW must be counted as Pending.
        //
        // PROCESSING is also considered pending.
        // ------------------------------------------------

        if (
            status === "NEW" ||
            status === "PENDING" ||
            status === "PROCESSING"
        ) {

            pendingCount++;

        }


        // ------------------------------------------------
        // COMPLETED ORDERS
        // ------------------------------------------------

        if (status === "COMPLETED") {

            completedCount++;

        }


        // ------------------------------------------------
        // REVENUE
        // ------------------------------------------------
        // BILLED and COMPLETED orders represent successful
        // restaurant revenue.
        //
        // CANCELLED and NEW/PENDING orders are excluded.
        // ------------------------------------------------

        if (
            status === "BILLED" ||
            status === "COMPLETED"
        ) {

            revenue += Number(
                order.totalAmount || 0
            );

        }


        // ------------------------------------------------
        // TODAY'S ORDERS
        // ------------------------------------------------

        const orderDate =
            getDateOnly(
                order.orderDate
            );


        if (orderDate === todayString) {

            todayCount++;

        }

    });


    // ----------------------------------------------------
    // UPDATE DASHBOARD
    // ----------------------------------------------------

    setText(
        "todayOrders",
        todayCount
    );


    setText(
        "pendingOrders",
        pendingCount
    );


    setText(
        "completedOrders",
        completedCount
    );


    setText(
        "revenue",
        revenue.toFixed(2)
    );


    // ----------------------------------------------------
    // DEBUG
    // ----------------------------------------------------

    console.log(
        "Dashboard:",
        {
            todayOrders: todayCount,
            pendingOrders: pendingCount,
            completedOrders: completedCount,
            revenue: revenue
        }
    );

}
// ========================================================
// SEARCH ORDERS
// ========================================================

function filterOrders() {

    const searchElement =
        document.getElementById(
            "searchOrder"
        );


    if (!searchElement) {
        return;
    }


    const search =
        searchElement.value
            .trim()
            .toLowerCase();


    if (!search) {

        renderOrders(
            allOrders
        );

        return;

    }


    const filtered =
        allOrders.filter(
            function (order) {

                const orderId =
                    String(
                        order.orderId ||
                        ""
                    ).toLowerCase();


                const customer =
                    String(
                        order.customerName ||
                        ""
                    ).toLowerCase();


                const status =
                    String(
                        order.orderStatus ||
                        ""
                    ).toLowerCase();


                return (
                    orderId.includes(search) ||
                    customer.includes(search) ||
                    status.includes(search)
                );

            }
        );


    renderOrders(
        filtered
    );

}


// ========================================================
// VIEW ORDER
// ========================================================

async function viewOrder(orderId) {

    console.log(
        "Viewing Order:",
        orderId
    );


    const modalElement =
        document.getElementById(
            "orderModal"
        );


    if (!modalElement) {

        alert(
            "Order modal not found."
        );

        return;

    }


    // ----------------------------------------------------
    // RESET MODAL
    // ----------------------------------------------------

    setText(
        "mOrderId",
        "-"
    );

    setText(
        "mCustomer",
        "-"
    );

    setText(
        "mStatus",
        "-"
    );

    setText(
        "mTotal",
        "₹0.00"
    );


    const detailTable =
        document.getElementById(
            "detailTable"
        );


    if (detailTable) {

        detailTable.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-center py-4">

                    <div
                        class="spinner-border
                               text-primary">
                    </div>

                    <br><br>

                    Loading Order Details...

                </td>

            </tr>

        `;

    }


    // ----------------------------------------------------
    // SHOW MODAL
    // ----------------------------------------------------

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );


    modal.show();


    try {

        // ------------------------------------------------
        // GET ORDER
        // ------------------------------------------------

        const response =
            await fetch(
                ORDER_API +
                "/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method: "GET",

                    headers:
                        getHeaders()

                }
            );


        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Unable To Load Order\n\n" +
                "Status: " +
                response.status +
                "\n" +
                responseText
            );

        }


        const order =
            responseText
                ? JSON.parse(
                    responseText
                )
                : {};


        console.log(
            "ORDER:",
            order
        );


        // ------------------------------------------------
        // ORDER SUMMARY
        // ------------------------------------------------

        setText(
            "mOrderId",
            order.orderId ?? "-"
        );


        setText(
            "mCustomer",
            order.customerName ?? "-"
        );


        setText(
            "mStatus",
            order.orderStatus ?? "-"
        );


        setText(
            "mTotal",
            "₹" +
            Number(
                order.totalAmount || 0
            ).toFixed(2)
        );


        // ------------------------------------------------
        // LOAD DETAILS
        // ------------------------------------------------

        const detailResponse =
            await fetch(
                ORDER_API +
                "/details/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method: "GET",

                    headers:
                        getHeaders()

                }
            );


        if (detailResponse.status === 401 ||
            detailResponse.status === 403) {

            handleUnauthorized();

            return;

        }


        const detailText =
            await detailResponse.text();


        if (!detailResponse.ok) {

            throw new Error(
                "Unable To Load Order Details\n\n" +
                "Status: " +
                detailResponse.status +
                "\n" +
                detailText
            );

        }


        let details = [];


        try {

            details =
                detailText
                    ? JSON.parse(
                        detailText
                    )
                    : [];

        }

        catch (error) {

            throw new Error(
                "Invalid order details response."
            );

        }


        if (!Array.isArray(details)) {

            details = [];

        }


        // ------------------------------------------------
        // DETAILS TABLE
        // ------------------------------------------------

        if (!detailTable) {
            return;
        }


        if (details.length === 0) {

            detailTable.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="text-center
                               text-muted py-4">

                        No Order Details Found

                    </td>

                </tr>

            `;

        }

        else {

            let rows = "";


            details.forEach(
                function (detail) {

                    rows += `

                        <tr>

                            <td>

                                ${escapeHtml(
                                    detail.itemName ||
                                    "-"
                                )}

                            </td>


                            <td class="text-end">

                                ₹${Number(
                                    detail.price || 0
                                ).toFixed(2)}

                            </td>


                            <td class="text-center">

                                ${Number(
                                    detail.quantity || 0
                                )}

                            </td>


                            <td class="text-end">

                                ₹${Number(
                                    detail.subtotal || 0
                                ).toFixed(2)}

                            </td>

                        </tr>

                    `;

                }
            );


            detailTable.innerHTML =
                rows;

        }

    }

    catch (error) {

        console.error(
            "View Order Error:",
            error
        );


        if (detailTable) {

            detailTable.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="text-center
                               text-danger py-4">

                        <i
                            class="fa fa-triangle-exclamation
                                   fa-2x mb-2">
                        </i>

                        <br>

                        ${escapeHtml(
                            error.message
                        )}

                    </td>

                </tr>

            `;

        }

    }

}


// ========================================================
// CANCEL ORDER
// ========================================================

async function cancelOrder(id) {

    if (!id) {

        alert(
            "Invalid Order ID."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to cancel Order #" +
            id +
            "?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                ORDER_API +
                "/cancel/" +
                encodeURIComponent(
                    id
                ),
                {

                    method: "PUT",

                    headers:
                        getHeaders()

                }
            );


        if (response.status === 401 ||
            response.status === 403) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Status " +
                response.status +
                ": " +
                responseText
            );

        }


        let message =
            responseText ||
            "Order Cancelled Successfully";


        try {

            const json =
                JSON.parse(
                    responseText
                );


            message =
                json.message ||
                json.response ||
                json.data ||
                message;

        }

        catch (error) {

            // Plain text response.

        }


        alert(
            message
        );


        await loadOrders();

    }

    catch (error) {

        console.error(
            "Cancel Order Error:",
            error
        );


        alert(
            "Unable To Cancel Order\n\n" +
            error.message
        );

    }

}


// ========================================================
// UNAUTHORIZED HANDLER
// ========================================================

function handleUnauthorized() {

    localStorage.removeItem(
        "token"
    );


    alert(
        "Your session has expired. Please login again."
    );


    window.location.href =
        "login.jsp";

}


// ========================================================
// SET TEXT
// ========================================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


// ========================================================
// FORMAT DATE
// ========================================================

function formatDate(value) {

    if (!value) {

        return "-";

    }


    try {

        const date =
            new Date(
                value
            );


        if (isNaN(
            date.getTime()
        )) {

            return String(
                value
            ).replace(
                "T",
                " "
            );

        }


        return date.toLocaleString(
            "en-IN",
            {

                day: "2-digit",

                month: "2-digit",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit"

            }
        );

    }

    catch (error) {

        return String(
            value
        );

    }

}


// ========================================================
// GET DATE ONLY
// ========================================================

function getDateOnly(value) {

    if (!value) {
        return "";
    }


    const stringValue =
        String(value);


    // Handles:
    // 2026-08-08
    // 2026-08-08T10:30:00

    if (
        /^\d{4}-\d{2}-\d{2}/
            .test(stringValue)
    ) {

        return stringValue.substring(
            0,
            10
        );

    }


    const date =
        new Date(
            value
        );


    if (isNaN(
        date.getTime()
    )) {

        return "";

    }


    return date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0");

}


// ========================================================
// HTML ESCAPE
// ========================================================

function escapeHtml(value) {

    return String(
        value ?? ""
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


// ========================================================
// AUTO REFRESH
// ========================================================

setInterval(
    function () {

        if (token) {

            loadOrders();

        }

    },
    30000
);