"use client";
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function QuestPage() {
  const router = useRouter()
  const [phase, setPhase] = useState('loading') // loading → briefing → quiz → result
  const [level, setLevel] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(120)
  const [result, setResult] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('activeLevel')
    if (!stored) { router.push('/dashboard'); return }
    const lvl = JSON.parse(stored)
    setLevel(lvl)
    setPhase('briefing')
  }, [router])

  const handleTimeUp = useCallback(async () => {
    if (phase !== 'quiz') return
    await submitQuiz([...answers])
  }, [phase, answers])

  // Timer
  useEffect(() => {
    if (phase !== 'quiz') return
    if (timeLeft <= 0) { handleTimeUp(); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, handleTimeUp])

  async function startQuiz() {
    setPhase('loading')
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: level.skills[0], level: level.level }),
    })
    const data = await res.json()
    setQuiz(data.quiz)
    setTimeLeft(data.quiz.timeLimit)
    setPhase('quiz')
  }

  function selectAnswer(optionIndex) {
    if (showFeedback) return
    setSelected(optionIndex)
    setShowFeedback(true)

    setTimeout(() => {
      const newAnswers = [...answers, optionIndex]
      setAnswers(newAnswers)
      setShowFeedback(false)
      setSelected(null)

      if (currentQ + 1 < quiz.questions.length) {
        setCurrentQ(currentQ + 1)
      } else {
        submitQuiz(newAnswers)
      }
    }, 1000)
  }

  async function submitQuiz(finalAnswers) {
    setPhase('loading')
    const res = await fetch('/api/submit-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: finalAnswers,
        questions: quiz.questions,
        level: level.level,
        skill: level.skills[0],
        xpReward: quiz.xpReward,
      }),
    })
    const data = await res.json()
    setResult(data.result)

    // Update player data if passed
    if (data.result.passed) {
      const stored = sessionStorage.getItem('playerData')
      if (stored) {
        const player = JSON.parse(stored)
        player.totalXP = (player.totalXP || 0) + data.result.xpEarned
        player.currentLevel = Math.max(player.currentLevel || 1, level.level)
        if (data.result.badge && !player.badges.includes(data.result.badge)) {
          player.badges = [...(player.badges || []), data.result.badge]
        }
        // Unlock next level
        player.skillTree = player.skillTree.map(l => {
          if (l.level === level.level) return { ...l, completed: true }
          if (l.level === level.level + 1) return { ...l, unlocked: true }
          return l
        })
        sessionStorage.setItem('playerData', JSON.stringify(player))
      }
    }
    setPhase('result')
  }

  const timerColor = timeLeft > 60 ? 'text-neon' : timeLeft > 30 ? 'text-amber' : 'text-red-400'
  const timerPct = quiz ? (timeLeft / quiz.timeLimit) * 100 : 100

  return (
    <main className="min-h-screen bg-void flex flex-col">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,148,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.02) 1px, transparent 1px)',
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
        {phase === 'quiz' && (
          <div className={`font-mono text-xl font-black ${timerColor}`}>
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* ── LOADING ── */}
          {phase === 'loading' && (
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="font-mono text-sm text-neon tracking-widest">GENERATING QUEST...</p>
            </div>
          )}

          {/* ── BRIEFING ── */}
          {phase === 'briefing' && level && (
            <div className="game-card p-8 bracket-box anim-1">
              <div className="font-mono text-xs text-neon tracking-widest uppercase mb-6">// MISSION BRIEFING</div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 border-2 border-neon flex items-center justify-center font-mono text-2xl font-black text-neon">
                  {level.level}
                </div>
                <div>
                  <h1 className="font-mono text-2xl font-black text-white">{level.title}</h1>
                  <p className="font-mono text-xs text-muted mt-1">{level.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between border border-border p-3">
                  <span className="font-mono text-xs text-muted uppercase">Skills Tested</span>
                  <span className="font-mono text-xs text-white">{level.skills.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between border border-border p-3">
                  <span className="font-mono text-xs text-muted uppercase">Questions</span>
                  <span className="font-mono text-xs text-white">3 Questions</span>
                </div>
                <div className="flex items-center justify-between border border-border p-3">
                  <span className="font-mono text-xs text-muted uppercase">Time Limit</span>
                  <span className="font-mono text-xs text-white">2 Minutes</span>
                </div>
                <div className="flex items-center justify-between border border-border p-3">
                  <span className="font-mono text-xs text-muted uppercase">Pass Mark</span>
                  <span className="font-mono text-xs text-neon">2 / 3 Correct</span>
                </div>
                <div className="flex items-center justify-between border border-border p-3">
                  <span className="font-mono text-xs text-muted uppercase">XP Reward</span>
                  <span className="xp-badge">+{level.xp} XP</span>
                </div>
              </div>

              <button onClick={startQuiz} className="btn-neon-fill w-full py-4">
                ▶ BEGIN QUEST
              </button>
            </div>
          )}

          {/* ── QUIZ ── */}
          {phase === 'quiz' && quiz && (
            <div className="anim-1">
              {/* Timer bar */}
              <div className="h-1 bg-panel border border-border mb-6 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${timeLeft > 60 ? 'bg-neon' : timeLeft > 30 ? 'bg-amber' : 'bg-red-500'}`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>

              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">QUESTION {currentQ + 1} / {quiz.questions.length}</span>
                <span className="font-mono text-xs text-neon">{quiz.skill} TEST</span>
              </div>

              {/* Question */}
              <div className="game-card p-6 mb-6 bracket-box">
                <p className="font-body text-lg text-white leading-relaxed">
                  {quiz.questions[currentQ].q}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((option, i) => {
                  let style = 'border-border text-muted hover:border-neon hover:text-white cursor-pointer'
                  if (showFeedback) {
                    if (i === quiz.questions[currentQ].answer) style = 'border-neon text-neon bg-neon bg-opacity-10'
                    else if (i === selected) style = 'border-red-500 text-red-400 bg-red-500 bg-opacity-10'
                    else style = 'border-border text-muted opacity-50'
                  } else if (selected === i) {
                    style = 'border-neon text-neon'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`w-full text-left border p-4 font-mono text-sm transition-all duration-200 flex items-center gap-4 ${style}`}
                    >
                      <span className="w-6 h-6 border border-current flex items-center justify-center text-xs flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === 'result' && result && (
            <div className={`game-card p-8 bracket-box anim-1 text-center border ${result.passed ? 'border-neon border-opacity-50' : 'border-red-500 border-opacity-50'}`}>
              <div className="text-6xl mb-6">{result.passed ? '🏆' : '💀'}</div>

              <div className={`font-mono text-xs tracking-widest uppercase mb-3 ${result.passed ? 'text-neon' : 'text-red-400'}`}>
                {result.passed ? '// LEVEL UNLOCKED' : '// QUEST FAILED'}
              </div>

              <h2 className="font-mono text-2xl font-black text-white mb-2">
                {result.score}% Score
              </h2>
              <p className="font-mono text-sm text-muted mb-6">
                {result.correct} / {result.total} correct
              </p>

              {/* XP earned */}
              <div className={`border p-4 mb-6 ${result.passed ? 'border-neon border-opacity-30 bg-neon bg-opacity-5' : 'border-border'}`}>
                <div className="xp-badge inline-block mb-2">+{result.xpEarned} XP</div>
                {result.badge && (
                  <p className="font-mono text-sm text-plasma-light mt-2">Badge Earned: {result.badge}</p>
                )}
              </div>

              <p className={`font-mono text-sm mb-8 ${result.passed ? 'text-neon' : 'text-red-400'}`}>
                {result.message}
              </p>

              <div className="flex gap-3">
                {!result.passed && (
                  <button onClick={() => { setPhase('briefing'); setCurrentQ(0); setAnswers([]); setSelected(null) }} className="btn-neon flex-1 py-3 text-xs">
                    ↺ Retry
                  </button>
                )}
                <button onClick={() => router.push('/dashboard')} className="btn-neon-fill flex-1 py-3 text-xs">
                  {result.passed ? '→ Continue Quest' : '← Dashboard'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
