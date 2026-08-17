<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <meta name="description"
          content="Sankalp Restaurant - Delicious food, memorable moments and exceptional dining experience.">

    <title>Sankalp Restaurant | Delicious Food & Memorable Moments</title>

    <!-- Bootstrap -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <!-- Font Awesome -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- Landing CSS -->
    <link
        rel="stylesheet"
        href="${pageContext.request.contextPath}/css/landing.css">

</head>


<body>

<!-- =========================================================
     NAVBAR
========================================================= -->

<nav class="navbar navbar-expand-lg fixed-top" id="mainNavbar">

    <div class="container">

        <a class="navbar-brand" href="#home">

            <div class="brand-logo">
                <i class="fa-solid fa-utensils"></i>
            </div>

            <div class="brand-text">
                <span class="brand-name">Sankalp</span>
                <span class="brand-subtitle">RESTAURANT</span>
            </div>

        </a>


        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>

        </button>


        <div class="collapse navbar-collapse" id="navbarContent">

            <ul class="navbar-nav ms-auto align-items-lg-center">

                <li class="nav-item">
                    <a class="nav-link active" href="#home">
                        Home
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#about">
                        About
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#menu">
                        Menu
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#why-us">
                        Why Us
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#gallery">
                        Gallery
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#contact">
                        Contact
                    </a>
                </li>

                <li class="nav-item ms-lg-3">

                    <a
                        href="${pageContext.request.contextPath}/login.jsp"
                        class="nav-login">

                        <i class="fa-solid fa-right-to-bracket"></i>

                        Login

                    </a>

                </li>

            </ul>

        </div>

    </div>

</nav>


<!-- =========================================================
     HERO SECTION
========================================================= -->

<section id="home" class="hero-section">

    <div class="hero-overlay"></div>

    <div class="container hero-container">

        <div class="row align-items-center min-vh-100">

            <div class="col-lg-7">

                <div class="hero-content">

                    <span class="hero-small-title">
                        <i class="fa-solid fa-star"></i>
                        Welcome to Sankalp
                        <i class="fa-solid fa-star"></i>
                    </span>

                    <h1>
                        Taste the
                        <span>Tradition</span>
                    </h1>

                    <h2>
                        Experience the Difference
                    </h2>

                    <p>
                        Discover delicious flavors, authentic recipes
                        and unforgettable dining experiences crafted
                        with passion and served with love.
                    </p>


                    <div class="hero-buttons">

                        <a href="#menu" class="btn-primary-custom">

                            Explore Menu

                            <i class="fa-solid fa-arrow-right"></i>

                        </a>


                        <a href="#contact" class="btn-outline-custom">

                            <i class="fa-regular fa-calendar-check"></i>

                            Book a Table

                        </a>

                    </div>


                    <div class="hero-info">

                        <div class="hero-info-item">

                            <i class="fa-solid fa-location-dot"></i>

                            <span>
                                Dine With Us
                            </span>

                        </div>


                        <div class="hero-info-item">

                            <i class="fa-solid fa-clock"></i>

                            <span>
                                Open Daily
                            </span>

                        </div>


                        <div class="hero-info-item">

                            <i class="fa-solid fa-phone"></i>

                            <span>
                                Call Us
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <a href="#about" class="scroll-down">

        <span>Scroll Down</span>

        <i class="fa-solid fa-chevron-down"></i>

    </a>

</section>


<!-- =========================================================
     ABOUT SECTION
========================================================= -->

<section id="about" class="about-section section-padding">

    <div class="container">

        <div class="row align-items-center g-5">

            <div class="col-lg-6 reveal">

                <div class="about-image-wrapper">

                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85"
                        alt="Sankalp Restaurant Interior"
                        class="about-image">

                    <div class="experience-card">

                        <strong>15+</strong>

                        <span>
                            Years of<br>
                            Excellence
                        </span>

                    </div>

                </div>

            </div>


            <div class="col-lg-6 reveal">

                <div class="section-heading text-start">

                    <span class="section-label">
                        ABOUT SANKALP
                    </span>

                    <h2>
                        Where Every Meal
                        <span>Tells a Story</span>
                    </h2>

                </div>


                <p class="about-text">

                    At Sankalp, we believe that food is more than
                    just a meal. It is an experience that brings
                    people together.

                </p>


                <p class="about-text">

                    Our kitchen combines traditional flavors with
                    modern culinary techniques to create dishes
                    that are delicious, fresh and memorable.

                </p>


                <div class="about-features">

                    <div class="about-feature">

                        <i class="fa-solid fa-leaf"></i>

                        <div>
                            <h5>Fresh Ingredients</h5>
                            <p>Quality ingredients every day.</p>
                        </div>

                    </div>


                    <div class="about-feature">

                        <i class="fa-solid fa-utensils"></i>

                        <div>
                            <h5>Expert Chefs</h5>
                            <p>Passionately prepared dishes.</p>
                        </div>

                    </div>

                </div>


                <a href="#menu" class="text-link">

                    Discover Our Menu

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     STATS
========================================================= -->

<section class="stats-section">

    <div class="container">

        <div class="row text-center g-4">

            <div class="col-6 col-lg-3">

                <div class="stat-item">

                    <i class="fa-solid fa-bowl-food"></i>

                    <h3 class="counter" data-target="50">
                        0
                    </h3>

                    <p>
                        Delicious Dishes
                    </p>

                </div>

            </div>


            <div class="col-6 col-lg-3">

                <div class="stat-item">

                    <i class="fa-solid fa-users"></i>

                    <h3 class="counter" data-target="10000">
                        0
                    </h3>

                    <p>
                        Happy Customers
                    </p>

                </div>

            </div>


            <div class="col-6 col-lg-3">

                <div class="stat-item">

                    <i class="fa-solid fa-award"></i>

                    <h3 class="counter" data-target="15">
                        0
                    </h3>

                    <p>
                        Years Experience
                    </p>

                </div>

            </div>


            <div class="col-6 col-lg-3">

                <div class="stat-item">

                    <i class="fa-solid fa-star"></i>

                    <h3 class="counter" data-target="4">
                        0
                    </h3>

                    <p>
                        Star Experience
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     MENU SECTION
========================================================= -->

<section id="menu" class="menu-section section-padding">

    <div class="container">

        <div class="section-heading text-center reveal">

            <span class="section-label">
                OUR SPECIALITIES
            </span>

            <h2>
                Explore Our
                <span>Popular Menu</span>
            </h2>

            <p>
                Carefully prepared dishes made with fresh
                ingredients and authentic flavors.
            </p>

        </div>


        <div class="row g-4 mt-4">

            <!-- Menu 1 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
                            alt="Indian Snacks">

                        <span class="food-badge">
                            Popular
                        </span>

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Traditional Starters
                            </h4>

                            <span>
                                ₹249
                            </span>

                        </div>

                        <p>
                            Crispy and flavorful starters
                            prepared with authentic spices.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Menu 2 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=85"
                            alt="Indian Rice Dish">

                        <span class="food-badge">
                            Chef's Choice
                        </span>

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Signature Rice
                            </h4>

                            <span>
                                ₹299
                            </span>

                        </div>

                        <p>
                            Aromatic rice prepared with
                            delicious herbs and spices.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Menu 3 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=85"
                            alt="Restaurant Special Dish">

                        <span class="food-badge">
                            Special
                        </span>

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Sankalp Special
                            </h4>

                            <span>
                                ₹399
                            </span>

                        </div>

                        <p>
                            Our signature creation prepared
                            specially by our chefs.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Menu 4 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=85"
                            alt="Paneer Dish">

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Paneer Delights
                            </h4>

                            <span>
                                ₹329
                            </span>

                        </div>

                        <p>
                            Soft paneer cooked in rich
                            traditional gravy.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Menu 5 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=85"
                            alt="Indian Curry">

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Signature Curries
                            </h4>

                            <span>
                                ₹349
                            </span>

                        </div>

                        <p>
                            Rich, creamy and flavorful
                            curries made from fresh ingredients.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Menu 6 -->

            <div class="col-md-6 col-lg-4 reveal">

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85"
                            alt="Dessert">

                        <span class="food-badge">
                            Sweet
                        </span>

                    </div>


                    <div class="food-content">

                        <div class="food-title">

                            <h4>
                                Sweet Endings
                            </h4>

                            <span>
                                ₹199
                            </span>

                        </div>

                        <p>
                            Delicious desserts to complete
                            your dining experience.
                        </p>

                        <a href="#contact">
                            Order Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>

                    </div>

                </div>

            </div>

        </div>


        <div class="text-center mt-5">

            <a href="${pageContext.request.contextPath}/login.jsp"
               class="btn-primary-custom">

                View Full Menu

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </div>

    </div>

</section>


<!-- =========================================================
     WHY CHOOSE US
========================================================= -->

<section id="why-us" class="why-section section-padding">

    <div class="container">

        <div class="section-heading text-center reveal">

            <span class="section-label">
                WHY SANKALP
            </span>

            <h2>
                More Than Just
                <span>Food</span>
            </h2>

            <p>
                We create experiences that keep our guests
                coming back for more.
            </p>

        </div>


        <div class="row g-4 mt-4">

            <div class="col-md-6 col-lg-3 reveal">

                <div class="why-card">

                    <div class="why-icon">
                        <i class="fa-solid fa-leaf"></i>
                    </div>

                    <h4>
                        Fresh Ingredients
                    </h4>

                    <p>
                        We use carefully selected fresh
                        ingredients for every dish.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3 reveal">

                <div class="why-card">

                    <div class="why-icon">
                        <i class="fa-solid fa-hat-chef"></i>
                    </div>

                    <h4>
                        Expert Chefs
                    </h4>

                    <p>
                        Our chefs bring passion and
                        experience to every plate.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3 reveal">

                <div class="why-card">

                    <div class="why-icon">
                        <i class="fa-solid fa-heart"></i>
                    </div>

                    <h4>
                        Made With Love
                    </h4>

                    <p>
                        Every dish is prepared with care,
                        passion and attention to detail.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3 reveal">

                <div class="why-card">

                    <div class="why-icon">
                        <i class="fa-solid fa-face-smile"></i>
                    </div>

                    <h4>
                        Great Service
                    </h4>

                    <p>
                        Friendly service and a comfortable
                        dining experience.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     GALLERY
========================================================= -->

<section id="gallery" class="gallery-section section-padding">

    <div class="container">

        <div class="section-heading text-center reveal">

            <span class="section-label">
                OUR GALLERY
            </span>

            <h2>
                A Feast for
                <span>Your Eyes</span>
            </h2>

        </div>


        <div class="gallery-grid mt-5">

            <div class="gallery-item gallery-large reveal">

                <img
                    src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85"
                    alt="Restaurant Food">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>


            <div class="gallery-item reveal">

                <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=85"
                    alt="Restaurant Interior">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>


            <div class="gallery-item reveal">

                <img
                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=85"
                    alt="Dining Experience">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>


            <div class="gallery-item reveal">

                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85"
                    alt="Delicious Food">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>


            <div class="gallery-item reveal">

                <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=85"
                    alt="Restaurant Table">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     CTA
========================================================= -->

<section class="cta-section">

    <div class="cta-overlay"></div>

    <div class="container">

        <div class="cta-content reveal">

            <span class="section-label">
                YOUR TABLE IS WAITING
            </span>

            <h2>
                Good Food.
                <span>Good Mood.</span>
                Great Memories.
            </h2>

            <p>
                Come and experience the taste of Sankalp.
            </p>

            <a href="#contact" class="btn-primary-custom">

                Reserve Your Table

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </div>

    </div>

</section>


<!-- =========================================================
     CONTACT
========================================================= -->

<section id="contact" class="contact-section section-padding">

    <div class="container">

        <div class="row g-5">

            <div class="col-lg-5 reveal">

                <div class="section-heading text-start">

                    <span class="section-label">
                        CONTACT US
                    </span>

                    <h2>
                        Let's Make Your
                        <span>Visit Special</span>
                    </h2>

                </div>


                <p class="contact-description">

                    Have a question, want to make a reservation,
                    or simply want to say hello? We'd love to hear
                    from you.

                </p>


                <div class="contact-info">

                    <div class="contact-item">

                        <div class="contact-icon">
                            <i class="fa-solid fa-location-dot"></i>
                        </div>

                        <div>
                            <span>Visit Us</span>
                            <p>
                                Sankalp Restaurant<br>
                                Maharashtra, India
                            </p>
                        </div>

                    </div>


                    <div class="contact-item">

                        <div class="contact-icon">
                            <i class="fa-solid fa-phone"></i>
                        </div>

                        <div>
                            <span>Call Us</span>
                            <p>
                                +91 98765 43210
                            </p>
                        </div>

                    </div>


                    <div class="contact-item">

                        <div class="contact-icon">
                            <i class="fa-solid fa-envelope"></i>
                        </div>

                        <div>
                            <span>Email Us</span>
                            <p>
                                info@sankalprestaurant.com
                            </p>
                        </div>

                    </div>


                    <div class="contact-item">

                        <div class="contact-icon">
                            <i class="fa-solid fa-clock"></i>
                        </div>

                        <div>
                            <span>Opening Hours</span>
                            <p>
                                Monday - Sunday<br>
                                11:00 AM - 11:00 PM
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            <div class="col-lg-7 reveal">

                <div class="reservation-card">

                    <div class="reservation-header">

                        <span class="section-label">
                            RESERVATION
                        </span>

                        <h3>
                            Book Your Table
                        </h3>

                        <p>
                            Reserve your table and enjoy
                            an unforgettable dining experience.
                        </p>

                    </div>


                    <form id="reservationForm">

                        <div class="row g-3">

                            <div class="col-md-6">

                                <label>
                                    Your Name
                                </label>

                                <div class="input-wrapper">

                                    <i class="fa-solid fa-user"></i>

                                    <input
                                        type="text"
                                        id="guestName"
                                        placeholder="Enter your name"
                                        required>

                                </div>

                            </div>


                            <div class="col-md-6">

                                <label>
                                    Phone Number
                                </label>

                                <div class="input-wrapper">

                                    <i class="fa-solid fa-phone"></i>

                                    <input
                                        type="tel"
                                        id="guestPhone"
                                        placeholder="Enter phone number"
                                        required>

                                </div>

                            </div>


                            <div class="col-md-6">

                                <label>
                                    Date
                                </label>

                                <div class="input-wrapper">

                                    <i class="fa-regular fa-calendar"></i>

                                    <input
                                        type="date"
                                        id="bookingDate"
                                        required>

                                </div>

                            </div>


                            <div class="col-md-6">

                                <label>
                                    Time
                                </label>

                                <div class="input-wrapper">

                                    <i class="fa-regular fa-clock"></i>

                                    <input
                                        type="time"
                                        id="bookingTime"
                                        required>

                                </div>

                            </div>


                            <div class="col-12">

                                <label>
                                    Number of Guests
                                </label>

                                <div class="input-wrapper">

                                    <i class="fa-solid fa-users"></i>

                                    <select id="guestCount" required>

                                        <option value="">
                                            Select guests
                                        </option>

                                        <option value="1">
                                            1 Guest
                                        </option>

                                        <option value="2">
                                            2 Guests
                                        </option>

                                        <option value="3">
                                            3 Guests
                                        </option>

                                        <option value="4">
                                            4 Guests
                                        </option>

                                        <option value="5">
                                            5 Guests
                                        </option>

                                        <option value="6">
                                            6 Guests
                                        </option>

                                        <option value="7">
                                            7 Guests
                                        </option>

                                        <option value="8">
                                            8 Guests
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div class="col-12">

                                <label>
                                    Special Request
                                </label>

                                <textarea
                                    id="specialRequest"
                                    rows="3"
                                    placeholder="Any special request?"></textarea>

                            </div>


                            <div class="col-12">

                                <button
                                    type="submit"
                                    class="btn-primary-custom w-100">

                                    <i class="fa-regular fa-calendar-check"></i>

                                    Request Reservation

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     FOOTER
========================================================= -->

<footer class="footer" id="footer">

    <div class="container">

        <div class="row g-5">

            <div class="col-lg-4">

                <div class="footer-brand">

                    <div class="brand-logo">
                        <i class="fa-solid fa-utensils"></i>
                    </div>

                    <div>

                        <span class="brand-name">
                            Sankalp
                        </span>

                        <span class="brand-subtitle">
                            RESTAURANT
                        </span>

                    </div>

                </div>


                <p class="footer-description">

                    Bringing people together through delicious
                    food, warm hospitality and memorable
                    experiences.

                </p>


                <div class="social-links">

                    <a href="#" aria-label="Facebook">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="#" aria-label="Instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>

                    <a href="#" aria-label="Twitter">
                        <i class="fa-brands fa-x-twitter"></i>
                    </a>

                    <a href="#" aria-label="YouTube">
                        <i class="fa-brands fa-youtube"></i>
                    </a>

                </div>

            </div>


            <div class="col-6 col-lg-2">

                <h5>
                    Quick Links
                </h5>

                <ul class="footer-links">

                    <li>
                        <a href="#home">Home</a>
                    </li>

                    <li>
                        <a href="#about">About</a>
                    </li>

                    <li>
                        <a href="#menu">Menu</a>
                    </li>

                    <li>
                        <a href="#gallery">Gallery</a>
                    </li>

                    <li>
                        <a href="#contact">Contact</a>
                    </li>

                </ul>

            </div>


            <div class="col-6 col-lg-2">

                <h5>
                    Restaurant
                </h5>

                <ul class="footer-links">

                    <li>
                        <a href="#menu">Our Menu</a>
                    </li>

                    <li>
                        <a href="#why-us">Why Us</a>
                    </li>

                    <li>
                        <a href="#contact">Reservations</a>
                    </li>

                    <li>
                        <a href="#">Privacy</a>
                    </li>

                    <li>
                        <a href="#">Terms</a>
                    </li>

                </ul>

            </div>


            <div class="col-lg-4">

                <h5>
                    Opening Hours
                </h5>

                <div class="opening-hours">

                    <div>
                        <span>
                            Monday - Friday
                        </span>

                        <strong>
                            11:00 AM - 11:00 PM
                        </strong>
                    </div>


                    <div>
                        <span>
                            Saturday - Sunday
                        </span>

                        <strong>
                            10:00 AM - 11:30 PM
                        </strong>
                    </div>

                </div>

            </div>

        </div>


        <div class="footer-bottom">

            <p>
                © <span id="currentYear"></span>
                Sankalp Restaurant.
                All Rights Reserved.
            </p>

            <p>
                Crafted with
                <i class="fa-solid fa-heart"></i>
                for food lovers.
            </p>

        </div>

    </div>

</footer>


<!-- =========================================================
     BACK TO TOP
========================================================= -->

<button id="backToTop" class="back-to-top">

    <i class="fa-solid fa-arrow-up"></i>

</button>


<!-- =========================================================
     RESERVATION SUCCESS MODAL
========================================================= -->

<div
    class="modal fade"
    id="reservationModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content reservation-success">

            <div class="success-icon">

                <i class="fa-solid fa-check"></i>

            </div>

            <h3>
                Reservation Request Sent!
            </h3>

            <p>
                Thank you for choosing Sankalp.
                Our team will contact you shortly
                to confirm your reservation.
            </p>

            <button
                type="button"
                class="btn-primary-custom"
                data-bs-dismiss="modal">

                Continue

            </button>

        </div>

    </div>

</div>


<!-- Bootstrap JS -->

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>


<!-- Landing JS -->

<script
    src="${pageContext.request.contextPath}/js/landing.js">
</script>


</body>

</html>