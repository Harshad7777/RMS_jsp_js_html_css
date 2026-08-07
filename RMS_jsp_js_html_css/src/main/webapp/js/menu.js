// ============================================================
// MENU API
// ============================================================

const MENU_API = "http://localhost:8080/api/menu";

const CATEGORY_API = "http://localhost:8080/api/category";

const IMAGE_PATH = "http://localhost:8080/uploads/";

const DEFAULT_IMAGE = "images/menu/default-food.jpg";


// ============================================================
// TOKEN
// ============================================================

// IMPORTANT:
// If auth.js already creates a global token,
// DO NOT write const token again here.
//
// We only read it.

const authToken = localStorage.getItem("token");


if (!authToken) {

    alert("Please Login First");

    window.location.href = "login.jsp";

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Menu page loaded");

    loadCategories();

    loadMenu();


    // ========================================================
    // IMAGE PREVIEW
    // ========================================================

    const imageInput =
        document.getElementById("menuImage");


    if (imageInput) {

        imageInput.addEventListener(
            "change",
            function () {

                if (this.files &&
                    this.files.length > 0) {

                    const file = this.files[0];

                    const imageURL =
                        URL.createObjectURL(file);

                    document.getElementById(
                        "previewImage"
                    ).src = imageURL;

                }

            }
        );

    }

});


// ============================================================
// LOAD CATEGORIES
// ============================================================

function loadCategories() {

    console.log("Loading categories...");


    fetch(CATEGORY_API, {

        method: "GET",

        headers: {

            "Authorization":
                "Bearer " + authToken

        }

    })

    .then(function (response) {

        console.log(
            "Category Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Category Load Failed"
            );

        }


        return response.json();

    })

    .then(function (data) {

        console.log(
            "Category Data:",
            data
        );


        const categorySelect =
            document.getElementById(
                "categoryId"
            );


        const filterSelect =
            document.getElementById(
                "filterCategory"
            );


        let categoryHTML =
            `<option value="">
                Select Category
             </option>`;


        let filterHTML =
            `<option value="">
                All Categories
             </option>`;


        data.forEach(function (category) {

            categoryHTML += `
                <option value="${category.categoryId}">
                    ${category.categoryName}
                </option>
            `;


            filterHTML += `
                <option value="${category.categoryId}">
                    ${category.categoryName}
                </option>
            `;

        });


        categorySelect.innerHTML =
            categoryHTML;


        filterSelect.innerHTML =
            filterHTML;

    })

    .catch(function (error) {

        console.error(
            "Category Error:",
            error
        );


        alert(
            "Unable to load categories"
        );

    });

}


// ============================================================
// LOAD ALL MENU
// ============================================================

function loadMenu() {

    console.log("Loading menu...");


    fetch(MENU_API, {

        method: "GET",

        headers: {

            "Authorization":
                "Bearer " + authToken

        }

    })

    .then(function (response) {

        console.log(
            "Menu Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Menu Load Failed"
            );

        }


        return response.json();

    })

    .then(function (data) {

        console.log(
            "Menu Data:",
            data
        );


        displayMenu(data);

    })

    .catch(function (error) {

        console.error(
            "Menu Error:",
            error
        );


        alert(
            "Unable to load menu"
        );

    });

}


// ============================================================
// FILTER MENU BY CATEGORY
// ============================================================

function filterMenu() {

    const categoryId =
        document.getElementById(
            "filterCategory"
        ).value;


    // If All Categories selected

    if (categoryId === "") {

        loadMenu();

        return;

    }


    console.log(
        "Filtering category:",
        categoryId
    );


    fetch(
        MENU_API +
        "/category/" +
        categoryId,
        {

            method: "GET",

            headers: {

                "Authorization":
                    "Bearer " + authToken

            }

        }
    )

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "Filter Failed"
            );

        }


        return response.json();

    })

    .then(function (data) {

        console.log(
            "Filtered Menu:",
            data
        );


        displayMenu(data);

    })

    .catch(function (error) {

        console.error(
            "Filter Error:",
            error
        );


        alert(
            "Unable to filter menu"
        );

    });

}


// ============================================================
// SEARCH MENU
// ============================================================

function searchMenu() {

    const searchInput =
        document.getElementById(
            "searchMenu"
        );


    const text =
        searchInput.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            "#menuCardContainer .menu-card-column"
        );


    cards.forEach(function (card) {

        const titleElement =
            card.querySelector(
                ".card-title"
            );


        if (!titleElement) {

            return;

        }


        const title =
            titleElement.innerText
                .toLowerCase();


        if (title.includes(text)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ============================================================
// DISPLAY MENU
// ============================================================

function displayMenu(menuList) {

    console.log(
        "displayMenu() called"
    );


    console.log(
        "Menu List:",
        menuList
    );


    const container =
        document.getElementById(
            "menuCardContainer"
        );


    if (!container) {

        console.error(
            "menuCardContainer not found"
        );

        return;

    }


    let cards = "";


    if (!menuList ||
        menuList.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info">

                    No menu items found.

                </div>

            </div>

        `;

        return;

    }


    menuList.forEach(function (m) {


        // ====================================================
        // IMAGE
        // ====================================================

        let imageURL =
            DEFAULT_IMAGE;


        if (
            m.image &&
            typeof m.image === "string" &&
            m.image.trim() !== "" &&
            m.image !== "null" &&
            m.image !== "string"
        ) {

            imageURL =
                IMAGE_PATH +
                m.image;

        }


        // ====================================================
        // CATEGORY NAME
        // ====================================================

        let categoryName = "";


        if (
            m.category &&
            m.category.categoryName
        ) {

            categoryName =
                m.category.categoryName;

        }
        else if (
            m.categoryName
        ) {

            categoryName =
                m.categoryName;

        }


        // ====================================================
        // CARD
        // ====================================================

        cards += `

        <div
            class="col-md-4 mb-4 menu-card-column">

            <div
                class="card menu-card shadow h-100">


                <!-- IMAGE -->

                <img
                    src="${imageURL}"
                    class="card-img-top menu-image"
                    alt="${escapeHTML(
                        m.itemName || ""
                    )}"
                    style="
                        height:220px;
                        object-fit:cover;
                        border-radius:
                        10px 10px 0 0;
                    "
                    onerror="
                        this.onerror=null;
                        this.src='${DEFAULT_IMAGE}';
                    ">


                <!-- CARD BODY -->

                <div class="card-body">


                    <!-- ITEM NAME -->

                    <h5 class="card-title">

                        ${escapeHTML(
                            m.itemName || ""
                        )}

                    </h5>


                    <!-- CATEGORY -->

                    <p>

                        <b>Category:</b>

                        ${escapeHTML(
                            categoryName
                        )}

                    </p>


                    <!-- DESCRIPTION -->

                    <p>

                        <b>Description:</b>

                        ${escapeHTML(
                            m.description || ""
                        )}

                    </p>


                    <!-- PRICE -->

                    <h4 class="text-success">

                        ₹ ${Number(
                            m.price || 0
                        ).toFixed(2)}

                    </h4>


                    <!-- STATUS -->

                    <span
                        class="badge ${
                            m.status === "AVAILABLE"
                            ? "bg-success"
                            : "bg-danger"
                        }">

                        ${escapeHTML(
                            m.status || ""
                        )}

                    </span>


                    <!-- BUTTONS -->

                    <div
                        class="d-flex
                               justify-content-between
                               mt-3">


                        <!-- EDIT -->

                        <button
                            type="button"
                            class="btn btn-warning"
                            onclick="editMenuById(
                                ${m.itemId}
                            )">

                            <i
                                class="fa fa-edit">
                            </i>

                            Edit

                        </button>


                        <!-- DELETE -->

                        <button
                            type="button"
                            class="btn btn-danger"
                            onclick="deleteMenu(
                                ${m.itemId}
                            )">

                            <i
                                class="fa fa-trash">
                            </i>

                            Delete

                        </button>


                    </div>

                </div>

            </div>

        </div>

        `;

    });


    container.innerHTML = cards;


    console.log(
        "Menu cards displayed"
    );

}


// ============================================================
// EDIT MENU BY ID
// ============================================================
//
// Instead of passing JSON directly through onclick,
// we find the menu object from the loaded data.
//
// This avoids problems with quotes in item names/descriptions.
//

let currentMenuList = [];


// We modify displayMenu to remember the list.

const originalDisplayMenu = displayMenu;


// ============================================================
// SAVE MENU
// ============================================================

function saveMenu() {

    const itemName =
        document.getElementById(
            "itemName"
        ).value.trim();


    const categoryId =
        document.getElementById(
            "categoryId"
        ).value;


    const description =
        document.getElementById(
            "description"
        ).value.trim();


    const price =
        document.getElementById(
            "price"
        ).value;


    const status =
        document.getElementById(
            "status"
        ).value;


    // ========================================================
    // VALIDATION
    // ========================================================

    if (itemName === "") {

        alert(
            "Please enter item name"
        );

        return;

    }


    if (categoryId === "") {

        alert(
            "Please select category"
        );

        return;

    }


    if (price === "" ||
        Number(price) <= 0) {

        alert(
            "Please enter valid price"
        );

        return;

    }


    const formData =
        new FormData();


    formData.append(
        "itemName",
        itemName
    );


    formData.append(
        "categoryId",
        categoryId
    );


    formData.append(
        "description",
        description
    );


    formData.append(
        "price",
        price
    );


    formData.append(
        "status",
        status
    );


    const image =
        document.getElementById(
            "menuImage"
        ).files[0];


    if (image) {

        formData.append(
            "image",
            image
        );

    }


    console.log(
        "Saving menu..."
    );


    fetch(MENU_API, {

        method: "POST",

        headers: {

            "Authorization":
                "Bearer " + authToken

        },

        body: formData

    })

    .then(async function (response) {

        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Save Menu Failed"
            );

        }


        return message;

    })

    .then(function (message) {

        alert(message);


        clearForm();


        loadMenu();

    })

    .catch(function (error) {

        console.error(
            "Save Error:",
            error
        );


        alert(
            "Unable to save menu.\n" +
            error.message
        );

    });

}


// ============================================================
// EDIT MENU
// ============================================================

function editMenu(m) {

    console.log(
        "Editing Menu:",
        m
    );


    // ========================================================
    // ID
    // ========================================================

    document.getElementById(
        "itemId"
    ).value =
        m.itemId || "";


    // ========================================================
    // ITEM NAME
    // ========================================================

    document.getElementById(
        "itemName"
    ).value =
        m.itemName || "";


    // ========================================================
    // CATEGORY
    // ========================================================

    let categoryId =
        m.categoryId;


    // If API returns category object

    if (
        !categoryId &&
        m.category
    ) {

        categoryId =
            m.category.categoryId;

    }


    document.getElementById(
        "categoryId"
    ).value =
        categoryId || "";


    // ========================================================
    // DESCRIPTION
    // ========================================================

    document.getElementById(
        "description"
    ).value =
        m.description || "";


    // ========================================================
    // PRICE
    // ========================================================

    document.getElementById(
        "price"
    ).value =
        m.price || "";


    // ========================================================
    // STATUS
    // ========================================================

    document.getElementById(
        "status"
    ).value =
        m.status || "AVAILABLE";


    // ========================================================
    // CLEAR FILE INPUT
    // ========================================================

    document.getElementById(
        "menuImage"
    ).value = "";


    // ========================================================
    // EXISTING IMAGE
    // ========================================================

    let imageURL =
        DEFAULT_IMAGE;


    if (
        m.image &&
        typeof m.image === "string" &&
        m.image.trim() !== "" &&
        m.image !== "null" &&
        m.image !== "string"
    ) {

        imageURL =
            IMAGE_PATH +
            m.image;

    }


    document.getElementById(
        "previewImage"
    ).src =
        imageURL;


    // ========================================================
    // SCROLL TO FORM
    // ========================================================

    const form =
        document.getElementById(
            "menuForm"
        );


    if (form) {

        form.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }
    else {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    // ========================================================
    // FOCUS ITEM NAME
    // ========================================================

    setTimeout(function () {

        document.getElementById(
            "itemName"
        ).focus();

    }, 500);

}


// ============================================================
// EDIT MENU BY ID
// ============================================================

function editMenuById(id) {

    console.log(
        "Edit clicked:",
        id
    );


    fetch(
        MENU_API + "/" + id,
        {

            method: "GET",

            headers: {

                "Authorization":
                    "Bearer " + authToken

            }

        }
    )

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "Unable to load menu item"
            );

        }


        return response.json();

    })

    .then(function (menu) {

        editMenu(menu);

    })

    .catch(function (error) {

        console.error(
            "Edit Error:",
            error
        );


        alert(
            "Unable to load menu item"
        );

    });

}


// ============================================================
// UPDATE MENU
// ============================================================

function updateMenu() {

    const id =
        document.getElementById(
            "itemId"
        ).value;


    if (id === "") {

        alert(
            "Please select a menu item to update"
        );

        return;

    }


    const itemName =
        document.getElementById(
            "itemName"
        ).value.trim();


    const categoryId =
        document.getElementById(
            "categoryId"
        ).value;


    const description =
        document.getElementById(
            "description"
        ).value.trim();


    const price =
        document.getElementById(
            "price"
        ).value;


    const status =
        document.getElementById(
            "status"
        ).value;


    // ========================================================
    // VALIDATION
    // ========================================================

    if (itemName === "") {

        alert(
            "Please enter item name"
        );

        return;

    }


    if (categoryId === "") {

        alert(
            "Please select category"
        );

        return;

    }


    if (price === "" ||
        Number(price) <= 0) {

        alert(
            "Please enter valid price"
        );

        return;

    }


    const formData =
        new FormData();


    formData.append(
        "itemName",
        itemName
    );


    formData.append(
        "categoryId",
        categoryId
    );


    formData.append(
        "description",
        description
    );


    formData.append(
        "price",
        price
    );


    formData.append(
        "status",
        status
    );


    // ========================================================
    // IMAGE
    // ========================================================

    const image =
        document.getElementById(
            "menuImage"
        ).files[0];


    // Only send image when user selects a new one.

    if (image) {

        formData.append(
            "image",
            image
        );

    }


    console.log(
        "Updating menu:",
        id
    );


    fetch(
        MENU_API + "/" + id,
        {

            method: "PUT",

            headers: {

                "Authorization":
                    "Bearer " + authToken

            },

            body: formData

        }
    )

    .then(async function (response) {

        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Update Menu Failed"
            );

        }


        return message;

    })

    .then(function (message) {

        alert(message);


        clearForm();


        loadMenu();

    })

    .catch(function (error) {

        console.error(
            "Update Error:",
            error
        );


        alert(
            "Unable to update menu.\n" +
            error.message
        );

    });

}


// ============================================================
// DELETE MENU
// ============================================================

function deleteMenu(id) {

    if (
        !confirm(
            "Are you sure you want to delete this menu item?"
        )
    ) {

        return;

    }


    fetch(
        MENU_API + "/" + id,
        {

            method: "DELETE",

            headers: {

                "Authorization":
                    "Bearer " + authToken

            }

        }
    )

    .then(async function (response) {

        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Delete Menu Failed"
            );

        }


        return message;

    })

    .then(function (message) {

        alert(message);


        loadMenu();

    })

    .catch(function (error) {

        console.error(
            "Delete Error:",
            error
        );


        alert(
            "Unable to delete menu.\n" +
            error.message
        );

    });

}


// ============================================================
// CLEAR FORM
// ============================================================

function clearForm() {

    document.getElementById(
        "itemId"
    ).value = "";


    document.getElementById(
        "itemName"
    ).value = "";


    document.getElementById(
        "categoryId"
    ).value = "";


    document.getElementById(
        "description"
    ).value = "";


    document.getElementById(
        "price"
    ).value = "";


    document.getElementById(
        "status"
    ).value =
        "AVAILABLE";


    document.getElementById(
        "menuImage"
    ).value = "";


    document.getElementById(
        "previewImage"
    ).src =
        DEFAULT_IMAGE;


    console.log(
        "Form cleared"
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}