document.addEventListener("DOMContentLoaded", function () {


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");


    if (!token || !userId) {

        alert("Please Login First");
        window.location.href = "login.jsp";
        return;

    }


    const API = "http://localhost:8080/api/users/" + userId;



    // ==========================
    // Load Profile
    // ==========================

    loadProfile();


    function loadProfile() {


        fetch(API, {

            method:"GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        })


        .then(async response => {


            console.log("Status:", response.status);


            if(!response.ok){

                const text = await response.text();

                console.log(text);

                throw new Error("HTTP "+response.status);

            }


            return response.json();


        })


        .then(user => {


            console.log(user);



            document.getElementById("fullName").value =
                user.fullName || "";



            document.getElementById("profileUsername").value =
                user.username || "";



            document.getElementById("email").value =
                user.email || "";



            document.getElementById("mobile").value =
                user.mobile || "";


        })


        .catch(error=>{


            console.error(error);

            alert("Unable to load profile");


        });


    }







    // ==========================
    // Update Profile
    // ==========================


    document
    .getElementById("profileForm")
    .addEventListener("submit",function(e){


        e.preventDefault();



        const user = {


            fullName:
            document.getElementById("fullName").value,


            username:
            document.getElementById("profileUsername").value,


            email:
            document.getElementById("email").value,


            mobile:
            document.getElementById("mobile").value,


            role:
            localStorage.getItem("role"),


            status:"ACTIVE"


        };



        fetch(API, {


            method:"PUT",


            headers:{


                "Content-Type":"application/json",


                "Authorization":
                "Bearer "+token


            },


            body:JSON.stringify(user)


        })


        .then(response=>{


            if(!response.ok){

                throw new Error();

            }


            return response.text();


        })


        .then(message=>{


            alert(message);


            localStorage.setItem(
                "username",
                user.username
            );


        })


        .catch(error=>{


            console.log(error);

            alert("Profile Update Failed");


        });



    });







    // ==========================
    // Change Password
    // ==========================


    document
    .getElementById("passwordForm")
    .addEventListener("submit",function(e){


        e.preventDefault();



        const newPassword =
        document.getElementById("newPassword").value;



        const confirmPassword =
        document.getElementById("confirmPassword").value;



        if(newPassword !== confirmPassword){


            alert("Passwords do not match");

            return;

        }





        fetch(API,{

            headers:{

                "Authorization":
                "Bearer "+token

            }


        })


        .then(response=>response.json())


        .then(user=>{


            user.password = newPassword;


            return fetch(API,{


                method:"PUT",


                headers:{


                    "Content-Type":"application/json",


                    "Authorization":
                    "Bearer "+token


                },


                body:JSON.stringify(user)



            });



        })



        .then(response=>{


            if(!response.ok){

                throw new Error();

            }


            return response.text();


        })


        .then(message=>{


            alert(message);


            document
            .getElementById("passwordForm")
            .reset();


        })


        .catch(error=>{


            console.log(error);

            alert("Password Change Failed");


        });



    });



});