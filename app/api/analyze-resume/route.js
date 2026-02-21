import { NextResponse } from 'next/server'

// Role skill maps — in a real app, this would come from AI/database
const ROLE_SKILL_MAPS = {
  'frontend engineer': ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Testing', 'Performance', 'System Design', 'Leadership', 'Architecture'],
  'backend engineer': ['Node.js', 'Databases', 'APIs', 'Authentication', 'Caching', 'Microservices', 'Docker', 'System Design', 'Leadership', 'Architecture'],
  'data scientist': ['Python', 'Statistics', 'Machine Learning', 'Deep Learning', 'Data Viz', 'SQL', 'Feature Engineering', 'MLOps', 'Research', 'Leadership'],
  'product manager': ['User Research', 'Roadmapping', 'Metrics', 'Stakeholder Mgmt', 'Agile', 'A/B Testing', 'Strategy', 'Leadership', 'OKRs', 'Vision'],
  'default': ['Core Skills', 'Communication', 'Problem Solving', 'Collaboration', 'Technical Writing', 'Project Management', 'Leadership', 'Strategy', 'Innovation', 'Vision'],
}

function getRoleSkills(dreamRole) {
  const role = dreamRole.toLowerCase()
  for (const [key, skills] of Object.entries(ROLE_SKILL_MAPS)) {
    if (role.includes(key)) return skills
  }
  return ROLE_SKILL_MAPS['default']
}

function extractSkillsFromResume(resumeText) {
  const commonSkills = ['html', 'css', 'javascript', 'react', 'node', 'python', 'sql', 'typescript',
    'aws', 'docker', 'git', 'agile', 'figma', 'java', 'c++', 'mongodb', 'postgresql']
  const found = []
  const lower = resumeText.toLowerCase()
  commonSkills.forEach(skill => {
    if (lower.includes(skill)) found.push(skill.charAt(0).toUpperCase() + skill.slice(1))
  })
  return found.length > 0 ? found : ['Basic Skills']
}

export async function POST(request) {
  try {
    const { dreamRole, resumeText } = await request.json()

    const roleSkills = getRoleSkills(dreamRole)
    const currentSkills = extractSkillsFromResume(resumeText)

    // Build skill tree levels
    const skillTree = roleSkills.reduce((acc, skill, i) => {
      const levelIndex = Math.floor(i / 2) // Group 2 skills per level (gives ~5 levels for 10 skills)
      if (!acc[levelIndex]) {
        acc[levelIndex] = {
          level: levelIndex + 1,
          title: getLevelTitle(levelIndex),
          xp: (levelIndex + 1) * 100,
          skills: [],
          description: getLevelDesc(levelIndex),
          unlocked: levelIndex < 2, // First 2 levels unlocked to start
          completed: false,
          milestone: levelIndex === 4,
          milestoneReward: levelIndex === 4 ? '🎤 Mock Interview Unlocked!' : null,
          requiredSkills: levelIndex > 0 ? [roleSkills[(levelIndex - 1) * 2]] : [],
        }
      }
      acc[levelIndex].skills.push(skill)
      return acc
    }, [])

    // Figure out gap skills (skills needed but not on resume)
    const gapSkills = roleSkills.filter(s =>
      !currentSkills.some(cs => cs.toLowerCase().includes(s.toLowerCase()))
    )

    const playerData = {
      name: "Player",
      dreamRole,
      currentLevel: 1,
      totalXP: 0,
      maxXP: roleSkills.length * 100,
      badges: [],
      currentSkills,
      skillTree,
      gapSkills,
      progressPercent: Math.round((currentSkills.length / roleSkills.length) * 100),
    }

    return NextResponse.json({ playerData }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

function getLevelTitle(index) {
  const titles = ['Foundation', 'Core Skills', 'Intermediate', 'Advanced', 'Expert', 'Leadership', 'Mastery']
  return titles[index] || `Level ${index + 1}`
}

function getLevelDesc(index) {
  const descs = [
    'Build the basics', 'Strengthen your core', 'Level up your craft',
    'Production-grade work', 'Think like a senior', 'Lead and inspire', 'Full mastery'
  ]
  return descs[index] || 'Keep leveling up'
}
