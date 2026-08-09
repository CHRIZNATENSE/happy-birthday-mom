/* =====================================================
   AANIE WEBB BIRTHDAY SURPRISE
   STABLE MOBILE VERSION
   CINEMATIC MUSIC + PARTICLES + SLIDESHOW
===================================================== */


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

var screens = document.querySelectorAll(".screen");


function showScreen(id) {

    var target = document.getElementById(id);

    if (!target) {
        console.log("Screen not found:", id);
        return;
    }

    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.add("hidden");
    }

    target.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    createParticles(35);

    if (id === "final") {
        startFinalSurprise();
    }
}


/* =====================================================
   OPEN SURPRISE
===================================================== */

var openButton = document.getElementById("openBtn");


if (openButton) {

    openButton.addEventListener("click", function (event) {

        event.preventDefault();

        /*
         * IMPORTANT:
         * Music starts here because this is a real
         * user interaction. This works much better
         * on Android and mobile browsers.
         */

        startMusic();

        createParticles(100);

        showScreen("intro");

    });

}


/* =====================================================
   NEXT BUTTONS
===================================================== */

var nextButtons =
    document.querySelectorAll(".next-btn");


for (var buttonIndex = 0;
     buttonIndex < nextButtons.length;
     buttonIndex++) {

    nextButtons[buttonIndex].addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            var destination =
                this.getAttribute("data-next");

            if (destination) {
                showScreen(destination);
            }

        }
    );

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

        particle.className =
            "particle";

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

        setTimeout(
            removeElement,
            6000,
            particle
        );
    }
}


function removeElement(element) {

    if (
        element &&
        element.parentNode
    ) {

        element.parentNode.removeChild(
            element
        );

    }
}


/* =====================================================
   CINEMATIC BACKGROUND MUSIC
===================================================== */

var audioContext = null;

var musicPlaying = false;

var musicTimer = null;


/*
 * This is a gentle original melody generated
 * directly by the browser.
 *
 * No external music file is required.
 *
 * That means:
 * - No music.mp3 to upload
 * - No broken music URL
 * - Works on GitHub Pages
 * - Starts after the user taps the button
 */

var melody = [

    261.63,
    329.63,
    392.00,
    523.25,

    392.00,
    329.63,
    293.66,
    392.00,

    261.63,
    329.63,
    440.00,
    523.25,

    440.00,
    392.00,
    329.63,
    261.63

];


function startMusic() {

    try {

        var AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContextClass) {

            console.log(
                "Web Audio is not supported."
            );

            return;
        }


        if (!audioContext) {

            audioContext =
                new AudioContextClass();

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume()
                .catch(function () {

                    console.log(
                        "Audio resume blocked."
                    );

                });

        }


        musicPlaying = true;

        updateMusicButton();

        playMusicLoop();

    } catch (error) {

        console.log(
            "Music unavailable:",
            error
        );

    }

}


function stopMusic() {

    musicPlaying = false;

    if (musicTimer) {

        clearTimeout(musicTimer);

        musicTimer = null;

    }

    updateMusicButton();

}


function updateMusicButton() {

    var button =
        document.getElementById("musicBtn");

    if (!button) {
        return;
    }

    if (musicPlaying) {

        button.textContent = "♫";

        button.classList.add(
            "music-active"
        );

        button.setAttribute(
            "aria-label",
            "Turn music off"
        );

    } else {

        button.textContent = "🔇";

        button.classList.remove(
            "music-active"
        );

        button.setAttribute(
            "aria-label",
            "Turn music on"
        );

    }

}


/* =====================================================
   PLAY ONE NOTE
===================================================== */

function playTone(
    frequency,
    startDelay,
    duration
) {

    if (
        !audioContext ||
        !musicPlaying
    ) {

        return;

    }

    try {

        var oscillator =
            audioContext.createOscillator();

        var gain =
            audioContext.createGain();


        oscillator.type =
            "sine";

        oscillator.frequency.value =
            frequency;


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        var startTime =
            audioContext.currentTime +
            startDelay;


        /*
         * Very quiet volume so it feels
         * like background music.
         */

        gain.gain.setValueAtTime(
            0.0001,
            startTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.035,
            startTime + 0.08
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + duration
        );


        oscillator.start(
            startTime
        );

        oscillator.stop(
            startTime + duration
        );

    } catch (error) {

        console.log(
            "Tone error:",
            error
        );

    }

}


/* =====================================================
   MUSIC LOOP
===================================================== */

function playMusicLoop() {

    if (!musicPlaying) {
        return;
    }


    /*
     * Play the melody slowly.
     */

    for (
        var i = 0;
        i < melody.length;
        i++
    ) {

        playTone(
            melody[i],
            i * 0.65,
            1.15
        );

    }


    /*
     * Loop after approximately 10.5 seconds.
     */

    musicTimer =
        setTimeout(
            playMusicLoop,
            10500
        );

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

var musicButton =
    document.getElementById("musicBtn");


if (musicButton) {

    musicButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (musicPlaying) {

                stopMusic();

            } else {

                startMusic();

            }

        }
    );

}


/* =====================================================
   FAMILY SLIDESHOW
===================================================== */


/*
 * IMPORTANT:
 *
 * slidefam4.jpg has been REMOVED.
 *
 * We now use:
 *
 * slidefam1.jpg
 * slidefam2.jpg
 * slidefam3.jpg
 * slidefam5.jpg
 *
 */

var familyImages = [

    "slidefam1.jpg",
    "slidefam2.jpg",
    "slidefam3.jpg",
    "slidefam5.jpg"

];


var familyMessages = [

    "Every moment together is a treasure.",

    "The best memories are the ones we make together.",

    "Through every season, we stay together.",

    "Family is where love begins."

];


var currentSlide = 0;


var familySlide =
    document.getElementById(
        "familySlide"
    );


var slideText =
    document.getElementById(
        "slideText"
    );


var slideNumber =
    document.getElementById(
        "slideNumber"
    );


function updateSlide() {

    if (!familySlide) {
        return;
    }


    familySlide.style.opacity =
        "0";


    setTimeout(
        function () {

            familySlide.src =
                familyImages[
                    currentSlide
                ];


            familySlide.onerror =
                function () {

                    console.log(
                        "Image not found:",
                        familyImages[
                            currentSlide
                        ]
                    );

                    familySlide.style.opacity =
                        "1";

                };


            if (slideText) {

                slideText.textContent =
                    familyMessages[
                        currentSlide
                    ];

            }


            if (slideNumber) {

                slideNumber.textContent =
                    (
                        currentSlide + 1
                    ) +
                    " / " +
                    familyImages.length;

            }


            familySlide.style.opacity =
                "1";

        },
        300
    );

}


/* =====================================================
   NEXT SLIDE
===================================================== */

var nextSlide =
    document.getElementById(
        "nextSlide"
    );


if (nextSlide) {

    nextSlide.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

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

}


/* =====================================================
   PREVIOUS SLIDE
===================================================== */

var previousSlide =
    document.getElementById(
        "prevSlide"
    );


if (previousSlide) {

    previousSlide.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide =
                    familyImages.length - 1;

            }

            updateSlide();

        }
    );

}


/* =====================================================
   AUTOMATIC SLIDESHOW
===================================================== */

setInterval(
    function () {

        var familyScreen =
            document.getElementById(
                "family"
            );


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

    },
    5000
);


/* =====================================================
   FLOWER PETALS
===================================================== */

function createPetal() {

    var petal =
        document.createElement(
            "div"
        );


    petal.className =
        "birthday-petal";


    petal.textContent =
        "🌸";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.fontSize =
        (
            Math.random() * 18 + 12
        ) +
        "px";


    petal.style.animationDuration =
        (
            Math.random() * 5 + 5
        ) +
        "s";


    document.body.appendChild(
        petal
    );


    setTimeout(
        removeElement,
        10000,
        petal
    );

}


/* =====================================================
   FINAL SURPRISE
===================================================== */

var finalSurpriseStarted =
    false;


function startFinalSurprise() {

    /*
     * Prevent the animation from
     * restarting every time accidentally.
     */

    if (finalSurpriseStarted) {
        return;
    }

    finalSurpriseStarted =
        true;


    createParticles(150);


    /*
     * Big flower-petal celebration.
     */

    for (
        var i = 0;
        i < 35;
        i++
    ) {

        setTimeout(
            createPetal,
            Math.random() * 5000
        );

    }

}


/* =====================================================
   REPLAY
===================================================== */

var replayButton =
    document.getElementById(
        "replayBtn"
    );


if (replayButton) {

    replayButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            finalSurpriseStarted =
                false;


            currentSlide = 0;


            updateSlide();


            showScreen(
                "opening"
            );


            createParticles(80);


            /*
             * Music stays available.
             * If it was already playing,
             * it continues.
             */

        }
    );

}


/* =====================================================
   INITIAL SETUP
===================================================== */

createParticles(25);


/*
 * Make sure the first family
 * slide is correctly initialized.
 */

if (familySlide) {

    familySlide.src =
        familyImages[0];

}


if (slideText) {

    slideText.textContent =
        familyMessages[0];

}


if (slideNumber) {

    slideNumber.textContent =
        "1 / " +
        familyImages.length;

}


updateMusicButton();


console.log(
    "Aanie Webb Birthday Surprise loaded successfully! 🌸"
);
