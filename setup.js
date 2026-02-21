const fs = require('fs')
const path = require('path')

const files = {}

files['app/layout.js'] = `import './globals.css'
export const metadata = { title: 'LevelUp', description: 'Gamified Career Growth' }
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}`

files['app/globals.css'] = `@tailwind base;
@tailwind components;
@tailwind utilities;
:root { --void: #050816; --neon: #00FF94; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background-color: #050816; color: #E2E8F0; font-family: Georgia, serif; }
body::after { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,148,0.015) 2px, rgba(0,255,148,0.015) 4px); pointer-events: none; z-index: 9999; }
.neon-text { color: #00FF94; text-shadow: 0 0 10px #00FF94; }
.neon-text-sm { color: #00FF94; text-shadow: 0 0 6px #00FF9488; }
.plasma-text { color: #A855F7; }
.plasma-light { color: #A855F7; }
.game-card { background: #0D1117; border: 1px solid #1C2333; transition: all 0.3s ease; }
.game-card:hover { border-color: #00FF9444; transform: translateY(-2px); }
.level-locked { filter: grayscale(0.8); opacity: 0.5; }
.progress-bar { background: linear-gradient(90deg, #00FF94, #00CC76); box-shadow: 0 0 10px #00FF9466; transition: width 1s ease; }
.xp-badge { background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; font-family: monospace; font-weight: bold; font-size: 11px; padding: 2px 8px; }
.bracket-box { position: relative; }
.bracket-box::before, .bracket-box::after { content: ''; position: absolute; width: 12px; height: 12px; border-color: #00FF94; border-style: solid; }
.bracket-box::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.bracket-box::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
.game-input { width: 100%; background: #050816; border: 1px solid #1C2333; color: #E2E8F0; padding: 12px 16px; font-family: monospace; font-size: 14px; transition: all 0.2s ease; outline: none; }
.game-input:focus { border-color: #00FF94; box-shadow: 0 0 0 2px #00FF9422; }
.game-input::placeholder { color: #8B9CC8; opacity: 0.6; }
.btn-neon { background: transparent; border: 1px solid #00FF94; color: #00FF94; font-family: monospace; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 28px; cursor: pointer; transition: all 0.3s ease; }
.btn-neon:hover { background: #00FF9411; box-shadow: 0 0 20px #00FF9444; }
.btn-neon-fill { background: #00FF94; color: #000; font-family: monospace; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 28px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; display: block; width: 100%; text-align: center; }
.btn-neon-fill:hover { background: #00CC76; box-shadow: 0 0 20px #00FF9466; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050816; }
::-webkit-scrollbar-thumb { background: #00FF9444; }
.unlock-anim { animation: levelUnlock 0.6s ease; }
@keyframes levelUnlock { 0% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 40px #00FF94; } 100% { transform: scale(1); } }
@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.anim-1 { animation: fadeSlideUp 0.4s ease 0.1s both; }
.anim-2 { animation: fadeSlideUp 0.4s ease 0.2s both; }
.anim-3 { animation: fadeSlideUp 0.4s ease 0.3s both; }
.anim-4 { animation: fadeSlideUp 0.4s ease 0.4s both; }`

files['app/page.js'] = `"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function HomePage() {
  const router = useRouter()
  const [typed, setTyped] = useState('')
  const fullText = 'LEVEL UP YOUR CAREER'
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++ }
      else clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])
  return (
    <main className="min-h-screen bg-void flex flex-col overflow-hidden" style={{background:'#050816'}}>
      <div className="fixed inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px)',backgroundSize:'40px 40px'}} />
      <nav className="relative z-10 flex items-center justify-between px-8 py-5" style={{borderBottom:'1px solid #1C2333'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center" style={{background:'#00FF94'}}>
            <span style={{color:'#050816',fontFamily:'monospace',fontWeight:'900',fontSize:'14px'}}>LU</span>
          </div>
          <span className="neon-text-sm" style={{fontFamily:'monospace',fontSize:'14px',letterSpacing:'0.2em',textTransform:'uppercase'}}>LevelUp</span>
        </div>
        <button onClick={() => router.push('/upload')} className="btn-neon" style={{padding:'8px 20px',fontSize:'12px'}}>Initialize →</button>
      </nav>
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="anim-1" style={{marginBottom:'2rem',border:'1px solid #00FF9444',padding:'8px 20px',display:'inline-flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'8px',height:'8px',background:'#00FF94',borderRadius:'50%',animation:'pulse 2s infinite'}} />
          <span style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.3em',textTransform:'uppercase'}}>System Online</span>
        </div>
        <h1 className="anim-2" style={{fontFamily:'monospace',fontSize:'clamp(36px,7vw,72px)',fontWeight:'900',marginBottom:'8px',lineHeight:'1.1'}}>
          <span className="neon-text">{typed}</span>
          <span className="neon-text" style={{animation:'pulse 1s infinite'}}>_</span>
        </h1>
        <p className="anim-3" style={{color:'#8B9CC8',maxWidth:'600px',lineHeight:'1.8',marginTop:'24px',fontSize:'18px'}}>
          Upload your resume. Get skill-tested. Unlock levels. Track your journey to your <span style={{color:'#F59E0B',fontWeight:'bold'}}>dream role</span>.
        </p>
        <div className="anim-4" style={{marginTop:'48px',display:'flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
          <button onClick={() => router.push('/upload')} className="btn-neon-fill" style={{width:'auto',padding:'16px 48px'}}>▶ Start Your Quest</button>
          <button onClick={() => router.push('/dashboard')} className="btn-neon" style={{padding:'16px 32px'}}>Demo Dashboard</button>
        </div>
        <div style={{marginTop:'80px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'48px'}}>
          {[['10+','Skill Levels'],['XP','Points System'],['AI','Powered Tests']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div className="neon-text" style={{fontFamily:'monospace',fontSize:'32px',fontWeight:'900'}}>{v}</div>
              <div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',letterSpacing:'0.2em',textTransform:'uppercase',marginTop:'4px'}}>{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{borderTop:'1px solid #1C2333',padding:'64px 32px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'24px'}}>
          {[['📄','Upload Resume','AI reads your skills and finds your gap to the dream role'],['🧪','Take Tests','Skill-specific quizzes unlock each level of your career tree'],['🏆','Earn XP','Pass tests and upload proof to earn points and badges'],['🎯','Mock Interviews','Hit Level 5 to unlock AI mock interviews']].map(([icon,title,desc]) => (
            <div key={title} className="game-card bracket-box" style={{padding:'24px'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{icon}</div>
              <div className="neon-text-sm" style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:'8px'}}>{title}</div>
              <p style={{color:'#8B9CC8',fontSize:'14px',lineHeight:'1.6'}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <footer style={{borderTop:'1px solid #1C2333',padding:'24px',textAlign:'center'}}>
        <span style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',letterSpacing:'0.2em'}}>LEVELUP © 2024 — GAMIFIED CAREER GROWTH</span>
      </footer>
    </main>
  )
}`

files['app/upload/page.js'] = `"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
function getDemoData() {
  return {name:"Alex Chen",dreamRole:"Senior Frontend Engineer",currentLevel:3,totalXP:850,maxXP:2000,badges:["🌱 Seedling","⚡ Spark"],currentSkills:["HTML","CSS","JavaScript","React"],gapSkills:["TypeScript","Testing","System Design"],skillTree:[
    {level:1,title:"Foundation",xp:100,unlocked:true,completed:true,skills:["HTML5","CSS3"],description:"Core web fundamentals",requiredSkills:[]},
    {level:2,title:"JavaScript Core",xp:200,unlocked:true,completed:true,skills:["ES6+","Async/Await"],description:"Modern JavaScript",requiredSkills:["HTML5"]},
    {level:3,title:"React Developer",xp:300,unlocked:true,completed:false,skills:["React Hooks","State Mgmt"],description:"Build dynamic UIs",requiredSkills:["ES6+"]},
    {level:4,title:"Advanced Patterns",xp:400,unlocked:false,completed:false,skills:["TypeScript","Testing"],description:"Production-grade code",requiredSkills:["React Hooks"]},
    {level:5,title:"System Design",xp:500,unlocked:false,completed:false,skills:["Architecture","Scalability"],description:"Think like a senior dev",requiredSkills:["TypeScript"],milestone:true,milestoneReward:"🎤 Mock Interview Unlocked!"},
    {level:6,title:"Leadership",xp:600,unlocked:false,completed:false,skills:["Code Review","Mentoring"],description:"Lead teams",requiredSkills:["System Design"]},
  ]}
}
export default function UploadPage() {
  const router = useRouter()
  const [dreamRole,setDreamRole] = useState('')
  const [resumeText,setResumeText] = useState('')
  const [isAnalyzing,setIsAnalyzing] = useState(false)
  const [error,setError] = useState('')
  const [fileName,setFileName] = useState('')
  async function handleFile(file) { if(!file) return; setFileName(file.name); const text = await file.text(); setResumeText(text) }
  async function handleAnalyze() {
    if(!dreamRole.trim()){setError('Please enter your dream role.');return}
    if(!resumeText.trim()){setError('Please upload or paste your resume.');return}
    setError('');setIsAnalyzing(true)
    try {
      const res = await fetch('/api/analyze-resume',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dreamRole,resumeText})})
      const data = await res.json()
      if(!res.ok) throw new Error(data.error)
      sessionStorage.setItem('playerData',JSON.stringify(data.playerData))
      router.push('/dashboard')
    } catch(err){setError(err.message||'Failed.')} finally{setIsAnalyzing(false)}
  }
  const S = {bg:{background:'#050816',minHeight:'100vh'},card:{background:'#0D1117',border:'1px solid #1C2333',padding:'24px',marginBottom:'16px'},label:{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.3em',textTransform:'uppercase',display:'block',marginBottom:'12px'},input:{width:'100%',background:'#050816',border:'1px solid #1C2333',color:'#E2E8F0',padding:'12px 16px',fontFamily:'monospace',fontSize:'14px',outline:'none',marginBottom:'8px'},hint:{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',marginTop:'4px'},nav:{borderBottom:'1px solid #1C2333',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'},logo:{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}}
  return (
    <main style={S.bg}>
      <nav style={S.nav}>
        <div style={S.logo} onClick={()=>router.push('/')}>
          <div style={{width:'32px',height:'32px',background:'#00FF94',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#050816',fontFamily:'monospace',fontWeight:'900',fontSize:'14px'}}>LU</span>
          </div>
          <span style={{fontFamily:'monospace',color:'#00FF94',textShadow:'0 0 6px #00FF9488',letterSpacing:'0.2em',textTransform:'uppercase'}}>LevelUp</span>
        </div>
        <span style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',letterSpacing:'0.2em'}}>MISSION BRIEFING</span>
      </nav>
      <div style={{maxWidth:'640px',margin:'0 auto',padding:'64px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.4em',textTransform:'uppercase',marginBottom:'16px'}}>{'//'} STEP 01</div>
          <h1 style={{fontFamily:'monospace',fontSize:'36px',fontWeight:'900',color:'#fff',marginBottom:'12px'}}>Initialize Quest</h1>
          <p style={{color:'#8B9CC8'}}>Tell us where you want to go. We'll map the path.</p>
        </div>
        <div style={S.card}>
          <label style={S.label}>&gt; Target Role</label>
          <input style={S.input} value={dreamRole} onChange={e=>setDreamRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer, Product Manager..." />
          <p style={S.hint}>Your destination. We'll analyze the gap from where you are.</p>
        </div>
        <div style={S.card}>
          <label style={S.label}>&gt; Upload Resume</label>
          <div onClick={()=>document.getElementById('fi').click()} style={{border:'2px dashed #1C2333',padding:'32px',textAlign:'center',cursor:'pointer',marginBottom:'16px'}}>
            <div style={{fontSize:'32px',marginBottom:'8px'}}>📄</div>
            <p style={{fontFamily:'monospace',fontSize:'13px',color:fileName?'#00FF94':'#8B9CC8'}}>{fileName?'✓ '+fileName:'Drop file or click to browse'}</p>
            <input id="fi" type="file" accept=".txt,.pdf,.doc" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])} />
          </div>
          <div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',textAlign:'center',marginBottom:'12px'}}>— OR PASTE RESUME TEXT —</div>
          <textarea style={{...S.input,resize:'none'}} value={resumeText} onChange={e=>setResumeText(e.target.value)} placeholder="Paste your resume content here..." rows={5} />
        </div>
        {error && <div style={{border:'1px solid #EF444466',background:'#EF44440D',padding:'12px',fontFamily:'monospace',fontSize:'12px',color:'#f87171',marginBottom:'16px'}}>⚠ {error}</div>}
        <button onClick={handleAnalyze} disabled={isAnalyzing} style={{width:'100%',background:isAnalyzing?'#00CC76':'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'16px',cursor:'pointer',fontWeight:'bold',border:'none',marginBottom:'12px'}}>
          {isAnalyzing?'ANALYZING...':'▶ ANALYZE & START QUEST'}
        </button>
        <div style={{textAlign:'center'}}>
          <button onClick={()=>{sessionStorage.setItem('playerData',JSON.stringify(getDemoData()));router.push('/dashboard')}} style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',background:'none',border:'none',cursor:'pointer',textDecoration:'underline',letterSpacing:'0.1em'}}>
            Skip → Load Demo Data
          </button>
        </div>
      </div>
    </main>
  )
}`

files['app/dashboard/page.js'] = `"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
function getDemoData(){return{name:"Alex Chen",dreamRole:"Senior Frontend Engineer",currentLevel:3,totalXP:850,maxXP:2000,badges:["🌱 Seedling","⚡ Spark","Quick Learner"],currentSkills:["HTML","CSS","JavaScript","React"],gapSkills:["TypeScript","Testing","Performance","System Design"],skillTree:[{level:1,title:"Foundation",xp:100,unlocked:true,completed:true,skills:["HTML5","CSS3"],description:"Core web fundamentals",requiredSkills:[]},{level:2,title:"JavaScript Core",xp:200,unlocked:true,completed:true,skills:["ES6+","Async/Await"],description:"Modern JavaScript",requiredSkills:["HTML5"]},{level:3,title:"React Developer",xp:300,unlocked:true,completed:false,skills:["React Hooks","State Mgmt"],description:"Build dynamic UIs",requiredSkills:["ES6+"]},{level:4,title:"Advanced Patterns",xp:400,unlocked:false,completed:false,skills:["TypeScript","Testing"],description:"Production-grade code",requiredSkills:["React Hooks"]},{level:5,title:"System Design",xp:500,unlocked:false,completed:false,skills:["Architecture","Scalability"],description:"Think like a senior dev",requiredSkills:["TypeScript"],milestone:true,milestoneReward:"🎤 Mock Interview Unlocked!"},{level:6,title:"Leadership",xp:600,unlocked:false,completed:false,skills:["Code Review","Mentoring"],description:"Lead teams",requiredSkills:["System Design"]}]}}
export default function DashboardPage(){
  const router=useRouter()
  const [player,setPlayer]=useState(null)
  const [tab,setTab]=useState('tree')
  useEffect(()=>{const s=sessionStorage.getItem('playerData');setPlayer(s?JSON.parse(s):getDemoData())},[])
  if(!player) return <div style={{background:'#050816',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{fontFamily:'monospace',color:'#00FF94'}}>LOADING...</p></div>
  const pct=Math.round((player.totalXP/player.maxXP)*100)
  const done=player.skillTree.filter(l=>l.completed).length
  const current=player.skillTree.find(l=>l.unlocked&&!l.completed)
  function startQuest(level){if(!level.unlocked)return;sessionStorage.setItem('activeLevel',JSON.stringify(level));router.push('/quest')}
  const S={bg:{background:'#050816',minHeight:'100vh'},nav:{borderBottom:'1px solid #1C2333',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:'#050816',zIndex:10},card:{background:'#0D1117',border:'1px solid #1C2333',padding:'24px',marginBottom:'16px'}}
  return(
    <main style={S.bg}>
      <nav style={S.nav}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>router.push('/')}>
          <div style={{width:'32px',height:'32px',background:'#00FF94',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#050816',fontFamily:'monospace',fontWeight:'900',fontSize:'14px'}}>LU</span></div>
          <span style={{fontFamily:'monospace',color:'#00FF94',textShadow:'0 0 6px #00FF9488',letterSpacing:'0.2em',textTransform:'uppercase'}}>LevelUp</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',fontFamily:'monospace',fontWeight:'bold',fontSize:'11px',padding:'2px 8px'}}>{player.totalXP} XP</span>
          <span style={{fontFamily:'monospace',fontSize:'12px',color:'#8B9CC8'}}>LVL {player.currentLevel}</span>
          <button onClick={()=>router.push('/upload')} style={{border:'1px solid #00FF94',color:'#00FF94',background:'transparent',fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'8px 16px',cursor:'pointer'}}>New Quest</button>
        </div>
      </nav>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 24px'}}>
        <div style={{...S.card,marginBottom:'24px',position:'relative'}}>
          <div style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:'8px'}}>{'//'} ACTIVE QUEST</div>
          <h1 style={{fontFamily:'monospace',fontSize:'24px',fontWeight:'900',color:'#fff',marginBottom:'8px'}}>{player.dreamRole}</h1>
          <div style={{display:'flex',gap:'16px',marginBottom:'24px'}}>
            <span style={{fontFamily:'monospace',fontSize:'12px',color:'#8B9CC8'}}>Level {player.currentLevel} Player</span>
            <span style={{color:'#1C2333'}}>|</span>
            <span style={{fontFamily:'monospace',fontSize:'12px',color:'#F59E0B'}}>{done} / {player.skillTree.length} Levels</span>
          </div>
          <div style={{marginBottom:'8px',display:'flex',justifyContent:'space-between'}}>
            <span style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8'}}>PROGRESS TO DREAM ROLE</span>
            <span style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94'}}>{pct}%</span>
          </div>
          <div style={{height:'12px',background:'#0D1117',border:'1px solid #1C2333',overflow:'hidden',marginBottom:'4px'}}>
            <div style={{height:'100%',width:pct+'%',background:'linear-gradient(90deg,#00FF94,#00CC76)',boxShadow:'0 0 10px #00FF9466',transition:'width 1s'}} />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8'}}>
            <span>{player.totalXP} XP</span><span>{player.maxXP} XP</span>
          </div>
          {player.badges.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'16px',paddingTop:'16px',borderTop:'1px solid #1C2333'}}>
            {player.badges.map(b=><span key={b} style={{fontFamily:'monospace',fontSize:'11px',border:'1px solid #A855F766',color:'#A855F7',padding:'4px 12px'}}>{b}</span>)}
          </div>}
        </div>
        <div style={{display:'flex',gap:'4px',marginBottom:'24px',borderBottom:'1px solid #1C2333'}}>
          {[['tree','⚡ Skill Tree'],['gaps','🎯 Skill Gaps'],['stats','📊 Stats']].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'12px 24px',background:'transparent',border:'none',borderBottom:tab===id?'2px solid #00FF94':'2px solid transparent',color:tab===id?'#00FF94':'#8B9CC8',cursor:'pointer'}}>{label}</button>
          ))}
        </div>
        {tab==='tree'&&<div>{player.skillTree.map(level=>{
          const locked=!level.unlocked;const isCur=current?.level===level.level
          return(
            <div key={level.level} style={{background:'#0D1117',border:'1px solid '+(level.completed?'#00FF9444':isCur?'#00FF9466':level.milestone?'#F59E0B44':'#1C2333'),marginBottom:'12px',opacity:locked?0.5:1,filter:locked?'grayscale(0.6)':'none'}}>
              {level.milestone&&<div style={{background:'#F59E0B11',borderBottom:'1px solid #F59E0B44',padding:'8px 24px',fontFamily:'monospace',fontSize:'11px',color:'#F59E0B',letterSpacing:'0.2em'}}>⭐ MILESTONE: {level.milestoneReward}</div>}
              <div style={{padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                  <div style={{width:'48px',height:'48px',border:'2px solid '+(level.completed?'#00FF94':isCur?'#00FF94':'#1C2333'),display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace',fontSize:'18px',fontWeight:'900',color:level.completed?'#00FF94':isCur?'#00FF94':'#8B9CC8',flexShrink:0}}>
                    {level.completed?'✓':locked?'🔒':level.level}
                  </div>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'4px'}}>
                      <span style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',letterSpacing:'0.2em',textTransform:'uppercase'}}>LEVEL {level.level}</span>
                      <span style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',fontFamily:'monospace',fontWeight:'bold',fontSize:'10px',padding:'1px 6px'}}>+{level.xp} XP</span>
                      {level.completed&&<span style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94'}}>COMPLETED</span>}
                      {isCur&&!level.completed&&<span style={{fontFamily:'monospace',fontSize:'11px',color:'#F59E0B'}}>▶ ACTIVE</span>}
                    </div>
                    <div style={{fontFamily:'monospace',fontSize:'16px',fontWeight:'bold',color:locked?'#8B9CC8':'#fff',marginBottom:'8px'}}>{level.title}</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                      {level.skills.map(s=><span key={s} style={{fontFamily:'monospace',fontSize:'11px',padding:'2px 8px',border:'1px solid '+(locked?'#1C2333':'#00FF9444'),color:locked?'#8B9CC8':'#00FF94'}}>{s}</span>)}
                    </div>
                    {locked&&level.requiredSkills?.length>0&&<p style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',marginTop:'6px'}}>🔒 Requires: {level.requiredSkills.join(', ')}</p>}
                  </div>
                </div>
                {!locked&&(level.completed
                  ?<span style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',border:'1px solid #00FF9444',padding:'8px 20px'}}>✓ PASSED</span>
                  :<button onClick={()=>startQuest(level)} style={{background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'10px 24px',cursor:'pointer',fontWeight:'bold',border:'none'}}>Take Test →</button>
                )}
              </div>
            </div>
          )
        })}</div>}
        {tab==='gaps'&&<div>
          <div style={{...S.card,marginBottom:'12px'}}>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:'12px'}}>{'//'} Skills You Have</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>{player.currentSkills.map(s=><span key={s} style={{fontFamily:'monospace',fontSize:'12px',border:'1px solid #00FF9444',color:'#00FF94',padding:'4px 12px'}}>✓ {s}</span>)}</div>
          </div>
          <div style={{...S.card,marginBottom:'12px'}}>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#F59E0B',letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:'12px'}}>{'//'} Skills You Need</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>{player.gapSkills.map(s=><span key={s} style={{fontFamily:'monospace',fontSize:'12px',border:'1px solid #F59E0B44',color:'#F59E0B',padding:'4px 12px'}}>⬡ {s}</span>)}</div>
          </div>
          {current&&<div style={S.card}>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:'12px'}}>{'//'} Next Action</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div><p style={{color:'#fff',fontFamily:'monospace',fontSize:'14px'}}>Take the <span style={{color:'#00FF94'}}>{current.skills[0]}</span> test</p><p style={{fontFamily:'monospace',fontSize:'12px',color:'#8B9CC8',marginTop:'4px'}}>Unlock Level {current.level}: {current.title}</p></div>
              <button onClick={()=>startQuest(current)} style={{background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'10px 24px',cursor:'pointer',fontWeight:'bold',border:'none'}}>Start →</button>
            </div>
          </div>}
        </div>}
        {tab==='stats'&&<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px'}}>
          {[[player.totalXP,'XP Earned','#00FF94'],[done+' / '+player.skillTree.length,'Levels Done','#A855F7'],[player.badges.length,'Badges','#F59E0B'],[player.currentSkills.length,'Skills Had','#00FF94'],[player.gapSkills.length,'To Learn','#EF4444'],[pct+'%','Progress','#F59E0B']].map(([v,l,c])=>(
            <div key={l} style={{background:'#0D1117',border:'1px solid #1C2333',padding:'24px',textAlign:'center'}}>
              <div style={{fontFamily:'monospace',fontSize:'32px',fontWeight:'900',color:c}}>{v}</div>
              <div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',marginTop:'8px',letterSpacing:'0.2em',textTransform:'uppercase'}}>{l}</div>
            </div>
          ))}
        </div>}
      </div>
    </main>
  )
}`

files['app/quest/page.js'] = `"use client";
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
const QUIZ_BANK = {
  'HTML5':[{q:'What do semantic elements like article and section improve?',options:['Page speed','Accessibility & SEO','JS performance','Database queries'],answer:1},{q:'Which attribute makes an input required in HTML5?',options:['mandatory','required','validate','must'],answer:1},{q:'What is the canvas element for?',options:['Display images','Draw graphics via JS','Embed videos','Create forms'],answer:1}],
  'CSS3':[{q:'Which property creates a flexible layout?',options:['display: block','display: flex','display: inline','display: grid'],answer:1},{q:'What does z-index control?',options:['Zoom level','Stacking order','Font size','Border width'],answer:1},{q:'Which unit is relative to viewport width?',options:['px','em','vw','rem'],answer:2}],
  'JavaScript':[{q:'What is a closure?',options:['Close the browser','Function retaining outer scope','A type of loop','HTML element'],answer:1},{q:'What does async/await do?',options:['Speeds up code','Handles async operations','Blocks main thread','Creates threads'],answer:1},{q:'Which method adds to end of array?',options:['push()','pop()','shift()','unshift()'],answer:0}],
  'React':[{q:'Which hook manages state in functional components?',options:['useEffect','useState','useContext','useRef'],answer:1},{q:'What is the Virtual DOM?',options:['Browser API','Lightweight copy of real DOM','A database','CSS framework'],answer:1},{q:'What does useEffect do?',options:['Manages state','Handles side effects','Creates components','Styles elements'],answer:1}],
  'default':[{q:'What does DRY stand for?',options:["Don't Repeat Yourself",'Dynamic Runtime Yielding','Data Retrieval Yield','Default React Yield'],answer:0},{q:'What is version control for?',options:['DB management','Tracking code changes','Styling websites','Managing servers'],answer:1},{q:'What makes code clean?',options:['Speed','Readability & maintainability','Latest frameworks','Fewer lines'],answer:1}]
}
function getQuiz(skill){for(const [k,v] of Object.entries(QUIZ_BANK)){if(skill.toLowerCase().includes(k.toLowerCase()))return v}return QUIZ_BANK['default']}
export default function QuestPage(){
  const router=useRouter()
  const [phase,setPhase]=useState('loading')
  const [level,setLevel]=useState(null)
  const [questions,setQuestions]=useState([])
  const [currentQ,setCurrentQ]=useState(0)
  const [answers,setAnswers]=useState([])
  const [selected,setSelected]=useState(null)
  const [timeLeft,setTimeLeft]=useState(120)
  const [result,setResult]=useState(null)
  const [feedback,setFeedback]=useState(false)
  useEffect(()=>{const s=sessionStorage.getItem('activeLevel');if(!s){router.push('/dashboard');return}const l=JSON.parse(s);setLevel(l);setQuestions(getQuiz(l.skills[0]));setPhase('briefing')},[router])
  const submitQuiz=useCallback(async(ans)=>{
    setPhase('loading')
    let correct=0;questions.forEach((q,i)=>{if(ans[i]===q.answer)correct++})
    const total=questions.length;const passed=correct>=Math.ceil(total*0.67);const score=Math.round((correct/total)*100)
    const xpEarned=passed?level.xp:Math.round(level.xp*0.2)
    if(passed){const s=sessionStorage.getItem('playerData');if(s){const p=JSON.parse(s);p.totalXP=(p.totalXP||0)+xpEarned;p.currentLevel=Math.max(p.currentLevel||1,level.level);p.skillTree=p.skillTree.map(l=>{if(l.level===level.level)return{...l,completed:true};if(l.level===level.level+1)return{...l,unlocked:true};return l});sessionStorage.setItem('playerData',JSON.stringify(p))}}
    setResult({passed,correct,total,score,xpEarned,badge:passed?['🌱 Seedling','⚡ Spark','🔥 Ignited','💎 Diamond','🏆 Champion'][Math.min(level.level-1,4)]:null,message:passed?'Level '+level.level+' Unlocked! You scored '+score+'%':score+'% — Need 67% to pass. Try again!'})
    setPhase('result')
  },[questions,level])
  useEffect(()=>{if(phase!=='quiz')return;if(timeLeft<=0){submitQuiz([...answers]);return}const t=setTimeout(()=>setTimeLeft(t=>t-1),1000);return()=>clearTimeout(t)},[phase,timeLeft,submitQuiz,answers])
  function selectAnswer(i){
    if(feedback)return;setSelected(i);setFeedback(true)
    setTimeout(()=>{
      const na=[...answers,i];setAnswers(na);setFeedback(false);setSelected(null)
      if(currentQ+1<questions.length)setCurrentQ(currentQ+1)
      else submitQuiz(na)
    },900)
  }
  const S={bg:{background:'#050816',minHeight:'100vh',display:'flex',flexDirection:'column'},nav:{borderBottom:'1px solid #1C2333',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'},timer:{fontFamily:'monospace',fontSize:'22px',fontWeight:'900',color:timeLeft>60?'#00FF94':timeLeft>30?'#F59E0B':'#EF4444'}}
  if(phase==='loading')return<div style={{...S.bg,alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{width:'40px',height:'40px',border:'3px solid #00FF94',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}} /><p style={{fontFamily:'monospace',color:'#00FF94',fontSize:'13px',letterSpacing:'0.3em'}}>GENERATING QUEST...</p><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style></div></div>
  return(
    <main style={S.bg}>
      <nav style={S.nav}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>router.push('/dashboard')}>
          <div style={{width:'32px',height:'32px',background:'#00FF94',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#050816',fontFamily:'monospace',fontWeight:'900',fontSize:'14px'}}>LU</span></div>
          <span style={{fontFamily:'monospace',color:'#00FF94',fontSize:'13px'}}>← Dashboard</span>
        </div>
        {phase==='quiz'&&<div style={S.timer}>{String(Math.floor(timeLeft/60)).padStart(2,'0')}:{String(timeLeft%60).padStart(2,'0')}</div>}
      </nav>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 24px'}}>
        <div style={{width:'100%',maxWidth:'600px'}}>
          {phase==='briefing'&&level&&(
            <div style={{background:'#0D1117',border:'1px solid #1C2333',padding:'40px'}}>
              <div style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.4em',textTransform:'uppercase',marginBottom:'24px'}}>{'//'} MISSION BRIEFING</div>
              <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'24px'}}>
                <div style={{width:'64px',height:'64px',border:'2px solid #00FF94',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace',fontSize:'24px',fontWeight:'900',color:'#00FF94',flexShrink:0}}>{level.level}</div>
                <div><h1 style={{fontFamily:'monospace',fontSize:'24px',fontWeight:'900',color:'#fff'}}>{level.title}</h1><p style={{fontFamily:'monospace',fontSize:'12px',color:'#8B9CC8',marginTop:'4px'}}>{level.description}</p></div>
              </div>
              {[['Skills Tested',level.skills.join(', ')],['Questions','3'],['Time Limit','2 Minutes'],['Pass Mark','2/3 Correct'],['XP Reward','+'+level.xp+' XP']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #1C2333',padding:'12px 0',fontFamily:'monospace'}}>
                  <span style={{fontSize:'11px',color:'#8B9CC8',textTransform:'uppercase',letterSpacing:'0.1em'}}>{k}</span>
                  <span style={{fontSize:'12px',color:'#fff'}}>{v}</span>
                </div>
              ))}
              <button onClick={()=>setPhase('quiz')} style={{width:'100%',background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'16px',cursor:'pointer',fontWeight:'bold',border:'none',marginTop:'24px'}}>▶ BEGIN QUEST</button>
            </div>
          )}
          {phase==='quiz'&&questions.length>0&&(
            <div>
              <div style={{height:'4px',background:'#0D1117',border:'1px solid #1C2333',overflow:'hidden',marginBottom:'24px'}}>
                <div style={{height:'100%',width:(timeLeft/120*100)+'%',background:timeLeft>60?'#00FF94':timeLeft>30?'#F59E0B':'#EF4444',transition:'width 1s'}} />
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',fontFamily:'monospace',fontSize:'12px'}}>
                <span style={{color:'#8B9CC8'}}>QUESTION {currentQ+1} / {questions.length}</span>
                <span style={{color:'#00FF94'}}>{level.skills[0].toUpperCase()} TEST</span>
              </div>
              <div style={{background:'#0D1117',border:'1px solid #1C2333',padding:'24px',marginBottom:'24px'}}>
                <p style={{fontSize:'18px',color:'#fff',lineHeight:'1.6'}}>{questions[currentQ].q}</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {questions[currentQ].options.map((opt,i)=>{
                  let bc='#1C2333';let tc='#8B9CC8'
                  if(feedback){if(i===questions[currentQ].answer){bc='#00FF9444';tc='#00FF94'}else if(i===selected){bc='#EF444433';tc='#f87171'}else{tc='#4B5563'}}
                  else if(selected===i){bc='#00FF9444';tc='#00FF94'}
                  return(
                    <button key={i} onClick={()=>selectAnswer(i)} style={{textAlign:'left',border:'1px solid '+bc,padding:'14px 16px',fontFamily:'monospace',fontSize:'14px',color:tc,background:feedback&&i===questions[currentQ].answer?'#00FF9411':feedback&&i===selected?'#EF44440D':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px',transition:'all 0.2s'}}>
                      <span style={{width:'24px',height:'24px',border:'1px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',flexShrink:0}}>{String.fromCharCode(65+i)}</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          {phase==='result'&&result&&(
            <div style={{background:'#0D1117',border:'1px solid '+(result.passed?'#00FF9466':'#EF444466'),padding:'40px',textAlign:'center'}}>
              <div style={{fontSize:'64px',marginBottom:'24px'}}>{result.passed?'🏆':'💀'}</div>
              <div style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.4em',textTransform:'uppercase',color:result.passed?'#00FF94':'#EF4444',marginBottom:'12px'}}>{result.passed?'// LEVEL UNLOCKED':'// QUEST FAILED'}</div>
              <h2 style={{fontFamily:'monospace',fontSize:'32px',fontWeight:'900',color:'#fff',marginBottom:'8px'}}>{result.score}%</h2>
              <p style={{fontFamily:'monospace',fontSize:'13px',color:'#8B9CC8',marginBottom:'24px'}}>{result.correct} / {result.total} correct</p>
              <div style={{border:'1px solid '+(result.passed?'#00FF9444':'#1C2333'),padding:'16px',marginBottom:'24px',background:result.passed?'#00FF9411':'transparent'}}>
                <span style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',fontFamily:'monospace',fontWeight:'bold',fontSize:'12px',padding:'3px 10px'}}>+{result.xpEarned} XP</span>
                {result.badge&&<p style={{fontFamily:'monospace',fontSize:'13px',color:'#A855F7',marginTop:'10px'}}>Badge: {result.badge}</p>}
              </div>
              <p style={{fontFamily:'monospace',fontSize:'13px',color:result.passed?'#00FF94':'#EF4444',marginBottom:'32px'}}>{result.message}</p>
              <div style={{display:'flex',gap:'12px'}}>
                {!result.passed&&<button onClick={()=>{setPhase('briefing');setCurrentQ(0);setAnswers([]);setSelected(null);setTimeLeft(120)}} style={{flex:1,border:'1px solid #00FF94',color:'#00FF94',background:'transparent',fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'14px',cursor:'pointer'}}>↺ Retry</button>}
                <button onClick={()=>router.push('/dashboard')} style={{flex:1,background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'14px',cursor:'pointer',fontWeight:'bold',border:'none'}}>{result.passed?'→ Continue':'← Dashboard'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}`

files['app/interview/page.js'] = `"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const QS=[{q:"Tell me about yourself and why you're interested in this role.",type:'behavioral'},{q:"Describe a challenging technical problem you solved.",type:'technical'},{q:"How do you handle disagreements with teammates?",type:'behavioral'},{q:"What's your process for optimizing application performance?",type:'technical'},{q:"Where do you see yourself in 5 years?",type:'behavioral'}]
const FB=["Strong answer! Consider adding specific metrics next time.","Good technical depth. Try the STAR method to structure better.","Excellent communication skills. Your example was well-explained.","Solid answer. A quantifiable outcome would make this stronger.","Great self-awareness! Tie goals to the company mission for impact."]
export default function InterviewPage(){
  const router=useRouter()
  const [phase,setPhase]=useState('intro')
  const [qi,setQi]=useState(0)
  const [answer,setAnswer]=useState('')
  const [feedback,setFeedback]=useState('')
  const [thinking,setThinking]=useState(false)
  const [scores,setScores]=useState([])
  async function submit(){
    if(!answer.trim())return;setThinking(true)
    await new Promise(r=>setTimeout(r,2000))
    const sc=Math.floor(Math.random()*20)+75
    setScores(s=>[...s,sc]);setFeedback(FB[qi]);setThinking(false);setPhase('feedback')
  }
  function next(){if(qi+1>=QS.length)setPhase('complete');else{setQi(qi+1);setAnswer('');setFeedback('');setPhase('question')}}
  const avg=scores.length>0?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0
  const S={bg:{background:'#050816',minHeight:'100vh',display:'flex',flexDirection:'column'},nav:{borderBottom:'1px solid #1C2333',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'},card:{background:'#0D1117',border:'1px solid #A855F744',padding:'32px',maxWidth:'640px',width:'100%'}}
  return(
    <main style={S.bg}>
      <nav style={S.nav}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onClick={()=>router.push('/dashboard')}>
          <div style={{width:'32px',height:'32px',background:'#00FF94',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#050816',fontFamily:'monospace',fontWeight:'900',fontSize:'14px'}}>LU</span></div>
          <span style={{fontFamily:'monospace',color:'#00FF94',fontSize:'13px'}}>← Dashboard</span>
        </div>
        <span style={{fontFamily:'monospace',fontSize:'12px',color:'#A855F7',letterSpacing:'0.2em'}}>🎤 MOCK INTERVIEW</span>
      </nav>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 24px'}}>
        {phase==='intro'&&(
          <div style={S.card}>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#A855F7',letterSpacing:'0.4em',marginBottom:'24px'}}>// MILESTONE UNLOCKED</div>
            <div style={{fontSize:'56px',textAlign:'center',marginBottom:'16px'}}>🎤</div>
            <h1 style={{fontFamily:'monospace',fontSize:'28px',fontWeight:'900',color:'#fff',textAlign:'center',marginBottom:'12px'}}>Mock Interview</h1>
            <p style={{color:'#8B9CC8',textAlign:'center',lineHeight:'1.7',marginBottom:'32px'}}>You've reached Level 5! Practice real interview questions and get instant AI feedback.</p>
            {[['Questions',QS.length+' questions'],['Types','Behavioral + Technical'],['Feedback','AI instant feedback'],['Reward','+500 XP + Badge']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #1C2333',padding:'10px 0',fontFamily:'monospace'}}>
                <span style={{fontSize:'11px',color:'#8B9CC8',textTransform:'uppercase'}}>{k}</span>
                <span style={{fontSize:'12px',color:'#fff'}}>{v}</span>
              </div>
            ))}
            <button onClick={()=>setPhase('question')} style={{width:'100%',background:'#A855F7',color:'#fff',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'16px',cursor:'pointer',fontWeight:'bold',border:'none',marginTop:'24px'}}>▶ START INTERVIEW</button>
          </div>
        )}
        {phase==='question'&&(
          <div style={{...S.card,border:'1px solid #1C2333'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px',fontFamily:'monospace',fontSize:'12px'}}>
              <span style={{color:'#8B9CC8'}}>Q {qi+1} / {QS.length}</span>
              <span style={{border:'1px solid '+(QS[qi].type==='behavioral'?'#A855F766':'#00FF9444'),color:QS[qi].type==='behavioral'?'#A855F7':'#00FF94',padding:'2px 12px',fontSize:'11px',letterSpacing:'0.15em'}}>{QS[qi].type.toUpperCase()}</span>
            </div>
            <div style={{display:'flex',gap:'16px',background:'#050816',border:'1px solid #1C2333',padding:'20px',marginBottom:'20px'}}>
              <div style={{width:'40px',height:'40px',background:'#A855F722',border:'1px solid #A855F744',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>🤖</div>
              <p style={{fontSize:'18px',color:'#fff',lineHeight:'1.6'}}>{QS[qi].q}</p>
            </div>
            <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here..." rows={6} style={{width:'100%',background:'#050816',border:'1px solid #1C2333',color:'#E2E8F0',padding:'12px 16px',fontFamily:'Georgia, serif',fontSize:'15px',outline:'none',resize:'none',marginBottom:'16px'}} />
            <button onClick={submit} disabled={!answer.trim()||thinking} style={{width:'100%',background:!answer.trim()||thinking?'#1C2333':'#00FF94',color:!answer.trim()||thinking?'#8B9CC8':'#000',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'14px',cursor:'pointer',fontWeight:'bold',border:'none'}}>
              {thinking?'AI IS EVALUATING...':'Submit Answer →'}
            </button>
          </div>
        )}
        {phase==='feedback'&&(
          <div style={{...S.card,border:'1px solid #1C2333'}}>
            <div style={{display:'flex',gap:'16px',background:'#A855F711',border:'1px solid #A855F733',padding:'20px',marginBottom:'20px'}}>
              <div style={{width:'40px',height:'40px',background:'#A855F722',border:'1px solid #A855F744',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>🤖</div>
              <div><div style={{fontFamily:'monospace',fontSize:'11px',color:'#A855F7',letterSpacing:'0.2em',marginBottom:'8px'}}>AI FEEDBACK</div><p style={{color:'#fff',lineHeight:'1.7'}}>{feedback}</p></div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #1C2333',padding:'12px 16px',marginBottom:'20px'}}>
              <span style={{fontFamily:'monospace',fontSize:'12px',color:'#8B9CC8'}}>Answer Score</span>
              <span style={{fontFamily:'monospace',fontSize:'20px',fontWeight:'900',color:'#00FF94'}}>{scores[scores.length-1]}%</span>
            </div>
            <button onClick={next} style={{width:'100%',background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'14px',cursor:'pointer',fontWeight:'bold',border:'none'}}>
              {qi+1>=QS.length?'→ See Results':'→ Next Question'}
            </button>
          </div>
        )}
        {phase==='complete'&&(
          <div style={{...S.card,border:'1px solid #00FF9444',textAlign:'center'}}>
            <div style={{fontSize:'64px',marginBottom:'24px'}}>🏆</div>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#00FF94',letterSpacing:'0.4em',marginBottom:'12px'}}>// INTERVIEW COMPLETE</div>
            <h2 style={{fontFamily:'monospace',fontSize:'28px',fontWeight:'900',color:'#fff',marginBottom:'8px'}}>Great Job!</h2>
            <p style={{fontFamily:'monospace',color:'#8B9CC8',marginBottom:'32px'}}>You completed the mock interview</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
              <div style={{border:'1px solid #1C2333',padding:'20px'}}><div style={{fontFamily:'monospace',fontSize:'28px',fontWeight:'900',color:'#00FF94'}}>{avg}%</div><div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',marginTop:'4px'}}>Avg Score</div></div>
              <div style={{border:'1px solid #1C2333',padding:'20px'}}><div style={{fontFamily:'monospace',fontSize:'28px',fontWeight:'900',color:'#F59E0B'}}>+500</div><div style={{fontFamily:'monospace',fontSize:'11px',color:'#8B9CC8',marginTop:'4px'}}>XP Earned</div></div>
            </div>
            <div style={{border:'1px solid #A855F744',padding:'16px',background:'#A855F711',marginBottom:'24px'}}>
              <p style={{fontFamily:'monospace',fontSize:'13px',color:'#A855F7'}}>🎤 Interview Champion Badge Earned!</p>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{width:'100%',background:'#00FF94',color:'#000',fontFamily:'monospace',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',padding:'14px',cursor:'pointer',fontWeight:'bold',border:'none'}}>→ Back to Dashboard</button>
          </div>
        )}
      </div>
    </main>
  )
}`

files['app/api/analyze-resume/route.js'] = `import { NextResponse } from 'next/server'
const ROLES={'frontend':['HTML5','CSS3','JavaScript','React','TypeScript','Testing','Performance','System Design','Leadership','Architecture'],'backend':['Node.js','Databases','REST APIs','Auth','Caching','Microservices','Docker','System Design','Leadership','Architecture'],'data scientist':['Python','Statistics','Machine Learning','Deep Learning','Data Viz','SQL','Feature Engineering','MLOps','Research','Leadership'],'product manager':['User Research','Roadmapping','Metrics','Stakeholder Mgmt','Agile','A/B Testing','Strategy','Leadership','OKRs','Vision'],'default':['Core Skills','Communication','Problem Solving','Collaboration','Technical Writing','Project Management','Leadership','Strategy','Innovation','Vision']}
const TITLES=['Foundation','Core Skills','Intermediate','Advanced','Expert','Leadership','Mastery']
const DESCS=['Build the basics','Strengthen your core','Level up your craft','Production-grade work','Think like a senior','Lead and inspire','Full mastery']
export async function POST(req){
  try{
    const{dreamRole,resumeText}=await req.json()
    let skills=ROLES['default']
    for(const[k,v] of Object.entries(ROLES)){if(dreamRole.toLowerCase().includes(k))skills=v}
    const common=['html','css','javascript','react','node','python','sql','typescript','git','agile']
    const found=common.filter(s=>resumeText.toLowerCase().includes(s)).map(s=>s.charAt(0).toUpperCase()+s.slice(1))
    const current=found.length>0?found:['Basic Skills']
    const skillTree=[]
    for(let i=0;i<Math.min(6,Math.ceil(skills.length/2));i++){
      skillTree.push({level:i+1,title:TITLES[i]||'Level '+(i+1),xp:(i+1)*100,skills:skills.slice(i*2,i*2+2),description:DESCS[i]||'Keep going',unlocked:i<2,completed:false,requiredSkills:i>0?[skills[(i-1)*2]]:[],milestone:i===4,milestoneReward:i===4?'🎤 Mock Interview Unlocked!':null})
    }
    const gap=skills.filter(s=>!current.some(c=>c.toLowerCase().includes(s.toLowerCase())))
    return NextResponse.json({playerData:{name:'Player',dreamRole,currentLevel:1,totalXP:0,maxXP:skills.length*100,badges:[],currentSkills:current,skillTree,gapSkills:gap,progressPercent:Math.round(current.length/skills.length*100)}})
  }catch(e){return NextResponse.json({error:'Failed'},{status:500})}
}`

files['app/api/generate-quiz/route.js'] = `import { NextResponse } from 'next/server'
export async function POST(req){
  try{
    const{skill,level}=await req.json()
    return NextResponse.json({quiz:{skill,level,questions:[],timeLimit:120,passMark:2,xpReward:level*100}})
  }catch(e){return NextResponse.json({error:'Failed'},{status:500})}
}`

files['app/api/submit-quiz/route.js'] = `import { NextResponse } from 'next/server'
export async function POST(req){
  try{
    const{answers,questions,level,xpReward}=await req.json()
    let correct=0;questions.forEach((q,i)=>{if(answers[i]===q.answer)correct++})
    const passed=correct>=Math.ceil(questions.length*0.67)
    return NextResponse.json({result:{passed,correct,total:questions.length,score:Math.round(correct/questions.length*100),xpEarned:passed?xpReward:Math.round(xpReward*0.2),badge:passed?['🌱 Seedling','⚡ Spark','🔥 Ignited','💎 Diamond','🏆 Champion'][Math.min(level-1,4)]:null,message:passed?'Level '+level+' Unlocked!':'Need 67% to pass. Try again!'}})
  }catch(e){return NextResponse.json({error:'Failed'},{status:500})}
}`

// Write all files
for(const [filePath, content] of Object.entries(files)) {
  const dir = require('path').dirname(filePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
  console.log('✓ Created:', filePath)
}
console.log('\n✅ ALL FILES CREATED! Run: npm run dev')