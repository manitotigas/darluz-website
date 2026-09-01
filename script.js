```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const intro = document.getElementById("intro");
    const header = document.getElementById("header");

    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    const revealElements = document.querySelectorAll(".reveal");


    /* =====================================================
       INTRO
    ===================================================== */

    // Bloqueia o scroll enquanto a intro está visível
    document.body.classList.add("intro-active");

    // Tempo da animação de entrada
    setTimeout(() => {

        if (intro) {
            intro.classList.add("finished");
        }

        document.body.classList.remove("intro-active");

    }, 3000);


    // Permite saltar a intro ao clicar nela
    if (intro) {

        intro.addEventListener("click", () => {

            intro.classList.add("finished");

            document.body.classList.remove("intro-active");

        });

    }


    /* =====================================================
       REVEAL DAS SECÇÕES
    ===================================================== */

    // IMPORTANTE:
    // Se o IntersectionObserver não funcionar,
    // mostramos tudo na mesma.
    // Assim nunca ficam páginas vazias.

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {

            observer.observe(element);

        });


        // Mostra imediatamente os elementos que já estão
        // visíveis no ecrã ao carregar a página.

        setTimeout(() => {

            revealElements.forEach(element => {

                const rect = element.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {

                    element.classList.add("visible");

                }

            });

        }, 100);


    } else {

        // Fallback para browsers sem IntersectionObserver

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       HEADER AO FAZER SCROLL
    ===================================================== */

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


    /* =====================================================
       LINKS DO MENU
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
       ESC PARA FECHAR O MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSideMenu();

            }

        }
    );


    /* =====================================================
       FECHAR MENU AO REDIMENSIONAR
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 800) {

            closeSideMenu();

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


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


            if (!target) {
                return;
            }


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

        });

    });


    /* =====================================================
       IMAGENS
    ===================================================== */

    // Se alguma imagem falhar, não deixa a página
    // ficar com espaços estranhos.

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Imagem não encontrada:",
                    image.src
                );

                image.style.opacity = "0";

            }
        );

    });


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

                    otherItem.open = false;

                }

            });

        });

    });


    /* =====================================================
       GARANTIA DE VISIBILIDADE
    ===================================================== */

    // Depois de 1 segundo, qualquer .reveal que ainda
    // esteja escondido é mostrado.
    //
    // Isto evita o problema de uma secção ficar vazia
    // por causa de algum erro do observer.

    setTimeout(() => {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }, 1000);


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Darluz — site carregado corretamente."
    );

});
```
