window.addEventListener("load", () => {
    let $brand = document.querySelector("#brand")
    let $brandError = document.querySelector("#brandError")
    let regExAlpha = /^[a-zA-Z0-9\sñáéíóúü ]{3,25}$/
    let $submitError = document.querySelector("#submitError")
    let $form = document.querySelector('#form')
    
    $brand.addEventListener("blur", () => {
        switch (true){
            case !$brand.value.trim():
            $brandError.innerText = "Ingrese nombre";
            $brand.classList.add('is-invalid')
            break;
            case !regExAlpha.test($brand.value):
                $brandError.innerText = "Marca invalida";
                $brand.classList.add('is-invalid')
                break;
            default:
                $brandError.innerText = ""
                $brand.classList.remove('is-invalid');
                $brand.classList.add('is-valid');
        }
    })
    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0; 

        if(errores) {
            $submitError.innerText = "Datos incorrectos"
        } else {
            $form.submit()
        }
     })
})