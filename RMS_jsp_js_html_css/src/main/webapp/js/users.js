"use strict";

// =====================================================
// ADMIN AUTHENTICATION
// =====================================================

checkAdmin();

const API = "http://localhost:8080/api/users";


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Users page loaded");

    loadUsers();

});


// =====================================================
// LOAD ALL USERS
// GET /api/users
// =====================================================

async function loadUsers() {

    const table = document.getElementById("userTable");

    try {

        table.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-5">

                    <div class="spinner-border text-primary"
                         role="status">
                    </div>

                    <div class="mt-2 text-muted">
                        Loading users...
                    </div>

                </td>
            </tr>
        `;


        console.log("Loading users from:", API);


        const response = await fetch(API, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }

        });


        console.log("Users response status:", response.status);


        // =================================================
        // AUTH ERROR
        // =================================================

        if (response.status === 401 ||
            response.status === 403) {

            localStorage.removeItem("token");

            alert("Session expired. Please login again.");

            window.location.href = "login.jsp";

            return;
        }


        // =================================================
        // OTHER ERROR
        // =================================================

        if (!response.ok) {

            const errorText = await response.text();

            console.error("Server error:", errorText);

            throw new Error(
                "Unable to load users. HTTP " +
                response.status
            );

        }


        // =================================================
        // READ JSON
        // =================================================

        const data = await response.json();


        console.log("USERS DATA:", data);


        if (!Array.isArray(data)) {

            throw new Error(
                "Invalid response received from server"
            );

        }


        // =================================================
        // USER COUNT
        // =================================================

        const countElement =
            document.getElementById("userCount");

        if (countElement) {

            countElement.textContent =
                data.length + " Users";

        }


        // =================================================
        // NO USERS
        // =================================================

        if (data.length === 0) {

            table.innerHTML = `
                <tr>

                    <td colspan="8"
                        class="text-center text-muted py-5">

                        <i class="fa-solid fa-users-slash
                                  fa-2x mb-3">
                        </i>

                        <br>

                        No users found.

                    </td>

                </tr>
            `;

            return;
        }


        // =================================================
        // BUILD TABLE
        // =================================================

        let rows = "";


        data.forEach(function (user) {

            const role = user.role || "";

            const status = user.status || "ACTIVE";


            let roleClass = "bg-secondary";


            if (role === "ADMIN") {

                roleClass = "bg-danger";

            }
            else if (role === "STAFF") {

                roleClass = "bg-primary";

            }
            else if (role === "CHEF") {

                roleClass = "bg-warning text-dark";

            }


            const statusClass =
                status === "ACTIVE"
                    ? "bg-success"
                    : "bg-secondary";


            rows += `

                <tr>

                    <td class="text-center">

                        ${escapeHtml(user.userId)}

                    </td>


                    <td>

                        ${escapeHtml(user.fullName)}

                    </td>


                    <td>

                        ${escapeHtml(user.username)}

                    </td>


                    <td>

                        ${escapeHtml(user.mobile || "-")}

                    </td>


                    <td>

                        ${escapeHtml(user.email || "-")}

                    </td>


                    <td class="text-center">

                        <span class="badge ${roleClass}">

                            ${escapeHtml(role)}

                        </span>

                    </td>


                    <td class="text-center">

                        <span class="badge ${statusClass}">

                            ${escapeHtml(status)}

                        </span>

                    </td>


                    <td class="text-center">

                        <button
                            type="button"
                            class="btn btn-warning btn-sm me-1"
                            onclick="editUser(${Number(user.userId)})">

                            <i class="fa-solid fa-pen-to-square"></i>

                        </button>


                        <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            onclick="deleteUser(${Number(user.userId)})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });


        table.innerHTML = rows;


    }
    catch (error) {

        console.error("LOAD USERS ERROR:", error);


        table.innerHTML = `

            <tr>

                <td colspan="8"
                    class="text-center text-danger py-5">

                    <i class="fa-solid fa-triangle-exclamation
                              fa-2x mb-3">
                    </i>

                    <br>

                    Unable to load users.

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
// SAVE USER
// POST /api/users/register
// =====================================================

async function saveUser() {

    const user = {

        fullName:
            document.getElementById("fullName").value.trim(),

        username:
            document.getElementById("userName").value.trim(),

        password:
            document.getElementById("password").value,

        role:
            document.getElementById("userRole").value,

        mobile:
            document.getElementById("mobile").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        status:
            document.getElementById("userStatus").value

    };


    if (
        user.fullName === "" ||
        user.username === "" ||
        user.password === ""
    ) {

        alert(
            "Full Name, Username and Password are required."
        );

        return;

    }


    try {

        const response = await fetch(
            API + "/register",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body:
                    JSON.stringify(user)

            }
        );


        const result =
            await response.json();


        console.log(
            "SAVE USER RESPONSE:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to save user"
            );

        }


        alert(
            result.message ||
            "User Added Successfully"
        );


        clearForm();

        loadUsers();

    }
    catch (error) {

        console.error(
            "SAVE USER ERROR:",
            error
        );

        alert(error.message);

    }

}


// =====================================================
// EDIT USER
// GET /api/users/{id}
// =====================================================

async function editUser(id) {

    try {

        console.log(
            "Loading user:",
            id
        );


        const response = await fetch(
            API + "/" + id,
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
                "Unable to load user"
            );

        }


        const user =
            await response.json();


        console.log(
            "EDIT USER:",
            user
        );


        document.getElementById(
            "userId"
        ).value =
            user.userId || "";


        document.getElementById(
            "fullName"
        ).value =
            user.fullName || "";


        document.getElementById(
            "userName"
        ).value =
            user.username || "";


        document.getElementById(
            "password"
        ).value =
            "";


        document.getElementById(
            "userRole"
        ).value =
            user.role || "STAFF";


        document.getElementById(
            "mobile"
        ).value =
            user.mobile || "";


        document.getElementById(
            "email"
        ).value =
            user.email || "";


        document.getElementById(
            "userStatus"
        ).value =
            user.status || "ACTIVE";


        // Scroll to form

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
    catch (error) {

        console.error(
            "EDIT USER ERROR:",
            error
        );

        alert(error.message);

    }

}


// =====================================================
// UPDATE USER
// PUT /api/users/{id}
// =====================================================

async function updateUser() {

    const id =
        document.getElementById("userId").value;


    if (!id) {

        alert("Please select a user first.");

        return;

    }


    const user = {

        userId: Number(id),

        fullName:
            document.getElementById("fullName").value.trim(),

        username:
            document.getElementById("userName").value.trim(),

        password:
            document.getElementById("password").value,

        role:
            document.getElementById("userRole").value,

        mobile:
            document.getElementById("mobile").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        status:
            document.getElementById("userStatus").value

    };


    if (
        user.fullName === "" ||
        user.username === ""
    ) {

        alert(
            "Full Name and Username are required."
        );

        return;

    }


    try {

        const response = await fetch(
            API + "/" + id,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body:
                    JSON.stringify(user)

            }
        );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Unable to update user"
            );

        }


        alert(
            message ||
            "User Updated Successfully"
        );


        clearForm();

        loadUsers();

    }
    catch (error) {

        console.error(
            "UPDATE USER ERROR:",
            error
        );

        alert(error.message);

    }

}


// =====================================================
// DELETE USER
// DELETE /api/users/{id}
// =====================================================

async function deleteUser(id) {

    if (!confirm(
        "Are you sure you want to delete this user?"
    )) {

        return;

    }


    try {

        const response = await fetch(
            API + "/" + id,
            {

                method: "DELETE",

                headers: {

                    "Authorization":
                        "Bearer " + token

                }

            }
        );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Unable to delete user"
            );

        }


        alert(
            message ||
            "User Deleted Successfully"
        );


        loadUsers();

    }
    catch (error) {

        console.error(
            "DELETE USER ERROR:",
            error
        );

        alert(error.message);

    }

}


// =====================================================
// CLEAR FORM
// =====================================================

function clearForm() {

    document.getElementById(
        "userId"
    ).value = "";


    document.getElementById(
        "fullName"
    ).value = "";


    document.getElementById(
        "userName"
    ).value = "";


    document.getElementById(
        "password"
    ).value = "";


    document.getElementById(
        "userRole"
    ).value = "STAFF";


    document.getElementById(
        "mobile"
    ).value = "";


    document.getElementById(
        "email"
    ).value = "";


    document.getElementById(
        "userStatus"
    ).value = "ACTIVE";

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}