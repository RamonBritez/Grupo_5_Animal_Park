/* 
○ Nombre
■ Obligatorio.
■ Deberá tener al menos 5 caracteres.
○ Descripción
■ Deberá tener al menos 20 caracteres.
○ Imagen
■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
*/


/*
● Login de usuarios (este ya lo deberían tener de sprints anteriores 😊☝️)
○ Email
■ Obligatorio.
■ Deberá ser válido.
■ (Opcional) → Debe existir en la base.
○ Contraseña
■ Obligatoria.
*/

const qs = (str) => document.querySelector(str)

window.addEventListener("load", () => {
    let form = qs("form")
    let productName = qs("#name")
    let productPrice = qs("#price")
    let productDiscount = qs("#discount")
    let productWeight = qs("#weight")
    let productDescription = qs("#description")

    let errorName = qs("#error-name")
    let errorPrice = qs("#error-price")
    let errorDiscount = qs("#error-discount")
    let errorWeight = qs("#error-weight")
    let errorDescription = qs("#error-description")

    let regExdescription = /^[a-zA-Z0-9\sñáéíóúü ]{10,350}$/ // Ex Reg acepta entre 10 y 350 caracteres alfanumericos
    //let regExPrecio = /^[0-9]{1,8}([.][0-9]{2})?$/
    let regExPrecio2 = /^[1-9]\d{0,7}(\.\d{1,2})?$/ //Precio acepta hasta 7 cifras y dos decimales
    let regExDiscount = /^[0-9]{1,2}$/ // Descuento acepta rango entre 0 y 99
    let regExWeight = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/ // Peso acepta 0 a 100 y hasta dos decimales

    productName.addEventListener("blur", () => {
        if (productName.value.length < 5) {
            errorName.innerText = "El nombre del producto debe tener mas de 5 caracteres"
        }
    })
    productName.addEventListener("focus", () => {
        errorName.innerText = ""
    })

    productPrice.addEventListener("blur", () => {
        if (!regExPrecio2.test(productPrice.value)) {
            errorPrice.innerText = "Precio no valido"
        }
    })
    productPrice.addEventListener("focus", () => {
        errorPrice.innerText = ""
    })

    productDiscount.addEventListener("blur", () => {
        if (!regExDiscount.test(productDiscount.value)) {
            errorDiscount.innerText = "Descuento no valido"
        }
    })
    productDiscount.addEventListener("focus", () => {
        errorDiscount.innerText = ""
    })

    productWeight.addEventListener("blur", () => {
        if (!regExWeight.test(productWeight.value)) {
            errorWeight.innerText = "Peso no valido"
        }
    })
    productWeight.addEventListener("focus", () => {
        errorWeight.innerText = ""
    })

    productDescription.addEventListener("blur", () => {
        if (!regExPrecio2.test(productDescription.value)) {
            errorDescription.innerText = "La descripcion del producto debe tener mas de 25 caracteres"
        }
    })

    productDescription.addEventListener("focus", () => {
        errorDescription.innerText = ""
    })

    form.addEventListener("submit", event => {
        let errores = false;
        event.preventDefault()
        if (productName.value.length < 5) {
            errores = true
        }
        if (!regExPrecio2.test(productPrice.value)) {
            errores = true
        }
        if (!regExDiscount.test(productDiscount.value)) {
            errores = true
        }
        if (!regExWeight.test(productWeight.value)) {
            errores = true
        }
        if (!regExPrecio2.test(productDescription.value)) {
            errores = true
        }

        if(!errores) {
            form.submit()
        }
    })
})