// =====================================
// Dashboard
// =====================================
console.log("Dashboard JS Loaded");
checkLogin();

const API = "http://localhost:8080/api/dashboard/summary";

document.addEventListener("DOMContentLoaded", loadDashboard);

// =====================================
// Load Dashboard
// =====================================

function loadDashboard() {

    fetch(API, {

        headers: {
            "Authorization": "Bearer " + token
        }

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load dashboard");
        }

        return response.json();

    })

    .then(data => {
		console.log(data);

		document.getElementById("totalCategories").innerText = data.totalCategories;
		document.getElementById("totalMenu").innerText = data.totalMenuItems;
		document.getElementById("totalCustomers").innerText = data.totalCustomers;
		document.getElementById("totalOrders").innerText = data.totalOrders;
		document.getElementById("todaySales").innerText = data.todaySales;
		document.getElementById("pendingOrders").innerText = data.todayOrders;

        let rows = "";

        if (data.recentOrders && data.recentOrders.length > 0) {

            data.recentOrders.forEach(order => {

                let badge = "bg-warning";

                if (order.status === "COMPLETED") {
                    badge = "bg-success";
                } else if (order.status === "CANCELLED") {
                    badge = "bg-danger";
                }

                rows += `
                    <tr>

                        <td>${order.orderId}</td>

                        <td>${order.customerName}</td>

                        <td>₹${order.totalAmount}</td>

                        <td>
                            <span class="badge ${badge}">
                                ${order.status}
                            </span>
                        </td>

                        <td>${order.orderDate}</td>

                    </tr>
                `;

            });

        } else {

            rows = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No Recent Orders Found
                    </td>
                </tr>
            `;

        }

        document.getElementById("recentOrders").innerHTML = rows;

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}