"use strict";

/* =========================================================
   SANKALP RMS - MENU MANAGEMENT
========================================================= */

console.log("======================================");
console.log("Sankalp Menu Management Loaded");
console.log("======================================");


/* =========================================================
   API CONFIGURATION
========================================================= */

const BACKEND_URL =
    "http://localhost:8080";

const MENU_API =
    BACKEND_URL + "/api/menu";

const CATEGORY_API =
    BACKEND_URL + "/api/category";

const IMAGE_PATH =
    BACKEND_URL + "/uploads/";

const DEFAULT_IMAGE =
    "images/menu/default-food.jpg";


console.log("Backend URL:", BACKEND_URL);
console.log("Menu API:", MENU_API);
console.log("Category API:", CATEGORY_API);


/* =========================================================
   VARIABLES
========================================================= */

let menuList = [];

let filteredMenuList = [];

let categoryList = [];

let currentPage = 1;

const PAGE_SIZE = 6;

let editingMenuId = null;

let deleteMenuId = null;


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

function getJsonHeaders() {

    const token = getToken();

    const headers = {
        "Accept": "application/json"
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
            "Menu page initialized"
        );

        const token = getToken();

        if (!token) {

            console.warn(
                "JWT token not found"
            );

            window.location.href =
                getContextPath() +
                "/login.jsp";

            return;
        }

        initializeMenuPage();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initializeMenuPage() {

    setupMenuEvents();

    hideMenuForm();

    setCurrentDate();

    loadAdminInfo();

    loadCategories();

    loadMenu();

}


/* =========================================================
   EVENTS
========================================================= */

function setupMenuEvents() {

    /* =====================================================
       ADD
    ===================================================== */

    const addButton =
        document.getElementById("openAddBtn");

    if (addButton) {

        addButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openAddForm();

            }
        );

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    const closeButton =
        document.getElementById("closeFormBtn");

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                closeMenuForm();

            }
        );

    }


    /* =====================================================
       CANCEL
    ===================================================== */

    const cancelButton =
        document.getElementById("cancelBtn");

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                closeMenuForm();

            }
        );

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    const menuForm =
        document.getElementById("menuForm");

    if (menuForm) {

        menuForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (editingMenuId !== null) {

                    updateMenu();

                } else {

                    saveMenu();

                }

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("searchMenu");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentPage = 1;

                applyFilters();

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    const categoryFilter =
        document.getElementById("categoryFilter");

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function () {

                currentPage = 1;

                applyFilters();

            }
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    const statusFilter =
        document.getElementById("statusFilter");

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                currentPage = 1;

                applyFilters();

            }
        );

    }


    /* =====================================================
       IMAGE
    ===================================================== */

    const imageUpload =
        document.getElementById("imageUpload");

    const imageInput =
        document.getElementById("image");

    if (imageUpload && imageInput) {

        imageUpload.addEventListener(
            "click",
            function () {

                imageInput.click();

            }
        );


        imageInput.addEventListener(
            "change",
            handleImagePreview
        );

    }


    /* =====================================================
       PAGINATION
    ===================================================== */

    const firstPage =
        document.getElementById("firstPage");

    if (firstPage) {

        firstPage.addEventListener(
            "click",
            function () {

                currentPage = 1;

                renderMenuTable();

            }
        );

    }


    const prevPage =
        document.getElementById("prevPage");

    if (prevPage) {

        prevPage.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    renderMenuTable();

                }

            }
        );

    }


    const nextPage =
        document.getElementById("nextPage");

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

                    renderMenuTable();

                }

            }
        );

    }


    const lastPage =
        document.getElementById("lastPage");

    if (lastPage) {

        lastPage.addEventListener(
            "click",
            function () {

                const totalPages =
                    getTotalPages();

                if (totalPages > 0) {

                    currentPage =
                        totalPages;

                    renderMenuTable();

                }

            }
        );

    }


    /* =====================================================
       DELETE CANCEL
    ===================================================== */

    const deleteCancel =
        document.getElementById(
            "deleteCancelBtn"
        );

    if (deleteCancel) {

        deleteCancel.addEventListener(
            "click",
            closeDeleteModal
        );

    }


    /* =====================================================
       DELETE CONFIRM
    ===================================================== */

    const deleteConfirm =
        document.getElementById(
            "deleteConfirmBtn"
        );

    if (deleteConfirm) {

        deleteConfirm.addEventListener(
            "click",
            confirmDelete
        );

    }


    /* =====================================================
       DELETE OUTSIDE CLICK
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
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeDeleteModal();

            }

        }
    );

}


/* =========================================================
   SHOW FORM
========================================================= */

function showMenuForm() {

    const panel =
        document.getElementById(
            "menuFormPanel"
        );

    const layout =
        document.getElementById(
            "menuLayout"
        );

    if (!panel) {

        console.error(
            "menuFormPanel not found."
        );

        return;

    }


    panel.classList.add(
        "show"
    );

    panel.setAttribute(
        "aria-hidden",
        "false"
    );


    if (layout) {

        layout.classList.add(
            "form-open"
        );

    }

}


/* =========================================================
   HIDE FORM
========================================================= */

function hideMenuForm() {

    const panel =
        document.getElementById(
            "menuFormPanel"
        );

    const layout =
        document.getElementById(
            "menuLayout"
        );

    if (panel) {

        panel.classList.remove(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (layout) {

        layout.classList.remove(
            "form-open"
        );

    }

}


/* =========================================================
   LOAD CATEGORIES
========================================================= */

async function loadCategories() {

    try {

        console.log(
            "Loading categories..."
        );


        const response =
            await fetch(
                CATEGORY_API,
                {
                    method: "GET",
                    headers: getJsonHeaders()
                }
            );


        console.log(
            "Category Status:",
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
                errorText ||
                "Unable to load categories."
            );

        }


        const data =
            await response.json();


        categoryList =
            Array.isArray(data)
                ? data
                : [];


        populateCategorySelects();

    }
    catch (error) {

        console.error(
            "CATEGORY ERROR:",
            error
        );

        showToast(
            error.message ||
            "Unable to load categories.",
            "error"
        );

    }

}


/* =========================================================
   POPULATE CATEGORY
========================================================= */

function populateCategorySelects() {

    const formSelect =
        document.getElementById(
            "categoryId"
        );

    const filterSelect =
        document.getElementById(
            "categoryFilter"
        );


    if (formSelect) {

        let html =
            `<option value="">Select category</option>`;

        categoryList.forEach(
            function (category) {

                html += `
                    <option value="${category.categoryId}">
                        ${escapeHtml(
                            category.categoryName
                        )}
                    </option>
                `;

            }
        );

        formSelect.innerHTML =
            html;

    }


    if (filterSelect) {

        let html =
            `<option value="ALL">All Categories</option>`;

        categoryList.forEach(
            function (category) {

                html += `
                    <option value="${category.categoryId}">
                        ${escapeHtml(
                            category.categoryName
                        )}
                    </option>
                `;

            }
        );

        filterSelect.innerHTML =
            html;

    }

}


/* =========================================================
   LOAD MENU
========================================================= */

async function loadMenu() {

    const table =
        document.getElementById(
            "menuTable"
        );


    if (!table) {

        console.error(
            "menuTable not found."
        );

        return;

    }


    table.innerHTML = `
        <tr>
            <td colspan="7" class="loading-row">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading menu items...
            </td>
        </tr>
    `;


    try {

        const response =
            await fetch(
                MENU_API,
                {
                    method: "GET",
                    headers: getJsonHeaders()
                }
            );


        console.log(
            "Menu Status:",
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
                errorText ||
                "Unable to load menu items."
            );

        }


        const data =
            await response.json();


        menuList =
            Array.isArray(data)
                ? data
                : [];


        filteredMenuList =
            [...menuList];


        currentPage = 1;


        renderMenuTable();

    }
    catch (error) {

        console.error(
            "LOAD MENU ERROR:",
            error
        );


        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-row">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    ${escapeHtml(
                        error.message ||
                        "Failed to load menu items."
                    )}
                </td>
            </tr>
        `;


        updatePagination(0);

    }

}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyFilters() {

    const searchInput =
        document.getElementById(
            "searchMenu"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const categoryValue =
        categoryFilter
            ? categoryFilter.value
            : "ALL";


    const statusValue =
        statusFilter
            ? statusFilter.value
            : "ALL";


    filteredMenuList =
        menuList.filter(
            function (menu) {

                const itemName =
                    String(
                        menu.itemName ||
                        ""
                    ).toLowerCase();


                const description =
                    String(
                        menu.description ||
                        ""
                    ).toLowerCase();


                const categoryName =
                    getCategoryName(menu)
                        .toLowerCase();


                const menuCategoryId =
                    getCategoryId(menu);


                const status =
                    String(
                        menu.status ||
                        "AVAILABLE"
                    ).toUpperCase();


                const matchesSearch =
                    itemName.includes(
                        searchValue
                    ) ||
                    description.includes(
                        searchValue
                    ) ||
                    categoryName.includes(
                        searchValue
                    );


                const matchesCategory =
                    categoryValue === "ALL" ||
                    String(
                        menuCategoryId
                    ) === String(
                        categoryValue
                    );


                const matchesStatus =
                    statusValue === "ALL" ||
                    status === statusValue;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus
                );

            }
        );


    currentPage = 1;

    renderMenuTable();

}


/* =========================================================
   RENDER TABLE
========================================================= */

function renderMenuTable() {

    const table =
        document.getElementById(
            "menuTable"
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


    if (totalPages === 0) {

        currentPage = 1;

    }


    const startIndex =
        (currentPage - 1) *
        PAGE_SIZE;


    const endIndex =
        startIndex +
        PAGE_SIZE;


    const pageItems =
        filteredMenuList.slice(
            startIndex,
            endIndex
        );


    if (!pageItems.length) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-row">
                    <i class="fa-solid fa-utensils"></i>
                    No menu items found.
                </td>
            </tr>
        `;


        updatePagination(
            totalPages
        );


        return;

    }


    let rows = "";


    pageItems.forEach(
        function (menu) {

            const id =
                menu.itemId ||
                menu.id ||
                "";


            const itemName =
                menu.itemName ||
                "Unnamed Item";


            const categoryName =
                getCategoryName(menu);


            const description =
                menu.description ||
                "";


            const price =
                Number(
                    menu.price || 0
                );


            const status =
                String(
                    menu.status ||
                    "AVAILABLE"
                )
                .toUpperCase();


            const statusClass =
                status === "AVAILABLE"
                    ? "available"
                    : "unavailable";


            const imageUrl =
                getImageUrl(
                    menu.image
                );


            rows += `
                <tr>

                    <td>
                        ${escapeHtml(id)}
                    </td>


                    <td>

                        <div class="menu-item-image">

                            <img
                                src="${escapeAttribute(
                                    imageUrl
                                )}"
                                alt="${escapeAttribute(
                                    itemName
                                )}"
                                onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'">

                        </div>

                    </td>


                    <td>

                        <div class="item-name-wrapper">

                            <strong>
                                ${escapeHtml(
                                    itemName
                                )}
                            </strong>

                            <small>
                                ${escapeHtml(
                                    description ||
                                    "No description"
                                )}
                            </small>

                        </div>

                    </td>


                    <td>

                        <span class="menu-category-text">
                            ${escapeHtml(
                                categoryName ||
                                "No Category"
                            )}
                        </span>

                    </td>


                    <td>

                        <span class="item-price">
                            ₹${formatMoney(price)}
                        </span>

                    </td>


                    <td>

                        <span
                            class="menu-status ${statusClass}">

                            ${escapeHtml(status)}

                        </span>

                    </td>


                    <td>

                        <div class="menu-actions">

                            <button
                                type="button"
                                class="edit-menu-btn"
                                title="Edit"
                                onclick="window.editMenuById(${Number(id)})">

                                <i class="fa-solid fa-pen"></i>

                            </button>


                            <button
                                type="button"
                                class="delete-menu-btn"
                                title="Delete"
                                onclick="window.deleteMenu(${Number(id)})">

                                <i class="fa-solid fa-trash"></i>

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
   GET CATEGORY ID
========================================================= */

function getCategoryId(menu) {

    if (
        menu.categoryId !== null &&
        menu.categoryId !== undefined
    ) {

        return menu.categoryId;

    }


    if (
        menu.category &&
        menu.category.categoryId !== null &&
        menu.category.categoryId !== undefined
    ) {

        return menu.category.categoryId;

    }


    return "";

}


/* =========================================================
   GET CATEGORY NAME
========================================================= */

function getCategoryName(menu) {

    if (
        menu.category &&
        menu.category.categoryName
    ) {

        return menu.category.categoryName;

    }


    if (
        menu.categoryName
    ) {

        return menu.categoryName;

    }


    const categoryId =
        getCategoryId(menu);


    const category =
        categoryList.find(
            function (item) {

                return String(
                    item.categoryId
                ) === String(
                    categoryId
                );

            }
        );


    return category
        ? category.categoryName
        : "";

}


/* =========================================================
   IMAGE URL
========================================================= */

function getImageUrl(image) {

    if (
        !image ||
        typeof image !== "string"
    ) {

        return DEFAULT_IMAGE;

    }


    const cleanImage =
        image.trim();


    if (
        cleanImage === "" ||
        cleanImage === "null" ||
        cleanImage === "undefined"
    ) {

        return DEFAULT_IMAGE;

    }


    if (
        cleanImage.startsWith("http://") ||
        cleanImage.startsWith("https://")
    ) {

        return cleanImage;

    }


    return (
        IMAGE_PATH +
        encodeURIComponent(
            cleanImage
        )
    );

}


/* =========================================================
   PAGINATION
========================================================= */

function getTotalPages() {

    return Math.ceil(
        filteredMenuList.length /
        PAGE_SIZE
    );

}


function updatePagination(totalPages) {

    const currentPageButton =
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


    if (currentPageButton) {

        currentPageButton.innerText =
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
        filteredMenuList.length;


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

        showingText.innerText =
            total === 0
                ? "Showing 0 items"
                : `Showing ${start} to ${end} of ${total} items`;

    }

}


/* =========================================================
   OPEN ADD FORM
========================================================= */

function openAddForm() {

    console.log(
        "Opening Add New Menu Item form..."
    );


    editingMenuId =
        null;


    const form =
        document.getElementById(
            "menuForm"
        );


    if (form) {

        form.reset();

    }


    setValue(
        "itemId",
        ""
    );


    setValue(
        "status",
        "AVAILABLE"
    );


    setText(
        "formTitle",
        "Add New Menu Item"
    );


    const saveText =
        document.getElementById(
            "saveButtonText"
        );


    if (saveText) {

        saveText.innerText =
            "Save Item";

    }


    resetImagePreview();


    showMenuForm();


    setTimeout(
        function () {

            const itemName =
                document.getElementById(
                    "itemName"
                );


            if (itemName) {

                itemName.focus();

            }

        },
        100
    );

}


/* =========================================================
   CLOSE FORM
========================================================= */

function closeMenuForm() {

    console.log(
        "Closing menu form..."
    );


    const form =
        document.getElementById(
            "menuForm"
        );


    if (form) {

        form.reset();

    }


    editingMenuId =
        null;


    setValue(
        "itemId",
        ""
    );


    setValue(
        "status",
        "AVAILABLE"
    );


    setText(
        "formTitle",
        "Add New Menu Item"
    );


    resetImagePreview();


    hideMenuForm();

}


/* =========================================================
   EDIT MENU BY ID
========================================================= */

async function editMenuById(id) {

    if (!id) {

        showToast(
            "Invalid menu item ID.",
            "error"
        );

        return;

    }


    try {

        const response =
            await fetch(
                MENU_API +
                "/" +
                encodeURIComponent(id),
                {
                    method: "GET",
                    headers: getJsonHeaders()
                }
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
                errorText ||
                "Unable to load menu item."
            );

        }


        const menu =
            await response.json();


        editMenu(menu);

    }
    catch (error) {

        console.error(
            "EDIT ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to load menu item.",
            "error"
        );

    }

}


/* =========================================================
   EDIT MENU
========================================================= */

function editMenu(menu) {

    editingMenuId =
        menu.itemId;


    setValue(
        "itemId",
        menu.itemId
    );


    setValue(
        "itemName",
        menu.itemName || ""
    );


    setValue(
        "categoryId",
        getCategoryId(menu)
    );


    setValue(
        "description",
        menu.description || ""
    );


    setValue(
        "price",
        menu.price || ""
    );


    setValue(
        "status",
        menu.status || "AVAILABLE"
    );


    setText(
        "formTitle",
        "Edit Menu Item"
    );


    const saveText =
        document.getElementById(
            "saveButtonText"
        );


    if (saveText) {

        saveText.innerText =
            "Update Item";

    }


    const imageInput =
        document.getElementById(
            "image"
        );


    if (imageInput) {

        imageInput.value =
            "";

    }


    const imageUrl =
        getImageUrl(
            menu.image
        );


    const preview =
        document.getElementById(
            "imagePreview"
        );


    const uploadContent =
        document.getElementById(
            "uploadContent"
        );


    if (
        preview &&
        imageUrl !== DEFAULT_IMAGE
    ) {

        preview.src =
            imageUrl;

        preview.style.display =
            "block";


        if (uploadContent) {

            uploadContent.style.display =
                "none";

        }

    }
    else {

        resetImagePreview();

    }


    showMenuForm();


    setTimeout(
        function () {

            const itemName =
                document.getElementById(
                    "itemName"
                );


            if (itemName) {

                itemName.focus();

            }

        },
        100
    );

}


/* =========================================================
   SAVE MENU
========================================================= */

async function saveMenu() {

    const data =
        getFormData();


    if (
        !validateMenuData(data)
    ) {

        return;

    }


    const button =
        document.getElementById(
            "saveMenuBtn"
        );


    const buttonText =
        document.getElementById(
            "saveButtonText"
        );


    if (button) {

        button.disabled =
            true;

    }


    if (buttonText) {

        buttonText.innerText =
            "Saving...";

    }


    try {

        const formData =
            buildMultipartData(
                data
            );


        const response =
            await fetch(
                MENU_API,
                {
                    method: "POST",
                    headers: {
                        "Authorization":
                            "Bearer " +
                            getToken()
                    },
                    body: formData
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


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to save menu item."
            );

        }


        showToast(
            responseText ||
            "Menu item added successfully.",
            "success"
        );


        closeMenuForm();

        await loadMenu();

    }
    catch (error) {

        console.error(
            "SAVE MENU ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to save menu item.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

        }


        if (buttonText) {

            buttonText.innerText =
                "Save Item";

        }

    }

}


/* =========================================================
   UPDATE MENU
========================================================= */

async function updateMenu() {

    if (
        editingMenuId === null
    ) {

        showToast(
            "No menu item selected.",
            "error"
        );

        return;

    }


    const data =
        getFormData();


    if (
        !validateMenuData(data)
    ) {

        return;

    }


    const button =
        document.getElementById(
            "saveMenuBtn"
        );


    const buttonText =
        document.getElementById(
            "saveButtonText"
        );


    if (button) {

        button.disabled =
            true;

    }


    if (buttonText) {

        buttonText.innerText =
            "Updating...";

    }


    try {

        const formData =
            buildMultipartData(
                data
            );


        const response =
            await fetch(
                MENU_API +
                "/" +
                encodeURIComponent(
                    editingMenuId
                ),
                {
                    method: "PUT",
                    headers: {
                        "Authorization":
                            "Bearer " +
                            getToken()
                    },
                    body: formData
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


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to update menu item."
            );

        }


        showToast(
            responseText ||
            "Menu item updated successfully.",
            "success"
        );


        closeMenuForm();

        await loadMenu();

    }
    catch (error) {

        console.error(
            "UPDATE MENU ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to update menu item.",
            "error"
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

        }


        if (buttonText) {

            buttonText.innerText =
                "Update Item";

        }

    }

}


/* =========================================================
   GET FORM DATA
========================================================= */

function getFormData() {

    const imageInput =
        document.getElementById(
            "image"
        );


    const image =
        imageInput &&
        imageInput.files &&
        imageInput.files.length > 0
            ? imageInput.files[0]
            : null;


    return {

        itemName:
            getValue("itemName"),

        categoryId:
            getValue("categoryId"),

        description:
            getValue("description"),

        price:
            getValue("price"),

        status:
            getValue("status") ||
            "AVAILABLE",

        image:
            image

    };

}


/* =========================================================
   VALIDATE
========================================================= */

function validateMenuData(data) {

    if (!data.itemName) {

        showToast(
            "Please enter item name.",
            "error"
        );

        return false;

    }


    if (!data.categoryId) {

        showToast(
            "Please select category.",
            "error"
        );

        return false;

    }


    if (
        data.price === "" ||
        Number(data.price) < 0
    ) {

        showToast(
            "Please enter a valid price.",
            "error"
        );

        return false;

    }


    if (data.image) {

        const maxSize =
            2 * 1024 * 1024;


        if (
            data.image.size >
            maxSize
        ) {

            showToast(
                "Image size must be less than 2MB.",
                "error"
            );

            return false;

        }


        const validTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg"
        ];


        if (
            !validTypes.includes(
                data.image.type
            )
        ) {

            showToast(
                "Only PNG and JPG images are allowed.",
                "error"
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   BUILD MULTIPART
========================================================= */

function buildMultipartData(data) {

    const formData =
        new FormData();


    formData.append(
        "itemName",
        data.itemName
    );


    formData.append(
        "categoryId",
        data.categoryId
    );


    formData.append(
        "description",
        data.description
    );


    formData.append(
        "price",
        data.price
    );


    formData.append(
        "status",
        data.status
    );


    if (data.image) {

        formData.append(
            "image",
            data.image
        );

    }


    return formData;

}


/* =========================================================
   DELETE MENU
========================================================= */

function deleteMenu(id) {

    if (!id) {

        showToast(
            "Invalid menu item ID.",
            "error"
        );

        return;

    }


    deleteMenuId =
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
   CLOSE DELETE
========================================================= */

function closeDeleteModal() {

    deleteMenuId =
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

    if (!deleteMenuId) {

        showToast(
            "No menu item selected.",
            "error"
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

        button.innerText =
            "Deleting...";

    }


    try {

        const response =
            await fetch(
                MENU_API +
                "/" +
                encodeURIComponent(
                    deleteMenuId
                ),
                {
                    method: "DELETE",
                    headers: {
                        "Authorization":
                            "Bearer " +
                            getToken()
                    }
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


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to delete menu item."
            );

        }


        closeDeleteModal();


        showToast(
            responseText ||
            "Menu item deleted successfully.",
            "success"
        );


        await loadMenu();

    }
    catch (error) {

        console.error(
            "DELETE MENU ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to delete menu item.",
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
   IMAGE PREVIEW
========================================================= */

function handleImagePreview(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {

        return;

    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            "Please select a valid image.",
            "error"
        );


        event.target.value =
            "";

        return;

    }


    if (
        file.size >
        2 * 1024 * 1024
    ) {

        showToast(
            "Image size must be less than 2MB.",
            "error"
        );


        event.target.value =
            "";

        return;

    }


    const preview =
        document.getElementById(
            "imagePreview"
        );


    const uploadContent =
        document.getElementById(
            "uploadContent"
        );


    if (preview) {

        preview.src =
            URL.createObjectURL(
                file
            );

        preview.style.display =
            "block";

    }


    if (uploadContent) {

        uploadContent.style.display =
            "none";

    }

}


/* =========================================================
   RESET IMAGE
========================================================= */

function resetImagePreview() {

    const imageInput =
        document.getElementById(
            "image"
        );


    const preview =
        document.getElementById(
            "imagePreview"
        );


    const uploadContent =
        document.getElementById(
            "uploadContent"
        );


    if (imageInput) {

        imageInput.value =
            "";

    }


    if (preview) {

        preview.src =
            "";

        preview.style.display =
            "none";

    }


    if (uploadContent) {

        uploadContent.style.display =
            "flex";

    }

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
        new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        ).format(now);


    dayElement.innerText =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                weekday: "long"
            }
        ).format(now);

}


/* =========================================================
   ADMIN INFO
========================================================= */

function loadAdminInfo() {

    const nameElement =
        document.getElementById(
            "adminName"
        );


    const username =
        localStorage.getItem(
            "username"
        );


    if (
        nameElement &&
        username
    ) {

        nameElement.innerText =
            username;

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

        alert(message);

        return;

    }


    text.innerText =
        message;


    toast.classList.remove(
        "success",
        "error",
        "show"
    );


    toast.classList.add(
        type
    );


    setTimeout(
        function () {

            toast.classList.add(
                "show"
            );

        },
        20
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3200
    );

}


/* =========================================================
   UNAUTHORIZED
========================================================= */

function handleUnauthorized() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "jwtToken"
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


    alert(
        "Your session has expired. Please login again."
    );


    window.location.href =
        getContextPath() +
        "/login.jsp";

}


/* =========================================================
   CONTEXT PATH
========================================================= */

function getContextPath() {

    const meta =
        document.querySelector(
            'meta[name="app-context"]'
        );


    if (meta) {

        return (
            meta.getAttribute("content") ||
            ""
        );

    }


    return "";

}


/* =========================================================
   HELPERS
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";

    }


    return String(
        element.value || ""
    ).trim();

}


function setValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value ?? "";

    }

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerText =
            value ?? "";

    }

}


/* =========================================================
   MONEY
========================================================= */

function formatMoney(value) {

    const number =
        Number(value) || 0;


    return number.toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(
        value ?? ""
    )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return escapeHtml(value);

}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.editMenuById =
    editMenuById;

window.deleteMenu =
    deleteMenu;

window.closeDeleteModal =
    closeDeleteModal;

window.confirmDelete =
    confirmDelete;

window.openAddForm =
    openAddForm;

window.closeMenuForm =
    closeMenuForm;


/* =========================================================
   FINAL LOG
========================================================= */

console.log(
    "Sankalp RMS Menu JavaScript Ready."
);