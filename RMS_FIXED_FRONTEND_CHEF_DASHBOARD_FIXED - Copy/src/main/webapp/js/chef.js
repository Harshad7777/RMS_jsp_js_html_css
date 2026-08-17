"use strict";

/* =========================================================
   SANKALP RMS
   KITCHEN / CHEF DASHBOARD
   COMPLETE CORRECTED VERSION
   ========================================================= */

console.log("======================================");
console.log("Sankalp RMS Kitchen JS Loaded");
console.log("======================================");


/* =========================================================
   CONFIGURATION
========================================================= */

const CONTEXT_PATH =
    document.querySelector('meta[name="app-context"]')
        ?.getAttribute("content") ||
    window.CONTEXT_PATH ||
    "/RMS_jsp_js_html_css";

const API_BASE_URL = "http://localhost:8080";

const KITCHEN_API =
    API_BASE_URL + "/api/kitchen";

console.log("Context Path:", CONTEXT_PATH);
console.log("API Base URL:", API_BASE_URL);
console.log("Kitchen API:", KITCHEN_API);


/* =========================================================
   STATE
========================================================= */

let kitchenOrders = [];
let currentStatus = "ALL";
let currentSearch = "";
let selectedOrder = null;
let refreshTimer = null;
let isLoading = false;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kitchen DOM Loaded");

    initializeKitchen();

});


/* =========================================================
   INITIALIZE
========================================================= */

function initializeKitchen() {

    updateKitchenDateTime();

    setInterval(
        updateKitchenDateTime,
        1000
    );

    setupKitchenEvents();

    loadKitchenOrders();

}


/* =========================================================
   EVENTS
========================================================= */

function setupKitchenEvents() {

    /* -----------------------------------------------------
       REFRESH
    ----------------------------------------------------- */

    const refreshBtn =
        document.getElementById(
            "refreshKitchenBtn"
        );

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            function () {

                loadKitchenOrders();

            }
        );

    }


    /* -----------------------------------------------------
       TABS
    ----------------------------------------------------- */

    document
        .querySelectorAll(".kitchen-tab")
        .forEach(function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".kitchen-tab")
                        .forEach(function (item) {

                            item.classList.remove(
                                "active"
                            );

                        });


                    this.classList.add("active");


                    currentStatus =
                        String(
                            this.dataset.status ||
                            "ALL"
                        )
                            .trim()
                            .toUpperCase();


                    console.log(
                        "Selected kitchen tab:",
                        currentStatus
                    );


                    renderKitchenOrders();

                }
            );

        });


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    const search =
        document.getElementById(
            "kitchenSearch"
        );

    if (search) {

        search.addEventListener(
            "input",
            function () {

                currentSearch =
                    String(
                        this.value || ""
                    )
                        .trim()
                        .toLowerCase();


                renderKitchenOrders();

            }
        );

    }


    /* -----------------------------------------------------
       CLOSE MODAL
    ----------------------------------------------------- */

    const closeModal =
        document.getElementById(
            "closeOrderModal"
        );

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeOrderModal
        );

    }


    /* -----------------------------------------------------
       MODAL OVERLAY
    ----------------------------------------------------- */

    const modalOverlay =
        document.querySelector(
            ".kitchen-modal-overlay"
        );

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modalOverlay
                ) {

                    closeOrderModal();

                }

            }
        );

    }


    /* -----------------------------------------------------
       ESCAPE
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeOrderModal();

            }

        }
    );

}


/* =========================================================
   AUTHENTICATION
========================================================= */

function getToken() {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("chefToken") ||
        ""
    );

}


function getAuthHeaders() {

    const token = getToken();

    const headers = {
        "Accept": "application/json"
    };

    if (token) {

        headers["Authorization"] =
            "Bearer " + token;

    }

    return headers;

}


/* =========================================================
   GET CHEF ID
========================================================= */

function getChefId() {

    const possibleKeys = [

        "chefId",
        "userId",
        "loggedInUserId",
        "currentUserId"

    ];


    /* -----------------------------------------------------
       DIRECT LOCAL STORAGE
    ----------------------------------------------------- */

    for (const key of possibleKeys) {

        const value =
            localStorage.getItem(key);

        if (
            value !== null &&
            String(value).trim() !== ""
        ) {

            console.log(
                "Chef ID from",
                key,
                ":",
                value
            );

            return value;

        }

    }


    /* -----------------------------------------------------
       USER OBJECT
    ----------------------------------------------------- */

    const objectKeys = [

        "user",
        "currentUser",
        "loggedInUser",
        "chefUser",
        "userData"

    ];


    for (const key of objectKeys) {

        const stored =
            localStorage.getItem(key);

        if (!stored) {
            continue;
        }


        try {

            const user =
                JSON.parse(stored);

            if (!user) {
                continue;
            }


            const id =
                user.userId ??
                user.user_id ??
                user.id ??
                user.chefId ??
                user.chef_id;


            if (
                id !== null &&
                id !== undefined &&
                String(id).trim() !== ""
            ) {

                console.log(
                    "Chef ID from object:",
                    key,
                    id
                );

                return id;

            }

        }
        catch (error) {

            console.warn(
                "Unable to parse user object:",
                key,
                error
            );

        }

    }


    /* -----------------------------------------------------
       JWT
    ----------------------------------------------------- */

    const token = getToken();

    if (token) {

        try {

            const parts =
                token.split(".");

            if (parts.length === 3) {

                const payload =
                    JSON.parse(
                        decodeBase64Url(
                            parts[1]
                        )
                    );


                console.log(
                    "JWT Payload:",
                    payload
                );


                const id =
                    payload.userId ??
                    payload.user_id ??
                    payload.chefId ??
                    payload.chef_id ??
                    payload.id ??
                    payload.sub;


                if (
                    id !== null &&
                    id !== undefined &&
                    String(id).trim() !== ""
                ) {

                    console.log(
                        "Chef ID from JWT:",
                        id
                    );

                    return id;

                }

            }

        }
        catch (error) {

            console.warn(
                "Unable to read JWT:",
                error
            );

        }

    }


    console.error(
        "Chef ID could not be found."
    );

    return null;

}


/* =========================================================
   BASE64 URL DECODER
========================================================= */

function decodeBase64Url(value) {

    let base64 =
        String(value)
            .replace(/-/g, "+")
            .replace(/_/g, "/");


    while (base64.length % 4) {

        base64 += "=";

    }


    return atob(base64);

}


/* =========================================================
   LOGIN REDIRECT
========================================================= */

function redirectToLogin() {

    localStorage.removeItem("token");
    localStorage.removeItem("chefToken");
    localStorage.removeItem("chefRole");

    window.location.href =
        CONTEXT_PATH + "/login.jsp";

}


/* =========================================================
   LOAD KITCHEN ORDERS
========================================================= */

async function loadKitchenOrders() {

    if (isLoading) {
        return;
    }

    isLoading = true;


    console.log("======================================");
    console.log("Loading kitchen orders...");
    console.log("GET:", KITCHEN_API);


    showKitchenLoading();


    try {

        const token = getToken();


        if (!token) {

            console.error(
                "JWT token not found."
            );

            redirectToLogin();

            return;

        }


        const response =
            await fetch(
                KITCHEN_API,
                {
                    method: "GET",

                    headers:
                        getAuthHeaders(),

                    cache: "no-store"
                }
            );


        console.log(
            "Kitchen API Status:",
            response.status
        );


        const responseText =
            await response.text();


        console.log(
            "Kitchen API Response:",
            responseText
        );


        /* -------------------------------------------------
           401
        ------------------------------------------------- */

        if (response.status === 401) {

            alert(
                "Session expired. Please login again."
            );

            redirectToLogin();

            return;

        }


        /* -------------------------------------------------
           403
        ------------------------------------------------- */

        if (response.status === 403) {

            throw new Error(
                "Access denied. Login using a CHEF account."
            );

        }


        /* -------------------------------------------------
           404
        ------------------------------------------------- */

        if (response.status === 404) {

            throw new Error(
                "Kitchen API not found: " +
                KITCHEN_API
            );

        }


        /* -------------------------------------------------
           OTHER ERROR
        ------------------------------------------------- */

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                ": " +
                responseText
            );

        }


        /* -------------------------------------------------
           JSON
        ------------------------------------------------- */

        let data = [];

        if (
            responseText &&
            responseText.trim() !== ""
        ) {

            try {

                data =
                    JSON.parse(
                        responseText
                    );

            }
            catch (error) {

                console.error(
                    "JSON parse error:",
                    error
                );

                throw new Error(
                    "Kitchen API returned invalid JSON."
                );

            }

        }


        /* -------------------------------------------------
           NORMALIZE
        ------------------------------------------------- */

        kitchenOrders =
            normalizeKitchenData(data);


        window.kitchenOrders =
            kitchenOrders;


        console.log(
            "Final Kitchen Orders:",
            kitchenOrders
        );


        hideKitchenLoading();

        renderKitchenOrders();

        updateKitchenStatistics();

    }
    catch (error) {

        console.error(
            "Kitchen API Error:",
            error
        );

        hideKitchenLoading();

        showKitchenError(
            error.message ||
            "Unable to load kitchen orders."
        );

    }
    finally {

        isLoading = false;

    }

}


/* =========================================================
   NORMALIZE API DATA
========================================================= */

function normalizeKitchenData(data) {

    let rows = [];


    if (Array.isArray(data)) {

        rows = data;

    }
    else if (
        data &&
        Array.isArray(data.orders)
    ) {

        rows = data.orders;

    }
    else if (
        data &&
        Array.isArray(data.data)
    ) {

        rows = data.data;

    }
    else if (
        data &&
        Array.isArray(data.content)
    ) {

        rows = data.content;

    }


    console.log(
        "Kitchen detail rows:",
        rows.length
    );


    const groupedOrders =
        new Map();


    rows.forEach(function (row) {

        if (!row) {
            return;
        }


        const orderId =
            row.orderId ??
            row.order_id ??
            row.id;


        if (
            orderId === null ||
            orderId === undefined
        ) {

            console.warn(
                "Skipping row without orderId:",
                row
            );

            return;

        }


        const key =
            String(orderId);


        /* -------------------------------------------------
           CREATE ORDER
        ------------------------------------------------- */

        if (!groupedOrders.has(key)) {

            groupedOrders.set(
                key,
                {

                    id: orderId,

                    orderId: orderId,

                    orderNumber:
                        row.orderNo ??
                        row.orderNumber ??
                        row.order_no ??
                        row.orderCode ??
                        "ORD-" + orderId,

                    customer:
                        row.customerName ??
                        row.customer_name ??
                        row.customer ??
                        "Walk-in Customer",

                    customerName:
                        row.customerName ??
                        row.customer_name ??
                        row.customer ??
                        "Walk-in Customer",

                    table:
                        row.tableNumber ??
                        row.tableName ??
                        row.table_no ??
                        row.tableId ??
                        row.table_id ??
                        "-",

                    tableId:
                        row.tableId ??
                        row.table_id ??
                        null,

                    orderDate:
                        row.orderDate ??
                        row.createdAt ??
                        row.created_at ??
                        row.order_time ??
                        row.orderTime ??
                        "",

                    kitchenNote:
                        row.kitchenNote ??
                        row.kitchen_note ??
                        "",

                    remarks:
                        row.remarks ??
                        "",

                    totalAmount:
                        Number(
                            row.totalAmount ??
                            row.total_amount ??
                            0
                        ),

                    orderStatus:
                        String(
                            row.orderStatus ??
                            row.order_status ??
                            "NEW"
                        )
                            .trim()
                            .toUpperCase(),

                    status: "NEW",

                    items: []

                }
            );

        }


        const order =
            groupedOrders.get(key);


        /* -------------------------------------------------
           KITCHEN STATUS
        ------------------------------------------------- */

        const kitchenStatus =
            String(
                row.kitchenStatus ??
                row.kitchen_status ??
                "NEW"
            )
                .trim()
                .toUpperCase();


        /* -------------------------------------------------
           DETAIL ID
        ------------------------------------------------- */

        const detailId =
            row.detailId ??
            row.orderDetailId ??
            row.order_detail_id ??
            row.detail_id ??
            null;


        /* -------------------------------------------------
           ADD ITEM
        ------------------------------------------------- */

        order.items.push({

            detailId: detailId,

            itemId:
                row.itemId ??
                row.item_id ??
                null,

            name:
                row.itemName ??
                row.item_name ??
                row.menuItemName ??
                row.menu_item_name ??
                row.name ??
                "Unknown Item",

            quantity:
                Number(
                    row.quantity ??
                    row.qty ??
                    1
                ),

            price:
                Number(
                    row.price ??
                    row.unitPrice ??
                    row.unit_price ??
                    0
                ),

            subtotal:
                Number(
                    row.subtotal ??
                    0
                ),

            kitchenStatus:
                kitchenStatus,

            preparedBy:
                row.preparedBy ??
                row.prepared_by ??
                null,

            preparedByName:
                row.preparedByName ??
                row.prepared_by_name ??
                "",

            servedAt:
                row.servedAt ??
                row.served_at ??
                null

        });

    });


    /* -----------------------------------------------------
       CALCULATE ORDER STATUS
    ----------------------------------------------------- */

    groupedOrders.forEach(function (order) {

        order.status =
            calculateOrderKitchenStatus(
                order.items
            );

    });


    return Array.from(
        groupedOrders.values()
    );

}


/* =========================================================
   CALCULATE ORDER STATUS
========================================================= */

function calculateOrderKitchenStatus(items) {

    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

        return "NEW";

    }


    const statuses =
        items.map(function (item) {

            return String(
                item.kitchenStatus || "NEW"
            )
                .trim()
                .toUpperCase();

        });


    if (
        statuses.includes("NEW")
    ) {

        return "NEW";

    }


    if (
        statuses.includes("ACCEPTED")
    ) {

        return "ACCEPTED";

    }


    if (
        statuses.includes("PREPARING")
    ) {

        return "PREPARING";

    }


    if (
        statuses.every(function (status) {

            return status === "SERVED";

        })
    ) {

        return "SERVED";

    }


    if (
        statuses.every(function (status) {

            return (
                status === "READY" ||
                status === "SERVED"
            );

        })
    ) {

        return "READY";

    }


    return "NEW";

}


/* =========================================================
   FILTER ORDERS
========================================================= */

function getFilteredKitchenOrders() {

    return kitchenOrders.filter(
        function (order) {

            const status =
                String(
                    order.status || "NEW"
                )
                    .trim()
                    .toUpperCase();


            if (
                currentStatus !== "ALL" &&
                status !== currentStatus
            ) {

                return false;

            }


            if (!currentSearch) {

                return true;

            }


            const itemNames =
                (order.items || [])
                    .map(function (item) {

                        return item.name;

                    })
                    .join(" ");


            const searchableText = [

                order.orderNumber,

                order.orderId,

                order.customer,

                order.table,

                order.kitchenNote,

                order.remarks,

                itemNames

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                currentSearch
            );

        }
    );

}


/* =========================================================
   RENDER ORDERS
========================================================= */

function renderKitchenOrders() {

    const container =
        document.getElementById(
            "kitchenOrdersGrid"
        );


    if (!container) {

        console.error(
            "kitchenOrdersGrid not found."
        );

        return;

    }


    const orders =
        getFilteredKitchenOrders();


    console.log(
        "Rendering:",
        orders.length,
        "orders"
    );


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="empty-kitchen">

                <i class="fa-solid fa-utensils"></i>

                <h3>No Kitchen Orders</h3>

                <p>
                    ${
                        currentStatus !== "ALL"
                            ? "No orders found for " +
                              escapeHTML(
                                  currentStatus
                              ) +
                              " status."
                            : "There are no active kitchen orders."
                    }
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        orders
            .map(createOrderCard)
            .join("");

}


/* =========================================================
   CREATE ORDER CARD
========================================================= */

function createOrderCard(order) {

    const status =
        String(
            order.status || "NEW"
        )
            .trim()
            .toUpperCase();


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    const itemHTML =
        items.length > 0

            ?

            items
                .map(function (item) {

                    const itemStatus =
                        String(
                            item.kitchenStatus ||
                            "NEW"
                        )
                            .trim()
                            .toUpperCase();


                    return `

                        <div
                            class="order-item"
                            data-detail-id="${escapeHTML(
                                item.detailId
                            )}"
                        >

                            <div class="item-main">

                                <span class="item-name">
                                    ${escapeHTML(
                                        item.name
                                    )}
                                </span>

                                <span class="item-quantity">
                                    × ${escapeHTML(
                                        item.quantity
                                    )}
                                </span>

                            </div>

                            <span
                                class="kitchen-status ${getStatusClass(
                                    itemStatus
                                )}"
                            >
                                ${escapeHTML(
                                    itemStatus
                                )}
                            </span>

                        </div>

                    `;

                })
                .join("")

            :

            `

                <div class="order-item">

                    <span class="item-name">
                        No item details available
                    </span>

                </div>

            `;


    const noteHTML =
        order.kitchenNote

            ?

            `

                <div class="order-note">

                    <i class="fa-solid fa-note-sticky"></i>

                    <strong>
                        Kitchen Note:
                    </strong>

                    ${escapeHTML(
                        order.kitchenNote
                    )}

                </div>

            `

            :

            "";


    return `

        <article
            class="kitchen-order-card"
            data-order-id="${escapeHTML(
                order.orderId
            )}"
        >

            <div class="order-card-header">

                <div>

                    <div class="order-number">
                        ${escapeHTML(
                            order.orderNumber
                        )}
                    </div>

                    <span class="order-time">
                        ${formatDateTime(
                            order.orderDate
                        )}
                    </span>

                </div>

                <span
                    class="order-status ${getStatusClass(
                        status
                    )}"
                >
                    ${escapeHTML(status)}
                </span>

            </div>


            <div class="order-customer">

                <span class="customer-name">

                    <i class="fa-solid fa-user"></i>

                    ${escapeHTML(
                        order.customer
                    )}

                </span>


                <span class="table-number">

                    <i class="fa-solid fa-chair"></i>

                    Table
                    ${escapeHTML(
                        order.table
                    )}

                </span>

            </div>


            <div class="order-items-list">

                ${itemHTML}

            </div>


            ${noteHTML}


            <div class="order-actions">

                ${createActionButtons(order)}

            </div>

        </article>

    `;

}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function createActionButtons(order) {

    const status =
        String(
            order.status || "NEW"
        )
            .trim()
            .toUpperCase();


    let html = "";


    if (status === "NEW") {

        html += `

            <button
                type="button"
                class="order-action-btn btn-accept"
                onclick="updateKitchenOrderStatus(
                    '${escapeJS(order.orderId)}',
                    'ACCEPTED'
                )"
            >

                <i class="fa-solid fa-check"></i>

                Accept

            </button>

        `;

    }


    else if (status === "ACCEPTED") {

        html += `

            <button
                type="button"
                class="order-action-btn btn-preparing"
                onclick="updateKitchenOrderStatus(
                    '${escapeJS(order.orderId)}',
                    'PREPARING'
                )"
            >

                <i class="fa-solid fa-fire"></i>

                Start Preparing

            </button>

        `;

    }


    else if (status === "PREPARING") {

        html += `

            <button
                type="button"
                class="order-action-btn btn-ready"
                onclick="updateKitchenOrderStatus(
                    '${escapeJS(order.orderId)}',
                    'READY'
                )"
            >

                <i class="fa-solid fa-check-double"></i>

                Mark Ready

            </button>

        `;

    }


    else if (status === "READY") {

        html += `

            <button
                type="button"
                class="order-action-btn btn-served"
                onclick="updateKitchenOrderStatus(
                    '${escapeJS(order.orderId)}',
                    'SERVED'
                )"
            >

                <i class="fa-solid fa-concierge-bell"></i>

                Served

            </button>

        `;

    }


    /* -----------------------------------------------------
       VIEW
    ----------------------------------------------------- */

    html += `

        <button
            type="button"
            class="order-action-btn btn-view"
            onclick="viewKitchenOrder(
                '${escapeJS(order.orderId)}'
            )"
        >

            <i class="fa-solid fa-eye"></i>

            View

        </button>

    `;


    return html;

}


/* =========================================================
   UPDATE KITCHEN STATUS
========================================================= */

async function updateKitchenOrderStatus(
    orderId,
    newStatus
) {

    console.log("======================================");
    console.log("Updating order:", orderId);
    console.log("New status:", newStatus);


    const token = getToken();


    if (!token) {

        alert(
            "Session expired. Please login again."
        );

        redirectToLogin();

        return;

    }


    const chefId = getChefId();


    if (!chefId) {

        showKitchenToast(
            "Chef ID is missing. Please login again as CHEF.",
            false
        );

        return;

    }


    const order =
        kitchenOrders.find(function (item) {

            return String(item.orderId) ===
                String(orderId);

        });


    if (!order) {

        showKitchenToast(
            "Order not found.",
            false
        );

        return;

    }


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    if (items.length === 0) {

        showKitchenToast(
            "No order details found.",
            false
        );

        return;

    }


    newStatus =
        String(newStatus)
            .trim()
            .toUpperCase();


    const allowedStatuses = [

        "NEW",
        "ACCEPTED",
        "PREPARING",
        "READY",
        "SERVED"

    ];


    if (
        !allowedStatuses.includes(newStatus)
    ) {

        showKitchenToast(
            "Invalid status: " +
            newStatus,
            false
        );

        return;

    }


    /* -----------------------------------------------------
       DISABLE BUTTONS
    ----------------------------------------------------- */

    const card =
        document.querySelector(
            `.kitchen-order-card[data-order-id="${CSS.escape(
                String(orderId)
            )}"]`
        );


    const buttons =
        card
            ? card.querySelectorAll("button")
            : [];


    buttons.forEach(function (button) {

        button.disabled = true;

    });


    try {

        /* -------------------------------------------------
           UPDATE ALL ORDER DETAILS
        ------------------------------------------------- */

        for (const item of items) {

            if (
                item.detailId === null ||
                item.detailId === undefined ||
                String(item.detailId).trim() === ""
            ) {

                console.warn(
                    "Missing detailId:",
                    item
                );

                continue;

            }


            /*
             * IMPORTANT:
             *
             * Kitchen status is handled by
             * /api/kitchen/detail/{detailId}
             */

            const url =
                KITCHEN_API +
                "/detail/" +
                encodeURIComponent(
                    item.detailId
                );


            const requestBody = {

                status: newStatus,

                chefId: Number(chefId)

            };


            console.log(
                "PUT:",
                url
            );


            console.log(
                "Request:",
                requestBody
            );


            const response =
                await fetch(
                    url,
                    {

                        method: "PUT",

                        headers: {

                            ...getAuthHeaders(),

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                requestBody
                            )

                    }
                );


            const responseText =
                await response.text();


            console.log(
                "Status update response:",
                response.status,
                responseText
            );


            if (response.status === 401) {

                redirectToLogin();

                return;

            }


            if (response.status === 403) {

                throw new Error(
                    "You do not have permission to update kitchen orders."
                );

            }


            if (response.status === 404) {

                throw new Error(
                    "Kitchen detail endpoint not found: " +
                    url
                );

            }


            if (!response.ok) {

                let message =
                    "HTTP " +
                    response.status;


                if (responseText) {

                    try {

                        const errorData =
                            JSON.parse(
                                responseText
                            );


                        message =
                            errorData.message ||
                            errorData.error ||
                            responseText;

                    }
                    catch (e) {

                        message +=
                            ": " +
                            responseText;

                    }

                }


                throw new Error(message);

            }

        }


        /* -------------------------------------------------
           UPDATE LOCAL STATE
        ------------------------------------------------- */

        items.forEach(function (item) {

            item.kitchenStatus =
                newStatus;

            item.preparedBy =
                Number(chefId);

        });


        order.status =
            calculateOrderKitchenStatus(
                items
            );


        /* -------------------------------------------------
           RENDER
        ------------------------------------------------- */

        renderKitchenOrders();

        updateKitchenStatistics();


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        showKitchenToast(
            order.orderNumber +
            " → " +
            newStatus,
            true
        );


        /* -------------------------------------------------
           DATABASE SYNC
        ------------------------------------------------- */

        setTimeout(
            function () {

                loadKitchenOrders();

            },
            500
        );

    }
    catch (error) {

        console.error(
            "Kitchen Status Update Error:",
            error
        );


        showKitchenToast(
            error.message ||
            "Unable to update kitchen status.",
            false
        );


        buttons.forEach(function (button) {

            button.disabled = false;

        });

    }

}


/* =========================================================
   VIEW ORDER
========================================================= */

function viewKitchenOrder(orderId) {

    const order =
        kitchenOrders.find(function (item) {

            return String(item.orderId) ===
                String(orderId);

        });


    if (!order) {

        showKitchenToast(
            "Order not found.",
            false
        );

        return;

    }


    selectedOrder = order;


    setText(
        "modalOrderNumber",
        order.orderNumber
    );


    setText(
        "modalCustomer",
        order.customer
    );


    setText(
        "modalTable",
        "Table " + order.table
    );


    setText(
        "modalDate",
        formatDateTime(
            order.orderDate
        )
    );


    const statusElement =
        document.getElementById(
            "modalStatus"
        );


    if (statusElement) {

        statusElement.textContent =
            order.status;


        statusElement.className =
            "order-status " +
            getStatusClass(
                order.status
            );

    }


    const note =
        document.getElementById(
            "modalKitchenNote"
        );


    if (note) {

        note.textContent =
            order.kitchenNote ||
            "No kitchen note.";

    }


    renderModalItems(
        order.items || []
    );


    const modal =
        document.getElementById(
            "orderDetailsModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


/* =========================================================
   MODAL ITEMS
========================================================= */

function renderModalItems(items) {

    const container =
        document.getElementById(
            "modalItems"
        );


    if (!container) {
        return;
    }


    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

        container.innerHTML = `

            <div class="modal-item">

                <span>
                    No item details available
                </span>

            </div>

        `;

        return;

    }


    container.innerHTML =
        items
            .map(function (item) {

                const status =
                    String(
                        item.kitchenStatus ||
                        "NEW"
                    )
                        .trim()
                        .toUpperCase();


                return `

                    <div class="modal-item">

                        <div>

                            <span>
                                ${escapeHTML(
                                    item.name
                                )}
                            </span>

                            <small
                                class="kitchen-status ${getStatusClass(
                                    status
                                )}"
                            >
                                ${escapeHTML(
                                    status
                                )}
                            </small>

                        </div>


                        <strong>
                            × ${escapeHTML(
                                item.quantity
                            )}
                        </strong>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeOrderModal() {

    const modal =
        document.getElementById(
            "orderDetailsModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    selectedOrder = null;

}


/* =========================================================
   STATISTICS
========================================================= */

function updateKitchenStatistics() {

    const counts = {

        ALL: 0,

        NEW: 0,

        ACCEPTED: 0,

        PREPARING: 0,

        READY: 0,

        SERVED: 0

    };


    kitchenOrders.forEach(function (order) {

        const status =
            String(
                order.status || "NEW"
            )
                .trim()
                .toUpperCase();


        if (
            Object.prototype.hasOwnProperty.call(
                counts,
                status
            )
        ) {

            counts[status]++;

        }

    });


    counts.ALL =
        counts.NEW +
        counts.ACCEPTED +
        counts.PREPARING +
        counts.READY +
        counts.SERVED;


    setText(
        "newOrdersCount",
        counts.NEW
    );


    setText(
        "acceptedOrdersCount",
        counts.ACCEPTED
    );


    setText(
        "preparingOrdersCount",
        counts.PREPARING
    );


    setText(
        "readyOrdersCount",
        counts.READY
    );


    setText(
        "allOrdersBadge",
        counts.ALL
    );


    setText(
        "newTabBadge",
        counts.NEW
    );


    setText(
        "acceptedTabBadge",
        counts.ACCEPTED
    );


    setText(
        "preparingTabBadge",
        counts.PREPARING
    );


    setText(
        "readyTabBadge",
        counts.READY
    );


    setText(
        "servedTabBadge",
        counts.SERVED
    );


    setText(
        "allOrdersCount",
        counts.ALL
    );


    setText(
        "servedOrdersCount",
        counts.SERVED
    );


    console.log(
        "Kitchen Statistics:",
        counts
    );

}


/* =========================================================
   DATE / TIME
========================================================= */

function updateKitchenDateTime() {

    const now = new Date();


    const dateElement =
        document.getElementById(
            "kitchenDate"
        );


    const timeElement =
        document.getElementById(
            "kitchenTime"
        );


    if (dateElement) {

        dateElement.textContent =
            now.toLocaleDateString(
                "en-IN",
                {

                    day: "2-digit",

                    month: "short",

                    year: "numeric"

                }
            );

    }


    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit"

                }
            );

    }

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDateTime(value) {

    if (!value) {
        return "--";
    }


    const date =
        new Date(value);


    if (
        isNaN(date.getTime())
    ) {

        return String(value);

    }


    return date.toLocaleString(
        "en-IN",
        {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        }
    );

}


/* =========================================================
   STATUS CSS CLASS
========================================================= */

function getStatusClass(status) {

    switch (
        String(status)
            .trim()
            .toUpperCase()
    ) {

        case "NEW":
            return "status-new";

        case "ACCEPTED":
            return "status-accepted";

        case "PREPARING":
            return "status-preparing";

        case "READY":
            return "status-ready";

        case "SERVED":
            return "status-served";

        default:
            return "status-new";

    }

}


/* =========================================================
   LOADING
========================================================= */

function showKitchenLoading() {

    const loading =
        document.getElementById(
            "kitchenLoading"
        );


    const empty =
        document.getElementById(
            "kitchenEmpty"
        );


    if (loading) {

        loading.style.display =
            "flex";

    }


    if (empty) {

        empty.style.display =
            "none";

    }

}


function hideKitchenLoading() {

    const loading =
        document.getElementById(
            "kitchenLoading"
        );


    if (loading) {

        loading.style.display =
            "none";

    }

}


/* =========================================================
   ERROR
========================================================= */

function showKitchenError(message) {

    const container =
        document.getElementById(
            "kitchenOrdersGrid"
        );


    if (!container) {

        console.error(message);

        return;

    }


    container.innerHTML = `

        <div class="empty-kitchen">

            <i class="fa-solid fa-triangle-exclamation"></i>

            <h3>
                Unable to load kitchen orders
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

            <button
                type="button"
                onclick="loadKitchenOrders()"
            >

                <i class="fa-solid fa-refresh"></i>

                Retry

            </button>

        </div>

    `;

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "";

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ESCAPE JS
========================================================= */

function escapeJS(value) {

    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}


/* =========================================================
   TOAST
========================================================= */

function showKitchenToast(
    message,
    success = true
) {

    const toast =
        document.getElementById(
            "kitchenToast"
        );


    const text =
        document.getElementById(
            "kitchenToastText"
        );


    if (!toast) {

        console.log(message);

        return;

    }


    if (text) {

        text.textContent =
            message;

    }


    toast.classList.remove(
        "error"
    );


    if (!success) {

        toast.classList.add(
            "error"
        );

    }


    toast.classList.add(
        "show"
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
   AUTO REFRESH
========================================================= */

if (refreshTimer) {

    clearInterval(
        refreshTimer
    );

}


refreshTimer =
    setInterval(
        function () {

            if (
                document.visibilityState ===
                "visible"
            ) {

                loadKitchenOrders();

            }

        },
        30000
    );


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.loadKitchenOrders =
    loadKitchenOrders;

window.updateKitchenStatus =
    updateKitchenOrderStatus;

window.updateKitchenOrderStatus =
    updateKitchenOrderStatus;

window.viewKitchenOrder =
    viewKitchenOrder;

window.closeOrderModal =
    closeOrderModal;

window.renderKitchenOrders =
    renderKitchenOrders;

window.showKitchenToast =
    showKitchenToast;

window.getChefId =
    getChefId;


console.log(
    "Kitchen JS initialization complete"
);

console.log(
    "======================================"
);