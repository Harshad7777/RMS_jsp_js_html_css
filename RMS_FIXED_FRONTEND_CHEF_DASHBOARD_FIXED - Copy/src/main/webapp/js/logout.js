function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
        localStorage.removeItem("chefId");

    window.location.href = "login.jsp";

}