// ===== LOVE REFLECTIONS =====
const reflectionQuestions = [
    "What makes you feel loved without words?",
    "What small moment with me has stayed with you?",
    "How do you want to feel in our relationship?",
    "What are you grateful for today?",
    "What dream do you see us building together?",
    "When do you feel most yourself with me?",
    "What does home feel like to you?",
    "How have I changed your life?",
    "What do you want me to know about your heart?",
    "When you think of forever with me, what do you see?"
];

function openReflections() {
    document.getElementById('reflectionsModal').style.display = 'block';
    document.getElementById('reflectionsContent').style.display = 'block';
    document.getElementById('reflectionsResult').style.display = 'none';
    renderReflections();
    updateReflectionsProgress();
}

function closeReflections() {
    document.getElementById('reflectionsModal').style.display = 'none';
    document.getElementById('reflectionsContent').style.display = 'block';
    document.getElementById('reflectionsResult').style.display = 'none';
}

function renderReflections() {
    const container = document.getElementById('reflectionsQuestions');
    if (!container) return;
    container.innerHTML = '';
    
    const savedAnswers = JSON.parse(localStorage.getItem('reflectionAnswers')) || {};
    
    reflectionQuestions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'reflection-question';
        const savedAnswer = savedAnswers[i] || '';
        div.innerHTML = `
            <label>${i + 1}. ${q}</label>
            <textarea id="reflect-${i}" placeholder="Let your heart speak...">${savedAnswer}</textarea>
        `;
        container.appendChild(div);
    });
}

function updateReflectionsProgress() {
    const textareas = document.querySelectorAll('.reflection-question textarea');
    let filled = 0;
    textareas.forEach(ta => {
        if (ta.value.trim().length > 0) filled++;
    });
    const percentage = (filled / reflectionQuestions.length) * 100;
    const bar = document.getElementById('reflectionsProgressBar');
    if (bar) bar.style.width = percentage + '%';
}

function submitReflections() {
    const answers = {};
    const textareas = document.querySelectorAll('.reflection-question textarea');
    let hasAnswers = false;
    
    textareas.forEach((ta, i) => {
        answers[i] = ta.value;
        if (ta.value.trim().length > 0) hasAnswers = true;
    });
    
    if (!hasAnswers) {
        alert('Please share at least one reflection... 💭');
        return;
    }
    
    localStorage.setItem('reflectionAnswers', JSON.stringify(answers));
    localStorage.setItem('reflectionAnswersDate', new Date().toISOString());
    
    const content = document.getElementById('reflectionsContent');
    const result = document.getElementById('reflectionsResult');
    if (content) content.style.display = 'none';
    if (result) result.style.display = 'block';
    showReflectionsResult(answers);
}

function showReflectionsResult(answers) {
    const preview = document.getElementById('savedReflectionsPreview');
    if (!preview) return;
    let html = '<div style="text-align: left;">';
    
    reflectionQuestions.forEach((q, i) => {
        if (answers[i] && answers[i].trim()) {
            html += `<p><strong>Q${i + 1}:</strong> ${q}<br><em>${answers[i]}</em></p>`;
        }
    });
    
    html += '</div>';
    preview.innerHTML = html;
}

function editReflections() {
    const content = document.getElementById('reflectionsContent');
    const result = document.getElementById('reflectionsResult');
    if (content) content.style.display = 'block';
    if (result) result.style.display = 'none';
    renderReflections();
}
