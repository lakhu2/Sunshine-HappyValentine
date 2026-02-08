// Future Vision Board - Our Dreams Together

const futureVision = [
    {
        year: 2027,
        month: 'December',
        title: '💍 Our Wedding',
        description: 'The day we promise forever to each other',
        icon: '💒',
        color: '#ff6b9d'
    },
    {
        year: 2028,
        month: 'TBD',
        title: '👶 First Child',
        description: 'Welcoming our little bundle of joy',
        icon: '🍼',
        color: '#ffb347'
    },
    {
        year: 2030,
        month: 'TBD',
        title: '💼 Career Milestones',
        description: 'Both of us well-established in our careers',
        icon: '🎯',
        color: '#6f4fb8'
    },
    {
        year: 2033,
        month: 'TBD',
        title: '🏡 Our Dream Home',
        description: 'A place to build our forever memories',
        icon: '🏠',
        color: '#ff6b9d'
    },
    {
        year: 2035,
        month: 'TBD',
        title: '✈️ International Adventure',
        description: 'Exploring the world together',
        icon: '🌍',
        color: '#ffb347'
    },
    {
        year: 2036,
        month: 'TBD',
        title: '👶 Second Child',
        description: 'Growing our beautiful family',
        icon: '👨‍👩‍👧‍👦',
        color: '#6f4fb8'
    }
];

function openFutureVision() {
    const modal = document.getElementById('futureVisionModal');
    if (modal) {
        modal.style.display = 'block';
        renderVisionBoard();
    }
}

function closeFutureVision() {
    const modal = document.getElementById('futureVisionModal');
    if (modal) modal.style.display = 'none';
}

function renderVisionBoard() {
    const container = document.getElementById('visionContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    futureVision.forEach((vision, index) => {
        const card = document.createElement('div');
        card.className = 'vision-card';
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.innerHTML = `
            <div class="vision-year" style="color: ${vision.color}">${vision.year}</div>
            <div class="vision-icon">${vision.icon}</div>
            <div class="vision-title">${vision.title}</div>
            <div class="vision-month">${vision.month}</div>
            <div class="vision-description">${vision.description}</div>
            <div class="vision-countdown" id="vision-${index}"></div>
        `;
        
        container.appendChild(card);
        
        updateVisionCountdown(index, vision.year, vision.month);
    });
}

function updateVisionCountdown(index, year, month) {
    const element = document.getElementById(`vision-${index}`);
    if (!element) return;
    
    let targetDate;
    if (month === 'December') {
        targetDate = new Date(`December 31, ${year}`);
    } else {
        targetDate = new Date(`January 1, ${year}`);
    }
    
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff < 0) {
        element.innerHTML = '<span style="color: #4CAF50;">✓ Achieved!</span>';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    
    if (years > 0) {
        element.textContent = `${years} year${years > 1 ? 's' : ''} ${remainingDays} days`;
    } else {
        element.textContent = `${days} days to go`;
    }
}
