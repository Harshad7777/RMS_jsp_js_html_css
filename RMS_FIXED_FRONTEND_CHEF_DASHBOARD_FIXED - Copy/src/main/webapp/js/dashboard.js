/* =====================================================
   SANKALP DASHBOARD JS
===================================================== */

console.log("=================================");
console.log("Sankalp Admin Dashboard Loaded");
console.log("=================================");


/* =====================================================
   API
===================================================== */

const DASHBOARD_API =
    "http://localhost:8080/api/dashboard/summary";


/* =====================================================
   TOKEN
===================================================== */

const token =
    localStorage.getItem("token");


/* =====================================================
   LOGIN CHECK
===================================================== */

if (!token) {

    window.location.href =
        "login.jsp";

}


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

        setupRefresh();

    }
);


/* =====================================================
   LOAD DASHBOARD
===================================================== */

async function loadDashboard() {

    console.log(
        "Loading dashboard..."
    );


    try {

        const response =
            await fetch(
                DASHBOARD_API,
                {

                    method: "GET",

                    headers: {

                        "Authorization":
                            "Bearer " + token,

                        "Content-Type":
                            "application/json"

                    }

                }
            );


        console.log(
            "Dashboard HTTP status:",
            response.status
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            logoutUser();

            return;

        }


        if (!response.ok) {

            const text =
                await response.text();

            console.error(
                "Dashboard API response:",
                text
            );

            throw new Error(
                "Unable to load dashboard"
            );

        }


        const data =
            await response.json();


        console.log(
            "Dashboard data:",
            data
        );


        updateStatistics(
            data
        );


        const orders =
            Array.isArray(
                data.recentOrders
            )
                ? data.recentOrders
                : [];


        updateRecentOrders(
            orders
        );


        updateOrderStatus(
            orders
        );


        createRevenueChart(
            data
        );


        createOrderStatusChart(
            orders
        );


    }
    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStatistics(data) {

    setText(
        "totalOrders",
        data.totalOrders ?? 0
    );


    setText(
        "totalCustomers",
        data.totalCustomers ?? 0
    );


    setText(
        "todaySales",
        formatNumber(
            data.todaySales ?? 0
        )
    );


    setText(
        "pendingOrders",
        data.todayOrders ?? 0
    );


    setText(
        "sidebarOrderCount",
        data.todayOrders ?? 0
    );


}


/* =====================================================
   SAFE TEXT
===================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =====================================================
   NUMBER FORMAT
===================================================== */

function formatNumber(
    value
) {

    const number =
        Number(value) || 0;


    return number.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2
        }
    );

}


/* =====================================================
   RECENT ORDERS
===================================================== */

function updateRecentOrders(
    orders
) {

    const tbody =
        document.getElementById(
            "recentOrders"
        );


    if (!tbody) {

        return;

    }


    if (
        !orders ||
        orders.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-row">

                    No recent orders found

                </td>

            </tr>

        `;

        return;

    }


    tbody.innerHTML = "";


    orders
        .slice(0, 5)
        .forEach(
            function (order) {

                const row =
                    document.createElement(
                        "tr"
                    );


                const status =
                    order.status ||
                    "PENDING";


                const statusClass =
                    getStatusClass(
                        status
                    );


                row.innerHTML = `

                    <td>
                        #ORD${order.orderId}
                    </td>

                    <td>
                        ${escapeHtml(
                            order.customerName ||
                            "Walk-in Customer"
                        )}
                    </td>

                    <td>
                        ₹${formatNumber(
                            order.totalAmount || 0
                        )}
                    </td>

                    <td>

                        <span
                            class="order-status ${statusClass}">

                            ${escapeHtml(
                                status
                            )}

                        </span>

                    </td>

                    <td>
                        ${formatDate(
                            order.orderDate
                        )}
                    </td>

                `;


                tbody.appendChild(
                    row
                );

            }
        );

}


/* =====================================================
   STATUS CLASS
===================================================== */

function getStatusClass(
    status
) {

    const value =
        String(status)
            .toUpperCase();


    if (
        value === "COMPLETED" ||
        value === "SERVED" ||
        value === "READY"
    ) {

        return "completed";

    }


    if (
        value === "PREPARING" ||
        value === "ACCEPTED"
    ) {

        return "preparing";

    }


    if (
        value === "CANCELLED" ||
        value === "CANCELED"
    ) {

        return "cancelled";

    }


    return "pending";

}


/* =====================================================
   ORDER STATUS
===================================================== */

function updateOrderStatus(
    orders
) {

    let completed = 0;

    let preparing = 0;

    let pending = 0;

    let cancelled = 0;


    orders.forEach(
        function (order) {

            const status =
                String(
                    order.status || ""
                ).toUpperCase();


            if (
                status === "COMPLETED" ||
                status === "SERVED" ||
                status === "READY"
            ) {

                completed++;

            }
            else if (
                status === "PREPARING" ||
                status === "ACCEPTED"
            ) {

                preparing++;

            }
            else if (
                status === "CANCELLED" ||
                status === "CANCELED"
            ) {

                cancelled++;

            }
            else {

                pending++;

            }

        }
    );


    setText(
        "completedCount",
        completed
    );


    setText(
        "preparingCount",
        preparing
    );


    setText(
        "pendingStatusCount",
        pending
    );


    setText(
        "cancelledCount",
        cancelled
    );


    setText(
        "statusTotal",
        orders.length
    );

}


/* =====================================================
   REVENUE CHART
===================================================== */

function createRevenueChart(
    data
) {

    const canvas =
        document.getElementById(
            "revenueChart"
        );


    if (!canvas) {

        return;

    }


    if (
        window.revenueChartInstance
    ) {

        window.revenueChartInstance.destroy();

    }


    let labels = [

        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"

    ];


    let values = [

        16000,
        22000,
        28000,
        40000,
        35000,
        29000,
        Number(
            data.todaySales || 45000
        )

    ];


    if (
        Array.isArray(
            data.revenueOverview
        ) &&
        data.revenueOverview.length > 0
    ) {

        labels =
            data.revenueOverview.map(
                function (item) {
                    return item.day;
                }
            );


        values =
            data.revenueOverview.map(
                function (item) {

                    return Number(
                        item.amount || 0
                    );

                }
            );

    }


    window.revenueChartInstance =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Revenue",

                            data:
                                values,

                            borderColor:
                                "#d99400",

                            backgroundColor:
                                "rgba(217,148,0,.10)",

                            borderWidth: 2,

                            fill: true,

                            tension: .4,

                            pointRadius: 4,

                            pointHoverRadius: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            display: false

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            grid: {

                                color:
                                    "#eeeeee"

                            },

                            ticks: {

                                font: {

                                    size: 10

                                },

                                callback:
                                    function (value) {

                                        return "₹" +
                                            value / 1000 +
                                            "K";

                                    }

                            }

                        },

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                font: {

                                    size: 10

                                }

                            }

                        }

                    }

                }

            }
        );

}


/* =====================================================
   ORDER STATUS CHART
===================================================== */

function createOrderStatusChart(
    orders
) {

    const canvas =
        document.getElementById(
            "orderStatusChart"
        );


    if (!canvas) {

        return;

    }


    if (
        window.statusChartInstance
    ) {

        window.statusChartInstance.destroy();

    }


    let completed = 0;

    let preparing = 0;

    let pending = 0;

    let cancelled = 0;


    orders.forEach(
        function (order) {

            const status =
                String(
                    order.status || ""
                ).toUpperCase();


            if (
                status === "COMPLETED" ||
                status === "SERVED" ||
                status === "READY"
            ) {

                completed++;

            }
            else if (
                status === "PREPARING" ||
                status === "ACCEPTED"
            ) {

                preparing++;

            }
            else if (
                status === "CANCELLED" ||
                status === "CANCELED"
            ) {

                cancelled++;

            }
            else {

                pending++;

            }

        }
    );


    window.statusChartInstance =
        new Chart(
            canvas,
            {

                type: "doughnut",

                data: {

                    labels: [

                        "Completed",
                        "Preparing",
                        "Pending",
                        "Cancelled"

                    ],

                    datasets: [

                        {

                            data: [

                                completed,
                                preparing,
                                pending,
                                cancelled

                            ],

                            backgroundColor: [

                                "#55a958",
                                "#ff8b00",
                                "#f0b400",
                                "#e63c2d"

                            ],

                            borderWidth: 0,

                            hoverOffset: 4

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );

}


/* =====================================================
   REFRESH
===================================================== */

function setupRefresh() {

    const button =
        document.getElementById(
            "refreshDashboard"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        async function () {

            const icon =
                button.querySelector(
                    "i"
                );


            if (icon) {

                icon.classList.add(
                    "fa-spin"
                );

            }


            await loadDashboard();


            setTimeout(
                function () {

                    if (icon) {

                        icon.classList.remove(
                            "fa-spin"
                        );

                    }

                },
                500
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "username"
    );

    localStorage.removeItem(
        "role"
    );

    localStorage.removeItem(
        "userId"
    );


    window.location.href =
        "login.jsp";

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }


    try {

        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return date.toLocaleDateString(
            "en-IN",
            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }
        );

    }
    catch (error) {

        return value;

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(
    value
) {

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