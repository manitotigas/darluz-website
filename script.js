const menuButton = document.querySelector(".menu-button");
const closeMenu = document.querySelector(".close-menu");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".menu-overlay");

function openMenu() {
    sideMenu.classList.add("active");
}

function closeSideMenu() {
    sideMenu.classList.remove("active");
}

menuButton.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
menuOverlay.addEventListener("click", closeSideMenu);


// Fechar o menu quando clicar numa aba
document.querySelectorAll(".main-menu a").forEach(link => {
    link.addEventListener("click", closeSideMenu);
});


// Fechar o menu com a tecla ESC
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeSideMenu();
    }
});


// Animação suave ao entrar nas secções
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll("section").forEach(section => {
    section.classList.add("animate-section");
    observer.observe(section);
});
