document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const user = {
        fullName: document.getElementById("fullName").value.trim(),
        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = { message: text };
        }

        if (response.ok) {
            alert(result.message || "Registration Successful");
            window.location.href = "login.jsp";
        } else {
            alert(result.message || "Registration Failed");
            console.error(result);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server Error");
    }
});