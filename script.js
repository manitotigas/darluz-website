const menuButton = document.querySelector(".menu-button");
const closeButton = document.querySelector(".close-menu");
const sideMenu = document.querySelector(".side-menu");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        sideMenu.classList.add("active");
    });
}

if (closeButton) {
    closeButton.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });
}

document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });
});
