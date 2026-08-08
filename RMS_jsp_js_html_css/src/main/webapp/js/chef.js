// =====================================================
// CHEF DASHBOARD
// =====================================================


// =====================================================
// AUTHENTICATION
// =====================================================

const chefToken =
    localStorage.getItem("token");

const chefRole =
    localStorage.getItem("role");


if (!chefToken) {

    alert("Please Login First");

    window.location.href =
        "login.jsp";
}


// =====================================================
// ROLE CHECK
// =====================================================

if (chefRole !== "CHEF") {

    alert("Access Denied");

    localStorage.clear();

    window.location.href =
        "login.jsp";
}


// =====================================================
// API
// =====================================================

const KITCHEN_API =
    "http://localhost:8080/api/kitchen";


// =====================================================
// GLOBAL DATA
// =====================================================

let allOrders = [];


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadKitchenOrders();

    }
);


// =====================================================
// LOAD KITCHEN ORDERS
// =====================================================

function loadKitchenOrders() {

    fetch(
        KITCHEN_API,
        {

            method: "GET",

            headers: {

                "Authorization":
                    "Bearer " + chefToken

            }

        }
    )

    .then(async response => {

        if (response.status === 401 ||
            response.status === 403) {

            localStorage.clear();

            window.location.href =
                "login.jsp";

            return;
        }


        if (!response.ok) {

            const message =
                await response.text();

            throw new Error(message);
        }


        return response.json();

    })

    .then(data => {

        if (!data) {
            return;
        }


        allOrders = Array.isArray(data)
            ? data
            : [];


        updateStatistics();

        filterOrders();

    })

    .catch(error => {

        console.error(
            "Kitchen API Error:",
            error
        );


        alert(
            error.message ||
            "Unable to load kitchen orders"
        );

    });
}


// =====================================================
// STATISTICS
// =====================================================

function updateStatistics() {

    let newCount = 0;

    let acceptedCount = 0;

    let preparingCount = 0;

    let readyCount = 0;


    allOrders.forEach(order => {

        if (!order.items) {
            return;
        }


        order.items.forEach(item => {

            const status =
                item.kitchenStatus;


            if (status === "NEW") {
                newCount++;
            }


            if (status === "ACCEPTED") {
                acceptedCount++;
            }


            if (status === "PREPARING") {
                preparingCount++;
            }


            if (status === "READY") {
                readyCount++;
            }

        });

    });


    const newCountElement =
        document.getElementById(
            "newCount"
        );


    const acceptedCountElement =
        document.getElementById(
            "acceptedCount"
        );


    const preparingCountElement =
        document.getElementById(
            "preparingCount"
        );


    const readyCountElement =
        document.getElementById(
            "readyCount"
        );


    if (newCountElement) {

        newCountElement.innerText =
            newCount;
    }


    if (acceptedCountElement) {

        acceptedCountElement.innerText =
            acceptedCount;
    }


    if (preparingCountElement) {

        preparingCountElement.innerText =
            preparingCount;
    }


    if (readyCountElement) {

        readyCountElement.innerText =
            readyCount;
    }
}


// =====================================================
// FILTER ORDERS
// =====================================================

function filterOrders() {

    const filterElement =
        document.getElementById(
            "statusFilter"
        );


    if (!filterElement) {
        return;
    }


    const filter =
        filterElement.value;


    let orders =
        [...allOrders];


    if (filter !== "ALL") {

        orders =
            allOrders.filter(
                order => {

                    if (!order.items) {
                        return false;
                    }


                    return order.items.some(
                        item =>
                            item.kitchenStatus ===
                            filter
                    );

                }
            );
    }


    displayOrders(orders);
}


// =====================================================
// DISPLAY ORDERS
// =====================================================

function displayOrders(orders) {

    const container =
        document.getElementById(
            "kitchenOrders"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!orders ||
        orders.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info text-center">

                    <i class="fa-solid fa-kitchen-set"></i>

                    No kitchen orders found.

                </div>

            </div>

        `;

        return;
    }


    orders.forEach(order => {

        let itemsHtml = "";


        if (order.items &&
            order.items.length > 0) {


            order.items.forEach(item => {

                const statusClass =
                    getStatusClass(
                        item.kitchenStatus
                    );


                const buttons =
                    getActionButtons(
                        item
                    );


                itemsHtml += `

                    <div class="border rounded p-3 mb-3">

                        <div class="d-flex
                                    justify-content-between
                                    align-items-start">

                            <div>

                                <h6 class="fw-bold mb-1">

                                    ${escapeHtml(
                                        item.itemName
                                    )}

                                </h6>


                                <small class="text-muted">

                                    Quantity:
                                    ${item.quantity}

                                </small>

                            </div>


                            <span class="badge ${statusClass}">

                                ${item.kitchenStatus}

                            </span>

                        </div>


                        <div class="mt-2">

                            <strong>
                                Price:
                            </strong>

                            ₹${formatAmount(
                                item.price
                            )}

                        </div>


                        ${
                            item.subtotal != null
                            ?
                            `
                            <div>

                                <strong>
                                    Subtotal:
                                </strong>

                                ₹${formatAmount(
                                    item.subtotal
                                )}

                            </div>
                            `
                            :
                            ""
                        }


                        ${
                            item.kitchenNote
                            ?
                            `
                            <div class="alert alert-warning mt-3 mb-2">

                                <strong>
                                    Kitchen Note:
                                </strong>

                                ${escapeHtml(
                                    item.kitchenNote
                                )}

                            </div>
                            `
                            :
                            ""
                        }


                        <div class="mt-3">

                            ${buttons}

                        </div>

                    </div>

                `;
            });

        }


        container.innerHTML += `

            <div class="col-lg-6">

                <div class="card shadow-sm h-100">

                    <div class="card-header
                                d-flex
                                justify-content-between
                                align-items-center">

                        <strong>

                            Order #${escapeHtml(
                                order.orderNo
                            )}

                        </strong>


                        <span class="badge bg-dark">

                            ${escapeHtml(
                                order.orderStatus ||
                                "ACTIVE"
                            )}

                        </span>

                    </div>


                    <div class="card-body">

                        <div class="row mb-3">

                            <div class="col-md-6">

                                <strong>
                                    Customer:
                                </strong>

                                <br>

                                ${escapeHtml(
                                    order.customerName ||
                                    "Walk-in Customer"
                                )}

                            </div>


                            <div class="col-md-6">

                                <strong>
                                    Table:
                                </strong>

                                <br>

                                ${escapeHtml(
                                    order.tableNumber ||
                                    "-"
                                )}

                            </div>

                        </div>


                        ${
                            order.orderType
                            ?
                            `
                            <div class="mb-3">

                                <strong>
                                    Order Type:
                                </strong>

                                ${escapeHtml(
                                    order.orderType
                                )}

                            </div>
                            `
                            :
                            ""
                        }


                        <hr>


                        <h6 class="fw-bold mb-3">

                            <i class="fa-solid fa-utensils"></i>

                            Kitchen Items

                        </h6>


                        ${itemsHtml}


                        ${
                            order.remarks
                            ?
                            `
                            <div class="alert alert-secondary">

                                <strong>
                                    Remarks:
                                </strong>

                                ${escapeHtml(
                                    order.remarks
                                )}

                            </div>
                            `
                            :
                            ""
                        }

                    </div>


                    <div class="card-footer
                                d-flex
                                justify-content-between">

                        <strong>
                            Total:
                        </strong>

                        <strong>

                            ₹${formatAmount(
                                order.totalAmount
                            )}

                        </strong>

                    </div>

                </div>

            </div>

        `;

    });
}


// =====================================================
// STATUS CLASS
// =====================================================

function getStatusClass(status) {

    switch (status) {

        case "NEW":

            return "bg-warning text-dark";


        case "ACCEPTED":

            return "bg-info text-dark";


        case "PREPARING":

            return "bg-danger";


        case "READY":

            return "bg-success";


        case "SERVED":

            return "bg-secondary";


        default:

            return "bg-dark";
    }
}


// =====================================================
// ACTION BUTTONS
// =====================================================

function getActionButtons(item) {

    if (!item ||
        !item.orderDetailId) {

        return "";
    }


    if (item.kitchenStatus === "NEW") {

        return `

            <button
                class="btn btn-primary w-100"
                onclick="updateKitchenStatus(
                    ${item.orderDetailId},
                    'ACCEPTED'
                )">

                <i class="fa-solid fa-check"></i>

                Accept Order

            </button>

        `;
    }


    if (item.kitchenStatus === "ACCEPTED") {

        return `

            <button
                class="btn btn-danger w-100"
                onclick="updateKitchenStatus(
                    ${item.orderDetailId},
                    'PREPARING'
                )">

                <i class="fa-solid fa-fire"></i>

                Start Preparing

            </button>

        `;
    }


    if (item.kitchenStatus === "PREPARING") {

        return `

            <button
                class="btn btn-success w-100"
                onclick="updateKitchenStatus(
                    ${item.orderDetailId},
                    'READY'
                )">

                <i class="fa-solid fa-circle-check"></i>

                Mark Ready

            </button>

        `;
    }


    if (item.kitchenStatus === "READY") {

        return `

            <div class="alert alert-success
                        text-center
                        mb-0">

                <i class="fa-solid fa-check-double"></i>

                Ready

            </div>

        `;
    }


    return "";
}


// =====================================================
// UPDATE KITCHEN STATUS
// =====================================================

function updateKitchenStatus(
    orderDetailId,
    status
) {


    if (!orderDetailId) {

        alert(
            "Invalid Order Detail ID"
        );

        return;
    }


    fetch(
        KITCHEN_API +
        "/" +
        orderDetailId +
        "/status",
        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json",

                "Authorization":
                    "Bearer " +
                    chefToken

            },

            body: JSON.stringify({

                status: status

            })

        }
    )

    .then(async response => {

        const message =
            await response.text();


        if (response.status === 401 ||
            response.status === 403) {

            localStorage.clear();

            window.location.href =
                "login.jsp";

            return;
        }


        if (!response.ok) {

            throw new Error(
                message ||
                "Unable to update order"
            );
        }


        return message;

    })

    .then(message => {

        if (!message) {
            return;
        }


        alert(message);

        loadKitchenOrders();

    })

    .catch(error => {

        console.error(
            "Status Update Error:",
            error
        );


        alert(
            error.message ||
            "Unable to update order"
        );

    });
}


// =====================================================
// FORMAT MONEY
// =====================================================

function formatAmount(value) {

    if (value == null ||
        value === "") {

        return "0.00";
    }


    const number =
        Number(value);


    if (Number.isNaN(number)) {

        return "0.00";
    }


    return number.toFixed(2);
}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHtml(value) {

    if (value == null) {
        return "";
    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}