// Virtual Date Ideas Generator

const dateIdeas = {
    movies: [
        '🎬 Movie Marathon Night - Pick 3 romantic movies',
        '🍿 Cinema Date - Watch the latest release',
        '📺 Netflix & Chill - Cozy movie night at home',
        '🎥 Classic Movie Night - Old romantic films',
        '🎞️ Documentary Date - Learn something new together'
    ],
    restaurants: [
        '🍝 Italian Restaurant - Pasta and wine',
        '🍣 Sushi Date - Try new rolls together',
        '🍕 Pizza Night - Make your own pizzas',
        '🍛 Indian Cuisine - Spicy food adventure',
        '🥘 Fine Dining - Dress up fancy',
        '🍔 Burger Joint - Casual and fun',
        '☕ Café Date - Coffee and desserts'
    ],
    travel: [
        '🏖️ Beach Getaway - Sun, sand, and sea',
        '⛰️ Mountain Trek - Adventure in nature',
        '🏛️ Historical Site Visit - Explore heritage',
        '🌆 City Tour - Discover new places',
        '🚂 Train Journey - Scenic route adventure',
        '🏕️ Camping Trip - Under the stars',
        '🌅 Sunrise/Sunset Spot - Beautiful views'
    ],
    games: [
        '🎮 Video Game Night - Co-op games',
        '🎲 Board Game Marathon - Classic games',
        '🃏 Card Games - Poker or Uno',
        '🧩 Puzzle Challenge - Complete together',
        '🎯 Arcade Date - Retro gaming fun',
        '🎳 Bowling Night - Strike competition'
    ],
    cooking: [
        '🍰 Baking Together - Make desserts',
        '🥗 Healthy Cooking - Try new recipes',
        '🍜 Cooking Challenge - Mystery ingredients',
        '🧁 Cupcake Decorating - Get creative',
        '🥙 International Cuisine - Cook exotic dishes',
        '🍪 Cookie Baking - Sweet treats'
    ],
    reading: [
        '📚 Book Club for Two - Read same book',
        '📖 Poetry Reading - Share favorite poems',
        '🏛️ Library Date - Browse books together',
        '📝 Story Writing - Create a story together',
        '📰 Magazine Swap - Share interesting articles'
    ],
    gardening: [
        '🌱 Plant Together - Start a garden',
        '🌺 Flower Arranging - Create bouquets',
        '🌿 Herb Garden - Grow cooking herbs',
        '🌻 Visit Botanical Garden - Nature walk',
        '🪴 Indoor Plants - Decorate home with plants'
    ],
    creative: [
        '🎨 Painting Date - Create art together',
        '🖼️ Art Gallery Visit - Appreciate art',
        '🎭 Theater Show - Watch a play',
        '🎪 Concert/Music Event - Live music',
        '📸 Photography Walk - Capture moments',
        '✂️ DIY Craft Project - Make something together'
    ],
    relaxation: [
        '💆 Spa Day at Home - Pamper each other',
        '🧘 Yoga Session - Relax together',
        '🛁 Bubble Bath - Romantic relaxation',
        '💅 Mani-Pedi Date - Beauty time',
        '🕯️ Meditation - Peaceful moments'
    ],
    adventure: [
        '🚴 Bike Ride - Explore on wheels',
        '🏊 Swimming Date - Pool or beach',
        '🎢 Amusement Park - Thrilling rides',
        '🧗 Rock Climbing - Challenge yourselves',
        '⛸️ Ice Skating - Hold hands and glide',
        '🎿 Adventure Sport - Try something new'
    ]
};

let isSpinning = false;

function openDateIdeas() {
    const modal = document.getElementById('dateIdeasModal');
    if (modal) {
        modal.style.display = 'block';
        renderDateCategories();
    }
}

function closeDateIdeas() {
    const modal = document.getElementById('dateIdeasModal');
    if (modal) modal.style.display = 'none';
}

function renderDateCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    
    const categories = Object.keys(dateIdeas);
    container.innerHTML = '';
    
    categories.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.style.animationDelay = `${index * 0.05}s`;
        
        const icons = {
            movies: '🎬',
            restaurants: '🍽️',
            travel: '✈️',
            games: '🎮',
            cooking: '👨‍🍳',
            reading: '📚',
            gardening: '🌱',
            creative: '🎨',
            relaxation: '💆',
            adventure: '🏃'
        };
        
        btn.innerHTML = `${icons[category]} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        btn.onclick = () => showCategoryIdeas(category);
        
        container.appendChild(btn);
    });
}

function showCategoryIdeas(category) {
    const ideas = dateIdeas[category];
    const listContainer = document.getElementById('ideasList');
    
    if (!listContainer) return;
    
    listContainer.innerHTML = `<h3 style="color: #ff6b9d; margin-bottom: 15px;">${category.charAt(0).toUpperCase() + category.slice(1)} Ideas</h3>`;
    
    ideas.forEach((idea, index) => {
        const ideaDiv = document.createElement('div');
        ideaDiv.className = 'idea-item';
        ideaDiv.style.animationDelay = `${index * 0.08}s`;
        ideaDiv.textContent = idea;
        listContainer.appendChild(ideaDiv);
    });
}

function spinDateWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const resultDiv = document.getElementById('spinResult');
    const spinBtn = document.getElementById('spinBtn');
    
    if (spinBtn) spinBtn.disabled = true;
    if (resultDiv) resultDiv.textContent = '🎡 Spinning...';
    
    // Collect all ideas
    const allIdeas = [];
    Object.values(dateIdeas).forEach(categoryIdeas => {
        allIdeas.push(...categoryIdeas);
    });
    
    // Simulate spinning
    let counter = 0;
    const spinInterval = setInterval(() => {
        const randomIdea = allIdeas[Math.floor(Math.random() * allIdeas.length)];
        if (resultDiv) resultDiv.textContent = randomIdea;
        counter++;
        
        if (counter > 20) {
            clearInterval(spinInterval);
            const finalIdea = allIdeas[Math.floor(Math.random() * allIdeas.length)];
            if (resultDiv) {
                resultDiv.innerHTML = `<div class="final-idea">${finalIdea}</div>`;
            }
            if (spinBtn) spinBtn.disabled = false;
            isSpinning = false;
            
            // Confetti effect
            createDateConfetti();
        }
    }, 100);
}

function createDateConfetti() {
    const emojis = ['💕', '💖', '✨', '🎉', '💝', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'date-confetti';
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            const modal = document.getElementById('dateIdeasModal');
            if (modal) modal.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}
