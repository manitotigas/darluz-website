document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const intro = document.getElementById("intro");

    const header = document.getElementById("header");

    const menuButton = document.getElementById("menuButton");

    const closeMenu = document.getElementById("closeMenu");

    const sideMenu = document.getElementById("sideMenu");

    const menuOverlay = document.getElementById("menuOverlay");

    const menuLinks = document.querySelectorAll(".main-menu a");

    const revealElements = document.querySelectorAll(".reveal");


    /* =====================================================
       INTRO
    ===================================================== */

    body.classList.add("intro-active");

    const finishIntro = () => {

        if (!intro) {
            body.classList.remove("intro-active");
            return;
        }

        intro.classList.add("finished");

        body.classList.remove("intro-active");

    };


    setTimeout(finishIntro, 3000);


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

        if (!sideMenu || !menuOverlay || !menuButton) return;

        sideMenu.classList.add("active");

        menuOverlay.classList.add("active");

        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        body.classList.add("menu-open");

    };


    const closeSideMenu = () => {

        if (!sideMenu || !menuOverlay || !menuButton) return;

        sideMenu.classList.remove("active");

        menuOverlay.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-open");

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

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(
            element => observer.observe(element)
        );

    } else {

        revealElements.forEach(
            element => element.classList.add("visible")
        );

    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) return;

                faqItems.forEach(otherItem => {

                    if (
                        otherItem !== item &&
                        otherItem.open
                    ) {
                        otherItem.removeAttribute("open");
                    }

                });

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

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
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

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


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute("id");

                        menuSectionLinks.forEach(link => {

                            link.classList.remove(
                                "current"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add(
                                    "current"
                                );
                            }

                        });

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(
            section =>
                sectionObserver.observe(section)
        );

    }


    /* =====================================================
       CONTACT BUTTON FEEDBACK
    ===================================================== */

    const contactButtons =
        document.querySelectorAll(
            ".contact-button, .header-contact, .menu-button-contact"
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

    const heroCircle =
        document.querySelector(".hero-bg-circle");


    if (
        heroCircle &&
        window.matchMedia("(min-width: 800px)").matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                heroCircle.style.transform =
                    `translateY(${scroll * 0.08}px)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "page-ready"
    );

});
