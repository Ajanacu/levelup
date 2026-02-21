import { NextResponse } from 'next/server'

// Mock quiz bank — in real app, Claude AI generates these
const QUIZ_BANK = {
  'HTML5': [
    { q: 'What does the <semantic> elements like <article> and <section> improve?', options: ['Page speed', 'Accessibility & SEO', 'JavaScript performance', 'Database queries'], answer: 1 },
    { q: 'Which attribute makes an input field required in HTML5?', options: ['mandatory', 'required', 'validate', 'must'], answer: 1 },
    { q: 'What is the purpose of the <canvas> element?', options: ['Display images', 'Draw graphics via JavaScript', 'Embed videos', 'Create forms'], answer: 1 },
  ],
  'CSS3': [
    { q: 'Which CSS property is used to create a flexible layout?', options: ['display: block', 'display: flex', 'display: inline', 'display: grid'], answer: 1 },
    { q: 'What does the CSS "z-index" property control?', options: ['Zoom level', 'Stacking order of elements', 'Font size', 'Border width'], answer: 1 },
    { q: 'Which unit is relative to the viewport width?', options: ['px', 'em', 'vw', 'rem'], answer: 2 },
  ],
  'JavaScript': [
    { q: 'What is a closure in JavaScript?', options: ['A way to close the browser', 'A function that retains access to its outer scope', 'A type of loop', 'An HTML element'], answer: 1 },
    { q: 'What does "async/await" do in JavaScript?', options: ['Speeds up code', 'Handles asynchronous operations synchronously', 'Blocks the main thread', 'Creates new threads'], answer: 1 },
    { q: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0 },
  ],
  'React': [
    { q: 'What hook is used to manage state in a functional React component?', options: ['useEffect', 'useState', 'useContext', 'useRef'], answer: 1 },
    { q: 'What is the Virtual DOM?', options: ['A browser API', 'A lightweight copy of the real DOM', 'A database', 'A CSS framework'], answer: 1 },
    { q: 'What does useEffect do?', options: ['Manages state', 'Handles side effects after render', 'Creates components', 'Styles elements'], answer: 1 },
  ],
  'TypeScript': [
    { q: 'What is the main benefit of TypeScript over JavaScript?', options: ['Faster runtime', 'Static type checking', 'Smaller bundle size', 'Better CSS support'], answer: 1 },
    { q: 'What does the "interface" keyword do in TypeScript?', options: ['Creates a class', 'Defines a contract/shape for objects', 'Imports modules', 'Declares variables'], answer: 1 },
    { q: 'What is a "generic" in TypeScript?', options: ['A default value', 'A reusable type placeholder', 'An error handler', 'A loop type'], answer: 1 },
  ],
  'Python': [
    { q: 'What is a list comprehension in Python?', options: ['A type of loop', 'A concise way to create lists', 'A class method', 'An import statement'], answer: 1 },
    { q: 'What does "self" refer to in a Python class?', options: ['The parent class', 'The current instance', 'A global variable', 'A module'], answer: 1 },
    { q: 'Which Python library is commonly used for data manipulation?', options: ['NumPy', 'Pandas', 'Matplotlib', 'All of the above'], answer: 3 },
  ],
  'default': [
    { q: 'What is the most important factor in writing clean code?', options: ['Speed', 'Readability and maintainability', 'Using the latest frameworks', 'Writing fewer lines'], answer: 1 },
    { q: 'What does DRY stand for in programming?', options: ["Don't Repeat Yourself", 'Dynamic Runtime Yielding', 'Data Retrieval Yield', 'Default React Yield'], answer: 0 },
    { q: 'What is version control used for?', options: ['Database management', 'Tracking code changes over time', 'Styling websites', 'Managing servers'], answer: 1 },
  ],
}

function getQuizForSkill(skill) {
  // Find matching quiz
  for (const [key, questions] of Object.entries(QUIZ_BANK)) {
    if (skill.toLowerCase().includes(key.toLowerCase())) {
      return questions
    }
  }
  return QUIZ_BANK['default']
}

export async function POST(request) {
  try {
    const { skill, level } = await request.json()
    const questions = getQuizForSkill(skill)

    return NextResponse.json({
      quiz: {
        skill,
        level,
        questions,
        timeLimit: 120, // seconds
        passMark: 2, // out of 3
        xpReward: level * 100,
      }
    }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 })
  }
}
