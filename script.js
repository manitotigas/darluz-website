document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const closeMenu = document.querySelector(".close-menu");
    const sideMenu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".menu-overlay");

    const menuLinks = document.querySelectorAll(".main-menu a");
    const menuContact = document.querySelector(".menu-button-contact");

    // ==========================================
    // ABRIR MENU
    // ==========================================

    function openMenu() {

        if (!sideMenu) return;

        sideMenu.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
        }

        document.body.style.overflow = "hidden";
    }


    // ==========================================
    // FECHAR MENU
    // ==========================================

    function closeSideMenu() {

        if (sideMenu) {
            sideMenu.classList.remove("active");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.style.overflow = "";
    }


    // ==========================================
    // BOTÃO MENU
    // ==========================================

    if (menuButton) {
        menuButton.addEventListener("click", openMenu);
    }


    // ==========================================
    // BOTÃO FECHAR
    // ==========================================

    if (closeMenu) {
        closeMenu.addEventListener("click", closeSideMenu);
    }


    // ==========================================
    // CLICAR FORA DO MENU
    // ==========================================

    if (overlay) {
        overlay.addEventListener("click", closeSideMenu);
    }


    // ==========================================
    // LINKS DO MENU
    // ==========================================

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeSideMenu();
        });

    });


    // ==========================================
    // BOTÃO CONTACTAR DO MENU
    // ==========================================

    if (menuContact) {

        menuContact.addEventListener("click", () => {
            closeSideMenu();
        });

    }


    // ==========================================
    // ESC FECHA MENU
    // ==========================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSideMenu();
        }

    });


    // ==========================================
    // SCROLL SUAVE
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            closeSideMenu();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ==========================================
    // ANIMAÇÕES AO ENTRAR NO ECRÃ
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".feature-card, .service-row, .project-card, .value-card, .review-card-big"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        animatedElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // ==========================================
    // HEADER AO FAZER SCROLL
    // ==========================================

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ==========================================
    // ANO AUTOMÁTICO DO FOOTER
    // ==========================================

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Darluz Energia e Segurança`;

    }


    // ==========================================
    // ANIMAÇÃO INICIAL DA DARLUZ
    // ==========================================

    const intro = document.querySelector(".intro-animation");

    if (intro) {

        // Bloqueia o scroll enquanto a animação acontece
        document.body.classList.add("intro-active");

        // Dá tempo para a animação terminar
        setTimeout(() => {

            intro.classList.add("intro-finished");

            document.body.classList.remove("intro-active");

        }, 2600);

        // Remove completamente a intro depois da transição
        setTimeout(() => {

            intro.remove();

        }, 3300);

    }

});
