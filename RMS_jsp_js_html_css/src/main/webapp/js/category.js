const API="http://localhost:8080/api/category";

var token=localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.jsp";
}


document.addEventListener("DOMContentLoaded",loadCategories);

// Load Categories
function loadCategories(){

fetch(API,{

headers:{
Authorization:"Bearer "+token
}

})

.then(res=>res.json())

.then(data=>{

let rows="";

data.forEach(c=>{

rows+=`

<tr>

<td>${c.categoryId}</td>

<td>${c.categoryName}</td>

<td>${c.description}</td>

<td>${c.status}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editCategory(
${c.categoryId},
'${c.categoryName}',
'${c.description}',
'${c.status}'
)">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteCategory(${c.categoryId})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("categoryTable").innerHTML=rows;

});

}

// Save

function saveCategory(){

const category={

categoryName:document.getElementById("categoryName").value,

description:document.getElementById("description").value,

status:document.getElementById("status").value

};

fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:"Bearer "+token

},

body:JSON.stringify(category)

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

clearForm();

loadCategories();

});

}

// Edit

function editCategory(id,name,description,status){

document.getElementById("categoryId").value=id;

document.getElementById("categoryName").value=name;

document.getElementById("description").value=description;

document.getElementById("status").value=status;

}

// Update

function updateCategory(){

const id=document.getElementById("categoryId").value;

const category={

categoryId:id,

categoryName:document.getElementById("categoryName").value,

description:document.getElementById("description").value,

status:document.getElementById("status").value

};

fetch(API+"/"+id,{

method:"PUT",

headers:{

"Content-Type":"application/json",

Authorization:"Bearer "+token

},

body:JSON.stringify(category)

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

clearForm();

loadCategories();

});

}

// Delete

function deleteCategory(id){

if(confirm("Delete Category?")){

fetch(API+"/"+id,{

method:"DELETE",

headers:{

Authorization:"Bearer "+token

}

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

loadCategories();

});

}

}

// Clear

function clearForm(){

document.getElementById("categoryId").value="";

document.getElementById("categoryName").value="";

document.getElementById("description").value="";

document.getElementById("status").value="ACTIVE";

}