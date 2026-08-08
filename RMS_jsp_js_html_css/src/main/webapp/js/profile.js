"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");

    // =====================================================
    // LOGIN CHECK
    // =====================================================

    if (!token) {

        alert("Please Login First");

        window.location.href = "login.jsp";

        return;
    }


    // =====================================================
    // API
    // =====================================================

    const PROFILE_API =
        "http://localhost:8080/api/users/profile";

    const CHANGE_PASSWORD_API =
        "http://localhost:8080/api/users/profile/change-password";


    // =====================================================
    // LOAD PROFILE
    // =====================================================

    loadProfile();


    function loadProfile() {

        fetch(PROFILE_API, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        })

        .then(async response => {

            console.log(
                "Profile Status:",
                response.status
            );


            // ---------------------------------------------
            // SESSION EXPIRED
            // ---------------------------------------------

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                localStorage.removeItem("token");

                alert(
                    "Session expired. Please login again."
                );

                window.location.href = "login.jsp";

                return;
            }


            // ---------------------------------------------
            // OTHER ERROR
            // ---------------------------------------------

            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Profile Error:",
                    errorText
                );

                throw new Error(
                    "Unable to load profile"
                );
            }


            return response.json();

        })

        .then(user => {

            if (!user) {
                return;
            }


            console.log(
                "PROFILE DATA:",
                user
            );


            // =================================================
            // DATABASE -> JAVASCRIPT
            // =================================================

            document.getElementById(
                "fullName"
            ).value =
                user.fullName || "";


            document.getElementById(
                "profileUsername"
            ).value =
                user.username || "";


            document.getElementById(
                "email"
            ).value =
                user.email || "";


            document.getElementById(
                "mobile"
            ).value =
                user.mobile || "";


            // Save useful login information

            if (user.userId != null) {

                localStorage.setItem(
                    "userId",
                    user.userId
                );

            }


            if (user.username) {

                localStorage.setItem(
                    "username",
                    user.username
                );

            }


            if (user.role) {

                localStorage.setItem(
                    "role",
                    user.role
                );

            }

        })

        .catch(error => {

            console.error(
                "LOAD PROFILE ERROR:",
                error
            );

            alert(
                "Unable to load profile."
            );

        });

    }


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    document
        .getElementById("profileForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const fullName =
                    document
                        .getElementById("fullName")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const mobile =
                    document
                        .getElementById("mobile")
                        .value
                        .trim();


                // -----------------------------------------
                // VALIDATION
                // -----------------------------------------

                if (fullName === "") {

                    alert(
                        "Full Name is required."
                    );

                    return;
                }


                // -----------------------------------------
                // PROFILE OBJECT
                // -----------------------------------------

                const profile = {

                    fullName: fullName,

                    email: email,

                    mobile: mobile

                };


                console.log(
                    "UPDATE PROFILE:",
                    profile
                );


                // -----------------------------------------
                // API CALL
                // -----------------------------------------

                fetch(PROFILE_API, {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify(profile)

                })

                .then(async response => {

                    const text =
                        await response.text();


                    console.log(
                        "Update Status:",
                        response.status
                    );


                    console.log(
                        "Update Response:",
                        text
                    );


                    // -------------------------------------
                    // SESSION EXPIRED
                    // -------------------------------------

                    if (
                        response.status === 401 ||
                        response.status === 403
                    ) {

                        localStorage.removeItem(
                            "token"
                        );

                        alert(
                            "Session expired. Please login again."
                        );

                        window.location.href =
                            "login.jsp";

                        return;
                    }


                    // -------------------------------------
                    // ERROR
                    // -------------------------------------

                    if (!response.ok) {

                        throw new Error(
                            text ||
                            "Profile update failed"
                        );

                    }


                    return text;

                })

                .then(message => {

                    if (!message) {
                        return;
                    }


                    alert(message);


                    // Update local storage

                    localStorage.setItem(
                        "username",
                        document
                            .getElementById(
                                "profileUsername"
                            )
                            .value
                    );

                })

                .catch(error => {

                    console.error(
                        "UPDATE PROFILE ERROR:",
                        error
                    );

                    alert(
                        error.message ||
                        "Profile Update Failed"
                    );

                });

            }
        );


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    document
        .getElementById("passwordForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const oldPassword =
                    document
                        .getElementById(
                            "oldPassword"
                        )
                        .value;


                const newPassword =
                    document
                        .getElementById(
                            "newPassword"
                        )
                        .value;


                const confirmPassword =
                    document
                        .getElementById(
                            "confirmPassword"
                        )
                        .value;


                // -----------------------------------------
                // VALIDATION
                // -----------------------------------------

                if (
                    oldPassword === "" ||
                    newPassword === "" ||
                    confirmPassword === ""
                ) {

                    alert(
                        "Please fill all password fields."
                    );

                    return;
                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;
                }


                // -----------------------------------------
                // PASSWORD OBJECT
                // -----------------------------------------

                const passwordData = {

                    oldPassword:
                        oldPassword,

                    newPassword:
                        newPassword,

                    confirmPassword:
                        confirmPassword

                };


                console.log(
                    "CHANGE PASSWORD REQUEST"
                );


                // -----------------------------------------
                // API CALL
                // -----------------------------------------

                fetch(
                    CHANGE_PASSWORD_API,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body:
                            JSON.stringify(
                                passwordData
                            )

                    }
                )

                .then(async response => {

                    const text =
                        await response.text();


                    console.log(
                        "Password Status:",
                        response.status
                    );


                    console.log(
                        "Password Response:",
                        text
                    );


                    // -------------------------------------
                    // SESSION EXPIRED
                    // -------------------------------------

                    if (
                        response.status === 401 ||
                        response.status === 403
                    ) {

                        localStorage.removeItem(
                            "token"
                        );

                        alert(
                            "Session expired. Please login again."
                        );

                        window.location.href =
                            "login.jsp";

                        return;
                    }


                    // -------------------------------------
                    // BAD REQUEST
                    // -------------------------------------

                    if (!response.ok) {

                        throw new Error(
                            text ||
                            "Password change failed"
                        );

                    }


                    return text;

                })

                .then(message => {

                    if (!message) {
                        return;
                    }


                    alert(message);


                    document
                        .getElementById(
                            "passwordForm"
                        )
                        .reset();

                })

                .catch(error => {

                    console.error(
                        "CHANGE PASSWORD ERROR:",
                        error
                    );

                    alert(
                        error.message ||
                        "Password Change Failed"
                    );

                });

            }
        );

});