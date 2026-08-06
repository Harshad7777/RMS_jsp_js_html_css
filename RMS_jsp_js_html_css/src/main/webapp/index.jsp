<%@ page language="java" contentType="text/html;charset=UTF-8"
pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>Restaurant Management System</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:linear-gradient(135deg,#28a745,#20c997);
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.container{
    width:420px;
    background:#fff;
    padding:40px;
    border-radius:12px;
    box-shadow:0 5px 20px rgba(0,0,0,.3);
    text-align:center;
}

h1{
    color:#28a745;
    margin-bottom:10px;
}

p{
    margin-bottom:30px;
    color:#555;
}

.btn{
    display:block;
    width:100%;
    padding:15px;
    margin:15px 0;
    text-decoration:none;
    border-radius:6px;
    font-size:18px;
    color:#fff;
    transition:.3s;
}

.login{
    background:#28a745;
}

.login:hover{
    background:#218838;
}

.register{
    background:#007bff;
}

.register:hover{
    background:#0056b3;
}

</style>

</head>

<body>

<div class="container">

<h1>Restaurant Management System</h1>

<p>Welcome to RMS</p>

<a href="login.jsp" class="btn login">Login</a>

<a href="register.jsp" class="btn register">Register</a>

</div>

</body>
</html>