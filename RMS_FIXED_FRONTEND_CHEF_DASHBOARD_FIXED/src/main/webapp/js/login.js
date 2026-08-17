
"use strict";

/* =========================================================
   SANKALP RMS - LOGIN
   ========================================================= */

console.log("======================================");
console.log("Sankalp RMS Login JS Loaded");
console.log("======================================");


/* =========================================================
   LOGIN FORM
========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            /* -------------------------------------------------
               GET INPUT
            ------------------------------------------------- */

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const message =
                document.getElementById("message");


            if (!username || !password) {

                if (message) {

                    message.textContent =
                        "Username and password are required.";

                }

                return;

            }


            /* -------------------------------------------------
               LOGIN API
            ------------------------------------------------- */

            console.log("--------------------------------------");
            console.log("Login request started");
            console.log("Username:", username);


            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/auth/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    {
                                        username:
                                            username,

                                        password:
                                            password
                                    }
                                )

                        }
                    );


                const responseText =
                    await response.text();


                console.log(
                    "Login HTTP Status:",
                    response.status
                );


                console.log(
                    "Login Response:",
                    responseText
                );


                /* -------------------------------------------------
                   LOGIN FAILED
                ------------------------------------------------- */

                if (!response.ok) {

                    let errorMessage =
                        "Invalid Username or Password";


                    try {

                        const errorData =
                            JSON.parse(
                                responseText
                            );


                        if (
                            errorData.message
                        ) {

                            errorMessage =
                                errorData.message;

                        }

                    }
                    catch (e) {

                        // Ignore invalid error JSON

                    }


                    throw new Error(
                        errorMessage
                    );

                }


                /* -------------------------------------------------
                   PARSE RESPONSE
                ------------------------------------------------- */

                const data =
                    JSON.parse(
                        responseText
                    );


                console.log(
                    "LOGIN RESPONSE:",
                    data
                );


                /* -------------------------------------------------
                   VALIDATE RESPONSE
                ------------------------------------------------- */

                if (!data.token) {

                    throw new Error(
                        "Login successful but JWT token was not returned."
                    );

                }


                if (!data.userId) {

                    throw new Error(
                        "Login successful but user ID was not returned."
                    );

                }


                if (!data.role) {

                    throw new Error(
                        "Login successful but user role was not returned."
                    );

                }


                /* -------------------------------------------------
                   NORMALIZE ROLE
                ------------------------------------------------- */

                const role =
                    String(
                        data.role
                    )
                        .trim()
                        .toUpperCase();


                const userId =
                    data.userId;


                /* -------------------------------------------------
                   CLEAR OLD LOGIN DATA
                ------------------------------------------------- */

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "userId"
                );

                localStorage.removeItem(
                    "username"
                );

                localStorage.removeItem(
                    "role"
                );

                localStorage.removeItem(
                    "chefToken"
                );

                localStorage.removeItem(
                    "chefRole"
                );

                localStorage.removeItem(
                    "chefId"
                );


                /* -------------------------------------------------
                   SAVE LOGIN DATA
                ------------------------------------------------- */

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "userId",
                    String(userId)
                );


                localStorage.setItem(
                    "username",
                    data.username || username
                );


                localStorage.setItem(
                    "role",
                    role
                );


                /* -------------------------------------------------
                   CHEF LOGIN
                ------------------------------------------------- */

                if (role === "CHEF") {

                    localStorage.setItem(
                        "chefToken",
                        data.token
                    );


                    localStorage.setItem(
                        "chefRole",
                        role
                    );


                    localStorage.setItem(
                        "chefId",
                        String(userId)
                    );


                    console.log(
                        "Chef ID saved:",
                        userId
                    );

                }


                console.log(
                    "======================================"
                );

                console.log(
                    "LOGIN SUCCESS"
                );

                console.log(
                    "User ID:",
                    userId
                );

                console.log(
                    "Username:",
                    data.username
                );

                console.log(
                    "Role:",
                    role
                );

                console.log(
                    "Chef ID:",
                    localStorage.getItem(
                        "chefId"
                    )
                );

                console.log(
                    "======================================"
                );


                /* -------------------------------------------------
                   SUCCESS MESSAGE
                ------------------------------------------------- */

                if (message) {

                    message.textContent =
                        "Login Successful";

                }


                /* -------------------------------------------------
                   REDIRECT
                ------------------------------------------------- */

                if (role === "ADMIN") {

                    window.location.href =
                        "dashboard.jsp";

                }

                else if (role === "STAFF") {

                    window.location.href =
                        "dashboard.jsp";

                }

                else if (role === "CHEF") {

                    window.location.href =
                        "chef.jsp";

                }

                else {

                    throw new Error(
                        "Invalid Role: " +
                        role
                    );

                }

            }
            catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                if (message) {

                    message.textContent =
                        error.message ||
                        "Invalid Username or Password";

                }

            }

        }
    );

}
else {

    console.error(
        "loginForm element not found."
    );

}

