const BILL_API="http://localhost:8080/api/bill";

const billToken = localStorage.getItem("token");
if (!token) {
    alert("Please Login First");
    window.location.href = "login.jsp";
}

function loadBill(){

let id=document.getElementById("orderId").value;

if(id==""){

alert("Enter Order ID");

return;

}

fetch(BILL_API+"/"+id,{

headers:{

Authorization:"Bearer "+billtoken

}

})

.then(res=>{

if(!res.ok)

throw new Error();

return res.json();

})

.then(data=>{

document.getElementById("customerName").innerHTML=data.customerName;

document.getElementById("billDate").innerHTML=data.orderDate;

let rows="";

let subtotal=0;

data.items.forEach(item=>{

subtotal+=item.subtotal;

rows+=`

<tr>

<td>${item.itemName}</td>

<td>₹${item.price}</td>

<td>${item.quantity}</td>

<td>₹${item.subtotal}</td>

</tr>

`;

});

document.getElementById("billTable").innerHTML=rows;

document.getElementById("subTotal").innerHTML=subtotal;

let gst=subtotal*0.18;

document.getElementById("gst").innerHTML=gst.toFixed(2);

document.getElementById("grandTotal").innerHTML=(subtotal+gst).toFixed(2);

})

.catch(()=>{

alert("Bill Not Found");

});

}

function printBill(){

window.print();

}