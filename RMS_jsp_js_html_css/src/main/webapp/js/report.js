"use strict";

const REPORT_API = "http://localhost:8080/api/report";

const token = localStorage.getItem("token");

// =====================================================
// LOGIN CHECK
// =====================================================

if (!token) {

    alert("Please Login First");

    window.location.href = "login.jsp";

}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadReport();

});


// =====================================================
// LOAD COMPLETE REPORT
// =====================================================

async function loadReport() {

    console.log("Loading report...");


    try {

        // =================================================
        // LOAD DATE WISE SALES
        // =================================================

        const salesResponse = await fetch(
            REPORT_API + "/sales/date",
            {
                method: "GET",

                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json"
                }
            }
        );


        // =================================================
        // AUTH ERROR
        // =================================================

        if (
            salesResponse.status === 401 ||
            salesResponse.status === 403
        ) {

            localStorage.removeItem("token");

            alert("Session expired. Please login again.");

            window.location.href = "login.jsp";

            return;
        }


        // =================================================
        // OTHER ERROR
        // =================================================

        if (!salesResponse.ok) {

            throw new Error(
                "Sales API Error: " +
                salesResponse.status
            );

        }


        // =================================================
        // READ JSON
        // =================================================

        const salesData =
            await salesResponse.json();


        console.log(
            "DATE WISE SALES:",
            salesData
        );


        // =================================================
        // DISPLAY DATE WISE SALES
        // =================================================

        displaySalesReport(salesData);


        // =================================================
        // LOAD TOTAL SALES
        // =================================================

        await loadTotalSales();


        // =================================================
        // LOAD TOTAL ORDERS
        // =================================================

        await loadTotalOrders();


        // =================================================
        // LOAD CUSTOMERS
        // =================================================

        await loadCustomers();


        // =================================================
        // LOAD TOP MENU
        // =================================================

        await loadTopMenu();


        // =================================================
        // GENERATED DATE
        // =================================================

        const generatedDate =
            document.getElementById("generatedDate");

        if (generatedDate) {

            generatedDate.textContent =
                new Date().toLocaleString("en-IN");

        }


        console.log("Report loaded successfully.");

    }

    catch (error) {

        console.error(
            "REPORT ERROR:",
            error
        );


        const table =
            document.getElementById("reportTable");


        if (table) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="3"
                        class="text-center text-danger py-5">

                        <i
                            class="fa-solid fa-triangle-exclamation fa-2x mb-3">
                        </i>

                        <br>

                        <strong>
                            Unable to load report
                        </strong>

                        <br>

                        <small>
                            ${escapeHtml(error.message)}
                        </small>

                    </td>

                </tr>

            `;

        }

    }

}


// =====================================================
// DISPLAY DATE WISE SALES
// =====================================================

function displaySalesReport(data) {

    const table =
        document.getElementById("reportTable");


    if (!table) {

        console.error(
            "reportTable element not found."
        );

        return;

    }


    let rows = "";

    let totalSales = 0;

    let totalOrders = 0;


    // =================================================
    // NO DATA
    // =================================================

    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        rows = `

            <tr>

                <td
                    colspan="3"
                    class="text-center text-muted py-5">

                    <i
                        class="fa-solid fa-chart-line fa-2x mb-3">
                    </i>

                    <br>

                    No Sales Report Available

                </td>

            </tr>

        `;

    }

    else {

        data.forEach(function (report) {

            const orders =
                Number(report.totalOrders || 0);

            const sales =
                Number(report.totalSales || 0);


            totalOrders += orders;

            totalSales += sales;


            rows += `

                <tr>

                    <td class="text-center">

                        ${escapeHtml(
                            report.reportDate
                        )}

                    </td>


                    <td class="text-center">

                        ${orders}

                    </td>


                    <td class="text-end">

                        ₹${sales.toFixed(2)}

                    </td>

                </tr>

            `;

        });

    }


    table.innerHTML = rows;


    // =================================================
    // REPORT DAYS
    // =================================================

    const reportDays =
        document.getElementById("reportDays");


    if (reportDays) {

        reportDays.textContent =
            Array.isArray(data)
                ? data.length
                : 0;

    }


    // =================================================
    // FALLBACK TOTALS
    // =================================================

    setText(
        "totalSales",
        totalSales.toFixed(2)
    );

    setText(
        "totalSalesFooter",
        totalSales.toFixed(2)
    );

    setText(
        "summarySales",
        totalSales.toFixed(2)
    );


    setText(
        "totalOrders",
        totalOrders
    );

    setText(
        "summaryOrders",
        totalOrders
    );

}


// =====================================================
// TOTAL SALES
// GET /api/report/sales
// =====================================================

async function loadTotalSales() {

    try {

        const response =
            await fetch(
                REPORT_API + "/sales",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token,

                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Total Sales API Error: " +
                response.status
            );

        }


        const total =
            Number(
                await response.json()
            );


        console.log(
            "TOTAL SALES:",
            total
        );


        setText(
            "totalSales",
            total.toFixed(2)
        );


        setText(
            "totalSalesFooter",
            total.toFixed(2)
        );


        setText(
            "summarySales",
            total.toFixed(2)
        );

    }

    catch (error) {

        console.error(
            "TOTAL SALES ERROR:",
            error
        );

    }

}


// =====================================================
// TOTAL PAID ORDERS
// GET /api/report/orders
// =====================================================

async function loadTotalOrders() {

    try {

        const response =
            await fetch(
                REPORT_API + "/orders",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token,

                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Total Orders API Error: " +
                response.status
            );

        }


        const total =
            Number(
                await response.json()
            );


        console.log(
            "TOTAL PAID ORDERS:",
            total
        );


        setText(
            "totalOrders",
            total
        );


        setText(
            "summaryOrders",
            total
        );

    }

    catch (error) {

        console.error(
            "TOTAL ORDERS ERROR:",
            error
        );

    }

}


// =====================================================
// TOTAL CUSTOMERS
// GET /api/report/customer
// =====================================================

async function loadCustomers() {

    try {

        const response =
            await fetch(
                REPORT_API + "/customer",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token,

                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Customer API Error: " +
                response.status
            );

        }


        const total =
            Number(
                await response.json()
            );


        console.log(
            "ACTIVE CUSTOMERS:",
            total
        );


        setText(
            "totalCustomers",
            total
        );


        setText(
            "summaryCustomers",
            total
        );

    }

    catch (error) {

        console.error(
            "CUSTOMER ERROR:",
            error
        );

    }

}


// =====================================================
// TOP SELLING MENU
// GET /api/report/top-menu
// =====================================================

async function loadTopMenu() {

    const table =
        document.getElementById(
            "topMenuTable"
        );


    if (!table) {

        return;

    }


    try {

        const response =
            await fetch(
                REPORT_API + "/top-menu",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token,

                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Top Menu API Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "TOP MENU:",
            data
        );


        let rows = "";


        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            rows = `

                <tr>

                    <td
                        colspan="4"
                        class="text-center text-muted py-4">

                        No top-selling menu data available.

                    </td>

                </tr>

            `;

        }

        else {

            data.forEach(
                function (item, index) {

                    const itemName =
                        item.itemName || "-";


                    const quantity =
                        Number(
                            item.totalQuantity || 0
                        );


                    const sales =
                        Number(
                            item.totalSales || 0
                        );


                    rows += `

                        <tr>

                            <td class="text-center fw-bold">

                                ${index + 1}

                            </td>


                            <td>

                                ${escapeHtml(
                                    itemName
                                )}

                            </td>


                            <td class="text-center">

                                ${quantity}

                            </td>


                            <td class="text-end">

                                ₹${sales.toFixed(2)}

                            </td>

                        </tr>

                    `;

                }
            );

        }


        table.innerHTML = rows;

    }

    catch (error) {

        console.error(
            "TOP MENU ERROR:",
            error
        );


        table.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-center text-danger py-4">

                    Unable to load top menu.

                    <br>

                    <small>
                        ${escapeHtml(error.message)}
                    </small>

                </td>

            </tr>

        `;

    }

}


// =====================================================
// PRINT REPORT
// =====================================================

function printReport() {

    window.print();

}


// =====================================================
// SET TEXT
// =====================================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = value;

    }

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHtml(value) {

    return String(value ?? "")

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