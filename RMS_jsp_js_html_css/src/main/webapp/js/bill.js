"use strict";


// ========================================================
// API URLS
// ========================================================

const BILL_API =
    "http://localhost:8080/api/bill";

const ORDER_API =
    "http://localhost:8080/api/order";


// ========================================================
// JWT TOKEN
// ========================================================

const billToken =
    localStorage.getItem("token");


// ========================================================
// GLOBAL VARIABLES
// ========================================================

let currentOrder = null;

let currentOrderDetails = [];

let currentBill = null;


// ========================================================
// LOGIN CHECK
// ========================================================

if (!billToken) {

    alert(
        "Please Login First"
    );

    window.location.href =
        "login.jsp";
}


// ========================================================
// PAGE LOAD
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeBilling();

    }
);


// ========================================================
// INITIALIZE
// ========================================================

function initializeBilling() {

    const loadOrderBtn =
        document.getElementById(
            "loadOrderBtn"
        );


    const generateBillBtn =
        document.getElementById(
            "generateBillBtn"
        );


    const clearBillBtn =
        document.getElementById(
            "clearBillBtn"
        );


    const printBillBtn =
        document.getElementById(
            "printBillBtn"
        );


    const orderId =
        document.getElementById(
            "orderId"
        );


    if (loadOrderBtn) {

        loadOrderBtn.addEventListener(
            "click",
            loadOrder
        );

    }


    if (generateBillBtn) {

        generateBillBtn.addEventListener(
            "click",
            generateBill
        );

    }


    if (clearBillBtn) {

        clearBillBtn.addEventListener(
            "click",
            clearBill
        );

    }


    if (printBillBtn) {

        printBillBtn.addEventListener(
            "click",
            printBill
        );

    }


    if (orderId) {

        orderId.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    loadOrder();

                }

            }
        );

    }


    updateGenerateButton();

}


// ========================================================
// COMMON HEADERS
// ========================================================

function getHeaders() {

    return {

        "Authorization":
            "Bearer " + billToken,

        "Content-Type":
            "application/json"

    };

}


// ========================================================
// LOAD ORDER
// ========================================================

async function loadOrder() {

    const orderIdElement =
        document.getElementById(
            "orderId"
        );


    if (!orderIdElement) {
        return;
    }


    const orderId =
        Number(
            orderIdElement.value
        );


    // ----------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------

    if (!orderId || orderId <= 0) {

        alert(
            "Please enter a valid Order ID."
        );

        orderIdElement.focus();

        return;

    }


    const loadButton =
        document.getElementById(
            "loadOrderBtn"
        );


    if (loadButton) {

        loadButton.disabled =
            true;

        loadButton.innerHTML = `

            <span
                class="spinner-border
                       spinner-border-sm
                       me-2">
            </span>

            Loading...

        `;

    }


    try {

        // ------------------------------------------------
        // LOAD ORDER
        // ------------------------------------------------

        const orderResponse =
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


        if (
            orderResponse.status === 401 ||
            orderResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        const orderText =
            await orderResponse.text();


        if (!orderResponse.ok) {

            throw new Error(
                "Unable to load Order #" +
                orderId +
                "."
            );

        }


        currentOrder =
            orderText
                ? JSON.parse(orderText)
                : null;


        if (!currentOrder) {

            throw new Error(
                "Order not found."
            );

        }


        // ------------------------------------------------
        // CHECK ORDER STATUS
        // ------------------------------------------------

        const status =
            String(
                currentOrder.orderStatus ||
                ""
            )
            .trim()
            .toUpperCase();


        if (status === "CANCELLED") {

            throw new Error(
                "Cancelled orders cannot be billed."
            );

        }


        if (status === "BILLED") {

            alert(
                "This order is already billed."
            );


            await loadExistingBill(
                orderId
            );


            return;

        }


        // ------------------------------------------------
        // LOAD ORDER DETAILS
        // ------------------------------------------------

        const detailsResponse =
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


        if (
            detailsResponse.status === 401 ||
            detailsResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        const detailsText =
            await detailsResponse.text();


        if (!detailsResponse.ok) {

            throw new Error(
                "Unable to load order items."
            );

        }


        currentOrderDetails =
            detailsText
                ? JSON.parse(detailsText)
                : [];


        if (
            !Array.isArray(
                currentOrderDetails
            )
        ) {

            currentOrderDetails = [];

        }


        // ------------------------------------------------
        // DISPLAY ORDER
        // ------------------------------------------------

        displayOrder();


        updateGenerateButton();


    }

    catch (error) {

        console.error(
            "Load Order Error:",
            error
        );


        currentOrder = null;

        currentOrderDetails = [];


        alert(
            error.message ||
            "Unable to load order."
        );

    }

    finally {

        if (loadButton) {

            loadButton.disabled =
                false;

            loadButton.innerHTML = `

                <i
                    class="fa-solid
                           fa-magnifying-glass
                           me-1">
                </i>

                Load Order

            `;

        }

    }

}


// ========================================================
// DISPLAY ORDER
// ========================================================

function displayOrder() {

    if (!currentOrder) {
        return;
    }


    // ----------------------------------------------------
    // BILL INFORMATION
    // ----------------------------------------------------

    setText(
        "billNo",
        "-"
    );


    setText(
        "billOrderId",
        currentOrder.orderId ||
        "-"
    );


    setText(
        "customerName",
        currentOrder.customerName ||
        "-"
    );


    setText(
        "billDate",
        formatDate(
            currentOrder.orderDate
        )
    );


    // ----------------------------------------------------
    // TABLE
    // ----------------------------------------------------

    const table =
        document.getElementById(
            "billTable"
        );


    if (!table) {
        return;
    }


    if (
        currentOrderDetails.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center
                           text-danger
                           py-4">

                    No items found for this order.

                </td>

            </tr>

        `;

        calculateBillTotals();

        return;

    }


    let rows = "";


    currentOrderDetails.forEach(
        function (item, index) {

            const price =
                Number(
                    item.price || 0
                );


            const quantity =
                Number(
                    item.quantity || 0
                );


            const subtotal =
                Number(
                    item.subtotal ||
                    price * quantity
                );


            rows += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${escapeHtml(
                            item.itemName ||
                            "-"
                        )}

                    </td>


                    <td class="text-end">

                        ₹${price.toFixed(2)}

                    </td>


                    <td class="text-center">

                        ${quantity}

                    </td>


                    <td class="text-end">

                        ₹${subtotal.toFixed(2)}

                    </td>

                </tr>

            `;

        }
    );


    table.innerHTML =
        rows;


    calculateBillTotals();

}


// ========================================================
// CALCULATE BILL TOTALS
// ========================================================

function calculateBillTotals() {

    let subtotal = 0;


    currentOrderDetails.forEach(
        function (item) {

            subtotal +=
                Number(
                    item.subtotal ||
                    (
                        Number(
                            item.price || 0
                        ) *
                        Number(
                            item.quantity || 0
                        )
                    )
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

    const discountElement =
        document.getElementById(
            "discount"
        );


    let discount =
        discountElement
            ? Number(
                discountElement.value || 0
            )
            : 0;


    if (discount < 0) {

        discount = 0;

    }


    if (discount > subtotal + gst) {

        discount =
            subtotal + gst;

    }


    // ----------------------------------------------------
    // GRAND TOTAL
    // ----------------------------------------------------

    const grandTotal =
        subtotal +
        gst -
        discount;


    // ----------------------------------------------------
    // DISPLAY
    // ----------------------------------------------------

    setText(
        "subTotal",
        subtotal.toFixed(2)
    );


    setText(
        "gst",
        gst.toFixed(2)
    );


    setText(
        "billDiscount",
        discount.toFixed(2)
    );


    setText(
        "grandTotal",
        grandTotal.toFixed(2)
    );


    updateGenerateButton();

}


// ========================================================
// GENERATE BILL
// ========================================================

async function generateBill() {

    if (!currentOrder) {

        alert(
            "Please load an order first."
        );

        return;

    }


    const orderId =
        Number(
            currentOrder.orderId
        );


    if (!orderId) {

        alert(
            "Invalid Order ID."
        );

        return;

    }


    const paymentElement =
        document.getElementById(
            "paymentMethod"
        );


    const paymentMethod =
        paymentElement
            ? paymentElement.value
            : "";


    // ----------------------------------------------------
    // PAYMENT VALIDATION
    // ----------------------------------------------------

    if (!paymentMethod) {

        alert(
            "Please select a payment method."
        );

        paymentElement.focus();

        return;

    }


    // ----------------------------------------------------
    // DISCOUNT
    // ----------------------------------------------------

    const discountElement =
        document.getElementById(
            "discount"
        );


    const discount =
        discountElement
            ? Number(
                discountElement.value || 0
            )
            : 0;


    const button =
        document.getElementById(
            "generateBillBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML = `

            <span
                class="spinner-border
                       spinner-border-sm
                       me-2">
            </span>

            Generating...

        `;

    }


    try {

        // ------------------------------------------------
        // REQUEST
        // ------------------------------------------------

        const billData = {

            orderId:
                orderId,

            paymentMethod:
                paymentMethod,

            discount:
                discount

        };


        console.log(
            "BILL REQUEST:",
            JSON.stringify(
                billData,
                null,
                2
            )
        );


        // ------------------------------------------------
        // CREATE BILL
        // ------------------------------------------------

        const response =
            await fetch(
                BILL_API +
                "/create",
                {

                    method: "POST",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            billData
                        )

                }
            );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        const responseText =
            await response.text();


        console.log(
            "BILL RESPONSE:",
            responseText
        );


        if (!response.ok) {

            let message =
                "Unable to generate bill.";


            try {

                const errorJson =
                    JSON.parse(
                        responseText
                    );


                message =
                    errorJson.message ||
                    errorJson.error ||
                    message;

            }

            catch (error) {

                if (responseText) {

                    message =
                        responseText;

                }

            }


            throw new Error(
                message
            );

        }


        let result = {};


        try {

            result =
                responseText
                    ? JSON.parse(
                        responseText
                    )
                    : {};

        }

        catch (error) {

            // Plain text response.
        }


        const billId =
            result.billId;


        alert(
            result.message ||
            "Bill Generated Successfully"
        );


        // ------------------------------------------------
        // LOAD GENERATED BILL
        // ------------------------------------------------

        if (billId) {

            await loadGeneratedBill(
                billId
            );

        }


        // ------------------------------------------------
        // CLEAR ORDER
        // ------------------------------------------------

        currentOrder = null;

        currentOrderDetails = [];


        updateGenerateButton();

    }

    catch (error) {

        console.error(
            "Generate Bill Error:",
            error
        );


        alert(
            "Unable To Generate Bill\n\n" +
            error.message
        );

    }

    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML = `

                <i
                    class="fa-solid
                           fa-file-invoice
                           me-1">
                </i>

                Generate Bill

            `;

        }

    }

}


// ========================================================
// LOAD GENERATED BILL
// ========================================================

async function loadGeneratedBill(
    billId
) {

    try {

        const response =
            await fetch(
                BILL_API +
                "/" +
                encodeURIComponent(
                    billId
                ),
                {

                    method: "GET",

                    headers:
                        getHeaders()

                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load generated bill."
            );

        }


        const bill =
            await response.json();


        currentBill =
            bill;


        displayBill(
            bill
        );

    }

    catch (error) {

        console.error(
            "Load Generated Bill Error:",
            error
        );

    }

}


// ========================================================
// LOAD EXISTING BILL
// ========================================================

async function loadExistingBill(
    orderId
) {

    try {

        const response =
            await fetch(
                BILL_API +
                "/order/" +
                encodeURIComponent(
                    orderId
                ),
                {

                    method: "GET",

                    headers:
                        getHeaders()

                }
            );


        if (!response.ok) {

            throw new Error(
                "Bill not found."
            );

        }


        const bill =
            await response.json();


        currentBill =
            bill;


        displayBill(
            bill
        );


        updateGenerateButton();

    }

    catch (error) {

        console.error(
            "Existing Bill Error:",
            error
        );

    }

}


// ========================================================
// DISPLAY BILL
// ========================================================

function displayBill(
    bill
) {

    if (!bill) {
        return;
    }


    setText(
        "billNo",
        bill.billNo ||
        "-"
    );


    setText(
        "billOrderId",
        bill.orderId ||
        "-"
    );


    setText(
        "billDate",
        formatDate(
            bill.billDate
        )
    );


    setText(
        "subTotal",
        Number(
            bill.subtotal || 0
        ).toFixed(2)
    );


    setText(
        "gst",
        Number(
            bill.gst || 0
        ).toFixed(2)
    );


    setText(
        "billDiscount",
        Number(
            bill.discount || 0
        ).toFixed(2)
    );


    setText(
        "grandTotal",
        Number(
            bill.grandTotal || 0
        ).toFixed(2)
    );


    setText(
        "billPaymentMethod",
        bill.paymentMethod ||
        "-"
    );

}


// ========================================================
// DISCOUNT CHANGE
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const discount =
            document.getElementById(
                "discount"
            );


        if (discount) {

            discount.addEventListener(
                "input",
                calculateBillTotals
            );

        }

    }
);


// ========================================================
// PAYMENT CHANGE
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const paymentMethod =
            document.getElementById(
                "paymentMethod"
            );


        if (paymentMethod) {

            paymentMethod.addEventListener(
                "change",
                function () {

                    setText(
                        "billPaymentMethod",
                        paymentMethod.value ||
                        "-"
                    );

                    updateGenerateButton();

                }
            );

        }

    }
);


// ========================================================
// UPDATE GENERATE BUTTON
// ========================================================

function updateGenerateButton() {

    const button =
        document.getElementById(
            "generateBillBtn"
        );


    if (!button) {
        return;
    }


    const status =
        currentOrder
            ? String(
                currentOrder.orderStatus ||
                ""
            )
                .trim()
                .toUpperCase()
            : "";


    if (
        !currentOrder ||
        status === "BILLED" ||
        status === "CANCELLED"
    ) {

        button.disabled =
            true;

        return;

    }


    button.disabled =
        false;

}


// ========================================================
// CLEAR BILL
// ========================================================

function clearBill() {

    currentOrder = null;

    currentOrderDetails = [];

    currentBill = null;


    const orderId =
        document.getElementById(
            "orderId"
        );


    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        );


    const discount =
        document.getElementById(
            "discount"
        );


    if (orderId) {

        orderId.value = "";

    }


    if (paymentMethod) {

        paymentMethod.value = "";

    }


    if (discount) {

        discount.value = "0";

    }


    setText(
        "billNo",
        "-"
    );


    setText(
        "billOrderId",
        "-"
    );


    setText(
        "customerName",
        "-"
    );


    setText(
        "billDate",
        "-"
    );


    setText(
        "subTotal",
        "0.00"
    );


    setText(
        "gst",
        "0.00"
    );


    setText(
        "billDiscount",
        "0.00"
    );


    setText(
        "grandTotal",
        "0.00"
    );


    setText(
        "billPaymentMethod",
        "-"
    );


    const table =
        document.getElementById(
            "billTable"
        );


    if (table) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center
                           text-muted
                           py-5">

                    <i
                        class="fa-solid
                               fa-file-invoice
                               fa-3x
                               mb-3">
                    </i>

                    <br>

                    Load an order to generate bill

                </td>

            </tr>

        `;

    }


    updateGenerateButton();

}


// ========================================================
// PRINT BILL
// ========================================================

function printBill() {

    const billArea =
        document.getElementById(
            "billArea"
        );


    if (!billArea) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    printWindow.document.write(`

        <html>

        <head>

            <title>
                Restaurant Bill
            </title>


            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet">


            <style>

                body {
                    padding: 30px;
                    font-family: Arial, sans-serif;
                }

                .no-print {
                    display: none !important;
                }

            </style>

        </head>


        <body>

            ${billArea.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(
        function () {

            printWindow.print();

            printWindow.close();

        },
        500
    );

}


// ========================================================
// UNAUTHORIZED
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
            isNaN(
                date.getTime()
            )
        ) {

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
// HTML ESCAPE
// ========================================================

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