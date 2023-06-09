/* Selector de imágenes */

function myFunction(imgs) {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg");
  // Use the same src in the expanded image as the image being clicked on from the grid
  expandImg.src = imgs.src;
}



/* FUENTE: https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp */


/* Contador de cantidad de productos */
function formatPrice(price) {
  return price.toFixed(2);
}


let counter = 1
let $count = document.getElementById('count');
let final = Number(document.getElementById("price").firstChild.data)
let total = document.getElementById("totalFinal")
let descuento = undefined

if (document.getElementById("discount")) {
  descuento = Number(document.getElementById("discount").firstChild.data)
}


function add() {
  if (counter <= 10) {
    counter = counter + 1
    $count.innerHTML = `<p>${counter}</p>`
    if (descuento != undefined) {
      total.innerHTML = `<span>$${formatPrice((final - (final * descuento / 100)) * counter)}</span>`
    } else {
      total.innerHTML = `<span>$${formatPrice((final * counter))}</span>`
    }

  }
  // 
}

function subtract() {
  if (counter > 0) {
    counter = counter - 1
    $count.innerHTML = `<p>${counter}</p>`
    if (descuento != undefined) {
      total.innerHTML = `<span>$${formatPrice(((1 + counter) * (final - (final * descuento / 100))) - (final - (final * descuento / 100)))}</span>`
    } else {
      total.innerHTML = `<span>$${formatPrice(((1 + counter) * final) - final)}</span>`
    }
  }
}

let form = document.querySelector("form#cart")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  // Traemos el carrito
  if (!sessionStorage.getItem("cart")) {
    sessionStorage.setItem("cart", JSON.stringify([]))
  }

  let id = Number(window.location.pathname.split("/").pop())

  // Lo parseamos
  let cart = JSON.parse(sessionStorage.getItem("cart"))

  let productInCart = cart.find(value => value.id == id)

  // Si ya tiene el producto, le suma la cantidad
  if (productInCart) {
    let updatedCart = cart.map(cartItem => {
      if (cartItem.id === id) {
        return {
          id: Number(cartItem.id),
          quantity: cartItem.quantity + counter
        }
      }
      return {
        ...cartItem
      }
    })

    sessionStorage.setItem("cart", JSON.stringify(updatedCart))
  } else {
    cart.push({
      id: Number(id),
      quantity: counter
    })
    sessionStorage.setItem("cart", JSON.stringify(cart))
  }
})