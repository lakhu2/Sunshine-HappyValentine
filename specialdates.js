// Special Dates Countdown

const specialDates = [
    {
        name: 'Our Anniversary',
        date: 'May 2',
        emoji: '💕',
        description: 'The day we became us'
    },
    {
        name: 'First Meeting',
        date: 'July 25, 2015',
        emoji: '✨',
        description: 'When our story began'
    },
    {
        name: 'Special Day',
        date: 'July 11',
        emoji: '🎉',
        description: 'A day to celebrate'
    },
    {
        name: 'Our Wedding',
        date: 'December 2027',
        emoji: '💍',
        description: 'Forever starts here'
    }
];

function openSpecialDates() {
    const modal = document.getElementById('specialDatesModal');
    if (modal) {
        modal.style.display = 'block';
        renderSpecialDates();
        startDateCountdowns();
    }
}

function closeSpecialDates() {
    const modal = document.getElementById('specialDatesModal');
    if (modal) modal.style.display = 'none';
}

function renderSpecialDates() {
    const container = document.getElementById('datesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    specialDates.forEach((dateInfo, index) => {
        const card = document.createElement('div');
        card.className = 'date-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="date-emoji">${dateInfo.emoji}</div>
            <div class="date-name">${dateInfo.name}</div>
            <div class="date-description">${dateInfo.description}</div>
            <div class="date-countdown" id="date-${index}">
                <div class="countdown-grid">
                    <div class="countdown-box">
                        <span class="countdown-num" id="date-${index}-days">0</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-box">
                        <span class="countdown-num" id="date-${index}-hours">0</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-box">
                        <span class="countdown-num" id="date-${index}-mins">0</span>
                        <span class="countdown-label">Mins</span>
                    </div>
                    <div class="countdown-box">
                        <span class="countdown-num" id="date-${index}-secs">0</span>
                        <span class="countdown-label">Secs</span>
                    </div>
                </div>
            </div>
            <div class="date-since" id="date-${index}-since"></div>
        `;
        
        container.appendChild(card);
    });
}

function startDateCountdowns() {
    updateAllDateCountdowns();
    setInterval(updateAllDateCountdowns, 1000);
}

function updateAllDateCountdowns() {
    specialDates.forEach((dateInfo, index) => {
        updateDateCountdown(index, dateInfo.date);
    });
}

function updateDateCountdown(index, dateStr) {
    const now = new Date();
    let targetDate;
    
    // Parse different date formats
    if (dateStr.includes('2027')) {
        targetDate = new Date('December 31, 2027');
    } else if (dateStr.includes('2015')) {
        // For past dates, show "days since"
        targetDate = new Date(dateStr);
        const diff = now - targetDate;
        const daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
        const yearsSince = Math.floor(daysSince / 365);
        const remainingDays = daysSince % 365;
        
        const sinceEl = document.getElementById(`date-${index}-since`);
        if (sinceEl) {
            sinceEl.innerHTML = `<strong>${yearsSince} years, ${remainingDays} days</strong> of beautiful memories`;
        }
        
        // Hide countdown for past dates
        const countdownEl = document.getElementById(`date-${index}`);
        if (countdownEl) countdownEl.style.display = 'none';
        return;
    } else {
        // For recurring dates (May 2, July 11)
        const currentYear = now.getFullYear();
        targetDate = new Date(`${dateStr}, ${currentYear}`);
        
        // If date has passed this year, show next year
        if (targetDate < now) {
            targetDate = new Date(`${dateStr}, ${currentYear + 1}`);
        }
    }
    
    const diff = targetDate - now;
    
    if (diff < 0) return;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById(`date-${index}-days`);
    const hoursEl = document.getElementById(`date-${index}-hours`);
    const minsEl = document.getElementById(`date-${index}-mins`);
    const secsEl = document.getElementById(`date-${index}-secs`);
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minsEl) minsEl.textContent = minutes;
    if (secsEl) secsEl.textContent = seconds;
}
