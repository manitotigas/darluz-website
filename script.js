document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INTRO ANIMATION
    ===================================================== */

    const intro = document.getElementById("intro");

    if (intro) {

        // Bloqueia o scroll enquanto a intro está ativa
        document.body.classList.add("intro-active");

        // Tempo total da animação
        const INTRO_DURATION = 3200;

        setTimeout(() => {

            intro.classList.add("finished");

            document.body.classList.remove("intro-active");

            // Remove completamente a intro depois do fade
            setTimeout(() => {
                intro.style.display = "none";
            }, 900);

        }, INTRO_DURATION);
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       SIDE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {

        if (!sideMenu || !menuOverlay || !menuButton) return;

        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");
    }


    function closeSideMenu() {

        if (!sideMenu || !menuOverlay || !menuButton) return;

        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    }


    if (menuButton) {
        menuButton.addEventListener("click", () => {

            if (sideMenu.classList.contains("active")) {
                closeSideMenu();
            } else {
                openMenu();
            }

        });
    }


    if (closeMenu) {
        closeMenu.addEventListener(
            "click",
            closeSideMenu
        );
    }


    if (menuOverlay) {
        menuOverlay.addEventListener(
            "click",
            closeSideMenu
        );
    }


    /* =====================================================
       MENU LINKS
    ===================================================== */

    const menuLinks = document.querySelectorAll(
        ".main-menu a, .menu-brand, .menu-button-contact"
    );

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeSideMenu();
        });

    });


    /* =====================================================
       ESC CLOSE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSideMenu();

        }

    });


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        // Compatibilidade com browsers antigos
        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {
                    otherItem.removeAttribute("open");
                }

            });

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Imagem não encontrada:",
                image.src
            );

        });

    });

});
