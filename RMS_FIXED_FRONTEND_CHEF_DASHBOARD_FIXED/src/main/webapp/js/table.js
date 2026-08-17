"use strict";

/* =========================================================
   SANKALP RMS - TABLE MANAGEMENT
========================================================= */

console.log("======================================");
console.log("Sankalp Table Management Loaded");
console.log("======================================");


/* =========================================================
   CONFIGURATION
========================================================= */

const BACKEND_URL =
    "http://localhost:8080";

const TABLE_API =
    BACKEND_URL + "/api/table";


/* =========================================================
   CONTEXT PATH
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
   VARIABLES
========================================================= */

let allTables = [];

let filteredTables = [];

let editingTableId = null;

let deletingTableId = null;

let currentTablePage = 1;

const TABLE_PAGE_SIZE = 8;


/* =========================================================
   TOKEN
========================================================= */

function getToken() {

    return localStorage.getItem("token");

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

        headers["Authorization"] =
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
            "Table page initialized"
        );


        if (!getToken()) {

            window.location.href =
                CONTEXT_PATH +
                "/login.jsp";

            return;

        }


        initializeTablePage();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initializeTablePage() {

    setCurrentDate();

    loadAdminInfo();

    setupTableEvents();

    loadTables();

}


/* =========================================================
   EVENTS
========================================================= */

function setupTableEvents() {


    /* =====================================================
       ADD
    ===================================================== */

    document
        .getElementById("openAddTableBtn")
        ?.addEventListener(
            "click",
            openAddTableForm
        );


    /* =====================================================
       CLOSE
    ===================================================== */

    document
        .getElementById("closeTableForm")
        ?.addEventListener(
            "click",
            closeTableForm
        );


    document
        .getElementById("cancelTableForm")
        ?.addEventListener(
            "click",
            closeTableForm
        );


    /* =====================================================
       FORM
    ===================================================== */

    document
        .getElementById("tableForm")
        ?.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveTable();

            }
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    document
        .getElementById("tableSearch")
        ?.addEventListener(
            "input",
            filterTables
        );


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    const globalSearch =
        document.getElementById(
            "globalSearch"
        );

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            function () {

                const localSearch =
                    document.getElementById(
                        "tableSearch"
                    );

                if (localSearch) {

                    localSearch.value =
                        globalSearch.value;

                    filterTables();

                }

            }
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    document
        .getElementById("tableStatusFilter")
        ?.addEventListener(
            "change",
            filterTables
        );


    /* =====================================================
       REFRESH
    ===================================================== */

    document
        .getElementById("refreshTables")
        ?.addEventListener(
            "click",
            loadTables
        );


    /* =====================================================
       PAGINATION
    ===================================================== */

    document
        .getElementById("tableFirstPage")
        ?.addEventListener(
            "click",
            function () {

                currentTablePage =
                    1;

                renderTables();

            }
        );


    document
        .getElementById("tablePrevPage")
        ?.addEventListener(
            "click",
            function () {

                if (
                    currentTablePage >
                    1
                ) {

                    currentTablePage--;

                    renderTables();

                }

            }
        );


    document
        .getElementById("tableNextPage")
        ?.addEventListener(
            "click",
            function () {

                const totalPages =
                    getTableTotalPages();

                if (
                    currentTablePage <
                    totalPages
                ) {

                    currentTablePage++;

                    renderTables();

                }

            }
        );


    document
        .getElementById("tableLastPage")
        ?.addEventListener(
            "click",
            function () {

                const totalPages =
                    getTableTotalPages();

                currentTablePage =
                    totalPages || 1;

                renderTables();

            }
        );


    /* =====================================================
       DELETE
    ===================================================== */

    document
        .getElementById("cancelTableDelete")
        ?.addEventListener(
            "click",
            closeDeleteModal
        );


    document
        .getElementById("confirmTableDelete")
        ?.addEventListener(
            "click",
            confirmDelete
        );


    /* =====================================================
       OVERLAY CLICKS
    ===================================================== */

    document
        .getElementById("tablePanelOverlay")
        ?.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    this
                ) {

                    closeTableForm();

                }

            }
        );


    document
        .getElementById("tableDeleteOverlay")
        ?.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    this
                ) {

                    closeDeleteModal();

                }

            }
        );


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeTableForm();

                closeDeleteModal();

            }

        }
    );

}


/* =========================================================
   LOAD TABLES
========================================================= */

async function loadTables() {

    const tbody =
        document.getElementById(
            "tableDataBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="6"
                class="table-loading">

                <i class="fa-solid fa-spinner fa-spin"></i>

                Loading tables...

            </td>

        </tr>

    `;


    try {

        const response =
            await fetch(
                TABLE_API,
                {

                    method:
                        "GET",

                    headers:
                        getHeaders()

                }
            );


        console.log(
            "Table HTTP Status:",
            response.status
        );


        if (
            response.status ===
                401 ||
            response.status ===
                403
        ) {

            handleUnauthorized();

            return;

        }


        if (!response.ok) {

            const text =
                await response.text();

            console.error(
                "TABLE API ERROR:",
                text
            );

            throw new Error(
                "Unable to load tables. HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        allTables =
            Array.isArray(data)
                ? data
                : [];


        filteredTables =
            [...allTables];


        currentTablePage =
            1;


        renderTables();

        updateTableStats();

    }
    catch (error) {

        console.error(
            "LOAD TABLE ERROR:",
            error
        );


        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    Failed to load tables.

                </td>

            </tr>

        `;


        updateTableStats();

    }

}


/* =========================================================
   FILTER
========================================================= */

function filterTables() {

    const searchInput =
        document.getElementById(
            "tableSearch"
        );

    const statusFilter =
        document.getElementById(
            "tableStatusFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const statusValue =
        statusFilter
            ? statusFilter.value
            : "ALL";


    filteredTables =
        allTables.filter(
            function (table) {

                const tableNumber =
                    String(
                        getTableNumber(
                            table
                        )
                    ).toLowerCase();


                const location =
                    String(
                        getTableLocation(
                            table
                        )
                    ).toLowerCase();


                const id =
                    String(
                        getTableId(
                            table
                        )
                    );


                const status =
                    getTableStatus(
                        table
                    );


                const capacity =
                    String(
                        getTableCapacity(
                            table
                        )
                    );


                const matchesSearch =
                    tableNumber.includes(
                        searchText
                    ) ||
                    location.includes(
                        searchText
                    ) ||
                    id.includes(
                        searchText
                    ) ||
                    capacity.includes(
                        searchText
                    );


                const matchesStatus =
                    statusValue ===
                        "ALL" ||
                    status ===
                        statusValue;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    currentTablePage =
        1;


    renderTables();

}


/* =========================================================
   RENDER
========================================================= */

function renderTables() {

    const tbody =
        document.getElementById(
            "tableDataBody"
        );


    if (!tbody) {

        return;

    }


    const totalPages =
        getTableTotalPages();


    if (
        totalPages > 0 &&
        currentTablePage >
            totalPages
    ) {

        currentTablePage =
            totalPages;

    }


    const startIndex =
        (
            currentTablePage -
            1
        ) *
        TABLE_PAGE_SIZE;


    const pageTables =
        filteredTables.slice(
            startIndex,
            startIndex +
                TABLE_PAGE_SIZE
        );


    if (
        pageTables.length ===
        0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty">

                    <i class="fa-solid fa-chair"></i>

                    No tables found.

                </td>

            </tr>

        `;

        updateTablePagination(
            totalPages
        );

        return;

    }


    let rows = "";


    pageTables.forEach(
        function (table) {

            const id =
                getTableId(
                    table
                );


            const number =
                getTableNumber(
                    table
                );


            const capacity =
                getTableCapacity(
                    table
                );


            const location =
                getTableLocation(
                    table
                );


            const status =
                getTableStatus(
                    table
                );


            const statusClass =
                getStatusClass(
                    status
                );


            rows += `

                <tr>

                    <td>

                        ${escapeHTML(id)}

                    </td>


                    <td>

                        <div
                            class="table-number-cell">

                            <div
                                class="table-number-icon">

                                <i class="fa-solid fa-chair"></i>

                            </div>

                            <strong>

                                Table
                                ${escapeHTML(number)}

                            </strong>

                        </div>

                    </td>


                    <td>

                        <span
                            class="capacity-cell">

                            <i class="fa-solid fa-users"></i>

                            ${escapeHTML(capacity)}

                        </span>

                    </td>


                    <td>

                        <span
                            class="location-cell">

                            ${escapeHTML(
                                location ||
                                "Main Hall"
                            )}

                        </span>

                    </td>


                    <td>

                        <span
                            class="table-status
                            ${statusClass}">

                            ${escapeHTML(status)}

                        </span>

                    </td>


                    <td>

                        <div
                            class="table-actions">

                            <button
                                type="button"
                                class="table-action-btn
                                       table-edit-btn"
                                title="Edit"
                                onclick="editTable(${Number(id)})">

                                <i
                                    class="fa-solid fa-pen"></i>

                            </button>


                            <button
                                type="button"
                                class="table-action-btn
                                       table-delete-btn"
                                title="Delete"
                                onclick="openDeleteModal(${Number(id)})">

                                <i
                                    class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );


    tbody.innerHTML =
        rows;


    updateTablePagination(
        totalPages
    );

}


/* =========================================================
   TOTAL PAGES
========================================================= */

function getTableTotalPages() {

    return Math.ceil(
        filteredTables.length /
        TABLE_PAGE_SIZE
    );

}


/* =========================================================
   PAGINATION
========================================================= */

function updateTablePagination(
    totalPages
) {

    const current =
        document.getElementById(
            "tableCurrentPage"
        );

    const first =
        document.getElementById(
            "tableFirstPage"
        );

    const prev =
        document.getElementById(
            "tablePrevPage"
        );

    const next =
        document.getElementById(
            "tableNextPage"
        );

    const last =
        document.getElementById(
            "tableLastPage"
        );


    if (current) {

        current.innerText =
            currentTablePage;

    }


    if (first) {

        first.disabled =
            currentTablePage <= 1 ||
            totalPages === 0;

    }


    if (prev) {

        prev.disabled =
            currentTablePage <= 1 ||
            totalPages === 0;

    }


    if (next) {

        next.disabled =
            totalPages === 0 ||
            currentTablePage >=
                totalPages;

    }


    if (last) {

        last.disabled =
            totalPages === 0 ||
            currentTablePage >=
                totalPages;

    }


    const total =
        filteredTables.length;


    const start =
        total === 0
            ? 0
            : (
                (
                    currentTablePage -
                    1
                ) *
                TABLE_PAGE_SIZE
            ) + 1;


    const end =
        Math.min(
            currentTablePage *
                TABLE_PAGE_SIZE,
            total
        );


    const text =
        document.getElementById(
            "tableShowingText"
        );


    if (text) {

        text.innerText =
            total === 0
                ? "Showing 0 tables"
                : `Showing ${start} to ${end} of ${total} tables`;

    }

}


/* =========================================================
   STATS
========================================================= */

function updateTableStats() {

    let available = 0;
    let occupied = 0;
    let reserved = 0;


    allTables.forEach(
        function (table) {

            const status =
                getTableStatus(
                    table
                );


            if (
                status ===
                "AVAILABLE"
            ) {

                available++;

            }

            if (
                status ===
                "OCCUPIED"
            ) {

                occupied++;

            }

            if (
                status ===
                "RESERVED"
            ) {

                reserved++;

            }

        }
    );


    setText(
        "totalTableCount",
        allTables.length
    );

    setText(
        "availableTableCount",
        available
    );

    setText(
        "occupiedTableCount",
        occupied
    );

    setText(
        "reservedTableCount",
        reserved
    );

}


/* =========================================================
   OPEN ADD FORM
========================================================= */

function openAddTableForm() {

    editingTableId =
        null;


    clearTableForm();


    setText(
        "tableFormTitle",
        "Add New Table"
    );


    openTablePanel();

}


/* =========================================================
   EDIT TABLE
========================================================= */

async function editTable(
    id
) {

    if (!id) {

        return;

    }


    try {

        const response =
            await fetch(
                TABLE_API +
                "/" +
                encodeURIComponent(
                    id
                ),
                {

                    method:
                        "GET",

                    headers:
                        getHeaders()

                }
            );


        if (
            response.status ===
                401 ||
            response.status ===
                403
        ) {

            handleUnauthorized();

            return;

        }


        if (!response.ok) {

            throw new Error(
                "Unable to load table."
            );

        }


        const table =
            await response.json();


        editingTableId =
            getTableId(
                table
            );


        setValue(
            "tableId",
            editingTableId
        );


        setValue(
            "tableNumber",
            getTableNumber(
                table
            )
        );


        setValue(
            "tableCapacity",
            getTableCapacity(
                table
            )
        );


        setValue(
            "tableLocation",
            getTableLocation(
                table
            )
        );


        setValue(
            "tableStatus",
            getTableStatus(
                table
            )
        );


        setText(
            "tableFormTitle",
            "Edit Table"
        );


        openTablePanel();

    }
    catch (error) {

        console.error(
            "EDIT TABLE ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to load table.",
            "error"
        );

    }

}


/* =========================================================
   OPEN PANEL
========================================================= */

function openTablePanel() {

    const overlay =
        document.getElementById(
            "tablePanelOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }


    setTimeout(
        function () {

            document
                .getElementById(
                    "tableNumber"
                )
                ?.focus();

        },
        200
    );

}


/* =========================================================
   CLOSE PANEL
========================================================= */

function closeTableForm() {

    const overlay =
        document.getElementById(
            "tablePanelOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    editingTableId =
        null;


    clearTableForm();

}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearTableForm() {

    const form =
        document.getElementById(
            "tableForm"
        );


    if (form) {

        form.reset();

    }


    setValue(
        "tableId",
        ""
    );


    setValue(
        "tableStatus",
        "AVAILABLE"
    );

}


/* =========================================================
   SAVE / UPDATE
========================================================= */

async function saveTable() {

    const tableNumber =
        getValue(
            "tableNumber"
        );


    const capacity =
        Number(
            getValue(
                "tableCapacity"
            )
        );


    const location =
        getValue(
            "tableLocation"
        );


    const status =
        getValue(
            "tableStatus"
        );


    if (!tableNumber) {

        showToast(
            "Table number is required.",
            "error"
        );

        return;

    }


    if (
        !capacity ||
        capacity < 1
    ) {

        showToast(
            "Enter a valid table capacity.",
            "error"
        );

        return;

    }


    const payload = {

        tableNumber:
            tableNumber,

        capacity:
            capacity,

        location:
            location,

        status:
            status || "AVAILABLE"

    };


    const button =
        document.getElementById(
            "saveTableBtn"
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

        let response;


        if (
            editingTableId !==
                null &&
            editingTableId !==
                undefined
        ) {

            response =
                await fetch(
                    TABLE_API +
                    "/" +
                    encodeURIComponent(
                        editingTableId
                    ),
                    {

                        method:
                            "PUT",

                        headers:
                            getHeaders(),

                        body:
                            JSON.stringify(
                                payload
                            )

                    }
                );

        }
        else {

            response =
                await fetch(
                    TABLE_API,
                    {

                        method:
                            "POST",

                        headers:
                            getHeaders(),

                        body:
                            JSON.stringify(
                                payload
                            )

                    }
                );

        }


        if (
            response.status ===
                401 ||
            response.status ===
                403
        ) {

            handleUnauthorized();

            return;

        }


        const result =
            await parseResponse(
                response
            );


        if (!response.ok) {

            throw new Error(
                getServerMessage(
                    result,
                    "Unable to save table."
                )
            );

        }


        showToast(
            editingTableId !==
                null
                ? "Table updated successfully."
                : "Table added successfully.",
            "success"
        );


        closeTableForm();

        await loadTables();

    }
    catch (error) {

        console.error(
            "SAVE TABLE ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to save table.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML = `

                <i class="fa-solid fa-check"></i>

                Save Table

            `;

        }

    }

}


/* =========================================================
   OPEN DELETE MODAL
========================================================= */

function openDeleteModal(
    id
) {

    deletingTableId =
        Number(id);


    const overlay =
        document.getElementById(
            "tableDeleteOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    deletingTableId =
        null;


    const overlay =
        document.getElementById(
            "tableDeleteOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   DELETE
========================================================= */

async function confirmDelete() {

    if (!deletingTableId) {

        return;

    }


    const id =
        deletingTableId;


    const button =
        document.getElementById(
            "confirmTableDelete"
        );


    if (button) {

        button.disabled =
            true;

        button.innerText =
            "Deleting...";

    }


    try {

        const response =
            await fetch(
                TABLE_API +
                "/" +
                encodeURIComponent(
                    id
                ),
                {

                    method:
                        "DELETE",

                    headers:
                        getHeaders()

                }
            );


        if (
            response.status ===
                401 ||
            response.status ===
                403
        ) {

            handleUnauthorized();

            return;

        }


        const result =
            await parseResponse(
                response
            );


        if (!response.ok) {

            throw new Error(
                getServerMessage(
                    result,
                    "Unable to delete table."
                )
            );

        }


        closeDeleteModal();


        showToast(
            "Table deleted successfully.",
            "success"
        );


        await loadTables();

    }
    catch (error) {

        console.error(
            "DELETE TABLE ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to delete table.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerText =
                "Delete";

        }

    }

}


/* =========================================================
   GET TABLE FIELDS
========================================================= */

function getTableId(
    table
) {

    return (
        table.tableId ??
        table.id ??
        ""
    );

}


function getTableNumber(
    table
) {

    return (
        table.tableNumber ??
        table.tableName ??
        table.number ??
        ""
    );

}


function getTableCapacity(
    table
) {

    return (
        table.capacity ??
        table.seatingCapacity ??
        0
    );

}


function getTableLocation(
    table
) {

    return (
        table.location ??
        table.tableLocation ??
        ""
    );

}


function getTableStatus(
    table
) {

    return String(
        table.status ||
        "AVAILABLE"
    ).toUpperCase();

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(
    status
) {

    const value =
        String(
            status
        ).toUpperCase();


    switch (value) {

        case "AVAILABLE":
            return "available";

        case "OCCUPIED":
            return "occupied";

        case "RESERVED":
            return "reserved";

        case "MAINTENANCE":
            return "maintenance";

        case "INACTIVE":
            return "inactive";

        default:
            return "available";

    }

}


/* =========================================================
   PARSE RESPONSE
========================================================= */

async function parseResponse(
    response
) {

    const text =
        await response.text();


    if (!text) {

        return "";

    }


    try {

        return JSON.parse(
            text
        );

    }
    catch (
        error
    ) {

        return text;

    }

}


/* =========================================================
   SERVER MESSAGE
========================================================= */

function getServerMessage(
    result,
    defaultMessage
) {

    if (!result) {

        return defaultMessage;

    }


    if (
        typeof result ===
        "object"
    ) {

        return (
            result.message ||
            result.error ||
            result.details ||
            defaultMessage
        );

    }


    const text =
        String(result)
            .replace(
                /<[^>]*>/g,
                " "
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();


    return (
        text &&
        text.length < 300
    )
        ? text
        : defaultMessage;

}


/* =========================================================
   DATE
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


    dateElement.innerText =
        now.toLocaleDateString(
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


    dayElement.innerText =
        now.toLocaleDateString(
            "en-US",
            {

                weekday:
                    "long"

            }
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


    const roleElement =
        document.getElementById(
            "adminRole"
        );

    const role =
        localStorage.getItem(
            "role"
        );


    if (
        roleElement &&
        role
    ) {

        roleElement.innerText =
            role === "ADMIN"
                ? "Administrator"
                : role;

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "tableToast"
        );

    const text =
        document.getElementById(
            "tableToastText"
        );


    if (!toast) {

        alert(message);

        return;

    }


    if (text) {

        text.innerText =
            message;

    }


    toast.classList.remove(
        "success",
        "error",
        "show"
    );


    toast.classList.add(
        type
    );


    requestAnimationFrame(
        function () {

            toast.classList.add(
                "show"
            );

        }
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

function getValue(
    id
) {

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
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ??
        ""
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
   INLINE FUNCTIONS
========================================================= */

window.editTable =
    editTable;

window.openDeleteModal =
    openDeleteModal;


/* =========================================================
   UNAUTHORIZED
========================================================= */

function handleUnauthorized() {

    localStorage.removeItem(
        "token"
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
   FINAL
========================================================= */

console.log(
    "Sankalp RMS Table Management JavaScript Ready"
);

console.log(
    "Table API:",
    TABLE_API
);