/* =========================================================
   SANKALP RESTAURANT
   LANDING PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("======================================");
    console.log("Sankalp Restaurant Landing Page");
    console.log("Landing page loaded successfully");
    console.log("======================================");


    initializeNavbar();

    initializeSmoothScroll();

    initializeScrollReveal();

    initializeCounters();

    initializeBackToTop();

    initializeReservation();

    initializeGallery();

    initializeCurrentYear();

    initializeBookingDate();

});


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    const navbar =
        document.getElementById("mainNavbar");

    if (!navbar) {
        return;
    }


    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const navbar =
                    document.getElementById(
                        "mainNavbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                /*
                 * Close Bootstrap mobile menu
                 */

                const navbarCollapse =
                    document.getElementById(
                        "navbarContent"
                    );


                if (
                    navbarCollapse &&
                    navbarCollapse.classList.contains("show")
                ) {

                    const collapseInstance =
                        bootstrap.Collapse.getInstance(
                            navbarCollapse
                        );


                    if (collapseInstance) {

                        collapseInstance.hide();

                    }

                }

            }
        );

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".counter");


    if (!counters.length) {
        return;
    }


    let countersStarted = false;


    const statsSection =
        document.querySelector(".stats-section");


    if (!statsSection) {
        return;
    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                if (
                    entries[0].isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(
                        animateCounter
                    );

                }

            },

            {
                threshold: 0.4
            }

        );


    observer.observe(statsSection);

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(counter) {

    const target =
        parseInt(
            counter.getAttribute(
                "data-target"
            ),
            10
        );


    if (isNaN(target)) {
        return;
    }


    let current = 0;


    const duration = 1800;

    const increment =
        target / (duration / 20);


    const timer =
        setInterval(function () {

            current += increment;


            if (current >= target) {

                current = target;

                clearInterval(timer);

            }


            if (target >= 1000) {

                counter.textContent =
                    Math.floor(current).toLocaleString() + "+";

            } else {

                counter.textContent =
                    Math.floor(current) + "+";

            }

        }, 20);

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   RESERVATION
========================================================= */

function initializeReservation() {

    const form =
        document.getElementById(
            "reservationForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "guestName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "guestPhone"
                ).value.trim();


            const date =
                document.getElementById(
                    "bookingDate"
                ).value;


            const time =
                document.getElementById(
                    "bookingTime"
                ).value;


            const guests =
                document.getElementById(
                    "guestCount"
                ).value;


            if (!name) {

                showFormError(
                    "Please enter your name."
                );

                return;

            }


            if (!phone) {

                showFormError(
                    "Please enter your phone number."
                );

                return;

            }


            if (!date) {

                showFormError(
                    "Please select a date."
                );

                return;

            }


            if (!time) {

                showFormError(
                    "Please select a time."
                );

                return;

            }


            if (!guests) {

                showFormError(
                    "Please select number of guests."
                );

                return;

            }


            console.log(
                "Reservation Request:",
                {
                    name: name,
                    phone: phone,
                    date: date,
                    time: time,
                    guests: guests,
                    request:
                        document.getElementById(
                            "specialRequest"
                        ).value.trim()
                }
            );


            /*
             * Currently this is a frontend reservation
             * demonstration.
             *
             * You can later connect this form to:
             *
             * POST /api/reservation
             *
             * in your Spring Boot backend.
             */


            const modalElement =
                document.getElementById(
                    "reservationModal"
                );


            if (modalElement) {

                const modal =
                    new bootstrap.Modal(
                        modalElement
                    );

                modal.show();

            }


            form.reset();

        }
    );

}


/* =========================================================
   FORM ERROR
========================================================= */

function showFormError(message) {

    alert(message);

}


/* =========================================================
   BOOKING DATE
========================================================= */

function initializeBookingDate() {

    const dateInput =
        document.getElementById(
            "bookingDate"
        );


    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const formattedDate =
        `${year}-${month}-${day}`;


    dateInput.min =
        formattedDate;

}


/* =========================================================
   GALLERY
========================================================= */

function initializeGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const image =
                    this.querySelector("img");


                if (!image) {
                    return;
                }


                openImagePreview(
                    image.src,
                    image.alt
                );

            }
        );

    });

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function openImagePreview(
    imageSrc,
    imageAlt
) {

    const existing =
        document.getElementById(
            "imagePreviewModal"
        );


    if (existing) {

        existing.remove();

    }


    const modalHtml = `

        <div
            class="modal fade"
            id="imagePreviewModal"
            tabindex="-1">

            <div
                class="modal-dialog modal-dialog-centered modal-xl">

                <div class="modal-content bg-dark border-0">

                    <div class="modal-header border-0">

                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal">
                        </button>

                    </div>

                    <div class="modal-body p-0">

                        <img
                            src="${escapeHtml(imageSrc)}"
                            alt="${escapeHtml(imageAlt)}"
                            style="
                                width:100%;
                                max-height:80vh;
                                object-fit:contain;
                            ">

                    </div>

                </div>

            </div>

        </div>

    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        modalHtml
    );


    const modalElement =
        document.getElementById(
            "imagePreviewModal"
        );


    const modal =
        new bootstrap.Modal(
            modalElement
        );


    modal.show();


    modalElement.addEventListener(
        "hidden.bs.modal",
        function () {

            modalElement.remove();

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

window.addEventListener(
    "scroll",
    function () {

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const navLinks =
            document.querySelectorAll(
                ".navbar-nav .nav-link"
            );


        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    },
    { passive: true }
);