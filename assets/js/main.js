// —————————————————————————————————————————————
// About Section: smooth fade-out/fade-in between tabs
// —————————————————————————————————————————————
const aboutTabs             = document.querySelector(".about-tabs");
const aboutTabBtns          = aboutTabs.querySelectorAll(".about-tab-btn");
const aboutTabContents      = document.querySelectorAll(".about-tab-content");
let activeIndex = 0;

// 1) Initialize first tab on page load
aboutTabContents.forEach((pane, idx) => {
  if (idx === activeIndex) {
    pane.style.display = "flex";
    pane.classList.add("active");
    aboutTabBtns[idx].classList.add("active");
  } else {
    pane.style.display = "none";
  }
});

// 2) The switcher function
function switchAboutTab(newIndex) {
  if (newIndex === activeIndex) return;

  const oldIndex = activeIndex;
  const oldPane  = aboutTabContents[oldIndex];
  const newPane  = aboutTabContents[newIndex];

  // 2a) Button highlight
  aboutTabBtns[oldIndex].classList.remove("active");
  aboutTabBtns[newIndex].classList.add("active");

  // 2b) Fade-out the old pane
  oldPane.classList.remove("active");

  // 2c) When fade-out completes, hide it & start fade-in on the new one
  oldPane.addEventListener("transitionend", function handler(e) {
    if (e.propertyName !== "opacity") return;
    oldPane.removeEventListener("transitionend", handler);

    // hide the old
    oldPane.style.display = "none";

    // prep the new
    newPane.style.display = "flex";
    // force reflow so the browser sees the display change
    newPane.getBoundingClientRect();
    // fade-in
    newPane.classList.add("active");

    // update our tracker
    activeIndex = newIndex;

    // Sync ScrollReveal after tab content change
    setTimeout(() => {
        recalculateScrollReveal();
    }, 100);
  });
}

// 3) Wire up the clicks
aboutTabBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => switchAboutTab(idx));
});



/*
Resume Section tabs and tab contents
*/

// ——————————————————————————————————————————————————
// Resume Section: smooth fade-out/fade-in between tabs
// ——————————————————————————————————————————————————
const resumeTabs         = document.querySelector(".resume-tabs");
const resumeTabBtns      = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents  = document.querySelectorAll(".resume-tab-content");
let activeResumeIndex    = 0;

// Initialize first resume tab on load
resumeTabContents.forEach((pane, idx) => {
  if (idx === activeResumeIndex) {
    pane.style.display = "flex";
    pane.classList.add("active");
    resumeTabBtns[idx].classList.add("active");
  } else {
    pane.style.display = "none";
  }
});

function switchResumeTab(newIndex) {
  if (newIndex === activeResumeIndex) return;

  const oldIdx = activeResumeIndex;
  const oldPane = resumeTabContents[oldIdx];
  const newPane = resumeTabContents[newIndex];

  // button highlight
  resumeTabBtns[oldIdx].classList.remove("active");
  resumeTabBtns[newIndex].classList.add("active");

  // fade-out old pane
  oldPane.classList.remove("active");

  // after fade-out finishes, hide old & fade-in new
  oldPane.addEventListener("transitionend", function handler(e) {
    if (e.propertyName !== "opacity") return;
    oldPane.removeEventListener("transitionend", handler);

    // Hide old pane
    oldPane.style.display = "none";

    // Show new pane
    newPane.style.display = "flex";
    newPane.getBoundingClientRect();  // force reflow
    newPane.classList.add("active");

    activeResumeIndex = newIndex;

    // Sync ScrollReveal after tab content change
    setTimeout(() => {
        recalculateScrollReveal();
    }, 100);
  });
}

// 4) Wire up clicks
resumeTabBtns.forEach((btn, idx) =>
  btn.addEventListener("click", () => switchResumeTab(idx))
);


/*
Service modal open/close function
*/
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
    const serviceCard = serviceCardWithModal.querySelector(".service-card");
    const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
    const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");
    const serviceModal = serviceCardWithModal.querySelector(".service-modal");

    serviceCard.addEventListener("click", () => {
        serviceBackDrop.style.display = "flex";

        setTimeout(() => {
            serviceBackDrop.classList.add("active");
        }, 100);

        setTimeout(() => {
            serviceModal.classList.add("active");
        }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
        setTimeout(() => {
            serviceBackDrop.style.display = "none";
        }, 500);

        setTimeout(() => {
            serviceBackDrop.classList.remove("active");
            serviceModal.classList.remove("active");
        }, 100);
    });
});


/*
Portfolio modals, tabs and cards
*/

class PortfolioManager {
    constructor() {
        this.initTabs();
        this.initImageRotation();
        this.initModals();
    }

    initTabs() {
        const portfolioTabs = document.querySelector(".portfolio-tabs");
        const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
        const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

        portfolioTabBtns.forEach((tabBtn) => {
            tabBtn.addEventListener("click", () => {
                const filter = tabBtn.getAttribute("data-filter");

                cardsWithModals.forEach((cardWithModal) => {
                    if(filter === "all" || cardWithModal.classList.contains(filter)){
                        cardWithModal.classList.remove("hidden");
                        // if (cardWithModal.style.opacity === "1") {
                        //     cardWithModal.style.opacity = "0";
                        // }
                        setTimeout(() => {
                            cardWithModal.style.opacity = "1";
                            cardWithModal.style.transition = ".5s ease";
                        }, 1);
                    } else {
                        cardWithModal.classList.add("hidden");
                        setTimeout(() => {
                            cardWithModal.style.opacity = "0";
                            cardWithModal.style.transition = ".5s ease";
                        }, 1);
                    }
                });

                portfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
                tabBtn.classList.add("active");

                // Wait for the portfolio cards to finish transitioning
                setTimeout(() => {
                    recalculateScrollReveal();
                }, 600); 
            });
        });
    }

    initImageRotation() {
        const cadCards = document.querySelectorAll('.cad .rotating-images');
        
        cadCards.forEach(cardImages => {
            const images = cardImages.querySelectorAll('img');
            let currentIndex = 0;
            
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 4000);
        });
    }

    initModals() {
        const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

        portfolioCardsWithModals.forEach((cardWithModal) => {
            new ModalHandler(cardWithModal);
        });
    }
}

class ModalHandler {
    constructor(cardWithModal) {
        this.cardWithModal = cardWithModal;
        this.portfolioCard = cardWithModal.querySelector(".portfolio-card");
        this.portfolioBackdrop = cardWithModal.querySelector(".portfolio-modal-backdrop");
        this.portfolioModal = cardWithModal.querySelector(".portfolio-modal");
        this.modalCloseBtn = cardWithModal.querySelector(".modal-close-btn");
        
        // CAD specific elements
        this.isCadCard = cardWithModal.classList.contains('cad');
        if (this.isCadCard) {
            this.initCadElements();
        }
        
        this.initEventListeners();
    }

    initCadElements() {
        this.subModalBackdrop = this.cardWithModal.querySelector(".cad-sub-modal-backdrop");
        this.subModal = this.cardWithModal.querySelector(".cad-sub-modal");
        this.subModalCloseBtn = this.cardWithModal.querySelector(".sub-modal-close-btn");
        this.subModalPrev = this.cardWithModal.querySelector(".sub-modal-prev");
        this.subModalNext = this.cardWithModal.querySelector(".sub-modal-next");
        this.cadCards = this.cardWithModal.querySelectorAll(".cad-card");
        this.currentProjectIndex = 0;
    }

    initEventListeners() {
        // Main modal events
        this.portfolioCard.addEventListener("click", () => this.openModal());
        this.modalCloseBtn.addEventListener("click", () => this.closeModal());
        this.portfolioBackdrop.addEventListener("click", (e)  => {
            if (e.target === this.portfolioBackdrop) this.closeModal();
        });

        // CAD specific events
        if (this.isCadCard && this.cadCards.length > 0) {
            this.initCadEventListeners();
        }
    }

    initCadEventListeners() {
        // CAD card clicks
        this.cadCards.forEach((cadCard, index) => {
            cadCard.addEventListener("click", () => {
                this.currentProjectIndex = index;
                this.showProject(index);
                this.openSubModal();
            });
        });

        // Navigation
        if (this.subModalPrev) {
            this.subModalPrev.addEventListener("click", () => this.navigateProject(-1));
        }
        if (this.subModalNext) {
            this.subModalNext.addEventListener("click", () => this.navigateProject(1));
        }

        // Close sub-modal
        if (this.subModalCloseBtn) {
            this.subModalCloseBtn.addEventListener("click", () => this.closeSubModal());
        }
        if (this.subModalBackdrop) {
            this.subModalBackdrop.addEventListener("click", (e) => {
                if (e.target === this.subModalBackdrop) this.closeSubModal();
            });
        }

        // Keyboard navigation
        this.keyboardHandler = (e) => {
            if (this.subModalBackdrop && this.subModalBackdrop.classList.contains("active")) {
                if (e.key === "ArrowLeft") this.navigateProject(-1);
                else if (e.key === "ArrowRight") this.navigateProject(1);
                else if (e.key === "Escape") this.closeSubModal();
            }
        };
        document.addEventListener("keydown", this.keyboardHandler);
    }

    openModal() {
        this.portfolioBackdrop.style.display = "flex";
        setTimeout(() => {
            this.portfolioBackdrop.classList.add("active");
            this.portfolioModal.classList.add("active");
        }, 10);
    }

    closeModal() {
        this.portfolioBackdrop.classList.remove("active");
        this.portfolioModal.classList.remove("active");
        setTimeout(() => {
            this.portfolioBackdrop.style.display = "none";
        }, 500);
    }

    openSubModal() {
        this.subModalBackdrop.style.display = "flex";
        setTimeout(() => {
            this.subModalBackdrop.classList.add("active");
            this.subModal.classList.add("active");
        }, 10);
    }

    closeSubModal() {
        this.subModalBackdrop.classList.remove("active");
        this.subModal.classList.remove("active");
        setTimeout(() => {
            this.subModalBackdrop.style.display = "none";
        }, 500);
    }

    navigateProject(direction) {
        this.currentProjectIndex = (this.currentProjectIndex + direction + this.cadCards.length) % this.cadCards.length;
        this.showProject(this.currentProjectIndex);
    }

    showProject(index) {
        const cadCard = this.cadCards[index];
        const projectData = {
            title: cadCard.dataset.title,
            image: cadCard.dataset.image,
            description: cadCard.dataset.description,
            details: cadCard.dataset.details
        };
        
        const subModalContent = this.subModal.querySelector(".sub-modal-content");
        
        // Fade effect
        subModalContent.style.animation = 'none';
        setTimeout(() => {
            subModalContent.style.animation = 'fadeIn 0.3s ease-in-out';
        }, 10);
        
        subModalContent.innerHTML = `
            <img src="${projectData.image}" alt="${projectData.title}">
            <h3>${projectData.title}</h3>
            <p>${projectData.description}</p>
            <p>${projectData.details}</p>
            <div class="project-counter">${index + 1} / ${this.cadCards.length}</div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new PortfolioManager();
});

/*
Testimonial Swiper
*/
var swiper = new Swiper(".tony-client-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});

/*
Send/Receive emails from contact form (EmailJS)
*/
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
    publicKey: "A_1HTz8Jl59--CiyL",
    });
})();

tonyContactForm = document.getElementById("tony-contact-form");
tonyContactFormAlert = document.querySelector(".contact-form-alert")

tonyContactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_p0xgn0s', 'template_u0hbrp7', '#tony-contact-form')
        .then(() => {
            //console.log('SUCCESS!');
            tonyContactFormAlert.innerHTML = "<span>Your Message Sent Successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
            tonyContactForm.reset();

            setTimeout(() => {
                tonyContactFormAlert.innerHTML = "";
            }, 5000);
        }, (error) => {
            //console.log('FAILED...', error);
            tonyContactFormAlert.innerHTML = "<span>Message Not Sent</span> <i class='ri-error-warning-fill'></i>";
            tonyContactFormAlert.title = error;
        });
});

/*
Shrink the height of the header on scroll
*/

window.addEventListener("scroll", () => {
    const tonyHeader = document.querySelector(".tony-header");

    tonyHeader.classList.toggle("shrink", window.scrollY > 0);
});

/*
Bottom Navigation Menu
*/

window.addEventListener("scroll", () => {
    const navMenuSections = document.querySelectorAll(".nav-menu-section");
    const scrollY = window.pageYOffset;

    navMenuSections.forEach((navMenuSection) => {
        let sectionHeight = navMenuSection.offsetHeight;
        let sectionTop = navMenuSection.offsetTop - 50;
        let id = navMenuSection.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
        }else{
            // Add small timeout to allow smooth transition
            setTimeout(() => {
                document.querySelector(".bottom-nav .menu li a[href*=" + id + "]")?.classList.remove("current");
            }, 50);
        }
    });
});

//Javascript to show bottom navigation menu on home(page Load).

window.addEventListener("DOMContentLoaded", () => {
    const bottomNav = document.querySelector(".bottom-nav");

    bottomNav.classList.toggle("active", window.scrollY < 10);
});

//Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

// Add mouseenter/mouseleave events to prevent auto-hiding during hover
bottomNav.addEventListener("mouseenter", () => {
    clearTimeout(navTimeout); // Cancel any pending hide operation
});

bottomNav.addEventListener("mouseleave", () => {
    // Only auto-hide if we've scrolled past the top
    if (window.scrollY > 10) {
        clearTimeout(navTimeout);
        navTimeout = setTimeout(() => {
            bottomNav.classList.remove("active");
            menuShowBtn.classList.add("active");
        }, 2000);
    }
});

window.addEventListener("scroll", () => {
    bottomNav.classList.add("active");
    menuShowBtn.classList.remove("active");

    if(window.scrollY < 10){
        menuHideBtn.classList.remove("active");

        function scrollStopped(){
            bottomNav.classList.add("active");
        }

        clearTimeout(navTimeout);
        navTimeout = setTimeout(scrollStopped, 2000);
    }

    if(window.scrollY > 10){
        menuHideBtn.classList.add("active");

        function scrollStopped(){
            // Only hide if not being hovered
            if (!bottomNav.matches(":hover")) {
                bottomNav.classList.remove("active");
                menuShowBtn.classList.add("active");
            }
        }

        clearTimeout(navTimeout);
        navTimeout = setTimeout(scrollStopped, 2000);
    }
});

//Hide bottom navigation menu on click menu-hide-btn.

menuHideBtn.addEventListener("click", () => {
    bottomNav.classList.toggle("active");
    menuHideBtn.classList.toggle("active");
    menuShowBtn.classList.toggle("active");
});

//Show bottom navigation menu on click menu-show-btn.

menuShowBtn.addEventListener("click", () => {
    bottomNav.classList.toggle("active");
    menuHideBtn.classList.add("active");
    menuShowBtn.classList.toggle("active");
});

/*
To-top-button with scroll indicator bar
*/

window.addEventListener("scroll", () => {
    const toTopBtn = document.querySelector(".to-top-btn");

    toTopBtn.classList.toggle("active", window.scrollY > 0);

    // Scroll indicator bar
    const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

    const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollValue = (pageScroll / height) * 100;

    scrollIndicatorBar.style.height = scrollValue + "%";
});


/*
Customized cursor on mousemove
*/
// const cursor = document.querySelector(".cursor");
// const cursorDot = cursor.querySelector(".cursor-dot");
// const cursorCircle = cursor.querySelector(".cursor-circle");

// document.addEventListener("mousemove", (e) => {
//     let x = e.clientX;
//     let y = e.clientY;

//     cursorDot.style.top = y + "px";
//     cursorDot.style.left = x + "px";
//     cursorCircle.style.top = y + "px";
//     cursorCircle.style.left = x + "px";
// });

// const cursorHoverlinks = document.querySelectorAll("body a, .theme-btn, .tony-main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn");

// cursorHoverlinks.forEach((cursorHoverlink) => {
//     cursorHoverlink.addEventListener("mouseover", () => {
//         cursorDot.classList.add("large");
//         cursorCircle.style.display = "none";
//     });
// });

// cursorHoverlinks.forEach((cursorHoverlink) => {
//     cursorHoverlink.addEventListener("mouseout", () => {
//         cursorDot.classList.remove("large");
//         cursorCircle.style.display = "block";
//     });
// });

/*
Website dark/light theme
*/

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    //Change theme icon and theme on click theme button.
    themeBtn.classList.toggle("active-sun-icon");
    document.body.classList.toggle("light-theme");

    //Save theme icon and theme on click theme button.
    const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
    const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

    localStorage.setItem("tony-saved-icon", getCurrentIcon());
    localStorage.setItem("tony-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("tony-saved-icon");
const savedTheme = localStorage.getItem("tony-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
    themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
    document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

/*
ScrollReveal JS animations
*/

// Common reveal options to create reveal animation.

ScrollReveal({ 
    // reset: true,
    distance: '60px',
    duration: 2500,
    delay: 400
});

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img', { delay: 50, origin: 'top' });
ScrollReveal().reveal('.avatar-info, .section-title', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.home-social, .home-scroll-btn', { delay: 500, origin: 'bottom' });
//ScrollReveal().reveal('.about-img', { delay: 600, origin: 'top' });
ScrollReveal().reveal('.tony-footer .tony-logo', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.pro-card, .resume-tabs .tab-btn, .portfolio-tabs .tab-btn', { delay: 400, origin: 'right', interval: 100 });
ScrollReveal().reveal('#resume .section-content', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.service-card, .portfolio-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 200, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.tony-client-swiper', { delay: 600, origin: 'right' });
ScrollReveal().reveal('.contact-form-body', { 
    delay: 600, 
    origin: 'right',
    distance: '30px',  // Reduced distance
    viewFactor: 0.3    // Only trigger when 30% of element is visible
});
ScrollReveal().reveal('.contact-info h3', { delay: 50, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-tabs .about-tab-btn', {
  delay:    400,
  origin:   'right',
  interval: 100
});

// animate the whole content block from the bottom
ScrollReveal().reveal('#about .section-content', {
  delay:  600,
  origin: 'bottom'
});

/*
Helper function to recalculate ScrollReveal positions without replaying animations
*/
function recalculateScrollReveal() {
    // Get current scroll position
    const currentScroll = window.pageYOffset;
    
    // Force ScrollReveal to recalculate element positions
    // but don't replay animations for elements already revealed
    ScrollReveal().delegate();
    
    // Trigger a small scroll event to update visibility calculations
    window.dispatchEvent(new Event('scroll'));
}