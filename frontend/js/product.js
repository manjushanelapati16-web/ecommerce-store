const currentUser =
JSON.parse(
localStorage.getItem(
"user"
));

const productDiv =
document.getElementById(
"product"
);

fetch(
"https://ecommerce-store-bj5z.onrender.com/products"
)

.then(
response=>
response.json()
)

.then(
products=>{

const params=

new URLSearchParams(
window.location.search
);

const productId=

params.get(
"id"
);

const product=

products.find(
p=>
p._id===productId
);

if(!product){

productDiv.innerHTML=

"<h2>Product Not Found</h2>";

return;

}

productDiv.innerHTML=`

<img
src="${product.image}"
width="300"

>

<h2>

${product.name}

</h2>

<p>

Brand:
${product.brand}

</p>

<p>

⭐ ${product.rating}

</p>

<p>

₹${product.price}

</p>

<p>

${product.discount}% OFF

</p>

<p>

${product.description}

</p>

<button
id="addCartBtn"

>

Add To Cart

</button>

`;

const addBtn =

document.getElementById(
"addCartBtn"
);

addBtn.addEventListener(

"click",

async()=>{

if(
!currentUser
){

alert(
"Please Login First"
);

window.location=

"login.html";

return;

}

try{

await fetch(

"https://ecommerce-store-bj5z.onrender.com/cart",

{

method:

"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

userId:

currentUser.user._id,

productId:

product._id,

quantity:1

})

}

);

alert(
"Product Added To Cart"
);

window.location=

"cart.html";

}

catch(error){

console.log(
error
);

alert(
"Failed To Add"
);

}

}

);

}

)

.catch(
error=>{

console.log(
error
);

}
);
