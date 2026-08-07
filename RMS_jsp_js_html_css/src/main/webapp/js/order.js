const ORDER_API = "http://localhost:8080/api/order";
const CUSTOMER_API = "http://localhost:8080/api/customer";
const MENU_API = "http://localhost:8080/api/menu";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    location.href = "login.jsp";
}

let menuList = [];
let items = [];

document.addEventListener("DOMContentLoaded", () => {

    loadCustomers();
    loadMenu();
    loadOrders();

});

//================================
// Load Customers
//================================

function loadCustomers() {

    fetch(CUSTOMER_API, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        let html = "<option value=''>Select Customer</option>";

        data.forEach(c => {

            html += `
            <option value="${c.customerId}">
                ${c.customerName}
            </option>
            `;

        });

        document.getElementById("customerId").innerHTML = html;

    });

}

//================================
// Load Menu
//================================

function loadMenu() {

    fetch(MENU_API, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        menuList = data;

        let html = "<option value=''>Select Menu</option>";

        data.forEach(m => {

            html += `
            <option value="${m.itemId}">
                ${m.itemName} - ₹${m.price}
            </option>
            `;

        });

        document.getElementById("menuId").innerHTML = html;

    });

}

//================================
// Add Item
//================================

function addItem() {

    let menuId = Number(document.getElementById("menuId").value);
    let qty = Number(document.getElementById("quantity").value);

    if (!menuId) {
        alert("Select Menu Item");
        return;
    }

    if (qty <= 0) {
        alert("Invalid Quantity");
        return;
    }

    let menu = menuList.find(m => m.itemId == menuId);

    if (!menu) {
        alert("Menu Item Not Found");
        return;
    }

    let existing = items.find(i => i.itemId == menu.itemId);

    if (existing) {

        existing.quantity += qty;
        existing.subtotal = existing.quantity * existing.price;

    } else {

        items.push({

            itemId: menu.itemId,
            itemName: menu.itemName,
            price: Number(menu.price),
            quantity: qty,
            subtotal: Number(menu.price) * qty

        });

    }

    showCart();

}

//================================
// Show Cart
//================================

function showCart() {

    let rows = "";
    let grandTotal = 0;

    items.forEach((item, index) => {

        grandTotal += item.subtotal;

        rows += `
        <tr>

            <td>${item.itemName}</td>

            <td>₹${item.price}</td>

            <td>${item.quantity}</td>

            <td>₹${item.subtotal}</td>

            <td>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("cartTable").innerHTML = rows;
    document.getElementById("total").innerHTML = grandTotal;

}

//================================
// Remove Item
//================================

function removeItem(index) {

    items.splice(index, 1);

    showCart();

}

//================================
// Place Order
//================================

function placeOrder() {

    let customerId = Number(document.getElementById("customerId").value);

    if (!customerId) {

        alert("Select Customer");
        return;

    }

    if (items.length == 0) {

        alert("Cart Empty");
        return;

    }

    const order = {

        customerId: customerId,

        staffId: Number(localStorage.getItem("userId")),

        items: items.map(i => ({

            itemId: i.itemId,
            quantity: i.quantity

        }))

    };

    fetch(ORDER_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            Authorization: "Bearer " + token

        },

        body: JSON.stringify(order)

    })

    .then(res => {

        if (!res.ok)
            throw new Error();

        return res.json();

    })

    .then(res => {

        alert(res.message);

        items = [];

        showCart();

        document.getElementById("customerId").value = "";
        document.getElementById("menuId").value = "";
        document.getElementById("quantity").value = 1;

        loadOrders();

    })

    .catch(() => {

        alert("Unable To Place Order");

    });

}

//================================
// Load Orders
//================================

function loadOrders() {

    fetch(ORDER_API, {

        headers: {

            Authorization: "Bearer " + token

        }

    })

    .then(res => res.json())

    .then(data => {

        let rows = "";

        data.forEach(o => {

            let badge = "bg-warning";

            if (o.orderStatus == "COMPLETED")
                badge = "bg-success";

            if (o.orderStatus == "CANCELLED")
                badge = "bg-danger";

            rows += `

            <tr>

                <td>${o.orderId}</td>

                <td>${o.customerName}</td>

                <td>₹${o.totalAmount}</td>

                <td>

                    <span class="badge ${badge}">
                        ${o.orderStatus}
                    </span>

                </td>

                <td>${o.orderDate.replace("T"," ")}</td>

                <td>

                    <button
                        class="btn btn-info btn-sm"
                        onclick="viewOrder(${o.orderId})">

                        View

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="cancelOrder(${o.orderId})">

                        Cancel

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById("orderTable").innerHTML = rows;

    });

}

//================================
// View Order
//================================

function viewOrder(orderId) {

    fetch(ORDER_API + "/" + orderId, {

        headers: {
            Authorization: "Bearer " + token
        }

    })

    .then(res => res.json())

    .then(order => {

        document.getElementById("mOrderId").innerHTML = order.orderId;
        document.getElementById("mCustomer").innerHTML = order.customerName;
        document.getElementById("mStatus").innerHTML = order.orderStatus;
        document.getElementById("mTotal").innerHTML = "₹" + order.totalAmount;

        fetch(ORDER_API + "/details/" + orderId, {

            headers: {
                Authorization: "Bearer " + token
            }

        })

        .then(res => res.json())

        .then(details => {

            let rows = "";

            details.forEach(d => {

                rows += `

                <tr>

                    <td>${d.itemName}</td>

                    <td>₹${d.price}</td>

                    <td>${d.quantity}</td>

                    <td>₹${d.subtotal}</td>

                </tr>

                `;

            });

            document.getElementById("detailTable").innerHTML = rows;

            new bootstrap.Modal(
                document.getElementById("orderModal")
            ).show();

        });

    });

}

//================================
// Cancel Order
//================================

function cancelOrder(id) {

    if (!confirm("Cancel this Order?"))
        return;

    fetch(ORDER_API + "/cancel/" + id, {

        method: "PUT",

        headers: {
            Authorization: "Bearer " + token
        }

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        loadOrders();

    });

}

//================================
// Auto Refresh
//================================

setInterval(() => {

    loadOrders();

}, 30000);