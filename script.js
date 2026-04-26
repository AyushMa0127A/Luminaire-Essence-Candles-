let cart = [];

let selectedShape = "";
let selectedColour = "";
let selectedScent = "";

// OPEN CUSTOMIZER
function openCustomizer(shape){
selectedShape = shape;
selectedColour = "";
selectedScent = "";

document.getElementById("selected-shape").innerText = shape + " Candle";
showSection("custom");
}

// SELECT OPTIONS
function selectColour(col){ selectedColour = col; }
function selectScent(scent){ selectedScent = scent; }

// ADD PRODUCT
function addCustomToCart(){

if(!selectedColour || !selectedScent){
alert("Select colour and scent!");
return;
}

let name = `${selectedShape} Candle (${selectedColour}, ${selectedScent})`;
let price = 199;

let existing = cart.find(i => i.name === name);

if(existing){
existing.quantity++;
}else{
cart.push({name, price, quantity:1});
}

updateCart();
showSection("home");
}

// UPDATE CART
function updateCart(){
let box = document.getElementById("cart-items");
box.innerHTML = "";

let total = 0;

cart.forEach((item, index)=>{
total += item.price * item.quantity;

box.innerHTML += `
<div>
${item.name} x${item.quantity} = ₹${item.price * item.quantity}
<button onclick="inc(${index})">+</button>
<button onclick="dec(${index})">-</button>
</div>`;
});

document.getElementById("total").innerText = total;
document.getElementById("cart-count").innerText = cart.length;
}

function inc(i){ cart[i].quantity++; updateCart(); }
function dec(i){
cart[i].quantity--;
if(cart[i].quantity <= 0) cart.splice(i,1);
updateCart();
}

// NAVIGATION
function showSection(sec){
document.getElementById("home-section").style.display = (sec==="home") ? "block":"none";
document.getElementById("cart-section").style.display = (sec==="cart") ? "block":"none";
document.getElementById("custom-section").style.display = (sec==="custom") ? "block":"none";
document.getElementById("checkout-section").style.display = (sec==="checkout") ? "block":"none";
}

// SEARCH
function applySearch(){
let term = document.getElementById("search-bar").value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{
let name = card.innerText.toLowerCase();
card.style.display = name.includes(term) ? "block" : "none";
});
}

// PLACE ORDER (PREMIUM WHATSAPP RECEIPT)
function placeOrder(){

let name = document.getElementById("cust-name").value.trim();
let address = document.getElementById("cust-address").value.trim();
let phone = document.getElementById("cust-phone").value.trim();

if(cart.length === 0){
alert("Cart is empty!");
return;
}

if(!name || !address || !phone){
alert("Please fill all details!");
return;
}

if(!/^[0-9]{10}$/.test(phone)){
alert("Enter valid 10-digit phone number!");
return;
}

// CALCULATE TOTAL
let subtotal = 0;
let itemsText = "";

cart.forEach(item=>{
let itemTotal = item.price * item.quantity;
subtotal += itemTotal;

itemsText += `• ${item.name} x${item.quantity} = ₹${itemTotal}\n`;
});

// DELIVERY LOGIC
let delivery = 0;
if(subtotal < 500){
delivery = 150;
}

let finalTotal = subtotal + delivery;

// UNIQUE ORDER ID
let orderID = "LE" + Math.floor(Math.random()*1000000);

// MESSAGE
let message =
`🕯️ *Luminaire Essence - Order Receipt*\n\n` +
`🧾 Order ID: ${orderID}\n\n` +
`👤 Name: ${name}\n` +
`📞 Phone: ${phone}\n` +
`📍 Address: ${address}\n\n` +
`🛒 *Items:*\n${itemsText}\n` +
`Subtotal: ₹${subtotal}\n` +
`Delivery: ₹${delivery}\n` +
`💰 *Total Payable: ₹${finalTotal}*\n\n` +
`📲 Please confirm this order and complete payment on WhatsApp.`;

// WHATSAPP
let encodedMsg = encodeURIComponent(message);
let url = `https://wa.me/918100898956?text=${encodedMsg}`;
window.open(url, "_blank");

// RESET
cart = [];
updateCart();

document.getElementById("cust-name").value = "";
document.getElementById("cust-address").value = "";
document.getElementById("cust-phone").value = "";

showSection("home");
}

// INIT
document.addEventListener("DOMContentLoaded", ()=>{
updateCart();
});
