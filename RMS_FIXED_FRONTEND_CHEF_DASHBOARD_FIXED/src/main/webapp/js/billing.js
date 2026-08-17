"use strict";

/* =========================================================
   SANKALP RMS
   BILLING DASHBOARD
   COMPLETE CORRECTED VERSION
   ========================================================= */

(function () {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    console.log("======================================");
    console.log("Sankalp RMS - Billing Dashboard");
    console.log("======================================");


    /* =====================================================
       FRONTEND CONTEXT PATH
    ===================================================== */

    const pathParts =
        window.location.pathname
            .split("/")
            .filter(Boolean);

    const CTX =
        pathParts.length > 0
            ? "/" + pathParts[0]
            : "";


    /* =====================================================
       BACKEND BASE URL
    ===================================================== */

    const BACKEND_BASE_URL =
        "http://localhost:8080";


    /* =====================================================
       API URLS
    ===================================================== */

    const BILL_API =
        `${BACKEND_BASE_URL}/api/bill`;

    const ORDER_API =
        `${BACKEND_BASE_URL}/api/order`;


    /* =====================================================
       GST
    ===================================================== */

    const GST_RATE = 0.05;


    console.log(
        "Frontend Context Path:",
        CTX
    );

    console.log(
        "Backend Base URL:",
        BACKEND_BASE_URL
    );

    console.log(
        "Bill API:",
        BILL_API
    );

    console.log(
        "Order API:",
        ORDER_API
    );

    console.log("======================================");


    /* =====================================================
       STATE
    ===================================================== */

    const state = {

        bills: [],

        filteredBills: [],

        orders: [],

        selectedOrder: null,

        selectedDetails: [],

        page: 0,

        size: 6,

        paymentMethod: "CASH",

        paymentStatus: "PAID",

        discount: 0,

        lastCreatedBill: null

    };


    /* =====================================================
       SHORT SELECTOR
    ===================================================== */

    const $ = (id) =>
        document.getElementById(id);


    /* =====================================================
       TOKEN
    ===================================================== */

    function getToken() {

        return (
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            ""
        );
    }


    /* =====================================================
       HEADERS
    ===================================================== */

    function getHeaders(json = false) {

        const headers = {};

        const token =
            getToken();

        if (token) {

            headers["Authorization"] =
                `Bearer ${token}`;
        }

        if (json) {

            headers["Content-Type"] =
                "application/json";
        }

        return headers;
    }


    /* =====================================================
       API REQUEST
    ===================================================== */

    async function api(
        url,
        options = {}
    ) {

        console.log(
            "API Request:",
            options.method || "GET",
            url
        );

        const response =
            await fetch(
                url,
                {
                    ...options,

                    headers: {
                        ...getHeaders(
                            !!options.body
                        ),

                        ...(options.headers || {})
                    }
                }
            );


        const text =
            await response.text();


        let data = null;


        try {

            data =
                text
                    ? JSON.parse(text)
                    : null;

        } catch {

            data = text;
        }


        if (!response.ok) {

            let message =
                `HTTP ${response.status}`;


            if (typeof data === "string") {

                message = data;

            } else if (data?.message) {

                message = data.message;

            } else if (data?.error) {

                message = data.error;
            }


            throw new Error(
                message
            );
        }


        return data;
    }


    /* =====================================================
       MONEY
    ===================================================== */

    function money(value) {

        const number =
            Number(value || 0);


        return `₹ ${number.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;
    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        return String(
            value ?? ""
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );
    }


    /* =====================================================
       DATE
    ===================================================== */

    function dateText(value) {

        if (!value) {

            return "-";
        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return String(value);
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


    /* =====================================================
       TIME
    ===================================================== */

    function timeText(value) {

        if (!value) {

            return "";
        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "";
        }


        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }


    /* =====================================================
       DATE TIME
    ===================================================== */

    function dateTimeText(value) {

        if (!value) {

            return "-";
        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
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


    /* =====================================================
       NORMALIZE ARRAY
    ===================================================== */

    function normalizeArray(data) {

        if (Array.isArray(data)) {

            return data;
        }


        if (Array.isArray(data?.content)) {

            return data.content;
        }


        if (Array.isArray(data?.data)) {

            return data.data;
        }


        if (Array.isArray(data?.orders)) {

            return data.orders;
        }


        if (Array.isArray(data?.bills)) {

            return data.bills;
        }


        return [];
    }


    /* =====================================================
       ORDER ID
    ===================================================== */

    function orderIdOf(order) {

        return (
            order?.orderId ??
            order?.id ??
            order?.order_id
        );
    }


    /* =====================================================
       ORDER NUMBER
    ===================================================== */

    function orderNoOf(order) {

        return (
            order?.orderNo ??
            order?.orderNumber ??
            order?.order_no ??
            order?.order_number ??
            `ORD-${orderIdOf(order) ?? "-"}`
        );
    }


    /* =====================================================
       CUSTOMER
    ===================================================== */

    function customerOf(order) {

        return (
            order?.customerName ??
            order?.customer?.customerName ??
            order?.customer?.name ??
            order?.customer_name ??
            "Walk-in Customer"
        );
    }


    /* =====================================================
       TABLE
    ===================================================== */

    function tableOf(order) {

        return (
            order?.tableNumber ??
            order?.tableNo ??
            order?.table?.tableNumber ??
            order?.table_number ??
            (
                order?.tableId
                    ? `T${order.tableId}`
                    : "-"
            )
        );
    }


    /* =====================================================
       ORDER DATE
    ===================================================== */

    function orderDateOf(order) {

        return (
            order?.orderDate ??
            order?.order_date ??
            order?.createdAt ??
            order?.created_at
        );
    }


    /* =====================================================
       ORDER STATUS
    ===================================================== */

    function orderStatusOf(order) {

        return String(
            order?.orderStatus ??
            order?.order_status ??
            order?.status ??
            "NEW"
        ).toUpperCase();
    }


    /* =====================================================
       ITEM NAME
    ===================================================== */

    function itemNameOf(item) {

        return (
            item?.itemName ??
            item?.item_name ??
            item?.menuItemName ??
            item?.menu_item_name ??
            item?.name ??
            "Item"
        );
    }


    /* =====================================================
       QUANTITY
    ===================================================== */

    function quantityOf(item) {

        return Number(
            item?.quantity ??
            item?.qty ??
            1
        );
    }


    /* =====================================================
       PRICE
    ===================================================== */

    function priceOf(item) {

        return Number(
            item?.price ??
            item?.unitPrice ??
            item?.unit_price ??
            0
        );
    }


    /* =====================================================
       ITEM SUBTOTAL
    ===================================================== */

    function subtotalOf(item) {

        if (
            item?.subtotal !== undefined &&
            item?.subtotal !== null
        ) {

            return Number(
                item.subtotal
            );
        }


        if (
            item?.amount !== undefined &&
            item?.amount !== null
        ) {

            return Number(
                item.amount
            );
        }


        return (
            quantityOf(item) *
            priceOf(item)
        );
    }


    /* =====================================================
       TOAST
    ===================================================== */

    function toast(message) {

        const element =
            $("toast");

        const text =
            $("toastText");


        if (!element) {

            console.warn(
                "Toast element not found:",
                message
            );

            return;
        }


        if (text) {

            text.textContent =
                message;

        } else {

            element.textContent =
                message;
        }


        element.classList.add(
            "show"
        );


        clearTimeout(
            window.__billingToastTimer
        );


        window.__billingToastTimer =
            setTimeout(
                () => {

                    element.classList.remove(
                        "show"
                    );

                },
                3000
            );
    }


    /* =====================================================
       LOAD ORDERS
    ===================================================== */

    async function loadOrders() {

        try {

            const data =
                await api(
                    ORDER_API
                );


            state.orders =
                normalizeArray(data);


            populateOrderSelect();


            console.log(
                "Orders loaded:",
                state.orders.length
            );


        } catch (error) {

            console.error(
                "Order loading error:",
                error
            );


            toast(
                "Unable to load orders: " +
                error.message
            );
        }
    }


    /* =====================================================
       POPULATE ORDER SELECT
    ===================================================== */

    function populateOrderSelect() {

        const select =
            $("orderSelect");


        if (!select) {

            console.warn(
                "orderSelect not found"
            );

            return;
        }


        select.innerHTML =
            `
            <option value="">
                Select an order
            </option>
            `;


        state.orders.forEach(
            order => {

                const id =
                    orderIdOf(order);


                if (!id) {

                    return;
                }


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    id;


                option.textContent =
                    `${orderNoOf(order)} - ${customerOf(order)} - ${tableOf(order)}`;


                select.appendChild(
                    option
                );
            }
        );
    }


    /* =====================================================
       CLEAR ORDER PREVIEW
    ===================================================== */

    function clearOrderPreview() {

        state.selectedOrder =
            null;


        state.selectedDetails =
            [];


        if ($("billCustomer")) {

            $("billCustomer").textContent =
                "—";
        }


        if ($("billOrderDate")) {

            $("billOrderDate").textContent =
                "—";
        }


        if ($("billTable")) {

            $("billTable").textContent =
                "—";
        }


        if ($("billOrderStatus")) {

            $("billOrderStatus").textContent =
                "NEW";


            $("billOrderStatus").className =
                "status-badge new";
        }


        if ($("orderItemsBody")) {

            $("orderItemsBody").innerHTML =
                `
                <tr>

                    <td
                        colspan="4"
                        class="empty-items">

                        Select an order

                    </td>

                </tr>
                `;
        }


        if ($("subtotal")) {

            $("subtotal").textContent =
                "₹ 0.00";
        }


        if ($("gst")) {

            $("gst").textContent =
                "₹ 0.00";
        }


        if ($("discount")) {

            $("discount").textContent =
                "₹ 0.00";
        }


        if ($("grandTotal")) {

            $("grandTotal").textContent =
                "₹ 0.00";
        }


        if ($("receivedAmount")) {

            $("receivedAmount").value =
                "";
        }
    }


    /* =====================================================
       LOAD SELECTED ORDER
    ===================================================== */

    async function loadSelectedOrder() {

        const select =
            $("orderSelect");


        if (!select) {

            return;
        }


        const id =
            Number(
                select.value
            );


        if (!id) {

            clearOrderPreview();

            return;
        }


        const order =
            state.orders.find(
                item =>
                    Number(
                        orderIdOf(item)
                    ) === id
            );


        if (!order) {

            toast(
                "Selected order not found"
            );

            return;
        }


        state.selectedOrder =
            order;


        renderOrderSummary(
            order
        );


        let details = [];


        try {

            /*
             * CORRECT CONTROLLER ENDPOINT
             *
             * GET /api/order/details/{orderId}
             */

            const data =
                await api(
                    `${ORDER_API}/details/${id}`
                );


            details =
                normalizeArray(data);


            console.log(
                "Order details loaded:",
                details
            );


        } catch (error) {

            console.error(
                "Order details loading error:",
                error
            );


            toast(
                "Unable to load order details: " +
                error.message
            );


            details = [];
        }


        state.selectedDetails =
            details;


        renderOrderItems(
            details
        );


        calculateTotals();
    }


    /* =====================================================
       LOAD ORDER BUTTON
    ===================================================== */

    async function handleLoadOrder() {

        try {

            await loadSelectedOrder();

        } catch (error) {

            console.error(
                error
            );

            toast(
                error.message
            );
        }
    }


    /* =====================================================
       ORDER SUMMARY
    ===================================================== */

    function renderOrderSummary(
        order
    ) {

        const customer =
            $("billCustomer");

        const date =
            $("billOrderDate");

        const table =
            $("billTable");

        const status =
            $("billOrderStatus");


        if (customer) {

            customer.textContent =
                customerOf(order);
        }


        if (date) {

            date.textContent =
                dateTimeText(
                    orderDateOf(order)
                );
        }


        if (table) {

            table.textContent =
                tableOf(order);
        }


        if (status) {

            const value =
                orderStatusOf(order);


            status.textContent =
                value;


            status.className =
                `status-badge ${value.toLowerCase()}`;
        }
    }


    /* =====================================================
       ORDER ITEMS
    ===================================================== */

    function renderOrderItems(items) {

        const body =
            $("orderItemsBody");


        if (!body) {

            return;
        }


        if (!items.length) {

            body.innerHTML =
                `
                <tr>

                    <td
                        colspan="4"
                        class="empty-items">

                        No order items found

                    </td>

                </tr>
                `;

            return;
        }


        body.innerHTML =
            items
                .map(
                    item => {

                        return `
                        <tr>

                            <td>
                                ${escapeHtml(
                                    itemNameOf(item)
                                )}
                            </td>

                            <td>
                                ${quantityOf(item)}
                            </td>

                            <td>
                                ${money(
                                    priceOf(item)
                                )}
                            </td>

                            <td>
                                ${money(
                                    subtotalOf(item)
                                )}
                            </td>

                        </tr>
                        `;
                    }
                )
                .join("");
    }


    /* =====================================================
       CALCULATE TOTALS
    ===================================================== */

    function calculateTotals() {

        const subtotal =
            state.selectedDetails.reduce(
                (
                    total,
                    item
                ) => {

                    return (
                        total +
                        subtotalOf(item)
                    );

                },
                0
            );


        const discount =
            Math.min(
                subtotal,
                Math.max(
                    0,
                    Number(
                        state.discount || 0
                    )
                )
            );


        const taxable =
            Math.max(
                0,
                subtotal - discount
            );


        const gst =
            Math.round(
                taxable *
                GST_RATE *
                100
            ) / 100;


        const grandTotal =
            Math.round(
                (
                    taxable +
                    gst
                ) * 100
            ) / 100;


        if ($("subtotal")) {

            $("subtotal").textContent =
                money(subtotal);
        }


        if ($("gst")) {

            $("gst").textContent =
                money(gst);
        }


        if ($("discount")) {

            $("discount").textContent =
                money(discount);
        }


        if ($("grandTotal")) {

            $("grandTotal").textContent =
                money(grandTotal);
        }


        if (
            $("receivedAmount") &&
            state.paymentStatus === "PAID"
        ) {

            $("receivedAmount").value =
                grandTotal.toFixed(2);
        }


        return {

            subtotal,

            gst,

            discount,

            grandTotal
        };
    }


    /* =====================================================
       LOAD BILLS
    ===================================================== */

    async function loadBills() {

        try {

            const data =
                await api(
                    BILL_API
                );


            state.bills =
                normalizeArray(data);


            console.log(
                "Bills loaded:",
                state.bills.length
            );


            renderStats();

            renderCharts();

            applyFilters();


        } catch (error) {

            console.error(
                "Billing load error:",
                error
            );


            const body =
                $("billTableBody");


            if (body) {

                body.innerHTML =
                    `
                    <tr>

                        <td
                            colspan="9"
                            class="empty">

                            Unable to load bills:
                            ${escapeHtml(
                                error.message
                            )}

                        </td>

                    </tr>
                    `;
            }


            toast(
                "Unable to load bills: " +
                error.message
            );
        }
    }


    /* =====================================================
       BILL STATUS
    ===================================================== */

    function billStatusOf(bill) {

        return String(
            bill?.paymentStatus ??
            bill?.payment_status ??
            "PENDING"
        ).toUpperCase();
    }


    /* =====================================================
       BILL PAYMENT METHOD
    ===================================================== */

    function paymentMethodOf(bill) {

        return String(
            bill?.paymentMethod ??
            bill?.payment_method ??
            "OTHER"
        ).toUpperCase();
    }


    /* =====================================================
       BILL DATE
    ===================================================== */

    function billDateOf(bill) {

        return (
            bill?.billDate ??
            bill?.bill_date
        );
    }


    /* =====================================================
       BILL TOTAL
    ===================================================== */

    function billTotalOf(bill) {

        return Number(
            bill?.grandTotal ??
            bill?.grand_total ??
            0
        );
    }


    /* =====================================================
       BILL ORDER
    ===================================================== */

    function findOrderForBill(bill) {

        return state.orders.find(
            order =>
                Number(
                    orderIdOf(order)
                ) ===
                Number(
                    bill?.orderId ??
                    bill?.order_id
                )
        );
    }


    /* =====================================================
       RENDER STATS
    ===================================================== */

    function renderStats() {

        const bills =
            state.bills;


        const paid =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "PAID"
            );


        const pending =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "PENDING"
            );


        const cancelled =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "CANCELLED"
            );


        const paidAmount =
            paid.reduce(
                (
                    total,
                    bill
                ) =>
                    total +
                    billTotalOf(
                        bill
                    ),
                0
            );


        const pendingAmount =
            pending.reduce(
                (
                    total,
                    bill
                ) =>
                    total +
                    billTotalOf(
                        bill
                    ),
                0
            );


        if ($("totalBills")) {

            $("totalBills").textContent =
                bills.length;
        }


        if ($("totalRevenue")) {

            $("totalRevenue").textContent =
                money(
                    paidAmount
                );
        }


        if ($("pendingAmount")) {

            $("pendingAmount").textContent =
                money(
                    pendingAmount
                );
        }


        if ($("paidAmount")) {

            $("paidAmount").textContent =
                money(
                    paidAmount
                );
        }


        if ($("paidCount")) {

            $("paidCount").textContent =
                paid.length;
        }


        if ($("pendingCount")) {

            $("pendingCount").textContent =
                pending.length;
        }


        if ($("cancelledCount")) {

            $("cancelledCount").textContent =
                cancelled.length;
        }


        if ($("statusTotal")) {

            $("statusTotal").textContent =
                bills.length;
        }
    }


    /* =====================================================
       FILTER BILLS
    ===================================================== */

    function applyFilters() {

        const query =
            $("billSearch")
                ?.value
                ?.trim()
                ?.toLowerCase() ||
            "";


        const status =
            $("statusFilter")
                ?.value ||
            "ALL";


        const dateFilter =
            $("dateFilter")
                ?.value ||
            "ALL";


        state.filteredBills =
            state.bills.filter(
                bill => {

                    const order =
                        findOrderForBill(
                            bill
                        );


                    const customer =
                        order
                            ? customerOf(order)
                            : "";


                    const orderNo =
                        order
                            ? orderNoOf(order)
                            : `ORD-${
                                bill.orderId ??
                                bill.order_id ??
                                "-"
                            }`;


                    const billNo =
                        bill.billNo ??
                        bill.bill_no ??
                        "";


                    const text =
                        `
                        ${billNo}
                        ${orderNo}
                        ${customer}
                        ${bill.orderId ?? ""}
                        `.toLowerCase();


                    const queryMatch =
                        !query ||
                        text.includes(
                            query
                        );


                    const statusMatch =
                        status === "ALL" ||
                        billStatusOf(
                            bill
                        ) === status;


                    const dateMatch =
                        matchesDateFilter(
                            billDateOf(
                                bill
                            ),
                            dateFilter
                        );


                    return (
                        queryMatch &&
                        statusMatch &&
                        dateMatch
                    );
                }
            );


        state.page =
            0;


        renderBillTable();
    }


    /* =====================================================
       DATE FILTER
    ===================================================== */

    function matchesDateFilter(
        value,
        filter
    ) {

        if (
            !value ||
            filter === "ALL"
        ) {

            return true;
        }


        const billDate =
            new Date(value);


        if (
            Number.isNaN(
                billDate.getTime()
            )
        ) {

            return true;
        }


        const now =
            new Date();


        if (
            filter === "TODAY"
        ) {

            return (
                billDate.toDateString() ===
                now.toDateString()
            );
        }


        if (
            filter === "WEEK"
        ) {

            const start =
                new Date(now);


            const day =
                start.getDay();


            const diff =
                day === 0
                    ? 6
                    : day - 1;


            start.setDate(
                start.getDate() - diff
            );


            start.setHours(
                0,
                0,
                0,
                0
            );


            const end =
                new Date(start);


            end.setDate(
                end.getDate() + 7
            );


            return (
                billDate >= start &&
                billDate < end
            );
        }


        if (
            filter === "MONTH"
        ) {

            return (
                billDate.getMonth()
                    === now.getMonth() &&
                billDate.getFullYear()
                    === now.getFullYear()
            );
        }


        return true;
    }


    /* =====================================================
       RENDER BILL TABLE
    ===================================================== */

    function renderBillTable() {

        const body =
            $("billTableBody");


        if (!body) {

            return;
        }


        const start =
            state.page *
            state.size;


        const rows =
            state.filteredBills.slice(
                start,
                start + state.size
            );


        if (!rows.length) {

            body.innerHTML =
                `
                <tr>

                    <td
                        colspan="9"
                        class="empty">

                        No bills found

                    </td>

                </tr>
                `;

        } else {

            body.innerHTML =
                rows
                    .map(
                        bill => {

                            const billId =
                                bill.billId ??
                                bill.bill_id;


                            const billNo =
                                bill.billNo ??
                                bill.bill_no ??
                                `BILL-${
                                    String(
                                        billId
                                    ).padStart(
                                        6,
                                        "0"
                                    )
                                }`;


                            const order =
                                findOrderForBill(
                                    bill
                                );


                            const customer =
                                order
                                    ? customerOf(order)
                                    : "Customer";


                            const table =
                                order
                                    ? tableOf(order)
                                    : "-";


                            const orderNo =
                                order
                                    ? orderNoOf(order)
                                    : `ORD-${
                                        bill.orderId ??
                                        bill.order_id ??
                                        "-"
                                    }`;


                            const payment =
                                paymentMethodOf(
                                    bill
                                );


                            const status =
                                billStatusOf(
                                    bill
                                );


                            return `
                            <tr>

                                <td>
                                    ${escapeHtml(
                                        billNo
                                    )}
                                </td>


                                <td>
                                    ${escapeHtml(
                                        orderNo
                                    )}
                                </td>


                                <td>
                                    ${escapeHtml(
                                        customer
                                    )}
                                </td>


                                <td>
                                    ${escapeHtml(
                                        table
                                    )}
                                </td>


                                <td>
                                    ${money(
                                        billTotalOf(
                                            bill
                                        )
                                    )}
                                </td>


                                <td>

                                    <span
                                        class="payment-tag ${payment.toLowerCase()}">

                                        ${escapeHtml(
                                            payment
                                        )}

                                    </span>

                                </td>


                                <td>

                                    <span
                                        class="status-tag ${status.toLowerCase()}">

                                        ${escapeHtml(
                                            status
                                        )}

                                    </span>

                                </td>


                                <td>

                                    ${dateText(
                                        billDateOf(
                                            bill
                                        )
                                    )}

                                    <br>

                                    ${timeText(
                                        billDateOf(
                                            bill
                                        )
                                    )}

                                </td>


                                <td>

                                    <button
                                        type="button"
                                        class="action-btn"
                                        title="View Bill"
                                        onclick="window.viewBill(${billId})">

                                        <i class="fa-solid fa-eye"></i>

                                    </button>


                                    <button
                                        type="button"
                                        class="action-btn"
                                        title="Print Bill"
                                        onclick="window.printBillById(${billId})">

                                        <i class="fa-solid fa-print"></i>

                                    </button>

                                </td>

                            </tr>
                            `;
                        }
                    )
                    .join("");
        }


        const total =
            state.filteredBills.length;


        const from =
            total > 0
                ? start + 1
                : 0;


        const to =
            Math.min(
                start + state.size,
                total
            );


        if ($("billCount")) {

            $("billCount").textContent =
                `Showing ${from} to ${to} of ${total} bills`;
        }


        updatePagination();
    }


    /* =====================================================
       UPDATE PAGINATION
    ===================================================== */

    function updatePagination() {

        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    state.filteredBills.length /
                    state.size
                )
            );


        const current =
            state.page + 1;


        const first =
            $("billFirstPage");


        const prev =
            $("billPrevPage");


        const currentButton =
            $("billCurrentPage");


        const next =
            $("billNextPage");


        const last =
            $("billLastPage");


        if (first) {

            first.disabled =
                state.page === 0;
        }


        if (prev) {

            prev.disabled =
                state.page === 0;
        }


        if (next) {

            next.disabled =
                state.page >=
                totalPages - 1;
        }


        if (last) {

            last.disabled =
                state.page >=
                totalPages - 1;
        }


        if (currentButton) {

            currentButton.textContent =
                current;
        }
    }


    /* =====================================================
       GO TO PAGE
    ===================================================== */

    function goToPage(page) {

        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    state.filteredBills.length /
                    state.size
                )
            );


        state.page =
            Math.max(
                0,
                Math.min(
                    page,
                    totalPages - 1
                )
            );


        renderBillTable();
    }


    /* =====================================================
       RENDER CHART SUMMARY
    ===================================================== */

    function renderCharts() {

        const bills =
            state.bills;


        const total =
            bills.length;


        if ($("paymentTotal")) {

            $("paymentTotal").textContent =
                total;
        }


        if ($("statusTotal")) {

            $("statusTotal").textContent =
                total;
        }


        let cash = 0;

        let upi = 0;

        let card = 0;

        let other = 0;


        bills.forEach(
            bill => {

                const amount =
                    billTotalOf(
                        bill
                    );


                const method =
                    paymentMethodOf(
                        bill
                    );


                if (
                    method === "CASH"
                ) {

                    cash += amount;

                } else if (
                    method === "UPI"
                ) {

                    upi += amount;

                } else if (
                    method === "CARD"
                ) {

                    card += amount;

                } else {

                    other += amount;
                }
            }
        );


        if ($("cashAmount")) {

            $("cashAmount").textContent =
                money(cash);
        }


        if ($("upiAmount")) {

            $("upiAmount").textContent =
                money(upi);
        }


        if ($("cardAmount")) {

            $("cardAmount").textContent =
                money(card);
        }


        if ($("otherAmount")) {

            $("otherAmount").textContent =
                money(other);
        }


        const paid =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "PAID"
            ).length;


        const pending =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "PENDING"
            ).length;


        const cancelled =
            bills.filter(
                bill =>
                    billStatusOf(
                        bill
                    ) === "CANCELLED"
            ).length;


        if ($("paidCount")) {

            $("paidCount").textContent =
                paid;
        }


        if ($("pendingCount")) {

            $("pendingCount").textContent =
                pending;
        }


        if ($("cancelledCount")) {

            $("cancelledCount").textContent =
                cancelled;
        }
    }


    /* =====================================================
       PAYMENT METHOD
    ===================================================== */

    function setupPaymentMethods() {

        document
            .querySelectorAll(
                ".payment-btn"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelectorAll(
                                    ".payment-btn"
                                )
                                .forEach(
                                    item =>
                                        item.classList.remove(
                                            "active"
                                        )
                                );


                            button.classList.add(
                                "active"
                            );


                            state.paymentMethod =
                                String(
                                    button.dataset.method ||
                                    "CASH"
                                ).toUpperCase();


                            console.log(
                                "Payment method:",
                                state.paymentMethod
                            );
                        }
                    );
                }
            );
    }


    /* =====================================================
       PAYMENT STATUS
    ===================================================== */

    function setupPaymentStatus() {

        document
            .querySelectorAll(
                ".payment-status-btn"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelectorAll(
                                    ".payment-status-btn"
                                )
                                .forEach(
                                    item =>
                                        item.classList.remove(
                                            "active"
                                        )
                                );


                            button.classList.add(
                                "active"
                            );


                            state.paymentStatus =
                                String(
                                    button.dataset.status ||
                                    "PAID"
                                ).toUpperCase();


                            const totals =
                                calculateTotals();


                            if (
                                $("receivedAmount")
                            ) {

                                if (
                                    state.paymentStatus ===
                                    "PAID"
                                ) {

                                    $("receivedAmount").value =
                                        totals.grandTotal
                                            .toFixed(2);

                                } else {

                                    $("receivedAmount").value =
                                        "0.00";
                                }
                            }


                            console.log(
                                "Payment status:",
                                state.paymentStatus
                            );
                        }
                    );
                }
            );
    }


    /* =====================================================
       GENERATE BILL
    ===================================================== */

    async function generateBill() {

        if (!state.selectedOrder) {

            toast(
                "Please select an order"
            );

            return;
        }


        if (
            !state.selectedDetails.length
        ) {

            toast(
                "Selected order has no items"
            );

            return;
        }


        const totals =
            calculateTotals();


        const received =
            Number(
                $("receivedAmount")
                    ?.value || 0
            );


        if (
            state.paymentStatus === "PAID" &&
            received < totals.grandTotal
        ) {

            toast(
                "Received amount is less than bill total"
            );

            return;
        }


        const orderId =
            Number(
                orderIdOf(
                    state.selectedOrder
                )
            );


        const payload = {

            orderId,

            subtotal:
                totals.subtotal,

            gst:
                totals.gst,

            discount:
                totals.discount,

            grandTotal:
                totals.grandTotal,

            paymentMethod:
                state.paymentMethod,

            paymentStatus:
                state.paymentStatus
        };


        console.log(
            "Creating bill:",
            payload
        );


        const button =
            $("generateBillBtn");


        try {

            if (button) {

                button.disabled =
                    true;


                button.innerHTML =
                    `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Generating...
                    `;
            }


            const bill =
                await api(
                    BILL_API,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                payload
                            )
                    }
                );


            state.lastCreatedBill =
                bill;


            console.log(
                "Bill created:",
                bill
            );


            toast(
                "Bill generated successfully"
            );


            await loadBills();


            clearForm();


        } catch (error) {

            console.error(
                "Generate bill error:",
                error
            );


            toast(
                error.message
            );


        } finally {

            if (button) {

                button.disabled =
                    false;


                button.innerHTML =
                    `
                    <i class="fa-solid fa-file-invoice"></i>
                    Generate Bill
                    `;
            }
        }
    }


    /* =====================================================
       CLOSE BILL DETAILS MODAL
    ===================================================== */

    function closeBillModal() {

        const modal =
            $("billDetailsModal");


        if (!modal) {

            return;
        }


        modal.classList.remove(
            "show"
        );


        document.body.style.overflow =
            "";
    }


    /* =====================================================
       VIEW BILL - CUSTOM MODAL
    ===================================================== */

    window.viewBill =
        async function (
            billId
        ) {

            try {

                const bill =
                    await api(
                        `${BILL_API}/${billId}`
                    );


                const billNo =
                    bill.billNo ??
                    bill.bill_no ??
                    `BILL-${
                        String(
                            billId
                        ).padStart(
                            6,
                            "0"
                        )
                    }`;


                const orderId =
                    bill.orderId ??
                    bill.order_id ??
                    "-";


                const subtotal =
                    Number(
                        bill.subtotal ?? 0
                    );


                const gst =
                    Number(
                        bill.gst ?? 0
                    );


                const discount =
                    Number(
                        bill.discount ?? 0
                    );


                const grandTotal =
                    Number(
                        bill.grandTotal ??
                        bill.grand_total ??
                        0
                    );


                const paymentMethod =
                    String(
                        bill.paymentMethod ??
                        bill.payment_method ??
                        "-"
                    ).toUpperCase();


                const paymentStatus =
                    String(
                        bill.paymentStatus ??
                        bill.payment_status ??
                        "PENDING"
                    ).toUpperCase();


                const billDate =
                    bill.billDate ??
                    bill.bill_date;


                const modal =
                    $("billDetailsModal");


                if (!modal) {

                    console.error(
                        "Bill Details Modal not found in billing.jsp"
                    );


                    toast(
                        "Bill details modal not found"
                    );


                    return;
                }


                /* -----------------------------------------
                   MODAL DATA
                ----------------------------------------- */

                if ($("modalBillNo")) {

                    $("modalBillNo").textContent =
                        billNo;
                }


                if ($("modalOrderId")) {

                    $("modalOrderId").textContent =
                        orderId;
                }


                if ($("modalBillDate")) {

                    $("modalBillDate").textContent =
                        dateTimeText(
                            billDate
                        );
                }


                if ($("modalPaymentMethod")) {

                    $("modalPaymentMethod").textContent =
                        paymentMethod;
                }


                if ($("modalPaymentStatus")) {

                    $("modalPaymentStatus").textContent =
                        paymentStatus;
                }


                if ($("modalSubtotal")) {

                    $("modalSubtotal").textContent =
                        money(
                            subtotal
                        );
                }


                if ($("modalGst")) {

                    $("modalGst").textContent =
                        money(
                            gst
                        );
                }


                if ($("modalDiscount")) {

                    $("modalDiscount").textContent =
                        money(
                            discount
                        );
                }


                if ($("modalGrandTotal")) {

                    $("modalGrandTotal").textContent =
                        money(
                            grandTotal
                        );
                }


                if ($("modalPayment")) {

                    $("modalPayment").textContent =
                        paymentMethod;
                }


                if ($("modalStatus")) {

                    $("modalStatus").textContent =
                        paymentStatus;
                }


                /* -----------------------------------------
                   STATUS CLASSES
                ----------------------------------------- */

                const statusClass =
                    paymentStatus.toLowerCase();


                if ($("modalPaymentStatus")) {

                    $("modalPaymentStatus").className =
                        `modal-status ${statusClass}`;
                }


                if ($("modalStatus")) {

                    $("modalStatus").className =
                        statusClass;
                }


                /* -----------------------------------------
                   STORE BILL
                ----------------------------------------- */

                state.lastCreatedBill =
                    bill;


                /* -----------------------------------------
                   SHOW MODAL
                ----------------------------------------- */

                modal.classList.add(
                    "show"
                );


                document.body.style.overflow =
                    "hidden";


                console.log(
                    "Bill modal opened:",
                    billNo
                );


            } catch (error) {

                console.error(
                    "View bill error:",
                    error
                );


                toast(
                    error.message
                );
            }
        };


    /* =====================================================
       PRINT BILL BY ID
    ===================================================== */

    window.printBillById =
        async function (
            billId
        ) {

            try {

                const bill =
                    await api(
                        `${BILL_API}/${billId}`
                    );


                state.lastCreatedBill =
                    bill;


                printBill(
                    bill
                );


            } catch (error) {

                console.error(
                    "Print bill error:",
                    error
                );


                toast(
                    error.message
                );
            }
        };


    /* =====================================================
       PRINT BILL
    ===================================================== */

    function printBill(
        bill
    ) {

        const billNo =
            bill.billNo ??
            bill.bill_no ??
            "-";


        const orderId =
            bill.orderId ??
            bill.order_id ??
            "-";


        const subtotal =
            Number(
                bill.subtotal ?? 0
            );


        const gst =
            Number(
                bill.gst ?? 0
            );


        const discount =
            Number(
                bill.discount ?? 0
            );


        const grandTotal =
            Number(
                bill.grandTotal ??
                bill.grand_total ??
                0
            );


        const paymentMethod =
            bill.paymentMethod ??
            bill.payment_method ??
            "-";


        const paymentStatus =
            bill.paymentStatus ??
            bill.payment_status ??
            "-";


        const billDate =
            bill.billDate ??
            bill.bill_date;


        const printWindow =
            window.open(
                "",
                "_blank",
                "width=700,height=800"
            );


        if (!printWindow) {

            toast(
                "Please allow popups to print the bill"
            );


            return;
        }


        printWindow.document.write(
            `
            <!DOCTYPE html>

            <html>

            <head>

                <meta charset="UTF-8">

                <title>
                    ${escapeHtml(
                        billNo
                    )}
                </title>

                <style>

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        font-family:
                            Arial,
                            sans-serif;

                        padding: 30px;

                        color: #222;
                    }

                    .invoice {
                        max-width: 650px;

                        margin: auto;
                    }

                    h1 {
                        text-align: center;

                        margin-bottom: 5px;
                    }

                    .subtitle {
                        text-align: center;

                        color: #666;

                        margin-bottom: 20px;
                    }

                    hr {
                        border: 0;

                        border-top:
                            1px solid #ddd;

                        margin: 20px 0;
                    }

                    .info {
                        display: grid;

                        grid-template-columns:
                            1fr 1fr;

                        gap: 10px;
                    }

                    .info div {
                        padding: 8px;
                    }

                    table {
                        width: 100%;

                        border-collapse:
                            collapse;

                        margin-top: 20px;
                    }

                    th,
                    td {
                        padding: 10px;

                        border-bottom:
                            1px solid #ddd;

                        text-align: left;
                    }

                    th:last-child,
                    td:last-child {
                        text-align: right;
                    }

                    .total {
                        margin-top: 20px;

                        text-align: right;

                        font-size: 22px;

                        font-weight: bold;
                    }

                    .payment {
                        margin-top: 20px;
                    }

                    .footer {
                        text-align: center;

                        margin-top: 35px;

                        color: #666;
                    }

                    @media print {

                        body {
                            padding: 10px;
                        }

                    }

                </style>

            </head>

            <body>

                <div class="invoice">

                    <h1>
                        SANKALP RESTAURANT
                    </h1>

                    <div class="subtitle">
                        Restaurant Management System
                    </div>

                    <hr>

                    <div class="info">

                        <div>

                            <strong>
                                Bill No:
                            </strong>

                            ${escapeHtml(
                                billNo
                            )}

                        </div>


                        <div>

                            <strong>
                                Order ID:
                            </strong>

                            ${escapeHtml(
                                orderId
                            )}

                        </div>


                        <div>

                            <strong>
                                Bill Date:
                            </strong>

                            ${escapeHtml(
                                dateTimeText(
                                    billDate
                                )
                            )}

                        </div>

                    </div>


                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Amount
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    Subtotal
                                </td>

                                <td>
                                    ${money(
                                        subtotal
                                    )}
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    GST (5%)
                                </td>

                                <td>
                                    ${money(
                                        gst
                                    )}
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    Discount
                                </td>

                                <td>
                                    ${money(
                                        discount
                                    )}
                                </td>

                            </tr>

                        </tbody>

                    </table>


                    <div class="total">

                        Grand Total:
                        ${money(
                            grandTotal
                        )}

                    </div>


                    <div class="payment">

                        <strong>
                            Payment Method:
                        </strong>

                        ${escapeHtml(
                            paymentMethod
                        )}

                        <br><br>

                        <strong>
                            Payment Status:
                        </strong>

                        ${escapeHtml(
                            paymentStatus
                        )}

                    </div>


                    <div class="footer">

                        <hr>

                        Thank you for visiting
                        Sankalp Restaurant

                    </div>

                </div>

            </body>

            </html>
            `
        );


        printWindow.document.close();

        printWindow.focus();


        setTimeout(
            () => {

                printWindow.print();

            },
            500
        );
    }


    /* =====================================================
       CLEAR FORM
    ===================================================== */

    function clearForm() {

        state.selectedOrder =
            null;


        state.selectedDetails =
            [];


        state.discount =
            0;


        const orderSelect =
            $("orderSelect");


        if (orderSelect) {

            orderSelect.value =
                "";
        }


        if ($("billCustomer")) {

            $("billCustomer").textContent =
                "—";
        }


        if ($("billOrderDate")) {

            $("billOrderDate").textContent =
                "—";
        }


        if ($("billTable")) {

            $("billTable").textContent =
                "—";
        }


        if ($("billOrderStatus")) {

            $("billOrderStatus").textContent =
                "NEW";


            $("billOrderStatus").className =
                "status-badge new";
        }


        if ($("orderItemsBody")) {

            $("orderItemsBody").innerHTML =
                `
                <tr>

                    <td
                        colspan="4"
                        class="empty-items">

                        Select an order

                    </td>

                </tr>
                `;
        }


        if ($("subtotal")) {

            $("subtotal").textContent =
                "₹ 0.00";
        }


        if ($("gst")) {

            $("gst").textContent =
                "₹ 0.00";
        }


        if ($("discount")) {

            $("discount").textContent =
                "₹ 0.00";
        }


        if ($("grandTotal")) {

            $("grandTotal").textContent =
                "₹ 0.00";
        }


        if ($("receivedAmount")) {

            $("receivedAmount").value =
                "";
        }


        if ($("billNotes")) {

            $("billNotes").value =
                "";
        }
    }


    /* =====================================================
       CLOSE GENERATOR
    ===================================================== */

    function toggleGenerator() {

        const generator =
            $("billGenerator");


        const content =
            $("generatorContent");


        if (
            !generator ||
            !content
        ) {

            return;
        }


        generator.classList.toggle(
            "collapsed"
        );


        const collapsed =
            generator.classList.contains(
                "collapsed"
            );


        const button =
            $("closeGenerator");


        if (button) {

            button.innerHTML =
                collapsed
                    ? `<i class="fa-solid fa-plus"></i>`
                    : `<i class="fa-solid fa-minus"></i>`;
        }
    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "jwtToken"
        );


        localStorage.removeItem(
            "role"
        );


        localStorage.removeItem(
            "chefToken"
        );


        localStorage.removeItem(
            "chefRole"
        );


        window.location.href =
            `${CTX}/login.jsp`;
    }


    /* =====================================================
       MODAL EVENT LISTENERS
    ===================================================== */

    function setupBillModal() {

        /* -----------------------------------------------
           CLOSE X
        ----------------------------------------------- */

        $("closeBillModal")
            ?.addEventListener(
                "click",
                closeBillModal
            );


        /* -----------------------------------------------
           CLOSE BUTTON
        ----------------------------------------------- */

        $("modalCloseBtn")
            ?.addEventListener(
                "click",
                closeBillModal
            );


        /* -----------------------------------------------
           PRINT BUTTON
        ----------------------------------------------- */

        $("modalPrintBtn")
            ?.addEventListener(
                "click",
                () => {

                    if (
                        state.lastCreatedBill
                    ) {

                        printBill(
                            state.lastCreatedBill
                        );

                    } else {

                        toast(
                            "Bill information is not available"
                        );
                    }
                }
            );


        /* -----------------------------------------------
           CLICK OUTSIDE MODAL
        ----------------------------------------------- */

        $("billDetailsModal")
            ?.addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "billDetailsModal"
                    ) {

                        closeBillModal();
                    }
                }
            );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    function setupKeyboardShortcuts() {

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeBillModal();
                }
            }
        );
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    async function initialize() {

        console.log(
            "Billing dashboard initialized"
        );


        /* -------------------------------------------------
           TODAY DATE
        ------------------------------------------------- */

        const now =
            new Date();


        if ($("todayDate")) {

            $("todayDate").textContent =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                );
        }


        if ($("todayDay")) {

            $("todayDay").textContent =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long"
                    }
                );
        }


        /* -------------------------------------------------
           MENU
        ------------------------------------------------- */

        $("menuBtn")
            ?.addEventListener(
                "click",
                () => {

                    $("sidebar")
                        ?.classList.toggle(
                            "open"
                        );
                }
            );


        /* -------------------------------------------------
           BILL SEARCH
        ------------------------------------------------- */

        $("billSearch")
            ?.addEventListener(
                "input",
                applyFilters
            );


        /* -------------------------------------------------
           STATUS FILTER
        ------------------------------------------------- */

        $("statusFilter")
            ?.addEventListener(
                "change",
                applyFilters
            );


        /* -------------------------------------------------
           DATE FILTER
        ------------------------------------------------- */

        $("dateFilter")
            ?.addEventListener(
                "change",
                applyFilters
            );


        /* -------------------------------------------------
           ORDER SELECT
        ------------------------------------------------- */

        $("orderSelect")
            ?.addEventListener(
                "change",
                loadSelectedOrder
            );


        /* -------------------------------------------------
           LOAD ORDER
        ------------------------------------------------- */

        $("loadOrderBtn")
            ?.addEventListener(
                "click",
                handleLoadOrder
            );


        /* -------------------------------------------------
           PAYMENT METHOD
        ------------------------------------------------- */

        setupPaymentMethods();


        /* -------------------------------------------------
           PAYMENT STATUS
        ------------------------------------------------- */

        setupPaymentStatus();


        /* -------------------------------------------------
           BILL MODAL
        ------------------------------------------------- */

        setupBillModal();


        /* -------------------------------------------------
           ESCAPE KEY
        ------------------------------------------------- */

        setupKeyboardShortcuts();


        /* -------------------------------------------------
           GENERATE
        ------------------------------------------------- */

        $("generateBillBtn")
            ?.addEventListener(
                "click",
                generateBill
            );


        /* -------------------------------------------------
           CANCEL
        ------------------------------------------------- */

        $("cancelBillBtn")
            ?.addEventListener(
                "click",
                clearForm
            );


        /* -------------------------------------------------
           PRINT CURRENT BILL
        ------------------------------------------------- */

        $("printBillBtn")
            ?.addEventListener(
                "click",
                () => {

                    if (
                        state.lastCreatedBill
                    ) {

                        printBill(
                            state.lastCreatedBill
                        );

                    } else {

                        toast(
                            "Generate or select a bill first"
                        );
                    }
                }
            );


        /* -------------------------------------------------
           CLOSE GENERATOR
        ------------------------------------------------- */

        $("closeGenerator")
            ?.addEventListener(
                "click",
                toggleGenerator
            );


        /* -------------------------------------------------
           FIRST PAGE
        ------------------------------------------------- */

        $("billFirstPage")
            ?.addEventListener(
                "click",
                () => {

                    goToPage(0);
                }
            );


        /* -------------------------------------------------
           PREVIOUS PAGE
        ------------------------------------------------- */

        $("billPrevPage")
            ?.addEventListener(
                "click",
                () => {

                    goToPage(
                        state.page - 1
                    );
                }
            );


        /* -------------------------------------------------
           CURRENT PAGE
        ------------------------------------------------- */

        $("billCurrentPage")
            ?.addEventListener(
                "click",
                () => {

                    goToPage(
                        state.page
                    );
                }
            );


        /* -------------------------------------------------
           NEXT PAGE
        ------------------------------------------------- */

        $("billNextPage")
            ?.addEventListener(
                "click",
                () => {

                    goToPage(
                        state.page + 1
                    );
                }
            );


        /* -------------------------------------------------
           LAST PAGE
        ------------------------------------------------- */

        $("billLastPage")
            ?.addEventListener(
                "click",
                () => {

                    const totalPages =
                        Math.max(
                            1,
                            Math.ceil(
                                state.filteredBills.length /
                                state.size
                            )
                        );


                    goToPage(
                        totalPages - 1
                    );
                }
            );


        /* -------------------------------------------------
           LOGOUT
        ------------------------------------------------- */

        $("logoutBtn")
            ?.addEventListener(
                "click",
                logout
            );


        /* -------------------------------------------------
           LOAD DATA
        ------------------------------------------------- */

        await loadOrders();


        await loadBills();


        console.log(
            "Billing module ready"
        );
    }


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();
    }

})();