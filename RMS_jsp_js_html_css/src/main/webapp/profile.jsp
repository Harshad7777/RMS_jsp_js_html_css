<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<link rel="stylesheet"
      href="${pageContext.request.contextPath}/css/profile.css">


<body>

<%@ include file="includes/sidebar.jsp"%>


<div class="main-content">


    <%@ include file="includes/navbar.jsp"%>


    <div class="container-fluid py-4">


        <div class="d-flex justify-content-between align-items-center mb-4">

            <h2 class="fw-bold">

                <i class="fa-solid fa-user-circle text-primary"></i>
                My Profile

            </h2>

        </div>



        <div class="row">


            <!-- PROFILE DETAILS -->

            <div class="col-lg-6 mb-4">


                <div class="card shadow">


                    <div class="card-header bg-primary text-white">

                        <h5>
                            <i class="fa-solid fa-id-card"></i>
                            Profile Details
                        </h5>

                    </div>



                    <div class="card-body">


                        <form id="profileForm">


                            <div class="text-center mb-3">

                                <img src="images/user.png"
                                     class="profile-img">

                            </div>



                            <label>Full Name</label>

                            <input type="text"
                                   id="fullName"
                                   class="form-control mb-3">



                            <label>Username</label>

                            <input type="text"
                                   id="profileUsername"
                                   class="form-control mb-3"
                                   readonly>



                            <label>Email</label>

                            <input type="email"
                                   id="email"
                                   class="form-control mb-3">



                            <label>Mobile</label>

                            <input type="text"
                                   id="mobile"
                                   class="form-control mb-3">



                            <button class="btn btn-success w-100">

                                <i class="fa-solid fa-save"></i>
                                Update Profile

                            </button>


                        </form>


                    </div>


                </div>


            </div>





            <!-- PASSWORD -->

            <div class="col-lg-6 mb-4">


                <div class="card shadow">


                    <div class="card-header bg-danger text-white">


                        <h5>

                            <i class="fa-solid fa-lock"></i>
                            Change Password

                        </h5>


                    </div>




                    <div class="card-body">


                        <form id="passwordForm">


                            <input type="password"
                                   id="oldPassword"
                                   class="form-control mb-3"
                                   placeholder="Old Password">



                            <input type="password"
                                   id="newPassword"
                                   class="form-control mb-3"
                                   placeholder="New Password">



                            <input type="password"
                                   id="confirmPassword"
                                   class="form-control mb-3"
                                   placeholder="Confirm Password">



                            <button class="btn btn-danger w-100">

                                Change Password

                            </button>


                        </form>


                    </div>


                </div>


            </div>


        </div>


    </div>


</div>



<!-- Only profile.js -->
<script src="${pageContext.request.contextPath}/js/profile.js"></script>


<%@ include file="includes/footer.jsp"%>


</body>

</html>