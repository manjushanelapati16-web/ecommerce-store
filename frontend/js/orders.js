const currentUser =
JSON.parse(
localStorage.getItem("user")
);

if(!currentUser){

alert(
"Please Login First"
);

window.location.href =
"login.html";

}

fetch(

`http://localhost:5000/orders/${currentUser.user._id}`

)

.then(
response =>
response.json()
)

.then(
orders=>{

const ordersDiv =

document.getElementById(
"orders"
);

ordersDiv.innerHTML="";

if(
orders.length===0
){

ordersDiv.innerHTML=
"<h2>No Orders Yet</h2>";

return;

}

orders.forEach(order=>{

ordersDiv.innerHTML += `

<div
style="
border:1px solid #ccc;
padding:20px;
margin:15px;
">

<img
src="${
order.productId?.image ||
'https://via.placeholder.com/150'
}"
width="150"

>

<h2>

${
order.productId?.name ||
"Product"
}

</h2>

<p>

₹${
order.productId?.price ||
0
}

</p>

<p>

Quantity:
${order.quantity}

</p>

<p>

Order ID:
${order._id}

</p>

<p>

Ordered:
${
new Date(
order.createdAt
).toLocaleDateString()
}

</p>

<p>

Delivered:
${
order.deliveryDate
?

new Date(
order.deliveryDate
).toLocaleDateString()

:

"Processing"

}

</p>

<p>

Status:
${
order.status
}

</p>
<p>

Address:

${order.address}

</p>


<button

onclick="cancelOrder('${order._id}')"

>

Cancel Order

</button>


</div>

`;

});

}

)

.catch(error=>{

console.log(
error
);

});
async function cancelOrder(

orderId

){

try{

await fetch(

`http://localhost:5000/orders/${orderId}`,

{

method:

"DELETE"

}

);

alert(

"Order Cancelled"

);

location.reload();

}

catch(error){

console.log(

error

);

}

}
