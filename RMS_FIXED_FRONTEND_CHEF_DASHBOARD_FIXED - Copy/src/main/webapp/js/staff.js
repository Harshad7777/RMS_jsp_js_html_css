"use strict";

/* =========================================================
   SANKALP RMS
   STAFF + CHEF MANAGEMENT
   ADMIN EXCLUDED
========================================================= */

(function () {

    const API =
        "http://localhost:8080/api/users";


    let teamList = [];

    let editingUserId = null;

    let passwordUserId = null;


    /* =====================================================
       SELECTOR
    ===================================================== */

    const $ = (id) =>
        document.getElementById(id);


    /* =====================================================
       TOKEN
    ===================================================== */

    function getToken() {

        return (
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            ""
        );
    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       API REQUEST
    ===================================================== */

    async function request(url, options = {}) {

        console.log(
            "TEAM API REQUEST:",
            options.method || "GET",
            url
        );


        const headers = {
            Accept: "application/json"
        };


        const token =
            getToken();


        if (token) {

            headers.Authorization =
                "Bearer " + token;
        }


        if (options.body) {

            headers["Content-Type"] =
                "application/json";
        }


        let response;


        try {

            response =
                await fetch(
                    url,
                    {
                        ...options,
                        headers
                    }
                );

        } catch (error) {

            console.error(
                "FETCH ERROR:",
                error
            );

            throw new Error(
                "Cannot connect to Spring Boot backend at http://localhost:8080"
            );
        }


        const text =
            await response.text();


        console.log(
            "TEAM API STATUS:",
            response.status
        );


        console.log(
            "TEAM API RESPONSE:",
            text
        );


        let data = null;


        if (text) {

            try {

                data =
                    JSON.parse(text);

            } catch {

                data =
                    text;
            }
        }


        if (response.status === 401) {

            localStorage.removeItem("token");

            localStorage.removeItem("jwtToken");

            throw new Error(
                "Session expired. Please login again."
            );
        }


        if (response.status === 403) {

            throw new Error(
                "Access denied. ADMIN role is required."
            );
        }


        if (!response.ok) {

            let message =
                `HTTP ${response.status}`;


            if (
                typeof data === "string" &&
                data.trim()
            ) {

                message =
                    data;
            }


            if (
                data &&
                typeof data === "object"
            ) {

                message =
                    data.message ||
                    data.error ||
                    message;
            }


            throw new Error(
                message
            );
        }


        return data;
    }


    /* =====================================================
       MODAL OPEN
    ===================================================== */

    function openStaffModal() {

        const modal =
            $("staffModal");


        if (!modal) {

            console.error(
                "staffModal not found!"
            );

            return;
        }


        modal.classList.add("show");

        modal.style.display =
            "block";

        modal.removeAttribute(
            "aria-hidden"
        );

        modal.setAttribute(
            "aria-modal",
            "true"
        );

        document.body.classList.add(
            "modal-open"
        );


        createBackdrop(
            "staffModalBackdrop"
        );


        console.log(
            "Staff modal opened"
        );
    }


    /* =====================================================
       MODAL CLOSE
    ===================================================== */

    function closeStaffModal() {

        const modal =
            $("staffModal");


        if (!modal) {

            return;
        }


        modal.classList.remove(
            "show"
        );

        modal.style.display =
            "none";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        modal.removeAttribute(
            "aria-modal"
        );


        removeBackdrop(
            "staffModalBackdrop"
        );


        document.body.classList.remove(
            "modal-open"
        );
    }


    /* =====================================================
       PASSWORD MODAL OPEN
    ===================================================== */

    function openPasswordModal() {

        const modal =
            $("staffPasswordModal");


        if (!modal) {

            return;
        }


        modal.classList.add(
            "show"
        );

        modal.style.display =
            "block";

        modal.removeAttribute(
            "aria-hidden"
        );

        modal.setAttribute(
            "aria-modal",
            "true"
        );


        document.body.classList.add(
            "modal-open"
        );


        createBackdrop(
            "passwordModalBackdrop"
        );
    }


    /* =====================================================
       PASSWORD MODAL CLOSE
    ===================================================== */

    function closePasswordModal() {

        const modal =
            $("staffPasswordModal");


        if (!modal) {

            return;
        }


        modal.classList.remove(
            "show"
        );

        modal.style.display =
            "none";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        modal.removeAttribute(
            "aria-modal"
        );


        removeBackdrop(
            "passwordModalBackdrop"
        );


        document.body.classList.remove(
            "modal-open"
        );
    }


    /* =====================================================
       BACKDROP
    ===================================================== */

    function createBackdrop(id) {

        removeBackdrop(id);


        const backdrop =
            document.createElement(
                "div"
            );


        backdrop.id =
            id;

        backdrop.className =
            "staff-custom-backdrop";


        backdrop.addEventListener(
            "click",
            function () {

                if (
                    id ===
                    "staffModalBackdrop"
                ) {

                    closeStaffModal();

                } else {

                    closePasswordModal();
                }
            }
        );


        document.body.appendChild(
            backdrop
        );
    }


    function removeBackdrop(id) {

        const element =
            $(id);


        if (element) {

            element.remove();
        }
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initialize() {

        console.log(
            "======================================"
        );

        console.log(
            "Sankalp RMS - Staff / Chef Management"
        );

        console.log(
            "======================================"
        );


        const addButton =
            $("addStaffBtn");


        if (!addButton) {

            console.error(
                "ERROR: addStaffBtn not found!"
            );

        } else {

            addButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    console.log(
                        "ADD STAFF / CHEF CLICKED"
                    );

                    openAddUser();
                }
            );
        }


        const saveButton =
            $("saveStaffBtn");


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                saveUser
            );
        }


        const search =
            $("staffSearch");


        if (search) {

            search.addEventListener(
                "input",
                searchTeam
            );
        }


        const passwordButton =
            $("updateStaffPasswordBtn");


        if (passwordButton) {

            passwordButton.addEventListener(
                "click",
                updatePassword
            );
        }


        const closeStaff =
            $("closeStaffModalBtn");


        if (closeStaff) {

            closeStaff.addEventListener(
                "click",
                closeStaffModal
            );
        }


        const cancelStaff =
            $("cancelStaffModalBtn");


        if (cancelStaff) {

            cancelStaff.addEventListener(
                "click",
                closeStaffModal
            );
        }


        const closePassword =
            $("closePasswordModalBtn");


        if (closePassword) {

            closePassword.addEventListener(
                "click",
                closePasswordModal
            );
        }


        const cancelPassword =
            $("cancelPasswordModalBtn");


        if (cancelPassword) {

            cancelPassword.addEventListener(
                "click",
                closePasswordModal
            );
        }


        /* ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeStaffModal();

                    closePasswordModal();
                }
            }
        );


        loadTeam();
    }


    /* =====================================================
       OPEN ADD
    ===================================================== */

    function openAddUser() {

        editingUserId =
            null;


        clearForm();


        if ($("staffModalTitle")) {

            $("staffModalTitle").textContent =
                "Add Staff / Chef";
        }


        if ($("staffPasswordGroup")) {

            $("staffPasswordGroup").style.display =
                "block";
        }


        if ($("saveStaffBtn")) {

            $("saveStaffBtn").disabled =
                false;

            $("saveStaffBtn").innerHTML =
                `
                <i class="fa-solid fa-floppy-disk"></i>
                Save
                `;
        }


        openStaffModal();
    }


    /* =====================================================
       LOAD TEAM
    ===================================================== */

    async function loadTeam() {

        const table =
            $("staffTable");


        if (!table) {

            console.error(
                "staffTable not found"
            );

            return;
        }


        table.innerHTML =
            `
            <tr>

                <td
                    colspan="8"
                    class="loading-cell">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Loading staff and chefs...

                </td>

            </tr>
            `;


        try {

            const data =
                await request(API);


            if (!Array.isArray(data)) {

                throw new Error(
                    "Invalid response from /api/users"
                );
            }


            teamList =
                data.filter(
                    user => {

                        const role =
                            String(
                                user?.role ?? ""
                            )
                                .trim()
                                .toUpperCase();


                        return (
                            role === "STAFF" ||
                            role === "CHEF"
                        );
                    }
                );


            updateStatistics();


            renderTeam(
                teamList
            );


        } catch (error) {

            console.error(
                "LOAD TEAM ERROR:",
                error
            );


            teamList = [];


            updateStatistics();


            table.innerHTML =
                `
                <tr>

                    <td
                        colspan="8"
                        class="error-cell">

                        <i class="fa-solid fa-triangle-exclamation"></i>

                        <strong>
                            Unable to load team members
                        </strong>

                        <small>
                            ${escapeHtml(
                                error.message
                            )}
                        </small>

                    </td>

                </tr>
                `;
        }
    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function updateStatistics() {

        const total =
            teamList.length;


        const active =
            teamList.filter(
                user =>
                    String(
                        user?.status ?? ""
                    )
                        .trim()
                        .toUpperCase()
                    === "ACTIVE"
            ).length;


        const inactive =
            teamList.filter(
                user =>
                    String(
                        user?.status ?? ""
                    )
                        .trim()
                        .toUpperCase()
                    === "INACTIVE"
            ).length;


        if ($("totalStaff")) {

            $("totalStaff").textContent =
                total;
        }


        if ($("activeStaff")) {

            $("activeStaff").textContent =
                active;
        }


        if ($("inactiveStaff")) {

            $("inactiveStaff").textContent =
                inactive;
        }


        if ($("staffCount")) {

            $("staffCount").textContent =
                `${total} Members`;
        }
    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderTeam(list) {

        const table =
            $("staffTable");


        if (!table) {

            return;
        }


        if (!list.length) {

            table.innerHTML =
                `
                <tr>

                    <td
                        colspan="8"
                        class="empty-cell">

                        <i class="fa-solid fa-users-slash"></i>

                        No STAFF or CHEF users found.

                    </td>

                </tr>
                `;

            return;
        }


        table.innerHTML =
            list
                .map(
                    user => {

                        const role =
                            String(
                                user?.role ?? ""
                            )
                                .trim()
                                .toUpperCase();


                        const status =
                            String(
                                user?.status ??
                                "ACTIVE"
                            )
                                .trim()
                                .toUpperCase();


                        const roleClass =
                            role === "CHEF"
                                ? "chef"
                                : "staff";


                        const avatarIcon =
                            role === "CHEF"
                                ? "fa-utensils"
                                : "fa-user";


                        const statusClass =
                            status === "ACTIVE"
                                ? "active"
                                : "inactive";


                        const statusButtonClass =
                            status === "ACTIVE"
                                ? "btn-danger"
                                : "btn-success";


                        const statusIcon =
                            status === "ACTIVE"
                                ? "fa-user-slash"
                                : "fa-user-check";


                        return `
                        <tr>

                            <td class="text-center">
                                ${Number(user.userId)}
                            </td>


                            <td>

                                <div class="staff-person">

                                    <div
                                        class="staff-avatar ${roleClass}">

                                        <i
                                            class="fa-solid ${avatarIcon}">
                                        </i>

                                    </div>

                                    <strong>
                                        ${escapeHtml(
                                            user.fullName || "-"
                                        )}
                                    </strong>

                                </div>

                            </td>


                            <td>
                                ${escapeHtml(
                                    user.username || "-"
                                )}
                            </td>


                            <td>
                                ${escapeHtml(
                                    user.mobile || "-"
                                )}
                            </td>


                            <td>
                                ${escapeHtml(
                                    user.email || "-"
                                )}
                            </td>


                            <td class="text-center">

                                <span
                                    class="staff-role ${roleClass}">

                                    ${escapeHtml(role)}

                                </span>

                            </td>


                            <td class="text-center">

                                <span
                                    class="staff-status ${statusClass}">

                                    ${escapeHtml(status)}

                                </span>

                            </td>


                            <td class="text-center">

                                <button
                                    type="button"
                                    class="staff-action edit"
                                    title="Edit ${escapeHtml(role)}"
                                    onclick="window.editTeamUser(${Number(user.userId)})">

                                    <i class="fa-solid fa-pen-to-square"></i>

                                </button>


                                <button
                                    type="button"
                                    class="staff-action password"
                                    title="Change Password"
                                    onclick="window.openTeamPassword(${Number(user.userId)})">

                                    <i class="fa-solid fa-key"></i>

                                </button>


                                <button
                                    type="button"
                                    class="staff-action ${statusButtonClass}"
                                    title="${
                                        status === "ACTIVE"
                                            ? "Deactivate"
                                            : "Activate"
                                    }"
                                    onclick="window.toggleTeamStatus(
                                        ${Number(user.userId)},
                                        '${status}'
                                    )">

                                    <i
                                        class="fa-solid ${statusIcon}">
                                    </i>

                                </button>

                            </td>

                        </tr>
                        `;
                    }
                )
                .join("");
    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function searchTeam(event) {

        const query =
            event.target.value
                .trim()
                .toLowerCase();


        if (!query) {

            renderTeam(
                teamList
            );

            if ($("staffCount")) {

                $("staffCount").textContent =
                    `${teamList.length} Members`;
            }

            return;
        }


        const filtered =
            teamList.filter(
                user => {

                    const text =
                        `
                        ${user?.fullName || ""}
                        ${user?.username || ""}
                        ${user?.mobile || ""}
                        ${user?.email || ""}
                        ${user?.role || ""}
                        ${user?.status || ""}
                        `.toLowerCase();


                    return text.includes(
                        query
                    );
                }
            );


        renderTeam(
            filtered
        );


        if ($("staffCount")) {

            $("staffCount").textContent =
                `${filtered.length} Members`;
        }
    }


    /* =====================================================
       EDIT USER
    ===================================================== */

    window.editTeamUser =
        async function (id) {

            try {

                const user =
                    await request(
                        `${API}/${id}`
                    );


                if (!user) {

                    throw new Error(
                        "User not found."
                    );
                }


                const role =
                    String(
                        user.role ?? ""
                    )
                        .trim()
                        .toUpperCase();


                if (
                    role !== "STAFF" &&
                    role !== "CHEF"
                ) {

                    throw new Error(
                        "Only STAFF and CHEF users can be managed here."
                    );
                }


                editingUserId =
                    Number(
                        user.userId
                    );


                $("staffUserId").value =
                    user.userId || "";


                $("staffFullName").value =
                    user.fullName || "";


                $("staffUsername").value =
                    user.username || "";


                $("staffPassword").value =
                    "";


                $("staffMobile").value =
                    user.mobile || "";


                $("staffEmail").value =
                    user.email || "";


                $("staffRole").value =
                    role;


                $("staffStatus").value =
                    user.status ||
                    "ACTIVE";


                $("staffModalTitle").textContent =
                    `Edit ${role}`;


                $("staffPasswordGroup").style.display =
                    "none";


                $("saveStaffBtn").innerHTML =
                    `
                    <i class="fa-solid fa-pen-to-square"></i>
                    Update
                    `;


                openStaffModal();


            } catch (error) {

                console.error(
                    "EDIT ERROR:",
                    error
                );

                alert(
                    error.message
                );
            }
        };


    /* =====================================================
       SAVE USER
    ===================================================== */

    async function saveUser() {

        const fullName =
            $("staffFullName")?.value.trim() || "";


        const username =
            $("staffUsername")?.value.trim() || "";


        const password =
            $("staffPassword")?.value || "";


        const mobile =
            $("staffMobile")?.value.trim() || "";


        const email =
            $("staffEmail")?.value.trim() || "";


        const role =
            String(
                $("staffRole")?.value || "STAFF"
            )
                .trim()
                .toUpperCase();


        const status =
            String(
                $("staffStatus")?.value || "ACTIVE"
            )
                .trim()
                .toUpperCase();


        if (!fullName) {

            alert(
                "Full Name is required."
            );

            return;
        }


        if (!username) {

            alert(
                "Username is required."
            );

            return;
        }


        if (
            role !== "STAFF" &&
            role !== "CHEF"
        ) {

            alert(
                "Role must be STAFF or CHEF."
            );

            return;
        }


        if (
            status !== "ACTIVE" &&
            status !== "INACTIVE"
        ) {

            alert(
                "Invalid status."
            );

            return;
        }


        const button =
            $("saveStaffBtn");


        /* =================================================
           CREATE
        ================================================= */

        if (!editingUserId) {

            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            const payload = {

                fullName,
                username,
                password,
                role,
                mobile,
                email,
                status
            };


            try {

                if (button) {

                    button.disabled = true;

                    button.innerHTML =
                        `
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        Saving...
                        `;
                }


                const result =
                    await request(
                        `${API}/register`,
                        {
                            method: "POST",

                            body:
                                JSON.stringify(
                                    payload
                                )
                        }
                    );


                alert(
                    result?.message ||
                    `${role} Added Successfully`
                );


                closeStaffModal();


                clearForm();


                await loadTeam();


            } catch (error) {

                console.error(
                    "CREATE ERROR:",
                    error
                );

                alert(
                    error.message
                );


            } finally {

                if (button) {

                    button.disabled = false;

                    button.innerHTML =
                        `
                        <i class="fa-solid fa-floppy-disk"></i>
                        Save
                        `;
                }
            }


            return;
        }


        /* =================================================
           UPDATE
        ================================================= */

        const payload = {

            userId:
                editingUserId,

            fullName,
            username,
            role,
            mobile,
            email,
            status
        };


        try {

            if (button) {

                button.disabled = true;

                button.innerHTML =
                    `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Updating...
                    `;
            }


            const result =
                await request(
                    `${API}/${editingUserId}`,
                    {
                        method: "PUT",

                        body:
                            JSON.stringify(
                                payload
                            )
                    }
                );


            alert(
                typeof result === "string"
                    ? result
                    : (
                        result?.message ||
                        `${role} Updated Successfully`
                    )
            );


            closeStaffModal();


            clearForm();


            await loadTeam();


        } catch (error) {

            console.error(
                "UPDATE ERROR:",
                error
            );

            alert(
                error.message
            );


        } finally {

            if (button) {

                button.disabled = false;

                button.innerHTML =
                    `
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save
                    `;
            }
        }
    }


    /* =====================================================
       PASSWORD
    ===================================================== */

    window.openTeamPassword =
        function (id) {

            passwordUserId =
                Number(id);


            if ($("newStaffPassword")) {

                $("newStaffPassword").value =
                    "";
            }


            openPasswordModal();
        };


    async function updatePassword() {

        if (!passwordUserId) {

            alert(
                "Invalid user ID."
            );

            return;
        }


        const password =
            $("newStaffPassword")?.value || "";


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        const button =
            $("updateStaffPasswordBtn");


        try {

            if (button) {

                button.disabled = true;

                button.innerHTML =
                    `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Updating...
                    `;
            }


            const result =
                await request(
                    `${API}/${passwordUserId}/password`,
                    {
                        method: "PUT",

                        body:
                            JSON.stringify({
                                password
                            })
                    }
                );


            alert(
                typeof result === "string"
                    ? result
                    : (
                        result?.message ||
                        "Password Updated Successfully"
                    )
            );


            closePasswordModal();


            $("newStaffPassword").value =
                "";


        } catch (error) {

            console.error(
                "PASSWORD ERROR:",
                error
            );

            alert(
                error.message
            );


        } finally {

            if (button) {

                button.disabled = false;

                button.innerHTML =
                    `
                    <i class="fa-solid fa-key"></i>
                    Update Password
                    `;
            }
        }
    }


    /* =====================================================
       STATUS
    ===================================================== */

    window.toggleTeamStatus =
        async function (
            id,
            currentStatus
        ) {

            const current =
                String(
                    currentStatus
                )
                    .trim()
                    .toUpperCase();


            const next =
                current === "ACTIVE"
                    ? "INACTIVE"
                    : "ACTIVE";


            if (
                !confirm(
                    `Change user status to ${next}?`
                )
            ) {

                return;
            }


            try {

                const user =
                    await request(
                        `${API}/${id}`
                    );


                if (!user) {

                    throw new Error(
                        "User not found."
                    );
                }


                const payload = {

                    userId:
                        user.userId,

                    fullName:
                        user.fullName,

                    username:
                        user.username,

                    role:
                        user.role,

                    mobile:
                        user.mobile,

                    email:
                        user.email,

                    status:
                        next
                };


                const result =
                    await request(
                        `${API}/${id}`,
                        {
                            method: "PUT",

                            body:
                                JSON.stringify(
                                    payload
                                )
                        }
                    );


                alert(
                    typeof result === "string"
                        ? result
                        : (
                            result?.message ||
                            "Status updated successfully"
                        )
                );


                await loadTeam();


            } catch (error) {

                console.error(
                    "STATUS ERROR:",
                    error
                );

                alert(
                    error.message
                );
            }
        };


    /* =====================================================
       CLEAR FORM
    ===================================================== */

    function clearForm() {

        editingUserId = null;


        if ($("staffUserId"))
            $("staffUserId").value = "";


        if ($("staffFullName"))
            $("staffFullName").value = "";


        if ($("staffUsername"))
            $("staffUsername").value = "";


        if ($("staffPassword"))
            $("staffPassword").value = "";


        if ($("staffMobile"))
            $("staffMobile").value = "";


        if ($("staffEmail"))
            $("staffEmail").value = "";


        if ($("staffRole"))
            $("staffRole").value = "STAFF";


        if ($("staffStatus"))
            $("staffStatus").value = "ACTIVE";


        if ($("staffPasswordGroup"))
            $("staffPasswordGroup").style.display = "block";


        if ($("staffModalTitle"))
            $("staffModalTitle").textContent = "Add Staff / Chef";
    }


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {
                once: true
            }
        );

    } else {

        initialize();
    }

})();