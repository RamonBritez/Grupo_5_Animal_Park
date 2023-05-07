let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener("load", () => {
    let $name = qs("#name")
    let $nameError = qs("#nameError")
    let $price = qs("#price")
    let $priceError = qs("#priceError")
    let $weight = qs("#weight")
    let $weightError = qs("#weightError")
    let $description = qs("#description")
    let $descriptionError = qs("#descriptionError")
    let $discount = qs("#discount")
    let $discountError = qs("#discountError")
    let $submitError = qs("#submitError")
    let $form = qs('#form')
    let regExAlpha = /^[a-zA-Z0-9\sñáéíóúü ]{3,25}$/
    let regExdescription = /^[a-zA-Z0-9\sñáéíóúü ]{10,350}$/
    //let regExPrecio = /^[0-9]{1,8}([.][0-9]{2})?$/
    let regExPrecio2 = /^[1-9]\d{0,7}(\.\d{1,2})?$/
    let regExDiscount = /^[0-9]{1,2}$/
    let regExweight = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/

    $name.addEventListener("blur", () => {
        switch (true){
            case !$name.value.trim():
            $nameError.innerText = "Nombre requerido";
            $name.style.backgroundColor = 'orange'
            break;
            case !regExAlpha.test($name.value):
                $nameError.innerText = "Nombre Invalido";
                $name.style.backgroundColor = 'orange'
                break;
            default:
                $nameError.innerText = ""
                $name.style.backgroundColor = 'white'
        }
    })
    $price.addEventListener("blur", () => {
        switch (true){
            case !$price.value.trim():
            $priceError.innerText = "Precio requerido";
            $price.style.backgroundColor = 'orange'
            break;
            case !regExPrecio2.test($price.value):
                $priceError.innerText = "Precio Invalido";
                $price.style.backgroundColor = 'orange'
                break;
            default:
                $priceError.innerText = ""
                $price.style.backgroundColor = 'white'
        }
    })
    $description.addEventListener("blur", () => {
        switch (true){
            case !$description.value.trim():
            $descriptionError.innerText = "Descripcion requerida";
            $description.style.backgroundColor = 'orange'
            break;
           case !regExdescription.test($description.value):
                $descriptionError.innerText = "Descripcion acepta entre 10 y 350 caracteres";
                $description.style.backgroundColor = 'orange'
                break;
            default:
                $descriptionError.innerText = ""
                $description.style.backgroundColor = 'white'
        }
    })
    $discount.addEventListener("blur", () => {
        switch (true){
            case !$discount.value.trim():
            $discountError.innerText = "Se requiere un valor entre 0 y 99";
            $discount.style.backgroundColor = 'orange'
            break;
           case !regExDiscount.test($discount.value):
                $discountError.innerText = "Descuento invalido. Rango 0-99";
                $discount.style.backgroundColor = 'orange'
                break;
            default:
                $discountError.innerText = ""
                $discount.style.backgroundColor = 'white'
        }
    })
    $weight.addEventListener("blur", () => {
        switch (true){
            case !$weight.value.trim():
            $weightError.innerText = "Se requiere un valor entre 0 y 100";
            $weight.style.backgroundColor = 'orange'
            break;
           case !regExweight.test($weight.value):
                $weightError.innerText = "Maximo 100kg";
                $weight.style.backgroundColor = 'orange'
                break;
            default:
                $weightError.innerText = ""
                $weight.style.backgroundColor = 'white'
        }
    })
    $form.addEventListener("submit", (event) => {
        event.preventDefault();
       /* const FORM_ELEMENTS = event.target.elements;

        for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
            const element = FORM_ELEMENTS[index];
            if(element.value === "" && element.type !== "file") {
                element.classList.add("is-invalid")
            }
            // element.dispatchEvent(new Event("blur")) 
        }*/

      

        let elementosConErrores = document.querySelectorAll(".text-error");
        let errores = elementosConErrores.length > 0; 

        if(errores) {
            $submitError.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
     })
})