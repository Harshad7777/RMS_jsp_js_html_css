"use strict";

/* =========================================================
   SANKALP RESTAURANT MANAGEMENT SYSTEM
   CUSTOMER MANAGEMENT JAVASCRIPT
   FULL WIDTH + ADD / EDIT FORM
========================================================= */

console.log("======================================");
console.log("Sankalp RMS - Customer Management");
console.log("Customer Management JS Loaded");
console.log("======================================");


/* =========================================================
   APPLICATION CONTEXT PATH
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
   BACKEND
========================================================= */

const BACKEND_URL =
    "http://localhost:8080";


/* =========================================================
   CUSTOMER API
========================================================= */

const CUSTOMER_API =
    BACKEND_URL + "/api/customer";


console.log(
    "Context Path:",
    CONTEXT_PATH
);

console.log(
    "Backend URL:",
    BACKEND_URL
);

console.log(
    "Customer API:",
    CUSTOMER_API
);


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let customers = [];

let filteredCustomers = [];

let editingCustomerId = null;

let deleteCustomerId = null;

const PAGE_SIZE = 7;

let currentPage = 1;


/* =========================================================
   TOKEN
========================================================= */

function getToken() {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        ""
    );

}


/* =========================================================
   HEADERS
========================================================= */

function getHeaders() {

    const token =
        getToken();

    const headers = {

        "Accept":
            "application/json",

        "Content-Type":
            "application/json"

    };


    if (token) {

        headers.Authorization =
            "Bearer " + token;

    }


    return headers;

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Customer page initialized"
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


        initializeCustomerPage();

    }
);


/* =========================================================
   INITIALIZE PAGE
========================================================= */

function initializeCustomerPage() {

    console.log(
        "Initializing customer page..."
    );


    setupEvents();

    initializeFormState();

    setCurrentDate();

    loadAdminInfo();

    loadCustomers();

}


/* =========================================================
   INITIAL FORM STATE
========================================================= */

function initializeFormState() {

    const layout =
        document.getElementById(
            "customerLayout"
        );


    const panel =
        document.getElementById(
            "customerFormPanel"
        );


    /*
     * On initial page load:
     *
     * TABLE = FULL WIDTH
     * FORM = HIDDEN
     */

    if (layout) {

        layout.classList.remove(
            "form-open"
        );

    }


    if (panel) {

        panel.classList.remove(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


}


/* =========================================================
   SETUP EVENTS
========================================================= */

function setupEvents() {

    console.log(
        "Setting up customer events..."
    );


    /* =====================================================
       ADD CUSTOMER
    ===================================================== */

    const openAddBtn =
        document.getElementById(
            "openAddBtn"
        );


    if (openAddBtn) {

        openAddBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "ADD CUSTOMER BUTTON CLICKED"
                );

                openAddForm();

            }
        );

    }


    /* =====================================================
       CLOSE FORM
    ===================================================== */

    const closeFormBtn =
        document.getElementById(
            "closeFormBtn"
        );


    if (closeFormBtn) {

        closeFormBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeForm();

            }
        );

    }


    /* =====================================================
       CANCEL
    ===================================================== */

    const cancelBtn =
        document.getElementById(
            "cancelBtn"
        );


    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeForm();

            }
        );

    }


    /* =====================================================
       CUSTOMER FORM SUBMIT
    ===================================================== */

    const customerForm =
        document.getElementById(
            "customerForm"
        );


    if (customerForm) {

        customerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (
                    editingCustomerId !== null &&
                    editingCustomerId !== undefined
                ) {

                    updateCustomer();

                } else {

                    saveCustomer();

                }

            }
        );

    }


    /* =====================================================
       UPDATE BUTTON
    ===================================================== */

    const updateBtn =
        document.getElementById(
            "updateBtn"
        );


    if (updateBtn) {

        updateBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                updateCustomer();

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchCustomer =
        document.getElementById(
            "searchCustomer"
        );


    if (searchCustomer) {

        searchCustomer.addEventListener(
            "input",
            function () {

                currentPage = 1;

                filterCustomers();

            }
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                currentPage = 1;

                filterCustomers();

            }
        );

    }


    /* =====================================================
       GLOBAL / HEADER SEARCH
    ===================================================== */

    const dashboardSearch =
        document.getElementById(
            "dashboardSearch"
        );


    const globalSearch =
        document.getElementById(
            "globalSearch"
        );


    if (dashboardSearch) {

        dashboardSearch.addEventListener(
            "input",
            function () {

                syncGlobalSearch(
                    dashboardSearch.value
                );

            }
        );

    }


    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                syncGlobalSearch(
                    globalSearch.value
                );

            }
        );

    }


    /* =====================================================
       FIRST PAGE
    ===================================================== */

    const firstPage =
        document.getElementById(
            "firstPage"
        );


    if (firstPage) {

        firstPage.addEventListener(
            "click",
            function () {

                if (
                    currentPage !== 1
                ) {

                    currentPage = 1;

                    renderCustomers();

                }

            }
        );

    }


    /* =====================================================
       PREVIOUS PAGE
    ===================================================== */

    const prevPage =
        document.getElementById(
            "prevPage"
        );


    if (prevPage) {

        prevPage.addEventListener(
            "click",
            function () {

                if (
                    currentPage > 1
                ) {

                    currentPage--;

                    renderCustomers();

                }

            }
        );

    }


    /* =====================================================
       NEXT PAGE
    ===================================================== */

    const nextPage =
        document.getElementById(
            "nextPage"
        );


    if (nextPage) {

        nextPage.addEventListener(
            "click",
            function () {

                const totalPages =
                    getTotalPages();


                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderCustomers();

                }

            }
        );

    }


    /* =====================================================
       LAST PAGE
    ===================================================== */

    const lastPage =
        document.getElementById(
            "lastPage"
        );


    if (lastPage) {

        lastPage.addEventListener(
            "click",
            function () {

                const totalPages =
                    getTotalPages();


                if (
                    totalPages > 0
                ) {

                    currentPage =
                        totalPages;

                    renderCustomers();

                }

            }
        );

    }


    /* =====================================================
       DELETE CANCEL
    ===================================================== */

    const deleteCancelBtn =
        document.getElementById(
            "deleteCancelBtn"
        );


    if (deleteCancelBtn) {

        deleteCancelBtn.addEventListener(
            "click",
            function () {

                closeDeleteModal();

            }
        );

    }


    /* =====================================================
       DELETE CONFIRM
    ===================================================== */

    const deleteConfirmBtn =
        document.getElementById(
            "deleteConfirmBtn"
        );


    if (deleteConfirmBtn) {

        deleteConfirmBtn.addEventListener(
            "click",
            function () {

                confirmDelete();

            }
        );

    }


    /* =====================================================
       DELETE MODAL OUTSIDE CLICK
    ===================================================== */

    const deleteModal =
        document.getElementById(
            "deleteModal"
        );


    if (deleteModal) {

        deleteModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    deleteModal
                ) {

                    closeDeleteModal();

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

                closeDeleteModal();

                closeForm();

            }

        }
    );


    console.log(
        "Customer events registered successfully"
    );

}


/* =========================================================
   SYNC GLOBAL SEARCH
========================================================= */

function syncGlobalSearch(value) {

    const searchCustomer =
        document.getElementById(
            "searchCustomer"
        );


    if (
        !searchCustomer
    ) {

        return;

    }


    searchCustomer.value =
        String(value || "");


    currentPage = 1;

    filterCustomers();

}


/* =========================================================
   LOAD CUSTOMERS
========================================================= */

async function loadCustomers() {

    const table =
        document.getElementById(
            "customerTable"
        );


    if (!table) {

        console.error(
            "customerTable element not found"
        );

        return;

    }


    table.innerHTML = `

        <tr>

            <td
                colspan="8"
                class="loading-row">

                <i
                    class="fa-solid
                           fa-spinner
                           fa-spin">
                </i>

                Loading customers...

            </td>

        </tr>

    `;


    try {

        console.log(
            "======================================"
        );

        console.log(
            "GET CUSTOMER REQUEST"
        );

        console.log(
            "URL:",
            CUSTOMER_API
        );

        console.log(
            "======================================"
        );


        const response =
            await fetch(
                CUSTOMER_API,
                {
                    method:
                        "GET",

                    headers:
                        getHeaders(),

                    credentials:
                        "same-origin"
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
                getServerErrorMessage(
                    errorText,
                    "Unable to load customers. HTTP " +
                    response.status
                )
            );

        }


        const data =
            await response.json();


        console.log(
            "Customer API Response:",
            data
        );


        if (
            Array.isArray(data)
        ) {

            customers =
                data;

        }
        else if (
            data &&
            Array.isArray(
                data.data
            )
        ) {

            customers =
                data.data;

        }
        else if (
            data &&
            Array.isArray(
                data.content
            )
        ) {

            customers =
                data.content;

        }
        else {

            console.warn(
                "Unexpected customer response:",
                data
            );

            customers = [];

        }


        filteredCustomers =
            [...customers];


        currentPage = 1;


        renderCustomers();


        console.log(
            "Customers loaded:",
            customers.length
        );

    }
    catch (error) {

        console.error(
            "LOAD CUSTOMER ERROR:",
            error
        );


        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="empty-row">

                    <i
                        class="fa-solid
                               fa-triangle-exclamation">
                    </i>

                    ${escapeHtml(
                        error.message ||
                        "Unable to load customers."
                    )}

                </td>

            </tr>

        `;


        updatePagination(0);

    }

}


/* =========================================================
   FILTER CUSTOMERS
========================================================= */

function filterCustomers() {

    const searchElement =
        document.getElementById(
            "searchCustomer"
        );


    const statusElement =
        document.getElementById(
            "statusFilter"
        );


    const searchValue =
        searchElement
            ? searchElement.value
                .trim()
                .toLowerCase()
            : "";


    const statusValue =
        statusElement
            ? statusElement.value
            : "ALL";


    filteredCustomers =
        customers.filter(
            function (customer) {

                const name =
                    String(
                        customer.fullName ||
                        customer.customerName ||
                        customer.name ||
                        ""
                    ).toLowerCase();


                const mobile =
                    String(
                        customer.mobile ||
                        customer.phone ||
                        customer.phoneNumber ||
                        ""
                    ).toLowerCase();


                const email =
                    String(
                        customer.email ||
                        ""
                    ).toLowerCase();


                const address =
                    String(
                        customer.address ||
                        ""
                    ).toLowerCase();


                const status =
                    String(
                        customer.status ||
                        "ACTIVE"
                    ).toUpperCase();


                const id =
                    String(
                        customer.customerId ||
                        customer.id ||
                        ""
                    ).toLowerCase();


                const matchesSearch =
                    name.includes(searchValue) ||
                    mobile.includes(searchValue) ||
                    email.includes(searchValue) ||
                    address.includes(searchValue) ||
                    id.includes(searchValue);


                const matchesStatus =
                    statusValue === "ALL" ||
                    status === statusValue;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    currentPage = 1;


    renderCustomers();

}


/* =========================================================
   RENDER CUSTOMERS
========================================================= */

function renderCustomers() {

    const table =
        document.getElementById(
            "customerTable"
        );


    if (!table) {

        return;

    }


    const totalPages =
        getTotalPages();


    if (
        totalPages > 0 &&
        currentPage > totalPages
    ) {

        currentPage =
            totalPages;

    }


    if (
        totalPages === 0
    ) {

        currentPage = 1;

    }


    const startIndex =
        (currentPage - 1) *
        PAGE_SIZE;


    const endIndex =
        startIndex +
        PAGE_SIZE;


    const pageCustomers =
        filteredCustomers.slice(
            startIndex,
            endIndex
        );


    if (
        pageCustomers.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="empty-row">

                    <i
                        class="fa-solid
                               fa-users-slash">
                    </i>

                    No customers found.

                </td>

            </tr>

        `;


        updatePagination(
            totalPages
        );


        return;

    }


    let rows = "";


    pageCustomers.forEach(
        function (customer) {

            const id =
                customer.customerId ??
                customer.id ??
                "";


            const name =
                customer.fullName ??
                customer.customerName ??
                customer.name ??
                "Unknown";


            const mobile =
                customer.mobile ??
                customer.phone ??
                customer.phoneNumber ??
                "—";


            const email =
                customer.email ??
                "—";


            const totalOrders =
                customer.totalOrders ??
                customer.orderCount ??
                0;


            const totalSpent =
                customer.totalSpent ??
                customer.totalAmount ??
                customer.totalPurchase ??
                0;


            const status =
                String(
                    customer.status ||
                    "ACTIVE"
                ).toUpperCase();


            const avatar =
                getInitials(name);


            const statusClass =
                status === "ACTIVE"
                    ? "customer-status-active"
                    : "customer-status-inactive";


            const numericId =
                Number(id);


            rows += `

                <tr>


                    <!-- ID -->

                    <td>

                        ${escapeHtml(id)}

                    </td>


                    <!-- NAME -->

                    <td>

                        <div
                            class="customer-name-cell">

                            <div
                                class="customer-avatar">

                                ${escapeHtml(
                                    avatar
                                )}

                            </div>

                            <span
                                class="customer-name">

                                ${escapeHtml(
                                    name
                                )}

                            </span>

                        </div>

                    </td>


                    <!-- PHONE -->

                    <td>

                        <span
                            class="customer-phone">

                            ${escapeHtml(
                                mobile
                            )}

                        </span>

                    </td>


                    <!-- EMAIL -->

                    <td>

                        <span
                            class="customer-email">

                            ${escapeHtml(
                                email
                            )}

                        </span>

                    </td>


                    <!-- TOTAL ORDERS -->

                    <td>

                        ${escapeHtml(
                            totalOrders
                        )}

                    </td>


                    <!-- TOTAL SPENT -->

                    <td>

                        <span
                            class="customer-money">

                            ₹${formatMoney(
                                totalSpent
                            )}

                        </span>

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="customer-status-badge ${statusClass}">

                            ${escapeHtml(
                                status
                            )}

                        </span>

                    </td>


                    <!-- ACTIONS -->

                    <td>

                        <div
                            class="customer-action-buttons">


                            <button
                                type="button"
                                class="customer-action-btn customer-edit-btn"
                                title="Edit Customer"
                                onclick="window.editCustomer(${numericId})">

                                <i
                                    class="fa-solid fa-pen">
                                </i>

                            </button>


                            <button
                                type="button"
                                class="customer-action-btn customer-delete-btn"
                                title="Delete Customer"
                                onclick="window.deleteCustomer(${numericId})">

                                <i
                                    class="fa-solid fa-trash">
                                </i>

                            </button>


                        </div>

                    </td>

                </tr>

            `;

        }
    );


    table.innerHTML =
        rows;


    updatePagination(
        totalPages
    );

}


/* =========================================================
   TOTAL PAGES
========================================================= */

function getTotalPages() {

    return Math.ceil(
        filteredCustomers.length /
        PAGE_SIZE
    );

}


/* =========================================================
   UPDATE PAGINATION
========================================================= */

function updatePagination(
    totalPages
) {

    const currentPageElement =
        document.getElementById(
            "currentPage"
        );


    const first =
        document.getElementById(
            "firstPage"
        );


    const prev =
        document.getElementById(
            "prevPage"
        );


    const next =
        document.getElementById(
            "nextPage"
        );


    const last =
        document.getElementById(
            "lastPage"
        );


    if (
        currentPageElement
    ) {

        currentPageElement.innerText =
            currentPage;

    }


    if (first) {

        first.disabled =
            currentPage <= 1 ||
            totalPages === 0;

    }


    if (prev) {

        prev.disabled =
            currentPage <= 1 ||
            totalPages === 0;

    }


    if (next) {

        next.disabled =
            totalPages === 0 ||
            currentPage >= totalPages;

    }


    if (last) {

        last.disabled =
            totalPages === 0 ||
            currentPage >= totalPages;

    }


    const total =
        filteredCustomers.length;


    const start =
        total === 0
            ? 0
            : (
                (currentPage - 1) *
                PAGE_SIZE
            ) + 1;


    const end =
        Math.min(
            currentPage * PAGE_SIZE,
            total
        );


    const showingText =
        document.getElementById(
            "showingText"
        );


    if (showingText) {

        if (total === 0) {

            showingText.innerText =
                "Showing 0 customers";

        }
        else {

            showingText.innerText =
                `Showing ${start} to ${end} of ${total} customers`;

        }

    }

}


/* =========================================================
   OPEN ADD CUSTOMER FORM

   FULL WIDTH -> TWO COLUMNS
========================================================= */

function openAddForm() {

    console.log(
        "OPEN ADD CUSTOMER FORM"
    );


    editingCustomerId = null;


    const layout =
        document.getElementById(
            "customerLayout"
        );


    const panel =
        document.getElementById(
            "customerFormPanel"
        );


    const form =
        document.getElementById(
            "customerForm"
        );


    /* =====================================================
       OPEN LAYOUT
    ===================================================== */

    if (layout) {

        layout.classList.add(
            "form-open"
        );

    }


    /* =====================================================
       SHOW FORM
    ===================================================== */

    if (panel) {

        panel.classList.add(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       RESET FORM
    ===================================================== */

    if (form) {

        form.reset();

    }


    setValue(
        "customerId",
        ""
    );


    setValue(
        "status",
        "ACTIVE"
    );


    setText(
        "formTitle",
        "Add New Customer"
    );


    setDisplay(
        "saveBtn",
        "inline-flex"
    );


    setDisplay(
        "updateBtn",
        "none"
    );


    const saveButton =
        document.getElementById(
            "saveBtn"
        );


    if (saveButton) {

        saveButton.disabled =
            false;

        saveButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Save Customer
        `;

    }


    const nameInput =
        document.getElementById(
            "fullName"
        );


    setTimeout(
        function () {

            if (nameInput) {

                nameInput.focus();

            }

        },
        150
    );

}


/* =========================================================
   CLOSE CUSTOMER FORM

   TWO COLUMNS -> FULL WIDTH
========================================================= */

function closeForm() {

    console.log(
        "CLOSE CUSTOMER FORM"
    );


    editingCustomerId = null;


    const layout =
        document.getElementById(
            "customerLayout"
        );


    const panel =
        document.getElementById(
            "customerFormPanel"
        );


    const form =
        document.getElementById(
            "customerForm"
        );


    /* =====================================================
       HIDE FORM
    ===================================================== */

    if (panel) {

        panel.classList.remove(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       RETURN FULL WIDTH
    ===================================================== */

    if (layout) {

        layout.classList.remove(
            "form-open"
        );

    }


    /* =====================================================
       RESET FORM
    ===================================================== */

    if (form) {

        form.reset();

    }


    setValue(
        "customerId",
        ""
    );


    setValue(
        "status",
        "ACTIVE"
    );


    setText(
        "formTitle",
        "Add New Customer"
    );


    setDisplay(
        "saveBtn",
        "inline-flex"
    );


    setDisplay(
        "updateBtn",
        "none"
    );


    const saveButton =
        document.getElementById(
            "saveBtn"
        );


    const updateButton =
        document.getElementById(
            "updateBtn"
        );


    if (saveButton) {

        saveButton.disabled =
            false;

        saveButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Save Customer
        `;

    }


    if (updateButton) {

        updateButton.disabled =
            false;

        updateButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Update Customer
        `;

    }

}


/* =========================================================
   EDIT CUSTOMER
========================================================= */

async function editCustomer(
    id
) {

    if (!id) {

        showToast(
            "Invalid customer ID",
            true
        );

        return;

    }


    console.log(
        "EDIT CUSTOMER:",
        id
    );


    /* =====================================================
       OPEN RIGHT FORM FIRST
    ===================================================== */

    const layout =
        document.getElementById(
            "customerLayout"
        );


    const panel =
        document.getElementById(
            "customerFormPanel"
        );


    if (layout) {

        layout.classList.add(
            "form-open"
        );

    }


    if (panel) {

        panel.classList.add(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    try {

        console.log(
            "======================================"
        );

        console.log(
            "GET CUSTOMER:",
            id
        );

        console.log(
            "======================================"
        );


        const response =
            await fetch(

                CUSTOMER_API +
                "/" +
                encodeURIComponent(id),

                {
                    method:
                        "GET",

                    headers:
                        getHeaders(),

                    credentials:
                        "same-origin"
                }

            );


        console.log(
            "Edit HTTP Status:",
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


            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to load customer"
                )
            );

        }


        const customer =
            await response.json();


        console.log(
            "Customer:",
            customer
        );


        /* =================================================
           ID
        ================================================= */

        editingCustomerId =
            customer.customerId ??
            customer.id;


        if (
            editingCustomerId === null ||
            editingCustomerId === undefined
        ) {

            throw new Error(
                "Customer ID not found"
            );

        }


        /* =================================================
           FILL FORM
        ================================================= */

        setValue(
            "customerId",
            editingCustomerId
        );


        const customerName =
            customer.fullName ??
            customer.customerName ??
            customer.name ??
            "";


        setValue(
            "fullName",
            customerName
        );


        setValue(
            "mobile",
            customer.mobile ??
            customer.phone ??
            customer.phoneNumber ??
            ""
        );


        setValue(
            "email",
            customer.email ??
            ""
        );


        setValue(
            "address",
            customer.address ??
            ""
        );


        setValue(
            "status",
            customer.status ??
            "ACTIVE"
        );


        /* =================================================
           FORM TITLE
        ================================================= */

        setText(
            "formTitle",
            "Edit Customer"
        );


        /* =================================================
           BUTTONS
        ================================================= */

        setDisplay(
            "saveBtn",
            "none"
        );


        setDisplay(
            "updateBtn",
            "inline-flex"
        );


        /* =================================================
           FOCUS
        ================================================= */

        const nameInput =
            document.getElementById(
                "fullName"
            );


        if (nameInput) {

            setTimeout(
                function () {

                    nameInput.focus();

                },
                100
            );

        }

    }
    catch (error) {

        console.error(
            "EDIT CUSTOMER ERROR:",
            error
        );


        /*
         * If loading failed,
         * return to normal full-width layout.
         */

        closeForm();


        showToast(
            error.message ||
            "Unable to load customer",
            true
        );

    }

}


/* =========================================================
   GET FORM DATA
========================================================= */

function getCustomerFormData() {

    const fullName =
        getValue(
            "fullName"
        );


    const mobile =
        getValue(
            "mobile"
        );


    const email =
        getValue(
            "email"
        );


    const address =
        getValue(
            "address"
        );


    const status =
        getValue(
            "status"
        ) ||
        "ACTIVE";


    return {

        customerName:
            fullName,

        fullName:
            fullName,

        mobile:
            mobile,

        email:
            email,

        address:
            address,

        status:
            status

    };

}


/* =========================================================
   VALIDATE CUSTOMER
========================================================= */

function validateCustomer(
    customerData
) {

    const customerName =
        String(
            customerData.customerName ||
            customerData.fullName ||
            ""
        ).trim();


    if (!customerName) {

        showToast(
            "Full name is required",
            true
        );

        return false;

    }


    if (
        customerName.length < 2
    ) {

        showToast(
            "Full name must contain at least 2 characters",
            true
        );

        return false;

    }


    const mobile =
        String(
            customerData.mobile ||
            ""
        ).trim();


    if (!mobile) {

        showToast(
            "Phone number is required",
            true
        );

        return false;

    }


    const cleanMobile =
        mobile.replace(
            /[\s\-()+]/g,
            ""
        );


    if (
        !/^\d{10}$/.test(
            cleanMobile
        )
    ) {

        showToast(
            "Enter a valid 10-digit phone number",
            true
        );

        return false;

    }


    const email =
        String(
            customerData.email ||
            ""
        ).trim();


    if (email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                email
            )
        ) {

            showToast(
                "Enter a valid email address",
                true
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   SAVE CUSTOMER
========================================================= */

async function saveCustomer() {

    const customerData =
        getCustomerFormData();


    if (
        !validateCustomer(
            customerData
        )
    ) {

        return;

    }


    const button =
        document.getElementById(
            "saveBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Saving...
        `;

    }


    try {

        console.log(
            "======================================"
        );

        console.log(
            "POST CUSTOMER"
        );

        console.log(
            "Payload:",
            customerData
        );

        console.log(
            "======================================"
        );


        const response =
            await fetch(

                CUSTOMER_API,

                {

                    method:
                        "POST",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            customerData
                        ),

                    credentials:
                        "same-origin"

                }

            );


        console.log(
            "Save HTTP Status:",
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
                "SAVE CUSTOMER ERROR:",
                errorText
            );


            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to save customer"
                )
            );

        }


        showToast(
            "Customer added successfully"
        );


        closeForm();


        await loadCustomers();

    }
    catch (error) {

        console.error(
            "SAVE CUSTOMER ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to save customer",
            true
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Save Customer
            `;

        }

    }

}


/* =========================================================
   UPDATE CUSTOMER
========================================================= */

async function updateCustomer() {

    if (
        editingCustomerId === null ||
        editingCustomerId === undefined ||
        editingCustomerId === ""
    ) {

        showToast(
            "No customer selected",
            true
        );

        return;

    }


    const customerData =
        getCustomerFormData();


    if (
        !validateCustomer(
            customerData
        )
    ) {

        return;

    }


    const customerId =
        Number(
            editingCustomerId
        );


    if (
        !Number.isInteger(
            customerId
        ) ||
        customerId <= 0
    ) {

        showToast(
            "Invalid customer ID",
            true
        );

        return;

    }


    customerData.customerId =
        customerId;


    const button =
        document.getElementById(
            "updateBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Updating...
        `;

    }


    try {

        console.log(
            "======================================"
        );

        console.log(
            "UPDATE CUSTOMER"
        );

        console.log(
            "Customer ID:",
            customerId
        );

        console.log(
            "Payload:",
            customerData
        );

        console.log(
            "URL:",
            CUSTOMER_API +
            "/" +
            customerId
        );

        console.log(
            "======================================"
        );


        const response =
            await fetch(

                CUSTOMER_API +
                "/" +
                encodeURIComponent(
                    customerId
                ),

                {

                    method:
                        "PUT",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            customerData
                        ),

                    credentials:
                        "same-origin"

                }

            );


        console.log(
            "Update HTTP Status:",
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
                "UPDATE CUSTOMER ERROR:",
                errorText
            );


            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to update customer"
                )
            );

        }


        showToast(
            "Customer updated successfully"
        );


        closeForm();


        await loadCustomers();

    }
    catch (error) {

        console.error(
            "UPDATE CUSTOMER ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to update customer",
            true
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Update Customer
            `;

        }

    }

}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

function deleteCustomer(
    id
) {

    if (!id) {

        showToast(
            "Invalid customer ID",
            true
        );

        return;

    }


    deleteCustomerId =
        Number(id);


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    deleteCustomerId =
        null;


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

async function confirmDelete() {

    if (
        !deleteCustomerId
    ) {

        showToast(
            "No customer selected",
            true
        );

        return;

    }


    const customerId =
        Number(
            deleteCustomerId
        );


    if (
        !Number.isInteger(
            customerId
        ) ||
        customerId <= 0
    ) {

        showToast(
            "Invalid customer ID",
            true
        );

        return;

    }


    const button =
        document.getElementById(
            "deleteConfirmBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Processing...
        `;

    }


    try {

        console.log(
            "DELETE CUSTOMER:",
            customerId
        );


        const response =
            await fetch(

                CUSTOMER_API +
                "/" +
                encodeURIComponent(
                    customerId
                ),

                {

                    method:
                        "DELETE",

                    headers:
                        getHeaders(),

                    credentials:
                        "same-origin"

                }

            );


        console.log(
            "Delete HTTP Status:",
            response.status
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        if (response.ok) {

            closeDeleteModal();


            showToast(
                "Customer deleted successfully"
            );


            await loadCustomers();


            return;

        }


        const errorText =
            await response.text();


        console.error(
            "DELETE CUSTOMER ERROR:",
            errorText
        );


        const serverMessage =
            getServerErrorMessage(
                errorText,
                "Unable to delete customer"
            );


        const lowerMessage =
            serverMessage.toLowerCase();


        const hasForeignKeyError =
            lowerMessage.includes(
                "foreign key"
            ) ||
            lowerMessage.includes(
                "cannot delete or update a parent row"
            ) ||
            lowerMessage.includes(
                "orders_ibfk"
            ) ||
            lowerMessage.includes(
                "orders"
            );


        if (
            hasForeignKeyError
        ) {

            console.warn(
                "Customer has existing orders. Deactivating instead."
            );


            await deactivateCustomer(
                customerId
            );


            return;

        }


        throw new Error(
            serverMessage
        );

    }
    catch (error) {

        console.error(
            "DELETE CUSTOMER ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to delete customer",
            true
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML =
                "Delete";

        }

    }

}


/* =========================================================
   DEACTIVATE CUSTOMER
========================================================= */

async function deactivateCustomer(
    customerId
) {

    try {

        console.log(
            "DEACTIVATE CUSTOMER:",
            customerId
        );


        /* =================================================
           LOAD CUSTOMER
        ================================================= */

        const getResponse =
            await fetch(

                CUSTOMER_API +
                "/" +
                encodeURIComponent(
                    customerId
                ),

                {

                    method:
                        "GET",

                    headers:
                        getHeaders(),

                    credentials:
                        "same-origin"

                }

            );


        if (
            getResponse.status === 401 ||
            getResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        if (!getResponse.ok) {

            const errorText =
                await getResponse.text();


            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to load customer"
                )
            );

        }


        const customer =
            await getResponse.json();


        const customerName =
            customer.fullName ??
            customer.customerName ??
            customer.name ??
            "";


        const inactiveData = {

            customerId:
                Number(customerId),

            customerName:
                customerName,

            fullName:
                customerName,

            mobile:
                customer.mobile ??
                customer.phone ??
                customer.phoneNumber ??
                "",

            email:
                customer.email ??
                "",

            address:
                customer.address ??
                "",

            status:
                "INACTIVE"

        };


        /* =================================================
           UPDATE STATUS
        ================================================= */

        const updateResponse =
            await fetch(

                CUSTOMER_API +
                "/" +
                encodeURIComponent(
                    customerId
                ),

                {

                    method:
                        "PUT",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            inactiveData
                        ),

                    credentials:
                        "same-origin"

                }

            );


        if (
            updateResponse.status === 401 ||
            updateResponse.status === 403
        ) {

            handleUnauthorized();

            return;

        }


        if (!updateResponse.ok) {

            const errorText =
                await updateResponse.text();


            throw new Error(
                getServerErrorMessage(
                    errorText,
                    "Unable to deactivate customer"
                )
            );

        }


        closeDeleteModal();


        showToast(
            "Customer has existing orders, so it was marked INACTIVE."
        );


        await loadCustomers();

    }
    catch (error) {

        console.error(
            "DEACTIVATE CUSTOMER ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to deactivate customer",
            true
        );

    }

}


/* =========================================================
   SERVER ERROR MESSAGE
========================================================= */

function getServerErrorMessage(
    errorText,
    defaultMessage
) {

    if (!errorText) {

        return defaultMessage;

    }


    try {

        const json =
            JSON.parse(
                errorText
            );


        return (
            json.message ||
            json.error ||
            json.details ||
            defaultMessage
        );

    }
    catch (error) {

        const cleanText =
            String(errorText)
                .replace(
                    /<[^>]*>/g,
                    " "
                )
                .replace(
                    /\s+/g,
                    " "
                )
                .trim();


        if (
            cleanText &&
            cleanText.length < 500
        ) {

            return cleanText;

        }


        return defaultMessage;

    }

}


/* =========================================================
   HANDLE UNAUTHORIZED
========================================================= */

function handleUnauthorized() {

    console.warn(
        "Session expired or unauthorized"
    );


    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "jwtToken"
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


    const dateFormatter =
        new Intl.DateTimeFormat(
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


    const dayFormatter =
        new Intl.DateTimeFormat(
            "en-US",
            {

                weekday:
                    "long"

            }
        );


    dateElement.innerText =
        dateFormatter.format(
            now
        );


    dayElement.innerText =
        dayFormatter.format(
            now
        );

}


/* =========================================================
   ADMIN INFO
========================================================= */

function loadAdminInfo() {

    const adminName =
        document.getElementById(
            "adminName"
        );


    const username =
        localStorage.getItem(
            "username"
        );


    if (
        adminName &&
        username
    ) {

        adminName.innerText =
            username;

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    isError = false
) {

    const toast =
        document.getElementById(
            "toast"
        );


    const text =
        document.getElementById(
            "toastText"
        );


    if (
        !toast ||
        !text
    ) {

        console.warn(
            "Toast elements not found:",
            message
        );

        return;

    }


    text.innerText =
        message;


    toast.classList.remove(
        "error"
    );


    if (isError) {

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
   GET VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return "";

    }


    return String(
        element.value ||
        ""
    ).trim();

}


/* =========================================================
   SET VALUE
========================================================= */

function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value ?? "";

    }

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
            value ?? "";

    }

}


/* =========================================================
   SET DISPLAY
========================================================= */

function setDisplay(
    id,
    display
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.style.display =
            display;

    }

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(
    value
) {

    const number =
        Number(value) || 0;


    return number.toLocaleString(
        "en-IN",
        {

            minimumFractionDigits:
                0,

            maximumFractionDigits:
                2

        }
    );

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

        return words[0]
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
   ESCAPE HTML
========================================================= */

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


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.editCustomer =
    editCustomer;


window.deleteCustomer =
    deleteCustomer;


window.openAddForm =
    openAddForm;


window.closeForm =
    closeForm;


window.confirmDelete =
    confirmDelete;


window.closeDeleteModal =
    closeDeleteModal;


window.updateCustomer =
    updateCustomer;


window.saveCustomer =
    saveCustomer;


window.deactivateCustomer =
    deactivateCustomer;


/* =========================================================
   FINAL LOG
========================================================= */

console.log(
    "======================================"
);

console.log(
    "Customer Management JS Ready"
);

console.log(
    "Customer API:",
    CUSTOMER_API
);

console.log(
    "======================================"
);