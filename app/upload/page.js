"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  const [dreamRole, setDreamRole] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')

  // Read uploaded file as text
  async function handleFile(file) {
    if (!file) return
    setFileName(file.name)
    // For demo: just read as plain text
    const text = await file.text()
    setResumeText(text)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  async function handleAnalyze() {
    if (!dreamRole.trim()) { setError('Please enter your dream role.'); return }
    if (!resumeText.trim()) { setError('Please upload or paste your resume.'); return }
    setError('')
    setIsAnalyzing(true)

    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamRole, resumeText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Save player data to sessionStorage
      sessionStorage.setItem('playerData', JSON.stringify(data.playerData))
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Analysis failed. Try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="min-h-screen bg-void">
      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,148,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-border">
        <button onClick={() => router.push('/')} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon flex items-center justify-center">
            <span className="text-void font-mono font-black text-sm">LU</span>
          </div>
          <span className="font-mono text-sm tracking-widest neon-text-sm uppercase">LevelUp</span>
        </button>
        <span className="font-mono text-xs text-muted tracking-widest">MISSION BRIEFING</span>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="anim-1 text-center mb-12">
          <div className="font-mono text-xs text-neon tracking-[0.4em] uppercase mb-4">// STEP 01</div>
          <h1 className="font-mono text-4xl font-black text-white mb-3">Initialize Quest</h1>
          <p className="text-muted font-body">Tell us where you want to go. We'll map the path.</p>
        </div>

        <div className="space-y-6">

          {/* Dream Role */}
          <div className="anim-2 game-card p-6">
            <label className="block font-mono text-xs text-neon tracking-widest uppercase mb-3">
              &gt; Target Role
            </label>
            <input
              type="text"
              value={dreamRole}
              onChange={e => setDreamRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer, Product Manager, Data Scientist..."
              className="game-input"
            />
            <p className="mt-2 font-mono text-xs text-muted">Your destination. We'll analyze the gap from where you are.</p>
          </div>

          {/* Resume Upload */}
          <div className="anim-3 game-card p-6">
            <label className="block font-mono text-xs text-neon tracking-widest uppercase mb-3">
              &gt; Upload Resume
            </label>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
              className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 mb-4 ${
                dragOver ? 'border-neon bg-neon bg-opacity-5' : 'border-border hover:border-neon hover:border-opacity-50'
              }`}
            >
              <div className="text-3xl mb-3">📄</div>
              <p className="font-mono text-sm text-muted">
                {fileName ? (
                  <span className="text-neon">✓ {fileName}</span>
                ) : (
                  <>Drop file here or <span className="text-neon">click to browse</span></>
                )}
              </p>
              <p className="font-mono text-xs text-muted mt-2">Supports .txt, .pdf (text), .doc</p>
              <input
                id="fileInput"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                onChange={e => handleFile(e.target.files[0])}
              />
            </div>

            {/* OR paste text */}
            <div className="font-mono text-xs text-muted text-center mb-3">— OR PASTE RESUME TEXT —</div>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              rows={6}
              className="game-input resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="border border-danger border-opacity-50 bg-danger bg-opacity-5 p-4 font-mono text-xs text-red-400">
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <div className="anim-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-neon-fill w-full py-4 text-sm disabled:opacity-50"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                  ANALYZING YOUR PROFILE...
                </span>
              ) : (
                '▶ ANALYZE & START QUEST'
              )}
            </button>
          </div>

          {/* Demo shortcut */}
          <div className="text-center">
            <button
              onClick={() => {
                // Load demo data for hackathon presentation
                const demoData = getDemoPlayerData()
                sessionStorage.setItem('playerData', JSON.stringify(demoData))
                router.push('/dashboard')
              }}
              className="font-mono text-xs text-muted hover:text-neon transition-colors tracking-widest uppercase underline"
            >
              Skip → Load Demo Data
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

// Demo data for hackathon presentation
function getDemoPlayerData() {
  return {
    name: "Alex Chen",
    dreamRole: "Senior Frontend Engineer",
    currentLevel: 3,
    totalXP: 850,
    maxXP: 2000,
    badges: ["Quick Learner", "Test Ace", "Proof Uploader"],
    currentSkills: ["HTML", "CSS", "JavaScript", "React Basics"],
    skillTree: [
      {
        level: 1, title: "Foundation", xp: 100, unlocked: true, completed: true,
        skills: ["HTML5", "CSS3", "Responsive Design"],
        description: "Core web fundamentals",
      },
      {
        level: 2, title: "JavaScript Core", xp: 200, unlocked: true, completed: true,
        skills: ["ES6+", "DOM Manipulation", "Async/Await"],
        description: "Modern JavaScript mastery",
      },
      {
        level: 3, title: "React Developer", xp: 300, unlocked: true, completed: false,
        skills: ["React Hooks", "State Management", "Component Design"],
        description: "Build dynamic UIs",
      },
      {
        level: 4, title: "Advanced Patterns", xp: 400, unlocked: false, completed: false,
        skills: ["TypeScript", "Testing", "Performance"],
        description: "Production-grade code",
        requiredSkills: ["React Hooks", "State Management"],
      },
      {
        level: 5, title: "System Design", xp: 500, unlocked: false, completed: false,
        skills: ["Architecture", "APIs", "Scalability"],
        description: "Think like a senior dev",
        requiredSkills: ["TypeScript", "Testing"],
        milestone: true,
        milestoneReward: "Mock Interview Unlocked!",
      },
      {
        level: 6, title: "Leadership", xp: 600, unlocked: false, completed: false,
        skills: ["Code Review", "Mentoring", "Agile"],
        description: "Lead engineering teams",
        requiredSkills: ["System Design"],
        locked: true,
      },
    ],
    gapSkills: ["TypeScript", "Testing", "Performance Optimization", "System Design"],
    progressPercent: 42,
  }
}
