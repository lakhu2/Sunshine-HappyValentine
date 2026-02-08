# Valentine's Day Special 💖

A beautiful, interactive Valentine's Day experience with daily surprises, mini-games, and heartfelt messages.

## 🎯 Features
- **Interactive intro page** - "Will you be my Valentine?" with playful interactions
- **10-Year Love Timeline** - Beautiful journey from July 2, 2015 to present with sweet quotes
- **Daily surprise messages** (Feb 7-14, 2026) - Unlock heartfelt messages each day
- **Love quiz** - 20 questions to discover your love score
- **Mini games** - 6 different games including Heart Catch, Memory-Light, and emotional games
- **Love reflections journal** - Save your thoughts and feelings

## 📁 Project Structure

```
Sunshine-HappyValentine/
├── index.html          # Main HTML structure
├── styles.css          # Core styles and intro page
├── components.css      # Game, quiz, and modal styles
├── script.js           # Intro page and core functionality
├── daily.js            # Daily surprises module
├── quiz.js             # Love quiz module
├── reflections.js      # Love reflections module
├── games.js            # Mini games module
└── README.md           # This file
```

## 🚀 How to Use

### Local Development
1. Open `index.html` in a web browser
2. All files must be in the same directory

### GitHub Pages Deployment
1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`) and root folder
4. Your site will be live at: `https://[username].github.io/[repo-name]/`

## 🎮 Features Breakdown

### Intro Page
- Only "Yes" button works (playful design)
- "No" button reacts but can't be clicked
- Confetti animation on acceptance
- Stores response in localStorage

### Daily Surprises
- 8 days of messages (Feb 7-14, 2026)
- Countdown timers for locked days
- Secret 4-tap unlock for early access
- Interactive rose and sparkle effects

### Love Quiz
- 20 questions about love and relationships
- Scoring system (0-100)
- Personalized results with emojis
- Share functionality

### Mini Games
1. **Heart Catch** - Click falling hearts (90s)
2. **Memory-Light** - Match emoji pairs (60s)
3. **Letter Garden** - Plant flowers by clicking
4. **Hold My Heart** - Hold to fill progress bar
5. **See Yourself** - Tap to reveal affirmations
6. **Choose Comfort** - Select emotional support options

### Love Reflections
- 10 deep reflection prompts
- Saves to localStorage
- Progress tracking
- Preview saved reflections

## 📱 Mobile Responsive
- Fully responsive design
- Touch-friendly interactions
- Optimized for all screen sizes
- High DPI display support

## 🎨 Design
- Color palette: Pink (#ff6b9d), Purple (#6f4fb8), Gold (#ffb347)
- Smooth animations and transitions
- Gradient backgrounds
- Floating hearts and sparkles

## 💾 Data Storage
- Uses localStorage for:
  - Intro response
  - Quiz answers
  - Reflection journal entries
- No server required
- Data persists across sessions

## 🌐 Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- HTML5 Canvas support needed for games

## 💝 Personalization
This app is designed for **Sunshine Das** with:
- Personal messages in English and Bengali
- Specific dates (Feb 7-14, 2026)
- Marriage proposal on Valentine's Day

To customize:
1. Edit `daily.js` - Change messages and dates
2. Edit `script.js` - Update names and text
3. Edit `styles.css` - Modify colors and fonts

## 📝 License
Personal project - Made with love ❤️

---

**Note**: This is a deeply personal gift. The countdown is set for Valentine's Day 2026.
