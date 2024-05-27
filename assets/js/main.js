/**
 * Template Name: Knight
 * Template URL: https://bootstrapmade.com/knight-free-bootstrap-theme/
 * Updated: Mar 17 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select("#header");
        let offset = header.offsetHeight;

        if (!header.classList.contains("header-scrolled")) {
            offset -= 16;
        }

        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth"
        });
    };

    /**
     * Header fixed top on scroll
     */
    let selectHeader = select("#header");
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop;
        let nextElement = selectHeader.nextElementSibling;
        const headerFixed = () => {
            if (headerOffset - window.scrollY <= 0) {
                selectHeader.classList.add("fixed-top");
                nextElement.classList.add("scrolled-offset");
            } else {
                selectHeader.classList.remove("fixed-top");
                nextElement.classList.remove("scrolled-offset");
            }
        };
        window.addEventListener("load", headerFixed);
        onscroll(document, headerFixed);
    }

    /**
     * Kas seda üldse vaja enam?
     * 
    window.addEventListener("load", () => {
        // Kuula lehe skrollimise sündmusi
        window.addEventListener("scroll", toggleBacktotop);

        // Kui nuppu klõpsatakse, kerime lehe ülespoole
        document
            .querySelector(".back-to-top")
            .addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth" // Animateeritud kerimine
                });
            });
    });
    
    */

    /**
     *  Back to top button
     */

    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Mobile nav dropdowns activate
     */
    on(
        "click",
        ".navbar .dropdown > a",
        function (e) {
            if (select("#navbar").classList.contains("navbar-mobile")) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle("dropdown-active");
            }
        },
        true
    );

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on(
        "click",
        ".scrollto",
        function (e) {
            if (select(this.hash)) {
                e.preventDefault();

                let navbar = select("#navbar");
                if (navbar.classList.contains("navbar-mobile")) {
                    navbar.classList.remove("navbar-mobile");
                    let navbarToggle = select(".mobile-nav-toggle");
                    navbarToggle.classList.toggle("bi-list");
                    navbarToggle.classList.toggle("bi-x");
                }
                scrollto(this.hash);
            }
        },
        true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
                layoutMode: "fitRows"
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            on(
                "click",
                "#portfolio-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter")
                    });
                    portfolioIsotope.on("arrangeComplete", function () {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: ".portfolio-lightbox"
    });

    /**
     * Portfolio details slider
     */
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    });

    /**
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });
})();

// Funktsioon, mis käivitatakse nupu "Loe rohkem" klõpsamisel
function showMore() {
    var description = document.querySelector(".description");
    var readMoreBtn = document.querySelector(".readMoreBtn");
    var readLessBtn = document.querySelector(".readLessBtn");
    var fullText = document.getElementById("fullText");

    // Näita täielikku teksti
    fullText.style.display = "block";

    // Peida "Loe rohkem" nupp
    readMoreBtn.style.display = "none";

    // Näita "Loe vähem" nuppu
    readLessBtn.style.display = "inline-block";
}

// Funktsioon, mis käivitatakse nupu "Loe vähem" klõpsamisel
function showLess() {
    var description = document.querySelector(".description");
    var readMoreBtn = document.querySelector(".readMoreBtn");
    var readLessBtn = document.querySelector(".readLessBtn");
    var fullText = document.getElementById("fullText");

    // Peida täielik tekst
    fullText.style.display = "none";

    // Näita "Loe rohkem" nuppu
    readMoreBtn.style.display = "inline-block";

    // Peida "Loe vähem" nupp
    readLessBtn.style.display = "none";
}

// Lisa sündmuskäsitlejad nuppudele
document.querySelector(".readMoreBtn").addEventListener("click", showMore);
document.querySelector(".readLessBtn").addEventListener("click", showLess);
// Esialgne seadistus: Peida "Loe vähem" nupp
document.querySelector(".readLessBtn").style.display = "none";

// Funktsioon, mis käivitatakse nupu "Loe rohkem" klõpsamisel teise "div" jaoks
function showMore2() {
    var fullText2 = document.getElementById("fullText2");
    var readMoreBtn2 = document.querySelector(".readMoreBtn2");
    var readLessBtn2 = document.querySelector(".readLessBtn2");

    // Näita täielikku teksti
    fullText2.style.display = "block";

    // Peida "Loe rohkem" nupp
    readMoreBtn2.style.display = "none";

    // Näita "Loe vähem" nuppu
    readLessBtn2.style.display = "inline-block";
}

// Funktsioon, mis käivitatakse nupu "Loe vähem" klõpsamisel teise "div" jaoks
function showLess2() {
    var fullText2 = document.getElementById("fullText2");
    var readMoreBtn2 = document.querySelector(".readMoreBtn2");
    var readLessBtn2 = document.querySelector(".readLessBtn2");

    // Peida täielik tekst
    fullText2.style.display = "none";

    // Näita "Loe rohkem" nuppu
    readMoreBtn2.style.display = "inline-block";

    // Peida "Loe vähem" nupp
    readLessBtn2.style.display = "none";
}

// Lisa sündmuskäsitlejad nuppudele teise "div" jaoks
document.querySelector(".readMoreBtn2").addEventListener("click", showMore2);
document.querySelector(".readLessBtn2").addEventListener("click", showLess2);

// Esialgne seadistus: Peida "Loe vähem" nupp teise "div" jaoks
document.querySelector(".readLessBtn2").style.display = "none";

// Funktsioon, mis käivitatakse nupu "Loe rohkem" klõpsamisel kolmanda "div" jaoks
function showMore3() {
    var fullText3 = document.getElementById("fullText3");
    var readMoreBtn3 = document.querySelector(".readMoreBtn3");
    var readLessBtn3 = document.querySelector(".readLessBtn3");

    // Näita täielikku teksti
    fullText3.style.display = "block";

    // Peida "Loe rohkem" nupp
    readMoreBtn3.style.display = "none";

    // Näita "Loe vähem" nuppu
    readLessBtn3.style.display = "inline-block";
}

// Funktsioon, mis käivitatakse nupu "Loe vähem" klõpsamisel kolmanda "div" jaoks
function showLess3() {
    var fullText3 = document.getElementById("fullText3");
    var readMoreBtn3 = document.querySelector(".readMoreBtn3");
    var readLessBtn3 = document.querySelector(".readLessBtn3");

    // Peida täielik tekst
    fullText3.style.display = "none";

    // Näita "Loe rohkem" nuppu
    readMoreBtn3.style.display = "inline-block";

    // Peida "Loe vähem" nupp
    readLessBtn3.style.display = "none";
}

// Lisa sündmuskäsitlejad nuppudele kolmanda "div" jaoks
document.querySelector(".readMoreBtn3").addEventListener("click", showMore3);
document.querySelector(".readLessBtn3").addEventListener("click", showLess3);

// Esialgne seadistus: Peida "Loe vähem" nupp kolmanda "div" jaoks
document.querySelector(".readLessBtn3").style.display = "none";

// Funktsioon, mis käivitatakse nupu "Loe rohkem" klõpsamisel neljanda "div" jaoks
function showMore4() {
    var fullText4 = document.getElementById("fullText4");
    var readMoreBtn4 = document.querySelector(".readMoreBtn4");
    var readLessBtn4 = document.querySelector(".readLessBtn4");

    // Näita täielikku teksti
    fullText4.style.display = "block";

    // Peida "Loe rohkem" nupp
    readMoreBtn4.style.display = "none";

    // Näita "Loe vähem" nuppu
    readLessBtn4.style.display = "inline-block";
}

// Funktsioon, mis käivitatakse nupu "Loe vähem" klõpsamisel neljanda "div" jaoks
function showLess4() {
    var fullText4 = document.getElementById("fullText4");
    var readMoreBtn4 = document.querySelector(".readMoreBtn4");
    var readLessBtn4 = document.querySelector(".readLessBtn4");

    // Peida täielik tekst
    fullText4.style.display = "none";

    // Näita "Loe rohkem" nuppu
    readMoreBtn4.style.display = "inline-block";

    // Peida "Loe vähem" nupp
    readLessBtn4.style.display = "none";
}

// Lisa sündmuskäsitlejad nuppudele neljanda "div" jaoks
document.querySelector(".readMoreBtn4").addEventListener("click", showMore4);
document.querySelector(".readLessBtn4").addEventListener("click", showLess4);

// Esialgne seadistus: Peida "Loe vähem" nupp neljanda "div" jaoks
document.querySelector(".readLessBtn4").style.display = "none";

// Funktsioon, mis käivitatakse nupu "Loe rohkem" klõpsamisel
function showMore5() {
    var fullText5 = document.getElementById("fullText5");
    var readMoreBtn5 = document.querySelector(".readMoreBtn5");
    var readLessBtn5 = document.querySelector(".readLessBtn5");

    // Näita täielikku teksti
    fullText5.style.display = "block";

    // Peida "Loe rohkem" nupp
    readMoreBtn5.style.display = "none";

    // Näita "Loe vähem" nuppu
    readLessBtn5.style.display = "inline-block";
}

// Funktsioon, mis käivitatakse nupu "Loe vähem" klõpsamisel
function showLess5() {
    var fullText5 = document.getElementById("fullText5");
    var readMoreBtn5 = document.querySelector(".readMoreBtn5");
    var readLessBtn5 = document.querySelector(".readLessBtn5");

    // Peida täielik tekst
    fullText5.style.display = "none";

    // Näita "Loe rohkem" nuppu
    readMoreBtn5.style.display = "inline-block";

    // Peida "Loe vähem" nupp
    readLessBtn5.style.display = "none";
}

// Lisa sündmuskäsitlejad nuppudele
document.querySelector(".readMoreBtn5").addEventListener("click", showMore5);
document.querySelector(".readLessBtn5").addEventListener("click", showLess5);
// Esialgne seadistus: Peida "Loe vähem" nupp
document.querySelector(".readLessBtn5").style.display = "none";
