const currentUser =
JSON.parse(localStorage.getItem("user"));

if(!currentUser){

alert("Please Login First");

window.location.href =
"login.html";

}

const cartDiv =
document.getElementById("cartItems");

fetch(
`https://ecommerce-store-bj5z.onrender.com/cart/${currentUser.user._id}`
)

.then(response =>
response.json()
)

.then(cartItems => {

let total = 0;

cartDiv.innerHTML = "";

cartItems.forEach(item => {

total +=
item.productId.price *
item.quantity;

cartDiv.innerHTML += `

<div
style="
border:1px solid #ccc;
padding:15px;
margin:10px;
">

<img
src="${item.productId.image}"
width="120"

>

<h3>

${item.productId.name}

</h3>

<p>

₹${item.productId.price}

</p>

<p>

Quantity:

<button
onclick="
decreaseQuantity(
'${item._id}',
${item.quantity}
)
">

*

</button>

${item.quantity}

<button
onclick="
increaseQuantity(
'${item._id}',
${item.quantity}
)
">

*

</button>

</p>

<hr>

</div>

`;

});

cartDiv.innerHTML += `

<hr>

<h1>

TOTAL:
₹${total}

</h1>

<input

id="address"

placeholder=
"Enter Delivery Address"

style="
width:300px;
padding:10px;
"

>

<br><br>

<button
onclick="payNow()"
class="pay-btn"
>

Place Order • Proceed To Payment

</button>
`;

})

.catch(error=>{

console.log(error);

});

async function increaseQuantity(
cartId,
quantity
){

await fetch(

`https://ecommerce-store-bj5z.onrender.com/cart/${cartId}`,

{

method:"PUT",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

quantity:
quantity+1

})

}

);

location.reload();

}

async function decreaseQuantity(
cartId,
quantity
){

if(quantity<=1){

await fetch(

`https://ecommerce-store-bj5z.onrender.com/cart/${cartId}`,

{

method:"DELETE"

}

);

location.reload();

return;

}

await fetch(

`https://ecommerce-store-bj5z.onrender.com/cart/${cartId}`,

{

method:"PUT",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

quantity:
quantity-1

})

}

);

location.reload();

}

async function payNow() {

const address =
document.getElementById(
"address"
).value;

if(!address){

alert(
"Enter Delivery Address"
);

return;

}

try{

const response =
await fetch(

`https://ecommerce-store-bj5z.onrender.com/cart/${currentUser.user._id}`

);

const cartItems =
await response.json();

for(const item of cartItems){

await fetch(

"https://ecommerce-store-bj5z.onrender.com/orders",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

userId:
currentUser.user._id,

productId:
item.productId._id,

quantity:
item.quantity,

address:
address

})

}

);

await fetch(

`https://ecommerce-store-bj5z.onrender.com/cart/${item._id}`,

{

method:"DELETE"

}

);

}

alert(
"Order Placed Successfully 🎉"
);

/* redirect to orders page */

window.location.href =
"orders.html";

}

catch(error){

console.log(error);

alert(
"Order Failed"
);

}

}