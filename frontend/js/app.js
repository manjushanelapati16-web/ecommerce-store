const currentUser =
JSON.parse(
localStorage.getItem(
"user"
)
);

const userInfo =
document.getElementById(
"userInfo"
);

if(userInfo){

if(currentUser){

userInfo.innerHTML=`

<a href="profile.html">

👤
${currentUser.user.name}

</a>

`;

}

else{

userInfo.innerHTML=`

<a href="login.html">

🔐 Login

</a>

`;

}

}


fetch(
"http://localhost:5000/products"
)

.then(res=>res.json())

.then(products=>{

const productsDiv=
document.getElementById(
"products"
);

productsDiv.innerHTML="";


products.forEach(product=>{

productsDiv.innerHTML+=`

<div class="card">

<div class="heart">

❤️

</div>

<img
src="${product.image}"
>

<h2>

<a
href="product.html?id=${product._id}"
>

${product.name}

</a>

</h2>

<p>

${product.brand}

</p>

<p>

⭐ ${product.rating}

</p>

<h3>

₹${product.price}

</h3>

<p class="offer">

${product.discount}% OFF

</p>

<button
onclick="
window.location=
'product.html?id=${product._id}'
">

View Product

</button>

</div>

`;

});


document
.getElementById(
"search"
)

.addEventListener(

"input",

function(){

const value=
this.value
.toLowerCase();

document
.querySelectorAll(
".card"
)

.forEach(card=>{

card.style.display=

card
.innerText
.toLowerCase()

.includes(value)

?

"block"

:

"none";

});

}

);


})

.catch(error=>{

console.log(
error
);

});