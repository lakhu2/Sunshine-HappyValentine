// ===== LOVE QUIZ =====
const quizQuestions = [
    { question: "What's your love language?", options: [{ text: "Words of affirmation", points: 25 }, { text: "Acts of service", points: 20 }, { text: "Physical touch", points: 25 }, { text: "Quality time", points: 30 }] },
    { question: "Your ideal date would be:", options: [{ text: "Candlelit dinner", points: 30 }, { text: "Adventure & exploration", points: 20 }, { text: "Cozy night at home", points: 25 }, { text: "Creative activity together", points: 25 }] },
    { question: "How do you handle conflicts?", options: [{ text: "Talk it out immediately", points: 30 }, { text: "Take time & reflect", points: 20 }, { text: "Find a compromise", points: 25 }, { text: "Seek external help", points: 15 }] },
    { question: "Your crush does something sweet. You:", options: [{ text: "Melt instantly 😍", points: 30 }, { text: "Feel a warm glow", points: 25 }, { text: "Appreciate it calmly", points: 20 }, { text: "Reciprocate with something sweeter", points: 25 }] },
    { question: "What makes a perfect relationship?", options: [{ text: "Unconditional love", points: 30 }, { text: "Trust & honesty", points: 25 }, { text: "Fun & laughter", points: 20 }, { text: "Personal growth together", points: 25 }] },
    { question: "Your partner is upset. You:", options: [{ text: "Listen without judgment", points: 30 }, { text: "Try to fix the problem", points: 20 }, { text: "Give them space", points: 15 }, { text: "Offer emotional support", points: 25 }] },
    { question: "What's your love style?", options: [{ text: "Passionate & intense", points: 25 }, { text: "Calm & steady", points: 20 }, { text: "Playful & fun", points: 20 }, { text: "Deep & poetic", points: 30 }] },
    { question: "How important is romance to you?", options: [{ text: "Everything!", points: 30 }, { text: "Very important", points: 25 }, { text: "Somewhat important", points: 15 }, { text: "Less important, more practical", points: 10 }] },
    { question: "Your dream future includes:", options: [{ text: "Forever with one person", points: 30 }, { text: "Shared adventures", points: 20 }, { text: "Building a life together", points: 25 }, { text: "Growing old hand in hand", points: 30 }] },
    { question: "Love, for you, feels like:", options: [{ text: "Fireworks! Explosive & magical", points: 25 }, { text: "A warm blanket", points: 20 }, { text: "Flying high", points: 25 }, { text: "Coming home", points: 30 }] },
    { question: "How do you express affection?", options: [{ text: "Words & compliments", points: 25 }, { text: "Physical closeness", points: 25 }, { text: "Thoughtful gestures", points: 30 }, { text: "Quality conversations", points: 20 }] },
    { question: "Your love language in a crisis:", options: [{ text: "Being there physically", points: 25 }, { text: "Constant communication", points: 20 }, { text: "Practical help", points: 25 }, { text: "Silent understanding", points: 20 }] },
    { question: "What do you value most in a partner?", options: [{ text: "Authenticity", points: 25 }, { text: "Kindness", points: 30 }, { text: "Humor", points: 20 }, { text: "Wisdom", points: 25 }] },
    { question: "Your favorite love movie trope:", options: [{ text: "Enemies to lovers", points: 20 }, { text: "Soulmate connection", points: 30 }, { text: "Slow burn romance", points: 25 }, { text: "Wrong place, right time", points: 20 }] },
    { question: "Love means being willing to:", options: [{ text: "Be vulnerable", points: 30 }, { text: "Compromise", points: 25 }, { text: "Support their dreams", points: 25 }, { text: "Grow together", points: 20 }] },
    { question: "Your ideal morning with them:", options: [{ text: "Cuddling in bed", points: 25 }, { text: "Cooking breakfast together", points: 25 }, { text: "Deep conversations", points: 20 }, { text: "Comfortable silence", points: 30 }] },
    { question: "Forever love, to you, means:", options: [{ text: "Proving it every day", points: 25 }, { text: "Weathering storms together", points: 30 }, { text: "Growing old together", points: 25 }, { text: "Unconditional acceptance", points: 20 }] },
    { question: "Your love superpower is:", options: [{ text: "Making them laugh", points: 20 }, { text: "Deep empathy", points: 25 }, { text: "Unwavering loyalty", points: 30 }, { text: "Romantic gestures", points: 25 }] },
    { question: "When you fall in love, you:", options: [{ text: "Fall hard & fast", points: 20 }, { text: "Let it grow slowly", points: 25 }, { text: "Question everything", points: 15 }, { text: "Just know deep down", points: 30 }] },
    { question: "Love's greatest gift is:", options: [{ text: "Feeling truly seen", points: 30 }, { text: "Having a best friend", points: 25 }, { text: "Shared dreams", points: 20 }, { text: "Home in another person", points: 30 }] }
];

let currentQuestion = 0;
let quizAnswers = [];

function openQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    document.getElementById('quizModal').style.display = 'block';
    renderQuiz();
}

function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
}

function renderQuiz() {
    const container = document.getElementById('quizQuestions');
    container.innerHTML = '';
    
    quizQuestions.forEach((q, i) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.style.display = i === currentQuestion ? 'block' : 'none';
        qDiv.id = `question-${i}`;
        
        let html = `<h3>Question ${i + 1} of ${quizQuestions.length}<br>${q.question}</h3><div class="quiz-options">`;
        
        q.options.forEach((opt, oIdx) => {
            const selected = quizAnswers[i] === oIdx ? 'selected' : '';
            html += `<div class="quiz-option ${selected}" onclick="selectAnswer(${i}, ${oIdx})">${opt.text}</div>`;
        });
        
        html += '</div>';
        qDiv.innerHTML = html;
        container.appendChild(qDiv);
    });

    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function selectAnswer(qIndex, aIndex) {
    quizAnswers[qIndex] = aIndex;
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuiz();
    } else {
        document.querySelector('.quiz-btn-primary').style.background = '#ff5585';
    }
}

function submitQuiz() {
    if (quizAnswers.length !== quizQuestions.length) {
        alert('Please answer all questions!');
        return;
    }

    let totalPoints = 0;
    quizAnswers.forEach((aIndex, qIndex) => {
        totalPoints += quizQuestions[qIndex].options[aIndex].points;
    });

    const maxPoints = quizQuestions.length * 30;
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    let loveLevelEmoji, message;
    if (percentage >= 90) {
        loveLevelEmoji = '💕💕💕💕💕';
        message = "You're a LOVE LEGEND! 🏆 Your heart is overflowing with romance, passion, and deep affection. This world needs more of your love!";
    } else if (percentage >= 75) {
        loveLevelEmoji = '💕💕💕💕';
        message = "You're a LOVE MASTER! 💖 You understand love deeply and express it beautifully. Lucky are those loved by you!";
    } else if (percentage >= 60) {
        loveLevelEmoji = '💕💕💕';
        message = "You have a LOVING HEART! 💝 You care deeply and know how to show it. Your loved ones feel truly special.";
    } else if (percentage >= 45) {
        loveLevelEmoji = '💕💕';
        message = "You're a HOPEFUL ROMANTIC! 🌹 There's warmth and sincerity in your approach to love. Keep nurturing those feelings!";
    } else {
        loveLevelEmoji = '💕';
        message = "You're DISCOVERING LOVE! 💫 Love is a journey, and you're on your way. Open your heart and embrace the magic!";
    }

    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('finalScore').textContent = percentage + '/100';
    document.getElementById('loveLevelEmoji').textContent = loveLevelEmoji;
    document.getElementById('resultMessage').textContent = message;

    window.quizResult = { percentage, message, loveLevelEmoji };
}

function retakeQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    renderQuiz();
}

let selectedReply = null;

function selectReply(message) {
    selectedReply = message;
    const input = document.getElementById('customReply');
    if (input) {
        input.value = message;
        input.focus();
    }
}

function sendReply() {
    const customInput = document.getElementById('customReply');
    const reply = customInput.value || selectedReply || 'Thank you! 💕';

    if (reply.trim()) {
        const replySection = document.getElementById('replySection');
        
        replySection.innerHTML = `
            <p style="color: white; font-size: 1.2rem; font-weight: bold; animation: fadeInUp 0.5s ease-in-out;">
                You said: "${reply}"
            </p>
            <p style="color: white; font-size: 1.1rem; margin-top: 12px;">💕 Message sent! 💕</p>
        `;
        customInput.value = '';
        selectedReply = null;
    }
}

function closeResultModal() {
    document.getElementById('resultModal').style.display = 'none';
}
