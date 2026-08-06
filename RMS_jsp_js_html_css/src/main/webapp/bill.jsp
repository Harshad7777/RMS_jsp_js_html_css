<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

<%@ include file="includes/navbar.jsp"%>

<div class="container-fluid">

<h2 class="mb-4">
<i class="fa-solid fa-file-invoice-dollar"></i>
Billing
</h2>

<div class="card p-4">

<div class="row">

<div class="col-md-4">

<label>Order ID</label>

<input type="number"
id="orderId"
class="form-control">

</div>

<div class="col-md-2 d-flex align-items-end">

<button class="btn btn-success w-100"
onclick="loadBill()">

Generate

</button>

</div>

<div class="col-md-2 d-flex align-items-end">

<button class="btn btn-primary w-100"
onclick="printBill()">

Print

</button>

</div>

</div>

</div>

<div class="card mt-4 p-4" id="billArea">

<h3 class="text-center">
Restaurant Management System
</h3>

<hr>

<h5>Customer :
<span id="customerName"></span></h5>

<h5>Date :
<span id="billDate"></span></h5>

<table class="table table-bordered mt-4">

<thead>

<tr>

<th>Item</th>

<th>Price</th>

<th>Qty</th>

<th>Subtotal</th>

</tr>

</thead>

<tbody id="billTable">

</tbody>

</table>

<div class="text-end">

<h5>Subtotal :
₹ <span id="subTotal">0</span></h5>

<h5>GST (18%) :
₹ <span id="gst">0</span></h5>

<h3>Total :
₹ <span id="grandTotal">0</span></h3>

</div>

</div>

</div>
<script src="js/auth.js"></script>
<script src="js/bill.js"></script>

<%@ include file="includes/footer.jsp"%>