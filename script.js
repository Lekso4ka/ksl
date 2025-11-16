//document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin)
    
    const headerBlock = document.querySelector(".header-block");
    const burgerBtn = document.querySelector(".header-mob__btn");
    const headerClose = document.querySelector(".logo__x");
    const anchorLinks = document.querySelectorAll("a[href^=\"#\"]");
    const header = document.querySelector("header");
    const hHeight = header.getBoundingClientRect().height
    const width = window.innerWidth
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: 0,
        },
        ease: "power2.inOut"
    });
    let wScrollY = window.scrollY;
    window.addEventListener("scroll", function(e) {
        const currentScrollY = window.scrollY;

        if (window.scrollY > window.innerHeight) {
            header.classList.add("sticky")
            header.nextElementSibling.style.marginTop = hHeight + "px";
            setTimeout(() => {
                header.style.transition = "transform 500ms"
            }, 0)
        } else {
            header.classList.remove("sticky")
            header.style.transition = null
            header.nextElementSibling.style.marginTop = null
        }
        if (currentScrollY > wScrollY && header.classList.contains("active")) {
            header.classList.remove("active")
        } else if (currentScrollY < wScrollY && header.classList.contains("sticky")) {
            header.classList.add("active")
        }
        wScrollY = window.scrollY;
    })
    burgerBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        headerBlock.classList.toggle("active")
    })
    headerClose.addEventListener("click", (e) => {
        e.preventDefault()
        headerBlock.classList.remove("active")
    })
    document.addEventListener("click", (e) => {
        if (e.target !== headerBlock) {
            if (headerBlock.classList.contains("active")) {
                headerBlock.classList.remove("active")
            }
        }
    })
    function remToPixels(rem) {
        const size = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return rem * size;
    }
    
    
    anchorLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            if (header.classList.contains("active")) {
                header.classList.remove("active")
            }
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            const selfOffsetBlocks = {
                "directions": width < 760 ? remToPixels(-14) : width < 1440 ? remToPixels(-16) : remToPixels(-22) - 3000,
                "specialists": width < 760 ? remToPixels(-8) : remToPixels(-12),
                "technology": width < 760 ? remToPixels(-8) : remToPixels(-7),
                "results": width < 760 ? remToPixels(-22) : width < 1440 ? remToPixels(-6) : remToPixels(-10),
            }
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: selfOffsetBlocks[targetId] || 0
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    window.addEventListener("resize", () => {
        //location.reload()
        if (width >= 1440) {
            if (headerBlock.classList.contains("active")) {
                headerBlock.classList.remove("active")
            }
        }
    })
    
//});