let burgerMenu = document.querySelector("#burger-menu");
let btnClose = document.querySelector("#btn-close");
let menuContainer = document.querySelector("#menu");

burgerMenu.addEventListener("click", () => {
    menuContainer.classList.add("active");
});

btnClose.addEventListener("click", () => {
    menuContainer.classList.remove("active");
});
