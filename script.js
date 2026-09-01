document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS PRINCIPAIS
    // =====================================================

    const menuButton = document.querySelector(".menu-button");
    const closeMenu = document.querySelector(".close-menu");
    const sideMenu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".menu-overlay");
    const header = document.querySelector(".header");

    const menuLinks = document.querySelectorAll(".main-menu a");
    const menuContact = document.querySelector(".menu-button-contact");

    // =====================================================
    // MENU LATERAL
    // =====================================================

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


    function closeSideMenu() {

        if (!sideMenu) return;

        sideMenu.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.style.overflow = "";
    }


    // Abrir
    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", openMenu);
    }


    // Fechar
    if (closeMenu) {
        closeMenu.addEventListener("click", closeSideMenu);
    }


    // Fechar ao clicar no fundo
    if (overlay) {
        overlay.addEventListener("click", closeSideMenu);
    }


    // =====================================================
    // LINKS DO MENU
    // =====================================================

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeSideMenu();

        });

    });


    // Botão falar com a Darluz
    if (menuContact) {

        menuContact.addEventListener("click", () => {

            closeSideMenu();

        });

    }


    // =====================================================
    // ESC FECHA O MENU
    // =====================================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSideMenu();

        }

    });


    // =====================================================
    // SCROLL SUAVE
    // =====================================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

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


    // =====================================================
    // HEADER AO FAZER SCROLL
    // =====================================================

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


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    // =====================================================
    // ANIMAÇÕES AO ENTRAR NO ECRÃ
    // =====================================================

    const animatedElements = document.querySelectorAll(
        ".feature-card, " +
        ".service-row, " +
        ".project-card, " +
        ".value-card, " +
        ".review-card-big, " +
        ".about-visual, " +
        ".about-text, " +
        ".contact-card"
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


    // =====================================================
    // BOTÕES DE CONTACTO
    // =====================================================

    const contactLinks = document.querySelectorAll(
        'a[href^="mailto:"], a[href^="tel:"]'
    );


    contactLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeSideMenu();

        });

    });


    // =====================================================
    // CONTACTAR DARLUZ
    // =====================================================

    const contactButton = document.querySelector(".contact-button");

    if (contactButton) {

        contactButton.addEventListener("click", () => {

            closeSideMenu();

        });

    }


    // =====================================================
    // BOTÕES "EXPLORAR"
    // =====================================================

    const exploreLinks = document.querySelectorAll(
        '.feature-content a, .text-link'
    );


    exploreLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeSideMenu();

        });

    });


    // =====================================================
    // PROJETOS CLICÁVEIS
    // =====================================================

    const projectCards = document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            const projectsSection =
                document.querySelector("#projetos");

            if (projectsSection) {

                projectsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================================
    // ANO AUTOMÁTICO DO FOOTER
    // =====================================================

    const footerYear = document.querySelector(
        ".footer-bottom span"
    );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Darluz Energia e Segurança`;

    }


    // =====================================================
    // DETETAR REDUÇÃO DE MOVIMENTO
    // =====================================================

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }


    // =====================================================
    // FECHAR MENU SE A JANELA FICAR GRANDE
    // =====================================================

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 800) {

            closeSideMenu();

        }

    });


    // =====================================================
    // PREVENIR SCROLL HORIZONTAL ACIDENTAL
    // =====================================================

    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";


    // =====================================================
    // LOG
    // =====================================================

    console.log(
        "Darluz Energia & Segurança | Website carregado."
    );

});
