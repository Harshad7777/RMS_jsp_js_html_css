const ORDER_API = "http://localhost:8080/api/order";
const CUSTOMER_API = "http://localhost:8080/api/customer";
const MENU_API = "http://localhost:8080/api/menu";

const token = localStorage.getItem("token");
if (!token) {
    alert("Please Login First");
    window.location.href = "login.jsp";
}

let items = [];
let menuList = [];

document.addEventListener("DOMContentLoaded", function () {

    if (!token) {
        alert("Please Login");
        window.location.href = "login.jsp";
        return;
    }

    loadCustomers();
    loadMenu();
    loadOrders();

});

// =============================
// Load Customers
// =============================
function loadCustomers() {

    fetch(CUSTOMER_API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error("Customer Load Failed");
        return response.json();
    })
    .then(data => {

        let option = "<option value=''>Select Customer</option>";

        data.forEach(c => {

            option += `
            <option value="${c.customerId}">
                ${c.customerName}
            </option>
            `;

        });

        document.getElementById("customerId").innerHTML = option;

    })
    .catch(error => {

        console.log(error);
        alert("Unable to load customers");

    });

}

// =============================
// Load Menu
// =============================
function loadMenu() {

    fetch(MENU_API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error("Menu Load Failed");
        return response.json();
    })
    .then(data => {

        menuList = data;

        let option = "<option value=''>Select Menu</option>";

        data.forEach(menu => {

            option += `
            <option value="${menu.itemId}">
                ${menu.itemName} - ₹${menu.price}
            </option>
            `;

        });

        document.getElementById("menuId").innerHTML = option;

    })
    .catch(error => {

        console.log(error);
        alert("Unable to load menu");

    });

}

// =============================
// Add Item
// =============================
function addItem() {

    let menuId = document.getElementById("menuId").value;
    let qty = parseInt(document.getElementById("quantity").value);

    if (menuId === "") {

        alert("Select Menu Item");
        return;

    }

    if (qty <= 0 || isNaN(qty)) {

        alert("Invalid Quantity");
        return;

    }

    let menu = menuList.find(m => m.itemId == menuId);

    let subtotal = Number(menu.price) * qty;

    items.push({

        itemId: menu.itemId,
        itemName: menu.itemName,
        price: Number(menu.price),
        quantity: qty,
        subtotal: subtotal

    });

    showCart();

}

// =============================
// Show Cart
// =============================
function showCart() {

    let rows = "";
    let total = 0;

    items.forEach((item, index) => {

        total += item.subtotal;

        rows += `
        <tr>

            <td>${item.itemName}</td>

            <td>₹${item.price}</td>

            <td>${item.quantity}</td>

            <td>₹${item.subtotal}</td>

            <td>

                <button class="btn btn-danger btn-sm"
                onclick="removeItem(${index})">

                Remove

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("cartTable").innerHTML = rows;
    document.getElementById("total").innerHTML = total;

}

// =============================
// Remove Item
// =============================
function removeItem(index) {

    items.splice(index, 1);

    showCart();

}

// =============================
// Place Order
// =============================
function placeOrder() {

    let customerId = document.getElementById("customerId").value;

    if (customerId === "") {

        alert("Select Customer");
        return;

    }

    if (items.length === 0) {

        alert("Cart is Empty");
        return;

    }

    const order = {

        customerId: Number(customerId),
        staffId: Number(localStorage.getItem("userId")),

        items: items.map(item => ({

            itemId: item.itemId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal

        }))

    };

    fetch(ORDER_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token

        },

        body: JSON.stringify(order)

    })
    .then(response => {

        if (!response.ok)
            throw new Error("Order Failed");

        return response.text();

    })
    .then(message => {

        alert(message);

        items = [];

        showCart();

        document.getElementById("customerId").value = "";
        document.getElementById("menuId").value = "";
        document.getElementById("quantity").value = 1;

        loadOrders();

    })
    .catch(error => {

        console.log(error);
        alert("Unable to Place Order");

    });

}

// =============================
// Load Orders
// =============================
function loadOrders() {

    fetch(ORDER_API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Order Load Failed");
        }

        return response.json();

    })
    .then(data => {

        let rows = "";

		data.forEach(order => {

		    rows += `
		    <tr>

		        <td>${order.orderId}</td>
		        <td>${order.customerId}</td>
		        <td>${order.totalAmount}</td>
				<td>
				    <span class="badge bg-warning">
				        ${order.orderStatus || 'N/A'}
				    </span>
				</td>
		        <td>${order.orderDate}</td>

		    </tr>
		    `;

		});


        document.getElementById("orderTable").innerHTML = rows;


    })
    .catch(error => {

        console.log(error);
        alert("Unable to load orders");

    });

}