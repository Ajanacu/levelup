# LevelUp 🎯

## Basic Details

### Team Name: SheSpark

### Team Members

* Member 1: Ajana C U - Adi Shankara Institute of Engineering and Technology
* Member 2: Anagha T U - Adi Shankara Institute of Engineering and Technology

### Hosted Project Link

https://level-up-ashy-two.vercel.app/

### Project Description

LevelUp is a gamified career growth platform where users upload their resume and dream role, get skill-tested through quizzes, unlock levels as they upskill, and track their progress on an XP-powered dashboard — making career development feel like a game.

### The Problem Statement

Job seekers don't know what skills they're missing for their dream role, and even when they do, there's no structured, engaging way to close that gap. Traditional learning platforms are boring and don't validate real skill acquisition.

### The Solution

LevelUp analyzes the gap between your current skills and your dream role, then creates a personalized skill tree. You unlock levels by taking quizzes and uploading proof of new skills. Points, badges, and milestone rewards (like mock interviews at Level 5) keep you motivated throughout your career journey.

---

## Technical Details

### Technologies/Components Used

**For Software:**

* Languages used: JavaScript
* Frameworks used: Next.js 14 (App Router), React 18, Tailwind CSS
* Libraries used: Next.js Navigation, React Hooks (useState, useEffect)
* Tools used: VS Code, Git, Node.js, npm

---

## Features

* **Resume Upload & AI Analysis** — Upload your resume and target role; the system maps your skill gap instantly
* **Gamified Skill Tree** — Levels unlock progressively as you prove your skills; locked levels show what's required
* **Timed Quiz System** — Each level has a skill-specific quiz with a countdown timer, instant feedback, and A/B/C/D options
* **XP & Badges** — Earn experience points and badges for every level you pass
* **Progress Dashboard** — Visual XP bar, stats tab, and skill gap breakdown toward your dream role
* **Mock Interview at Level 5** — Reach the milestone to unlock AI-powered behavioral and technical interview practice

---

## Implementation

### For Software:

#### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/levelup.git

# Navigate into the project
cd levelup

# Install dependencies
npm install
```

#### Run

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](Add screenshot of Landing Page here)
*Landing page with typewriter animation and cyberpunk dark theme*

![Screenshot2](Add screenshot of Dashboard here)
*Skill tree dashboard showing locked/unlocked levels, XP bar, and badges*

![Screenshot3](Add screenshot of Quiz page here)
*Timed quiz interface with A/B/C/D options and live countdown timer*

![Screenshot4](Add screenshot of Mock Interview here)
*Level 5 milestone — Mock interview with AI feedback on each answer*

#### Diagrams

**Application Workflow:**

```
User uploads Resume + Dream Role
            ↓
AI analyzes skill gap
            ↓
Skill Tree generated (Level 1 unlocked, rest locked)
            ↓
User takes timed quiz → Pass → Unlock next level + earn XP + badge
            ↓
Upload skill proof → Bonus XP
            ↓
Level 5 Milestone → Mock Interview unlocked
            ↓
Dashboard tracks full progress toward dream role
```

---

## Additional Documentation

### API Documentation

**Base URL:** `http://localhost:3000`

#### Endpoints

**POST /api/analyze-resume**

* **Description:** Analyzes uploaded resume text against the target dream role and returns a personalized skill tree
* **Request Body:**

```json
{
  "dreamRole": "Senior Frontend Engineer",
  "resumeText": "...paste resume content here..."
}
```

* **Response:**

```json
{
  "playerData": {
    "dreamRole": "Senior Frontend Engineer",
    "currentLevel": 1,
    "totalXP": 0,
    "currentSkills": ["HTML", "CSS", "JavaScript"],
    "gapSkills": ["TypeScript", "Testing", "System Design"],
    "skillTree": [...]
  }
}
```

**POST /api/generate-quiz**

* **Description:** Generates skill-specific quiz questions for a given level
* **Request Body:**

```json
{
  "skill": "React",
  "level": 3
}
```

* **Response:**

```json
{
  "quiz": {
    "skill": "React",
    "level": 3,
    "questions": [...],
    "timeLimit": 120,
    "passMark": 2,
    "xpReward": 300
  }
}
```

**POST /api/submit-quiz**

* **Description:** Grades the submitted quiz answers and returns result with XP earned
* **Request Body:**

```json
{
  "answers": [1, 0, 1],
  "questions": [...],
  "level": 3,
  "xpReward": 300
}
```

* **Response:**

```json
{
  "result": {
    "passed": true,
    "correct": 2,
    "total": 3,
    "score": 67,
    "xpEarned": 300,
    "badge": "🔥 Ignited",
    "message": "Level 3 Unlocked! You scored 67%"
  }
}
```

---

## Project Demo

### Video

[Add your demo video link here - YouTube, Google Drive, etc.]

*Demo shows: Resume upload → Skill gap analysis → Dashboard with skill tree → Taking a quiz → Passing and unlocking next level → XP and badge awarded → Mock interview at Level 5*

### Additional Demos

[Add live hosted link here if deployed on Vercel]

---

## AI Tools Used (Optional - For Transparency Bonus)

**Tool Used:** Claude (Anthropic)

**Purpose:** Used to accelerate development during the hackathon

* Generated the full Next.js project structure and boilerplate
* Built the gamified UI components (skill tree, XP bar, quiz interface)
* Designed the API routes for resume analysis, quiz generation, and grading
* Assisted with CSS styling for the cyberpunk dark theme

**Key Prompts Used:**

* "Build a gamified career growth web app with skill tree, quiz system, XP and badges using Next.js"
* "Create a timed quiz component with A/B/C/D options and instant visual feedback"
* "Design a dashboard showing locked/unlocked skill levels with progress bar"

**Percentage of AI-generated code:** ~70%

**Human Contributions:**

* Project concept, ideation and gamification design
* Feature prioritization and user flow decisions
* Content writing — quiz questions, skill mappings, level titles
* Testing, debugging and integration
* Presentation and demo preparation

---

## Team Contributions

* [Name 1]: Project ideation, frontend pages, UI/UX decisions
* [Name 2]: API routes, quiz logic, resume analysis system
* [Name 3]: Dashboard, skill tree component, testing and deployment

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ at TinkerHub
