/* =====================================================
AANIE WEBB BIRTHDAY SURPRISE
MOBILE + MESSENGER FRIENDLY VERSION
===================================================== */

/* =====================================================
SCREEN NAVIGATION
===================================================== */

var screens =
document.querySelectorAll(".screen");

function showScreen(screenId) {

```
var target =
    document.getElementById(screenId);

if (!target) {

    console.error(
        "Screen not found: " + screenId
    );

    return;

}


screens.forEach(
    function(screen) {

        screen.classList.add(
            "hidden"
        );

    }
);


target.classList.remove(
    "hidden"
);


window.scrollTo({
    top: 0,
    behavior: "smooth"
});


createParticles(35);
```

}

/* =====================================================
PARTICLES
===================================================== */

function createParticles(amount) {

```
var container =
    document.getElementById(
        "particles"
    );


if (!container) {
    return;
}


for (
    var i = 0;
    i < amount;
    i++
) {

    var particle =
        document.createElement(
            "div"
        );


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


    container.appendChild(
        particle
    );


    setTimeout(
        function(p) {

            if (
                p &&
                p.parentNode
            ) {

                p.parentNode.removeChild(
                    p
                );

            }

        },
        6000,
        particle
    );

}
```

}

/* =====================================================
MUSIC
IMPORTANT:
MUSIC NEVER CONTROLS PAGE NAVIGATION
===================================================== */

var audioContext = null;

var musicPlaying = false;

var musicTimer = null;

function startMusic() {

```
if (musicPlaying) {
    return;
}


try {

    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        console.log(
            "Web Audio is not supported."
        );

        return;

    }


    if (!audioContext) {

        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume()
            .catch(
                function(error) {

                    console.log(
                        "Audio resume blocked:",
                        error
                    );

                }
            );

    }


    musicPlaying = true;


    playMelody();


    updateMusicButton();


} catch (error) {

    console.log(
        "Music unavailable:",
        error
    );

}
```

}

function stopMusic() {

```
musicPlaying = false;


if (musicTimer) {

    clearTimeout(
        musicTimer
    );

    musicTimer = null;

}


updateMusicButton();
```

}

function updateMusicButton() {

```
var musicButton =
    document.getElementById(
        "musicBtn"
    );


if (!musicButton) {
    return;
}


if (musicPlaying) {

    musicButton.innerHTML =
        "♫";

} else {

    musicButton.innerHTML =
        "🔇";

}
```

}

function playNote(
frequency,
duration,
delay
) {

```
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


    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime +
        delay
    );


    gain.gain.setValueAtTime(
        0,
        audioContext.currentTime +
        delay
    );


    gain.gain.linearRampToValueAtTime(
        0.035,
        audioContext.currentTime +
        delay +
        0.08
    );


    gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime +
        delay +
        duration
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );


    oscillator.start(
        audioContext.currentTime +
        delay
    );


    oscillator.stop(
        audioContext.currentTime +
        delay +
        duration
    );


} catch (error) {

    console.log(
        "Note could not play:",
        error
    );

}
```

}

function playMelody() {

```
if (!musicPlaying) {
    return;
}


var notes = [

    261.63,
    329.63,
    392.00,
    523.25,

    440.00,
    392.00,
    329.63,
    261.63,

    293.66,
    392.00,
    523.25,
    392.00

];


for (
    var i = 0;
    i < notes.length;
    i++
) {

    playNote(
        notes[i],
        1.8,
        i * 0.8
    );

}


musicTimer =
    setTimeout(
        playMelody,
        10500
    );
```

}

/* =====================================================
MUSIC BUTTON
===================================================== */

var musicButton =
document.getElementById(
"musicBtn"
);

if (musicButton) {

```
musicButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        if (musicPlaying) {

            stopMusic();

        } else {

            startMusic();

        }

    }
);
```

}

/* =====================================================
OPEN SURPRISE
MESSENGER SAFE
===================================================== */

var openButton =
document.getElementById(
"openBtn"
);

if (openButton) {

```
openButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        /*
         * IMPORTANT:
         *
         * Open the birthday page FIRST.
         *
         * Music is optional.
         *
         * Therefore Messenger cannot
         * break the page navigation.
         */

        showScreen(
            "intro"
        );


        createParticles(
            100
        );


        /*
         * Try to start music
         * separately.
         */

        try {

            startMusic();

        } catch (error) {

            console.log(
                "Music unavailable:",
                error
            );

        }

    }
);
```

}

/* =====================================================
NEXT BUTTONS
===================================================== */

var nextButtons =
document.querySelectorAll(
".next-btn"
);

nextButtons.forEach(
function(button) {

```
    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            var destination =
                button.getAttribute(
                    "data-next"
                );


            if (!destination) {
                return;
            }


            createParticles(
                50
            );


            showScreen(
                destination
            );

        }
    );

}
```

);

/* =====================================================
FAMILY SLIDESHOW
===================================================== */

var familyImages = [

```
"slidefam1.jpg",
"slidefam2.jpg",
"slidefam3.jpg",
"slidefam4.jpg",
"slidefam5.jpg"
```

];

var familyMessages = [

```
"Every moment together is a treasure.",

"The best memories are the ones we make together.",

"Through every season, we stay together.",

"Family is where love begins.",

"And these are the moments we will always remember."
```

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

```
if (!familySlide) {
    return;
}


familySlide.style.opacity =
    "0";


setTimeout(
    function() {

        familySlide.src =
            familyImages[
                currentSlide
            ];


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
    350
);
```

}

/* =====================================================
NEXT SLIDE
===================================================== */

var nextSlideButton =
document.getElementById(
"nextSlide"
);

if (nextSlideButton) {

```
nextSlideButton.addEventListener(
    "click",
    function(event) {

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
```

}

/* =====================================================
PREVIOUS SLIDE
===================================================== */

var previousSlideButton =
document.getElementById(
"prevSlide"
);

if (previousSlideButton) {

```
previousSlideButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        currentSlide--;


        if (
            currentSlide < 0
        ) {

            currentSlide =
                familyImages.length - 1;

        }


        updateSlide();

    }
);
```

}

/* =====================================================
AUTOMATIC FAMILY SLIDESHOW
===================================================== */

setInterval(
function() {

```
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
```

);

/* =====================================================
FLOWER PETALS
===================================================== */

function createPetal() {

```
var petal =
    document.createElement(
        "div"
    );


petal.innerHTML =
    "🌸";


petal.style.position =
    "fixed";


petal.style.top =
    "-40px";


petal.style.left =
    Math.random() * 100 + "%";


petal.style.fontSize =
    Math.random() * 18 +
    12 +
    "px";


petal.style.pointerEvents =
    "none";


petal.style.zIndex =
    "150";


petal.style.animation =
    "birthdayFall " +
    (
        Math.random() * 5 +
        5
    ) +
    "s linear";


document.body.appendChild(
    petal
);


setTimeout(
    function() {

        if (
            petal &&
            petal.parentNode
        ) {

            petal.parentNode.removeChild(
                petal
            );

        }

    },
    10000
);
```

}

/* =====================================================
PETAL CSS
===================================================== */

var petalAnimation =
document.createElement(
"style"
);

petalAnimation.textContent =
"@keyframes birthdayFall {" +

```
"0% {" +
"transform: translateY(0) rotate(0deg);" +
"opacity: 0;" +
"}" +

"15% {" +
"opacity: 1;" +
"}" +

"100% {" +
"transform: translateY(110vh) rotate(720deg);" +
"opacity: 0;" +
"}" +

"}";
```

document.head.appendChild(
petalAnimation
);

/* =====================================================
FINAL SURPRISE
===================================================== */

function finalSurprise() {

```
createParticles(
    150
);


for (
    var i = 0;
    i < 35;
    i++
) {

    setTimeout(
        function() {

            createPetal();

        },
        Math.random() *
        3500
    );

}
```

}

/* =====================================================
WATCH FOR FINAL SCREEN
===================================================== */

var finalScreen =
document.getElementById(
"final"
);

if (finalScreen) {

```
var finalObserver =
    new MutationObserver(
        function() {

            if (
                !finalScreen.classList.contains(
                    "hidden"
                )
            ) {

                finalSurprise();

            }

        }
    );


finalObserver.observe(
    finalScreen,
    {
        attributes: true,
        attributeFilter: [
            "class"
        ]
    }
);
```

}

/* =====================================================
REPLAY
===================================================== */

var replayButton =
document.getElementById(
"replayBtn"
);

if (replayButton) {

```
replayButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        currentSlide = 0;


        updateSlide();


        showScreen(
            "opening"
        );


        createParticles(
            80
        );

    }
);
```

}

/* =====================================================
INITIAL PARTICLES
===================================================== */

createParticles(
25
);
