<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Restaurant Management System - Login</title>

<!-- CSS -->
<link rel="stylesheet" href="css/login.css">

<!-- Font Awesome -->
<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

<div class="login-container">

    <div class="login-card">

        <img src="images/logo.png" class="logo" alt="Logo">

        <h2>Restaurant Management System</h2>

        <form id="loginForm" onsubmit="return false;">

            <div class="input-box">
                <i class="fa-solid fa-user"></i>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                    required>
            </div>

            <div class="input-box">
                <i class="fa-solid fa-lock"></i>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    required>
            </div>

            <button type="submit">Login</button>

        </form>

        <p id="message">
            <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
        </p>

    </div>

</div>

<script src="js/login.js"></script>
</body>
</html>