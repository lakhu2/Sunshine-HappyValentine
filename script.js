// Ensure no modal is visible immediately
(function(){
    try {
        ['modal','dailyModal','fullMessageModal','quizModal','resultModal','reflectionsModal','gameModal','duelModal'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    } catch(e) {}
})();

// ===== VALENTINE INTRO PAGE FUNCTIONS =====
function initIntroPage() {
    const introResponded = localStorage.getItem('valentineIntroResponded');
    const introPage = document.getElementById('introPage');
    const audio = document.getElementById('bgMusic');
    
    if (introResponded === 'yes') {
        if (introPage) introPage.classList.add('hidden');
        showMainApp();
    } else {
        if (introPage) introPage.classList.remove('hidden');
        setupIntroHearts();
        setupEscapeNoButton();
        setupYesButton();
        
        const startMusic = () => {
            audio.play().then(() => {
                isMusicPlaying = true;
                const introIcon = document.getElementById('introMusicIcon');
                const homeIcon = document.getElementById('homeMusicIcon');
                if (introIcon) introIcon.textContent = '🔊';
                if (homeIcon) homeIcon.textContent = '🔊';
            }).catch(() => {});
        };
        
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
    }
}

function setupYesButton() {
    const yesBtn = document.getElementById('introYesBtn');
    if (!yesBtn) return;

    yesBtn.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.cssText = 'position: fixed; pointer-events: none; font-size: 1.5rem; animation: floatUp 1.5s ease-out forwards; z-index: 9998;';
                heart.style.left = (e.clientX + (Math.random() - 0.5) * 60) + 'px';
                heart.style.top = (e.clientY - 20) + 'px';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }, i * 100);
        }
    });

    yesBtn.addEventListener('mouseenter', () => {
        yesBtn.classList.add('yes-btn-glow');
        setTimeout(() => yesBtn.classList.remove('yes-btn-glow'), 800);
    });

    yesBtn.addEventListener('touchstart', () => {
        yesBtn.classList.add('yes-btn-glow');
        setTimeout(() => yesBtn.classList.remove('yes-btn-glow'), 800);
    });

    yesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        respondYes();
    });
}

if (!document.getElementById('floatUpStyle')) {
    const style = document.createElement('style');
    style.id = 'floatUpStyle';
    style.innerHTML = '@keyframes floatUp { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-80px) scale(0.5); } }';
    document.head.appendChild(style);
}

function setupIntroHearts() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'intro-heart-float';
            heart.innerHTML = ['💖', '💕', '💗'][Math.floor(Math.random() * 3)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            document.getElementById('introPage').appendChild(heart);
        }, i * 150);
    }
}

function setupEscapeNoButton() {
    const noBtn = document.getElementById('introNoBtn');
    if (!noBtn) return;

    noBtn.style.pointerEvents = 'none';

    const introContainer = document.querySelector('.intro-container');
    if (introContainer) {
        introContainer.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.7) {
                reactNoButton();
            }
        });
    }
}

function reactNoButton() {
    const noBtn = document.getElementById('introNoBtn');
    if (!noBtn) return;

    noBtn.classList.remove('no-btn-wobble', 'no-btn-shake');
    void noBtn.offsetWidth;

    const reactions = ['wobble', 'shake'];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    
    noBtn.classList.add(`no-btn-${reaction}`);
    
    const originalText = noBtn.innerHTML;
    const messages = ['😅', 'Nope!', 'Nice try', 'Can\'t 🙈', 'Not possible'];
    noBtn.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    
    showOopsTooltip();
    
    setTimeout(() => {
        noBtn.innerHTML = originalText;
        noBtn.classList.remove(`no-btn-${reaction}`);
    }, 600);
}

function showOopsTooltip() {
    const oldTooltip = document.getElementById('oopsTooltip');
    if (oldTooltip) oldTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'oopsTooltip';
    tooltip.innerHTML = ['Oops 😅', 'Nice try 😉', 'Not today'][Math.floor(Math.random() * 3)];
    tooltip.style.cssText = 'position: fixed; top: ' + (Math.random() * 60 + 20) + 'px; left: ' + (Math.random() * 60 + 20) + 'px; font-size: 0.9rem; color: #ff6b9d; font-weight: bold; opacity: 0.8; pointer-events: none; animation: fadeOut 1.5s ease-out forwards;';

    document.body.appendChild(tooltip);

    if (!document.getElementById('tooltipStyle')) {
        const style = document.createElement('style');
        style.id = 'tooltipStyle';
        style.innerHTML = '@keyframes fadeOut { from { opacity: 0.8; } to { opacity: 0; } }';
        document.head.appendChild(style);
    }

    setTimeout(() => tooltip.remove(), 1500);
}

function respondYes() {
    const yesBtn = document.getElementById('introYesBtn');
    if (yesBtn) {
        yesBtn.style.position = 'relative';
        yesBtn.style.animation = 'none';
        void yesBtn.offsetWidth;
        yesBtn.style.animation = 'heartBeat 0.6s ease-out';
        yesBtn.disabled = true;
        yesBtn.style.opacity = '0.9';
    }

    localStorage.setItem('valentineIntroResponded', 'yes');
    
    const audio = document.getElementById('bgMusic');
    if (audio.paused) {
        audio.play().catch(() => {});
        isMusicPlaying = true;
    }

    createConfetti();

    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 400);
    }
}

function enterMainApp() {
    const introPage = document.getElementById('introPage');
    const successMsg = document.getElementById('successMessage');
    
    if (introPage) introPage.classList.add('hidden');
    if (successMsg) successMsg.classList.remove('show');

    showMainApp();
    autoPlayMusic();
}

function showMainApp() {
    document.body.classList.remove('home-active');
    const container = document.querySelector('.container');
    if (container) container.style.display = 'block';
}

function createConfetti() {
    const colors = ['❤️', '💖', '💕', '💗', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = Math.random() * window.innerHeight - 100 + 'px';
            confetti.style.fontSize = (1 + Math.random() * 2) + 'rem';
            confetti.style.zIndex = '9997';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function createSparkles() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = 9999;
            sparkle.style.fontSize = (12 + Math.random() * 18) + 'px';
            sparkle.textContent = ['✨', '💖', '💫', '🌟'][Math.floor(Math.random() * 4)];
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 30);
    }
}

function openModal() {
    const m = document.getElementById('modal');
    if (!m) return;
    m.style.display = 'block';
    try { createSparkles(); } catch (e) {}
}

function closeModal() {
    const m = document.getElementById('modal');
    if (!m) return;
    m.style.display = 'none';
}

// Countdown to Valentine's Day
function updateCountdown() {
    const valentinesDay = new Date('February 14, 2026').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Initialize on page load
window.addEventListener('load', () => {
    initIntroPage();
    
    const introResponded = localStorage.getItem('valentineIntroResponded');
    if (introResponded !== 'yes') {
        return;
    }

    ['modal','dailyModal','fullMessageModal','quizModal','resultModal','reflectionsModal','gameModal','duelModal'].forEach(id => {
        try { const el = document.getElementById(id); if (el) el.style.display = 'none'; } catch(e) {}
    });
});


let isMusicPlaying = false;

function toggleIntroMusic() {
    const audio = document.getElementById('bgMusic');
    const introIcon = document.getElementById('introMusicIcon');
    const homeIcon = document.getElementById('homeMusicIcon');
    const introToggle = document.getElementById('introMusicToggle');
    const homeToggle = document.getElementById('homeMusicToggle');
    
    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
        if (introToggle) introToggle.classList.add('muted');
        if (homeToggle) homeToggle.classList.add('muted');
        if (introIcon) introIcon.textContent = '🔇';
        if (homeIcon) homeIcon.textContent = '🔇';
    } else {
        audio.play().catch(() => {});
        isMusicPlaying = true;
        if (introToggle) introToggle.classList.remove('muted');
        if (homeToggle) homeToggle.classList.remove('muted');
        if (introIcon) introIcon.textContent = '🔊';
        if (homeIcon) homeIcon.textContent = '🔊';
    }
}

function autoPlayMusic() {
    const audio = document.getElementById('bgMusic');
    if (!isMusicPlaying) {
        audio.play().catch(() => {});
        isMusicPlaying = true;
    }
}


// Timeline toggle function
function toggleTimeline() {
    const timeline = document.getElementById('timelineContent');
    const toggle = document.getElementById('timelineToggle');
    const cards = document.querySelectorAll('.story-card');
    const container = document.getElementById('timelineScroll');
    
    const isExpanded = timeline.classList.contains('expanded');
    
    timeline.classList.toggle('expanded');
    toggle.classList.toggle('expanded');
    
    if (!isExpanded) {
        let delay = 0;
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
                if (container && index > 2) {
                    container.scrollLeft = (index - 2) * 220;
                }
            }, delay);
            delay += 1500;
        });
    } else {
        cards.forEach(card => card.classList.remove('visible'));
        if (container) container.scrollLeft = 0;
    }
}
