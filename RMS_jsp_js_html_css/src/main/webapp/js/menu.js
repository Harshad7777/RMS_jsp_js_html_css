const MENU_API = "http://localhost:8080/api/menu";
const CATEGORY_API = "http://localhost:8080/api/category";
const IMAGE_PATH = "http://localhost:8080/uploads/";
const DEFAULT_IMAGE = "images/menu/default-food.jpg";


document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadMenu();

    const imageInput = document.getElementById("menuImage");

    if (imageInput) {
        imageInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                document.getElementById("previewImage").src =
                    URL.createObjectURL(this.files[0]);
            }
        });
    }
});
//filtermenu
function filterMenu() {

    let categoryId =
        document.getElementById("filterCategory").value;

    if (categoryId === "") {

        loadMenu();
        return;

    }

    fetch(MENU_API + "/category/" + categoryId, {

        headers: {

            "Authorization": "Bearer " + token

        }

    })

    .then(res => {

        if (!res.ok)
            throw new Error("Filter Failed");

        return res.json();

    })

    .then(data => {

        displayMenu(data);

    })

    .catch(err => {

        console.log(err);

    });

}

//Search Function


function searchMenu() {

    const text =
        document.getElementById("searchMenu")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll("#menuCardContainer .col-md-4");

    cards.forEach(card => {

        const title =
            card.querySelector(".card-title")
            .innerText
            .toLowerCase();

        if (title.includes(text)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}
// =================================================
// LOAD CATEGORY
// =================================================

function loadCategories() {

    fetch(CATEGORY_API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    .then(res => {

        if (!res.ok)
            throw new Error("Category Load Failed");

        return res.json();

    })

    .then(data => {

        let option = `<option value="">Select Category</option>`;
        let filterOption = `<option value="">All Categories</option>`;

        data.forEach(c => {

            option += `
                <option value="${c.categoryId}">
                    ${c.categoryName}
                </option>
            `;

            filterOption += `
                <option value="${c.categoryId}">
                    ${c.categoryName}
                </option>
            `;

        });

        document.getElementById("categoryId").innerHTML = option;
        document.getElementById("filterCategory").innerHTML = filterOption;

    })

    .catch(err => {

        console.log(err);

        alert("Unable to load categories");

    });

}
// =================================================
// LOAD MENU
// =================================================

function loadMenu() {

    console.log("Loading menu...");

    fetch(MENU_API, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {

        console.log("Status:", res.status);

        if (!res.ok) {
            throw new Error("Menu Load Failed");
        }

        return res.json();
    })
    .then(data => {

        console.log("Menu Data:", data);

        displayMenu(data);

    })
    .catch(err => {
        console.error(err);
    });
}






// =================================================
// DISPLAY MENU CARDS
// =================================================


function displayMenu(menuList){

	console.log("displayMenu() called");
	console.log(menuList);

	let container = document.getElementById("menuCardContainer");

	console.log("Container:", container);
	
let cards="";



menuList.forEach(m=>{


let img;


if (
    m.image &&
    m.image.trim() !== "" &&
    m.image !== "null" &&
    m.image !== "string"
) {

    img = IMAGE_PATH + m.image;

} else {

    img = "images/menu/default-food.jpg";

}





cards += `


<div class="col-md-4 mb-4">


<div class="card shadow h-100">


<img src="${img}"
     class="card-img-top menu-image"
     onerror="this.src='images/menu/default-food.jpg'">

style="
height:220px;
object-fit:cover;
border-radius:10px 10px 0 0;
">



<div class="card-body">



<h5 class="card-title">

${m.itemName}

</h5>




<p>
<b>Category:</b>
${m.category?.categoryName ?? m.categoryName ?? ""}
</p>



<p>

<b>Description:</b>

${m.description ?? ""}

</p>




<h4 class="text-success">

₹ ${m.price}

</h4>




<span class="badge bg-primary">

${m.status}

</span>



<div class="d-flex justify-content-between mt-3">

<button class="btn btn-warning w-48"
onclick='editMenu(${JSON.stringify(m).replace(/'/g,"&#39;")})'>
<i class="fa fa-edit"></i> Edit
</button>

<button class="btn btn-danger w-48"
onclick="deleteMenu(${m.itemId})">
<i class="fa fa-trash"></i> Delete
</button>

</div>




</div>


</div>


</div>



`;



});




console.log("Cards Length:", cards.length);
console.log(cards);

document.getElementById("menuCardContainer").innerHTML = cards;

console.log(
    "After Insert:",
    document.getElementById("menuCardContainer").innerHTML.length
);


}







// =================================================
// SAVE MENU
// =================================================


function saveMenu(){


let formData = new FormData();



formData.append(
"itemName",
document.getElementById("itemName").value
);



formData.append(
"categoryId",
document.getElementById("categoryId").value
);



formData.append(
"description",
document.getElementById("description").value
);



formData.append(
"price",
document.getElementById("price").value
);



formData.append(
"status",
document.getElementById("status").value
);




let image =
document.getElementById("menuImage").files[0];



if(image){

formData.append("image",image);

}




fetch(MENU_API,{

method:"POST",

headers:{

"Authorization":
"Bearer "+token

},

body:formData


})


.then(res=>res.text())


.then(msg=>{


alert(msg);

clearForm();

loadMenu();


})


.catch(err=>{


console.log(err);


});


}







// =================================================
// EDIT MENU
// =================================================


function editMenu(m){



document.getElementById("itemId").value =
m.itemId;



document.getElementById("itemName").value =
m.itemName;



document.getElementById("categoryId").value =
m.categoryId;



document.getElementById("description").value =
m.description ?? "";



document.getElementById("price").value =
m.price;



document.getElementById("status").value =
m.status;



document.getElementById("menuImage").value="";





if (
    m.image &&
    m.image !== "" &&
    m.image !== "null"
) {

    document.getElementById("previewImage").src =
        IMAGE_PATH + m.image;

} else {

    document.getElementById("previewImage").src =
        "images/menu/default-food.jpg";

}

}


// =================================================
// UPDATE MENU
// =================================================


function updateMenu(){


let id =
document.getElementById("itemId").value;



let formData = new FormData();



formData.append(
"itemName",
document.getElementById("itemName").value
);



formData.append(
"categoryId",
document.getElementById("categoryId").value
);



formData.append(
"description",
document.getElementById("description").value
);



formData.append(
"price",
document.getElementById("price").value
);



formData.append(
"status",
document.getElementById("status").value
);




let image =
document.getElementById("menuImage").files[0];



if(image){

formData.append("image",image);

}




fetch(MENU_API+"/"+id,{

method:"PUT",

headers:{

"Authorization":
"Bearer "+token

},

body:formData


})


.then(res=>res.text())


.then(msg=>{


alert(msg);

clearForm();

loadMenu();


})


.catch(err=>console.log(err));


}







// =================================================
// DELETE MENU
// =================================================


function deleteMenu(id){



if(!confirm("Delete this menu item?"))
return;




fetch(MENU_API+"/"+id,{

method:"DELETE",

headers:{

"Authorization":
"Bearer "+token

}


})


.then(res=>res.text())


.then(msg=>{


alert(msg);

loadMenu();


})


.catch(err=>console.log(err));



}








// =================================================
// CLEAR FORM
// =================================================


function clearForm(){


document.getElementById("itemId").value="";


document.getElementById("itemName").value="";


document.getElementById("categoryId").selectedIndex=0;


document.getElementById("description").value="";


document.getElementById("price").value="";


document.getElementById("status").value="AVAILABLE";


document.getElementById("menuImage").value="";



document.getElementById("previewImage").src =
"images/menu/default-food.jpg";


}