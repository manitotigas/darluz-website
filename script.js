document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MENU LATERAL
    ========================================== */

    const menuButton = document.querySelector(".menu-button");
    const closeMenu = document.querySelector(".close-menu");
    const sideMenu = document.querySelector(".side-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    function openMenu() {
        sideMenu.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSideMenu() {
        sideMenu.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (menuButton) {
        menuButton.addEventListener("click", openMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener("click", closeSideMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeSideMenu);
    }


    /* ==========================================
       LINKS DO MENU
    ========================================== */

    const menuLinks = document.querySelectorAll(".main-menu a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeSideMenu();
        });

    });


    /* ==========================================
       TODOS OS LINKS INTERNOS
    ========================================== */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight = document.querySelector(".header")
                    ? document.querySelector(".header").offsetHeight
                    : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }

        });

    });


    /* ==========================================
       CONTACTAR-NOS
    ========================================== */

    const contactButtons = document.querySelectorAll(
        ".contact-button, .header-contact, .menu-button-contact"
    );

    contactButtons.forEach(button => {

        button.addEventListener("click", () => {

            // O link mailto do HTML será utilizado normalmente.
            // Esta função apenas garante que o clique funciona.

        });

    });


    /* ==========================================
       ANIMAÇÃO DOS CARDS AO APARECEREM
    ========================================== */

    const animatedCards = document.querySelectorAll(
        ".feature-card, .service-row, .project-card, .value-card, .review-card-big"
    );

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

    animatedCards.forEach(card => {
        observer.observe(card);
    });


    /* ==========================================
       HEADER AO FAZER SCROLL
    ========================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* ==========================================
       ESC PARA FECHAR MENU
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSideMenu();
        }

    });


    /* ==========================================
       ANO AUTOMÁTICO NO FOOTER
    ========================================== */

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Darluz Energia e Segurança`;

    }


});
