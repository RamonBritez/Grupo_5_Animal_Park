/* Selector de imágenes */

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
}



  /* FUENTE: https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp */

  /* Contador de cantidad de productos */
let counter = 1
let $count = document.getElementById('count');
let final = Number(document.getElementById("price").firstChild.data)
let total = document.getElementById("totalFinal")
  console.log(final)

  function add () {
    if(counter <= 10) {
        counter = counter + 1
        $count.innerHTML = `<p>${counter}</p>`
        total.innerHTML= `<span>$${final * counter}</span>`
    }
// 
  }

  function subtract () {
    if(counter > 0) {
        counter = counter - 1
        $count.innerHTML = `<p>${counter}</p>`
        total.innerHTML= `<span>$${((1 + counter) * final) - final}</span>`
        
    }
  }