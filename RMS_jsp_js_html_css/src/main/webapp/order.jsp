<%@ page language="java" contentType="text/html;charset=UTF-8" %>

<%@ include file="../includes/header.jsp" %>

<body>

<%@ include file="../includes/sidebar.jsp" %>


<div class="main-content">

<%@ include file="../includes/navbar.jsp" %>


<div class="container-fluid">


<h2 class="mb-4">
    <i class="fa-solid fa-cart-shopping"></i>
    Order Management
</h2>


<div class="card p-4">


<div class="row mb-3">


<div class="col-md-4">

<label>Customer</label>

<select id="customerId" class="form-select">

<option value="">
Select Customer
</option>

</select>

</div>



<div class="col-md-4">

<label>Menu Item</label>

<select id="menuId" class="form-select">

<option value="">
Select Menu Item
</option>

</select>

</div>



<div class="col-md-2">

<label>Quantity</label>

<input
type="number"
id="quantity"
class="form-control"
value="1"
min="1">

</div>



<div class="col-md-2 d-flex align-items-end">

<button 
class="btn btn-success w-100"
onclick="addItem()">

<i class="fa fa-plus"></i>
Add Item

</button>

</div>


</div>



<table class="table table-bordered table-hover">


<thead class="table-success">

<tr>

<th>Item</th>

<th>Price</th>

<th>Qty</th>

<th>Subtotal</th>

<th>Action</th>

</tr>

</thead>


<tbody id="cartTable">

</tbody>


</table>



<h4 class="text-end">

Total :
₹ <span id="total">0</span>

</h4>



<div class="text-end">

<button 
class="btn btn-primary"
onclick="placeOrder()">

<i class="fa fa-check"></i>
Place Order

</button>

</div>



</div>



<br>



<div class="card p-4">


<h3 class="mb-3">

<i class="fa fa-clock"></i>
Order History

</h3>



<table class="table table-bordered table-striped">


<thead class="table-dark">

<tr>

<th>Order ID</th>

<th>Customer</th>

<th>Total</th>

<th>Status</th>

<th>Date</th>

</tr>

</thead>



<tbody id="orderTable">

</tbody>


</table>


</div>



</div>

</div>





<!-- Order JS -->
<script src="${pageContext.request.contextPath}/js/order.js"></script>



</body>

</html>