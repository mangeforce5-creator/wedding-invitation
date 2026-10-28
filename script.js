document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Wax Seal Intro & Reveal
       ========================================= */
    const waxSeal = document.getElementById('wax-seal');
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');

    // We can simulate music playing, though browsers block autoplay without interaction.
    // Since clicking the seal IS an interaction, we could play audio here.
    // let bgMusic = new Audio('path/to/romantic-music.mp3'); 

    waxSeal.addEventListener('click', () => {
        // Fade out overlay
        introOverlay.style.opacity = '0';

        setTimeout(() => {
            introOverlay.style.visibility = 'hidden';
            mainContent.classList.remove('hidden');

            // Trigger floating hearts
            startFloatingHearts();

            // Re-trigger scroll observer for elements already in view
            document.querySelectorAll('.fade-in-up').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });

            // bgMusic.play(); // Uncomment if audio file is added
        }, 1500); // Wait for CSS opacity transition
    });

    /* =========================================
       Countdown Timer
       ========================================= */
    // Set wedding date (e.g., September 7, 2032 16:00:00)
    const weddingDate = new Date('September 7, 2032 16:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h2>Today is the Day!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =========================================
       Scroll Reveal (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       Floating Hearts Generator
       ========================================= */
    const startFloatingHearts = () => {
        const container = document.getElementById('hearts-container');

        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            // Randomize position, size, and animation duration
            heart.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 10 + 10; // 10px to 20px
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';

            // Adjust pseudo-elements based on size
            const style = document.createElement('style');
            style.innerHTML = `
                .heart[style*="width: ${size}px"]::before { top: -${size / 2}px; width: ${size}px; height: ${size}px; }
                .heart[style*="width: ${size}px"]::after { left: ${size / 2}px; width: ${size}px; height: ${size}px; }
            `;
            document.head.appendChild(style);

            heart.style.animationDuration = Math.random() * 5 + 8 + 's'; // 8s to 13s

            container.appendChild(heart);

            // Remove after animation completes
            setTimeout(() => {
                heart.remove();
                style.remove();
            }, 15000);

        }, 800); // Create a new heart every 800ms
    };

    /* =========================================
       Smooth Scrolling for Nav Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* =========================================
       RSVP Form Submission
       ========================================= */
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const attendance = document.getElementById('attendance').value;

            // In a real app, this would send to a server or FormSubmit
            alert(`Thank you, ${name}! Your RSVP (${attendance}) has been received.`);
            rsvpForm.reset();
        });
    }

    /* =========================================
       Music FAB Toggle
       ========================================= */
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            musicBtn.classList.add('playing');
            // bgMusic.play();
        } else {
            musicBtn.classList.remove('playing');
            // bgMusic.pause();
        }
    });
    function playBackgroundMusic() {
        var beat = d0cument.getElementById('background-music');
        beat.play();
    }

});
