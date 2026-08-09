/* =====================================================
   AANIE WEBB BIRTHDAY SURPRISE
   JAVASCRIPT
===================================================== */


/* =====================================================
   SCREEN SYSTEM
===================================================== */

var screens = document.querySelectorAll(".screen");


function showScreen(screenId) {

    var target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found: " + screenId);
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

    createParticles(30);
}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles(amount) {

    var container = document.getElementById("particles");

    if (!container) {
        return;
    }

    for (var i = 0; i < amount; i++) {

        var particle = document.createElement("div");

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

        setTimeout(function() {

            if (particle) {
                particle.remove();
            }

        }, 6000);
    }
}


/* =====================================================
   CINEMATIC MUSIC
===================================================== */

var audioContext = null;

var musicPlaying = false;

var musicTimer = null;

var musicNodes = [];


function startMusic() {

    if (musicPlaying) {
        return;
    }

    var AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    audioContext =
        new AudioContextClass();

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    musicPlaying = true;

    playMusicLoop();

    var musicButton =
        document.getElementById("musicBtn");

    if (musicButton) {
        musicButton.textContent = "♫";
    }
}


function stopMusic() {

    musicPlaying = false;

    if (musicTimer) {
        clearTimeout(musicTimer);
        musicTimer = null;
    }

    musicNodes.forEach(function(node) {

        try {
            node.stop();
        } catch (error) {
        }

    });

    musicNodes = [];

    var musicButton =
        document.getElementById("musicBtn");

    if (musicButton) {
        musicButton.textContent = "🔇";
    }
}


function playMusicNote(
    frequency,
    duration,
    delay
) {

    if (!audioContext) {
        return;
    }

    var oscillator =
        audioContext.createOscillator();

    var gain =
        audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        0,
        audioContext.currentTime + delay
    );

    gain.gain.linearRampToValueAtTime(
        0.045,
        audioContext.currentTime + delay + 0.1
    );

    gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + delay + duration
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start(
        audioContext.currentTime + delay
    );

    oscillator.stop(
        audioContext.currentTime +
        delay +
        duration +
        0.1
    );

    musicNodes.push(oscillator);

    setTimeout(function() {

        var index =
            musicNodes.indexOf(oscillator);

        if (index !== -1) {
            musicNodes.splice(index, 1);
        }

    }, (delay + duration + 1) * 1000);
}


function playMusicLoop() {

    if (!musicPlaying) {
        return;
    }

    /*
       Gentle cinematic melody.

       Notes:
       C4 = 261.63
       E4 = 329.63
       G4 = 392.00
       A4 = 440.00
       C5 = 523.25
       D5 = 587.33
    */

    playMusicNote(261.63, 2.8, 0);
    playMusicNote(329.63, 2.8, 0.7);
    playMusicNote(392.00, 3.2, 1.4);

    playMusicNote(329.63, 2.8, 3.2);
    playMusicNote(392.00, 2.8, 3.9);
    playMusicNote(523.25, 3.2, 4.6);

    playMusicNote(440.00, 2.8, 6.5);
    playMusicNote(392.00, 2.8, 7.2);
    playMusicNote(329.63, 3.5, 7.9);

    playMusicNote(261.63, 3.5, 9.5);
    playMusicNote(392.00, 3.5, 10.2);
    playMusicNote(523.25, 4, 10.9);

    musicTimer =
        setTimeout(function() {

            playMusicLoop();

        }, 13500);
}


/* =====================================================
   MUSIC BUTTON
===================================================== */

var musicButton =
    document.getElementById("musicBtn");


if (musicButton) {

    musicButton.addEventListener(
        "click",
        function() {

            if (musicPlaying) {

                stopMusic();

            } else {

                startMusic();

            }

        }
    );
}


/* =====================================================
   OPEN SURPRISE
===================================================== */

var openButton =
    document.getElementById("openBtn");


if (openButton) {

    openButton.addEventListener(
        "click",
        function() {

            /*
               Start music immediately because
               the browser allows audio after
               a user click.
            */

            startMusic();

            createParticles(100);

            /*
               Small cinematic delay.
            */

            openButton.disabled = true;

            setTimeout(function() {

                showScreen("intro");

            }, 700);

        }
    );
}


/* =====================================================
   NEXT BUTTONS
===================================================== */

var nextButtons =
    document.querySelectorAll(".next-btn");


nextButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            var destination =
                button.getAttribute("data-next");

            if (destination) {

                createParticles(50);

                showScreen(destination);

            }

        }
    );
});


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

    }, 350);
}


/* =====================================================
   NEXT SLIDE
===================================================== */

var nextSlideButton =
    document.getElementById("nextSlide");


if (nextSlideButton) {

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
}


/* =====================================================
   PREVIOUS SLIDE
===================================================== */

var previousSlideButton =
    document.getElementById("prevSlide");


if (previousSlideButton) {

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
}


/* =====================================================
   AUTOMATIC FAMILY SLIDESHOW
===================================================== */

setInterval(function() {

    var familyScreen =
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

}, 5000);


/* =====================================================
   FINAL SURPRISE PETALS
===================================================== */

function createPetal() {

    var petal =
        document.createElement("div");

    petal.textContent = "🌸";

    petal.style.position =
        "fixed";

    petal.style.top =
        "-40px";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.fontSize =
        Math.random() * 18 + 12 + "px";

    petal.style.pointerEvents =
        "none";

    petal.style.zIndex =
        "150";

    petal.style.transition =
        "none";

    var fallTime =
        Math.random() * 5 + 5;

    petal.style.animation =
        "fall " +
        fallTime +
        "s linear";

    document.body.appendChild(petal);

    setTimeout(function() {

        petal.remove();

    }, 10000);
}


/* =====================================================
   PETAL CSS
===================================================== */

var petalStyle =
    document.createElement("style");


petalStyle.textContent =

    "@keyframes fall {" +

    "0% {" +
    "transform: translateY(0) rotate(0deg);" +
    "opacity: 0;" +
    "}" +

    "10% {" +
    "opacity: 1;" +
    "}" +

    "100% {" +
    "transform: translateY(110vh) rotate(720deg);" +
    "opacity: 0;" +
    "}" +

    "}";


document.head.appendChild(
    petalStyle
);


/* =====================================================
   FINAL SURPRISE EFFECT
===================================================== */

function finalExplosion() {

    createParticles(150);

    for (var i = 0; i < 35; i++) {

        setTimeout(function() {

            createPetal();

        }, Math.random() * 3000);

    }

}


/* =====================================================
   FINAL SCREEN DETECTION
===================================================== */

var finalScreen =
    document.getElementById("final");


var finalObserver =
    new MutationObserver(function() {

        if (
            finalScreen &&
            !finalScreen.classList.contains("hidden")
        ) {

            finalExplosion();

        }

    });


if (finalScreen) {

    finalObserver.observe(
        finalScreen,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );

}


/* =====================================================
   REPLAY
===================================================== */

var replayButton =
    document.getElementById("replayBtn");


if (replayButton) {

    replayButton.addEventListener(
        "click",
        function() {

            currentSlide = 0;

            updateSlide();

            showScreen("opening");

            createParticles(80);

        }
    );
}


/* =====================================================
   INITIAL EFFECT
===================================================== */

createParticles(25);
