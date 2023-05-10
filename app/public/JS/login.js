/* backend=email y password */
let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
const qs = (str) => document.querySelector(str);
window.addEventListener("load", () => {
  let email = qs("#email");
  let password = qs("#password");
  let ul = qs("#errores-login");
  let errorEmail = qs("#errorEmail");
  let errorPassword = qs("#errorPassword");

  let form = qs("form");
  form.addEventListener("submit", (e) => {
    let errores = [];
    if (!regExEmail.test(email.value)) {
      errores.push("el email es invalido");
    }
    if (!regExPass.test(password.value)) {
      errores.push("la contraseña debe tener entre 6 y 12 caracteres");
    }
    if (errores.length > 0) {
      e.preventDefault();
    }
  });
  email.addEventListener("blur", () => {
    if (!regExEmail.test(email.value)) {
      errorEmail.innerHTML = "email invalido";
    }
  });
  email.addEventListener("focus", () => {
    errorEmail.innerHTML = "";
  });
  password.addEventListener("blur", () => {
    if (!(password.value.length >= 6 && password.value.length <= 12)) {
      errorPassword.innerHTML =
        "la contraseña debe tener entre 6 y 12 caracteres";
    }
  });
  password.addEventListener("focus", () => {
    errorPassword.innerHTML = "";
  });
});
