<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ include file="includes/header.jsp"%>

<link rel="stylesheet" href="css/register.css">


<body>


<div class="container mt-5">


<div class="card shadow p-4 mx-auto"
style="max-width:500px;">


<h2 class="text-center mb-4">

<i class="fa-solid fa-user-plus"></i>

Register

</h2>



<form id="registerForm">



<div class="mb-3">

<label class="form-label">
Full Name
</label>

<input 
type="text"
id="fullName"
class="form-control"
required>

</div>





<div class="mb-3">

<label class="form-label">
Username
</label>

<input
type="text"
id="username"
class="form-control"
required>

</div>






<div class="mb-3">

<label class="form-label">
Email
</label>

<input
type="email"
id="email"
class="form-control"
required>

</div>







<div class="mb-3">

<label class="form-label">
Password
</label>

<input
type="password"
id="password"
class="form-control"
required>

</div>







<div class="mb-3">

<label class="form-label">
Role
</label>


<select id="role" class="form-select">


<option value="STAFF">
STAFF
</option>


<option value="ADMIN">
ADMIN
</option>


</select>


</div>







<button
type="submit"
class="btn btn-success w-100">


<i class="fa-solid fa-user-check"></i>

Register


</button>



</form>



<div class="text-center mt-3">

<a href="login.jsp">

Already have account? Login

</a>

</div>



</div>


</div>





<script src="js/register.js"></script>


<%@ include file="includes/footer.jsp"%>


</body>

</html>