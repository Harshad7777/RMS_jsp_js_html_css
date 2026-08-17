<div class="navbar">

    <div>
        <h3>Restaurant Management System</h3>
    </div>

    <div>

        Welcome,
        <strong id="username"></strong>

        |

        <span class="badge bg-success" id="role"></span>

    </div>

</div>
<script src="js/auth.js"></script>

<script>

document.getElementById("username").innerHTML =
localStorage.getItem("username");

document.getElementById("role").innerHTML =
localStorage.getItem("role");

</script>