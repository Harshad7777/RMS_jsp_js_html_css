<%@ page language="java"
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp"%>

<!-- ================= SIDEBAR ================= -->
<%@ include file="includes/sidebar.jsp"%>


<!-- ================= MAIN CONTENT ================= -->

<div class="main-content">

    <!-- ================= NAVBAR ================= -->
    <%@ include file="includes/navbar.jsp"%>


    <div class="container-fluid">

        <!-- ================= PAGE TITLE ================= -->

        <h2 class="mb-4">

            <i class="fa fa-cutlery"></i>

            Menu Management

        </h2>


        <!-- ================================================= -->
        <!-- MENU FORM -->
        <!-- ================================================= -->

        <div
            class="card shadow p-4 mb-4"
            id="menuForm">

            <h4 class="mb-4">

                <i class="fa fa-plus-circle"></i>

                Add / Update Menu

            </h4>


            <!-- Hidden ID -->

            <input
                type="hidden"
                id="itemId">


            <!-- ================= ROW 1 ================= -->

            <div class="row">

                <!-- Item Name -->

                <div class="col-md-4">

                    <label class="form-label">
                        Item Name
                    </label>

                    <input
                        type="text"
                        id="itemName"
                        class="form-control"
                        placeholder="Enter Item Name">

                </div>


                <!-- Category -->

                <div class="col-md-4">

                    <label class="form-label">
                        Category
                    </label>

                    <select
                        id="categoryId"
                        class="form-select">

                        <option value="">
                            Select Category
                        </option>

                    </select>

                </div>


                <!-- Price -->

                <div class="col-md-4">

                    <label class="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        id="price"
                        class="form-control"
                        placeholder="Enter Price"
                        min="0"
                        step="0.01">

                </div>

            </div>


            <!-- ================= ROW 2 ================= -->

            <div class="row mt-3">


                <!-- Description -->

                <div class="col-md-6">

                    <label class="form-label">
                        Description
                    </label>

                    <textarea
                        id="description"
                        class="form-control"
                        rows="4"
                        placeholder="Enter Description"></textarea>

                </div>


                <!-- Status -->

                <div class="col-md-3">

                    <label class="form-label">
                        Status
                    </label>

                    <select
                        id="status"
                        class="form-select">

                        <option value="AVAILABLE">
                            AVAILABLE
                        </option>

                        <option value="UNAVAILABLE">
                            UNAVAILABLE
                        </option>

                    </select>

                </div>


                <!-- Image -->

                <div class="col-md-3">

                    <label class="form-label">
                        Menu Image
                    </label>

                    <input
                        type="file"
                        id="menuImage"
                        class="form-control"
                        accept="image/*">


                    <img
                        id="previewImage"
                        src="images/menu/default-food.jpg"
                        class="img-thumbnail mt-2"
                        alt="Menu Image Preview"
                        style="
                            width:180px;
                            height:150px;
                            object-fit:cover;
                        ">

                </div>

            </div>


            <!-- ================= BUTTONS ================= -->

            <div class="mt-4">


                <!-- SAVE -->

                <button
                    type="button"
                    class="btn btn-success me-2"
                    onclick="saveMenu()">

                    <i class="fa fa-save"></i>

                    Save

                </button>


                <!-- UPDATE -->

                <button
                    type="button"
                    class="btn btn-primary me-2"
                    onclick="updateMenu()">

                    <i class="fa fa-edit"></i>

                    Update

                </button>


                <!-- CLEAR -->

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="clearForm()">

                    <i class="fa fa-refresh"></i>

                    Clear

                </button>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- FILTER -->
        <!-- ================================================= -->

        <div class="card shadow p-3 mb-4">

            <div class="row">

                <!-- Category Filter -->

                <div class="col-md-6">

                    <label class="form-label">
                        Filter By Category
                    </label>

                    <select
                        id="filterCategory"
                        class="form-select"
                        onchange="filterMenu()">

                        <option value="">
                            All Categories
                        </option>

                    </select>

                </div>


                <!-- Search -->

                <div class="col-md-6">

                    <label class="form-label">
                        Search Menu
                    </label>

                    <input
                        type="text"
                        id="searchMenu"
                        class="form-control"
                        placeholder="Search menu item..."
                        onkeyup="searchMenu()">

                </div>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- MENU CARDS -->
        <!-- ================================================= -->

        <div
            class="row"
            id="menuCardContainer">

            <!-- Menu cards will load here -->

        </div>


    </div>

</div>


<!-- ================= JAVASCRIPT ================= -->

<script src="js/auth.js"></script>

<%@ include file="includes/footer.jsp"%>

<script src="${pageContext.request.contextPath}/js/menu.js"></script>


<%@ include file="includes/footer.jsp"%>