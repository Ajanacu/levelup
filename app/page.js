"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const [typed, setTyped] = useState('')
  const fullText = 'LEVEL UP YOUR CAREER'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-void flex flex-col overflow-hidden">

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon flex items-center justify-center">
            <span className="text-void font-mono font-black text-sm">LU</span>
          </div>
          <span className="font-mono text-sm tracking-widest text-neon-text neon-text-sm uppercase">LevelUp</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted tracking-widest">v1.0.0</span>
          <button
            onClick={() => router.push('/upload')}
            className="btn-neon text-xs"
          >
            Initialize →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Status badge */}
        <div className="anim-1 mb-8 flex items-center gap-2 border border-neon border-opacity-30 px-4 py-2 bg-void">
          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-neon uppercase">System Online — Ready to Analyze</span>
        </div>

        {/* Typewriter headline */}
        <h1 className="anim-2 font-mono text-5xl md:text-7xl font-black tracking-tight mb-2" style={{ minHeight: '1.2em' }}>
          <span className="neon-text">{typed}</span>
          <span className="neon-text animate-pulse">_</span>
        </h1>

        <p className="anim-3 mt-6 text-lg font-body text-muted max-w-2xl leading-relaxed">
          Upload your resume. Get skill-tested. Unlock levels. Track your journey
          to your <span className="text-amber font-bold">dream role</span> — one skill at a time.
        </p>

        {/* CTA */}
        <div className="anim-4 mt-12 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => router.push('/upload')}
            className="btn-neon-fill text-sm px-12 py-4"
          >
            ▶ Start Your Quest
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-neon text-sm"
          >
            View Demo Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="anim-5 mt-20 grid grid-cols-3 gap-12">
          {[
            { val: '10+', label: 'Skill Levels' },
            { val: 'XP', label: 'Points System' },
            { val: 'AI', label: 'Powered Tests' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-3xl font-black neon-text">{s.val}</div>
              <div className="font-mono text-xs tracking-widest text-muted uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature row */}
      <section className="relative z-10 border-t border-border py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: '📄', title: 'Upload Resume', desc: 'AI reads your skills and finds your gap to the dream role' },
            { icon: '🧪', title: 'Take Tests', desc: 'Skill-specific quizzes unlock each level of your career tree' },
            { icon: '🏆', title: 'Earn XP', desc: 'Pass tests and upload proof to earn points and badges' },
            { icon: '🎯', title: 'Mock Interviews', desc: 'Hit Level 5 to unlock AI mock interviews and HR simulations' },
          ].map(f => (
            <div key={f.title} className="game-card p-5 bracket-box">
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-mono text-xs text-neon tracking-widest uppercase mb-2">{f.title}</div>
              <p className="text-sm text-muted font-body leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 px-8 text-center">
        <span className="font-mono text-xs text-muted tracking-widest">LEVELUP © 2024 — GAMIFIED CAREER GROWTH</span>
      </footer>

    </main>
  )
}
