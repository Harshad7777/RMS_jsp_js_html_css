// =====================================
// Customer Management
// =====================================

checkLogin();

const API = "http://localhost:8080/api/customer";

document.addEventListener("DOMContentLoaded", loadCustomers);

// =====================================
// Load Customers
// =====================================

function loadCustomers() {

    fetch(API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load customers");
        }

        return response.json();

    })

    .then(data => {

        let rows = "";

        if (data.length === 0) {

            rows = `
                <tr>
                    <td colspan="7" class="text-center">
                        No Customers Found
                    </td>
                </tr>
            `;

        } else {

            data.forEach(c => {

                rows += `
                <tr>

                    <td>${c.customerId}</td>

                    <td>${c.customerName}</td>

                    <td>${c.mobile}</td>

                    <td>${c.email}</td>

                    <td>${c.address}</td>

                    <td>

                        <span class="badge ${c.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}">

                            ${c.status}

                        </span>

                    </td>

                    <td>

                        <button
                        class="btn btn-warning btn-sm"
                        onclick="editCustomer(
                        ${c.customerId},
                        '${c.customerName}',
                        '${c.mobile}',
                        '${c.email}',
                        '${c.address}',
                        '${c.status}')">

                        <i class="fa fa-edit"></i>

                        </button>

                        <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteCustomer(${c.customerId})">

                        <i class="fa fa-trash"></i>

                        </button>

                    </td>

                </tr>
                `;

            });

        }

        document.getElementById("customerTable").innerHTML = rows;

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// =====================================
// Save Customer
// =====================================

function saveCustomer() {

    const customer = {

        customerName: document.getElementById("customerName").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        address: document.getElementById("address").value.trim(),
        status: document.getElementById("status").value

    };

    if (
        customer.customerName === "" ||
        customer.mobile === "" ||
        customer.email === ""
    ) {

        alert("Please fill all required fields.");
        return;

    }

    fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok)
            throw new Error("Unable to save customer");

        return response.text();

    })

    .then(message => {

        alert(message);

        clearForm();

        loadCustomers();

    })

    .catch(error => alert(error.message));

}
// =====================================
// Edit Customer
// =====================================

function editCustomer(id, name, mob, mail, addr, sts) {

    document.getElementById("customerId").value = id;
    document.getElementById("customerName").value = name;
    document.getElementById("mobile").value = mob;
    document.getElementById("email").value = mail;
    document.getElementById("address").value = addr;
    document.getElementById("status").value = sts;

}

// =====================================
// Update Customer
// =====================================

function updateCustomer() {

    const id = document.getElementById("customerId").value;

    if (id === "") {

        alert("Select a customer.");
        return;

    }

    const customer = {

        customerId: id,
        customerName: document.getElementById("customerName").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        address: document.getElementById("address").value.trim(),
        status: document.getElementById("status").value

    };

    fetch(API + "/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok)
            throw new Error("Unable to update customer");

        return response.text();

    })

    .then(message => {

        alert(message);

        clearForm();

        loadCustomers();

    })

    .catch(error => alert(error.message));

}

// =====================================
// Delete Customer
// =====================================

function deleteCustomer(id) {

    if (!confirm("Delete this customer?")) {

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

            throw new Error("Unable to delete customer");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadCustomers();

    })

    .catch(error => alert(error.message));

}

// =====================================
// Clear Form
// =====================================

function clearForm() {

    document.getElementById("customerId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("status").value = "ACTIVE";

}

// =====================================
// Search Customer
// =====================================

function searchCustomer() {

    const filter = document.getElementById("searchCustomer").value.toUpperCase();

    const rows = document.querySelectorAll("#customerTable tr");

    rows.forEach(row => {

        const name = row.cells[1];

        if (!name) return;

        row.style.display = name.innerText.toUpperCase().includes(filter)
            ? ""
            : "none";

    });

}