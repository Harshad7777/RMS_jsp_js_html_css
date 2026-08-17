"use strict";

/* =========================================================
   SANKALP RMS
   CATEGORY MANAGEMENT
========================================================= */


/* =========================================================
   API
========================================================= */

const API_BASE_URL =
    "http://localhost:8080";

const CATEGORY_API =
    API_BASE_URL + "/api/category";


/* =========================================================
   VARIABLES
========================================================= */

let categories = [];

let filteredCategories = [];

let editingCategoryId = null;

let deleteCategoryId = null;

let currentPage = 1;

const pageSize = 7;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "======================================"
        );

        console.log(
            "Sankalp RMS Category Management"
        );

        console.log(
            "Category API:",
            CATEGORY_API
        );

        console.log(
            "======================================"
        );


        if (!getToken()) {

            handleUnauthorized();

            return;
        }


        setupEvents();

        hideCategoryForm();

        loadCategories();

    },
    {
        once: true
    }
);


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

    return {

        "Content-Type":
            "application/json",

        "Accept":
            "application/json",

        "Authorization":
            "Bearer " + token
    };
}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    /* =====================================================
       ADD BUTTON
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
                    "ADD CATEGORY CLICKED"
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
       FORM SUBMIT
    ===================================================== */

    const categoryForm =
        document.getElementById(
            "categoryForm"
        );

    if (categoryForm) {

        categoryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (editingCategoryId !== null) {

                    updateCategory();

                } else {

                    saveCategory();
                }
            }
        );
    }


    /* =====================================================
       UPDATE
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

                updateCategory();
            }
        );
    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById(
            "searchCategory"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentPage = 1;

                filterCategories();
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

                filterCategories();
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

                if (currentPage !== 1) {

                    currentPage = 1;

                    renderCategories();
                }
            }
        );
    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    const prevPage =
        document.getElementById(
            "prevPage"
        );

    if (prevPage) {

        prevPage.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    renderCategories();
                }
            }
        );
    }


    /* =====================================================
       NEXT
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

                    renderCategories();
                }
            }
        );
    }


    /* =====================================================
       LAST
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

                if (totalPages > 0) {

                    currentPage =
                        totalPages;

                    renderCategories();
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
            closeDeleteModal
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
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeForm();

                closeDeleteModal();
            }
        }
    );
}


/* =========================================================
   SHOW FORM
========================================================= */

function showCategoryForm() {

    const panel =
        document.getElementById(
            "categoryFormPanel"
        );

    const layout =
        document.getElementById(
            "categoryLayout"
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


    setTimeout(
        function () {

            window.scrollTo({

                top:
                    Math.max(
                        0,
                        (panel?.getBoundingClientRect()
                            ?.top || 0)
                        +
                        window.scrollY
                        -
                        100
                    ),

                behavior:
                    "smooth"
            });

        },
        50
    );
}


/* =========================================================
   HIDE FORM
========================================================= */

function hideCategoryForm() {

    const panel =
        document.getElementById(
            "categoryFormPanel"
        );

    const layout =
        document.getElementById(
            "categoryLayout"
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

    const table =
        document.getElementById(
            "categoryTable"
        );

    if (!table) {

        return;
    }


    table.innerHTML = `

        <tr>

            <td
                colspan="5"
                class="loading-row">

                <i
                    class="fa-solid fa-spinner fa-spin">
                </i>

                Loading categories...

            </td>

        </tr>

    `;


    try {

        const response =
            await fetch(
                CATEGORY_API,
                {
                    method:
                        "GET",

                    headers:
                        getHeaders()
                }
            );


        console.log(
            "CATEGORY STATUS:",
            response.status
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


        let data =
            null;


        if (responseText) {

            try {

                data =
                    JSON.parse(
                        responseText
                    );

            } catch {

                data =
                    responseText;
            }
        }


        if (!response.ok) {

            throw new Error(
                getErrorMessage(
                    data,
                    "Unable to load categories."
                )
            );
        }


        if (
            Array.isArray(data)
        ) {

            categories =
                data;

        }
        else if (
            data &&
            Array.isArray(
                data.data
            )
        ) {

            categories =
                data.data;

        }
        else {

            categories =
                [];
        }


        filteredCategories =
            [...categories];


        currentPage =
            1;


        renderCategories();

    }
    catch (error) {

        console.error(
            "LOAD CATEGORY ERROR:",
            error
        );


        categories =
            [];

        filteredCategories =
            [];


        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-row">

                    <i
                        class="fa-solid fa-triangle-exclamation">
                    </i>

                    ${escapeHtml(
                        error.message ||
                        "Unable to load categories."
                    )}

                </td>

            </tr>

        `;


        updatePagination(
            0
        );
    }
}


/* =========================================================
   FILTER
========================================================= */

function filterCategories() {

    const searchElement =
        document.getElementById(
            "searchCategory"
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


    filteredCategories =
        categories.filter(
            function (category) {

                const name =
                    String(
                        category?.categoryName ||
                        ""
                    )
                    .toLowerCase();


                const description =
                    String(
                        category?.description ||
                        ""
                    )
                    .toLowerCase();


                const status =
                    String(
                        category?.status ||
                        ""
                    )
                    .toUpperCase();


                const matchesSearch =
                    name.includes(
                        searchValue
                    ) ||
                    description.includes(
                        searchValue
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


    currentPage =
        1;


    renderCategories();
}


/* =========================================================
   RENDER
========================================================= */

function renderCategories() {

    const table =
        document.getElementById(
            "categoryTable"
        );


    if (!table) {

        return;
    }


    const totalPages =
        getTotalPages();


    if (
        totalPages > 0 &&
        currentPage >
        totalPages
    ) {

        currentPage =
            totalPages;
    }


    if (
        totalPages === 0
    ) {

        currentPage =
            1;
    }


    const startIndex =
        (currentPage - 1) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const pageCategories =
        filteredCategories.slice(
            startIndex,
            endIndex
        );


    if (
        pageCategories.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-row">

                    <i
                        class="fa-solid fa-folder-open">
                    </i>

                    No categories found.

                </td>

            </tr>

        `;

        updatePagination(
            totalPages
        );

        return;
    }


    let rows = "";


    pageCategories.forEach(
        function (category) {

            const id =
                Number(
                    category?.categoryId
                );


            const rawName =
                category?.categoryName ||
                "";


            const name =
                escapeHtml(
                    rawName
                );


            const description =
                escapeHtml(
                    category?.description ||
                    "—"
                );


            const status =
                String(
                    category?.status ||
                    "ACTIVE"
                )
                .trim()
                .toUpperCase();


            const icon =
                getCategoryIcon(
                    rawName
                );


            const iconClass =
                getIconClass(
                    rawName
                );


            const statusClass =
                status ===
                "ACTIVE"
                    ? "status-active"
                    : "status-inactive";


            rows += `

                <tr>

                    <!-- ID -->

                    <td>

                        ${id}

                    </td>


                    <!-- NAME -->

                    <td>

                        <div
                            class="category-name-cell">

                            <div
                                class="category-icon ${iconClass}">

                                <i
                                    class="${icon}">
                                </i>

                            </div>

                            <span>

                                ${name}

                            </span>

                        </div>

                    </td>


                    <!-- DESCRIPTION -->

                    <td>

                        <div
                            class="description-cell">

                            ${description}

                        </div>

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="status-badge ${statusClass}">

                            ${escapeHtml(
                                status
                            )}

                        </span>

                    </td>


                    <!-- ACTIONS -->

                    <td>

                        <div
                            class="action-buttons">


                            <button
                                type="button"
                                class="action-btn edit-btn"
                                title="Edit"
                                onclick="window.editCategory(${id})">

                                <i
                                    class="fa-solid fa-pen">
                                </i>

                            </button>


                            <button
                                type="button"
                                class="action-btn delete-btn"
                                title="Delete"
                                onclick="window.deleteCategory(${id})">

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
   CATEGORY ICON
========================================================= */

function getCategoryIcon(name) {

    const value =
        String(
            name ||
            ""
        )
        .toLowerCase();


    if (
        value.includes("starter")
    ) {

        return "fa-solid fa-cloche";
    }


    if (
        value.includes("main") ||
        value.includes("course")
    ) {

        return "fa-solid fa-utensils";
    }


    if (
        value.includes("biryani") ||
        value.includes("rice")
    ) {

        return "fa-solid fa-bowl-food";
    }


    if (
        value.includes("dosa")
    ) {

        return "fa-solid fa-pizza-slice";
    }


    if (
        value.includes("dessert") ||
        value.includes("sweet")
    ) {

        return "fa-solid fa-cake-candles";
    }


    if (
        value.includes("drink") ||
        value.includes("beverage")
    ) {

        return "fa-solid fa-glass-water";
    }


    if (
        value.includes("bread") ||
        value.includes("roll")
    ) {

        return "fa-solid fa-bread-slice";
    }


    return "fa-solid fa-utensils";
}


/* =========================================================
   ICON COLOR
========================================================= */

function getIconClass(name) {

    const value =
        String(
            name ||
            ""
        )
        .toLowerCase();


    if (
        value.includes("main")
    ) {

        return "green";
    }


    if (
        value.includes("biryani")
    ) {

        return "yellow";
    }


    if (
        value.includes("dosa")
    ) {

        return "purple";
    }


    if (
        value.includes("dessert") ||
        value.includes("sweet")
    ) {

        return "red";
    }


    if (
        value.includes("beverage") ||
        value.includes("drink")
    ) {

        return "blue";
    }


    return "";
}


/* =========================================================
   TOTAL PAGES
========================================================= */

function getTotalPages() {

    return Math.ceil(
        filteredCategories.length /
        pageSize
    );
}


/* =========================================================
   PAGINATION
========================================================= */

function updatePagination(
    totalPages
) {

    const current =
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


    if (current) {

        current.innerText =
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
        filteredCategories.length;


    const start =
        total === 0
            ? 0
            :
            (
                (currentPage - 1) *
                pageSize
            ) + 1;


    const end =
        Math.min(
            currentPage *
            pageSize,
            total
        );


    const showingText =
        document.getElementById(
            "showingText"
        );


    if (showingText) {

        showingText.innerText =
            total === 0
                ? "Showing 0 categories"
                :
                `Showing ${start} to ${end} of ${total} categories`;
    }
}


/* =========================================================
   OPEN ADD FORM
========================================================= */

function openAddForm() {

    console.log(
        "Opening Add Category"
    );


    editingCategoryId =
        null;


    const form =
        document.getElementById(
            "categoryForm"
        );


    if (form) {

        form.reset();
    }


    setValue(
        "categoryId",
        ""
    );


    setValue(
        "categoryName",
        ""
    );


    setValue(
        "description",
        ""
    );


    setValue(
        "status",
        "ACTIVE"
    );


    setText(
        "formTitle",
        "Add New Category"
    );


    const saveBtn =
        document.getElementById(
            "saveBtn"
        );

    const updateBtn =
        document.getElementById(
            "updateBtn"
        );


    if (saveBtn) {

        saveBtn.style.display =
            "inline-flex";

        saveBtn.disabled =
            false;

        saveBtn.innerHTML =
            `
            <i class="fa-solid fa-check"></i>
            Save Category
            `;
    }


    if (updateBtn) {

        updateBtn.style.display =
            "none";

        updateBtn.disabled =
            false;

        updateBtn.innerHTML =
            `
            <i class="fa-solid fa-check"></i>
            Update Category
            `;
    }


    showCategoryForm();


    setTimeout(
        function () {

            document
                .getElementById(
                    "categoryName"
                )
                ?.focus();

        },
        150
    );
}


/* =========================================================
   CLOSE FORM
========================================================= */

function closeForm() {

    console.log(
        "Closing Category Form"
    );


    editingCategoryId =
        null;


    const form =
        document.getElementById(
            "categoryForm"
        );


    if (form) {

        form.reset();
    }


    setValue(
        "categoryId",
        ""
    );


    setValue(
        "status",
        "ACTIVE"
    );


    setText(
        "formTitle",
        "Add New Category"
    );


    const saveBtn =
        document.getElementById(
            "saveBtn"
        );

    const updateBtn =
        document.getElementById(
            "updateBtn"
        );


    if (saveBtn) {

        saveBtn.style.display =
            "inline-flex";

        saveBtn.disabled =
            false;

        saveBtn.innerHTML =
            `
            <i class="fa-solid fa-check"></i>
            Save Category
            `;
    }


    if (updateBtn) {

        updateBtn.style.display =
            "none";

        updateBtn.disabled =
            false;

        updateBtn.innerHTML =
            `
            <i class="fa-solid fa-check"></i>
            Update Category
            `;
    }


    hideCategoryForm();
}


/* =========================================================
   EDIT CATEGORY
========================================================= */

async function editCategory(id) {

    console.log(
        "Edit Category:",
        id
    );


    if (!id) {

        showToast(
            "Invalid category ID.",
            true
        );

        return;
    }


    showCategoryForm();


    setText(
        "formTitle",
        "Loading Category..."
    );


    try {

        const response =
            await fetch(
                CATEGORY_API +
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
            response.status === 401 ||
            response.status === 403
        ) {

            handleUnauthorized();

            return;
        }


        const text =
            await response.text();


        let data =
            null;


        if (text) {

            try {

                data =
                    JSON.parse(
                        text
                    );

            } catch {

                data =
                    text;
            }
        }


        if (!response.ok) {

            throw new Error(
                getErrorMessage(
                    data,
                    "Unable to load category."
                )
            );
        }


        const category =
            data;


        editingCategoryId =
            Number(
                category.categoryId
            );


        setValue(
            "categoryId",
            category.categoryId
        );


        setValue(
            "categoryName",
            category.categoryName ||
            ""
        );


        setValue(
            "description",
            category.description ||
            ""
        );


        setValue(
            "status",
            category.status ||
            "ACTIVE"
        );


        setText(
            "formTitle",
            "Edit Category"
        );


        const saveBtn =
            document.getElementById(
                "saveBtn"
            );

        const updateBtn =
            document.getElementById(
                "updateBtn"
            );


        if (saveBtn) {

            saveBtn.style.display =
                "none";
        }


        if (updateBtn) {

            updateBtn.style.display =
                "inline-flex";

            updateBtn.disabled =
                false;

            updateBtn.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                Update Category
                `;
        }


        setTimeout(
            function () {

                document
                    .getElementById(
                        "categoryName"
                    )
                    ?.focus();

            },
            100
        );

    }
    catch (error) {

        console.error(
            "EDIT CATEGORY ERROR:",
            error
        );


        hideCategoryForm();


        showToast(
            error.message ||
            "Unable to load category.",
            true
        );
    }
}


/* =========================================================
   SAVE CATEGORY
========================================================= */

async function saveCategory() {

    const name =
        getValue(
            "categoryName"
        );


    const description =
        getValue(
            "description"
        );


    const status =
        getValue(
            "status"
        ) ||
        "ACTIVE";


    if (!name) {

        showToast(
            "Category name is required.",
            true
        );

        return;
    }


    if (
        name.length < 2
    ) {

        showToast(
            "Category name must contain at least 2 characters.",
            true
        );

        return;
    }


    const button =
        document.getElementById(
            "saveBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML =
            `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Saving...
            `;
    }


    const categoryData = {

        categoryName:
            name,

        description:
            description,

        status:
            status
    };


    try {

        const response =
            await fetch(
                CATEGORY_API,
                {
                    method:
                        "POST",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            categoryData
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


        let data =
            null;


        if (responseText) {

            try {

                data =
                    JSON.parse(
                        responseText
                    );

            } catch {

                data =
                    responseText;
            }
        }


        if (!response.ok) {

            throw new Error(
                getErrorMessage(
                    data,
                    "Unable to save category."
                )
            );
        }


        showToast(
            getSuccessMessage(
                data,
                "Category added successfully."
            )
        );


        closeForm();


        await loadCategories();

    }
    catch (error) {

        console.error(
            "SAVE CATEGORY ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to save category.",
            true
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                Save Category
                `;
        }
    }
}


/* =========================================================
   UPDATE CATEGORY
========================================================= */

async function updateCategory() {

    if (
        editingCategoryId ===
        null
    ) {

        showToast(
            "No category selected.",
            true
        );

        return;
    }


    const name =
        getValue(
            "categoryName"
        );


    const description =
        getValue(
            "description"
        );


    const status =
        getValue(
            "status"
        ) ||
        "ACTIVE";


    if (!name) {

        showToast(
            "Category name is required.",
            true
        );

        return;
    }


    const button =
        document.getElementById(
            "updateBtn"
        );


    if (button) {

        button.disabled =
            true;

        button.innerHTML =
            `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Updating...
            `;
    }


    const categoryData = {

        categoryId:
            editingCategoryId,

        categoryName:
            name,

        description:
            description,

        status:
            status
    };


    try {

        const response =
            await fetch(
                CATEGORY_API +
                "/" +
                encodeURIComponent(
                    editingCategoryId
                ),
                {
                    method:
                        "PUT",

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            categoryData
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


        let data =
            null;


        if (responseText) {

            try {

                data =
                    JSON.parse(
                        responseText
                    );

            } catch {

                data =
                    responseText;
            }
        }


        if (!response.ok) {

            throw new Error(
                getErrorMessage(
                    data,
                    "Unable to update category."
                )
            );
        }


        showToast(
            getSuccessMessage(
                data,
                "Category updated successfully."
            )
        );


        closeForm();


        await loadCategories();

    }
    catch (error) {

        console.error(
            "UPDATE CATEGORY ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to update category.",
            true
        );

    }
    finally {

        if (button) {

            button.disabled =
                false;

            button.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                Update Category
                `;
        }
    }
}


/* =========================================================
   DELETE
========================================================= */

function deleteCategory(id) {

    if (!id) {

        showToast(
            "Invalid category ID.",
            true
        );

        return;
    }


    deleteCategoryId =
        Number(id);


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}


/* =========================================================
   CLOSE DELETE
========================================================= */

function closeDeleteModal() {

    deleteCategoryId =
        null;


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}


/* =========================================================
   CONFIRM DELETE
========================================================= */

async function confirmDelete() {

    if (!deleteCategoryId) {

        showToast(
            "No category selected.",
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

        button.innerText =
            "Deleting...";
    }


    try {

        const response =
            await fetch(
                CATEGORY_API +
                "/" +
                encodeURIComponent(
                    deleteCategoryId
                ),
                {
                    method:
                        "DELETE",

                    headers:
                        getHeaders()
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


        let data =
            null;


        if (responseText) {

            try {

                data =
                    JSON.parse(
                        responseText
                    );

            } catch {

                data =
                    responseText;
            }
        }


        if (!response.ok) {

            throw new Error(
                getErrorMessage(
                    data,
                    "Unable to delete category."
                )
            );
        }


        closeDeleteModal();


        showToast(
            getSuccessMessage(
                data,
                "Category deleted successfully."
            )
        );


        await loadCategories();

    }
    catch (error) {

        console.error(
            "DELETE CATEGORY ERROR:",
            error
        );


        showToast(
            error.message ||
            "Unable to delete category.",
            true
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
   SUCCESS MESSAGE
========================================================= */

function getSuccessMessage(
    data,
    fallback
) {

    if (
        typeof data ===
        "string" &&
        data.trim()
    ) {

        return data;
    }


    if (
        data &&
        typeof data ===
        "object"
    ) {

        return (
            data.message ||
            data.successMessage ||
            fallback
        );
    }


    return fallback;
}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function getErrorMessage(
    data,
    fallback
) {

    if (
        typeof data ===
        "string" &&
        data.trim()
    ) {

        return data;
    }


    if (
        data &&
        typeof data ===
        "object"
    ) {

        return (
            data.message ||
            data.error ||
            data.details ||
            fallback
        );
    }


    return fallback;
}


/* =========================================================
   UNAUTHORIZED
========================================================= */

function handleUnauthorized() {

    console.warn(
        "Unauthorized / Session expired"
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


    const contextPath =
        getContextPath();


    alert(
        "Your session has expired. Please login again."
    );


    window.location.href =
        contextPath +
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
            meta.getAttribute(
                "content"
            ) || ""
        );
    }


    return "";
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

    const icon =
        document.getElementById(
            "toastIcon"
        );


    if (
        !toast ||
        !text
    ) {

        alert(
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


    if (icon) {

        icon.className =
            isError
                ? "fa-solid fa-circle-exclamation"
                : "fa-solid fa-circle-check";
    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.categoryToastTimer
    );


    window.categoryToastTimer =
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
   VALUE
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
            value ??
            "";
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
            value ??
            "";
    }
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

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
   GLOBAL FUNCTIONS
========================================================= */

window.openAddForm =
    openAddForm;

window.closeForm =
    closeForm;

window.editCategory =
    editCategory;

window.deleteCategory =
    deleteCategory;

window.closeDeleteModal =
    closeDeleteModal;

window.confirmDelete =
    confirmDelete;


console.log(
    "Sankalp RMS Category JS Ready."
);