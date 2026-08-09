/* =====================================
AANIE WEBB BIRTHDAY SURPRISE
===================================== */

/* =====================================
SCREEN NAVIGATION
===================================== */

const screens = document.querySelectorAll(".screen");

function showScreen(screenId) {

```
const target = document.getElementById(screenId);

if (!target) {
    console.error("Screen not found:", screenId);
    return;
}

screens.forEach(function(screen) {
    screen.classList.add("hidden");
});

target.classList.remove("hidden");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

createParticles(25);
```

}

/* =====================================
OPENING BUTTON
===================================== */

const openButton = document.getElementById("openBtn");

if (openButton) {

```
openButton.addEventListener("click", function() {

    createParticles(60);

    showScreen("intro");

});
```

}

/* =====================================
ALL NEXT BUTTONS
===================================== */

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(function(button) {

```
button.addEventListener("click", function() {

    const destination = this.getAttribute("data-next");

    if (destination) {

        showScreen(destination);

    }

});
```

});

/* =====================================
FAMILY SLIDESHOW
===================================== */

const familyImages = [

```
"slidefam1.jpg",
"slidefam2.jpg",
"slidefam3.jpg",
"slidefam4.jpg",
"slidefam5.jpg"
```

];

const familyMessages = [

```
"Every moment together is a treasure.",

"The best memories are the ones we make together.",

"Through every season, we stay together.",

"Family is where love begins.",

"And these are the moments we will always remember."
```

];

let currentSlide = 0;

const familySlide =
document.getElementById("familySlide");

const slideText =
document.getElementById("slideText");

const slideNumber =
document.getElementById("slideNumber");

function updateSlide() {

```
if (!familySlide) {
    return;
}

familySlide.style.opacity = "0";


setTimeout(function() {

    familySlide.src =
        familyImages[currentSlide];


    if (slideText) {

        slideText.textContent =
            familyMessages[currentSlide];

    }


    if (slideNumber) {

        slideNumber.textContent =
            `${currentSlide + 1} / ${familyImages.length}`;

    }


    familySlide.style.opacity = "1";

}, 400);
```

}

/* =====================================
NEXT SLIDE BUTTON
===================================== */

const nextSlideButton =
document.getElementById("nextSlide");

if (nextSlideButton) {

```
nextSlideButton.addEventListener(
    "click",
    function() {

        currentSlide++;

        if (
            currentSlide >=
            familyImages.length
        ) {

            currentSlide = 0;

        }

        updateSlide();

    }
);
```

}

/* =====================================
PREVIOUS SLIDE BUTTON
===================================== */

const previousSlideButton =
document.getElementById("prevSlide");

if (previousSlideButton) {

```
previousSlideButton.addEventListener(
    "click",
    function() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                familyImages.length - 1;

        }

        updateSlide();

    }
);
```

}

/* =====================================
AUTOMATIC FAMILY SLIDESHOW
===================================== */

setInterval(function() {

```
const familyScreen =
    document.getElementById("family");


if (
    familyScreen &&
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
```

}, 5000);

/* =====================================
GOLD PARTICLES
===================================== */

function createParticles(amount) {

```
const container =
    document.getElementById("particles");


if (!container) {
    return;
}


for (let i = 0; i < amount; i++) {

    const particle =
        document.createElement("div");


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    const size =
        Math.random() * 4 + 2;


    particle.style.width =
        size + "px";


    particle.style.height =
        size + "px";


    particle.style.animationDelay =
        Math.random() * 2 + "s";


    container.appendChild(
        particle
    );


    setTimeout(function() {

        particle.remove();

    }, 6000);

}
```

}

/* =====================================
INITIAL PARTICLES
===================================== */

createParticles(20);

/* =====================================
FINAL FLOWER PETALS
===================================== */

function createPetal() {

```
const petal =
    document.createElement("div");


petal.textContent = "🌸";


petal.style.position =
    "fixed";


petal.style.top =
    "-30px";


petal.style.left =
    Math.random() * 100 + "%";


petal.style.fontSize =
    Math.random() * 15 + 12 + "px";


petal.style.pointerEvents =
    "none";


petal.style.zIndex =
    "20";


petal.style.animation =
    `fall ${Math.random() * 5 + 5}s linear`;


document.body.appendChild(
    petal
);


setTimeout(function() {

    petal.remove();

}, 10000);
```

}

/* =====================================
CREATE PETALS ONLY ON FINAL PAGE
===================================== */

setInterval(function() {

```
const finalScreen =
    document.getElementById("final");


if (
    finalScreen &&
    !finalScreen.classList.contains("hidden")
) {

    createPetal();

}
```

}, 700);
