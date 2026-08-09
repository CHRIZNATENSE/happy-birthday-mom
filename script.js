/* =====================================================
   AANIE WEBB BIRTHDAY SURPRISE
   LUXURY + MUSIC + ANIMATIONS
===================================================== */

var screens = document.querySelectorAll(".screen");

var music = document.getElementById("birthdayMusic");
var musicButton = document.getElementById("musicBtn");

var musicStarted = false;


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(id) {

    var target = document.getElementById(id);

    if (!target) {
        console.log("Screen not found: " + id);
        return;
    }

    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.add("hidden");
    }

    target.classList.remove("hidden");

    window.scrollTo(0, 0);

    createParticles(35);

    if (id === "final") {
        startFinalSurprise();
    }
}


/* =====================================================
   MUSIC
===================================================== */

function startMusic() {

    if (!music) {
        console.log("birthdayMusic element not found.");
        return;
    }

    music.volume = 0.45;

    var playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(function() {

                musicStarted = true;

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch(function(error) {

                console.log(
                    "Music waiting for user interaction."
                );

            });
    }
}


function toggleMusic() {

    if (!music) {
        return;
    }

    if (music.paused) {

        music.play()
            .then(function() {

                musicStarted = true;

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch(function(error) {

                console.log(
                    "Music could not start."
                );

            });

    } else {

        music.pause();

        if (musicButton) {
            musicButton.textContent = "🔇";
        }
    }
}


if (musicButton) {

    musicButton.onclick = function(event) {

        event.preventDefault();

        toggleMusic();

    };
}


/* =====================================================
   OPEN SURPRISE
===================================================== */

var openButton =
    document.getElementById("openBtn");

if (openButton) {

    openButton.onclick = function(event) {

        event.preventDefault();

        showScreen("intro");

        createParticles(100);

        startMusic();

    };
}


/* =====================================================
   NEXT BUTTONS
===================================================== */

var nextButtons =
    document.querySelectorAll(".next-btn");

for (var i = 0; i < nextButtons.length; i++) {

    nextButtons[i].onclick = function(event) {

        event.preventDefault();

        var destination =
            this.getAttribute("data-next");

        if (destination) {

            showScreen(destination);

        }
    };
}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles(amount) {

    var container =
        document.getElementById("particles");

    if (!container) {
        return;
    }

    for (var i = 0; i < amount; i++) {

        var particle =
            document.createElement("div");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        var size =
            Math.random() * 4 + 2;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.animationDelay =
            Math.random() * 2 + "s";

        container.appendChild(particle);

        setTimeout(function(element) {

            if (
                element &&
                element.parentNode
            ) {

                element.parentNode.removeChild(
                    element
                );

            }

        }, 6000, particle);
    }
}


/* =====================================================
   FAMILY SLIDESHOW
===================================================== */

var familyImages = [
    "slidefam1.jpg",
    "slidefam2.jpg",
    "slidefam3.jpg",
    "slidefam4.jpg",
    "slidefam5.jpg"
];


var familyMessages = [
    "Every moment together is a treasure.",
    "The best memories are the ones we make together.",
    "Through every season, we stay together.",
    "Family is where love begins.",
    "And these are the moments we will always remember."
];


var currentSlide = 0;

var familySlide =
    document.getElementById("familySlide");

var slideText =
    document.getElementById("slideText");

var slideNumber =
    document.getElementById("slideNumber");


function updateSlide() {

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
                (currentSlide + 1) +
                " / " +
                familyImages.length;

        }

        familySlide.style.opacity = "1";

    }, 300);
}


/* =====================================================
   NEXT SLIDE
===================================================== */

var nextSlide =
    document.getElementById("nextSlide");

if (nextSlide) {

    nextSlide.onclick = function(event) {

        event.preventDefault();

        currentSlide++;

        if (
            currentSlide >=
            familyImages.length
        ) {

            currentSlide = 0;

        }

        updateSlide();

    };
}


/* =====================================================
   PREVIOUS SLIDE
===================================================== */

var previousSlide =
    document.getElementById("prevSlide");

if (previousSlide) {

    previousSlide.onclick = function(event) {

        event.preventDefault();

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                familyImages.length - 1;

        }

        updateSlide();

    };
}


/* =====================================================
   AUTOMATIC FAMILY SLIDESHOW
===================================================== */

setInterval(function() {

    var familyScreen =
        document.getElementById("family");

    if (!familyScreen) {
        return;
    }

    if (
        !familyScreen.classList.contains(
            "hidden"
        )
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


/* =====================================================
   FLOWER PETALS
===================================================== */

function createPetal() {

    var petal =
        document.createElement("div");

    petal.textContent = "🌸";

    petal.style.position = "fixed";

    petal.style.top = "-40px";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.fontSize =
        (Math.random() * 18 + 12) + "px";

    petal.style.pointerEvents = "none";

    petal.style.zIndex = "150";

    petal.style.animation =
        "birthdayFall " +
        (Math.random() * 5 + 5) +
        "s linear";

    document.body.appendChild(petal);

    setTimeout(function() {

        if (
            petal &&
            petal.parentNode
        ) {

            petal.parentNode.removeChild(
                petal
            );
        }

    }, 10000);
}


/* =====================================================
   FINAL SURPRISE
===================================================== */

function startFinalSurprise() {

    createParticles(150);

    for (var i = 0; i < 35; i++) {

        setTimeout(function() {

            createPetal();

        }, Math.random() * 5000);

    }
}


/* =====================================================
   REPLAY
===================================================== */

var replayButton =
    document.getElementById("replayBtn");

if (replayButton) {

    replayButton.onclick = function(event) {

        event.preventDefault();

        currentSlide = 0;

        updateSlide();

        if (music) {
            music.pause();
            music.currentTime = 0;
        }

        if (musicButton) {
            musicButton.textContent = "♫";
        }

        showScreen("opening");

        createParticles(80);

    };
}


/* =====================================================
   INITIAL PARTICLES
===================================================== */

createParticles(25);
