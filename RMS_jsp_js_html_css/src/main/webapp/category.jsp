<%@ page language="java"
contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<%@ include file="includes/header.jsp"%>

<!-- Sidebar -->
<%@ include file="includes/sidebar.jsp"%>

<div class="main-content">

    <%@ include file="includes/navbar.jsp"%>

    <div class="container-fluid">

        <h2 class="mb-4">
            <i class="fa fa-list"></i>
            Category Management
        </h2>

        <!-- Category Form -->

        <div class="card shadow-sm mb-4">

            <div class="card-body">

                <input
                    type="hidden"
                    id="categoryId">

                <div class="row">

                    <div class="col-md-4">

                        <label class="form-label">
                            Category Name
                        </label>

                        <input
                            type="text"
                            id="categoryName"
                            class="form-control"
                            placeholder="Enter Category Name">

                    </div>

                    <div class="col-md-4">

                        <label class="form-label">
                            Status
                        </label>

                        <select
                            id="status"
                            class="form-select">

                            <option value="ACTIVE">
                                ACTIVE
                            </option>

                            <option value="INACTIVE">
                                INACTIVE
                            </option>

                        </select>

                    </div>

                    <div class="col-md-4">

                        <label class="form-label">
                            Description
                        </label>

                        <textarea
                            id="description"
                            rows="3"
                            class="form-control"
                            placeholder="Enter Description"></textarea>

                    </div>

                </div>

                <div class="mt-3">

                    <button
                        id="saveBtn"
                        class="btn btn-success"
                        onclick="saveCategory()">

                        <i class="fa fa-save"></i>
                        Save

                    </button>

                    <button
                        id="updateBtn"
                        class="btn btn-primary d-none"
                        onclick="updateCategory()">

                        <i class="fa fa-edit"></i>
                        Update

                    </button>

                    <button
                        class="btn btn-secondary"
                        onclick="clearForm()">

                        <i class="fa fa-refresh"></i>
                        Clear

                    </button>

                </div>

            </div>

        </div>

        <!-- Search -->

        <div class="row mb-3">

            <div class="col-md-4">

                <input
                    id="searchCategory"
                    class="form-control"
                    placeholder="Search Category">

            </div>

        </div>

        <!-- Category Table -->

        <div class="card shadow-sm">

            <div class="card-body">

                <h4 class="mb-3">

                    <i class="fa fa-list"></i>

                    Category List

                </h4>

                <div class="table-responsive">

                    <table class="table table-bordered table-hover">

                        <thead class="table-success">

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Description</th>

                                <th>Status</th>

                                <th width="180">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody id="categoryTable">

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>

<script src="js/auth.js"></script>
<%@ include file="includes/footer.jsp"%>

<script src="${pageContext.request.contextPath}/js/category.js"></script>

<%@ include file="includes/footer.jsp"%>