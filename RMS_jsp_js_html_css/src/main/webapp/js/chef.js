"use strict";

/* =====================================================
   CHEF DASHBOARD
   ===================================================== */

console.log("======================================");
console.log("Chef Dashboard Loaded");
console.log("======================================");


/* =====================================================
   CONTEXT PATH
   ===================================================== */

const CONTEXT_PATH =
    window.location.pathname.substring(
        0,
        window.location.pathname.indexOf("/", 1)
    );

const BASE_URL =
    window.location.origin +
    CONTEXT_PATH;


/* =====================================================
   API
   ===================================================== */

const ORDER_API =
    BASE_URL + "/api/order";


const KITCHEN_TODAY_API =
    ORDER_API + "/kitchen/today";


const KITCHEN_STATS_API =
    ORDER_API + "/kitchen/stats";


const KITCHEN_STATUS_API =
    ORDER_API + "/kitchen/detail";


console.log("Context Path:", CONTEXT_PATH);
console.log("Order API:", ORDER_API);


/* =====================================================
   TOKEN
   ===================================================== */

const token =
    localStorage.getItem("token");


/* =====================================================
   CHEF ROLE
   ===================================================== */

const role =
    localStorage.getItem("role") ||
    localStorage.getItem("chefRole");


console.log("Logged in role:", role);


/* =====================================================
   CHEF ID
   ===================================================== */

let chefId =
    localStorage.getItem("chefId");


if (chefId) {
    chefId = parseInt(chefId);
}

console.log("Chef ID:", chefId);


/* =====================================================
   AUTH CHECK
   ===================================================== */

if (!token) {

    console.error("No JWT token found.");

    window.location.href =
        CONTEXT_PATH + "/login.jsp";

}


/* =====================================================
   ROLE CHECK
   ===================================================== */

if (
    role &&
    role !== "CHEF" &&
    role !== "ADMIN"
) {

    console.error(
        "Invalid role:",
        role
    );

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("chefRole");

    window.location.href =
        CONTEXT_PATH + "/login.jsp";
}


/* =====================================================
   HEADERS
   ===================================================== */

function getHeaders() {

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {

        headers["Authorization"] =
            "Bearer " + token;
    }

    return headers;
}


/* =====================================================
   HANDLE RESPONSE
   ===================================================== */

async function handleResponse(response) {

    const contentType =
        response.headers.get(
            "content-type"
        ) || "";

    const text =
        await response.text();


    if (!response.ok) {

        console.error(
            "HTTP Error:",
            response.status,
            text
        );

        throw new Error(
            "HTTP " +
            response.status +
            ": " +
            text
        );
    }


    if (!text) {
        return null;
    }


    if (
        contentType.includes(
            "application/json"
        )
    ) {

        try {

            return JSON.parse(text);

        } catch (error) {

            console.error(
                "Invalid JSON:",
                text
            );

            throw new Error(
                "Invalid JSON response from server."
            );
        }
    }


    return text;
}


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Initializing Chef Dashboard..."
        );

        loadDashboard();


        /*
         * Refresh every 30 seconds
         */
        setInterval(
            loadDashboard,
            30000
        );
    }
);


/* =====================================================
   LOAD DASHBOARD
   ===================================================== */

async function loadDashboard() {

    console.log(
        "Loading chef dashboard..."
    );


    await Promise.allSettled([

        loadKitchenOrders(),

        loadKitchenStats()

    ]);
}


/* =====================================================
   LOAD KITCHEN ORDERS
   ===================================================== */

async function loadKitchenOrders() {

    console.log(
        "Loading kitchen orders..."
    );

    console.log(
        "Kitchen Orders URL:",
        KITCHEN_TODAY_API
    );


    try {

        const response =
            await fetch(
                KITCHEN_TODAY_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );


        const data =
            await handleResponse(
                response
            );


        console.log(
            "Kitchen Orders:",
            data
        );


        renderKitchenOrders(data);


    } catch (error) {

        console.error(
            "Kitchen Orders Error:",
            error
        );


        showError(
            "Unable to load kitchen orders. " +
            error.message
        );
    }
}


/* =====================================================
   LOAD KITCHEN STATISTICS
   ===================================================== */

async function loadKitchenStats() {

    console.log(
        "Loading kitchen statistics..."
    );

    console.log(
        "Kitchen Stats URL:",
        KITCHEN_STATS_API
    );


    try {

        const response =
            await fetch(
                KITCHEN_STATS_API,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );


        const data =
            await handleResponse(
                response
            );


        console.log(
            "Kitchen Stats:",
            data
        );


        updateKitchenStats(data);


    } catch (error) {

        console.error(
            "Kitchen Stats Error:",
            error
        );


        updateKitchenStats({
            newCount: 0,
            acceptedCount: 0,
            preparingCount: 0,
            readyCount: 0
        });
    }
}


/* =====================================================
   UPDATE STATS
   ===================================================== */

function updateKitchenStats(stats) {

    if (!stats) {
        return;
    }


    setElementText(
        "newCount",
        stats.newCount
    );


    setElementText(
        "acceptedCount",
        stats.acceptedCount
    );


    setElementText(
        "preparingCount",
        stats.preparingCount
    );


    setElementText(
        "readyCount",
        stats.readyCount
    );


    /*
     * Alternative IDs if your JSP uses cards
     */

    setElementText(
        "newOrders",
        stats.newCount
    );


    setElementText(
        "acceptedOrders",
        stats.acceptedCount
    );


    setElementText(
        "preparingOrders",
        stats.preparingCount
    );


    setElementText(
        "readyOrders",
        stats.readyCount
    );
}


/* =====================================================
   SET ELEMENT TEXT
   ===================================================== */

function setElementText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value ?? 0;
    }
}


/* =====================================================
   RENDER KITCHEN ORDERS
   ===================================================== */

function renderKitchenOrders(
    orders
) {

    const container =
        document.getElementById(
            "kitchenOrders"
        );


    if (!container) {

        console.warn(
            "Element #kitchenOrders not found."
        );

        return;
    }


    container.innerHTML = "";


    if (
        !orders ||
        !Array.isArray(orders) ||
        orders.length === 0
    ) {

        container.innerHTML = `
            <div class="alert alert-info">
                No kitchen orders for today.
            </div>
        `;

        return;
    }


    orders.forEach(
        function (order) {

            container.appendChild(
                createOrderCard(order)
            );
        }
    );
}


/* =====================================================
   CREATE ORDER CARD
   ===================================================== */

function createOrderCard(
    order
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "card mb-3 shadow-sm";


    const status =
        order.kitchenStatus ||
        "NEW";


    const statusClass =
        getStatusClass(status);


    card.innerHTML = `

        <div class="card-header
                    d-flex
                    justify-content-between
                    align-items-center">

            <div>
                <strong>
                    ${escapeHtml(
                        order.orderNo ||
                        ("Order #" +
                         (order.orderId || ""))
                    )}
                </strong>
            </div>

            <span class="badge ${statusClass}">
                ${escapeHtml(status)}
            </span>

        </div>


        <div class="card-body">

            <div class="row">

                <div class="col-md-4">

                    <strong>Customer:</strong>

                    <div>
                        ${escapeHtml(
                            order.customerName ||
                            "-"
                        )}
                    </div>

                </div>


                <div class="col-md-4">

                    <strong>Table:</strong>

                    <div>
                        ${escapeHtml(
                            order.tableNumber ||
                            "-"
                        )}
                    </div>

                </div>


                <div class="col-md-4">

                    <strong>Item:</strong>

                    <div>
                        ${escapeHtml(
                            order.itemName ||
                            "-"
                        )}
                    </div>

                </div>

            </div>


            <hr>


            <div class="row">

                <div class="col-md-4">

                    <strong>Quantity:</strong>

                    <div>
                        ${order.quantity ?? 0}
                    </div>

                </div>


                <div class="col-md-4">

                    <strong>Price:</strong>

                    <div>
                        ₹${formatNumber(
                            order.price
                        )}
                    </div>

                </div>


                <div class="col-md-4">

                    <strong>Subtotal:</strong>

                    <div>
                        ₹${formatNumber(
                            order.subtotal
                        )}
                    </div>

                </div>

            </div>


            ${
                order.kitchenNote
                    ? `
                    <div class="mt-3">
                        <strong>
                            Kitchen Note:
                        </strong>

                        <div class="alert alert-warning mt-1 mb-0">
                            ${escapeHtml(
                                order.kitchenNote
                            )}
                        </div>
                    </div>
                    `
                    : ""
            }


            <div class="mt-3">

                <strong>
                    Update Status:
                </strong>


                <div class="btn-group mt-2">

                    <button
                        type="button"
                        class="btn btn-sm btn-secondary"
                        onclick="updateKitchenStatus(
                            ${order.orderDetailId},
                            'NEW'
                        )">
                        New
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-primary"
                        onclick="updateKitchenStatus(
                            ${order.orderDetailId},
                            'ACCEPTED'
                        )">
                        Accept
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-warning"
                        onclick="updateKitchenStatus(
                            ${order.orderDetailId},
                            'PREPARING'
                        )">
                        Preparing
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-success"
                        onclick="updateKitchenStatus(
                            ${order.orderDetailId},
                            'READY'
                        )">
                        Ready
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-dark"
                        onclick="updateKitchenStatus(
                            ${order.orderDetailId},
                            'SERVED'
                        )">
                        Served
                    </button>

                </div>

            </div>

        </div>
    `;


    return card;
}


/* =====================================================
   UPDATE KITCHEN STATUS
   ===================================================== */

async function updateKitchenStatus(
    orderDetailId,
    status
) {

    if (!orderDetailId) {

        alert(
            "Order Detail ID is missing."
        );

        return;
    }


    if (!chefId) {

        alert(
            "Chef ID is missing."
        );

        return;
    }


    const url =
        KITCHEN_STATUS_API +
        "/" +
        encodeURIComponent(
            orderDetailId
        ) +
        "/status?status=" +
        encodeURIComponent(
            status
        ) +
        "&chefId=" +
        encodeURIComponent(
            chefId
        );


    console.log(
        "Updating kitchen status:",
        url
    );


    try {

        const response =
            await fetch(
                url,
                {
                    method: "PUT",
                    headers: getHeaders()
                }
            );


        const result =
            await handleResponse(
                response
            );


        console.log(
            "Status update result:",
            result
        );


        alert(
            typeof result === "string"
                ? result
                : "Kitchen status updated successfully."
        );


        /*
         * Reload dashboard
         */

        await loadDashboard();


    } catch (error) {

        console.error(
            "Kitchen status update error:",
            error
        );


        alert(
            "Unable to update kitchen status.\n\n" +
            error.message
        );
    }
}


/* =====================================================
   STATUS CLASS
   ===================================================== */

function getStatusClass(
    status
) {

    switch (
        String(status)
            .toUpperCase()
    ) {

        case "NEW":
            return "bg-secondary";

        case "ACCEPTED":
            return "bg-primary";

        case "PREPARING":
            return "bg-warning text-dark";

        case "READY":
            return "bg-success";

        case "SERVED":
            return "bg-dark";

        default:
            return "bg-secondary";
    }
}


/* =====================================================
   FORMAT NUMBER
   ===================================================== */

function formatNumber(
    value
) {

    const number =
        Number(value);


    if (
        Number.isNaN(number)
    ) {

        return "0.00";
    }


    return number.toFixed(2);
}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return String(value)
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


/* =====================================================
   SHOW ERROR
   ===================================================== */

function showError(
    message
) {

    console.error(
        "ERROR:",
        message
    );


    const container =
        document.getElementById(
            "kitchenOrders"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="alert alert-danger">

            <strong>
                Unable to load kitchen orders.
            </strong>

            <br>

            ${escapeHtml(message)}

        </div>

    `;
}


/* =====================================================
   MANUAL REFRESH
   ===================================================== */

function refreshDashboard() {

    console.log(
        "Manual dashboard refresh..."
    );

    loadDashboard();
}


/* =====================================================
   GLOBAL FUNCTIONS
   ===================================================== */

window.loadDashboard =
    loadDashboard;

window.loadKitchenOrders =
    loadKitchenOrders;

window.loadKitchenStats =
    loadKitchenStats;

window.updateKitchenStatus =
    updateKitchenStatus;

window.refreshDashboard =
    refreshDashboard;