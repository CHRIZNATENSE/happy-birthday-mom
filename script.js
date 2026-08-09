/* =========================
   BIRTHDAY SURPRISE
   Aanie Webb
========================= */


/* =========================
   SCREEN NAVIGATION
========================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.add("hidden");

    });

    const target = document.getElementById(id);

    target.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    createParticles(15);
}


/* =========================
   OPEN SURPRISE
========================= */

const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {

    createParticles(50);

    showScreen("intro");

});


/* =========================
   NEXT BUTTONS
========================= */

const nextButtons =
    document.querySelectorAll(".next-btn");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScreen =
            button.dataset.next;

        showScreen(nextScreen);

    });

});


/* =========================
   FAMILY SLIDESHOW
========================= */

const familyImages = [

    "slidefam1.jpg",
    "slidefam2.jpg",
    "slidefam3.jpg",
    "slidefam4.jpg",
    "slidefam5.jpg"

];

const slideMessages = [

    "Every moment together is a treasure.",

    "The best memories are the ones we make together.",

    "Through every season, we stay together.",

    "Family is where love begins.",

    "And these are the moments we will always remember."

];

let currentSlide = 0;

const familySlide =
    document.getElementById("familySlide");

const slideText =
    document.getElementById("slideText");

const slideNumber =
    document.getElementById("slideNumber");


function updateSlide() {

    familySlide.style.opacity = 0;

    setTimeout(() => {

        familySlide.src =
            familyImages[currentSlide];

        slideText.textContent =
            slideMessages[currentSlide];

        slideNumber.textContent =
            `${currentSlide + 1} / ${familyImages.length}`;

        familySlide.style.opacity = 1;

    }, 400);

}


/* NEXT SLIDE */

document
    .getElementById("nextSlide")
    .addEventListener("click", () => {

        currentSlide++;

        if (
            currentSlide >=
            familyImages.length
        ) {

            currentSlide = 0;

        }

        updateSlide();

    });


/* PREVIOUS SLIDE */

document
    .getElementById("prevSlide")
    .addEventListener("click", () => {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                familyImages.length - 1;

        }

        updateSlide();

    });


/* =========================
   AUTOMATIC SLIDESHOW
========================= */

setInterval(() => {

    const familyScreen =
        document.getElementById("family");

    if (
        !familyScreen.classList.contains("hidden")
    ) {

        currentSlide++;

        if (
            currentSlide >=
            familyImages.length
        ) {

            currentSlide = 0;

        }

        updateSlide();

    }

}, 5000);


/* =========================
   GOLD PARTICLES
========================= */

function createParticles(amount) {

    const container =
        document.getElementById("particles");

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 2 + "s";

        particle.style.width =
            Math.random() * 4 + 2 + "px";

        particle.style.height =
            particle.style.width;

        container.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 6000);

    }

}


/* =========================
   INITIAL PARTICLES
========================= */

createParticles(20);


/* =========================
   FINAL PETALS
========================= */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position = "fixed";

    petal.style.top = "-30px";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.fontSize =
        Math.random() * 15 + 12 + "px";

    petal.style.pointerEvents =
        "none";

    petal.style.zIndex = "20";

    petal.style.animation =
        `fall ${Math.random() * 5 + 5}s linear`;

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 10000);

}


/* =========================
   PETAL ANIMATION STYLE
========================= */

const style =
    document.createElement("style");

style.innerHTML = `

@keyframes fall {

    0% {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 0;

    }

    10% {

        opacity: 1;

    }

    100% {

        transform:
            translateY(110vh)
            rotate(360deg);

        opacity: 0;

    }

}

`;

document.head.appendChild(style);


/* =========================
   PETALS WHEN FINAL OPENS
========================= */

setInterval(() => {

    const finalScreen =
        document.getElementById("final");

    if (
        !finalScreen.classList.contains("hidden")
    ) {

        createPetal();

    }

}, 700);
