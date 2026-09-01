document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const intro = document.querySelector(".intro-animation");
    const header = document.querySelector(".header");

    const menuButton = document.querySelector(".menu-button");
    const closeMenu = document.querySelector(".close-menu");
    const sideMenu = document.querySelector(".side-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    const menuLinks =
        document.querySelectorAll(".main-menu a");


    /* =====================================================
       ELEMENTOS PARA ANIMAÇÃO
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, " +
            ".service-row, " +
            ".project-card, " +
            ".work-card, " +
            ".value-card, " +
            ".review-card-big"
        );


    /* =====================================================
       INTRO
    ===================================================== */

    body.classList.add("intro-active");

    const finishIntro = () => {

        if (intro) {

            intro.classList.add("intro-finished");

        }

        body.classList.remove("intro-active");

    };


    /* Evita que a intro fique presa */

    setTimeout(finishIntro, 3000);


    /* Também permite saltar a intro */

    if (intro) {

        intro.addEventListener(
            "click",
            finishIntro
        );

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MENU
    ===================================================== */

    const openMenu = () => {

        if (!sideMenu || !menuOverlay) return;

        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");

        body.classList.add("menu-open");

        if (menuButton) {

            menuButton.classList.add("active");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    };


    const closeSideMenu = () => {

        if (sideMenu) {

            sideMenu.classList.remove("active");

        }

        if (menuOverlay) {

            menuOverlay.classList.remove("active");

        }

        body.classList.remove("menu-open");

        if (menuButton) {

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

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


    menuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeSideMenu
        );

    });


    /* ESC fecha o menu */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSideMenu();

            }

        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    /*
       IMPORTANTE:

       O CSS começa estes elementos com:

       opacity: 0;

       O JavaScript adiciona:

       visible

       quando eles entram no ecrã.
    */


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        /*
           Navegadores sem IntersectionObserver
        */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /*
       SEGURANÇA EXTRA

       Se algum elemento continuar invisível
       por alguma razão, depois de 2.5 segundos
       tornamo-lo visível.

       Assim nunca ficas com uma secção vazia.
    */

    setTimeout(() => {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }, 2500);


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) return;

                faqItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item &&
                            otherItem.open
                        ) {

                            otherItem.removeAttribute(
                                "open"
                            );

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();

                closeSideMenu();


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

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                /*
                   Não deixamos uma imagem
                   partida bloquear o conteúdo.
                */

                image.style.opacity = "0.15";

            }
        );

    });


    /* =====================================================
       ACTIVE MENU SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const menuSectionLinks =
        document.querySelectorAll(
            ".main-menu a[href^='#']"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const id =
                                entry.target.getAttribute(
                                    "id"
                                );


                            menuSectionLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "current"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    ) {

                                        link.classList.add(
                                            "current"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.3
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       CONTACT BUTTON FEEDBACK
    ===================================================== */

    const contactButtons =
        document.querySelectorAll(
            ".contact-button, " +
            ".header-contact, " +
            ".menu-button-contact"
        );


    contactButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.add(
                    "clicked"
                );


                setTimeout(
                    () => {

                        button.classList.remove(
                            "clicked"
                        );

                    },
                    400
                );

            }
        );

    });


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroPattern =
        document.querySelector(
            ".hero-pattern"
        );


    if (
        heroPattern &&
        window.matchMedia(
            "(min-width: 800px)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                heroPattern.style.transform =
                    `translateY(${scroll * 0.05}px)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       ANIMAÇÃO DOS BOTÕES
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            "button, .primary-button, .secondary-button, .contact-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.classList.add(
                    "pressed"
                );

            }
        );


        button.addEventListener(
            "pointerup",
            () => {

                button.classList.remove(
                    "pressed"
                );

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.classList.remove(
                    "pressed"
                );

            }
        );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "page-ready"
    );


});
