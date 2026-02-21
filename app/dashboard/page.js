"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [player, setPlayer] = useState(null)
  const [activeTab, setActiveTab] = useState('skilltree')
  const [unlockAnim, setUnlockAnim] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('playerData')
    if (stored) {
      setPlayer(JSON.parse(stored))
    } else {
      // Load demo data
      setPlayer(getDemoData())
    }
  }, [])

  function startQuest(level) {
    if (!level.unlocked) return
    sessionStorage.setItem('activeLevel', JSON.stringify(level))
    router.push('/quest')
  }

  function handleLevelComplete(levelNum) {
    // Update player data after completing a level
    setUnlockAnim(levelNum + 1)
    setTimeout(() => setUnlockAnim(null), 1000)

    const updated = { ...player }
    updated.skillTree = updated.skillTree.map(l => {
      if (l.level === levelNum) return { ...l, completed: true }
      if (l.level === levelNum + 1) return { ...l, unlocked: true }
      return l
    })
    updated.currentLevel = Math.max(updated.currentLevel, levelNum)
    updated.totalXP += updated.skillTree[levelNum - 1]?.xp || 100
    setPlayer(updated)
    sessionStorage.setItem('playerData', JSON.stringify(updated))
  }

  if (!player) return <LoadingScreen />

  const progressPct = Math.round((player.totalXP / player.maxXP) * 100)
  const completedLevels = player.skillTree.filter(l => l.completed).length
  const unlockedLevel = player.skillTree.find(l => l.unlocked && !l.completed)

  return (
    <main className="min-h-screen bg-void">
      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,148,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-border sticky top-0 bg-void bg-opacity-90 backdrop-blur">
        <button onClick={() => router.push('/')} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon flex items-center justify-center">
            <span className="text-void font-mono font-black text-sm">LU</span>
          </div>
          <span className="font-mono text-sm tracking-widest neon-text-sm uppercase">LevelUp</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="xp-badge">{player.totalXP} XP</div>
          <span className="font-mono text-xs text-muted">LVL {player.currentLevel}</span>
          <button onClick={() => router.push('/upload')} className="btn-neon text-xs py-2 px-4">New Quest</button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">

        {/* ── Player Header ── */}
        <div className="anim-1 game-card p-6 mb-6 bracket-box">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-neon tracking-widest uppercase mb-1">// ACTIVE QUEST</div>
              <h1 className="font-mono text-2xl font-black text-white">{player.dreamRole}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-mono text-xs text-muted">Level {player.currentLevel} Player</span>
                <span className="text-border">|</span>
                <span className="font-mono text-xs text-amber">{completedLevels} / {player.skillTree.length} Levels Complete</span>
              </div>
            </div>

            {/* XP Bar */}
            <div className="w-full md:w-64">
              <div className="flex justify-between font-mono text-xs text-muted mb-2">
                <span>PROGRESS TO DREAM ROLE</span>
                <span className="text-neon">{progressPct}%</span>
              </div>
              <div className="h-3 bg-panel border border-border overflow-hidden">
                <div className="progress-bar h-full" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="flex justify-between font-mono text-xs text-muted mt-1">
                <span>{player.totalXP} XP</span>
                <span>{player.maxXP} XP</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          {player.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {player.badges.map(b => (
                <span key={b} className="font-mono text-xs border border-plasma border-opacity-50 text-plasma-light px-3 py-1">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Tabs ── */}
        <div className="anim-2 flex gap-1 mb-6 border-b border-border">
          {[
            { id: 'skilltree', label: '⚡ Skill Tree' },
            { id: 'gaps', label: '🎯 Skill Gaps' },
            { id: 'stats', label: '📊 Stats' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-xs tracking-widest uppercase px-6 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-neon text-neon'
                  : 'border-transparent text-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SKILL TREE TAB ── */}
        {activeTab === 'skilltree' && (
          <div className="anim-3 space-y-4">
            {player.skillTree.map((level, i) => (
              <LevelCard
                key={level.level}
                level={level}
                isAnimating={unlockAnim === level.level}
                onStart={() => startQuest(level)}
                isCurrent={unlockedLevel?.level === level.level}
              />
            ))}
          </div>
        )}

        {/* ── SKILL GAPS TAB ── */}
        {activeTab === 'gaps' && (
          <div className="anim-3 space-y-4">
            <div className="game-card p-6">
              <div className="font-mono text-xs text-neon tracking-widest uppercase mb-4">// Skills You Have</div>
              <div className="flex flex-wrap gap-2">
                {player.currentSkills.map(s => (
                  <span key={s} className="font-mono text-xs border border-neon border-opacity-40 text-neon px-3 py-1">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="game-card p-6">
              <div className="font-mono text-xs text-amber tracking-widest uppercase mb-4">// Skills You Need</div>
              <div className="flex flex-wrap gap-2">
                {player.gapSkills.map(s => (
                  <span key={s} className="font-mono text-xs border border-amber border-opacity-40 text-amber px-3 py-1">
                    ⬡ {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="game-card p-6">
              <div className="font-mono text-xs text-muted tracking-widest uppercase mb-3">// Next Recommended Action</div>
              {unlockedLevel ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-mono text-sm">Take the <span className="text-neon">{unlockedLevel.skills[0]}</span> test</p>
                    <p className="text-muted font-mono text-xs mt-1">Unlock Level {unlockedLevel.level}: {unlockedLevel.title}</p>
                  </div>
                  <button onClick={() => startQuest(unlockedLevel)} className="btn-neon-fill text-xs px-6 py-2">
                    Start Test →
                  </button>
                </div>
              ) : (
                <p className="text-neon font-mono text-sm">🏆 All levels completed! You're ready for the role.</p>
              )}
            </div>
          </div>
        )}

        {/* ── STATS TAB ── */}
        {activeTab === 'stats' && (
          <div className="anim-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Total XP Earned', value: player.totalXP, unit: 'XP', color: 'text-neon' },
              { label: 'Levels Complete', value: completedLevels, unit: `/ ${player.skillTree.length}`, color: 'text-plasma-light' },
              { label: 'Badges Earned', value: player.badges.length, unit: 'badges', color: 'text-amber' },
              { label: 'Skills Mastered', value: player.currentSkills.length, unit: 'skills', color: 'text-neon' },
              { label: 'Skills Remaining', value: player.gapSkills.length, unit: 'to learn', color: 'text-red-400' },
              { label: 'Progress', value: progressPct, unit: '%', color: 'text-amber' },
            ].map(stat => (
              <div key={stat.label} className="game-card p-6 text-center bracket-box">
                <div className={`font-mono text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                <div className="font-mono text-xs text-muted tracking-widest">{stat.unit}</div>
                <div className="font-mono text-xs text-muted mt-2 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

// ── Level Card Component ──
function LevelCard({ level, isAnimating, onStart, isCurrent }) {
  const isLocked = !level.unlocked
  const isMilestone = level.milestone

  return (
    <div className={`relative border transition-all duration-300 ${
      isAnimating ? 'unlock-anim' : ''
    } ${
      level.completed ? 'border-neon border-opacity-30 bg-neon bg-opacity-5' :
      isCurrent ? 'border-neon border-opacity-60 bg-panel' :
      isLocked ? 'border-border bg-panel level-locked' :
      'border-border bg-panel'
    } ${isMilestone ? 'border-amber border-opacity-50' : ''}`}>

      {/* Milestone banner */}
      {isMilestone && (
        <div className="bg-amber bg-opacity-10 border-b border-amber border-opacity-30 px-6 py-2 flex items-center gap-2">
          <span className="text-amber font-mono text-xs tracking-widest uppercase">⭐ MILESTONE REWARD: {level.milestoneReward}</span>
        </div>
      )}

      <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        {/* Level info */}
        <div className="flex items-start gap-5">
          {/* Level number */}
          <div className={`w-12 h-12 flex items-center justify-center border font-mono font-black text-lg flex-shrink-0 ${
            level.completed ? 'border-neon text-neon bg-neon bg-opacity-10' :
            isCurrent ? 'border-neon text-neon' :
            'border-border text-muted'
          }`}>
            {level.completed ? '✓' : isLocked ? '🔒' : level.level}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs text-muted tracking-widest uppercase">LEVEL {level.level}</span>
              <span className="xp-badge">+{level.xp} XP</span>
              {level.completed && <span className="font-mono text-xs text-neon">COMPLETED</span>}
              {isCurrent && !level.completed && <span className="font-mono text-xs text-amber animate-pulse">▶ ACTIVE</span>}
            </div>
            <h3 className={`font-mono text-lg font-bold ${isLocked ? 'text-muted' : 'text-white'}`}>
              {level.title}
            </h3>
            <p className="font-mono text-xs text-muted mt-1">{level.description}</p>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {level.skills.map(skill => (
                <span key={skill} className={`font-mono text-xs px-2 py-1 border ${
                  isLocked ? 'border-border text-muted' : 'border-neon border-opacity-30 text-neon'
                }`}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Required skills notice */}
            {isLocked && level.requiredSkills?.length > 0 && (
              <p className="font-mono text-xs text-muted mt-2">
                🔒 Requires: {level.requiredSkills.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Action button */}
        {!isLocked && (
          <div className="flex-shrink-0">
            {level.completed ? (
              <span className="font-mono text-xs text-neon border border-neon border-opacity-30 px-5 py-2 block text-center">
                ✓ PASSED
              </span>
            ) : isMilestone && level.level === 5 ? (
              <button onClick={onStart} className="btn-neon text-xs border-amber text-amber hover:bg-amber hover:bg-opacity-10 px-6 py-2">
                🎤 Mock Interview
              </button>
            ) : (
              <button onClick={onStart} className="btn-neon-fill text-xs px-6 py-2">
                Take Test →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs text-neon tracking-widest">LOADING PLAYER DATA...</p>
      </div>
    </div>
  )
}

function getDemoData() {
  return {
    name: "Alex Chen",
    dreamRole: "Senior Frontend Engineer",
    currentLevel: 3,
    totalXP: 850,
    maxXP: 2000,
    badges: ["🌱 Seedling", "⚡ Spark", "Quick Learner"],
    currentSkills: ["HTML", "CSS", "JavaScript", "React Basics"],
    gapSkills: ["TypeScript", "Testing", "Performance Optimization", "System Design"],
    progressPercent: 42,
    skillTree: [
      { level: 1, title: "Foundation", xp: 100, unlocked: true, completed: true, skills: ["HTML5", "CSS3"], description: "Core web fundamentals", requiredSkills: [] },
      { level: 2, title: "JavaScript Core", xp: 200, unlocked: true, completed: true, skills: ["ES6+", "Async/Await"], description: "Modern JavaScript", requiredSkills: ["HTML5"] },
      { level: 3, title: "React Developer", xp: 300, unlocked: true, completed: false, skills: ["React Hooks", "State Mgmt"], description: "Build dynamic UIs", requiredSkills: ["ES6+"] },
      { level: 4, title: "Advanced Patterns", xp: 400, unlocked: false, completed: false, skills: ["TypeScript", "Testing"], description: "Production-grade code", requiredSkills: ["React Hooks"] },
      { level: 5, title: "System Design", xp: 500, unlocked: false, completed: false, skills: ["Architecture", "Scalability"], description: "Think like a senior dev", requiredSkills: ["TypeScript"], milestone: true, milestoneReward: "🎤 Mock Interview Unlocked!" },
      { level: 6, title: "Leadership", xp: 600, unlocked: false, completed: false, skills: ["Code Review", "Mentoring"], description: "Lead engineering teams", requiredSkills: ["System Design"] },
    ],
  }
}
