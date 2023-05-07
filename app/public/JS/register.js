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
    $inputPassword = qs('#password'),
    $passwordErrors = qs('#passwordErrors'),
    $inputRepeatPassword = qs('#repeatPassword'),
    $RepeatPasswordErrors = qs('#repeatPasswordErrors'),
    $terms = qs('#checkTerms'),
    $termsErrors = qs('#checkTermsErrors'),
    $file = qs('#avatar'),
    $fileErrors = qs('#avatarErrors'),
    $form = qs('#formRegister'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
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

    $inputPassword.addEventListener('blur', () => {
        switch (true) {
            case !$inputPassword.value.trim():
                $passwordErrors.innerText = 'La contraseña es obligatoria';
                $inputPassword.classList.add('is-invalid')
                break;
            case !regExPass.test($inputPassword.value):
                $passwordErrors.innerText = 'La contraseña debe tener: entre 6 a 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $inputPassword.classList.add('is-invalid')
                break
            default:
                $inputPassword.classList.remove('is-invalid');
                $inputPassword.classList.add('is-valid');
                $passwordErrors.innerText = ''
                break;
        }
    })

    $inputRepeatPassword.addEventListener('blur', () => {
        switch (true) {
            case !$inputRepeatPassword.value.trim():
                $RepeatPasswordErrors.innerText = 'Debes reingresar la contraseña';
                $inputRepeatPassword.classList.add('is-invalid')
                break;
            case $inputRepeatPassword.value != $inputPassword.value:
                $RepeatPasswordErrors.innerText = 'Las contraseñas no coinciden';
                $inputRepeatPassword.classList.add('is-invalid')
                break;
            default:
                $inputRepeatPassword.classList.remove('is-invalid');
                $inputRepeatPassword.classList.add('is-valid');
                $RepeatPasswordErrors.innerText = ''
                break;
        }
    })

    $terms.addEventListener('click', () => {
        $terms.value = 'on'
        $terms.classList.toggle('is-valid');
        $terms.classList.remove('is-invalid');
        $termsErrors.innerHTML = ""
    })

    $form.addEventListener("submit", (event) => {
       event.preventDefault();
       const FORM_ELEMENTS = event.target.elements;

       for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
           const element = FORM_ELEMENTS[index];
           if(element.value === "" && element.type !== "file") {
               element.classList.add("is-invalid")
           }
       }

       if(!$terms.checked){
           $terms.classList.add('is-invalid');
           $termsErrors.innerHTML = "Debes aceptar las bases y condiciones"
       }

       let elementosConErrores = document.querySelectorAll(".is-invalid");
       let errores = elementosConErrores.length > 0; 

       if(errores) {
           submitErrors.innerText = "Hay errores en el formulario"
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
            return false;
        }
    })
})