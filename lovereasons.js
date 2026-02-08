// 100 Reasons Why I Love You

const loveReasons = [
    "Your smile lights up my entire world",
    "The way you laugh at my silly jokes",
    "How you make every ordinary moment special",
    "Your kindness towards everyone you meet",
    "The sparkle in your eyes when you're excited",
    "How you always know how to comfort me",
    "Your beautiful soul that shines through everything",
    "The way you hold my hand",
    "Your unwavering support in everything I do",
    "How you make me want to be a better person",
    "Your infectious enthusiasm for life",
    "The way you care for others selflessly",
    "Your strength during difficult times",
    "How you believe in me even when I don't",
    "Your adorable quirks that make you unique",
    "The way you say my name",
    "Your passion for the things you love",
    "How you make me feel safe and loved",
    "Your beautiful heart full of compassion",
    "The way you dance when you're happy",
    "Your determination to achieve your dreams",
    "How you always see the good in people",
    "Your warm hugs that feel like home",
    "The way you scrunch your nose when you're thinking",
    "Your patience with me and my flaws",
    "How you make even rainy days feel sunny",
    "Your courage to face any challenge",
    "The way you inspire me every single day",
    "Your genuine interest in my thoughts and feelings",
    "How you remember the little things I tell you",
    "Your beautiful mind and intelligence",
    "The way you make me laugh until my stomach hurts",
    "Your loyalty and trustworthiness",
    "How you're always there when I need you",
    "Your adorable sleepy face in the morning",
    "The way you get excited about small things",
    "Your creativity and unique perspective",
    "How you make me feel like the luckiest person alive",
    "Your gentle touch that calms my worries",
    "The way you pursue your passions fearlessly",
    "Your empathy and understanding nature",
    "How you make every day an adventure",
    "Your beautiful voice that I could listen to forever",
    "The way you care about our future together",
    "Your honesty even when it's difficult",
    "How you accept me exactly as I am",
    "Your playful side that brings out my inner child",
    "The way you look at me with so much love",
    "Your dedication to everything you commit to",
    "How you make me feel heard and valued",
    "Your sense of humor that matches mine perfectly",
    "The way you support my dreams as much as your own",
    "Your resilience in bouncing back from setbacks",
    "How you make ordinary moments extraordinary",
    "Your thoughtfulness in everything you do",
    "The way you challenge me to grow",
    "Your optimism that brightens dark days",
    "How you're not afraid to be yourself around me",
    "Your wisdom beyond your years",
    "The way you make me feel complete",
    "Your adventurous spirit and willingness to try new things",
    "How you forgive and never hold grudges",
    "Your beautiful energy that fills every room",
    "The way you care for plants and animals",
    "Your ambition and drive to succeed",
    "How you make me feel like I'm your priority",
    "Your cute habits that I've memorized",
    "The way you express your love in little ways",
    "Your independence and strength",
    "How you make me want to be romantic",
    "Your ability to find joy in simple pleasures",
    "The way you understand me without words",
    "Your respect for my opinions and choices",
    "How you make me feel butterflies even after all this time",
    "Your generosity with your time and love",
    "The way you encourage me to chase my dreams",
    "Your beautiful soul that matches your beautiful face",
    "How you make me believe in forever",
    "Your spontaneity that keeps life exciting",
    "The way you take care of me when I'm sick",
    "Your confidence that inspires me",
    "How you make me feel safe to be vulnerable",
    "Your love for learning new things",
    "The way you celebrate my successes",
    "Your ability to make me feel special every day",
    "How you're my best friend and my love",
    "Your grace in handling difficult situations",
    "The way you make me laugh even when I'm upset",
    "Your commitment to us and our relationship",
    "How you bring out the best version of me",
    "Your beautiful dreams for our future",
    "The way you make me feel cherished",
    "Your authenticity in a world of pretense",
    "How you love me unconditionally",
    "Your positive influence on my life",
    "The way you make every moment count",
    "Your understanding when I make mistakes",
    "How you're everything I never knew I needed",
    "Your love that grows stronger every day",
    "The way you complete me in every way"
];

let favorites = JSON.parse(localStorage.getItem('favoriteReasons') || '[]');
let currentCardIndex = 0;

function openLoveReasons() {
    const modal = document.getElementById('loveReasonsModal');
    if (modal) {
        modal.style.display = 'block';
        showRandomReason();
    }
}

function closeLoveReasons() {
    const modal = document.getElementById('loveReasonsModal');
    if (modal) modal.style.display = 'none';
}

function showRandomReason() {
    currentCardIndex = Math.floor(Math.random() * loveReasons.length);
    displayReason(currentCardIndex);
}

function showNextReason() {
    currentCardIndex = (currentCardIndex + 1) % loveReasons.length;
    displayReason(currentCardIndex);
}

function showPrevReason() {
    currentCardIndex = (currentCardIndex - 1 + loveReasons.length) % loveReasons.length;
    displayReason(currentCardIndex);
}

function displayReason(index) {
    const card = document.querySelector('.reason-card');
    const text = document.getElementById('reasonText');
    const counter = document.getElementById('reasonCounter');
    const favBtn = document.getElementById('favReasonBtn');
    
    if (!card || !text || !counter) return;
    
    card.classList.remove('flip');
    
    setTimeout(() => {
        text.textContent = loveReasons[index];
        counter.textContent = `${index + 1} / ${loveReasons.length}`;
        
        if (favBtn) {
            favBtn.textContent = favorites.includes(index) ? '❤️' : '🤍';
        }
        
        card.classList.add('flip');
    }, 150);
}

function toggleFavorite() {
    const index = favorites.indexOf(currentCardIndex);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(currentCardIndex);
    }
    
    localStorage.setItem('favoriteReasons', JSON.stringify(favorites));
    
    const favBtn = document.getElementById('favReasonBtn');
    if (favBtn) {
        favBtn.textContent = favorites.includes(currentCardIndex) ? '❤️' : '🤍';
        favBtn.classList.add('heart-pop');
        setTimeout(() => favBtn.classList.remove('heart-pop'), 300);
    }
}

function showFavorites() {
    if (favorites.length === 0) {
        alert('No favorites yet! Click the 🤍 to add favorites.');
        return;
    }
    
    const favList = favorites.map(i => `${i + 1}. ${loveReasons[i]}`).join('\n\n');
    alert(`Your Favorite Reasons (${favorites.length}):\n\n${favList}`);
}
