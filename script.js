document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       INTRO
    ===================================================== */

    const intro = document.getElementById("intro");

    if (intro) {

        document.body.classList.add("intro-active");

        /*
           A animação começa imediatamente.
           Depois de 4.5 segundos iniciamos a saída.
        */
        setTimeout(function () {

            intro.classList.add("finished");

            document.body.classList.remove("intro-active");

            /*
               Depois do fade, removemos a intro
               completamente do DOM visual.
            */
            setTimeout(function () {

                intro.style.display = "none";

            }, 900);

        }, 4500);
    }


    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

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


    /* =====================================================
       MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const closeMenu =
        document.getElementById("closeMenu");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");


    function openMenu() {

        if (!sideMenu) return;

        sideMenu.classList.add("active");

        if (menuOverlay) {
            menuOverlay.classList.add("active");
        }

        if (menuButton) {

            menuButton.classList.add("active");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        document.body.classList.add(
            "menu-open"
        );
    }


    function closeSideMenu() {

        if (!sideMenu) return;

        sideMenu.classList.remove("active");

        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }

        if (menuButton) {

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.classList.remove(
            "menu-open"
        );
    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function () {

                if (
                    sideMenu &&
                    sideMenu.classList.contains("active")
                ) {

                    closeSideMenu();

                } else {

                    openMenu();

                }

            }
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


    /* =====================================================
       FECHAR MENU NOS LINKS
    ===================================================== */

    const menuLinks =
        document.querySelectorAll(
            ".main-menu a, .menu-brand, .menu-button-contact"
        );

    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeSideMenu
        );

    });


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSideMenu();

            }

        }
    );


    /* =====================================================
       REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );
    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        item.addEventListener(
            "toggle",
            function () {

                if (!item.open) return;

                faqItems.forEach(
                    function (otherItem) {

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

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

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

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        }
    );

});
