// =====================================================
// CATEGORY API
// =====================================================

const CATEGORY_API = "http://localhost:8080/api/category";

const categoryToken = localStorage.getItem("token");

// =====================================================
// LOGIN CHECK
// =====================================================

if (!categoryToken) {

    alert("Please Login First");

    window.location.href = "login.jsp";

}

// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    loadCategories();

    document
        .getElementById("searchCategory")
        .addEventListener("keyup", searchCategory);

});

// =====================================================
// LOAD ALL CATEGORIES
// =====================================================

function loadCategories() {

    fetch(CATEGORY_API, {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + categoryToken,

            "Content-Type": "application/json"

        }

    })

    .then(handleResponse)

    .then(showCategories)

    .catch(handleError);

}

// =====================================================
// SHOW CATEGORIES
// =====================================================

function showCategories(categories) {

    const table = document.getElementById("categoryTable");

    table.innerHTML = "";

    if (!categories || categories.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No Categories Found
                </td>
            </tr>
        `;

        return;

    }

    let rows = "";

    categories.forEach(category => {

        const badge =
            category.status === "ACTIVE"
            ? "bg-success"
            : "bg-secondary";

        rows += `

            <tr>

                <td>${category.categoryId}</td>

                <td>${escapeHtml(category.categoryName)}</td>

                <td>${escapeHtml(category.description || "")}</td>

                <td>

                    <span class="badge ${badge}">

                        ${escapeHtml(category.status)}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="editCategory(
                            ${category.categoryId},
                            '${escapeJs(category.categoryName)}',
                            '${escapeJs(category.description || "")}',
                            '${escapeJs(category.status)}'
                        )">

                        <i class="fa fa-edit"></i>

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteCategory(${category.categoryId})">

                        <i class="fa fa-trash"></i>

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

    table.innerHTML = rows;

}

// =====================================================
// SEARCH CATEGORY
// =====================================================

function searchCategory() {

    const keyword = this.value.trim();

    if (keyword === "") {

        loadCategories();

        return;

    }

    fetch(

        CATEGORY_API +
        "/search/" +
        encodeURIComponent(keyword),

        {

            headers: {

                "Authorization":
                    "Bearer " + categoryToken

            }

        }

    )

    .then(handleResponse)

    .then(showCategories)

    .catch(handleError);

}

// =====================================================
// HANDLE FETCH RESPONSE
// =====================================================

function handleResponse(response) {

    if (!response.ok) {

        return response.text()

        .then(message => {

            throw new Error(message);

        });

    }

    return response.json();

}

// =====================================================
// HANDLE ERROR
// =====================================================

function handleError(error) {

    console.error(error);

    alert(error.message || "Something went wrong.");

}

// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(value) {

    if (value == null) {

        return "";

    }

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}

// =====================================================
// ESCAPE JS STRING
// =====================================================

function escapeJs(value) {

    if (value == null) {

        return "";

    }

    return String(value)

        .replace(/\\/g, "\\\\")

        .replace(/'/g, "\\'")

        .replace(/\r/g, "\\r")

        .replace(/\n/g, "\\n");

} 		// =====================================================
		// SAVE CATEGORY
		// =====================================================

		function saveCategory() {

		    const categoryName =
		        document.getElementById("categoryName").value.trim();

		    const description =
		        document.getElementById("description").value.trim();

		    const status =
		        document.getElementById("status").value;

		    if (categoryName === "") {

		        alert("Please Enter Category Name");

		        document.getElementById("categoryName").focus();

		        return;
		    }

		    const category = {

		        categoryName: categoryName,

		        description: description,

		        status: status

		    };

		    fetch(CATEGORY_API, {

		        method: "POST",

		        headers: {

		            "Content-Type": "application/json",

		            "Authorization": "Bearer " + categoryToken

		        },

		        body: JSON.stringify(category)

		    })

		    .then(response => {

		        if (!response.ok) {

		            return response.text()

		            .then(message => {

		                throw new Error(message);

		            });

		        }

		        return response.text();

		    })

		    .then(message => {

		        alert(message);

		        clearForm();

		        loadCategories();

		    })

		    .catch(error => {

		        alert(error.message);

		    });

		}

		// =====================================================
		// EDIT CATEGORY
		// =====================================================

		function editCategory(
		    id,
		    name,
		    description,
		    status
		) {

		    document.getElementById("categoryId").value = id;

		    document.getElementById("categoryName").value = name;

		    document.getElementById("description").value = description;

		    document.getElementById("status").value = status;

		    document
		        .getElementById("saveBtn")
		        .classList.add("d-none");

		    document
		        .getElementById("updateBtn")
		        .classList.remove("d-none");

		    window.scrollTo({

		        top: 0,

		        behavior: "smooth"

		    });

		}

		// =====================================================
		// UPDATE CATEGORY
		// =====================================================

		function updateCategory() {

		    const id =
		        document.getElementById("categoryId").value;

		    if (id === "") {

		        alert("Please select a category.");

		        return;

		    }

		    const categoryName =
		        document.getElementById("categoryName").value.trim();

		    const description =
		        document.getElementById("description").value.trim();

		    const status =
		        document.getElementById("status").value;

		    if (categoryName === "") {

		        alert("Please Enter Category Name");

		        document.getElementById("categoryName").focus();

		        return;

		    }

		    const category = {

		        categoryId: Number(id),

		        categoryName: categoryName,

		        description: description,

		        status: status

		    };

		    fetch(CATEGORY_API + "/" + id, {

		        method: "PUT",

		        headers: {

		            "Content-Type": "application/json",

		            "Authorization": "Bearer " + categoryToken

		        },

		        body: JSON.stringify(category)

		    })

		    .then(response => {

		        if (!response.ok) {

		            return response.text()

		            .then(message => {

		                throw new Error(message);

		            });

		        }

		        return response.text();

		    })

		    .then(message => {

		        alert(message);

		        clearForm();

		        loadCategories();

		    })

		    .catch(error => {

		        alert(error.message);

		    });

		}
		// =====================================================
		// DELETE CATEGORY
		// =====================================================

		function deleteCategory(id) {

		    if (!confirm("Are you sure you want to delete this category?")) {
		        return;
		    }

		    fetch(CATEGORY_API + "/" + id, {

		        method: "DELETE",

		        headers: {

		            "Authorization": "Bearer " + categoryToken

		        }

		    })

		    .then(response => {

		        if (!response.ok) {

		            return response.text()

		            .then(message => {

		                throw new Error(message);

		            });

		        }

		        return response.text();

		    })

		    .then(message => {

		        alert(message);

		        clearForm();

		        loadCategories();

		    })

		    .catch(error => {

		        alert(error.message);

		    });

		}

		// =====================================================
		// CLEAR FORM
		// =====================================================

		function clearForm() {

		    document.getElementById("categoryId").value = "";

		    document.getElementById("categoryName").value = "";

		    document.getElementById("description").value = "";

		    document.getElementById("status").value = "ACTIVE";

		    document
		        .getElementById("saveBtn")
		        .classList.remove("d-none");

		    document
		        .getElementById("updateBtn")
		        .classList.add("d-none");

		    document.getElementById("categoryName").focus();

		}

		// =====================================================
		// OPTIONAL: PRESS ENTER TO SAVE
		// =====================================================

		document.addEventListener("keypress", function (event) {

		    if (event.key === "Enter") {

		        const updateVisible =
		            !document
		                .getElementById("updateBtn")
		                .classList.contains("d-none");

		        if (updateVisible) {

		            updateCategory();

		        } else {

		            saveCategory();

		        }

		    }

		});

		// =====================================================
		// OPTIONAL: ESC KEY CLEARS FORM
		// =====================================================

		document.addEventListener("keydown", function (event) {

		    if (event.key === "Escape") {

		        clearForm();

		    }

		});