//document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin)
    
    const headerBlock = document.querySelector(".header-block");
    const burgerBtn = document.querySelector(".header-mob__btn");
    const headerClose = document.querySelector(".logo__x");
    const anchorLinks = document.querySelectorAll("a[href^=\"#\"]");
    
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: 0,
        },
        ease: "power2.inOut"
    });
    
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
    
    
    anchorLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            const selfOffsetBlocks = ["#directions"]
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: selfOffsetBlocks.includes(targetId) ? 40 : 0
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    window.addEventListener("resize", () => {
        //location.reload()
        if (window.innerWidth >= 1440) {
            if (headerBlock.classList.contains("active")) {
                headerBlock.classList.remove("active")
            }
        }
    })
    
//});