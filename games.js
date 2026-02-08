// Mini Games Module
const miniGame = {
    running: false,
    current: 'heartCatch',
    hearts: [],
    cards: [],
    planted: [],
    loopId: null,
    spawnTimer: null,
    score: 0,
    duration: 90,
    startTs: 0,
    flipped: [],
    holdStartTime: 0,
    holdDuration: 2500,
    holdComplete: false,
    selfRevealCount: 0,
    selectedComfort: null
};

function openGameModal() {
    const m = document.getElementById('gameModal');
    if (m) m.style.display = 'block';
    initMiniGame();
    chooseMiniGame(miniGame.current);
}

function closeGameModal() {
    const m = document.getElementById('gameModal');
    if (m) m.style.display = 'none';
    stopMiniGame();
}

function initMiniGame() {
    const cvs = document.getElementById('gameCanvas');
    if (!cvs) return;
    const cssW = cvs.clientWidth;
    const cssH = cvs.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    cvs.width = Math.round(cssW * dpr);
    cvs.height = Math.round(cssH * dpr);
    cvs.style.width = cssW + 'px';
    cvs.style.height = cssH + 'px';
    const ctx = cvs.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    miniGame.dpr = dpr;
    cvs.style.touchAction = 'none';
    cvs.removeEventListener('click', onGameClick);
    cvs.removeEventListener('touchstart', onGameClick);
    cvs.addEventListener('click', onGameClick);
    cvs.addEventListener('touchstart', onGameClick, {passive:false});
}

function chooseMiniGame(name) {
    try { if (miniGame.spawnTimer) clearInterval(miniGame.spawnTimer); } catch(e) {}
    try { if (miniGame.loopId) cancelAnimationFrame(miniGame.loopId); } catch(e) {}
    miniGame.loopId = null; miniGame.spawnTimer = null; miniGame.running = false;
    miniGame.hearts = [];
    miniGame.cards = [];
    miniGame.planted = [];
    miniGame.holdComplete = false;
    miniGame.selfRevealCount = 0;
    miniGame.selectedComfort = null;

    const cvs = document.getElementById('gameCanvas');
    if (cvs) {
        const parent = cvs.parentElement;
        const comfortContainer = parent.querySelector('#comfortContainer');
        if (comfortContainer) comfortContainer.remove();
        cvs.removeEventListener('mousedown', onHoldHeartStart);
        cvs.removeEventListener('mouseup', onHoldHeartEnd);
        cvs.removeEventListener('mouseleave', onHoldHeartEnd);
        cvs.removeEventListener('touchstart', onHoldHeartStart);
        cvs.removeEventListener('touchend', onHoldHeartEnd);
        cvs.removeEventListener('click', onSelfRevealClick);
        cvs.removeEventListener('touchstart', onSelfRevealClick);
        cvs.style.display = 'block';
        cvs.style.cursor = 'crosshair';
    }

    miniGame.current = name;
    const bHeart = document.getElementById('gameBtnHeart'); if (bHeart) bHeart.style.opacity = name === 'heartCatch' ? '1' : '0.7';
    const bMemory = document.getElementById('gameBtnMemory'); if (bMemory) bMemory.style.opacity = name === 'memory' ? '1' : '0.7';
    const bGarden = document.getElementById('gameBtnGarden'); if (bGarden) bGarden.style.opacity = name === 'garden' ? '1' : '0.7';
    const bHoldHeart = document.getElementById('gameBtnHoldHeart'); if (bHoldHeart) bHoldHeart.style.opacity = name === 'holdHeart' ? '1' : '0.7';
    const bSeeYourself = document.getElementById('gameBtnSeeYourself'); if (bSeeYourself) bSeeYourself.style.opacity = name === 'seeYourself' ? '1' : '0.7';
    const bChooseComfort = document.getElementById('gameBtnChooseComfort'); if (bChooseComfort) bChooseComfort.style.opacity = name === 'chooseComfort' ? '1' : '0.7';

    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        if (['holdHeart', 'seeYourself', 'chooseComfort'].includes(name)) {
            startBtn.style.display = 'none';
        } else {
            startBtn.style.display = 'block';
            startBtn.disabled = false;
        }
    }

    initMiniGame();
    if (cvs) { const ctx = cvs.getContext('2d'); ctx.clearRect(0,0,cvs.clientWidth,cvs.clientHeight); }

    if (['holdHeart', 'seeYourself', 'chooseComfort'].includes(name)) {
        startMiniGame();
    }
}

function startMiniGame() {
    if (miniGame.running) return;
    miniGame.running = true;
    miniGame.score = 0;
    miniGame.startTs = Date.now();
    const btn = document.getElementById('startGameBtn'); if (btn) btn.disabled = true;
    if (miniGame.current === 'heartCatch') startHeartCatch();
    else if (miniGame.current === 'memory') startMemory();
    else if (miniGame.current === 'garden') startGarden();
    else if (miniGame.current === 'holdHeart') startHoldMeHeart();
    else if (miniGame.current === 'seeYourself') startSeeYourself();
    else if (miniGame.current === 'chooseComfort') startChooseComfort();
}

function stopMiniGame() {
    if (!miniGame.running) return;
    miniGame.running = false;
    clearInterval(miniGame.spawnTimer);
    if (miniGame.loopId) cancelAnimationFrame(miniGame.loopId);
    const btn = document.getElementById('startGameBtn'); if (btn) btn.disabled = false;
    setTimeout(() => {
        alert(`Your gentle score: ${miniGame.score} — a sweet memory for you 💖`);
    }, 80);
}

function startHeartCatch() {
    miniGame.hearts = [];
    miniGame.duration = 90;
    miniGame.spawnTimer = setInterval(spawnHeart, 700);
    miniGame.loopId = requestAnimationFrame(drawHeartCatch);
}

function spawnHeart() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return;
    const w = cvs.clientWidth, h = cvs.clientHeight;
    miniGame.hearts.push({ x: Math.random()*(w-40)+20, y: -30, vy: 0.6+Math.random()*1.6, size: 20+Math.random()*28, color: ['#ff6b9d','#ffb347','#ff9ac1'][Math.floor(Math.random()*3)] });
}

function drawHeartCatch() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return stopMiniGame();
    const ctx = cvs.getContext('2d');
    const w = cvs.clientWidth, h = cvs.clientHeight;
    ctx.clearRect(0,0,w,h);
    for (let i = miniGame.hearts.length - 1; i >= 0; i--) {
        const hrt = miniGame.hearts[i];
        hrt.y += hrt.vy; hrt.vy += 0.02;
        ctx.fillStyle = hrt.color;
        ctx.beginPath(); ctx.arc(hrt.x, hrt.y, hrt.size/2, 0, Math.PI*2); ctx.fill();
        if (hrt.y - hrt.size/2 > h + 20) miniGame.hearts.splice(i,1);
    }
    ctx.font = '600 16px Arial';
    const scoreText = 'Score: ' + miniGame.score;
    const timeText = 'Time: ' + Math.max(0, Math.floor((miniGame.duration - Math.floor((Date.now() - miniGame.startTs)/1000)))) + 's';
    const sw = Math.max(ctx.measureText(scoreText).width, 80);
    const tw = ctx.measureText(timeText).width;
    const pad = 12;
    const boxW = Math.ceil(sw + tw + pad*3);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(10,10,boxW,40);
    ctx.fillStyle = 'white'; ctx.textBaseline = 'middle'; ctx.fillText(scoreText, 22, 30);
    ctx.fillText(timeText, 22 + sw + pad, 30);
    if (Math.floor((Date.now() - miniGame.startTs)/1000) >= miniGame.duration) { stopMiniGame(); return; }
    miniGame.loopId = requestAnimationFrame(drawHeartCatch);
}

function startGarden() {
    miniGame.planted = [];
    miniGame.duration = 60;
    miniGame.startTs = Date.now();
    miniGame.score = 0;
    miniGame.loopId = requestAnimationFrame(drawGarden);
}

function drawGarden() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return stopMiniGame();
    const ctx = cvs.getContext('2d'); const w = cvs.clientWidth, h = cvs.clientHeight; ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,245,250,0.9)';
    ctx.fillRect(0,0,w,h);

    for (let i = 0; i < miniGame.planted.length; i++) {
        const p = miniGame.planted[i];
        ctx.font = (p.size) + 'px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', p.x, p.y);
    }

    ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.fillRect(10,10,220,34); ctx.fillStyle='white'; ctx.font='16px Arial'; ctx.fillText('Plants: '+miniGame.score,22,34);
    const elapsed = Math.floor((Date.now() - miniGame.startTs)/1000); const remaining = Math.max(0, miniGame.duration - elapsed);
    ctx.fillText('Time: ' + remaining + 's', 140, 34);
    if (remaining <= 0) { stopMiniGame(); return; }
    miniGame.loopId = requestAnimationFrame(drawGarden);
}

function startMemory() {
    miniGame.cards = [];
    const symbols = ['🍃','🌸','🌼','🌻','🌺','🌷'];
    const deck = symbols.concat(symbols);
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    for (let i = 0; i < 12; i++) {
        miniGame.cards.push({ emoji: deck[i], revealed: false, matched: false });
    }
    miniGame.flipped = [];
    miniGame.duration = 60;
    miniGame.startTs = Date.now();
    miniGame.score = 0;
    miniGame.loopId = requestAnimationFrame(drawMemory);
}

function drawMemory() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return stopMiniGame();
    const ctx = cvs.getContext('2d'); const w = cvs.clientWidth, h = cvs.clientHeight; ctx.clearRect(0,0,w,h);
    const cols = 4; const rows = 3; const pad = 12; const cellW = (w - pad*(cols+1))/cols; const cellH = (h - pad*(rows+1))/rows;
    for (let r=0;r<rows;r++){
        for (let c=0;c<cols;c++){
            const idx = r*cols+c; const card = miniGame.cards[idx]; const x = pad + c*(cellW+pad); const y = pad + r*(cellH+pad);
            ctx.fillStyle = card.matched ? 'rgba(255,255,255,0.2)' : 'white'; ctx.fillRect(x,y,cellW,cellH); ctx.strokeStyle='#eee'; ctx.strokeRect(x,y,cellW,cellH);
            if (card.revealed || card.matched){ ctx.font = `${Math.floor(cellH/2)}px Arial`; ctx.fillStyle = '#6f4fb8'; ctx.textAlign='center'; ctx.fillText(card.emoji, x+cellW/2, y+cellH/1.7); }
            else { ctx.fillStyle='#6f4fb8'; ctx.fillRect(x+cellW*0.15,y+cellH*0.15,cellW*0.7,cellH*0.7); }
        }
    }
    ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.fillRect(10,10,220,34); ctx.fillStyle='white'; ctx.font='16px Arial'; ctx.fillText('Matches: '+miniGame.score,22,34);
    const elapsed = Math.floor((Date.now() - miniGame.startTs)/1000); const remaining = Math.max(0, miniGame.duration - elapsed);
    ctx.fillText('Time: ' + remaining + 's', 140, 34);
    if (remaining <= 0) { stopMiniGame(); return; }
    miniGame.loopId = requestAnimationFrame(drawMemory);
}

function startHoldMeHeart() {
    miniGame.holdStartTime = 0;
    miniGame.holdComplete = false;
    const cvs = document.getElementById('gameCanvas');
    if (cvs) {
        cvs.style.cursor = 'pointer';
        cvs.addEventListener('mousedown', onHoldHeartStart);
        cvs.addEventListener('mouseup', onHoldHeartEnd);
        cvs.addEventListener('mouseleave', onHoldHeartEnd);
        cvs.addEventListener('touchstart', onHoldHeartStart);
        cvs.addEventListener('touchend', onHoldHeartEnd);
    }
    miniGame.loopId = requestAnimationFrame(drawHoldHeart);
}

function onHoldHeartStart(e) {
    if (!miniGame.running) return;
    miniGame.holdStartTime = Date.now();
    if (e.preventDefault) e.preventDefault();
}

function onHoldHeartEnd(e) {
    if (!miniGame.running) return;
    miniGame.holdStartTime = 0;
    if (e.preventDefault) e.preventDefault();
}

function drawHoldHeart() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return stopMiniGame();
    const ctx = cvs.getContext('2d'); const w = cvs.clientWidth, h = cvs.clientHeight;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,240,245,0.8)'; ctx.fillRect(0,0,w,h);
    
    const centerX = w / 2, centerY = h * 0.4;
    const holdProgress = miniGame.holdStartTime > 0 ? Math.min(1, (Date.now() - miniGame.holdStartTime) / miniGame.holdDuration) : 0;
    const heartSize = 80 + holdProgress * 20;
    const glow = 20 + holdProgress * 30;
    
    ctx.fillStyle = `rgba(255, 107, 157, ${0.3 + holdProgress * 0.3})`;
    ctx.beginPath(); ctx.arc(centerX, centerY, glow, 0, Math.PI*2); ctx.fill();
    
    ctx.font = `${heartSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('❤️', centerX, centerY + 30);
    
    ctx.fillStyle = `rgba(111, 79, 184, ${0.6 + holdProgress * 0.4})`;
    ctx.font = '18px Arial';
    ctx.fillText('Hold my heart. Don\'t rush.', centerX, h - 60);
    
    if (holdProgress > 0) {
        ctx.fillStyle = `rgba(255, 107, 157, ${holdProgress})`;
        ctx.fillRect(w/2 - 60, h - 20, 120 * holdProgress, 8);
    }
    
    if (holdProgress >= 1 && !miniGame.holdComplete) {
        miniGame.holdComplete = true;
        setTimeout(() => showHoldHeartCompletion(), 500);
    } else {
        miniGame.loopId = requestAnimationFrame(drawHoldHeart);
    }
}

function showHoldHeartCompletion() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return;
    const ctx = cvs.getContext('2d'); const w = cvs.clientWidth, h = cvs.clientHeight;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,240,245,0.8)'; ctx.fillRect(0,0,w,h);
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#6f4fb8';
    ctx.textAlign = 'center';
    const lines = ['You make my heart feel safe.', 'With you, I don\'t feel the need to rush anything.', 'This is how love should feel.'];
    let y = h/2 - 40;
    lines.forEach(line => {
        ctx.fillText(line, w/2, y);
        y += 40;
    });
    miniGame.running = false;
}

function startSeeYourself() {
    miniGame.selfRevealCount = 0;
    const cvs = document.getElementById('gameCanvas');
    if (cvs) {
        cvs.style.cursor = 'pointer';
        cvs.addEventListener('click', onSelfRevealClick);
        cvs.addEventListener('touchstart', onSelfRevealClick);
    }
    miniGame.loopId = requestAnimationFrame(drawSeeYourself);
}

function onSelfRevealClick(e) {
    if (!miniGame.running) return;
    miniGame.selfRevealCount++;
    if (e.preventDefault) e.preventDefault();
}

const selfAffirmations = [
    "I see someone who feels deeply and loves honestly.",
    "I see strength, even in moments you think you're soft.",
    "I see kindness that makes spaces feel warmer.",
    "I see a heart that deserves patience and care.",
    "I see the person I choose, every day.",
    "I see your courage in being vulnerable.",
    "I see grace in the way you handle pain.",
    "I see someone who laughs at her own mistakes.",
    "I see the way you light up when you're passionate.",
    "I see loyalty in your bones."
];

function drawSeeYourself() {
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return stopMiniGame();
    const ctx = cvs.getContext('2d'); const w = cvs.clientWidth, h = cvs.clientHeight;
    ctx.clearRect(0,0,w,h);
    
    const clarity = Math.min(1, miniGame.selfRevealCount / selfAffirmations.length);
    ctx.fillStyle = `rgba(255,240,245,${0.5 + clarity * 0.3})`;
    ctx.fillRect(0,0,w,h);
    
    ctx.fillStyle = `rgba(111, 79, 184, ${0.6})`;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tap gently. This is how I see you.', w/2, 25);
    
    ctx.font = '13px Arial';
    const affirmationsShown = Math.min(miniGame.selfRevealCount, selfAffirmations.length);
    const startIdx = Math.max(0, affirmationsShown - 4);
    let y = 60;
    
    for (let i = startIdx; i < affirmationsShown; i++) {
        const opacity = (i < affirmationsShown - 1) ? 0.6 : 0.9;
        ctx.fillStyle = `rgba(97, 75, 137, ${opacity})`;
        
        const maxWidth = w * 0.85;
        const words = selfAffirmations[i].split(' ');
        let line = '';
        for (let word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth) {
                if (line) ctx.fillText(line, w/2, y);
                line = word;
                y += 20;
            } else {
                line = testLine;
            }
        }
        if (line) ctx.fillText(line, w/2, y);
        y += 25;
    }
    
    if (miniGame.selfRevealCount >= selfAffirmations.length) {
        y += 10;
        ctx.fillStyle = 'rgba(111, 79, 184, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('This is how I see you.', w/2, y);
        y += 20;
        ctx.fillText('Not perfect. Not imagined.', w/2, y);
        y += 20;
        ctx.fillText('Just you — and that is more than enough.', w/2, y);
        miniGame.running = false;
    } else {
        ctx.fillStyle = `rgba(111, 79, 184, 0.4)`;
        ctx.font = '12px Arial';
        ctx.fillText(`(${affirmationsShown} of ${selfAffirmations.length})`, w/2, h - 10);
        miniGame.loopId = requestAnimationFrame(drawSeeYourself);
    }
}

function startChooseComfort() {
    const cvs = document.getElementById('gameCanvas');
    if (!cvs) return;
    
    const gameDiv = cvs.parentElement;
    cvs.style.display = 'none';
    
    const comfortContainer = document.createElement('div');
    comfortContainer.style.cssText = 'flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px; background: linear-gradient(135deg, #ffe0ec 0%, #fff5f7 100%); border-radius: 12px; border: 3px solid white; color: #6f4fb8; padding: 15px; text-align: center; width: 100%; box-sizing: border-box; overflow: auto;';
    comfortContainer.id = 'comfortContainer';
    
    const prompt = document.createElement('p');
    prompt.style.cssText = 'margin: 0; font-size: 1.1rem; font-weight: bold; color: #6f4fb8; line-height: 1.4;';
    prompt.textContent = 'On days when the world feels heavy, what do you need most?';
    comfortContainer.appendChild(prompt);
    
    const choices = [
        { label: 'Quiet presence', response: 'I can sit with you in silence. You don\'t have to explain anything.' },
        { label: 'A warm hug', response: 'I\'d hold you a little longer, until everything feels lighter.' },
        { label: 'Someone who listens', response: 'I want to hear you — all of it, without fixing, without judging.' },
        { label: 'Reassurance', response: 'You\'re doing better than you think. I believe in you.' },
        { label: 'Space, but not distance', response: 'I\'ll give you space, but I won\'t disappear.' }
    ];
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 300px; margin: 10px 0;';
    
    choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.innerHTML = choice.label;
        btn.style.cssText = 'background: linear-gradient(135deg, #ff6b9d, #ffb347); color: white; border: none; padding: 10px 15px; border-radius: 15px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s ease;';
        btn.addEventListener('click', () => selectComfort(choice.response, buttonsDiv, comfortContainer));
        btn.addEventListener('mouseover', () => btn.style.transform = 'translateY(-2px)');
        btn.addEventListener('mouseout', () => btn.style.transform = 'translateY(0)');
        buttonsDiv.appendChild(btn);
    });
    
    comfortContainer.appendChild(buttonsDiv);
    gameDiv.appendChild(comfortContainer);
    miniGame.running = true;
}

function selectComfort(response, buttonsDiv, container) {
    if (!miniGame.running) return;
    miniGame.running = false;
    
    buttonsDiv.remove();
    
    const responseDiv = document.createElement('div');
    responseDiv.style.cssText = 'margin-top: 15px; color: #6f4fb8; width: 100%;';
    
    const responseText = document.createElement('p');
    responseText.textContent = response;
    responseText.style.cssText = 'margin: 0 0 15px 0; font-size: 1rem; line-height: 1.5; color: #1a1a1a; font-weight: 500;';
    responseDiv.appendChild(responseText);
    
    const closingLine = document.createElement('p');
    closingLine.textContent = 'However you feel, I want to be there the way you need.';
    closingLine.style.cssText = 'margin: 10px 0 0 0; font-size: 0.95rem; color: #8855aa; font-weight: bold; line-height: 1.4;';
    responseDiv.appendChild(closingLine);
    
    container.appendChild(responseDiv);
}

function onGameClick(e) {
    const cvs = document.getElementById('gameCanvas');
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    if (miniGame.current === 'heartCatch') handleHeartClickGame(x, y, rect);
    else if (miniGame.current === 'garden') handleGardenClick(x, y);
    else if (miniGame.current === 'memory') handleMemoryClick(x, y, cvs);
    
    if (e.preventDefault) e.preventDefault();
}

function handleHeartClickGame(x,y,rect){
    const cvs = document.getElementById('gameCanvas'); if (!cvs) return;
    const w = cvs.clientWidth, h = cvs.clientHeight;
    for (let i = miniGame.hearts.length - 1; i >= 0; i--) {
        const hrt = miniGame.hearts[i];
        const dx = hrt.x - x, dy = hrt.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < hrt.size / 2) {
            miniGame.hearts.splice(i, 1);
            miniGame.score += 1;
            const pop = document.createElement('div');
            pop.className = 'heart-trail';
            pop.style.left = (rect.left + x) + 'px';
            pop.style.top = (rect.top + y) + 'px';
            pop.innerHTML = '💖';
            pop.style.cssText = 'position: fixed; pointer-events: none; font-size: 1.5rem; animation: trailFloat 0.8s ease-out forwards; z-index: 99;';
            document.body.appendChild(pop);
            setTimeout(()=>pop.remove(), 600);
            break;
        }
    }
}

if (!document.getElementById('trailFloatStyle')) {
    const style = document.createElement('style');
    style.id = 'trailFloatStyle';
    style.innerHTML = '@keyframes trailFloat { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(0, -60px) scale(0.5); } }';
    document.head.appendChild(style);
}

function handleGardenClick(x,y){ miniGame.planted.push({x, y, size: 24 + Math.random()*36}); miniGame.score += 1; }

function handleMemoryClick(x, y, cvs) {
    const cols = 4, rows = 3, pad = 12;
    const w = cvs.clientWidth, h = cvs.clientHeight;
    const cellW = (w - pad * (cols + 1)) / cols;
    const cellH = (h - pad * (rows + 1)) / rows;
    const c = Math.floor((x - pad) / (cellW + pad));
    const r = Math.floor((y - pad) / (cellH + pad));
    if (c < 0 || c >= cols || r < 0 || r >= rows) return;
    const idx = r * cols + c;
    const card = miniGame.cards[idx];
    if (!card || card.matched || card.revealed) return;
    card.revealed = true;
    miniGame.flipped.push(idx);
    if (miniGame.flipped.length === 2) {
        const [a, b] = miniGame.flipped;
        if (miniGame.cards[a].emoji === miniGame.cards[b].emoji) {
            miniGame.cards[a].matched = miniGame.cards[b].matched = true;
            miniGame.score += 1;
        } else {
            setTimeout(() => {
                miniGame.cards[a].revealed = false;
                miniGame.cards[b].revealed = false;
            }, 700);
        }
        miniGame.flipped = [];
    }
}

function toggleGameSelector() {
    const buttonsContainer = document.getElementById('gameSelectorButtons');
    const toggleBtn = document.getElementById('toggleSelectorBtn');
    if (!buttonsContainer || !toggleBtn) return;
    
    if (buttonsContainer.style.display === 'none') {
        buttonsContainer.style.display = 'flex';
        toggleBtn.innerHTML = '▲ Hide Games';
    } else {
        buttonsContainer.style.display = 'none';
        toggleBtn.innerHTML = '▼ Show Games';
    }
}
