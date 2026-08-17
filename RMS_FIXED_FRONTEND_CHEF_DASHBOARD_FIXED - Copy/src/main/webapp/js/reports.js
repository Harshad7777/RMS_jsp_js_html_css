// ============================================================
// SANKALP RMS - REPORTS JAVASCRIPT
// ============================================================

"use strict";

console.log("======================================");
console.log("Sankalp RMS Reports JS Loaded");
console.log("======================================");


// ============================================================
// API CONFIGURATION
// IMPORTANT:
// JSP/Tomcat  -> http://localhost:7016
// Spring Boot -> http://localhost:8080
// ============================================================

const API_BASE = "http://localhost:8080";

const REPORT_API = API_BASE + "/api/report";
const BILL_API = API_BASE + "/api/bill";
const ORDER_API = API_BASE + "/api/order";


// ============================================================
// CONTEXT PATH
// ============================================================

const CONTEXT_PATH =
    document.querySelector(
        'meta[name="app-context"]'
    )?.content || "";

console.log("Context Path:", CONTEXT_PATH);
console.log("Report API:", REPORT_API);
console.log("Bill API:", BILL_API);
console.log("Order API:", ORDER_API);


// ============================================================
// JWT TOKEN
// ============================================================

let authToken =
    localStorage.getItem("token");


// ============================================================
// LOGIN CHECK
// ============================================================

if (!authToken) {

    console.warn(
        "No JWT token found. Redirecting to login."
    );

    window.location.href =
        CONTEXT_PATH + "/login.jsp";

}


// ============================================================
// GLOBAL STATE
// ============================================================

let allBills = [];

let filteredBills = [];

let allOrders = [];

let currentPage = 1;

const pageSize = 5;

let revenueChart = null;

let paymentChart = null;

let statusChart = null;

let selectedRevenuePeriod = "Daily";


// ============================================================
// REPORT DATA
// ============================================================

let reportData = {

    totalBills: 0,

    totalRevenue: 0,

    pendingAmount: 0,

    paidAmount: 0,

    totalDiscount: 0,

    totalGST: 0,

    averageBill: 0,

    paymentMethods: {

        CASH: 0,

        UPI: 0,

        CARD: 0,

        OTHER: 0

    },

    statuses: {

        PAID: 0,

        PENDING: 0,

        CANCELLED: 0

    }

};


// ============================================================
// DOM READY
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Reports DOM Loaded"
        );

        initializeReports();

    }
);


// ============================================================
// INITIALIZE REPORTS
// ============================================================

async function initializeReports() {

    try {

        initializeDateDisplay();

        initializeEvents();

        initializeCharts();

        showLoadingState();

        await loadReports();

        console.log(
            "Reports JS initialization complete"
        );

    } catch (error) {

        console.error(
            "Reports initialization error:",
            error
        );

        showToast(
            "Unable to initialize reports",
            "error"
        );

    }

}


// ============================================================
// INITIALIZE EVENTS
// ============================================================

function initializeEvents() {


    // --------------------------------------------------------
    // SIDEBAR TOGGLE
    // --------------------------------------------------------

    const sidebarToggle =
        document.getElementById(
            "sidebarToggle"
        );

    if (sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            toggleSidebar
        );

    }


    // --------------------------------------------------------
    // FILTER
    // --------------------------------------------------------

    const filterBtn =
        document.getElementById(
            "filterBtn"
        );

    if (filterBtn) {

        filterBtn.addEventListener(
            "click",
            applyFilters
        );

    }


    // --------------------------------------------------------
    // RESET
    // --------------------------------------------------------

    const resetBtn =
        document.getElementById(
            "resetBtn"
        );

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            resetFilters
        );

    }


    // --------------------------------------------------------
    // EXPORT
    // --------------------------------------------------------

    const exportBtn =
        document.getElementById(
            "exportExcelBtn"
        );

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportExcel
        );

    }


    // --------------------------------------------------------
    // PRINT
    // --------------------------------------------------------

    const printBtn =
        document.getElementById(
            "printReportBtn"
        );

    if (printBtn) {

        printBtn.addEventListener(
            "click",
            printReport
        );

    }


    // --------------------------------------------------------
    // GLOBAL SEARCH
    // --------------------------------------------------------

    const search =
        document.getElementById(
            "globalSearch"
        );

    if (search) {

        search.addEventListener(
            "input",
            handleGlobalSearch
        );

    }


    // --------------------------------------------------------
    // REVENUE PERIOD
    // --------------------------------------------------------

    const revenuePeriod =
        document.getElementById(
            "revenuePeriod"
        );

    if (revenuePeriod) {

        selectedRevenuePeriod =
            revenuePeriod.value ||
            "Daily";

        revenuePeriod.addEventListener(
            "change",
            function () {

                selectedRevenuePeriod =
                    revenuePeriod.value;

                updateRevenueChart();

            }
        );

    }


    // --------------------------------------------------------
    // PAGINATION
    // --------------------------------------------------------

    initializePagination();

}


// ============================================================
// SIDEBAR TOGGLE
// ============================================================

function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".reports-sidebar"
        );

    const main =
        document.querySelector(
            ".reports-main"
        );

    if (sidebar) {

        sidebar.classList.toggle(
            "collapsed"
        );

    }

    if (main) {

        main.classList.toggle(
            "expanded"
        );

    }

}


// ============================================================
// DATE DISPLAY
// ============================================================

function initializeDateDisplay() {

    const today =
        new Date();


    const currentDate =
        document.getElementById(
            "currentDate"
        );

    const currentDay =
        document.getElementById(
            "currentDay"
        );


    if (currentDate) {

        currentDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

    }


    if (currentDay) {

        currentDay.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long"
                }
            );

    }

}


// ============================================================
// GET FILTERS
// ============================================================

function getFilters() {

    return {

        dateFrom:
            document.getElementById(
                "dateFrom"
            )?.value || "",

        dateTo:
            document.getElementById(
                "dateTo"
            )?.value || "",

        paymentMethod:
            document.getElementById(
                "paymentMethod"
            )?.value || "ALL",

        paymentStatus:
            document.getElementById(
                "paymentStatus"
            )?.value || "ALL"

    };

}


// ============================================================
// AUTH HEADERS
// ============================================================

function getHeaders() {

    const token =
        localStorage.getItem("token");

    const headers = {

        "Accept":
            "application/json",

        "Content-Type":
            "application/json"

    };


    if (token) {

        headers[
            "Authorization"
        ] =
            "Bearer " + token;

    }


    return headers;

}


// ============================================================
// API REQUEST
// ============================================================

async function apiRequest(
    url,
    options = {}
) {

    console.log(
        "API Request:",
        url
    );


    const response =
        await fetch(
            url,
            {
                ...options,

                headers: {

                    ...getHeaders(),

                    ...(options.headers || {})

                }

            }
        );


    console.log(
        "API Response:",
        response.status,
        response.statusText,
        url
    );


    const responseText =
        await response.text();


    let data = null;


    if (responseText.trim()) {

        try {

            data =
                JSON.parse(
                    responseText
                );

        } catch (error) {

            data =
                responseText;

        }

    }


    // --------------------------------------------------------
    // AUTHORIZATION
    // --------------------------------------------------------

    if (
        response.status === 401 ||
        response.status === 403
    ) {

        localStorage.removeItem(
            "token"
        );

        alert(
            "Session expired. Please login again."
        );

        window.location.href =
            CONTEXT_PATH +
            "/login.jsp";

        throw new Error(
            "Unauthorized"
        );

    }


    // --------------------------------------------------------
    // HTTP ERROR
    // --------------------------------------------------------

    if (!response.ok) {

        let message =
            "HTTP " +
            response.status;


        if (
            data &&
            typeof data === "object"
        ) {

            message =
                data.message ||
                data.error ||
                data.details ||
                data.title ||
                message;

        }


        if (
            typeof data === "string" &&
            data.trim()
        ) {

            message =
                data;

        }


        const error =
            new Error(
                message
            );

        error.status =
            response.status;

        error.data =
            data;

        throw error;

    }


    return data;

}


// ============================================================
// LOAD REPORTS
// ============================================================

async function loadReports() {

    console.log(
        "Loading reports..."
    );


    try {

        /*
         * IMPORTANT:
         *
         * Do NOT call:
         *
         * /api/report/summary
         * /api/report/bills
         *
         * because these endpoints are not
         * available in your current backend.
         *
         * We load the existing /api/bill endpoint
         * and calculate the report on the frontend.
         */


        const billData =
            await apiRequest(
                BILL_API,
                {
                    method: "GET"
                }
            );


        console.log(
            "Bill API Data:",
            billData
        );


        allBills =
            normalizeBills(
                billData
            );


        console.log(
            "Normalized Bills:",
            allBills
        );


        /*
         * Orders are optional.
         *
         * If the Order API fails, reports still
         * work using bill information.
         */

        try {

            const orderData =
                await apiRequest(
                    ORDER_API,
                    {
                        method: "GET"
                    }
                );


            allOrders =
                normalizeArray(
                    orderData
                );


            enrichBillsFromOrders();

        } catch (orderError) {

            console.warn(
                "Order API unavailable. Continuing without order details.",
                orderError.message
            );

            allOrders = [];

        }


        /*
         * Apply current filters.
         */

        filteredBills =
            [...allBills];


        applyLocalFilters();


        /*
         * Calculate report.
         */

        calculateReport();


        /*
         * Update UI.
         */

        updateStatistics();

        updatePaymentLegend();

        updateStatusLegend();

        updateCharts();

        renderBillTable();


        console.log(
            "Reports loaded successfully."
        );


    } catch (error) {

        console.error(
            "Failed to load reports:",
            error
        );


        allBills = [];

        filteredBills = [];


        resetReportData();

        updateStatistics();

        updatePaymentLegend();

        updateStatusLegend();

        updateCharts();

        renderBillTable();


        showToast(
            "Unable to load bills. Check Spring Boot API on port 8080.",
            "error"
        );

    }

}


// ============================================================
// NORMALIZE ARRAY
// ============================================================

function normalizeArray(data) {

    if (
        Array.isArray(data)
    ) {

        return data;

    }


    if (
        data &&
        Array.isArray(
            data.data
        )
    ) {

        return data.data;

    }


    if (
        data &&
        Array.isArray(
            data.content
        )
    ) {

        return data.content;

    }


    if (
        data &&
        Array.isArray(
            data.orders
        )
    ) {

        return data.orders;

    }


    if (
        data &&
        Array.isArray(
            data.results
        )
    ) {

        return data.results;

    }


    return [];

}


// ============================================================
// NORMALIZE BILLS
// ============================================================

function normalizeBills(data) {

    let bills =
        normalizeArray(
            data
        );


    return bills.map(
        function (bill) {

            return {

                billId:
                    bill.billId ??
                    bill.bill_id ??
                    bill.id ??
                    "",


                billNo:
                    bill.billNo ??
                    bill.bill_no ??
                    bill.billNumber ??
                    bill.bill_number ??
                    "",


                orderId:
                    bill.orderId ??
                    bill.order_id ??
                    "",


                orderNo:
                    bill.orderNo ??
                    bill.order_no ??
                    bill.orderNumber ??
                    bill.order_number ??
                    "",


                customer:
                    bill.customer ??
                    bill.customerName ??
                    bill.customer_name ??
                    "Walk-in Customer",


                table:
                    bill.table ??
                    bill.tableNumber ??
                    bill.tableNo ??
                    bill.table_no ??
                    bill.tableNumberName ??
                    "",


                billDate:
                    bill.billDate ??
                    bill.bill_date ??
                    bill.createdAt ??
                    bill.created_at ??
                    "",


                amount:
                    toNumber(
                        bill.amount ??
                        bill.subtotal ??
                        bill.sub_total
                    ),


                discount:
                    toNumber(
                        bill.discount
                    ),


                gst:
                    toNumber(
                        bill.gst ??
                        bill.gstAmount ??
                        bill.gst_amount
                    ),


                totalAmount:
                    toNumber(
                        bill.totalAmount ??
                        bill.total_amount ??
                        bill.grandTotal ??
                        bill.grand_total
                    ),


                paymentMethod:
                    String(
                        bill.paymentMethod ??
                        bill.payment_method ??
                        "OTHER"
                    )
                    .toUpperCase(),


                status:
                    String(
                        bill.status ??
                        bill.paymentStatus ??
                        bill.payment_status ??
                        "PENDING"
                    )
                    .toUpperCase()

            };

        }
    );

}


// ============================================================
// ENRICH BILL DATA USING ORDER API
// ============================================================

function enrichBillsFromOrders() {

    if (
        !Array.isArray(
            allOrders
        ) ||
        allOrders.length === 0
    ) {

        return;

    }


    allBills.forEach(
        function (bill) {

            const order =
                allOrders.find(
                    function (item) {

                        return Number(
                            item.orderId ??
                            item.order_id ??
                            item.id
                        ) === Number(
                            bill.orderId
                        );

                    }
                );


            if (!order) {

                return;

            }


            if (
                !bill.orderNo
            ) {

                bill.orderNo =
                    order.orderNo ??
                    order.orderNumber ??
                    (
                        bill.orderId
                            ? "ORD-" +
                              bill.orderId
                            : ""
                    );

            }


            if (
                !bill.customer ||
                bill.customer ===
                    "Walk-in Customer"
            ) {

                bill.customer =
                    order.customerName ??
                    order.customer ??
                    order.customer_name ??
                    "Walk-in Customer";

            }


            if (!bill.table) {

                bill.table =
                    order.tableNumber ??
                    order.tableNo ??
                    order.table_no ??
                    order.tableId ??
                    "";

            }

        }
    );

}


// ============================================================
// APPLY LOCAL FILTERS
// ============================================================

function applyLocalFilters() {

    const filters =
        getFilters();


    filteredBills =
        allBills.filter(
            function (bill) {


                // ------------------------------------------------
                // DATE FROM
                // ------------------------------------------------

                if (
                    filters.dateFrom &&
                    bill.billDate
                ) {

                    const billDate =
                        parseDate(
                            bill.billDate
                        );

                    const fromDate =
                        parseDate(
                            filters.dateFrom
                        );


                    if (
                        billDate &&
                        fromDate &&
                        billDate <
                            startOfDay(
                                fromDate
                            )
                    ) {

                        return false;

                    }

                }


                // ------------------------------------------------
                // DATE TO
                // ------------------------------------------------

                if (
                    filters.dateTo &&
                    bill.billDate
                ) {

                    const billDate =
                        parseDate(
                            bill.billDate
                        );

                    const toDate =
                        parseDate(
                            filters.dateTo
                        );


                    if (
                        billDate &&
                        toDate &&
                        billDate >
                            endOfDay(
                                toDate
                            )
                    ) {

                        return false;

                    }

                }


                // ------------------------------------------------
                // PAYMENT METHOD
                // ------------------------------------------------

                if (
                    filters.paymentMethod !==
                    "ALL"
                ) {

                    if (
                        bill.paymentMethod !==
                        filters.paymentMethod
                    ) {

                        return false;

                    }

                }


                // ------------------------------------------------
                // PAYMENT STATUS
                // ------------------------------------------------

                if (
                    filters.paymentStatus !==
                    "ALL"
                ) {

                    if (
                        bill.status !==
                        filters.paymentStatus
                    ) {

                        return false;

                    }

                }


                return true;

            }
        );


    currentPage = 1;

}


// ============================================================
// APPLY FILTER BUTTON
// ============================================================

function applyFilters() {

    const dateFrom =
        document.getElementById(
            "dateFrom"
        )?.value || "";


    const dateTo =
        document.getElementById(
            "dateTo"
        )?.value || "";


    if (
        dateFrom &&
        dateTo &&
        dateFrom > dateTo
    ) {

        showToast(
            "Date From cannot be after Date To",
            "error"
        );

        return;

    }


    applyLocalFilters();

    calculateReport();

    updateStatistics();

    updatePaymentLegend();

    updateStatusLegend();

    updateCharts();

    renderBillTable();


    showToast(
        "Report filters applied",
        "success"
    );

}


// ============================================================
// RESET FILTERS
// ============================================================

function resetFilters() {

    const dateFrom =
        document.getElementById(
            "dateFrom"
        );

    const dateTo =
        document.getElementById(
            "dateTo"
        );

    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        );

    const paymentStatus =
        document.getElementById(
            "paymentStatus"
        );


    const today =
        new Date();


    const firstDay =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


    if (dateFrom) {

        dateFrom.value =
            formatDateForInput(
                firstDay
            );

    }


    if (dateTo) {

        dateTo.value =
            formatDateForInput(
                today
            );

    }


    if (paymentMethod) {

        paymentMethod.value =
            "ALL";

    }


    if (paymentStatus) {

        paymentStatus.value =
            "ALL";

    }


    const search =
        document.getElementById(
            "globalSearch"
        );

    if (search) {

        search.value = "";

    }


    filteredBills =
        [...allBills];


    applyLocalFilters();

    calculateReport();

    updateStatistics();

    updatePaymentLegend();

    updateStatusLegend();

    updateCharts();

    renderBillTable();


    showToast(
        "Filters reset",
        "success"
    );

}


// ============================================================
// CALCULATE REPORT
// ============================================================

function calculateReport() {

    const bills =
        filteredBills;


    reportData = {

        totalBills:
            bills.length,

        totalRevenue:
            0,

        pendingAmount:
            0,

        paidAmount:
            0,

        totalDiscount:
            0,

        totalGST:
            0,

        averageBill:
            0,

        paymentMethods: {

            CASH: 0,

            UPI: 0,

            CARD: 0,

            OTHER: 0

        },

        statuses: {

            PAID: 0,

            PENDING: 0,

            CANCELLED: 0

        }

    };


    bills.forEach(
        function (bill) {

            const total =
                toNumber(
                    bill.totalAmount
                );


            const discount =
                toNumber(
                    bill.discount
                );


            const gst =
                toNumber(
                    bill.gst
                );


            const status =
                String(
                    bill.status
                )
                .toUpperCase();


            const paymentMethod =
                String(
                    bill.paymentMethod
                )
                .toUpperCase();


            // ----------------------------------------------------
            // TOTALS
            // ----------------------------------------------------

            reportData.totalRevenue +=
                total;

            reportData.totalDiscount +=
                discount;

            reportData.totalGST +=
                gst;


            // ----------------------------------------------------
            // STATUS
            // ----------------------------------------------------

            if (
                status === "PAID"
            ) {

                reportData.paidAmount +=
                    total;

                reportData.statuses.PAID++;

            }

            else if (
                status === "PENDING"
            ) {

                reportData.pendingAmount +=
                    total;

                reportData.statuses.PENDING++;

            }

            else if (
                status === "CANCELLED"
            ) {

                reportData.statuses.CANCELLED++;

            }


            // ----------------------------------------------------
            // PAYMENT METHOD
            // ----------------------------------------------------

            if (
                paymentMethod ===
                "CASH"
            ) {

                reportData.paymentMethods.CASH +=
                    total;

            }

            else if (
                paymentMethod ===
                "UPI"
            ) {

                reportData.paymentMethods.UPI +=
                    total;

            }

            else if (
                paymentMethod ===
                "CARD"
            ) {

                reportData.paymentMethods.CARD +=
                    total;

            }

            else {

                reportData.paymentMethods.OTHER +=
                    total;

            }

        }
    );


    if (
        reportData.totalBills > 0
    ) {

        reportData.averageBill =
            reportData.totalRevenue /
            reportData.totalBills;

    }

}


// ============================================================
// UPDATE STATISTICS
// ============================================================

function updateStatistics() {

    setText(
        "totalBills",
        formatNumber(
            reportData.totalBills
        )
    );


    setText(
        "totalRevenue",
        formatCurrency(
            reportData.totalRevenue
        )
    );


    setText(
        "pendingAmount",
        formatCurrency(
            reportData.pendingAmount
        )
    );


    setText(
        "paidAmount",
        formatCurrency(
            reportData.paidAmount
        )
    );


    setText(
        "totalDiscount",
        formatCurrency(
            reportData.totalDiscount
        )
    );


    setText(
        "totalGST",
        formatCurrency(
            reportData.totalGST
        )
    );


    setText(
        "averageBill",
        formatCurrency(
            reportData.averageBill
        )
    );


    // --------------------------------------------------------
    // STAT CARD SUBTEXT
    // --------------------------------------------------------

    const pendingCard =
        document.querySelector(
            "#pendingAmount"
        )?.parentElement;


    const paidCard =
        document.querySelector(
            "#paidAmount"
        )?.parentElement;


    if (pendingCard) {

        const small =
            pendingCard.querySelector(
                "small"
            );

        if (small) {

            small.textContent =
                "From " +
                reportData.statuses.PENDING +
                " Bills";

        }

    }


    if (paidCard) {

        const small =
            paidCard.querySelector(
                "small"
            );

        if (small) {

            small.textContent =
                "From " +
                reportData.statuses.PAID +
                " Bills";

        }

    }

}


// ============================================================
// PAYMENT LEGEND
// ============================================================

function updatePaymentLegend() {

    const total =
        reportData.totalRevenue;


    updatePaymentLegendItem(
        "cashAmount",
        reportData.paymentMethods.CASH,
        total
    );


    updatePaymentLegendItem(
        "upiAmount",
        reportData.paymentMethods.UPI,
        total
    );


    updatePaymentLegendItem(
        "cardAmount",
        reportData.paymentMethods.CARD,
        total
    );


    updatePaymentLegendItem(
        "otherAmount",
        reportData.paymentMethods.OTHER,
        total
    );

}


// ============================================================
// PAYMENT LEGEND ITEM
// ============================================================

function updatePaymentLegendItem(
    id,
    amount,
    total
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    const percentage =
        total > 0
            ? (
                amount /
                total *
                100
            )
            : 0;


    element.textContent =
        formatCurrency(
            amount
        ) +
        " (" +
        percentage.toFixed(0) +
        "%)";

}


// ============================================================
// STATUS LEGEND
// ============================================================

function updateStatusLegend() {

    const paid =
        reportData.statuses.PAID;

    const pending =
        reportData.statuses.PENDING;

    const cancelled =
        reportData.statuses.CANCELLED;

    const total =
        paid +
        pending +
        cancelled;


    setText(
        "statusTotal",
        formatNumber(
            total
        )
    );


    updateStatusLegendItem(
        "paidCount",
        paid,
        total
    );


    updateStatusLegendItem(
        "pendingCount",
        pending,
        total
    );


    updateStatusLegendItem(
        "cancelledCount",
        cancelled,
        total
    );


    /*
     * Update the <small> elements in the
     * status legend.
     */

    const rows =
        document.querySelectorAll(
            ".status-row"
        );


    rows.forEach(
        function (row) {

            const strong =
                row.querySelector(
                    "strong"
                );

            const small =
                row.querySelector(
                    "small"
                );


            if (
                !strong ||
                !small
            ) {

                return;

            }


            const status =
                strong.textContent
                    .trim()
                    .toUpperCase();


            let count = 0;


            if (
                status === "PAID"
            ) {

                count = paid;

            }

            else if (
                status === "PENDING"
            ) {

                count = pending;

            }

            else if (
                status === "CANCELLED"
            ) {

                count = cancelled;

            }


            const percentage =
                total > 0
                    ? (
                        count /
                        total *
                        100
                    )
                    : 0;


            small.textContent =
                count +
                " (" +
                percentage.toFixed(2) +
                "%)";

        }
    );

}


// ============================================================
// STATUS LEGEND ITEM
// ============================================================

function updateStatusLegendItem(
    id,
    value,
    total
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.textContent =
        formatNumber(
            value
        );

}


// ============================================================
// INITIALIZE CHARTS
// ============================================================

function initializeCharts() {

    if (
        typeof Chart ===
        "undefined"
    ) {

        console.warn(
            "Chart.js is not loaded."
        );

        return;

    }


    createRevenueChart();

    createPaymentChart();

    createStatusChart();

}


// ============================================================
// CREATE REVENUE CHART
// ============================================================

function createRevenueChart() {

    const canvas =
        document.getElementById(
            "revenueChart"
        );


    if (
        !canvas ||
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    if (revenueChart) {

        revenueChart.destroy();

    }


    revenueChart =
        new Chart(
            canvas.getContext(
                "2d"
            ),
            {

                type: "line",

                data: {

                    labels: [],

                    datasets: [

                        {

                            label:
                                "Revenue",

                            data: [],

                            borderWidth: 3,

                            tension: 0.35,

                            fill: true,

                            pointRadius: 4,

                            pointHoverRadius: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        mode: "index",

                        intersect: false

                    },

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function (
                                        context
                                    ) {

                                        return (
                                            " Revenue: " +
                                            formatCurrency(
                                                context.raw
                                            )
                                        );

                                    }

                            }

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                callback:
                                    function (
                                        value
                                    ) {

                                        return (
                                            "₹" +
                                            Number(
                                                value
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        );

                                    }

                            }

                        }

                    }

                }

            }
        );


    updateRevenueChart();

}


// ============================================================
// UPDATE REVENUE CHART
// ============================================================

function updateRevenueChart() {

    if (
        !revenueChart
    ) {

        return;

    }


    const chartData =
        buildRevenueChartData();


    revenueChart.data.labels =
        chartData.labels;


    revenueChart.data.datasets[0]
        .data =
        chartData.values;


    revenueChart.update();

}


// ============================================================
// BUILD REVENUE CHART DATA
// ============================================================

function buildRevenueChartData() {

    const map =
        new Map();


    filteredBills.forEach(
        function (bill) {

            const date =
                parseDate(
                    bill.billDate
                );


            if (!date) {

                return;

            }


            let key = "";


            if (
                selectedRevenuePeriod ===
                "Monthly"
            ) {

                key =
                    date.getFullYear() +
                    "-" +
                    String(
                        date.getMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );

            }

            else if (
                selectedRevenuePeriod ===
                "Weekly"
            ) {

                const weekDate =
                    new Date(
                        date
                    );


                const day =
                    weekDate.getDay();


                weekDate.setDate(
                    weekDate.getDate() -
                    day
                );


                key =
                    formatDateForInput(
                        weekDate
                    );

            }

            else {

                key =
                    formatDateForInput(
                        date
                    );

            }


            map.set(
                key,
                (
                    map.get(key) ||
                    0
                ) +
                toNumber(
                    bill.totalAmount
                )
            );

        }
    );


    const entries =
        Array.from(
            map.entries()
        )
        .sort(
            function (a, b) {

                return a[0]
                    .localeCompare(
                        b[0]
                    );

            }
        );


    return {

        labels:
            entries.map(
                function (entry) {

                    return formatChartLabel(
                        entry[0]
                    );

                }
            ),

        values:
            entries.map(
                function (entry) {

                    return Number(
                        entry[1].toFixed(
                            2
                        )
                    );

                }
            )

    };

}


// ============================================================
// CREATE PAYMENT CHART
// ============================================================

function createPaymentChart() {

    const canvas =
        document.getElementById(
            "paymentChart"
        );


    if (
        !canvas ||
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    if (paymentChart) {

        paymentChart.destroy();

    }


    paymentChart =
        new Chart(
            canvas.getContext(
                "2d"
            ),
            {

                type: "doughnut",

                data: {

                    labels: [

                        "Cash",

                        "UPI",

                        "Card",

                        "Other"

                    ],

                    datasets: [

                        {

                            data: [

                                0,

                                0,

                                0,

                                0

                            ],

                            borderWidth: 2

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "58%",

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function (
                                        context
                                    ) {

                                        return (
                                            " " +
                                            context.label +
                                            ": " +
                                            formatCurrency(
                                                context.raw
                                            )
                                        );

                                    }

                            }

                        }

                    }

                }

            }
        );


    updatePaymentChart();

}


// ============================================================
// UPDATE PAYMENT CHART
// ============================================================

function updatePaymentChart() {

    if (
        !paymentChart
    ) {

        return;

    }


    paymentChart.data.datasets[0]
        .data = [

            reportData.paymentMethods.CASH,

            reportData.paymentMethods.UPI,

            reportData.paymentMethods.CARD,

            reportData.paymentMethods.OTHER

        ];


    paymentChart.update();

}


// ============================================================
// CREATE STATUS CHART
// ============================================================

function createStatusChart() {

    const canvas =
        document.getElementById(
            "statusChart"
        );


    if (
        !canvas ||
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    if (statusChart) {

        statusChart.destroy();

    }


    statusChart =
        new Chart(
            canvas.getContext(
                "2d"
            ),
            {

                type: "doughnut",

                data: {

                    labels: [

                        "Paid",

                        "Pending",

                        "Cancelled"

                    ],

                    datasets: [

                        {

                            data: [

                                0,

                                0,

                                0

                            ],

                            borderWidth: 2

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "65%",

                    plugins: {

                        legend: {

                            display: false

                        }

                    }

                }

            }
        );


    updateStatusChart();

}


// ============================================================
// UPDATE STATUS CHART
// ============================================================

function updateStatusChart() {

    if (
        !statusChart
    ) {

        return;

    }


    statusChart.data.datasets[0]
        .data = [

            reportData.statuses.PAID,

            reportData.statuses.PENDING,

            reportData.statuses.CANCELLED

        ];


    statusChart.update();

}


// ============================================================
// UPDATE ALL CHARTS
// ============================================================

function updateCharts() {

    if (
        typeof Chart ===
        "undefined"
    ) {

        return;

    }


    if (!revenueChart) {

        createRevenueChart();

    }


    if (!paymentChart) {

        createPaymentChart();

    }


    if (!statusChart) {

        createStatusChart();

    }


    updateRevenueChart();

    updatePaymentChart();

    updateStatusChart();

}


// ============================================================
// GLOBAL SEARCH
// ============================================================

function handleGlobalSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        );


    if (!search) {

        return;

    }


    const keyword =
        search.value
            .trim()
            .toLowerCase();


    if (!keyword) {

        applyLocalFilters();

    }

    else {

        const filters =
            getFilters();


        filteredBills =
            allBills.filter(
                function (bill) {

                    const matchesSearch =

                        String(
                            bill.billNo
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        )

                        ||

                        String(
                            bill.orderNo
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        )

                        ||

                        String(
                            bill.customer
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        )

                        ||

                        String(
                            bill.table
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        )

                        ||

                        String(
                            bill.paymentMethod
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        )

                        ||

                        String(
                            bill.status
                        )
                        .toLowerCase()
                        .includes(
                            keyword
                        );


                    if (
                        !matchesSearch
                    ) {

                        return false;

                    }


                    // Date filters
                    if (
                        filters.dateFrom &&
                        bill.billDate
                    ) {

                        const billDate =
                            parseDate(
                                bill.billDate
                            );

                        const fromDate =
                            parseDate(
                                filters.dateFrom
                            );


                        if (
                            billDate &&
                            fromDate &&
                            billDate <
                                startOfDay(
                                    fromDate
                                )
                        ) {

                            return false;

                        }

                    }


                    if (
                        filters.dateTo &&
                        bill.billDate
                    ) {

                        const billDate =
                            parseDate(
                                bill.billDate
                            );

                        const toDate =
                            parseDate(
                                filters.dateTo
                            );


                        if (
                            billDate &&
                            toDate &&
                            billDate >
                                endOfDay(
                                    toDate
                                )
                        ) {

                            return false;

                        }

                    }


                    if (
                        filters.paymentMethod !==
                        "ALL" &&
                        bill.paymentMethod !==
                        filters.paymentMethod
                    ) {

                        return false;

                    }


                    if (
                        filters.paymentStatus !==
                        "ALL" &&
                        bill.status !==
                        filters.paymentStatus
                    ) {

                        return false;

                    }


                    return true;

                }
            );

    }


    currentPage = 1;

    calculateReport();

    updateStatistics();

    updatePaymentLegend();

    updateStatusLegend();

    updateCharts();

    renderBillTable();

}


// ============================================================
// RENDER BILL TABLE
// ============================================================

function renderBillTable() {

    const tbody =
        document.getElementById(
            "billTableBody"
        );


    if (!tbody) {

        return;

    }


    const total =
        filteredBills.length;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                pageSize
            )
        );


    if (
        currentPage >
        totalPages
    ) {

        currentPage =
            totalPages;

    }


    const start =
        (
            currentPage -
            1
        ) *
        pageSize;


    const end =
        Math.min(
            start +
            pageSize,
            total
        );


    const pageBills =
        filteredBills.slice(
            start,
            end
        );


    if (
        pageBills.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="11"
                    class="empty-row"
                >

                    <i class="bi bi-receipt"></i>

                    <div>
                        No bills found
                    </div>

                </td>

            </tr>

        `;


        updatePagination(
            total
        );

        return;

    }


    let rows = "";


    pageBills.forEach(
        function (bill) {

            const paymentClass =
                getPaymentClass(
                    bill.paymentMethod
                );


            const statusClass =
                getStatusClass(
                    bill.status
                );


            rows += `

                <tr>

                    <td>
                        ${escapeHtml(
                            bill.billNo ||
                            generateBillNo(
                                bill.billId
                            )
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            bill.orderNo ||
                            generateOrderNo(
                                bill.orderId
                            )
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            bill.customer ||
                            "Walk-in Customer"
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            bill.table ||
                            "—"
                        )}
                    </td>


                    <td>
                        ${formatDateTime(
                            bill.billDate
                        )}
                    </td>


                    <td>
                        ${formatCurrency(
                            bill.amount
                        )}
                    </td>


                    <td>
                        ${formatCurrency(
                            bill.discount
                        )}
                    </td>


                    <td>
                        ${formatCurrency(
                            bill.gst
                        )}
                    </td>


                    <td>
                        ${formatCurrency(
                            bill.totalAmount
                        )}
                    </td>


                    <td>

                        <span
                            class="payment-badge ${paymentClass}"
                        >
                            ${escapeHtml(
                                bill.paymentMethod
                            )}
                        </span>

                    </td>


                    <td>

                        <span
                            class="status-badge ${statusClass}"
                        >
                            ${escapeHtml(
                                bill.status
                            )}
                        </span>

                    </td>

                </tr>

            `;

        }
    );


    tbody.innerHTML =
        rows;


    updatePagination(
        total
    );

}


// ============================================================
// PAGINATION
// ============================================================

function initializePagination() {

    const first =
        document.querySelector(
            ".pagination button:nth-child(1)"
        );

    const prev =
        document.querySelector(
            ".pagination button:nth-child(2)"
        );

    const next =
        document.querySelector(
            ".pagination button:nth-last-child(2)"
        );

    const last =
        document.querySelector(
            ".pagination button:last-child"
        );


    if (first) {

        first.addEventListener(
            "click",
            function () {

                currentPage = 1;

                renderBillTable();

            }
        );

    }


    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                if (
                    currentPage >
                    1
                ) {

                    currentPage--;

                    renderBillTable();

                }

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {

                const totalPages =
                    Math.max(
                        1,
                        Math.ceil(
                            filteredBills.length /
                            pageSize
                        )
                    );


                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderBillTable();

                }

            }
        );

    }


    if (last) {

        last.addEventListener(
            "click",
            function () {

                currentPage =
                    Math.max(
                        1,
                        Math.ceil(
                            filteredBills.length /
                            pageSize
                        )
                    );

                renderBillTable();

            }
        );

    }

}


// ============================================================
// UPDATE PAGINATION
// ============================================================

function updatePagination(
    total
) {

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                pageSize
            )
        );


    const current =
        document.getElementById(
            "currentPage"
        );


    if (current) {

        current.textContent =
            currentPage;

    }


    /*
     * Your JSP currently has pagination
     * buttons without IDs.
     * Update them by position.
     */

    const pagination =
        document.querySelector(
            ".pagination"
        );


    if (!pagination) {

        return;

    }


    const buttons =
        pagination.querySelectorAll(
            "button"
        );


    if (buttons.length >= 2) {

        buttons[0].disabled =
            currentPage <= 1;

        buttons[1].disabled =
            currentPage <= 1;

    }


    if (buttons.length >= 2) {

        buttons[
            buttons.length - 2
        ].disabled =
            currentPage >= totalPages;

        buttons[
            buttons.length - 1
        ].disabled =
            currentPage >= totalPages;

    }


    const active =
        pagination.querySelector(
            ".active"
        );


    if (active) {

        active.textContent =
            currentPage;

    }


    const showingText =
        document.querySelector(
            ".showing-text"
        );


    if (showingText) {

        if (
            total === 0
        ) {

            showingText.textContent =
                "Showing 0 of 0 bills";

        }

        else {

            const start =
                (
                    currentPage -
                    1
                ) *
                pageSize +
                1;


            const end =
                Math.min(
                    currentPage *
                    pageSize,
                    total
                );


            showingText.textContent =
                "Showing " +
                start +
                " to " +
                end +
                " of " +
                total +
                " bills";

        }

    }

}


// ============================================================
// EXPORT CSV / EXCEL
// ============================================================

function exportExcel() {

    if (
        filteredBills.length === 0
    ) {

        showToast(
            "No bill data available to export",
            "error"
        );

        return;

    }


    let csv =
        "Bill No.,Order No.,Customer,Table,Bill Date,Amount,Discount,GST (5%),Total Amount,Payment Method,Status\n";


    filteredBills.forEach(
        function (bill) {

            csv += [

                csvValue(
                    bill.billNo ||
                    generateBillNo(
                        bill.billId
                    )
                ),

                csvValue(
                    bill.orderNo ||
                    generateOrderNo(
                        bill.orderId
                    )
                ),

                csvValue(
                    bill.customer
                ),

                csvValue(
                    bill.table
                ),

                csvValue(
                    formatDateTime(
                        bill.billDate
                    )
                ),

                csvValue(
                    bill.amount
                ),

                csvValue(
                    bill.discount
                ),

                csvValue(
                    bill.gst
                ),

                csvValue(
                    bill.totalAmount
                ),

                csvValue(
                    bill.paymentMethod
                ),

                csvValue(
                    bill.status
                )

            ].join(",") +
            "\n";

        }
    );


    const blob =
        new Blob(
            [
                "\uFEFF",
                csv
            ],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "Sankalp_Billing_Report_" +
        formatDateForInput(
            new Date()
        ) +
        ".csv";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Report exported successfully",
        "success"
    );

}


// ============================================================
// PRINT REPORT
// ============================================================

function printReport() {

    window.print();

}


// ============================================================
// LOADING STATE
// ============================================================

function showLoadingState() {

    const tbody =
        document.getElementById(
            "billTableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="11"
                style="
                    text-align:center;
                    padding:40px;
                "
            >

                <i
                    class="bi bi-arrow-repeat"
                    style="
                        font-size:28px;
                        animation:
                            spin 1s linear infinite;
                        display:inline-block;
                    "
                ></i>

                <div
                    style="
                        margin-top:10px;
                    "
                >
                    Loading reports...
                </div>

            </td>

        </tr>

    `;

}


// ============================================================
// RESET REPORT DATA
// ============================================================

function resetReportData() {

    reportData = {

        totalBills: 0,

        totalRevenue: 0,

        pendingAmount: 0,

        paidAmount: 0,

        totalDiscount: 0,

        totalGST: 0,

        averageBill: 0,

        paymentMethods: {

            CASH: 0,

            UPI: 0,

            CARD: 0,

            OTHER: 0

        },

        statuses: {

            PAID: 0,

            PENDING: 0,

            CANCELLED: 0

        }

    };

}


// ============================================================
// HELPERS
// ============================================================

function toNumber(
    value
) {

    const number =
        Number(
            value
        );


    if (
        Number.isFinite(
            number
        )
    ) {

        return number;

    }


    return 0;

}


// ============================================================
// FORMAT CURRENCY
// ============================================================

function formatCurrency(
    value
) {

    return (
        "₹" +
        toNumber(
            value
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


// ============================================================
// FORMAT NUMBER
// ============================================================

function formatNumber(
    value
) {

    return toNumber(
        value
    ).toLocaleString(
        "en-IN"
    );

}


// ============================================================
// SET TEXT
// ============================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


// ============================================================
// GENERATE BILL NUMBER
// ============================================================

function generateBillNo(
    id
) {

    if (!id) {

        return "—";

    }


    return (
        "BILL-" +
        String(
            id
        )
        .padStart(
            6,
            "0"
        )
    );

}


// ============================================================
// GENERATE ORDER NUMBER
// ============================================================

function generateOrderNo(
    id
) {

    if (!id) {

        return "—";

    }


    return (
        "ORD-" +
        String(
            id
        )
    );

}


// ============================================================
// PAYMENT CLASS
// ============================================================

function getPaymentClass(
    method
) {

    switch (
        String(
            method
        )
        .toUpperCase()
    ) {

        case "CASH":

            return "cash";


        case "UPI":

            return "upi";


        case "CARD":

            return "card";


        default:

            return "other";

    }

}


// ============================================================
// STATUS CLASS
// ============================================================

function getStatusClass(
    status
) {

    switch (
        String(
            status
        )
        .toUpperCase()
    ) {

        case "PAID":

            return "paid";


        case "PENDING":

            return "pending";


        case "CANCELLED":

            return "cancelled";


        default:

            return "pending";

    }

}


// ============================================================
// PARSE DATE
// ============================================================

function parseDate(
    value
) {

    if (!value) {

        return null;

    }


    if (
        value instanceof Date
    ) {

        return isNaN(
            value.getTime()
        )
            ? null
            : value;

    }


    const stringValue =
        String(
            value
        )
        .trim();


    if (!stringValue) {

        return null;

    }


    /*
     * MySQL:
     * 2026-08-13 15:26:00
     *
     * Java:
     * 2026-08-13T15:26:00
     */

    let normalized =
        stringValue.replace(
            " ",
            "T"
        );


    let date =
        new Date(
            normalized
        );


    if (
        !isNaN(
            date.getTime()
        )
    ) {

        return date;

    }


    /*
     * Handle dd/MM/yyyy
     */

    const match =
        stringValue.match(
            /^(\d{2})\/(\d{2})\/(\d{4})/
        );


    if (match) {

        date =
            new Date(
                Number(
                    match[3]
                ),
                Number(
                    match[2]
                ) - 1,
                Number(
                    match[1]
                )
            );


        if (
            !isNaN(
                date.getTime()
            )
        ) {

            return date;

        }

    }


    return null;

}


// ============================================================
// START OF DAY
// ============================================================

function startOfDay(
    date
) {

    const result =
        new Date(
            date
        );


    result.setHours(
        0,
        0,
        0,
        0
    );


    return result;

}


// ============================================================
// END OF DAY
// ============================================================

function endOfDay(
    date
) {

    const result =
        new Date(
            date
        );


    result.setHours(
        23,
        59,
        59,
        999
    );


    return result;

}


// ============================================================
// FORMAT DATE INPUT
// ============================================================

function formatDateForInput(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        )
        .padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


// ============================================================
// FORMAT DATE TIME
// ============================================================

function formatDateTime(
    value
) {

    const date =
        parseDate(
            value
        );


    if (!date) {

        return "—";

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


// ============================================================
// FORMAT CHART LABEL
// ============================================================

function formatChartLabel(
    value
) {

    if (
        !value
    ) {

        return value;

    }


    /*
     * Monthly
     */

    if (
        /^\d{4}-\d{2}$/
        .test(
            value
        )
    ) {

        const parts =
            value.split(
                "-"
            );


        const date =
            new Date(
                Number(
                    parts[0]
                ),
                Number(
                    parts[1]
                ) - 1,
                1
            );


        return date.toLocaleDateString(
            "en-IN",
            {
                month: "short",
                year: "numeric"
            }
        );

    }


    const date =
        parseDate(
            value
        );


    if (!date) {

        return value;

    }


    return date.toLocaleDateString(
        "en-IN",
        {

            day: "2-digit",

            month: "short"

        }
    );

}


// ============================================================
// CSV VALUE
// ============================================================

function csvValue(
    value
) {

    return (
        '"' +
        String(
            value ?? ""
        )
        .replace(
            /"/g,
            '""'
        ) +
        '"'
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(
    value
) {

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


// ============================================================
// TOAST
// ============================================================

function showToast(
    message,
    type = "success"
) {

    let toast =
        document.getElementById(
            "reportToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "reportToast";


        toast.style.position =
            "fixed";

        toast.style.right =
            "25px";

        toast.style.bottom =
            "25px";

        toast.style.zIndex =
            "99999";

        toast.style.padding =
            "14px 20px";

        toast.style.borderRadius =
            "8px";

        toast.style.fontSize =
            "14px";

        toast.style.fontWeight =
            "600";

        toast.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.20)";

        toast.style.background =
            "#ffffff";

        toast.style.border =
            "1px solid #dddddd";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.color =
        type === "error"
            ? "#dc3545"
            : "#198754";


    toast.style.display =
        "block";


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            function () {

                toast.style.display =
                    "none";

            },
            3000
        );

}


// ============================================================
// PUBLIC DEBUG OBJECT
// ============================================================

window.SankalpReports = {

    reload:
        loadReports,

    reset:
        resetFilters,

    filter:
        applyFilters,

    exportExcel:
        exportExcel,

    print:
        printReport,

    getBills:
        function () {

            return allBills;

        },

    getFilteredBills:
        function () {

            return filteredBills;

        },

    getReportData:
        function () {

            return reportData;

        }

};


console.log(
    "Reports JS ready."
);