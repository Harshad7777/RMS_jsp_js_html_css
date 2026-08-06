// =====================================
// Admin Authentication
// =====================================

checkAdmin();

const API = "http://localhost:8080/api/users";

// =====================================
// Page Load
// =====================================

document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
});

// =====================================
// Load Users
// =====================================

function loadUsers() {

    fetch(API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load users");
        }
        return response.json();
    })

    .then(data => {

        let rows = "";

        data.forEach(user => {

            rows += `
            <tr>

                <td>${user.userId}</td>

                <td>${user.fullName}</td>

                <td>${user.username}</td>

                <td>
                    <span class="badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}">
                        ${user.role}
                    </span>
                </td>

                <td>

                    <button class="btn btn-warning btn-sm"
                    onclick="editUser(${user.userId},
                    '${user.fullName}',
                    '${user.username}',
                    '${user.role}')">

                    <i class="fa fa-edit"></i>

                    </button>

                    <button class="btn btn-danger btn-sm"
                    onclick="deleteUser(${user.userId})">

                    <i class="fa fa-trash"></i>

                    </button>

                </td>

            </tr>
            `;

        });

        document.getElementById("userTable").innerHTML = rows;

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// =====================================
// Save User
// =====================================

function saveUser() {

    const user = {

        fullName: document.getElementById("fullName").value.trim(),

        username: document.getElementById("userName").value.trim(),

        password: document.getElementById("password").value,

        role: document.getElementById("userRole").value

    };

    if (
        user.fullName === "" ||
        user.username === "" ||
        user.password === ""
    ) {

        alert("Please fill all fields");

        return;

    }

    fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(user)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save user");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        clearForm();

        loadUsers();

    })

    .catch(error => {

        alert(error.message);

    });

}

// =====================================
// Edit User
// =====================================

function editUser(id, fullName, username, role) {

    document.getElementById("userId").value = id;

    document.getElementById("fullName").value = fullName;

    document.getElementById("userName").value = username;

    document.getElementById("password").value = "";

    document.getElementById("userRole").value = role;

}

// =====================================
// Update User
// =====================================

function updateUser() {

    const id = document.getElementById("userId").value;

    if (id === "") {

        alert("Select User");

        return;

    }

    const user = {

        userId: id,

        fullName: document.getElementById("fullName").value,

        username: document.getElementById("userName").value,

        password: document.getElementById("password").value,

        role: document.getElementById("userRole").value

    };

    fetch(API + "/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(user)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to update user");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        clearForm();

        loadUsers();

    })

    .catch(error => {

        alert(error.message);

    });

}

// =====================================
// Delete User
// =====================================

function deleteUser(id) {

    if (!confirm("Delete this user?")) {

        return;

    }

    fetch(API + "/" + id, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + token

        }

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to delete user");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadUsers();

    })

    .catch(error => {

        alert(error.message);

    });

}

// =====================================
// Clear Form
// =====================================

function clearForm() {

    document.getElementById("userId").value = "";

    document.getElementById("fullName").value = "";

    document.getElementById("userName").value = "";

    document.getElementById("password").value = "";

    document.getElementById("userRole").value = "STAFF";

}