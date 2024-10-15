import menuItems from "./data.js"

const mainEl = document.getElementById("menu-items")
const modal = document.getElementById("modal")
const orderBtn = document.getElementById("complete-order")
const payModal = document.getElementById("pay-modal")
const orderComplete = document.getElementById("order-complete")
const payOrder = document.getElementById("pay-modal-btn")
const submitOrder = document.getElementById("pay-form")

let order = []

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        addToOrder(e.target.dataset.add)
        setOrderDisplay()
        setTotalPrice()
    } else if (e.target.dataset.remove){
        console.log(e.target.dataset.remove)
        removeFromOrder(e.target.dataset.remove)
        setTotalPrice()
    }  else if(e.target.id === "complete-order"){
        console.log("checking out")
        showModal()
    }
})



function addToOrder(id){
    const {name, price} = menuItems[id]
    order.push({name: name, price: price})
}

submitOrder.addEventListener("submit", (e)=>{
    e.preventDefault()
    const submitOrderData = new FormData(submitOrder)
    const name = submitOrderData.get('fullName')
    console.log(name)
    hideModal(name)
})

function removeFromOrder(idx){

    idx = Number(idx)

    if(idx > -1){
        order.splice(idx, 1)
    }
    
    console.log(order)
    setOrderDisplay()

}

//need to set total price with reduce
function setTotalPrice(){
const totalPrice = order.reduce((accumulator, item) => {
    return accumulator += item.price;
  }, 0)
  document.getElementById("total-price").innerHTML = `<span class="total-price-price">Total Price:</span> <span class="total-price-total">$${totalPrice}</span>`
}


function setOrderDisplay(){
    let orderHTML = []
    if(order.length > 0){
        modal.style.display = "block"
    } else {
        modal.style.display = "none"
    }
  
    
    
    order.map((el, i) =>{
        orderHTML.push(`<li class="order-submit">
        <span class="order-submit-name">${el.name}</span> 
        <span class="remove" data-remove="${i}">remove</span> 
        <span class="order-submit-price">$${el.price}</span>
        </li>
        `)
    })
    document.getElementById("your-order").innerHTML = orderHTML.join("")
}

//show modal
function showModal(){
    payModal.style.display = "block"
}

function hideModal(el){
    
    payModal.style.display = "none"
    modal.style.display = "block"
    let bodyText = `<div class="order-complete" id="order-complete"><p class="order-complete-text">Thanks, ${el}! Your order is on its way!</p></div>`
    modal.innerHTML = bodyText
}

//render page on first load
function setMenu(arr){
    return arr.map((item)=> {
        return `
        <div class="order-item">
       
        <div class="order-item-emoji">${item.emoji}</div>
        <div class="order-item-description">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-ingredients">${item.ingredients.join(", ")}</div>
        <div class="order-item-price">$${item.price}</div>
        </div>
        <button id="${item.id}" data-add="${item.id}" class="order-btn">+</button>
        </div>
        `
    }).join("")
}

mainEl.innerHTML = setMenu(menuItems)






