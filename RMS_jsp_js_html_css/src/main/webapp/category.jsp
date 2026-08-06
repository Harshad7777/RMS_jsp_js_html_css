<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

<%@ include file="includes/navbar.jsp"%>

<div class="container-fluid">

<h2 class="mb-4">
<i class="fa fa-list"></i> Category Management
</h2>

<div class="card p-4">

<input type="hidden" id="categoryId">

<div class="row">

<div class="col-md-4">

<label>Category Name</label>

<input type="text"
id="categoryName"
class="form-control">

</div>

<div class="col-md-4">

<label>Status</label>

<select id="status"
class="form-select">

<option value="ACTIVE">ACTIVE</option>

<option value="INACTIVE">INACTIVE</option>

</select>

</div>

<div class="col-md-4">

<label>Description</label>

<textarea
id="description"
class="form-control"></textarea>

</div>

</div>

<div class="mt-3">

<button
class="btn btn-success"
onclick="saveCategory()">

<i class="fa fa-save"></i>

Save

</button>

<button
class="btn btn-primary"
onclick="updateCategory()">

Update

</button>

<button
class="btn btn-secondary"
onclick="clearForm()">

Clear

</button>

</div>

</div>

<div class="card mt-4 p-3">

<h4>Category List</h4>

<table class="table table-bordered table-hover">

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Description</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody id="categoryTable">

</tbody>

</table>

</div>

</div>

</div>
<script src="js/auth.js"></script>
<script src="js/category.js"></script>

<%@ include file="includes/footer.jsp"%>