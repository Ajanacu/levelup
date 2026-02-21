"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const INTERVIEW_QUESTIONS = [
  { q: "Tell me about yourself and why you're interested in this role.", type: 'behavioral' },
  { q: "Describe a challenging technical problem you solved. Walk me through your approach.", type: 'technical' },
  { q: "How do you handle disagreements with teammates on technical decisions?", type: 'behavioral' },
  { q: "What's your process for optimizing application performance?", type: 'technical' },
  { q: "Where do you see yourself in 5 years?", type: 'behavioral' },
]

const AI_FEEDBACK = [
  "Strong answer! You clearly articulated your thought process. Consider adding specific metrics next time.",
  "Good technical depth. Try using the STAR method (Situation, Task, Action, Result) to structure your answer better.",
  "Excellent communication skills shown here. Your example was relevant and well-explained.",
  "Solid answer. Adding a quantifiable outcome would make this even stronger.",
  "Great self-awareness! Tying your goals more directly to the company's mission would be a nice touch.",
]

export default function InterviewPage() {
  const router = useRouter()
  const [phase, setPhase] = useState('intro') // intro → question → feedback → complete
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [isThinking, setIsThinking] = useState(false)

  async function submitAnswer() {
    if (!answer.trim()) return
    setIsThinking(true)

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 2000))

    const fb = AI_FEEDBACK[currentQ]
    setFeedback(fb)
    setScore(s => s + Math.floor(Math.random() * 20) + 75) // 75-95 per question
    setIsThinking(false)
    setPhase('feedback')
  }

  function nextQuestion() {
    if (currentQ + 1 >= INTERVIEW_QUESTIONS.length) {
      setPhase('complete')
    } else {
      setCurrentQ(currentQ + 1)
      setAnswer('')
      setFeedback('')
      setPhase('question')
    }
  }

  const avgScore = Math.round(score / Math.max(currentQ, 1))

  return (
    <main className="min-h-screen bg-void flex flex-col">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-border">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon flex items-center justify-center">
            <span className="text-void font-mono font-black text-sm">LU</span>
          </div>
          <span className="font-mono text-sm tracking-widest neon-text-sm">← Dashboard</span>
        </button>
        <span className="font-mono text-xs text-plasma-light tracking-widest">🎤 MOCK INTERVIEW</span>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* ── INTRO ── */}
          {phase === 'intro' && (
            <div className="game-card p-8 border border-plasma border-opacity-40 anim-1">
              <div className="font-mono text-xs text-plasma-light tracking-widest uppercase mb-6">// MILESTONE UNLOCKED</div>
              <div className="text-5xl mb-4 text-center">🎤</div>
              <h1 className="font-mono text-3xl font-black text-white text-center mb-3">Mock Interview</h1>
              <p className="text-muted font-body text-center mb-8 leading-relaxed">
                You've reached Level 5! This AI-powered mock interview will help you practice
                real interview questions for your target role. Your answers will be evaluated
                and you'll receive instant feedback.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  ['Questions', `${INTERVIEW_QUESTIONS.length} questions`],
                  ['Types', 'Behavioral + Technical'],
                  ['Feedback', 'AI-powered instant feedback'],
                  ['Reward', '+500 XP + Interview Badge'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border border-border p-3">
                    <span className="font-mono text-xs text-muted uppercase">{k}</span>
                    <span className="font-mono text-xs text-white">{v}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setPhase('question')} className="btn-neon-fill w-full py-4">
                ▶ START INTERVIEW
              </button>
            </div>
          )}

          {/* ── QUESTION ── */}
          {phase === 'question' && (
            <div className="anim-1">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">QUESTION {currentQ + 1} / {INTERVIEW_QUESTIONS.length}</span>
                <span className={`font-mono text-xs border px-3 py-1 ${
                  INTERVIEW_QUESTIONS[currentQ].type === 'behavioral'
                    ? 'border-plasma border-opacity-50 text-plasma-light'
                    : 'border-neon border-opacity-50 text-neon'
                }`}>
                  {INTERVIEW_QUESTIONS[currentQ].type.toUpperCase()}
                </span>
              </div>

              <div className="game-card p-6 bracket-box mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-plasma bg-opacity-20 border border-plasma border-opacity-40 flex items-center justify-center flex-shrink-0 text-lg">
                    🤖
                  </div>
                  <p className="font-body text-lg text-white leading-relaxed">
                    {INTERVIEW_QUESTIONS[currentQ].q}
                  </p>
                </div>
              </div>

              <div className="game-card p-4 mb-4">
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">Your Answer</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={6}
                  className="game-input resize-none"
                />
              </div>

              <button
                onClick={submitAnswer}
                disabled={!answer.trim() || isThinking}
                className="btn-neon-fill w-full py-4 disabled:opacity-50"
              >
                {isThinking ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                    AI IS EVALUATING...
                  </span>
                ) : (
                  'Submit Answer →'
                )}
              </button>
            </div>
          )}

          {/* ── FEEDBACK ── */}
          {phase === 'feedback' && (
            <div className="anim-1 space-y-4">
              <div className="game-card p-6 border border-plasma border-opacity-30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-plasma bg-opacity-20 border border-plasma border-opacity-40 flex items-center justify-center flex-shrink-0 text-lg">
                    🤖
                  </div>
                  <div>
                    <div className="font-mono text-xs text-plasma-light tracking-widest uppercase mb-2">AI FEEDBACK</div>
                    <p className="font-body text-white leading-relaxed">{feedback}</p>
                  </div>
                </div>
              </div>

              <div className="game-card p-4 border border-neon border-opacity-20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">Answer Score</span>
                  <span className="font-mono text-xl font-black text-neon">
                    {Math.floor(Math.random() * 20) + 78}%
                  </span>
                </div>
              </div>

              <button onClick={nextQuestion} className="btn-neon-fill w-full py-4">
                {currentQ + 1 >= INTERVIEW_QUESTIONS.length ? '→ See Final Results' : '→ Next Question'}
              </button>
            </div>
          )}

          {/* ── COMPLETE ── */}
          {phase === 'complete' && (
            <div className="game-card p-8 border border-neon border-opacity-40 text-center anim-1">
              <div className="text-6xl mb-6">🏆</div>
              <div className="font-mono text-xs text-neon tracking-widest uppercase mb-3">// INTERVIEW COMPLETE</div>
              <h2 className="font-mono text-3xl font-black text-white mb-2">Great Job!</h2>
              <p className="font-mono text-muted mb-8">You completed the mock interview</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-border p-4">
                  <div className="font-mono text-3xl font-black text-neon">{INTERVIEW_QUESTIONS.length}</div>
                  <div className="font-mono text-xs text-muted mt-1">Questions Answered</div>
                </div>
                <div className="border border-border p-4">
                  <div className="font-mono text-3xl font-black text-amber">+500</div>
                  <div className="font-mono text-xs text-muted mt-1">XP Earned</div>
                </div>
              </div>

              <div className="border border-plasma border-opacity-30 p-4 mb-8 bg-plasma bg-opacity-5">
                <p className="font-mono text-xs text-plasma-light">🎤 Interview Champion Badge Earned!</p>
              </div>

              <button onClick={() => router.push('/dashboard')} className="btn-neon-fill w-full py-4">
                → Back to Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
