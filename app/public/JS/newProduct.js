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
const qsa = (str) => document.querySelectorAll(str)

window.addEventListener("load", () => {
    let form = qs("form#newProductForm")
    let productName = qs("#name")
    let productPrice = qs("#price")
    let productDiscount = qs("#discount")
    let productWeight = qs("#weight")
    let productDescription = qs("#description")
    let productBrand = qs("#brand")
    let productBrandOptions = qsa("#brand option")
    let productPet = qs("#pet")
    let productPetOptions = qsa("#pet option")
    let productCategory = qs("#category")
    let productCategoryOptions = qsa("#category option")

    let errorName = qs("#error-name")
    let errorPrice = qs("#error-price")
    let errorDiscount = qs("#error-discount")
    let errorWeight = qs("#error-weight")
    let errorDescription = qs("#error-description")
    let errorBrand = qs("#error-brand")
    let errorPet = qs("#error-pet")
    let errorCategory = qs("#error-category")

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

    productBrand.addEventListener("blur", () => {
        let selected = false;
        productBrandOptions.forEach(brand => {
            if (brand.selected && !brand.hidden) {
                selected = true;
            }
        })
        if (selected) { return errorBrand.innerText = "" } else { return errorBrand.innerText = "Debes elegir una marca" }
    })
    productBrand.addEventListener("focus", () => {
        errorBrand.innerText = ""
    })

    productPet.addEventListener("blur", () => {
        let selected = false;
        productPetOptions.forEach(brand => {
            if (brand.selected && !brand.hidden) {
                selected = true;
            }
        })
        if (selected) { return errorPet.innerText = "" } else { return errorPet.innerText = "Debes elegir una marca" }
    })
    productPet.addEventListener("focus", () => {
        errorPet.innerText = ""
    })

    productCategory.addEventListener("blur", () => {
        let selected = false;
        productCategoryOptions.forEach(brand => {
            if (brand.selected && !brand.hidden) {
                selected = true;
            }
        })
        if (selected) { return errorCategory.innerText = "" } else { return errorCategory.innerText = "Debes elegir una marca" }
    })
    productCategory.addEventListener("focus", () => {
        errorCategory.innerText = ""
    })

    productDescription.addEventListener("blur", () => {
        if (productDescription.value.length < 25) {
            errorDescription.innerText = "La descripcion del producto debe tener mas de 25 caracteres"
        }
    })

    productDescription.addEventListener("focus", () => {
        errorDescription.innerText = ""
    })

    form.addEventListener("submit", event => {
        let errores = false;
        let brandSelected = false;
        let petSelected = false;
        let categorySelected = false;

        if (productName.value.length < 5) {
            errores = true
            errorName.innerText = "El nombre del producto debe tener mas de 5 caracteres"
        }
        if (!regExPrecio2.test(productPrice.value)) {
            errores = true
            errorPrice.innerText = "Precio no valido"
        }
        if (!regExDiscount.test(productDiscount.value)) {
            errores = true
            errorDiscount.innerText = "Descuento no valido"
        }
        if (!regExWeight.test(productWeight.value)) {
            errores = true
            errorWeight.innerText = "Peso no valido"
        }
        if (productDescription.value.length < 25) {
            errores = true
            errorDescription.innerText = "La descripcion del producto debe tener mas de 25 caracteres"
        }

        productBrandOptions.forEach(brand => {
            if (brand.selected && !brand.hidden) {
                brandSelected = true
            }
        })

        if (!brandSelected) {
            errores = true;
            errorBrand.innerText = "Debes elegir una marca"
        }

        productPetOptions.forEach(pet => {
            if (pet.selected && !pet.hidden) {
                petSelected = true
            }
        })

        if (!petSelected) {
            errores = true;
            errorPet.innerText = "Debes elegir una mascota"
        }

        productCategoryOptions.forEach(category => {
            if (category.selected && !category.hidden) {
                categorySelected = true
            }
        })

        if (!categorySelected) {
            errores = true;
            errorCategory.innerText = "Debes elegir una categoria"
        }

        if (errores) {
            event.preventDefault()
        } else {
            form.submit();
        }
    })
})