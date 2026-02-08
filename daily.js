// ===== DAILY SURPRISES =====
const dailyMessages = [
    { date: '2026-02-07', title: 'To My Sunshine', message: 'There are nights when I sit alone and think about how you came into my life not as someone I was looking for, but as someone I didn\'t know I needed. You feel like home, Sunshine—not a place, but a feeling. When the world feels too loud, too overwhelming, you are the quiet that makes sense. The way you move through life with both strength and gentleness, the way you see the good in people even when they don\'t deserve it, the way you light up a room without even trying—these are the things that make me fall for you over and over again. Today, I want you to know: you are enough, exactly as you are. আমার ঘর হয়ে গেছ তুমি।' },
    { date: '2026-02-08', title: 'On Quiet Love', message: 'I have learned that love doesn\'t always roar. Sometimes it whispers. Sometimes it sits beside you in comfortable silence and holds your hand without needing words. The kind of love that notices when you\'re tired before you say it. The kind that remembers how you take your tea, the way you curl up when you\'re thinking, the small scar on your right knee with its little story. I love the you that no one else sees—the raw, unfiltered version at 2 AM when you let your guard down. That version that only I get to know. That version that makes my heart slow down and feel the weight of something real. These quiet moments, Sunshine, they are everything to me. তুমি আমার শান্তি।' },
    { date: '2026-02-09', title: 'Even on Hard Days', message: 'There will be days when I wake up and the world will feel heavy. Days when my thoughts are loud and the future feels uncertain. But you know what pulls me back to earth? Remembering that you exist. That somewhere in this complicated, messy world, there is someone who chose me—not because I\'m perfect, but because they see all of me and stayed anyway. I choose you on the hard days, Sunshine. I choose the way you never give up on me, even when I\'m difficult. I choose to keep showing up, to keep loving you through the storms, to hold you closer on the nights when everything feels dark. You have made me braver. Not by fixing me, but by standing beside me while I figure myself out.' },
    { date: '2026-02-10', title: 'Your Gentle Strength', message: 'I am in awe of you, and I need you to know this. The way you carry softness and strength in the same breath—it\'s rare, Sunshine. You are not weak for being kind. You are not fragile for being honest about your feelings. The way you stand up for what you believe in, even when it costs you something—that is courage. The way you hold others with grace, even when you\'re hurting inside—that is grace. I see your struggles, your doubts, the nights when you question yourself. And I want to tell you: you are stronger than you know. You are braver than you believe. And I am so deeply proud of the person you are becoming. Please be gentle with yourself the way you are gentle with everyone else.' },
    { date: '2026-02-11', title: 'Dreams with You', message: 'I don\'t have all the answers about the future, Sunshine. I don\'t know what 10 years from now will look like. But I know this: I want to figure it out with you. I want to build something quiet and strong with you. Not a fairy tale where everything is perfect, but a real life where we choose each other even when things are messy. I imagine mornings with you, rainy days on the couch, your laughter, your hand in mine. I imagine creating a space where you feel completely safe to be yourself. I imagine growing old with someone who still makes my heart skip. I imagine the life we could have, not perfect, but ours. সত্যিই বাঁচার স্বপ্ন দেখছি আমি তোমার সাথে—quiet, deep, real.' },
    { date: '2026-02-12', title: 'Your Beautiful Flaws', message: 'I love the you that you think is too much. The parts you apologize for. The ways you insist you\'re "too emotional" or "too sensitive" or "too much." Sunshine, you are not too much for me. The depth of your feelings is not a flaw—it\'s a superpower. The way you care so deeply it hurts sometimes, the way you give so much of yourself, the way you love with your whole heart—these are not things to hide or apologize for. Yes, you have bad days. Yes, you doubt yourself sometimes. Yes, you\'re not always okay. And I love you on those days too. I love you not despite your struggles, but including them. Because those struggles make you real, make you human, make you beautifully, perfectly you.' },
    { date: '2026-02-13', title: 'Thank You for Staying', message: 'There are so many ways this could have gone differently, Sunshine. There are parallel universes where we never met. Where I walked past you without seeing. Where you decided I wasn\'t worth the risk. But somehow, in this universe, you\'re here. You chose to stay even when it would have been easier to leave. You chose to believe in something with me. You chose to be vulnerable, to be open, to let me in. And that choice undoes me. Do you know what it feels like to be chosen by someone as extraordinary as you? It\'s grounding. It\'s humbling. It\'s the most precious gift. Every single day with you feels like I\'m winning a lottery I didn\'t know I entered. Thank you for your patience. Thank you for your love. Thank you for being brave enough to love someone like me back.' },
    { date: '2026-02-14', title: 'Forever, Starting Today', message: 'My dearest Sunshine, on this day—Valentine\'s Day—I want to ask you the most important question of my life. Not because a calendar tells me it\'s the right day, but because every day with you has been building to this moment. I want to spend the rest of my life knowing you. Really knowing you. I want to be the person you turn to first with good news and bad news. I want to build a home with you—not walls and roof, but a sanctuary where we both belong. I want to love you through seasons of life, through healing and growth, through ordinary Wednesday afternoons and extraordinary moments that take our breath away. Sunshine Das, will you share every tomorrow with me? Will you let me spend a lifetime learning how to love you better? I promise to show up. I promise to choose you. I promise to love you not just in passion, but in practice, in the small moments, in the quiet ways that matter most. ভালবাসা করো আমি তোমাকে, আজ থেকে সারাজীবনের জন্য। হ্যাঁ বলো, হাতে হাত মিলিয়ে...' }
];

function openDailyModal() {
    document.getElementById('dailyModal').style.display = 'block';
    renderDailyGrid();
    updateDailyTimers();
}

function closeDailyModal() {
    document.getElementById('dailyModal').style.display = 'none';
    document.getElementById('dayView').style.display = 'none';
    const dailyGrid = document.getElementById('dailyGrid');
    if (dailyGrid) dailyGrid.style.display = 'grid';
}

function renderDailyGrid() {
    const grid = document.getElementById('dailyGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const now = new Date();
    dailyMessages.forEach((d, i) => {
        const dayStart = new Date(d.date + 'T00:00:00');
        const locked = now < dayStart;
        const card = document.createElement('div');
        card.className = 'day-card' + (locked ? ' locked' : '');
        card.innerHTML = `<div class="day-title">${d.title}</div><div class="day-countdown" id="countdown-${i}"></div>`;
        card.onclick = () => openDay(i);
        grid.appendChild(card);
    });
}

function openDay(i) {
    const d = dailyMessages[i];
    const dayStart = new Date(d.date + 'T00:00:00');
    const now = new Date();
    
    const dailyGrid = document.getElementById('dailyGrid');
    if (dailyGrid) dailyGrid.style.display = 'none';
    
    if (now < dayStart) {
        const dayView = document.getElementById('dayView');
        const dayMessage = document.getElementById('dayMessage');
        let tapCount = 0;
        let tapTimer = null;

        dayMessage.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <p style="font-size: 2.5rem; margin-bottom: 10px;">🔒</p>
                <p style="color: #666; font-weight: bold; margin-bottom: 8px;">${d.title} 💌</p>
                <p style="color: #999; font-size: 0.95rem;">This surprise unlocks on ${new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>
        `;

        dayMessage.style.cursor = 'pointer';
        dayMessage.onclick = () => {
            tapCount++;

            if (tapCount < 4) {
                dayMessage.style.transform = 'scale(0.98)';
                setTimeout(() => dayMessage.style.transform = '', 100);
            }

            if (tapCount === 4) {
                dayMessage.innerHTML = `<div style="text-align:left; padding:12px;"> <h3 style="margin:0 0 8px 0; color:var(--text-dark);">${d.title} 💖</h3><p style="margin:8px 0; color: #5a2b3d; line-height:1.5;">${d.message} <span style="display:inline-block;margin-left:6px;">✨</span></p><p style="font-size:0.9rem;color:#7a5566;margin-top:8px;">(shh... a quiet secret between us)</p></div>`;
                dayMessage.onclick = null;
                dayMessage.style.cursor = 'default';
                dayMessage.style.transform = '';
                const dv = document.getElementById('dayView'); if (dv) { dv.scrollTop = 0; dv.scrollIntoView({behavior:'smooth', block:'center'}); }
                for (let j = 0; j < 10; j++) {
                    setTimeout(() => {
                        const spark = document.createElement('div');
                        spark.style.position = 'absolute';
                        spark.style.left = (Math.random() * 80 + 10) + '%';
                        spark.style.top = (Math.random() * 60 + 20) + '%';
                        spark.style.fontSize = '1.2rem';
                        spark.style.pointerEvents = 'none';
                        spark.innerHTML = '✨';
                        document.getElementById('dayView').appendChild(spark);
                        setTimeout(() => spark.remove(), 800);
                    }, j * 50);
                }
            }

            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 2000);
        };

        dayView.style.display = 'block';
        return;
    }

    const dayView = document.getElementById('dayView');
    const dayMessage = document.getElementById('dayMessage');
    const preview = d.message.length > 240 ? d.message.slice(0, 240) + '…' : d.message;
    dayMessage.innerHTML = `<strong style="display:block; margin-bottom:8px; text-align:center;">${d.title}</strong><p style="margin-top:8px; text-align:left; word-wrap:break-word; overflow-wrap:break-word;">${preview}</p><div style="margin-top:12px; text-align:center;"><button class="button" onclick="openFullMessageIndex(${i})">Read Full Message</button></div>`;
    dayMessage.style.cursor = 'default';
    dayMessage.onclick = null;
    dayView.style.display = 'block';
    dayView.scrollTop = 0;
}

function formatRemaining(ms) {
    if (ms <= 0) return 'Open now';
    const total = Math.floor(ms/1000);
    const days = Math.floor(total/86400);
    const hours = Math.floor((total%86400)/3600);
    const mins = Math.floor((total%3600)/60);
    const secs = total%60;
    if (days>0) return `${days}d ${hours}h`;
    if (hours>0) return `${hours}h ${mins}m`;
    return `${mins}m ${secs}s`;
}

function updateDailyTimers() {
    dailyMessages.forEach((d,i) => {
        const el = document.getElementById('countdown-' + i);
        if (!el) return;
        const start = new Date(d.date + 'T00:00:00');
        const now = new Date();
        const ms = start - now;
        el.textContent = formatRemaining(ms);
        const card = el.closest('.day-card');
        if (card) {
            if (ms <= 0) card.classList.remove('locked');
            else card.classList.add('locked');
        }
    });
}

function sendRose() {
    for (let i=0;i<12;i++){
        setTimeout(()=>{
            const heart = document.createElement('div');
            heart.style.position='absolute';
            heart.style.left = (Math.random()*60+20)+'%';
            heart.style.top = (Math.random()*50+30)+'%';
            heart.style.fontSize = (12+Math.random()*20)+'px';
            heart.style.pointerEvents='none';
            heart.innerHTML='🌹';
            document.getElementById('dailyModal').appendChild(heart);
            setTimeout(()=> heart.remove(), 1400);
        }, i*80);
    }
}

function revealNote() {
    const msgEl = document.getElementById('dayMessage');
    if (!msgEl) return;
    msgEl.style.transform = 'scale(0.98)';
    setTimeout(()=> msgEl.style.transform = '', 180);
    for (let i=0;i<18;i++){
        setTimeout(()=>{
            const s = document.createElement('div');
            s.className='sparkle';
            s.style.left = (Math.random()*80+8)+'%';
            s.style.top = (Math.random()*60+20)+'%';
            s.style.background = ['#FFD6E8','#FF9AC1','#FFC3A6'][Math.floor(Math.random()*3)];
            s.style.width='8px'; s.style.height='8px'; s.style.borderRadius='50%'; s.style.position='absolute';
            document.getElementById('dailyModal').appendChild(s);
            setTimeout(()=> s.remove(), 900);
        }, i*60);
    }
}

setInterval(updateDailyTimers, 1000);
renderDailyGrid();

function openFullMessageIndex(i) {
    const d = dailyMessages[i]; if (!d) return; openFullMessage(d.title, d.message);
}

function openFullMessage(title, message) {
    const m = document.getElementById('fullMessageModal'); if (!m) return;
    const titleEl = document.getElementById('fullMessageTitle');
    const bodyEl = document.getElementById('fullMessageBody');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = message;
    m.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeFullMessage() { 
    const m = document.getElementById('fullMessageModal'); 
    if (m) m.style.display = 'none'; 
    document.body.style.overflow = 'auto';
}

function backToDailyGrid() {
    const dayView = document.getElementById('dayView');
    const dailyGrid = document.getElementById('dailyGrid');
    if (dayView) dayView.style.display = 'none';
    if (dailyGrid) dailyGrid.style.display = 'grid';
}
