/* =====================================================================
   🎈 EDIT YOUR BIRTHDAY MESSAGES HERE 🎈
   ===================================================================== */
const birthdayMessages = [
    "Happy birthday ❤️🥳🎂🥳 babiiii, sweetheart, sunshine, cupcake, buttercup, pandu 🤭",
    "You are a very especial for me. I always silently thank you for coming into my life.",
    "Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕",
    "Bahut khubsurat ho tum, thoda sambhal jaya karo, Duniya ke nazron se khudko bachaya karo,",
    "Sirf kajal se kaam nahi chalega meri jaan, Gale mein nimbu, mirchi aur chappal bhi latkaya karo! 😄💫"
];
/* ===================================================================== */


// DOM Elements
const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const nextBtn = document.getElementById('next-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const messageContainer = document.getElementById('message-container');
const celebrationContainer = document.getElementById('celebration-container');

let isMusicPlaying = false;
let interacted = false;

// Handle Music Playback & Autoplay restrictions
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.innerText = "🔇";
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicIcon.innerText = "🎵";
    }
    isMusicPlaying = !isMusicPlaying;
}

musicToggle.addEventListener('click', toggleMusic);

// Ensure music starts on the first click anywhere if autoplay was blocked
document.body.addEventListener('click', () => {
    if (!interacted && !isMusicPlaying) {
        toggleMusic();
        interacted = true;
    }
}, { once: true });


// Transition to Screen 2
nextBtn.addEventListener('click', () => {
    // Fade out screen 1
    screen1.classList.remove('active');
    screen1.classList.add('hidden');
    
    // Fade in screen 2
    screen2.classList.remove('hidden');
    screen2.classList.add('active');

    // Start Screen 2 sequences
    setTimeout(() => {
        startTypingMessages();
        startCelebration();
    }, 1000);
});


// Message Fade-in Animation Sequence
function startTypingMessages() {
    messageContainer.innerHTML = ''; // Clear container
    
    birthdayMessages.forEach((msg, index) => {
        const p = document.createElement('p');
        p.innerText = msg;
        messageContainer.appendChild(p);

        // Stagger the fade-in of each message
        setTimeout(() => {
            p.classList.add('visible');
        }, index * 2500); // 2.5 seconds between each paragraph appearing
    });
}


// Celebration Animations (Confetti & Sparkles)
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize colors (Gold, Pink, Blue, White)
    const colors = ['#ffd700', '#ff69b4', '#00bfff', '#ffffff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Randomize properties
    const size = Math.random() * 10 + 5; // 5px to 15px
    const startPosX = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2; // 2s to 5s fall duration
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = randomColor;
    particle.style.left = `${startPosX}px`;
    particle.style.top = `-20px`; // Start above screen
    particle.style.animationDuration = `${duration}s`;
    
    // Shape: mix of circles and squares
    if (Math.random() > 0.5) {
        particle.style.borderRadius = '0'; // Square confetti
    }

    celebrationContainer.appendChild(particle);

    // Remove particle after animation to prevent memory leak
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

function startCelebration() {
    // Generate a particle every 150ms for a continuous festive effect
    setInterval(createParticle, 150);
}