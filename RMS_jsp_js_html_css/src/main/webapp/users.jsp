<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<link rel="stylesheet" href="css/users.css">

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

<%@ include file="includes/navbar.jsp"%>

<div class="container-fluid mt-4">

<div class="card">

<div class="card-header bg-primary text-white">

<h3>

<i class="fa-solid fa-user-shield"></i>

User Management

</h3>

</div>

<div class="card-body">

<input type="hidden" id="userId">

<div class="row">

<div class="col-lg-6 col-md-6 col-12 mb-3">

<label>Full Name</label>

<input
type="text"
id="fullName"
class="form-control">

</div>

<div class="col-lg-6 col-md-6 col-12 mb-3">

<label>Username</label>

<input
type="text"
id="userName"
class="form-control">

</div>

<div class="col-lg-6 col-md-6 col-12 mb-3">

<label>Password</label>

<input
type="password"
id="password"
class="form-control">

</div>

<div class="col-lg-6 col-md-6 col-12 mb-3">

<label>Role</label>

<select
id="userRole"
class="form-select">

<option value="ADMIN">ADMIN</option>

<option value="STAFF">STAFF</option>

</select>

</div>

</div>

<div class="row mt-3">

<div class="col-lg-3 col-md-6 col-12">

<button
class="btn btn-success w-100"
onclick="saveUser()">

Save

</button>

</div>

<div class="col-lg-3 col-md-6 col-12">

<button
class="btn btn-warning w-100"
onclick="updateUser()">

Update

</button>

</div>

<div class="col-lg-3 col-md-6 col-12">

<button
class="btn btn-secondary w-100"
onclick="clearForm()">

Clear

</button>

</div>

</div>

<hr>

<div class="table-responsive">

<table class="table table-bordered table-hover">

<thead>

<tr>

<th>ID</th>

<th>Full Name</th>

<th>Username</th>

<th>Role</th>

<th>Action</th>

</tr>

</thead>

<tbody id="userTable">

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

<script src="js/auth.js"></script>

<script src="js/users.js"></script>

<%@ include file="includes/footer.jsp"%>