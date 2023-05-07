let qs = (elemento) => {
    return document.querySelector(elemento);
}
window.addEventListener("load", () => {

let $inputUserName = qs('#userName'),
    $userNameErrors = qs('#userNameErrors'),
    $inputApellido = qs('#apellido'),
    $apellidoErrors = qs('#apellidoErrors'),
    $inputEmail = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $inputTel = qs('#tel'),
    $telErrors = qs('#telErrors'),
    $file = qs('#avatar'),
    $fileErrors = qs('#avatarErrors'),
    $form = qs('#formEdit')
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExTel = /^[-]?[0-9]+[\.]?[0-9]+$/,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $inputUserName.addEventListener("blur", () => {
        switch (true) {
            case !$inputUserName.value.trim():
                $userNameErrors.innerText = "El nombre es obligatorio";
                $inputUserName.classList.add("is-invalid");
                break;
            case !regExAlpha.test($inputUserName.value):
                $userNameErrors.innerText = "Ingrese solamente caracteres alfabeticos";
                $inputUserName.classList.add("is-invalid");
                break;
            default:
                $inputUserName.classList.remove("is-invalid");
                $inputUserName.classList.add("is-valid");
                $userNameErrors.innerText = "";
                break;
        }
    })

    $inputApellido.addEventListener('blur', () => {
        switch (true) {
            case !$inputApellido.value.trim():
                $apellidoErrors.innerText = 'El apellido es obligatorio'
                $inputApellido.classList.add('is-invalid')
                break;
            case !regExAlpha.test($inputApellido.value):
                $apellidoErrors.innerText = 'Ingrese solamente caracteres alfabeticos'
                $inputApellido.classList.add('is-invalid')  
                break; 
            default:
                $inputApellido.classList.remove('is-invalid');
                $inputApellido.classList.add('is-valid');
                $apellidoErrors.innerText = ''
                break;
        }
    })

    $inputEmail.addEventListener('blur', () => {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerText = 'El campo email es obligatorio';
                $inputEmail.classList.add('is-invalid')
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerText = 'Debe ingresar un email válido';
                $inputEmail.classList.add('is-invalid')
                break
            default:
                $inputEmail.classList.remove('is-invalid');
                $inputEmail.classList.add('is-valid');
                $emailErrors.innerText = ''
                break;
        }
    })
    
    $inputTel.addEventListener('blur', () => {
        switch (true) {
            case !$inputEmail.value == '':
                break;
            case !regExTel.test($inputTel.value):
                $telErrors.innerText = 'Debe ingresar un telefono válido';
                $inputTel.classList.add('is-invalid')
                break
            default:
                $inputTel.classList.remove('is-invalid');
                $inputTel.classList.add('is-valid');
                $telErrors.innerText = ''
                break;
        }
    })

    

    $form.addEventListener("submit", (event) => {
       event.preventDefault();

        if($inputUserName && $inputApellido && $inputEmail === "") {
           element.classList.add("is-invalid")
        }

       let elementosConErrores = document.querySelectorAll(".is-invalid");
       let errores = elementosConErrores.length > 0; 

       if(errores) {
           submitErrors.innerText = "Los campos señalados son obligatorios"
       } else {
           $form.submit()
       }
    })


    $file.addEventListener('change', () => {
        let filePath = $file.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }
    })
})