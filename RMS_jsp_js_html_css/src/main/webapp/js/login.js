document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Invalid Login");
        }

        return response.json();

    })

    .then(data => {
		console.log(data);   // <-- Add this
        // Save Login Details
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        alert("Login Successful");

        // Redirect according to role
        if (data.role === "ADMIN") {

            window.location.href = "dashboard.jsp";

        } else if (data.role === "STAFF") {

            window.location.href = "dashboard.jsp";

        } else {

            alert("Invalid Role");

        }

    })

    .catch(error => {

        console.log(error);

        document.getElementById("message").innerHTML =
            "Invalid Username or Password";

    });

});