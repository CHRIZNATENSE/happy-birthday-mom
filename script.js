/* AANIE WEBB BIRTHDAY SURPRISE
SIMPLE + STABLE VERSION
*/

/* ================================
SCREEN NAVIGATION
================================ */

var screens = document.querySelectorAll(".screen");

function showScreen(id) {

```
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

createParticles(30);

if (id === "final") {
    startFinalSurprise();
}
```

}

/* ================================
PARTICLES
================================ */

function createParticles(amount) {

```
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

    var size = Math.random() * 4 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDelay =
        Math.random() * 2 + "s";

    container.appendChild(particle);

    setTimeout(function(element) {

        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }

    }, 6000, particle);
}
```

}

/* ================================
OPEN BUTTON
================================ */

var openButton = document.getElementById("openBtn");

if (openButton) {

```
openButton.onclick = function() {

    showScreen("intro");

    createParticles(100);

    startMusic();

};
```

}

/* ================================
NEXT BUTTONS
================================ */

var nextButtons =
document.querySelectorAll(".next-btn");

for (var n = 0; n < nextButtons.length; n++) {

```
nextButtons[n].onclick = function() {

    var destination =
        this.getAttribute("data-next");

    if (destination) {
        showScreen(destination);
    }
};
```

}

/* ================================
SIMPLE BACKGROUND MUSIC
================================ */

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
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {

        audioContext.resume().catch(function() {
            console.log("Audio blocked by browser.");
        });

    }

    musicPlaying = true;

    updateMusicButton();

    playMusicLoop();

} catch (error) {

    console.log("Music unavailable.");

}
```

}

function stopMusic() {

```
musicPlaying = false;

if (musicTimer) {
    clearTimeout(musicTimer);
    musicTimer = null;
}

updateMusicButton();
```

}

function updateMusicButton() {

```
var button =
    document.getElementById("musicBtn");

if (!button) {
    return;
}

if (musicPlaying) {
    button.textContent = "♫";
} else {
    button.textContent = "🔇";
}
```

}

function playTone(frequency, startDelay) {

```
if (!audioContext || !musicPlaying) {
    return;
}

try {

    var oscillator =
        audioContext.createOscillator();

    var gain =
        audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = frequency;

    gain.gain.value = 0.025;

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    var startTime =
        audioContext.currentTime +
        startDelay;

    oscillator.start(startTime);

    gain.gain.setValueAtTime(
        0.025,
        startTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + 1.5
    );

    oscillator.stop(
        startTime + 1.5
    );

} catch (error) {

    console.log("Tone unavailable.");

}
```

}

function playMusicLoop() {

```
if (!musicPlaying) {
    return;
}

var melody = [
    261.63,
    329.63,
    392.00,
    523.25,
    392.00,
    329.63,
    293.66,
    392.00
];

for (var i = 0; i < melody.length; i++) {

    playTone(
        melody[i],
        i * 0.7
    );

}

musicTimer = setTimeout(
    playMusicLoop,
    6000
);
```

}

var musicButton =
document.getElementById("musicBtn");

if (musicButton) {

```
musicButton.onclick = function() {

    if (musicPlaying) {
        stopMusic();
    } else {
        startMusic();
    }

};
```

}

/* ================================
FAMILY SLIDESHOW
================================ */

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
            (currentSlide + 1) +
            " / " +
            familyImages.length;

    }

    familySlide.style.opacity = "1";

}, 300);
```

}

/* ================================
NEXT SLIDE
================================ */

var nextSlide =
document.getElementById("nextSlide");

if (nextSlide) {

```
nextSlide.onclick = function() {

    currentSlide++;

    if (
        currentSlide >=
        familyImages.length
    ) {

        currentSlide = 0;

    }

    updateSlide();

};
```

}

/* ================================
PREVIOUS SLIDE
================================ */

var previousSlide =
document.getElementById("prevSlide");

if (previousSlide) {

```
previousSlide.onclick = function() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            familyImages.length - 1;

    }

    updateSlide();

};
```

}

/* ================================
AUTOMATIC SLIDESHOW
================================ */

setInterval(function() {

```
var familyScreen =
    document.getElementById("family");

if (!familyScreen) {
    return;
}

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
```

}, 5000);

/* ================================
FLOWER PETALS
================================ */

function createPetal() {

```
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
```

}

/* ================================
PETAL ANIMATION
================================ */

var petalStyle =
document.createElement("style");

petalStyle.innerHTML =
"@keyframes birthdayFall {" +
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

document.head.appendChild(
petalStyle
);

/* ================================
FINAL SURPRISE
================================ */

function startFinalSurprise() {

```
createParticles(150);

for (var i = 0; i < 30; i++) {

    setTimeout(function() {

        createPetal();

    }, Math.random() * 3500);

}
```

}

/* ================================
REPLAY
================================ */

var replayButton =
document.getElementById("replayBtn");

if (replayButton) {

```
replayButton.onclick = function() {

    currentSlide = 0;

    updateSlide();

    showScreen("opening");

    createParticles(80);

};
```

}

/* ================================
INITIAL
================================ */

createParticles(25);
