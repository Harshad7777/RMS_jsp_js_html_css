<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<body>

<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

<%@ include file="includes/navbar.jsp"%>

<div class="container-fluid">

<h2 class="mb-4">
    <i class="fa-solid fa-utensils"></i>
    Menu Management
</h2>

<div class="card shadow p-4">

<input type="hidden" id="itemId">

<div class="row">

    <div class="col-md-4">
        <label>Item Name</label>
        <input type="text" id="itemName" class="form-control">
    </div>

    <div class="col-md-4">
        <label>Category</label>
        <select id="categoryId" class="form-select">
            <option value="">Select Category</option>
        </select>
    </div>

    <div class="col-md-4">
        <label>Price</label>
        <input type="number" id="price" class="form-control">
    </div>

</div>

<div class="row mt-3">

    <div class="col-md-6">

        <label>Description</label>

        <textarea id="description"
                  class="form-control"
                  rows="4"></textarea>

    </div>

    <div class="col-md-3">

        <label>Status</label>

        <select id="status" class="form-select">

            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>

        </select>

    </div>

    <div class="col-md-3">

        <label>Menu Image</label>

        <input type="file"
               id="menuImage"
               class="form-control"
               accept="image/*">

        <img id="previewImage"
             src="images/menu/default-food.jpg"
             class="img-thumbnail mt-2"
             style="width:180px;height:150px;object-fit:cover;">

    </div>

</div>

<div class="mt-4">

<button class="btn btn-success" onclick="saveMenu()">Save</button>

<button class="btn btn-primary" onclick="updateMenu()">Update</button>

<button class="btn btn-secondary" onclick="clearForm()">Clear</button>

</div>

</div>

<div class="card shadow mt-4 p-4">

<div class="row">

<div class="col-md-4">

<label>Filter By Category</label>

<select id="filterCategory"
        class="form-select"
        onchange="filterMenu()">

<option value="">All Categories</option>

</select>

</div>

</div>

<hr>

<div class="row" id="menuCardContainer"></div>

</div>

</div>

</div>

<script src="js/auth.js"></script>
<script src="js/menu.js"></script>

<%@ include file="includes/footer.jsp"%>

</body>