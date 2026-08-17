<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Sankalp Restaurant - Login</title>


    <!-- Google Fonts -->
    <link rel="preconnect"
          href="https://fonts.googleapis.com">

    <link rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">


    <!-- Font Awesome -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">


    <!-- Login CSS -->
    <link
        rel="stylesheet"
        href="${pageContext.request.contextPath}/css/login.css">

</head>


<body>


<!-- =====================================================
     BACKGROUND
===================================================== -->

<div class="background">

    <div class="overlay"></div>

    <div class="circle circle-1"></div>

    <div class="circle circle-2"></div>

    <div class="circle circle-3"></div>

</div>



<!-- =====================================================
     MAIN LOGIN PAGE
===================================================== -->

<div class="page-container">


    <div class="login-wrapper">


        <!-- =================================================
             LEFT SIDE
        ================================================== -->

        <div class="left-panel">


            <div class="left-content">


                <!-- Brand -->

                <div class="brand">

                    <div class="brand-logo">

                        <i class="fa-solid fa-utensils"></i>

                    </div>


                    <div class="brand-text">

                        <h2>SANKALP</h2>

                        <span>RESTAURANT</span>

                    </div>

                </div>


                <div class="gold-line"></div>


                <!-- Heading -->

                <p class="small-heading">
                    WELCOME TO
                </p>


                <h1>

                    Restaurant

                    <span>
                        Management
                    </span>

                </h1>


                <p class="description">

                    A smarter way to manage your restaurant.
                    Control orders, kitchen operations,
                    customers, billing and reports from
                    one powerful platform.

                </p>


                <!-- Features -->

                <div class="features">


                    <div class="feature">

                        <div class="feature-icon">

                            <i class="fa-solid fa-chart-line"></i>

                        </div>

                        <div>

                            <strong>
                                Smart Management
                            </strong>

                            <small>
                                Complete restaurant control
                            </small>

                        </div>

                    </div>


                    <div class="feature">

                        <div class="feature-icon">

                            <i class="fa-solid fa-bowl-food"></i>

                        </div>

                        <div>

                            <strong>
                                Order Management
                            </strong>

                            <small>
                                Fast and simple order tracking
                            </small>

                        </div>

                    </div>


                    <div class="feature">

                        <div class="feature-icon">

                            <i class="fa-solid fa-shield-halved"></i>

                        </div>

                        <div>

                            <strong>
                                Secure Access
                            </strong>

                            <small>
                                Role based secure login
                            </small>

                        </div>

                    </div>


                </div>


                <!-- Bottom -->

                <div class="left-bottom">

                    <i class="fa-solid fa-circle-check"></i>

                    Powerful • Simple • Secure

                </div>


            </div>

        </div>



        <!-- =================================================
             RIGHT LOGIN PANEL
        ================================================== -->

        <div class="right-panel">


            <div class="login-card">


                <!-- Logo -->

                <div class="logo-container">

                    <img
                        src="${pageContext.request.contextPath}/images/logo.png"
                        alt="Sankalp Restaurant Logo">

                </div>


                <!-- Heading -->

                <div class="login-heading">

                    <span>
                        WELCOME BACK
                    </span>

                    <h2>
                        Sign In
                    </h2>

                    <p>
                        Login to access your restaurant dashboard
                    </p>

                </div>


                <!-- Message -->

                <div
                    id="message"
                    class="message">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <span></span>

                </div>


                <!-- =================================================
                     LOGIN FORM
                ================================================== -->

                <form
                    id="loginForm"
                    autocomplete="off">


                    <!-- Username -->

                    <div class="form-group">

                        <label for="username">

                            Username

                        </label>


                        <div class="input-container">

                            <i class="fa-regular fa-user input-icon"></i>


                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                autocomplete="username"
                                required>


                        </div>

                    </div>


                    <!-- Password -->

                    <div class="form-group">

                        <label for="password">

                            Password

                        </label>


                        <div class="input-container">

                            <i class="fa-solid fa-lock input-icon"></i>


                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autocomplete="current-password"
                                required>


                            <button
                                type="button"
                                id="togglePassword"
                                class="toggle-password">

                                <i class="fa-regular fa-eye"></i>

                            </button>

                        </div>

                    </div>


                    <!-- Options -->

                    <div class="login-options">


                        <label class="remember">

                            <input
                                type="checkbox"
                                id="rememberMe">

                            <span class="custom-checkbox"></span>

                            Remember me

                        </label>


                        <a href="#" id="forgotPassword">

                            Forgot password?

                        </a>


                    </div>


                    <!-- Login Button -->

                    <button
                        type="submit"
                        id="loginButton"
                        class="login-button">


                        <span id="buttonText">
                            Sign In
                        </span>


                        <span
                            id="loader"
                            class="loader">

                            <span></span>
                            <span></span>
                            <span></span>

                        </span>


                        <i
                            id="buttonIcon"
                            class="fa-solid fa-arrow-right">
                        </i>


                    </button>


                </form>


                <!-- Security -->

                <div class="security">


                    <div class="security-line">

                        <span></span>

                        <small>
                            SECURE LOGIN
                        </small>

                        <span></span>

                    </div>


                    <p>

                        <i class="fa-solid fa-lock"></i>

                        Your login information is protected

                    </p>


                </div>


                <!-- Copyright -->

                <div class="copyright">

                    © 2026 Sankalp Restaurant

                </div>


            </div>

        </div>


    </div>

</div>



<!-- =====================================================
     JAVASCRIPT
===================================================== -->

<script
    src="${pageContext.request.contextPath}/js/login.js">
</script>


</body>

</html>