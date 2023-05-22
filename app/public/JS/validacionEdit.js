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
    let $file = qs('#image')
    let $fileErrors = qs('#fileError')

    let regExAlpha = /^[a-zA-Z0-9\sñáéíóúü ]{3,25}$/ // Ex Reg acepta entre 3 y 25 caracteres alfanumericos
    let regExdescription = /^[a-zA-Z0-9\sñáéíóúü ]{10,350}$/ // Ex Reg acepta entre 10 y 350 caracteres alfanumericos
    //let regExPrecio = /^[0-9]{1,8}([.][0-9]{2})?$/
    let regExPrecio2 = /^[1-9]\d{0,7}(\.\d{1,2})?$/ //Precio acepta hasta 7 cifras y dos decimales
    let regExDiscount = /^[0-9]{1,2}$/ // Descuento acepta rango entre 0 y 99
    let regExweight = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/ // Peso acepta 0 a 100 y hasta dos decimales

    $name.addEventListener("blur", () => {
        switch (true){
            case !$name.value.trim():
            $nameError.innerText = "Nombre requerido";
            $name.classList.add('is-invalid')
            break;
            case !regExAlpha.test($name.value):
                $nameError.innerText = "Nombre Invalido";
                $name.classList.add('is-invalid')
                break;
            default:
                $nameError.innerText = ""
                $name.classList.remove('is-invalid');
                $name.classList.add('is-valid');
        }
    })
    $price.addEventListener("blur", () => {
        switch (true){
            case !$price.value.trim():
            $priceError.innerText = "Precio requerido";
            $price.classList.add('is-invalid')
            break;
            case !regExPrecio2.test($price.value):
                $priceError.innerText = "Precio Invalido";
                $price.classList.add('is-invalid')
                break;
            default:
                $priceError.innerText = ""
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
        }
    })
    $description.addEventListener("blur", () => {
        switch (true){
            case !$description.value.trim():
            $descriptionError.innerText = "Descripcion requerida";
            $description.classList.add('is-invalid')
            break;
           case !regExdescription.test($description.value):
                $descriptionError.innerText = "Descripcion acepta entre 10 y 350 caracteres";
                $description.classList.add('is-invalid')
                break;
            default:
                $descriptionError.innerText = ""
                $description.classList.remove('is-invalid');
                $description.classList.add('is-valid');
        }
    })
    $discount.addEventListener("blur", () => {
        switch (true){
            case !$discount.value.trim():
            $discountError.innerText = "Se requiere un valor entre 0 y 99";
            $discount.classList.add('is-invalid')
            break;
           case !regExDiscount.test($discount.value):
                $discountError.innerText = "Descuento invalido. Rango 0-99";
                $discount.classList.add('is-invalid')
                break;
            default:
                $discountError.innerText = ""
                $discount.classList.remove('is-invalid');
                $discount.classList.add('is-valid');
        }
    })
    $weight.addEventListener("blur", () => {
        switch (true){
            case !$weight.value.trim():
            $weightError.innerText = "Se requiere un valor entre 0 y 100";
            $weight.classList.add('is-invalid')
           case !regExweight.test($weight.value):
                $weightError.innerText = "Maximo 100kg";
                $weight.classList.add('is-invalid')
                break;
            default:
                $weightError.innerText = ""
                $weight.classList.remove('is-invalid');
                $weight.classList.add('is-valid');
        }
    })

    $file.addEventListener('change', () => {
        let filePath = $file.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            return false;
        }
    })

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0; 

        if(errores) {
            $submitError.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
     })
})